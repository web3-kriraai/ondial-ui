"use client";

import { useRef, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ClipboardCopy,
  FileUp,
  Loader2,
  Sparkles,
} from "lucide-react";

import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { COUNTRY_PAGE_IMPORT_TEMPLATE_SKELETON } from "@/lib/countries/country-page-import-template";
import type { CountryPageFormState } from "@/lib/countries/form-state";
import {
  getImportMissingRequired,
  parseCountryPageImport,
  type ParseCountryPageImportResult,
} from "@/lib/countries/parse-country-page-import";

type CountryPageImportPanelProps = {
  formHasContent: boolean;
  onApply: (data: Partial<CountryPageFormState>, options: { slugImported: boolean }) => void;
};

async function extractTextFromFile(file: File): Promise<string> {
  const name = file.name.toLowerCase();
  if (name.endsWith(".txt")) {
    return file.text();
  }
  if (name.endsWith(".docx")) {
    const mammoth = await import("mammoth");
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  }
  throw new Error("Unsupported file type. Use .txt or .docx.");
}

export function CountryPageImportPanel({ formHasContent, onApply }: CountryPageImportPanelProps) {
  const [expanded, setExpanded] = useState(false);
  const [rawText, setRawText] = useState("");
  const [parsing, setParsing] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [parseResult, setParseResult] = useState<ParseCountryPageImportResult | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [copyDone, setCopyDone] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleParse() {
    setParsing(true);
    try {
      const result = parseCountryPageImport(rawText);
      setParseResult(result);
      setExpanded(true);
    } finally {
      setParsing(false);
    }
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileLoading(true);
    try {
      const text = await extractTextFromFile(file);
      setRawText(text);
      const result = parseCountryPageImport(text);
      setParseResult(result);
      setExpanded(true);
    } catch (err) {
      setParseResult({
        ok: false,
        data: {},
        warnings: [],
        filledSections: [],
        errors: [err instanceof Error ? err.message : "Failed to read file."],
      });
    } finally {
      setFileLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function handleApplyClick() {
    if (!parseResult || parseResult.filledSections.length === 0) return;
    if (formHasContent) {
      setConfirmOpen(true);
      return;
    }
    applyImport();
  }

  function applyImport() {
    if (!parseResult) return;
    const slugImported = Boolean(parseResult.data.slug?.trim());
    onApply(parseResult.data, { slugImported });
    setConfirmOpen(false);
  }

  async function handleCopyTemplate() {
    await navigator.clipboard.writeText(COUNTRY_PAGE_IMPORT_TEMPLATE_SKELETON);
    setCopyDone(true);
    setTimeout(() => setCopyDone(false), 2000);
  }

  const missingRequired = parseResult ? getImportMissingRequired(parseResult.data) : [];

  return (
    <div className="overflow-hidden rounded-xl border border-[#534AB7]/20 bg-gradient-to-br from-[#534AB7]/5 to-white shadow-sm">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-[#534AB7]/5"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-[#534AB7]/10 text-[#534AB7]">
            <Sparkles className="size-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Import content</p>
            <p className="text-xs text-gray-500">Paste structured template text or upload .txt / .docx</p>
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="size-4 shrink-0 text-gray-400" />
        ) : (
          <ChevronDown className="size-4 shrink-0 text-gray-400" />
        )}
      </button>

      {expanded && (
        <div className="border-t border-[#534AB7]/10 px-4 py-4">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleCopyTemplate}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:border-[#534AB7]/30 hover:text-[#534AB7]"
            >
              {copyDone ? <CheckCircle2 className="size-3.5 text-emerald-600" /> : <ClipboardCopy className="size-3.5" />}
              {copyDone ? "Copied!" : "Copy template skeleton"}
            </button>
            <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:border-[#534AB7]/30 hover:text-[#534AB7]">
              {fileLoading ? <Loader2 className="size-3.5 animate-spin" /> : <FileUp className="size-3.5" />}
              Upload file
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.docx,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="sr-only"
                onChange={handleFileChange}
                disabled={fileLoading}
              />
            </label>
            <span className="text-[11px] text-gray-400">
              Full USA example: <code className="text-gray-500">docs/country-page-content-template.md</code>
            </span>
          </div>

          <textarea
            value={rawText}
            onChange={(e) => {
              setRawText(e.target.value);
              setParseResult(null);
            }}
            placeholder="Paste content with [COUNTRY], [HERO], [OVERVIEW]… section headers, or paste JSON."
            rows={8}
            className="w-full resize-y rounded-lg border border-gray-200 bg-white px-3 py-2 font-mono text-xs leading-relaxed text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-[#534AB7] focus:ring-2 focus:ring-[#534AB7]/10"
          />

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleParse}
              disabled={!rawText.trim() || parsing}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#534AB7] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#4338ca] disabled:opacity-50"
            >
              {parsing ? <Loader2 className="size-3.5 animate-spin" /> : <Sparkles className="size-3.5" />}
              Parse &amp; preview
            </button>
            {parseResult && parseResult.filledSections.length > 0 && (
              <button
                type="button"
                onClick={handleApplyClick}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#534AB7] bg-white px-4 py-2 text-xs font-semibold text-[#534AB7] transition-colors hover:bg-[#534AB7]/5"
              >
                Apply to form
              </button>
            )}
          </div>

          {parseResult && (
            <div className="mt-4 space-y-3 rounded-lg border border-gray-100 bg-gray-50/80 p-3">
              {parseResult.errors.length > 0 && (
                <div className="space-y-1">
                  {parseResult.errors.map((error) => (
                    <p key={error} className="flex items-start gap-1.5 text-xs text-red-600">
                      <AlertCircle className="mt-0.5 size-3 shrink-0" />
                      {error}
                    </p>
                  ))}
                </div>
              )}

              {parseResult.filledSections.length > 0 && (
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">Filled sections</p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {parseResult.filledSections.map((section) => (
                      <span
                        key={section}
                        className="rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700"
                      >
                        {section}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {missingRequired.length > 0 && (
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-600">
                    Missing required (fill manually before save)
                  </p>
                  <p className="mt-1 text-xs text-amber-700">{missingRequired.join(", ")}</p>
                </div>
              )}

              {parseResult.warnings.length > 0 && (
                <details className="text-xs text-gray-500">
                  <summary className="cursor-pointer font-medium text-gray-600">
                    {parseResult.warnings.length} warning{parseResult.warnings.length === 1 ? "" : "s"}
                  </summary>
                  <ul className="mt-1.5 list-inside list-disc space-y-0.5 pl-1">
                    {parseResult.warnings.map((warning) => (
                      <li key={warning}>{warning}</li>
                    ))}
                  </ul>
                </details>
              )}
            </div>
          )}
        </div>
      )}

      <ConfirmDialog
        open={confirmOpen}
        title="Replace form content?"
        description="Applying the import will overwrite matching fields in this form. This cannot be undone without re-importing or reloading the page."
        confirmLabel="Replace fields"
        cancelLabel="Cancel"
        onConfirm={applyImport}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
