"use client";

import { Plus, Trash2 } from "lucide-react";

const FIELD =
  "w-full rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#534AB7] focus:ring-2 focus:ring-[#534AB7]/10";

type StringListEditorProps = {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  addLabel?: string;
};

export function StringListEditor({
  items,
  onChange,
  placeholder = "e.g. Salesforce",
  addLabel = "Add",
}: StringListEditorProps) {
  function updateItem(index: number, value: string) {
    onChange(items.map((item, i) => (i === index ? value : item)));
  }

  function removeItem(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  function addItem() {
    onChange([...items, ""]);
  }

  return (
    <div className="flex flex-col gap-1.5">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <input
            type="text"
            value={item}
            onChange={(e) => updateItem(i, e.target.value)}
            placeholder={placeholder}
            className={FIELD}
          />
          <button
            type="button"
            onClick={() => removeItem(i)}
            title="Remove"
            className="flex shrink-0 items-center justify-center rounded-md p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="size-3.5" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="flex items-center justify-center gap-1.5 rounded-md border border-dashed border-gray-200 py-1.5 text-[11px] font-medium text-gray-500 transition-colors hover:border-[#534AB7]/30 hover:bg-[#534AB7]/5 hover:text-[#534AB7]"
      >
        <Plus className="size-3" />
        {addLabel}
      </button>
    </div>
  );
}
