-- ============================================================
-- OnDial Voice / Language Landing Pages — Supabase Schema
-- Run in the Supabase SQL Editor (after docs/supabase-schema.sql).
--
-- Unified model for:
--   • data/voice-ai-agent.json  (88 language / UK pages)
--   • Contentful bestAiVoiceAgentState (142 city + state pages)
--
-- Slug conventions
--   language   → best-{lang}-voice-ai-agent-{region}   e.g. best-telugu-voice-ai-agent-andhra-pradesh
--   uk-english → best-english-voice-ai-agent-{region}  e.g. best-english-voice-ai-agent-london
--   city       → best-ai-voice-agent-{city}              e.g. best-ai-voice-agent-chennai
-- ============================================================

-- ============================================================
-- 1. Tables
-- ============================================================

-- Core landing page (maps to JSON languages.{key} or Contentful entry id = slug)
CREATE TABLE IF NOT EXISTS voice_pages (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                TEXT UNIQUE NOT NULL,              -- URL slug; Contentful entry id when migrated from CMS
  content_key         TEXT NOT NULL,                     -- internal key e.g. bengali, telugu_andhra_pradesh
  page_type           TEXT NOT NULL
                      CHECK (page_type IN ('language', 'city', 'uk-english')),
  language_code       TEXT,                              -- e.g. telugu, hindi, english (nullable for city pages)
  region              TEXT,                              -- e.g. andhra-pradesh, chennai, london
  status              TEXT DEFAULT 'draft'
                      CHECK (status IN ('draft', 'published', 'archived')),
  source              TEXT DEFAULT 'manual'
                      CHECK (source IN ('json', 'contentful', 'manual')),
  contentful_entry_id TEXT,                              -- original Contentful sys.id (usually same as slug)
  meta_title          TEXT,
  meta_description    TEXT,
  canonical_url       TEXT,
  created_at          TIMESTAMPTZ DEFAULT now(),
  updated_at          TIMESTAMPTZ DEFAULT now()
);

-- Hero (JSON: hero | Contentful: record.hero)
CREATE TABLE IF NOT EXISTS voice_page_hero (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id               UUID NOT NULL UNIQUE REFERENCES voice_pages(id) ON DELETE CASCADE,
  title                 TEXT NOT NULL,
  subtitle              TEXT,
  description           TEXT,
  primary_button_text   TEXT,
  secondary_button_text TEXT,
  primary_button_link   TEXT,
  secondary_button_link TEXT,
  image_src             TEXT,
  image_alt             TEXT,
  state_name            TEXT                               -- optional CMS city/state label
);

-- About (JSON: about | Contentful: record.about)
CREATE TABLE IF NOT EXISTS voice_page_about (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id          UUID NOT NULL UNIQUE REFERENCES voice_pages(id) ON DELETE CASCADE,
  title            TEXT NOT NULL,
  description      TEXT,
  image_src        TEXT,
  image_alt        TEXT,
  background_color TEXT,                                   -- Tailwind gradient token e.g. from-blue-50 to-indigo-100
  accent_color     TEXT
);

-- About bullet points (JSON: about.features[] | Contentful: about.features[])
CREATE TABLE IF NOT EXISTS voice_page_about_features (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id    UUID NOT NULL REFERENCES voice_pages(id) ON DELETE CASCADE,
  text       TEXT NOT NULL,
  sort_order INT DEFAULT 0
);

-- About stat cards (JSON: about.stats[] | Contentful: about.stats[])
CREATE TABLE IF NOT EXISTS voice_page_about_stats (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id     UUID NOT NULL REFERENCES voice_pages(id) ON DELETE CASCADE,
  value       TEXT NOT NULL,
  label       TEXT NOT NULL,
  description TEXT,
  sort_order  INT DEFAULT 0
);

