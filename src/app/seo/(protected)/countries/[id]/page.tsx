import { notFound } from "next/navigation";

import { CountryPageForm } from "@/components/admin/country-page-form";
import { createServerClient } from "@/lib/db/client";
import type { CountryPageRow } from "@/lib/db/types";

async function getCountryPage(id: string): Promise<CountryPageRow | null> {
  const supabase = createServerClient();
  const { data } = await supabase.from("country_pages").select("*").eq("id", id).single();
  return data as CountryPageRow | null;
}

type Props = { params: Promise<{ id: string }> };

export default async function EditCountryPagePage({ params }: Props) {
  const { id } = await params;

  const countryPage = await getCountryPage(id);
  if (!countryPage) notFound();

  return <CountryPageForm mode="edit" countryPageId={id} initialData={countryPage} />;
}
