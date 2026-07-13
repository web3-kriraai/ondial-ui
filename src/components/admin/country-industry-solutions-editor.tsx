"use client";

import { Plus, Trash2 } from "lucide-react";

import { InlineRichTextEditor } from "@/components/admin/inline-rich-text-editor";
import type { CountryIndustryItem, CountryIndustrySolutionsContent } from "@/lib/countries/types";

const MICRO_LABEL = "mb-1 block text-[11px] font-semibold uppercase tracking-wide text-gray-400";

const EMPTY_INDUSTRY: CountryIndustryItem = { name: "", description: "", useCases: [] };

type CountryIndustrySolutionsEditorProps = {
  value: CountryIndustrySolutionsContent;
  onChange: (value: CountryIndustrySolutionsContent) => void;
};

export function CountryIndustrySolutionsEditor({ value, onChange }: CountryIndustrySolutionsEditorProps) {
  function updateIndustry(index: number, patch: Partial<CountryIndustryItem>) {
    onChange({
      ...value,
      industries: value.industries.map((industry, i) => (i === index ? { ...industry, ...patch } : industry)),
    });
  }

  function addIndustry() {
    onChange({ ...value, industries: [...value.industries, { ...EMPTY_INDUSTRY }] });
  }

  function removeIndustry(index: number) {
    onChange({ ...value, industries: value.industries.filter((_, i) => i !== index) });
  }

  return (
    <div className="flex flex-col gap-3">
      <div>
        <label className={MICRO_LABEL}>Section title</label>
        <InlineRichTextEditor
          content={value.title}
          onChange={(html) => onChange({ ...value, title: html })}
          placeholder="Industry Solutions"
          variant="title"
        />
      </div>
      <div>
        <label className={MICRO_LABEL}>Intro (optional)</label>
        <InlineRichTextEditor
          content={value.intro ?? ""}
          onChange={(html) => onChange({ ...value, intro: html })}
          placeholder="One or two sentences introducing this section…"
          minHeight={48}
        />
      </div>

      {value.industries.length === 0 ? (
        <p className="rounded-lg border border-dashed border-gray-200 bg-gray-50/50 px-4 py-6 text-center text-xs text-gray-400">
          No industries yet.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {value.industries.map((industry, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50/40 transition-colors hover:border-[#534AB7]/20 hover:bg-white"
            >
              <div className="flex items-center justify-between border-b border-gray-100 px-3 py-2">
                <span className="flex size-5 items-center justify-center rounded-md bg-[#534AB7]/10 text-[10px] font-bold text-[#534AB7]">
                  {i + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeIndustry(i)}
                  title="Remove industry"
                  className="flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
              <div className="space-y-2.5 p-3">
                <div>
                  <label className={MICRO_LABEL}>Industry name</label>
                  <InlineRichTextEditor
                    content={industry.name}
                    onChange={(html) => updateIndustry(i, { name: html })}
                    placeholder="e.g. Healthcare and Life Sciences"
                    variant="title"
                  />
                </div>
                <div>
                  <label className={MICRO_LABEL}>Description</label>
                  <InlineRichTextEditor
                    content={industry.description}
                    onChange={(html) => updateIndustry(i, { description: html })}
                    placeholder="Why voice AI matters for this industry…"
                    minHeight={56}
                  />
                </div>
                <div>
                  <label className={MICRO_LABEL}>Concrete use cases</label>
                  <div className="flex flex-col gap-2">
                    {industry.useCases.map((useCase, useCaseIndex) => (
                      <div key={useCaseIndex} className="flex items-start gap-1.5">
                        <div className="min-w-0 flex-1">
                          <InlineRichTextEditor
                            content={useCase}
                            onChange={(html) =>
                              updateIndustry(i, {
                                useCases: industry.useCases.map((item, idx) =>
                                  idx === useCaseIndex ? html : item,
                                ),
                              })
                            }
                            placeholder="e.g. Automated appointment reminders…"
                            variant="title"
                            minHeight={32}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            updateIndustry(i, {
                              useCases: industry.useCases.filter((_, idx) => idx !== useCaseIndex),
                            })
                          }
                          title="Remove"
                          className="mt-1 flex shrink-0 items-center justify-center rounded-md p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => updateIndustry(i, { useCases: [...industry.useCases, ""] })}
                      className="flex items-center justify-center gap-1.5 rounded-md border border-dashed border-gray-200 py-1.5 text-[11px] font-medium text-gray-500 transition-colors hover:border-[#534AB7]/30 hover:bg-[#534AB7]/5 hover:text-[#534AB7]"
                    >
                      <Plus className="size-3" />
                      Add use case
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={addIndustry}
        className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-gray-200 py-2 text-xs font-medium text-gray-500 transition-colors hover:border-[#534AB7]/30 hover:bg-[#534AB7]/5 hover:text-[#534AB7]"
      >
        <Plus className="size-3.5" />
        Add industry
      </button>
    </div>
  );
}
