import { redirect } from "next/navigation";

import { SEO_POSTS_PATH } from "@/config/seo-admin";

export default function SeoIndexPage() {
  redirect(SEO_POSTS_PATH);
}
