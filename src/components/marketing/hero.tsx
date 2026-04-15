import type { ReactNode } from "react";

type HeroProps = {
  children?: ReactNode;
};

/** Minimal full-viewport slot — add your own visuals or replace entirely. */
export default function Hero({ children }: HeroProps) {
  return (
    <section className="flex flex-col justify-center px-4 py-16 sm:px-6">
      <div className="mx-auto w-full max-w-2xl">{children}</div>
    </section>
  );
}
