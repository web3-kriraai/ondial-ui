import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  normalizeCountrySlug,
  sanitizeCountrySlugInput,
} from "./slug";

describe("country slug", () => {
  it("sanitizeCountrySlugInput keeps trailing hyphen while typing", () => {
    assert.equal(sanitizeCountrySlugInput("united-"), "united-");
    assert.equal(sanitizeCountrySlugInput("united_states"), "united_states");
    assert.equal(sanitizeCountrySlugInput("United States"), "united-states");
  });

  it("normalizeCountrySlug trims and collapses on save", () => {
    assert.equal(normalizeCountrySlug("  united-states  "), "united-states");
    assert.equal(normalizeCountrySlug("united--states"), "united-states");
    assert.equal(normalizeCountrySlug("united_"), "united");
  });
});
