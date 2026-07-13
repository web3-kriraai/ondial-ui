"use client";

import { Plus, Trash2 } from "lucide-react";

import { InlineRichTextEditor } from "@/components/admin/inline-rich-text-editor";
import type { TitledBullet } from "@/lib/countries/types";

const MICRO_LABEL = "mb-1 block text-[11px] font-semibold uppercase tracking-wide text-gray-400";

type TitledBulletListEditorProps = {
  items: TitledBullet[];
  onChange: (items: TitledBullet[]) => void;
  titleLabel?: string;
  titlePlaceholder?: string;
  descriptionPlaceholder?: string;
  addLabel?: string;
  emptyMessage?: string;
};

export function TitledBulletListEditor({
  items,
  onChange,
  titleLabel = "Title",
  titlePlaceholder = "e.g. Coast-to-coast, always-on",
  descriptionPlaceholder = "Describe this point…",
  addLabel = "Add item",
  emptyMessage = "No items yet.",
}: TitledBulletListEditorProps) {
  function addItem() {
    onChange([...items, { title: "", description: "" }]);
  }

  function updateItem(index: number, field: keyof TitledBullet, value: string) {
    onChange(items.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  }

  function removeItem(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  return (
    <div className="flex flex-col gap-3">
      {items.length === 0 ? (
        <p className="rounded-lg border border-dashed border-gray-200 bg-gray-50/50 px-4 py-6 text-center text-xs text-gray-400">
          {emptyMessage}
        </p>
      ) : (
        <div className="flex flex-col gap-2.5">
          {items.map((item, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50/40 transition-colors hover:border-[#534AB7]/20 hover:bg-white"
            >
              <div className="flex items-center justify-between border-b border-gray-100 px-3 py-2">
                <span className="flex size-5 items-center justify-center rounded-md bg-[#534AB7]/10 text-[10px] font-bold text-[#534AB7]">
                  {i + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeItem(i)}
                  title="Remove"
                  className="flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
              <div className="space-y-2.5 p-3">
                <div>
                  <label className={MICRO_LABEL}>{titleLabel}</label>
                  <InlineRichTextEditor
                    content={item.title}
                    onChange={(html) => updateItem(i, "title", html)}
                    placeholder={titlePlaceholder}
                    variant="title"
                  />
                </div>
                <div>
                  <label className={MICRO_LABEL}>Description</label>
                  <InlineRichTextEditor
                    content={item.description}
                    onChange={(html) => updateItem(i, "description", html)}
                    placeholder={descriptionPlaceholder}
                    minHeight={48}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={addItem}
        className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-gray-200 py-2 text-xs font-medium text-gray-500 transition-colors hover:border-[#534AB7]/30 hover:bg-[#534AB7]/5 hover:text-[#534AB7]"
      >
        <Plus className="size-3.5" />
        {addLabel}
      </button>
    </div>
  );
}
