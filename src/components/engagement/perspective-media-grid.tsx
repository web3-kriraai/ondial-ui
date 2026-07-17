"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

import { HOME_CAROUSEL_SLIDES } from "@/config/home-carousel";
import { cn } from "@/lib/utils";

const DEFAULT_IMAGES = HOME_CAROUSEL_SLIDES.map((slide) => slide.image);

const TUNNEL_WIDTH = 24;
const TUNNEL_HEIGHT = 16;
const SEGMENT_DEPTH = 6;
const SEGMENT_COUNT = 16;
const FLOOR_COLUMNS = 6;
const WALL_ROWS = 4;
const CAMERA_SPEED = 1.8;
const POINTER_SMOOTHING = 5.5;
/** Soft ease for texture reveal (~0.7–0.9s). */
const IMAGE_FADE_SMOOTHING = 2.4;
const IMAGE_LOAD_STAGGER_MS = 45;
const IMAGE_OPACITY = 0.94;
const TILE_INSET = 0.9;

type TileRecord = {
  geometry: THREE.PlaneGeometry;
  aspect: number;
};

type PerspectiveMediaGridProps = {
  className?: string;
  images?: readonly string[];
  active?: boolean;
  reduceMotion?: boolean;
  "aria-label"?: string;
};

/**
 * A bounded, reusable version of the Delphi perspective media tunnel.
 * It observes its own container, so it works in cards, dialogs, and page heroes.
 */
