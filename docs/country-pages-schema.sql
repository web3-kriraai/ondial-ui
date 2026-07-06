-- ============================================================
-- OnDial Country Pages — Supabase Database Schema
-- Run this in the Supabase SQL Editor for your project.
--
-- This table is fully independent of the blog schema
-- (docs/supabase-schema.sql) — no foreign keys to posts/authors,
-- no shared data. It can be created, seeded, and managed on its
-- own timeline.
-- ============================================================

-- ============================================================
-- 1. Table
-- ============================================================

CREATE TABLE IF NOT EXISTS country_pages (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                  TEXT UNIQUE NOT NULL,          -- URL slug, e.g. "united-states"
  country_name          TEXT NOT NULL,                 -- e.g. "United States"
  country_code          TEXT,                          -- ISO alpha-2, e.g. "US" — drives flag icon + schema.org areaServed
  meta_title            TEXT,                           -- SEO <title> (falls back to hero.title)
  meta_description      TEXT,                           -- SEO description (falls back to hero.description)
  status                TEXT DEFAULT 'draft'
                        CHECK (status IN ('draft','published','archived')),

  -- Each content section is a self-contained JSONB block. See
  -- docs/country-pages-seed-united-states.sql for a fully populated
  -- example of every shape, and src/lib/countries/types.ts for the
  -- TypeScript mirror of each column.
  hero                  JSONB NOT NULL,  -- { title, description, bullets:[{title,description}], primaryCta:{label,href}, secondaryCta?:{label,href} }
  overview              JSONB,           -- { title, paragraphs: string[] }
  why_choose_us         JSONB,           -- { title, intro?, items:[{title,description}] }
  industry_solutions    JSONB,           -- { title, intro?, industries:[{name,description,useCases:string[]}] }
  language_support      JSONB,           -- { title, intro?, languages:[{name,description}], note? }
  use_cases             JSONB,           -- { title, intro?, items:[{title,description}] }
  compliance_security   JSONB,           -- { title, intro?, items:[{title,description}] }
  integrations          JSONB,           -- { title, intro?, groups:[{label,items:string[]}], note? }
  comparisons           JSONB,           -- { title, items:[{title,description}] }
  faqs                  JSONB,           -- [{question,answer}]

  created_at            TIMESTAMPTZ DEFAULT now(),
  updated_at            TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 2. Indexes
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_country_pages_slug
  ON country_pages(slug);

CREATE INDEX IF NOT EXISTS idx_country_pages_status
  ON country_pages(status);

CREATE INDEX IF NOT EXISTS idx_country_pages_country_code
  ON country_pages(country_code);

-- ============================================================
-- 3. Auto-update updated_at trigger
-- ============================================================
-- Reuses the same trigger function created by docs/supabase-schema.sql.
-- If this table is being set up in a project that does NOT already
-- have the blog schema applied, uncomment the function definition below.

-- CREATE OR REPLACE FUNCTION update_updated_at()
-- RETURNS TRIGGER AS $$
-- BEGIN
--   NEW.updated_at = now();
--   RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS country_pages_updated_at ON country_pages;
CREATE TRIGGER country_pages_updated_at
  BEFORE UPDATE ON country_pages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- 4. Row Level Security (RLS)
-- ============================================================

ALTER TABLE country_pages ENABLE ROW LEVEL SECURITY;

-- Only published country pages are visible to the public anon key
CREATE POLICY "public read published country pages"
  ON country_pages FOR SELECT
  USING (status = 'published');

-- The service-role key bypasses RLS entirely (used by the SEO admin
-- panel and its API routes). This policy only matters for a future
-- Supabase Auth-based admin UI using the anon key + session token.
CREATE POLICY "admin full access country pages"
  ON country_pages FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================================
-- 5. Role grants
-- ============================================================
-- Supabase does not auto-grant privileges on manually-created tables.

GRANT USAGE ON SCHEMA public TO anon, authenticated;

GRANT SELECT ON country_pages TO anon, authenticated;

GRANT ALL ON country_pages TO service_role;

-- ============================================================
-- 6. Verify
-- ============================================================
-- After running, confirm with:
--   SELECT table_name FROM information_schema.tables
--   WHERE table_schema = 'public';
-- Expected to now include: country_pages
