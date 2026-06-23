import { notFound } from "next/navigation";

import { createServerClient } from "@/lib/db/client";
import { PostForm } from "@/components/admin/post-form";
import type { AuthorRow, PostWithDetail } from "@/lib/db/types";

async function getPost(id: string): Promise<PostWithDetail | null> {
  const supabase = createServerClient();
  const { data } = await supabase
    .from("posts")
    .select("*, faq_sections(*, faq_items(*))")
    .eq("id", id)
    .single();
  return data as PostWithDetail | null;
}

async function getAuthors(): Promise<AuthorRow[]> {
  const supabase = createServerClient();
  const { data } = await supabase.from("authors").select("*").order("name");
  return (data ?? []) as AuthorRow[];
}

type Props = { params: Promise<{ id: string }> };

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;

  const [post, authors] = await Promise.all([getPost(id), getAuthors()]);
  if (!post) notFound();

  return <PostForm mode="edit" postId={id} initialData={post as PostWithDetail} authors={authors} />;
}