export function PerspectiveMediaGrid({
  className,
  images = DEFAULT_IMAGES,
  active = true,
  reduceMotion = false,
  "aria-label": ariaLabel = "OnDial customer experience gallery",
}: PerspectiveMediaGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || !active) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    scene.fog = new THREE.FogExp2(0xffffff, 0.018);

    const camera = new THREE.PerspectiveCamera(68, 1, 0.1, 180);
    camera.position.set(0, 0, 0.8);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

    const segmentGroups: THREE.Group[] = [];
    const textures: THREE.Texture[] = [];
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    const imageMaterials: THREE.MeshBasicMaterial[] = [];
    const imageLoadTimers: number[] = [];
    const materialTiles = new Map<THREE.MeshBasicMaterial, TileRecord[]>();
    const fadingMaterials = new Set<THREE.MeshBasicMaterial>();
    const occupiedLanesBySegment: Array<Set<string>> = [];
    let disposed = false;
    let animationFrame = 0;
    let previousTime = performance.now();
    let pointerX = 0;
    let pointerY = 0;

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      if (width <= 0 || height <= 0) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = container.getBoundingClientRect();
      pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    };
    const resetPointer = () => {
      pointerX = 0;
      pointerY = 0;
    };
    container.addEventListener("pointermove", handlePointerMove, { passive: true });
    container.addEventListener("pointerleave", resetPointer);

    const trackGeometry = <T extends THREE.BufferGeometry>(geometry: T): T => {
      geometries.push(geometry);
      return geometry;
    };
    const trackMaterial = <T extends THREE.Material>(material: T): T => {
      materials.push(material);
      return material;
    };

    const addTile = (
      group: THREE.Group,
      position: THREE.Vector3,
      rotation: THREE.Euler,
      width: number,
      height: number,
      material: THREE.MeshBasicMaterial,
    ) => {
      const tileWidth = Math.max(0.4, width - TILE_INSET);
      const tileHeight = Math.max(0.4, height - TILE_INSET);
      const geometry = trackGeometry(
        new THREE.PlaneGeometry(tileWidth, tileHeight),
      );
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(position);
      mesh.rotation.copy(rotation);
      group.add(mesh);
      const records = materialTiles.get(material) ?? [];
      records.push({ geometry, aspect: tileWidth / tileHeight });
      materialTiles.set(material, records);
    };

    const applyCoverUvs = (
      geometry: THREE.PlaneGeometry,
      planeAspect: number,
      imageAspect: number,
    ) => {
      const uv = geometry.getAttribute("uv");
      let scaleU = 1;
      let scaleV = 1;
      let offsetU = 0;
      let offsetV = 0;

      if (imageAspect > planeAspect) {
        scaleU = planeAspect / imageAspect;
        offsetU = (1 - scaleU) / 2;
      } else {
        scaleV = imageAspect / planeAspect;
        offsetV = (1 - scaleV) / 2;
      }

      for (let index = 0; index < uv.count; index += 1) {
        uv.setXY(
          index,
          offsetU + uv.getX(index) * scaleU,
          offsetV + uv.getY(index) * scaleV,
        );
      }
      uv.needsUpdate = true;
    };

    const buildSegment = (index: number) => {
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
      const delta = Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;

      if (!reduceMotion) {
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
      if (!reduceMotion) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const loadScene = () => {
      // 1) Empty perspective grid first — visible immediately.
      for (let index = 0; index < SEGMENT_COUNT; index += 1) {
        buildSegment(index);
      }
      renderer.render(scene, camera);
      if (!reduceMotion) {
        animationFrame = window.requestAnimationFrame(render);
      }

      // 2) Invisible image planes, then textures fade in as they arrive.
      const loader = new THREE.TextureLoader();
      const textureMaterials = images.map(() =>
        trackMaterial(
          new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0,
            depthWrite: false,
          }),
        ),
      );

      imageMaterials.push(...textureMaterials);

      // Attach image planes after the wireframe is already on screen.
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
          material: THREE.MeshBasicMaterial,
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
                new THREE.Vector3(
                  -halfWidth + slot * columnWidth + columnWidth / 2,
                  -halfHeight,
                  depthCenter,
                ),
                new THREE.Euler(-Math.PI / 2, 0, 0),
                columnWidth,
                SEGMENT_DEPTH,
                material,
              );
              break;
            case 1:
              addTile(
                group,
                new THREE.Vector3(
                  -halfWidth + slot * columnWidth + columnWidth / 2,
                  halfHeight,
                  depthCenter,
                ),
                new THREE.Euler(Math.PI / 2, 0, 0),
                columnWidth,
                SEGMENT_DEPTH,
                material,
              );
              break;
            case 2:
              addTile(
                group,
                new THREE.Vector3(
                  -halfWidth,
                  -halfHeight + slot * rowHeight + rowHeight / 2,
                  depthCenter,
                ),
                new THREE.Euler(0, Math.PI / 2, 0),
                SEGMENT_DEPTH,
                rowHeight,
                material,
              );
              break;
            default:
              addTile(
                group,
                new THREE.Vector3(
                  halfWidth,
                  -halfHeight + slot * rowHeight + rowHeight / 2,
                  depthCenter,
                ),
                new THREE.Euler(0, -Math.PI / 2, 0),
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

      images.forEach((src, index) => {
        const timer = window.setTimeout(() => {
          loader.load(
            src,
            (texture) => {
              if (disposed) {
                texture.dispose();
                return;
              }
              texture.colorSpace = THREE.SRGBColorSpace;
              texture.minFilter = THREE.LinearMipmapLinearFilter;
              texture.magFilter = THREE.LinearFilter;
              texture.generateMipmaps = true;
              texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
              textures.push(texture);
              const material = textureMaterials[index];
              material.map = texture;
              material.needsUpdate = true;

              const source = texture.image as { width?: number; height?: number };
              const imageAspect =
                source.width && source.height ? source.width / source.height : 1;
              for (const tile of materialTiles.get(material) ?? []) {
                applyCoverUvs(tile.geometry, tile.aspect, imageAspect);
              }

              if (reduceMotion) {
                material.opacity = IMAGE_OPACITY;
                renderer.render(scene, camera);
              } else {
                fadingMaterials.add(material);
              }
            },
            undefined,
            () => {
              // Leave the tile invisible if a texture fails.
            },
          );
        }, index * IMAGE_LOAD_STAGGER_MS);
        imageLoadTimers.push(timer);
      });
    };

    loadScene();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      for (const timer of imageLoadTimers) window.clearTimeout(timer);
      resizeObserver.disconnect();
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", resetPointer);
      for (const geometry of geometries) geometry.dispose();
      for (const material of materials) material.dispose();
      for (const texture of textures) texture.dispose();
      scene.clear();
      renderer.dispose();
    };
  }, [active, images, reduceMotion]);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={ariaLabel}
      className={cn("relative isolate size-full overflow-hidden bg-white", className)}
    >
      <canvas ref={canvasRef} className="block size-full" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_22%,rgb(255_255_255/0.08)_60%,rgb(255_255_255/0.58)_100%)]"
      />
    </div>
  );
}
