"use client";

import { Plus, Trash2 } from "lucide-react";

import { InlineRichTextEditor } from "@/components/admin/inline-rich-text-editor";
import { StringListEditor } from "@/components/admin/string-list-editor";
import type { CountryIntegrationGroup, CountryIntegrationsContent } from "@/lib/countries/types";

const FIELD =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#534AB7] focus:ring-2 focus:ring-[#534AB7]/10";

const MICRO_LABEL = "mb-1 block text-[11px] font-semibold uppercase tracking-wide text-gray-400";

const EMPTY_GROUP: CountryIntegrationGroup = { label: "", items: [] };

type CountryIntegrationsEditorProps = {
  value: CountryIntegrationsContent;
  onChange: (value: CountryIntegrationsContent) => void;
};

export function CountryIntegrationsEditor({ value, onChange }: CountryIntegrationsEditorProps) {
  function updateGroup(index: number, patch: Partial<CountryIntegrationGroup>) {
    onChange({
      ...value,
      groups: value.groups.map((group, i) => (i === index ? { ...group, ...patch } : group)),
    });
  }

  function addGroup() {
    onChange({ ...value, groups: [...value.groups, { ...EMPTY_GROUP }] });
  }

  function removeGroup(index: number) {
    onChange({ ...value, groups: value.groups.filter((_, i) => i !== index) });
  }

  return (
    <div className="flex flex-col gap-3">
      <div>
        <label className={MICRO_LABEL}>Section title</label>
        <input
          type="text"
          value={value.title}
          onChange={(e) => onChange({ ...value, title: e.target.value })}
          placeholder="Enterprise Integrations"
          className={FIELD}
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

      {value.groups.length === 0 ? (
        <p className="rounded-lg border border-dashed border-gray-200 bg-gray-50/50 px-4 py-6 text-center text-xs text-gray-400">
          No integration groups yet.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {value.groups.map((group, i) => (
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
                  onClick={() => removeGroup(i)}
                  title="Remove group"
                  className="flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
              <div className="space-y-2.5 p-3">
                <div>
                  <label className={MICRO_LABEL}>Group label</label>
                  <input
                    type="text"
                    value={group.label}
                    onChange={(e) => updateGroup(i, { label: e.target.value })}
                    placeholder="e.g. CRM and customer platforms"
                    className={FIELD}
                  />
                </div>
                <div>
                  <label className={MICRO_LABEL}>Integrations</label>
                  <StringListEditor
                    items={group.items}
                    onChange={(items) => updateGroup(i, { items })}
                    placeholder="e.g. Salesforce"
                    addLabel="Add integration"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={addGroup}
        className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-gray-200 py-2 text-xs font-medium text-gray-500 transition-colors hover:border-[#534AB7]/30 hover:bg-[#534AB7]/5 hover:text-[#534AB7]"
      >
        <Plus className="size-3.5" />
        Add integration group
      </button>

      <div>
        <label className={MICRO_LABEL}>Closing note (optional)</label>
        <InlineRichTextEditor
          content={value.note ?? ""}
          onChange={(html) => onChange({ ...value, note: html })}
          placeholder="e.g. For anything custom, OnDial exposes REST APIs and webhooks…"
          minHeight={48}
        />
      </div>
    </div>
  );
}
