-- ============================================================
-- OnDial Blog — Supabase Database Schema
-- Run this in the Supabase SQL Editor for your project.
-- ============================================================

-- ============================================================
-- 1. Tables
-- ============================================================

-- Authors (must be created before posts because posts reference them)
CREATE TABLE IF NOT EXISTS authors (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         TEXT UNIQUE NOT NULL,           -- e.g. "john-smith"
  name         TEXT NOT NULL,                  -- e.g. "John Smith"
  designation  TEXT,                           -- e.g. "CTO at OnDial"
  description  TEXT,                           -- author bio paragraph
  avatar_url   TEXT,                           -- full URL to avatar image
  created_at   TIMESTAMPTZ DEFAULT now()
);

-- Blog posts
CREATE TABLE IF NOT EXISTS posts (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                  TEXT UNIQUE NOT NULL,           -- URL slug, lowercase
  title                 TEXT NOT NULL,
  meta_title            TEXT,                           -- SEO <title> (falls back to title)
  meta_description      TEXT,                           -- SEO description + card excerpt
  publish_date          TIMESTAMPTZ NOT NULL,           -- used for sort + card date
  featured_image_url    TEXT,                           -- hero + card image
  featured_image_width  INT,
  featured_image_height INT,
  body                  JSONB,                          -- { type:"html", content:"<html>" } for admin-created posts
                                                        -- or Contentful Rich Text { json:{...}, links:{...} } for migrated posts
  author_id             UUID REFERENCES authors(id),   -- nullable — uses "OnDial Team" default
  category              TEXT DEFAULT 'Insights',        -- shown as badge on card
  status                TEXT DEFAULT 'draft'
                        CHECK (status IN ('draft','published','archived')),
  created_at            TIMESTAMPTZ DEFAULT now(),
  updated_at            TIMESTAMPTZ DEFAULT now()
);

-- FAQ section (one per post, optional)
CREATE TABLE IF NOT EXISTS faq_sections (
  id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id  UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  title    TEXT DEFAULT 'Frequently asked questions'
);

-- Individual FAQ items inside a section
CREATE TABLE IF NOT EXISTS faq_items (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID NOT NULL REFERENCES faq_sections(id) ON DELETE CASCADE,
  question   TEXT NOT NULL,
  answer     TEXT NOT NULL,
  sort_order INT DEFAULT 0
);

-- ============================================================
-- 2. Indexes
-- ============================================================

-- Matches the 3 query patterns in fetch-blogs.ts exactly
CREATE INDEX IF NOT EXISTS idx_posts_slug
  ON posts(slug);

CREATE INDEX IF NOT EXISTS idx_posts_publish_date
  ON posts(publish_date DESC);

CREATE INDEX IF NOT EXISTS idx_posts_author_id
  ON posts(author_id);

CREATE INDEX IF NOT EXISTS idx_posts_status
  ON posts(status);

CREATE INDEX IF NOT EXISTS idx_authors_slug
  ON authors(slug);

CREATE INDEX IF NOT EXISTS idx_faq_sections_post_id
  ON faq_sections(post_id);

CREATE INDEX IF NOT EXISTS idx_faq_items_section_id
  ON faq_items(section_id);

-- ============================================================
-- 3. Auto-update updated_at trigger
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS posts_updated_at ON posts;
CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- 4. Row Level Security (RLS)
-- ============================================================

ALTER TABLE posts        ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors      ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_items    ENABLE ROW LEVEL SECURITY;

-- ---------- Public read policies ----------

-- Only published posts are visible to the public anon key
CREATE POLICY "public read published posts"
  ON posts FOR SELECT
  USING (status = 'published');

-- All authors are publicly readable
CREATE POLICY "public read authors"
  ON authors FOR SELECT
  USING (true);

-- FAQ sections + items follow their parent post's visibility
CREATE POLICY "public read faq sections"
  ON faq_sections FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM posts
      WHERE posts.id = faq_sections.post_id
        AND posts.status = 'published'
    )
  );

CREATE POLICY "public read faq items"
  ON faq_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM faq_sections
      JOIN posts ON posts.id = faq_sections.post_id
      WHERE faq_sections.id = faq_items.section_id
        AND posts.status = 'published'
    )
  );

-- ---------- Admin write policies ----------
-- The service-role key bypasses RLS entirely, so these policies
-- only apply to authenticated users (useful for a future Supabase Auth-based
-- admin UI that uses the anon key + session token).

CREATE POLICY "admin full access posts"
  ON posts FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "admin full access authors"
  ON authors FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "admin full access faq sections"
  ON faq_sections FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "admin full access faq items"
  ON faq_items FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================================
-- 5. Storage bucket for blog images
-- ============================================================
-- Run this separately in the Supabase dashboard → Storage → New bucket
-- or uncomment and run here if your project supports it:
--
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('blog-images', 'blog-images', true)
-- ON CONFLICT (id) DO NOTHING;
--
-- CREATE POLICY "public read blog images"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'blog-images');
--
-- CREATE POLICY "admin upload blog images"
--   ON storage.objects FOR INSERT
--   WITH CHECK (bucket_id = 'blog-images' AND auth.role() = 'service_role');

-- ============================================================
-- 6. Role grants
-- ============================================================
-- Supabase does not auto-grant privileges on manually-created tables.
-- Run these so the anon key can read published posts and the service
-- role has full write access.

GRANT USAGE ON SCHEMA public TO anon, authenticated;

GRANT SELECT ON posts, authors, faq_sections, faq_items TO anon, authenticated;

GRANT ALL ON posts, authors, faq_sections, faq_items TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- ============================================================
-- 7. Verify
-- ============================================================
-- After running, confirm with:
--   SELECT table_name FROM information_schema.tables
--   WHERE table_schema = 'public';
-- Expected: authors, posts, faq_sections, faq_items