-- Key features section header (JSON: keyFeatures | Contentful: record.keyFeatures)
CREATE TABLE IF NOT EXISTS voice_page_key_features_section (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id     UUID NOT NULL UNIQUE REFERENCES voice_pages(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  subtitle    TEXT,
  description TEXT
);

-- Key feature cards (JSON: keyFeatures.features[] | Contentful: keyFeatures.features[])
CREATE TABLE IF NOT EXISTS voice_page_key_feature_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id  UUID NOT NULL REFERENCES voice_page_key_features_section(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  description TEXT,
  icon        TEXT,                                        -- emoji or Lucide icon name
  gradient    TEXT,
  sort_order  INT DEFAULT 0
);

-- How it works section (JSON: howAgentWorks | Contentful: record.howAgentWorks)
CREATE TABLE IF NOT EXISTS voice_page_how_works_section (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id     UUID NOT NULL UNIQUE REFERENCES voice_pages(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  subtitle    TEXT,
  description TEXT
);

-- How-it-works steps (JSON: howAgentWorks.steps[] | Contentful: howAgentWorks.steps[])
CREATE TABLE IF NOT EXISTS voice_page_how_steps (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id  UUID NOT NULL REFERENCES voice_page_how_works_section(id) ON DELETE CASCADE,
  step_number INT,
  title       TEXT NOT NULL,
  description TEXT,
  icon        TEXT,                                        -- Lucide icon name e.g. Mic, Brain
  accent      TEXT,                                        -- Tailwind gradient token
  sort_order  INT DEFAULT 0
);

-- Use cases section header (JSON: useCases | Contentful: record.useCases)
CREATE TABLE IF NOT EXISTS voice_page_use_cases_section (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id     UUID NOT NULL UNIQUE REFERENCES voice_pages(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  subtitle    TEXT,
  description TEXT
);

-- Industry / use-case cards (JSON: useCases.industries[] | Contentful: useCases.industries[])
CREATE TABLE IF NOT EXISTS voice_page_use_case_industries (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id  UUID NOT NULL REFERENCES voice_page_use_cases_section(id) ON DELETE CASCADE,
  external_id INT,                                         -- JSON id field when present
  name        TEXT NOT NULL,
  description TEXT,
  icon        TEXT,
  category    TEXT,
  color       TEXT,
  bg_color    TEXT,
  use_cases   TEXT[] DEFAULT '{}',                       -- industry.useCases string tags
  sort_order  INT DEFAULT 0
);

-- Key benefits section — JSON language pages only (JSON: keyBenefits)
CREATE TABLE IF NOT EXISTS voice_page_key_benefits_section (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id     UUID NOT NULL UNIQUE REFERENCES voice_pages(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS voice_page_key_benefit_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id  UUID NOT NULL REFERENCES voice_page_key_benefits_section(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  description TEXT,
  icon        TEXT,
  sort_order  INT DEFAULT 0
);

-- Regional accents — JSON language pages only (JSON: accents)
CREATE TABLE IF NOT EXISTS voice_page_accents_section (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id     UUID NOT NULL UNIQUE REFERENCES voice_pages(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  subtitle    TEXT,
  description TEXT
);

CREATE TABLE IF NOT EXISTS voice_page_accent_items (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID NOT NULL REFERENCES voice_page_accents_section(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  sort_order INT DEFAULT 0
);

-- Benefits grid — Contentful city pages only (Contentful: record.benefits)
CREATE TABLE IF NOT EXISTS voice_page_benefits_section (
  id      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID NOT NULL UNIQUE REFERENCES voice_pages(id) ON DELETE CASCADE,
  title   TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS voice_page_benefit_lines (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID NOT NULL REFERENCES voice_page_benefits_section(id) ON DELETE CASCADE,
  text       TEXT NOT NULL,
  sort_order INT DEFAULT 0
);

-- Business benefits — Contentful city pages only (Contentful: record.businessBenefits)
CREATE TABLE IF NOT EXISTS voice_page_business_benefits_section (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id     UUID NOT NULL UNIQUE REFERENCES voice_pages(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS voice_page_business_benefit_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id  UUID NOT NULL REFERENCES voice_page_business_benefits_section(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  description TEXT,
  icon        TEXT,
  sort_order  INT DEFAULT 0
);

-- Why choose section (JSON: whyChoose | Contentful: record.whyChoose)
CREATE TABLE IF NOT EXISTS voice_page_why_choose_section (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id        UUID NOT NULL UNIQUE REFERENCES voice_pages(id) ON DELETE CASCADE,
  subtitle       TEXT,
  title          TEXT NOT NULL,
  description    TEXT,
  highlight_text TEXT
);

CREATE TABLE IF NOT EXISTS voice_page_why_features (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id  UUID NOT NULL REFERENCES voice_page_why_choose_section(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  description TEXT,
  icon        TEXT,
  color       TEXT,
  sort_order  INT DEFAULT 0
);

-- CTA block (JSON: cta | Contentful: record.cta)
CREATE TABLE IF NOT EXISTS voice_page_cta (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id               UUID NOT NULL UNIQUE REFERENCES voice_pages(id) ON DELETE CASCADE,
  badge_icon            TEXT,
  badge_text            TEXT,
  title                 TEXT,
  highlighted_title     TEXT,
  description           TEXT,
  primary_button_text   TEXT,
  secondary_button_text TEXT,
  primary_button_link   TEXT,
  secondary_button_link TEXT,
  image_src             TEXT,
  image_alt             TEXT
);

-- FAQ items (JSON: faqs[] | Contentful: record.faqs[])
CREATE TABLE IF NOT EXISTS voice_page_faq_items (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id    UUID NOT NULL REFERENCES voice_pages(id) ON DELETE CASCADE,
  question   TEXT NOT NULL,
  answer     TEXT NOT NULL,
  sort_order INT DEFAULT 0
);

-- ============================================================
-- 2. Indexes
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_voice_pages_slug
  ON voice_pages(slug);

CREATE INDEX IF NOT EXISTS idx_voice_pages_content_key
  ON voice_pages(content_key);

CREATE INDEX IF NOT EXISTS idx_voice_pages_page_type
  ON voice_pages(page_type);

CREATE INDEX IF NOT EXISTS idx_voice_pages_status
  ON voice_pages(status);

CREATE INDEX IF NOT EXISTS idx_voice_pages_language_code
  ON voice_pages(language_code);

CREATE INDEX IF NOT EXISTS idx_voice_page_faq_items_page_id
  ON voice_page_faq_items(page_id);

CREATE INDEX IF NOT EXISTS idx_voice_page_about_features_page_id
  ON voice_page_about_features(page_id);

CREATE INDEX IF NOT EXISTS idx_voice_page_about_stats_page_id
  ON voice_page_about_stats(page_id);

CREATE INDEX IF NOT EXISTS idx_voice_page_key_feature_items_section_id
  ON voice_page_key_feature_items(section_id);

CREATE INDEX IF NOT EXISTS idx_voice_page_how_steps_section_id
  ON voice_page_how_steps(section_id);

CREATE INDEX IF NOT EXISTS idx_voice_page_use_case_industries_section_id
  ON voice_page_use_case_industries(section_id);

CREATE INDEX IF NOT EXISTS idx_voice_page_why_features_section_id
  ON voice_page_why_features(section_id);

-- ============================================================
-- 3. Auto-update updated_at trigger
-- ============================================================

DROP TRIGGER IF EXISTS voice_pages_updated_at ON voice_pages;
CREATE TRIGGER voice_pages_updated_at
  BEFORE UPDATE ON voice_pages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- 4. Row Level Security (RLS)
-- ============================================================

ALTER TABLE voice_pages                          ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_page_hero                      ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_page_about                     ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_page_about_features            ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_page_about_stats               ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_page_key_features_section      ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_page_key_feature_items         ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_page_how_works_section         ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_page_how_steps                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_page_use_cases_section         ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_page_use_case_industries       ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_page_key_benefits_section      ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_page_key_benefit_items         ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_page_accents_section           ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_page_accent_items              ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_page_benefits_section          ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_page_benefit_lines             ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_page_business_benefits_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_page_business_benefit_items    ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_page_why_choose_section        ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_page_why_features              ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_page_cta                       ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_page_faq_items                 ENABLE ROW LEVEL SECURITY;

-- Helper: child rows are public only when parent page is published
CREATE OR REPLACE FUNCTION voice_page_is_published(target_page_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM voice_pages
    WHERE voice_pages.id = target_page_id
      AND voice_pages.status = 'published'
  );
$$ LANGUAGE sql STABLE;

-- ---------- Public read policies ----------

CREATE POLICY "public read published voice pages"
  ON voice_pages FOR SELECT
  USING (status = 'published');

CREATE POLICY "public read voice page hero"
  ON voice_page_hero FOR SELECT
  USING (voice_page_is_published(page_id));

CREATE POLICY "public read voice page about"
  ON voice_page_about FOR SELECT
  USING (voice_page_is_published(page_id));

CREATE POLICY "public read voice page about features"
  ON voice_page_about_features FOR SELECT
  USING (voice_page_is_published(page_id));

CREATE POLICY "public read voice page about stats"
  ON voice_page_about_stats FOR SELECT
  USING (voice_page_is_published(page_id));

CREATE POLICY "public read voice page key features section"
  ON voice_page_key_features_section FOR SELECT
  USING (voice_page_is_published(page_id));

CREATE POLICY "public read voice page key feature items"
  ON voice_page_key_feature_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM voice_page_key_features_section s
      WHERE s.id = voice_page_key_feature_items.section_id
        AND voice_page_is_published(s.page_id)
    )
  );

CREATE POLICY "public read voice page how works section"
  ON voice_page_how_works_section FOR SELECT
  USING (voice_page_is_published(page_id));

CREATE POLICY "public read voice page how steps"
  ON voice_page_how_steps FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM voice_page_how_works_section s
      WHERE s.id = voice_page_how_steps.section_id
        AND voice_page_is_published(s.page_id)
    )
  );

CREATE POLICY "public read voice page use cases section"
  ON voice_page_use_cases_section FOR SELECT
  USING (voice_page_is_published(page_id));

CREATE POLICY "public read voice page use case industries"
  ON voice_page_use_case_industries FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM voice_page_use_cases_section s
      WHERE s.id = voice_page_use_case_industries.section_id
        AND voice_page_is_published(s.page_id)
    )
  );

CREATE POLICY "public read voice page key benefits section"
  ON voice_page_key_benefits_section FOR SELECT
  USING (voice_page_is_published(page_id));

CREATE POLICY "public read voice page key benefit items"
  ON voice_page_key_benefit_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM voice_page_key_benefits_section s
      WHERE s.id = voice_page_key_benefit_items.section_id
        AND voice_page_is_published(s.page_id)
    )
  );

CREATE POLICY "public read voice page accents section"
  ON voice_page_accents_section FOR SELECT
  USING (voice_page_is_published(page_id));

CREATE POLICY "public read voice page accent items"
  ON voice_page_accent_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM voice_page_accents_section s
      WHERE s.id = voice_page_accent_items.section_id
        AND voice_page_is_published(s.page_id)
    )
  );

CREATE POLICY "public read voice page benefits section"
  ON voice_page_benefits_section FOR SELECT
  USING (voice_page_is_published(page_id));

CREATE POLICY "public read voice page benefit lines"
  ON voice_page_benefit_lines FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM voice_page_benefits_section s
      WHERE s.id = voice_page_benefit_lines.section_id
        AND voice_page_is_published(s.page_id)
    )
  );

