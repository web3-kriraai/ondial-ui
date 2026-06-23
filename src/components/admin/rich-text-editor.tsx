"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type ChangeEvent,
} from "react";
import { SEO_FETCH_INIT } from "@/lib/admin/seo-fetch";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtBase from "@tiptap/extension-image";
import LinkExt from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { Table as TableExt } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Highlighter,
  Code,
  Code2,
  Link2,
  Link2Off,
  ImageIcon,
  List,
  ListOrdered,
  Quote,
  Minus,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Table,
  Undo2,
  Redo2,
  Loader2,
  ChevronDown,
} from "lucide-react";

// ─── Image extension with width/height support ───────────────────────────────
// TipTap's built-in Image doesn't include width/height attributes by default.
// Extending it so Cloudinary's exact dimensions are stored in the HTML output
// (matching the same pattern as Contentful embedded assets).
const ImageExt = ImageExtBase.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: { default: null, renderHTML: (a) => a.width ? { width: a.width } : {} },
      height: { default: null, renderHTML: (a) => a.height ? { height: a.height } : {} },
    };
  },
});

// ─── Types ────────────────────────────────────────────────────────────────────

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

// ─── Toolbar button ───────────────────────────────────────────────────────────

function Btn({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onMouseDown={(e) => {
        e.preventDefault(); // keep editor focus
        onClick();
      }}
      className={`flex h-7 w-7 items-center justify-center rounded transition-colors ${
        active
          ? "bg-[#534AB7] text-white"
          : disabled
            ? "cursor-not-allowed text-gray-300"
            : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      {children}
    </button>
  );
}

function Sep() {
  return <div className="mx-1 h-5 w-px shrink-0 bg-gray-200" />;
}

// ─── Heading dropdown ─────────────────────────────────────────────────────────

const HEADING_OPTIONS = [
  { label: "Paragraph", level: 0 },
  { label: "Heading 1", level: 1 },
  { label: "Heading 2", level: 2 },
  { label: "Heading 3", level: 3 },
  { label: "Heading 4", level: 4 },
] as const;

function HeadingDropdown({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const activeLevel = HEADING_OPTIONS.find(({ level }) =>
    level === 0
      ? editor.isActive("paragraph")
      : editor.isActive("heading", { level }),
  );

  useEffect(() => {
    function close(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault();
          setOpen((o) => !o);
        }}
        className="flex h-7 items-center gap-1 rounded px-2 text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors"
      >
        {activeLevel?.label ?? "Paragraph"}
        <ChevronDown className="size-3 text-gray-400" />
      </button>
      {open && (
        <div className="absolute top-full left-0 z-50 mt-1 w-36 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
          {HEADING_OPTIONS.map(({ label, level }) => (
            <button
              key={level}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                if (level === 0) editor.chain().focus().setParagraph().run();
                else editor.chain().focus().toggleHeading({ level }).run();
                setOpen(false);
              }}
              className={`flex w-full items-center px-3 py-2 text-left transition-colors hover:bg-gray-50 ${
                activeLevel?.level === level ? "text-[#534AB7] font-semibold" : "text-gray-700"
              } ${level === 0 ? "text-sm" : level === 1 ? "text-xl font-bold" : level === 2 ? "text-lg font-semibold" : level === 3 ? "text-base font-medium" : "text-sm font-medium"}`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Link dialog ──────────────────────────────────────────────────────────────

function LinkDialog({
  editor,
  onClose,
}: {
  editor: Editor;
  onClose: () => void;
}) {
  const [url, setUrl] = useState(editor.getAttributes("link").href ?? "");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  function apply() {
    const trimmed = url.trim();
    if (!trimmed) {
      editor.chain().focus().unsetLink().run();
    } else {
      editor
        .chain()
        .focus()
        .setLink({ href: trimmed, target: trimmed.startsWith("http") ? "_blank" : undefined })
        .run();
    }
    onClose();
  }

  return (
    <div className="flex items-center gap-1.5 rounded-lg border border-[#534AB7]/30 bg-white px-2 py-1 shadow-md">
      <input
        ref={inputRef}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") apply();
          if (e.key === "Escape") onClose();
        }}
        placeholder="https://example.com"
        className="w-52 text-xs outline-none text-gray-800 placeholder:text-gray-300"
      />
      <button
        type="button"
        onMouseDown={(e) => { e.preventDefault(); apply(); }}
        className="rounded bg-[#534AB7] px-2 py-0.5 text-xs font-medium text-white hover:bg-[#4340a0] transition-colors"
      >
        Apply
      </button>
      <button
        type="button"
        onMouseDown={(e) => { e.preventDefault(); onClose(); }}
        className="text-xs text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>
    </div>
  );
}

// ─── Table menu ───────────────────────────────────────────────────────────────

function TableMenu({ editor, onClose }: { editor: Editor; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function close(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [onClose]);

  const actions = [
    { label: "Insert table (3×3)", action: () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run() },
    { label: "Add column before", action: () => editor.chain().focus().addColumnBefore().run() },
    { label: "Add column after", action: () => editor.chain().focus().addColumnAfter().run() },
    { label: "Delete column", action: () => editor.chain().focus().deleteColumn().run() },
    { label: "Add row before", action: () => editor.chain().focus().addRowBefore().run() },
    { label: "Add row after", action: () => editor.chain().focus().addRowAfter().run() },
    { label: "Delete row", action: () => editor.chain().focus().deleteRow().run() },
    { label: "Delete table", action: () => editor.chain().focus().deleteTable().run() },
  ];

  return (
    <div ref={ref} className="absolute top-full right-0 z-50 mt-1 w-44 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
      {actions.map(({ label, action }) => (
        <button
          key={label}
          type="button"
          onMouseDown={(e) => { e.preventDefault(); action(); onClose(); }}
          className="flex w-full items-center px-3 py-2 text-left text-xs text-gray-700 transition-colors hover:bg-gray-50"
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function filenameToAlt(name: string): string {
  return name
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function filenameToSlug(name: string): string {
  return name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

// ─── Image insert dialog (alt + SEO filename) ─────────────────────────────────

type PendingImage = { file: File };

function ImageInsertDialog({
  pending,
  onInsert,
  onClose,
}: {
  pending: PendingImage;
  onInsert: (attrs: { src: string; alt: string; width: number | null; height: number | null }) => void;
  onClose: () => void;
}) {
  const [alt, setAlt] = useState(() => filenameToAlt(pending.file.name));
  const [seoName, setSeoName] = useState(() => filenameToSlug(pending.file.name));
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const altRef = useRef<HTMLInputElement>(null);
  // Create blob URL inside the dialog so React Strict Mode doesn't revoke it early
  const [previewUrl] = useState(() => URL.createObjectURL(pending.file));

  useEffect(() => () => URL.revokeObjectURL(previewUrl), [previewUrl]);

  useEffect(() => {
    altRef.current?.focus();
    altRef.current?.select();
  }, []);

  async function handleInsert() {
    const trimmedAlt = alt.trim();
    if (!trimmedAlt) {
      setError("Alt text is required for SEO and accessibility.");
      return;
    }
    setError("");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", pending.file);
      fd.append("folder", "blog/content");
      if (seoName.trim()) fd.append("publicId", seoName.trim());

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        ...SEO_FETCH_INIT,
        body: fd,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? "Upload failed");
      }
      const data = await res.json() as { url: string; width?: number; height?: number };
      onInsert({
        src: data.url,
        alt: trimmedAlt,
        width: data.width ?? null,
        height: data.height ?? null,
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
      setUploading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-[2px]"
        onClick={uploading ? undefined : onClose}
      />
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
        <div className="border-b border-gray-100 px-5 py-4">
          <h3 className="text-sm font-semibold text-gray-900">Image details</h3>
          <p className="mt-0.5 text-xs text-gray-400">
            Set alt text and a readable file name before inserting — both help SEO.
          </p>
        </div>

        <div className="flex gap-4 p-5">
          <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="Preview"
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <div className="min-w-0 flex-1 space-y-3">
            <div>
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                Alt text <span className="text-red-400">*</span>
              </label>
              <input
                ref={altRef}
                type="text"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                placeholder="Describe the image for screen readers & Google"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 outline-none focus:border-[#534AB7] focus:bg-white focus:ring-2 focus:ring-[#534AB7]/10"
              />
              <p className="mt-1 text-[11px] text-gray-400">
                e.g. &quot;AI voice agent handling customer support calls&quot;
              </p>
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                SEO file name
              </label>
              <div className="flex items-center gap-1">
                <span className="shrink-0 text-xs text-gray-400">blog/content/</span>
                <input
                  type="text"
                  value={seoName}
                  onChange={(e) => setSeoName(filenameToSlug(e.target.value))}
                  placeholder="ai-voice-agent-dashboard"
                  className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 font-mono text-xs text-gray-900 outline-none focus:border-[#534AB7] focus:bg-white focus:ring-2 focus:ring-[#534AB7]/10"
                />
              </div>
              <p className="mt-1 text-[11px] text-gray-400">
                Used in the Cloudinary URL — keep it short and descriptive.
              </p>
            </div>
          </div>
        </div>

        {error && (
          <p className="px-5 pb-2 text-xs font-medium text-red-600">{error}</p>
        )}

        <div className="flex justify-end gap-2 border-t border-gray-100 bg-gray-50/80 px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={uploading}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleInsert}
            disabled={uploading}
            className="flex items-center gap-1.5 rounded-lg bg-[#534AB7] px-4 py-2 text-xs font-semibold text-white hover:bg-[#4338ca] disabled:opacity-60"
          >
            {uploading && <Loader2 className="size-3.5 animate-spin" />}
            Insert image
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Image alt editor (when image is selected in content) ───────────────────

function ImageAltBar({ editor }: { editor: Editor }) {
  const [alt, setAlt] = useState("");
  const [active, setActive] = useState(false);

  useEffect(() => {
    function sync() {
      const isImage = editor.isActive("image");
      setActive(isImage);
      if (isImage) setAlt(editor.getAttributes("image").alt ?? "");
    }
    sync();
    editor.on("selectionUpdate", sync);
    editor.on("transaction", sync);
    return () => {
      editor.off("selectionUpdate", sync);
      editor.off("transaction", sync);
    };
  }, [editor]);

  if (!active) return null;

  function apply() {
    editor.chain().focus().updateAttributes("image", { alt: alt.trim() }).run();
  }

  return (
    <div className="border-t border-[#534AB7]/20 bg-[#534AB7]/5 px-3 py-2">
      <div className="flex flex-wrap items-end gap-2">
        <div className="min-w-[12rem] flex-1">
          <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-[#534AB7]">
            Image alt text (SEO)
          </label>
          <input
            type="text"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), apply())}
            placeholder="Describe this image…"
            className="w-full rounded-lg border border-[#534AB7]/20 bg-white px-3 py-1.5 text-xs text-gray-900 outline-none focus:border-[#534AB7] focus:ring-2 focus:ring-[#534AB7]/10"
          />
        </div>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); apply(); }}
          className="rounded-lg bg-[#534AB7] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#4338ca]"
        >
          Update alt
        </button>
        {!alt.trim() && (
          <span className="text-[11px] font-medium text-amber-600">Missing alt — add one for SEO</span>
        )}
      </div>
    </div>
  );
}

// ─── Toolbar ──────────────────────────────────────────────────────────────────

function Toolbar({
  editor,
}: {
  editor: Editor;
}) {
  const [showLink, setShowLink] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [pendingImage, setPendingImage] = useState<PendingImage | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFileSelect(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPendingImage({ file });
    if (fileRef.current) fileRef.current.value = "";
  }

  function insertImage(attrs: { src: string; alt: string; width: number | null; height: number | null }) {
    editor.chain().focus().setImage({
      src: attrs.src,
      alt: attrs.alt,
      width: attrs.width ?? undefined,
      height: attrs.height ?? undefined,
    }).run();
  }

  return (
    <div className="sticky top-0 z-10 border-b border-gray-100 bg-white">
      {/* Main toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-3 py-2">
        {/* Heading style */}
        <HeadingDropdown editor={editor} />
        <Sep />

        {/* Inline marks */}
        <Btn title="Bold (⌘B)" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold className="size-3.5" />
        </Btn>
        <Btn title="Italic (⌘I)" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic className="size-3.5" />
        </Btn>
        <Btn title="Underline (⌘U)" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <UnderlineIcon className="size-3.5" />
        </Btn>
        <Btn title="Strikethrough" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}>
          <Strikethrough className="size-3.5" />
        </Btn>
        <Btn title="Highlight" active={editor.isActive("highlight")} onClick={() => editor.chain().focus().toggleHighlight().run()}>
          <Highlighter className="size-3.5" />
        </Btn>
        <Btn title="Inline code" active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()}>
          <Code className="size-3.5" />
        </Btn>
        <Sep />

        {/* Link */}
        <Btn title="Add link" active={editor.isActive("link")} onClick={() => setShowLink((v) => !v)}>
          <Link2 className="size-3.5" />
        </Btn>
        {editor.isActive("link") && (
          <Btn title="Remove link" onClick={() => editor.chain().focus().unsetLink().run()}>
            <Link2Off className="size-3.5" />
          </Btn>
        )}
        <Sep />

        {/* Alignment */}
        <Btn title="Align left" active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()}>
          <AlignLeft className="size-3.5" />
        </Btn>
        <Btn title="Align center" active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()}>
          <AlignCenter className="size-3.5" />
        </Btn>
        <Btn title="Align right" active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()}>
          <AlignRight className="size-3.5" />
        </Btn>
        <Sep />

        {/* Lists */}
        <Btn title="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List className="size-3.5" />
        </Btn>
        <Btn title="Ordered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered className="size-3.5" />
        </Btn>
        <Sep />

        {/* Block elements */}
        <Btn title="Blockquote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <Quote className="size-3.5" />
        </Btn>
        <Btn title="Code block" active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
          <Code2 className="size-3.5" />
        </Btn>
        <Btn title="Horizontal rule" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <Minus className="size-3.5" />
        </Btn>
        <Sep />

        {/* Image upload */}
        <Btn title="Insert image" onClick={() => fileRef.current?.click()}>
          <ImageIcon className="size-3.5" />
        </Btn>
        <input ref={fileRef} type="file" accept="image/*" className="sr-only" onChange={handleFileSelect} />
        <Sep />

        {/* Table */}
        <div className="relative">
          <Btn title="Table options" active={editor.isActive("table")} onClick={() => setShowTable((v) => !v)}>
            <Table className="size-3.5" />
          </Btn>
          {showTable && <TableMenu editor={editor} onClose={() => setShowTable(false)} />}
        </div>
        <Sep />

        {/* History */}
        <Btn title="Undo (⌘Z)" disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()}>
          <Undo2 className="size-3.5" />
        </Btn>
        <Btn title="Redo (⌘⇧Z)" disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()}>
          <Redo2 className="size-3.5" />
        </Btn>
      </div>

      {/* Image alt editor — shown when an image is selected in the content */}
      <ImageAltBar editor={editor} />

      {/* Link dialog */}
      {showLink && (
        <div className="border-t border-gray-100 px-3 py-2">
          <LinkDialog editor={editor} onClose={() => setShowLink(false)} />
        </div>
      )}

      {/* Image insert modal */}
      {pendingImage && (
        <ImageInsertDialog
          pending={pendingImage}
          onInsert={insertImage}
          onClose={() => setPendingImage(null)}
        />
      )}
    </div>
  );
}

// ─── Main editor ──────────────────────────────────────────────────────────────

export function RichTextEditor({
  content,
  onChange,
  placeholder = "Start writing your post… use the toolbar above for formatting, or type '/' for shortcuts.",
}: RichTextEditorProps) {
  const onChangRef = useRef(onChange);
  useEffect(() => { onChangRef.current = onChange; }, [onChange]);

  const handleUpdate = useCallback(({ editor }: { editor: Editor }) => {
    const html = editor.getHTML();
    // Treat empty editor as empty string
    onChangRef.current(html === "<p></p>" ? "" : html);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Link and Underline are configured separately below — disable the
        // StarterKit-bundled versions to avoid "duplicate extension" warnings.
        link: false,
        underline: false,
        codeBlock: { HTMLAttributes: { class: "rounded-lg bg-gray-900 p-4 text-sm font-mono text-gray-100 overflow-x-auto" } },
      }),
      ImageExt.configure({
        HTMLAttributes: { class: "rounded-xl max-w-full my-6 mx-auto block" },
        allowBase64: false,
      }),
      LinkExt.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-[#534AB7] underline underline-offset-4 hover:text-[#463E9E] transition-colors", rel: "noopener noreferrer" },
      }),
      Placeholder.configure({ placeholder }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight.configure({ HTMLAttributes: { class: "bg-yellow-100 rounded px-0.5" } }),
      TableExt.configure({ resizable: false, HTMLAttributes: { class: "border-collapse w-full" } }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: content || "",
    onUpdate: handleUpdate,
    editorProps: {
      attributes: {
        class: [
          // Typography
          "prose prose-slate prose-base max-w-none",
          "prose-headings:font-semibold prose-headings:tracking-tight",
          "prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg",
          "prose-p:leading-7",
          "prose-strong:font-semibold",
          "prose-a:text-[#534AB7] prose-a:no-underline hover:prose-a:underline",
          "prose-li:my-1 prose-li:marker:text-[#534AB7]",
          "prose-blockquote:border-[#534AB7]/30 prose-blockquote:not-italic prose-blockquote:text-gray-600",
          "prose-code:rounded prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:before:content-none prose-code:after:content-none",
          "prose-table:overflow-hidden prose-table:rounded-xl prose-table:border prose-table:border-gray-200",
          "prose-th:bg-gray-50 prose-th:px-3 prose-th:py-2 prose-th:text-sm prose-th:font-semibold",
          "prose-td:px-3 prose-td:py-2 prose-td:text-sm prose-td:border-b prose-td:border-gray-100",
          // Editor chrome
          "min-h-[560px] px-6 py-5 outline-none focus:outline-none",
          "text-gray-800",
        ].join(" "),
      },
    },
    immediatelyRender: false,
  });

  if (!editor) {
    return (
      <div className="flex h-[680px] items-center justify-center">
        <Loader2 className="size-5 animate-spin text-gray-300" />
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] h-[680px] overflow-y-auto overflow-x-hidden">
      <Toolbar editor={editor} />
      {/* Editor area with ProseMirror placeholder support */}
      <style>{`
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #9ca3af;
          pointer-events: none;
          height: 0;
        }
        .ProseMirror table {
          border-collapse: collapse;
          margin: 1.5rem 0;
          width: 100%;
          border-radius: 0.75rem;
          overflow: hidden;
          border: 1px solid #e5e7eb;
        }
        .ProseMirror th {
          background: #f9fafb;
          padding: 0.5rem 0.75rem;
          font-weight: 600;
          text-align: left;
          font-size: 0.875rem;
          border-bottom: 1px solid #e5e7eb;
        }
        .ProseMirror td {
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          border-bottom: 1px solid #f3f4f6;
          vertical-align: top;
        }
        .ProseMirror .selectedCell {
          background: #534AB7/10;
        }
        .ProseMirror img {
          cursor: pointer;
        }
        .ProseMirror img.ProseMirror-selectednode {
          outline: 2px solid #534AB7;
          outline-offset: 2px;
          border-radius: 0.75rem;
        }
      `}</style>
      <EditorContent editor={editor} />
    </div>
  );
}
