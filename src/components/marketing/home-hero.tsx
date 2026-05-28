export function HomeHero() {
  return (
    <section className="border-b border-border/50 bg-background px-4 pb-12 pt-24 sm:px-6 sm:pb-14 sm:pt-28 lg:px-8 lg:pb-16 lg:pt-32">
      <div className="mx-auto w-full min-w-0 max-w-[min(100%,80rem)]">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-medium text-primary">Ondial</p>
          <h1 className="text-balance text-3xl font-semibold leading-snug text-foreground sm:text-4xl lg:text-5xl">
            AI voice calls that sound human, at any scale
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Automate reminders, updates, surveys, and outreach with natural-sounding
            voice agents—built for teams that need reliability without losing the personal touch.
          </p>
        </div>
      </div>
    </section>
  );
}