CREATE POLICY "public read voice page business benefits section"
  ON voice_page_business_benefits_section FOR SELECT
  USING (voice_page_is_published(page_id));

CREATE POLICY "public read voice page business benefit items"
  ON voice_page_business_benefit_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM voice_page_business_benefits_section s
      WHERE s.id = voice_page_business_benefit_items.section_id
        AND voice_page_is_published(s.page_id)
    )
  );

CREATE POLICY "public read voice page why choose section"
  ON voice_page_why_choose_section FOR SELECT
  USING (voice_page_is_published(page_id));

CREATE POLICY "public read voice page why features"
  ON voice_page_why_features FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM voice_page_why_choose_section s
      WHERE s.id = voice_page_why_features.section_id
        AND voice_page_is_published(s.page_id)
    )
  );

CREATE POLICY "public read voice page cta"
  ON voice_page_cta FOR SELECT
  USING (voice_page_is_published(page_id));

CREATE POLICY "public read voice page faq items"
  ON voice_page_faq_items FOR SELECT
  USING (voice_page_is_published(page_id));

-- ---------- Admin write policies ----------

CREATE POLICY "admin full access voice pages"
  ON voice_pages FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "admin full access voice page hero"
  ON voice_page_hero FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "admin full access voice page about"
  ON voice_page_about FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "admin full access voice page about features"
  ON voice_page_about_features FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "admin full access voice page about stats"
  ON voice_page_about_stats FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "admin full access voice page key features section"
  ON voice_page_key_features_section FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "admin full access voice page key feature items"
  ON voice_page_key_feature_items FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "admin full access voice page how works section"
  ON voice_page_how_works_section FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "admin full access voice page how steps"
  ON voice_page_how_steps FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "admin full access voice page use cases section"
  ON voice_page_use_cases_section FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "admin full access voice page use case industries"
  ON voice_page_use_case_industries FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "admin full access voice page key benefits section"
  ON voice_page_key_benefits_section FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "admin full access voice page key benefit items"
  ON voice_page_key_benefit_items FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "admin full access voice page accents section"
  ON voice_page_accents_section FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "admin full access voice page accent items"
  ON voice_page_accent_items FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "admin full access voice page benefits section"
  ON voice_page_benefits_section FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "admin full access voice page benefit lines"
  ON voice_page_benefit_lines FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "admin full access voice page business benefits section"
  ON voice_page_business_benefits_section FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "admin full access voice page business benefit items"
  ON voice_page_business_benefit_items FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "admin full access voice page why choose section"
  ON voice_page_why_choose_section FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "admin full access voice page why features"
  ON voice_page_why_features FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "admin full access voice page cta"
  ON voice_page_cta FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "admin full access voice page faq items"
  ON voice_page_faq_items FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================================
