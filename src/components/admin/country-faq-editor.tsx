"use client";

import { Plus, Trash2 } from "lucide-react";

import { InlineRichTextEditor } from "@/components/admin/inline-rich-text-editor";
import type { CountryFaqItem } from "@/lib/countries/types";

const FIELD =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#534AB7] focus:ring-2 focus:ring-[#534AB7]/10";

const MICRO_LABEL = "mb-1 block text-[11px] font-semibold uppercase tracking-wide text-gray-400";

type CountryFaqEditorProps = {
  items: CountryFaqItem[];
  onChange: (items: CountryFaqItem[]) => void;
};

export function CountryFaqEditor({ items, onChange }: CountryFaqEditorProps) {
  function addFaq() {
    onChange([...items, { question: "", answer: "" }]);
  }

  function updateFaq(index: number, field: keyof CountryFaqItem, value: string) {
    onChange(items.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  }

  function removeFaq(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  if (items.length === 0) {
    return (
      <button
        type="button"
        onClick={addFaq}
        className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 px-6 py-10 text-center transition-colors hover:border-[#534AB7]/30 hover:bg-[#534AB7]/5"
      >
        <p className="text-sm font-medium text-gray-500">No FAQs yet</p>
        <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-[#534AB7]">
          <Plus className="size-3" />
          Add your first FAQ
        </span>
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((faq, i) => (
        <div
          key={i}
          className="group relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50/40 transition-colors hover:border-[#534AB7]/20 hover:bg-white"
        >
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-2.5">
            <span className="flex size-6 items-center justify-center rounded-md bg-[#534AB7]/10 text-[10px] font-bold text-[#534AB7]">
              Q{i + 1}
            </span>
            <button
              type="button"
              onClick={() => removeFaq(i)}
              title="Remove FAQ"
              className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="size-3.5" />
              <span className="hidden sm:inline">Remove</span>
            </button>
          </div>
          <div className="space-y-3 p-4">
            <div>
              <label className={MICRO_LABEL}>Question</label>
              <input
                type="text"
                value={faq.question}
                onChange={(e) => updateFaq(i, "question", e.target.value)}
                placeholder="e.g. Is using an AI voice agent legal in this country?"
                className={FIELD}
              />
            </div>
            <div>
              <label className={MICRO_LABEL}>Answer</label>
              <InlineRichTextEditor
                content={faq.answer}
                onChange={(html) => updateFaq(i, "answer", html)}
                placeholder="Write a clear, concise answer…"
                minHeight={72}
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addFaq}
        className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-gray-200 py-2.5 text-xs font-medium text-gray-500 transition-colors hover:border-[#534AB7]/30 hover:bg-[#534AB7]/5 hover:text-[#534AB7]"
      >
        <Plus className="size-3.5" />
        Add another FAQ
      </button>
    </div>
  );
}
