import Hero from "@/components/marketing/hero";

export default function HomePage() {
  return (
    <Hero>
      <p className="text-sm text-muted-foreground">Starter</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">Ondial</h1>
      <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">
        Shell and routes are ready. Build layout, navigation, and pages in{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">src/components</code> and{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">src/app</code>.
      </p>
    </Hero>
  );
}