-- 5. Role grants
-- ============================================================

GRANT SELECT ON
  voice_pages,
  voice_page_hero,
  voice_page_about,
  voice_page_about_features,
  voice_page_about_stats,
  voice_page_key_features_section,
  voice_page_key_feature_items,
  voice_page_how_works_section,
  voice_page_how_steps,
  voice_page_use_cases_section,
  voice_page_use_case_industries,
  voice_page_key_benefits_section,
  voice_page_key_benefit_items,
  voice_page_accents_section,
  voice_page_accent_items,
  voice_page_benefits_section,
  voice_page_benefit_lines,
  voice_page_business_benefits_section,
  voice_page_business_benefit_items,
  voice_page_why_choose_section,
  voice_page_why_features,
  voice_page_cta,
  voice_page_faq_items
TO anon, authenticated;

GRANT ALL ON
  voice_pages,
  voice_page_hero,
  voice_page_about,
  voice_page_about_features,
  voice_page_about_stats,
  voice_page_key_features_section,
  voice_page_key_feature_items,
  voice_page_how_works_section,
  voice_page_how_steps,
  voice_page_use_cases_section,
  voice_page_use_case_industries,
  voice_page_key_benefits_section,
  voice_page_key_benefit_items,
  voice_page_accents_section,
  voice_page_accent_items,
  voice_page_benefits_section,
  voice_page_benefit_lines,
  voice_page_business_benefits_section,
  voice_page_business_benefit_items,
  voice_page_why_choose_section,
  voice_page_why_features,
  voice_page_cta,
  voice_page_faq_items
