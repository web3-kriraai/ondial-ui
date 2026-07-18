"use client";

import { useEffect, useRef } from "react";
import type {
  BufferGeometry,
  Group,
  Material,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  Texture,
  WebGLRenderer,
} from "three";

import {
  ENGAGEMENT_GRID_IMAGES,
  getCachedEngagementImage,
  getEngagementImage,
} from "@/components/engagement/perspective-texture-cache";
import { cn } from "@/lib/utils";

// Portrait grid cells: every floor/wall slot is taller than it is wide.
const TUNNEL_WIDTH = 22;
const TUNNEL_HEIGHT = 20;
const SEGMENT_DEPTH = 3.6;
const SEGMENT_COUNT = 18;
const FLOOR_COLUMNS = 8; // cell width 2.75 < depth 3.6 → vertical floor tiles
const WALL_ROWS = 4; // cell height 5.0 > depth 3.6 → vertical wall tiles
const CAMERA_SPEED = 1.8;
const POINTER_SMOOTHING = 5.5;
const IMAGE_FADE_SMOOTHING = 2.4;
const IMAGE_LOAD_STAGGER_MS = 40;
const IMAGE_OPACITY = 0.94;
/** Hairline gap so grid lines stay visible while images still fill the cell. */
const TILE_INSET = 0.14;
const MOBILE_MEDIA = "(max-width: 767px)";

type TileRecord = {
  geometry: PlaneGeometry;
  aspect: number;
  /** Default PlaneGeometry UVs — cover crops must always start from these. */
  baseUv: Float32Array;
};

type PerspectiveMediaGridProps = {
  className?: string;
  images?: readonly string[];
  /** When false, the WebGL loop pauses but the scene/textures stay warm. */
  active?: boolean;
  reduceMotion?: boolean;
  "aria-label"?: string;
};

type ThreeModule = typeof import("three");

function resolvePixelRatio(): number {
  if (typeof window === "undefined") return 1;
  const isMobile = window.matchMedia(MOBILE_MEDIA).matches;
  return Math.min(window.devicePixelRatio || 1, isMobile ? 1.15 : 1.5);
}

/**
 * Bounded Delphi-style media tunnel.
 * Builds once, pauses/resumes with `active`, and reuses cached image decodes.
 */
