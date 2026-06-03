import Image from "next/image";

import { cn } from "@/lib/utils";

const AVATAR_IMAGES = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&q=80",
] as const;

const DESIGN_W = 257;
const DESIGN_H = 377;

const MAIN_CARD_PATH =
  "M0 183 V14 Q2 1 15 0 H141 Q157 0 157 16 V34 Q157 54 178 54 H242 Q257 54 257 71 V364 Q256 377 243 377 H103 Q88 377 88 358 V274 Q88 255 73 255 H17 Q0 255 0 238 Z";

const KIWI_W = 84;
const KIWI_H = 117;

/** Local assets in public/auth/ */
const MAIN_CARD_IMAGE = "/auth/collage-chair.png";
const KIWI_CARD_IMAGE = "/auth/two.jpg";

const sceneClass = cn(
  "relative shrink-0 overflow-visible",
  "[--design-w:257] [--design-h:377] [--collage-max-w:420px]",
  "lg:[--collage-max-w:460px] xl:[--collage-max-w:500px]",
  "[--scene-w:min(var(--collage-max-w),92%,calc((100dvh-10rem)*var(--design-w)/var(--design-h)))]",
  "[--unit:calc(var(--scene-w)/var(--design-w))]",
  "w-[var(--scene-w)] h-[calc(var(--scene-w)*var(--design-h)/var(--design-w))]",
);

type AuthCollagePanelProps = {
  className?: string;
};

export function AuthCollagePanel({ className }: AuthCollagePanelProps) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center overflow-visible p-[clamp(0.5rem,2vw,1.25rem)]",
        className,
      )}
    >
      <div className={sceneClass}>
        <svg
          viewBox={`0 0 ${DESIGN_W} ${DESIGN_H}`}
          className="pointer-events-none absolute inset-0 size-full overflow-visible"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          <defs>
            <clipPath id="auth-collage-main-clip" clipPathUnits="userSpaceOnUse">
              <path d={MAIN_CARD_PATH} />
            </clipPath>
          </defs>
          <image
            href={MAIN_CARD_IMAGE}
            x={0}
            y={0}
            width={DESIGN_W}
            height={DESIGN_H}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#auth-collage-main-clip)"
          />
        </svg>

        <div
          aria-hidden
          className="absolute bottom-0 left-2 z-1 overflow-hidden rounded-3xl"
          style={{
            width: `calc(${KIWI_W} * (var(--scene-w) / ${DESIGN_W}))`,
            height: `calc(${KIWI_H} * (var(--scene-w) / ${DESIGN_W}))`,
          }}
        >
          <Image
            src={KIWI_CARD_IMAGE}
            alt=""
            fill
            priority
            unoptimized
            sizes="120px"
            className="object-cover object-center scale-125"
            draggable={false}
          />
        </div>

        <div className="absolute top-5 right-1 z-50 flex flex-col items-end rounded-lg  px-1.5 py-1 ">
          <div className="mb-1.5 flex items-center">
            {AVATAR_IMAGES.map((src, index) => (
              <div
                key={src}
                className={cn(
                  "relative size-10 shrink-0 overflow-hidden rounded-full border-2 border-[#eef0f3]",
                  index > 0 && "-ml-2.5",
                )}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="40px"
                  className="object-cover"
                  draggable={false}
                />
              </div>
            ))}
          </div>
          <p className="m-0 text-right text-xs leading-none text-muted-foreground font-medium">
            +5000 happy customers
          </p>
        </div>
      </div>
    </div>
  );
}
