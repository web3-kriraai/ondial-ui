import { createServerClient } from "@/lib/db/client";
import { PostForm } from "@/components/admin/post-form";
import type { AuthorRow } from "@/lib/db/types";

async function getAuthors(): Promise<AuthorRow[]> {
  const supabase = createServerClient();
  const { data } = await supabase.from("authors").select("*").order("name");
  return (data ?? []) as AuthorRow[];
}

export default async function NewPostPage() {
  const authors = await getAuthors();
  return <PostForm mode="new" authors={authors} />;
}