export function PerspectiveMediaGrid({
  className,
  images = ENGAGEMENT_GRID_IMAGES,
  active = true,
  reduceMotion = false,
  "aria-label": ariaLabel = "OnDial customer experience gallery",
}: PerspectiveMediaGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(active);
  const reduceMotionRef = useRef(reduceMotion);
  const startLoopRef = useRef<(() => void) | null>(null);
  const stopLoopRef = useRef<(() => void) | null>(null);

  activeRef.current = active;
  reduceMotionRef.current = reduceMotion;

  // Build the scene once for this component lifetime.
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let disposed = false;
    let animationFrame = 0;
    let previousTime = performance.now();
    let pointerX = 0;
    let pointerY = 0;
    let running = false;

    let THREE: ThreeModule | null = null;
    let scene: Scene | null = null;
    let camera: PerspectiveCamera | null = null;
    let renderer: WebGLRenderer | null = null;

    const segmentGroups: Group[] = [];
    const textures: Texture[] = [];
    const geometries: BufferGeometry[] = [];
    const materials: Material[] = [];
    const imageMaterials: MeshBasicMaterial[] = [];
    const imageLoadTimers: number[] = [];
    const materialTiles = new Map<MeshBasicMaterial, TileRecord[]>();
    const fadingMaterials = new Set<MeshBasicMaterial>();
    const occupiedLanesBySegment: Array<Set<string>> = [];

    const stopLoop = () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
      running = false;
    };

    const resize = () => {
      if (!renderer || !camera || !scene) return;
      const { width, height } = container.getBoundingClientRect();
      if (width <= 0 || height <= 0) return;
      renderer.setPixelRatio(resolvePixelRatio());
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      if (!running) {
        renderer.render(scene, camera);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!activeRef.current) return;
      const bounds = container.getBoundingClientRect();
      pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    };
    const resetPointer = () => {
      pointerX = 0;
      pointerY = 0;
    };

    const trackGeometry = <T extends BufferGeometry>(geometry: T): T => {
      geometries.push(geometry);
      return geometry;
    };
    const trackMaterial = <T extends Material>(material: T): T => {
      materials.push(material);
      return material;
    };

    const addTile = (
      group: Group,
      position: InstanceType<ThreeModule["Vector3"]>,
      rotation: InstanceType<ThreeModule["Euler"]>,
      width: number,
      height: number,
      material: MeshBasicMaterial,
    ) => {
      if (!THREE) return;
      // Fill nearly the full cell — only a hairline inset for grid-line separation.
      const tileWidth = Math.max(0.35, width - TILE_INSET);
      const tileHeight = Math.max(0.35, height - TILE_INSET);
      const geometry = trackGeometry(new THREE.PlaneGeometry(tileWidth, tileHeight));
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(position);
      mesh.rotation.copy(rotation);
      group.add(mesh);

      const uvAttr = geometry.getAttribute("uv");
      const baseUv = new Float32Array(uvAttr.array.length);
      baseUv.set(uvAttr.array as ArrayLike<number>);

      const records = materialTiles.get(material) ?? [];
      records.push({
        geometry,
        aspect: tileWidth / tileHeight,
        baseUv,
      });
      materialTiles.set(material, records);
    };

    const applyCoverUvs = (
      geometry: PlaneGeometry,
      planeAspect: number,
      imageAspect: number,
      baseUv: Float32Array,
    ) => {
      const uv = geometry.getAttribute("uv");

      // object-fit: cover — fill the plane, crop overflow on the longer image side.
      let scaleU = 1;
      let scaleV = 1;
      let offsetU = 0;
      let offsetV = 0;

      if (imageAspect > planeAspect) {
        scaleU = planeAspect / imageAspect;
        offsetU = (1 - scaleU) / 2;
      } else if (imageAspect < planeAspect) {
        scaleV = imageAspect / planeAspect;
        offsetV = (1 - scaleV) / 2;
      }

      for (let index = 0; index < uv.count; index += 1) {
        const baseU = baseUv[index * 2] ?? 0;
        const baseV = baseUv[index * 2 + 1] ?? 0;
        uv.setXY(index, offsetU + baseU * scaleU, offsetV + baseV * scaleV);
      }
      uv.needsUpdate = true;
    };

    const buildSegment = (index: number) => {
      if (!THREE || !scene) return;
      const group = new THREE.Group();
      group.position.z = -index * SEGMENT_DEPTH;

      const halfWidth = TUNNEL_WIDTH / 2;
      const halfHeight = TUNNEL_HEIGHT / 2;
      const columnWidth = TUNNEL_WIDTH / FLOOR_COLUMNS;
      const rowHeight = TUNNEL_HEIGHT / WALL_ROWS;
      const vertices: number[] = [];

      for (let column = 0; column <= FLOOR_COLUMNS; column += 1) {
        const x = -halfWidth + column * columnWidth;
        vertices.push(x, -halfHeight, 0, x, -halfHeight, -SEGMENT_DEPTH);
        vertices.push(x, halfHeight, 0, x, halfHeight, -SEGMENT_DEPTH);
      }
      for (let row = 1; row < WALL_ROWS; row += 1) {
        const y = -halfHeight + row * rowHeight;
        vertices.push(-halfWidth, y, 0, -halfWidth, y, -SEGMENT_DEPTH);
        vertices.push(halfWidth, y, 0, halfWidth, y, -SEGMENT_DEPTH);
      }

      vertices.push(-halfWidth, -halfHeight, 0, halfWidth, -halfHeight, 0);
      vertices.push(-halfWidth, halfHeight, 0, halfWidth, halfHeight, 0);
      vertices.push(-halfWidth, -halfHeight, 0, -halfWidth, halfHeight, 0);
      vertices.push(halfWidth, -halfHeight, 0, halfWidth, halfHeight, 0);

      const lineGeometry = trackGeometry(new THREE.BufferGeometry());
      lineGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3),
      );
      const lineMaterial = trackMaterial(
        new THREE.LineBasicMaterial({
          color: 0xaaa8b4,
          transparent: true,
          opacity: 0.52,
        }),
      );
      group.add(new THREE.LineSegments(lineGeometry, lineMaterial));
      scene.add(group);
      segmentGroups.push(group);
    };

    const render = (time: number) => {
      if (disposed || !renderer || !scene || !camera) return;

      if (!activeRef.current) {
        running = false;
        animationFrame = 0;
        return;
      }

      const delta = Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;

      if (!reduceMotionRef.current) {
        const pointerSmoothing = 1 - Math.exp(-POINTER_SMOOTHING * delta);
        const imageSmoothing = 1 - Math.exp(-IMAGE_FADE_SMOOTHING * delta);
        camera.position.z -= delta * CAMERA_SPEED;
        camera.position.x += (pointerX * 0.38 - camera.position.x) * pointerSmoothing;
        camera.position.y += (-pointerY * 0.28 - camera.position.y) * pointerSmoothing;

        for (const material of fadingMaterials) {
          material.opacity += (IMAGE_OPACITY - material.opacity) * imageSmoothing;
          if (IMAGE_OPACITY - material.opacity < 0.008) {
            material.opacity = IMAGE_OPACITY;
            fadingMaterials.delete(material);
          }
        }

        const tunnelLength = SEGMENT_COUNT * SEGMENT_DEPTH;
        for (const segment of segmentGroups) {
          if (segment.position.z > camera.position.z + SEGMENT_DEPTH) {
            segment.position.z -= tunnelLength;
          }
        }
      } else if (fadingMaterials.size > 0) {
        for (const material of fadingMaterials) {
          material.opacity = IMAGE_OPACITY;
        }
        fadingMaterials.clear();
      }

      renderer.render(scene, camera);

      if (activeRef.current && !reduceMotionRef.current) {
        animationFrame = window.requestAnimationFrame(render);
      } else {
        running = false;
        animationFrame = 0;
      }
    };

    const startLoop = () => {
      if (disposed || running || !renderer || !scene || !camera) return;
      if (!activeRef.current) {
        renderer.render(scene, camera);
        return;
      }
      running = true;
      previousTime = performance.now();
      if (reduceMotionRef.current) {
        renderer.render(scene, camera);
        running = false;
        return;
      }
      animationFrame = window.requestAnimationFrame(render);
    };

    startLoopRef.current = startLoop;
    stopLoopRef.current = stopLoop;

    const attachImagePlanes = () => {
      const three = THREE;
      if (!three) return;

      for (let index = 0; index < SEGMENT_COUNT; index += 1) {
        const group = segmentGroups[index];
        if (!group) continue;

        const halfWidth = TUNNEL_WIDTH / 2;
        const halfHeight = TUNNEL_HEIGHT / 2;
        const columnWidth = TUNNEL_WIDTH / FLOOR_COLUMNS;
        const rowHeight = TUNNEL_HEIGHT / WALL_ROWS;
        const primary = imageMaterials[index % imageMaterials.length];
        const secondary = imageMaterials[(index * 3 + 1) % imageMaterials.length];
        const tertiary = imageMaterials[(index * 5 + 2) % imageMaterials.length];
        const depthCenter = -SEGMENT_DEPTH / 2;
        const occupiedLanes = new Set<string>();
        const previousLanes = occupiedLanesBySegment[index - 1] ?? new Set<string>();

        const addSurfaceTile = (
          surface: number,
          material: MeshBasicMaterial,
          slotSeed: number,
        ) => {
          const normalizedSurface = surface % 4;
          const slotCount = normalizedSurface <= 1 ? FLOOR_COLUMNS : WALL_ROWS;
          let slot = slotSeed % slotCount;

          for (let attempt = 0; attempt < slotCount; attempt += 1) {
            const lane = `${normalizedSurface}:${slot}`;
            if (!previousLanes.has(lane) && !occupiedLanes.has(lane)) break;
            slot = (slot + 1) % slotCount;
          }
          occupiedLanes.add(`${normalizedSurface}:${slot}`);

          switch (normalizedSurface) {
            case 0:
              addTile(
                group,
                new three.Vector3(
                  -halfWidth + slot * columnWidth + columnWidth / 2,
                  -halfHeight,
                  depthCenter,
                ),
                new three.Euler(-Math.PI / 2, 0, 0),
                columnWidth,
                SEGMENT_DEPTH,
                material,
              );
              break;
            case 1:
              addTile(
                group,
                new three.Vector3(
                  -halfWidth + slot * columnWidth + columnWidth / 2,
                  halfHeight,
                  depthCenter,
                ),
                new three.Euler(Math.PI / 2, 0, 0),
                columnWidth,
                SEGMENT_DEPTH,
                material,
              );
              break;
            case 2:
              addTile(
                group,
                new three.Vector3(
                  -halfWidth,
                  -halfHeight + slot * rowHeight + rowHeight / 2,
                  depthCenter,
                ),
                new three.Euler(0, Math.PI / 2, 0),
                SEGMENT_DEPTH,
                rowHeight,
                material,
              );
              break;
            default:
              addTile(
                group,
                new three.Vector3(
                  halfWidth,
                  -halfHeight + slot * rowHeight + rowHeight / 2,
                  depthCenter,
                ),
                new three.Euler(0, -Math.PI / 2, 0),
                SEGMENT_DEPTH,
                rowHeight,
                material,
              );
          }
        };

        addSurfaceTile(index % 4, primary, index * 2 + 1);
        addSurfaceTile((index + 2) % 4, secondary, index * 3 + 2);
        if (index % 2 === 0) {
          addSurfaceTile((index + 1) % 4, tertiary, index * 5 + 3);
        }
        occupiedLanesBySegment[index] = occupiedLanes;
      }
    };

    const applyImageToMaterial = (
      material: MeshBasicMaterial,
      image: HTMLImageElement,
    ) => {
      const three = THREE;
      if (!three || !renderer || disposed) return;
      const texture = new three.Texture(image);
      texture.colorSpace = three.SRGBColorSpace;
      texture.minFilter = three.LinearMipmapLinearFilter;
      texture.magFilter = three.LinearFilter;
      texture.generateMipmaps = true;
      texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4);
      texture.needsUpdate = true;
      textures.push(texture);

      material.map = texture;
      material.needsUpdate = true;

      const imageAspect =
        image.naturalWidth && image.naturalHeight
          ? image.naturalWidth / image.naturalHeight
          : 1;
      for (const tile of materialTiles.get(material) ?? []) {
        applyCoverUvs(tile.geometry, tile.aspect, imageAspect, tile.baseUv);
      }

      if (reduceMotionRef.current) {
        material.opacity = IMAGE_OPACITY;
        if (scene && camera) renderer.render(scene, camera);
      } else {
        fadingMaterials.add(material);
        if (activeRef.current) startLoop();
      }
    };

    const loadTextures = () => {
      images.forEach((src, index) => {
        const material = imageMaterials[index];
        if (!material) return;

        const cached = getCachedEngagementImage(src);
        if (cached) {
          applyImageToMaterial(material, cached);
          return;
        }

        const timer = window.setTimeout(() => {
          void getEngagementImage(src).then((image) => {
            if (!image || disposed) return;
            applyImageToMaterial(material, image);
          });
        }, index * IMAGE_LOAD_STAGGER_MS);
        imageLoadTimers.push(timer);
      });
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    container.addEventListener("pointermove", handlePointerMove, { passive: true });
    container.addEventListener("pointerleave", resetPointer);

    const visibilityHandler = () => {
      if (document.hidden) {
        stopLoop();
        return;
      }
      if (activeRef.current) startLoop();
    };
    document.addEventListener("visibilitychange", visibilityHandler);

    void import("three").then((mod) => {
      if (disposed) return;
      THREE = mod;

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff);
      scene.fog = new THREE.FogExp2(0xffffff, 0.018);

      camera = new THREE.PerspectiveCamera(68, 1, 0.1, 180);
      camera.position.set(0, 0, 0.8);

      const isMobile = window.matchMedia(MOBILE_MEDIA).matches;
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: !isMobile,
        alpha: false,
        powerPreference: "high-performance",
      });
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.setPixelRatio(resolvePixelRatio());

      for (let index = 0; index < SEGMENT_COUNT; index += 1) {
        buildSegment(index);
      }
      resize();
      renderer.render(scene, camera);

      const textureMaterials = images.map(() =>
        trackMaterial(
          new mod.MeshBasicMaterial({
            color: 0xffffff,
            side: mod.DoubleSide,
            transparent: true,
            opacity: 0,
            depthWrite: false,
          }),
        ),
      );
      imageMaterials.push(...textureMaterials);
      attachImagePlanes();
      loadTextures();

      if (activeRef.current) startLoop();
    });

    return () => {
      disposed = true;
      stopLoop();
      startLoopRef.current = null;
      stopLoopRef.current = null;
      resizeObserver.disconnect();
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", resetPointer);
      document.removeEventListener("visibilitychange", visibilityHandler);
      for (const timer of imageLoadTimers) window.clearTimeout(timer);
      for (const geometry of geometries) geometry.dispose();
      for (const material of materials) material.dispose();
      for (const texture of textures) texture.dispose();
      scene?.clear();
      renderer?.dispose();
    };
    // Scene is built once; `active` / `reduceMotion` are read via refs.
  }, [images]);

  // Pause / resume without tearing down GPU state.
  useEffect(() => {
    if (active) {
      startLoopRef.current?.();
      return;
    }
    stopLoopRef.current?.();
  }, [active]);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={ariaLabel}
      className={cn(
        "relative isolate size-full overflow-hidden bg-white",
        !active && "pointer-events-none",
        className,
      )}
      aria-hidden={!active}
    >
      <canvas ref={canvasRef} className="block size-full" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_22%,rgb(255_255_255/0.08)_60%,rgb(255_255_255/0.58)_100%)]"
      />
    </div>
  );
}

/** Preload Three.js + engagement images during the modal delay window. */
export function preloadPerspectiveMediaGrid(): Promise<void> {
  return Promise.all([
    import("three"),
    import("@/components/engagement/perspective-texture-cache").then((mod) =>
      mod.preloadEngagementImages(),
    ),
  ]).then(() => undefined);
}
