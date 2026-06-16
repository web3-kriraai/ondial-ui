import Image from "next/image";

import { cn } from "@/lib/utils";

const AVATAR_IMAGES = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&q=80",
] as const;

const PATH_W = 257;
const DESIGN_H = 377;
/** Wider clip frame; photo stays uniformly scaled (no horizontal stretch). */
const SCENE_W = 330;
const SCALE_X = SCENE_W / PATH_W;

const MAIN_CARD_PATH =
  "M0 183 V14 Q2 1 15 0 H141 Q157 0 157 16 V34 Q157 54 178 54 H242 Q257 54 257 71 V364 Q256 377 243 377 H103 Q88 377 88 358 V274 Q88 255 73 255 H17 Q0 255 0 238 Z";

const KIWI_W = 84;
const KIWI_H = 117;
const KIWI_LEFT = 0;
const KIWI_TOP = DESIGN_H - KIWI_H;
/** Top-right notch cutout (path artboard coords). */
const NOTCH_LEFT = 157;
const NOTCH_W = PATH_W - NOTCH_LEFT;
const NOTCH_H = 54;

const MAIN_CARD_IMAGE = "/auth/collage-chair.png";
const KIWI_CARD_IMAGE = "/auth/two.jpg";

const pctX = (value: number) => `${(value / PATH_W) * 100}%`;
const pctY = (value: number) => `${(value / DESIGN_H) * 100}%`;

type AuthCollagePanelProps = {
  className?: string;
};

export function AuthCollagePanel({ className }: AuthCollagePanelProps) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-end overflow-visible",
        "[container-type:size]",
        className,
      )}
    >
      <div
        className={cn(
          "relative ml-auto aspect-[330/377] h-full w-auto max-w-full shrink-0 overflow-visible",
        )}
      >
        <svg
          viewBox={`0 0 ${SCENE_W} ${DESIGN_H}`}
          className="pointer-events-none absolute inset-0 size-full overflow-visible"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          <defs>
            <clipPath id="auth-collage-main-clip" clipPathUnits="userSpaceOnUse">
              <path d={MAIN_CARD_PATH} transform={`scale(${SCALE_X}, 1)`} />
            </clipPath>
          </defs>
          <image
            href={MAIN_CARD_IMAGE}
            x={0}
            y={0}
            width={SCENE_W}
            height={DESIGN_H}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#auth-collage-main-clip)"
          />
        </svg>

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
            alt=""
            fill
            priority
            unoptimized
            sizes="120px"
            className="scale-125 object-cover object-center"
            draggable={false}
          />
        </div>

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
            {AVATAR_IMAGES.map((src, index) => (
              <div
                key={src}
                className={cn(
                  "relative size-10 shrink-0 overflow-hidden rounded-full border-2 border-[#eef0f3] xl:size-10",
                  index > 0 && "-ml-2.5",
                )}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="50px"
                  className="object-cover"
                  draggable={false}
                />
              </div>
            ))}
          </div>
          <p className="m-0 text-center text-[12px] font-medium leading-none text-muted-foreground xl:text-xs">
            +5000 happy customers
          </p>
        </div>
      </div>
    </div>
  );
}
