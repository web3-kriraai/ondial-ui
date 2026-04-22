import HeroSlider from "@/components/marketing/hero-slider";
import ServicesSlider from "@/components/marketing/services-slider";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroSlider />
      
      <ServicesSlider />
      
      {/* Other home page sections can be added here */}
      <div className="container mx-auto px-6 py-24 sm:px-12">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary">Platform Status</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Shell and routes are ready.
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Continue building your layout, navigation, and custom pages in{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm font-semibold text-foreground">
              src/components
            </code>{" "}
            and{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm font-semibold text-foreground">
              src/app
            </code>.
          </p>
        </div>
      </div>
    </main>
  );
}
