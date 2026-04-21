import type { ReactNode } from "react";

type HeroProps = {
  children?: ReactNode;
};

/** Minimal full-viewport slot — add your own visuals or replace entirely. */
export default function Hero({ children }: HeroProps) {
  return (
    <section className="relative flex min-h-screen w-full flex-1 flex-col justify-center overflow-hidden px-4 py-16 sm:px-6">
      {/* Soft Purple Glows */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.08),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(167,139,250,0.05),transparent_50%)]" />
      
      {/* Content wrapper */}
      <div className="relative z-10 mx-auto w-full max-w-2xl">
        {children}
      </div>
    </section>
  );
}
