"use client";

import Image from "next/image";
import { useId, type ReactNode } from "react";

import { authUiCopy, authUiImages } from "@/config/auth-ui";
import { cn } from "@/lib/utils";

export const AUTH_COLLAGE_PATH_W = 257;
export const AUTH_COLLAGE_DESIGN_H = 377;
/** Wider clip frame; content stays uniformly scaled (no horizontal stretch). */
export const AUTH_COLLAGE_SCENE_W = 330;
export const AUTH_COLLAGE_SCALE_X = AUTH_COLLAGE_SCENE_W / AUTH_COLLAGE_PATH_W;

export const AUTH_COLLAGE_MAIN_CARD_PATH =
  "M0 183 V14 Q2 1 15 0 H141 Q157 0 157 16 V34 Q157 54 178 54 H242 Q257 54 257 71 V364 Q256 377 243 377 H103 Q88 377 88 358 V274 Q88 255 73 255 H17 Q0 255 0 238 Z";

const KIWI_W = 84;
const KIWI_H = 117;
const KIWI_LEFT = 0;
const KIWI_TOP = AUTH_COLLAGE_DESIGN_H - KIWI_H;
const NOTCH_LEFT = 157;
const NOTCH_W = AUTH_COLLAGE_PATH_W - NOTCH_LEFT;
const NOTCH_H = 54;

const KIWI_CARD_IMAGE = authUiImages.kiwiCard;

const pctX = (value: number) => `${(value / AUTH_COLLAGE_PATH_W) * 100}%`;
const pctY = (value: number) => `${(value / AUTH_COLLAGE_DESIGN_H) * 100}%`;

type CollageFit = "height" | "width";

type AuthCollageSceneProps = {
  className?: string;
  /** height = full column (login); width = scale from available width (marketing hero) */
  fit?: CollageFit;
  /** Photo clipped into the main organic frame (login panel). */
  mainImageSrc?: string;
  /** Custom content clipped into the main frame (dashboard, etc.). */
  mainContent?: ReactNode;
  showKiwi?: boolean;
  showAvatars?: boolean;
};

/**
 * Shared login-style collage frame: organic SVG clip, optional kiwi card + avatar notch.
 */
export function AuthCollageScene({
  className,
  fit = "height",
  mainImageSrc,
  mainContent,
  showKiwi = false,
  showAvatars = false,
}: AuthCollageSceneProps) {
  const clipId = useId().replace(/:/g, "");
  const isWidthFit = fit === "width";

  return (
    <div
      className={cn(
        "flex w-full overflow-visible",
        isWidthFit
          ? "min-h-[inherit] items-center justify-center lg:justify-end"
          : "h-full items-center justify-end [container-type:size]",
        className,
      )}
    >
      <div
        className={cn(
          "relative shrink-0 overflow-visible",
          isWidthFit
            ? "mx-auto aspect-[330/377] h-auto w-full max-w-[min(100%,20rem)] sm:max-w-[min(100%,24rem)] lg:mx-0 lg:ml-auto lg:max-w-none"
            : "ml-auto aspect-[330/377] h-full w-auto max-w-full",
        )}
      >
        <svg
          viewBox={`0 0 ${AUTH_COLLAGE_SCENE_W} ${AUTH_COLLAGE_DESIGN_H}`}
          className="pointer-events-none absolute inset-0 size-full overflow-visible"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden={!mainContent}
          role={mainContent ? "img" : undefined}
        >
          <defs>
            <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
              <path
                d={AUTH_COLLAGE_MAIN_CARD_PATH}
                transform={`scale(${AUTH_COLLAGE_SCALE_X}, 1)`}
              />
            </clipPath>
          </defs>
          {mainImageSrc ? (
            <image
              href={mainImageSrc}
              x={0}
              y={0}
              width={AUTH_COLLAGE_SCENE_W}
              height={AUTH_COLLAGE_DESIGN_H}
              preserveAspectRatio="xMidYMid slice"
              clipPath={`url(#${clipId})`}
            />
          ) : (
            <foreignObject
              x={0}
              y={0}
              width={AUTH_COLLAGE_SCENE_W}
              height={AUTH_COLLAGE_DESIGN_H}
              clipPath={`url(#${clipId})`}
            >
              <div className="flex size-full items-center justify-center overflow-hidden bg-[#dce9f8]">
                {mainContent}
              </div>
            </foreignObject>
          )}
        </svg>

        {showKiwi ? (
          <div
            aria-hidden
            className="absolute z-1 overflow-hidden rounded-3xl"
            style={{
              top: pctY(KIWI_TOP),
              left: pctX(KIWI_LEFT),
              width: pctX(KIWI_W),
              height: pctY(KIWI_H),
            }}
          >
            <Image
              src={KIWI_CARD_IMAGE}
              alt="User interface feature preview"
              fill
              priority
              unoptimized
              sizes="120px"
              className="scale-125 object-cover object-center"
              draggable={false}
            />
          </div>
        ) : null}

        {showAvatars ? (
          <div
            className="absolute z-50 flex flex-col items-center justify-center gap-1 px-1"
            style={{
              top: 0,
              left: pctX(NOTCH_LEFT),
              width: pctX(NOTCH_W),
              height: pctY(NOTCH_H),
            }}
          >
            <div className="flex items-center justify-center">
              {authUiImages.avatars.map((src, index) => (
                <div
                  key={src}
                  className={cn(
                    "relative size-10 shrink-0 overflow-hidden rounded-full border-2 border-[#eef0f3] xl:size-10",
                    index > 0 && "-ml-2.5",
                  )}
                >
                  <Image
                    src={src}
                    alt={`Team member avatar ${index + 1}`}
                    fill
                    sizes="50px"
                    className="object-cover"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
            <p className="m-0 text-center text-[12px] font-medium leading-none text-muted-foreground xl:text-xs">
              {authUiCopy.socialProof}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