TO service_role;

GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- ============================================================
-- 6. Field mapping reference
-- ============================================================
--
-- JSON (data/voice-ai-agent.json)          → Supabase
-- ─────────────────────────────────────────────────────────────
-- languages.{key}.slug                   → voice_pages.slug
-- languages.{key} key name                 → voice_pages.content_key
-- languages.{key}.meta                     → voice_pages.meta_*
-- languages.{key}.hero                     → voice_page_hero
-- languages.{key}.about                    → voice_page_about + _features + _stats
-- languages.{key}.keyFeatures              → voice_page_key_features_section + _items
-- languages.{key}.howAgentWorks            → voice_page_how_works_section + _steps
-- languages.{key}.useCases                 → voice_page_use_cases_section + _industries
-- languages.{key}.keyBenefits              → voice_page_key_benefits_section + _items
-- languages.{key}.accents                  → voice_page_accents_section + _items
-- languages.{key}.whyChoose                → voice_page_why_choose_section + _features
-- languages.{key}.cta                      → voice_page_cta
-- languages.{key}.faqs[]                   → voice_page_faq_items
--
-- Contentful (bestAiVoiceAgentState)       → Supabase
-- ─────────────────────────────────────────────────────────────
-- entry.sys.id                             → voice_pages.slug + contentful_entry_id
-- fields.states.en-US                      → child tables (same keys as JSON)
-- fields.states.en-US.benefits             → voice_page_benefits_section + _lines
-- fields.states.en-US.businessBenefits     → voice_page_business_benefits_section + _items
--
-- Page type inference (matches scripts/split-voice-pages.mjs):
--   best-ai-voice-agent-*                  → city
--   best-english-voice-ai-agent-*            → uk-english
--   best-*-voice-ai-agent-*                  → language
--
-- ============================================================
-- 7. Verify
-- ============================================================
-- After running, confirm with:
--   SELECT table_name FROM information_schema.tables
--   WHERE table_schema = 'public' AND table_name LIKE 'voice_page%'
--   ORDER BY table_name;
--
-- Expected: voice_pages + 22 child tables (24 total)
