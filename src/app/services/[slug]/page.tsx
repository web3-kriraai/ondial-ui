import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MarketingPageBody } from "@/components/layout/marketing-page-body";
import { Button } from "@/components/ui/button";
import { SERVICES_NAV_ITEMS } from "@/config/services-nav";

type Props = {
  params: Promise<{ slug: string }>;
};

function findService(slug: string) {
  return SERVICES_NAV_ITEMS.find((item) => item.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) return { title: "Service" };
  return {
    title: service.label,
    description: `Learn how OnDial's ${service.label} automates voice workflows end to end.`,
  };
}

export default async function ServiceAgentPage({ params }: Props) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) notFound();

  return (
    <MarketingPageBody
      title={service.label}
      description="Purpose-built voice automation for high-volume conversations, follow-ups, and handoffs to your team."
    >
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          Configure scripts, routing, and CRM sync for {service.label.toLowerCase()} workflows.
        </p>
        <Button variant="outline" className="self-center" render={<Link href="/services" prefetch />} nativeButton={false}>
          All services
        </Button>
      </div>
    </MarketingPageBody>
  );
}
