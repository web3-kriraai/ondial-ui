import {
  HOME_PRICING_HEADING,
  HOME_PRICING_PLANS,
} from "@/data/home-pricing-plans";
import { PricingPlanCard } from "@/components/marketing/pricing-plan-card";
import { marketingSectionContainerClass, marketingSectionShellClass } from "@/config/marketing-layout";

export function HomePricingSection() {
  return (
    <section
      id="pricing"
      className={marketingSectionShellClass}
      aria-labelledby="home-pricing-title"
    >
      <div className={marketingSectionContainerClass}>
        <header className="mx-auto max-w-3xl text-center">
          <h2
            id="home-pricing-title"
            className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            {HOME_PRICING_HEADING.title}
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {HOME_PRICING_HEADING.description}
          </p>
        </header>

        <div className="mt-10 grid gap-6 sm:mt-12 md:grid-cols-2 xl:grid-cols-4 xl:gap-4">
          {HOME_PRICING_PLANS.map((plan) => (
            <PricingPlanCard
              key={plan.id}
              title={plan.title}
              description={plan.description}
              price={plan.price}
              features={plan.features}
              ctaHref={plan.ctaHref}
              ctaLabel={plan.ctaLabel}
              carouselActive
              carouselDesktop
            />
          ))}
        </div>
      </div>
    </section>
  );
}
