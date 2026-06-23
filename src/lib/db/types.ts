/**
 * TypeScript types that mirror the Supabase database schema exactly.
 * These are the raw DB row shapes — see shapers.ts for how they are
 * converted into the existing BlogPostSummary / BlogPostDetail UI types.
 */

export type AuthorRow = {
  id: string;
  slug: string;
  name: string;
  designation: string | null;
  description: string | null;
  avatar_url: string | null;
  created_at: string;
};

export type PostRow = {
  id: string;
  slug: string;
  title: string;
  meta_title: string | null;
  meta_description: string | null;
  publish_date: string;
  featured_image_url: string | null;
  featured_image_width: number | null;
  featured_image_height: number | null;
  /**
   * Stored as Contentful Rich Text Document JSON.
   * Rendered by the existing BlogRichText component without any changes.
   */
  body: unknown | null;
  author_id: string | null;
  category: string;
  status: "draft" | "published" | "archived";
  created_at: string;
  updated_at: string;
};

export type FaqSectionRow = {
  id: string;
  post_id: string;
  title: string;
};

export type FaqItemRow = {
  id: string;
  section_id: string;
  question: string;
  answer: string;
  sort_order: number;
};

/** Post joined with its author (used in list / summary queries) */
export type PostWithAuthor = PostRow & {
  authors: AuthorRow | null;
};

/** Post joined with author + faq_sections + faq_items (used in detail query) */
export type PostWithDetail = PostRow & {
  authors: AuthorRow | null;
  faq_sections: Array<
    FaqSectionRow & {
      faq_items: FaqItemRow[];
    }
  > | null;
};

/**
 * Supabase generated Database type used for the typed client.
 * Matches the exact structure Supabase's TypeScript client expects.
 * Expanded only to the tables this app uses — extend as needed.
 */
export type Database = {
  public: {
    Tables: {
      authors: {
        Row: AuthorRow;
        Insert: Omit<AuthorRow, "id" | "created_at">;
        Update: Partial<Omit<AuthorRow, "id" | "created_at">>;
        Relationships: [];
      };
      posts: {
        Row: PostRow;
        Insert: Omit<PostRow, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<PostRow, "id" | "created_at" | "updated_at">>;
        Relationships: [];
      };
      faq_sections: {
        Row: FaqSectionRow;
        Insert: Omit<FaqSectionRow, "id">;
        Update: Partial<Omit<FaqSectionRow, "id">>;
        Relationships: [];
      };
      faq_items: {
        Row: FaqItemRow;
        Insert: Omit<FaqItemRow, "id">;
        Update: Partial<Omit<FaqItemRow, "id">>;
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};
