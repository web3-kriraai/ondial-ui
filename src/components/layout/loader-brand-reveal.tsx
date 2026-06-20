import Image from "next/image";
import { forwardRef } from "react";

import { LOADER_CUBE_FACE_COUNT, LOADER_CUBE_LOGO } from "@/data/loader-brand-images";

import styles from "./progressive-loader.module.css";

const START_LETTERS = ["O", "n"] as const;
const END_LETTERS = ["D", "i", "a", "l"] as const;

const CUBE_FACE_CLASS = [
  styles.cubeFaceFront,
  styles.cubeFaceTop,
  styles.cubeFaceBack,
  styles.cubeFaceBottom,
] as const;

type LoaderBrandRevealProps = {
  className?: string;
};

export const LoaderBrandReveal = forwardRef<HTMLDivElement, LoaderBrandRevealProps>(
  function LoaderBrandReveal({ className }, ref) {
    return (
      <div ref={ref} className={className} data-loader-brand-root aria-hidden>
        <div className={styles.brandHeading}>
          <div className={styles.headingStart} data-loader-heading-start>
            {START_LETTERS.map((letter) => (
              <span key={letter} className={styles.letterMask}>
                <span className={styles.letter} data-loader-letter>
                  {letter}
                </span>
              </span>
            ))}
          </div>

          <div className={styles.loaderBox} data-loader-box>
            <div className={styles.loaderBoxInner}>
              <div className={styles.growingImage} data-loader-growing-image>
                <div className={styles.cubeScene}>
                  <div className={styles.cube} data-loader-cube>
                    {Array.from({ length: LOADER_CUBE_FACE_COUNT }, (_, index) => (
                      <div
                        key={CUBE_FACE_CLASS[index]}
                        className={`${styles.cubeFace} ${CUBE_FACE_CLASS[index]}`}
                      >
                        <Image
                          src={LOADER_CUBE_LOGO}
                          alt="OnDial Brand Logo"
                          fill
                          sizes="80px"
                          className={styles.cubeFaceImage}
                          priority
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.headingEnd} data-loader-heading-end>
            {END_LETTERS.map((letter) => (
              <span key={letter} className={styles.letterMask}>
                <span className={styles.letter} data-loader-letter>
                  {letter}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  },
);
