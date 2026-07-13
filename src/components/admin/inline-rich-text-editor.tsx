"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExt from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { Bold, Italic, Link2, Link2Off, List, Underline as UnderlineIcon } from "lucide-react";

interface InlineRichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: number;
  /**
   * `body` — descriptions / intros (bold, italic, underline, link, lists).
   * `title` — headings & short labels (same marks, no lists, compact height).
   */
  variant?: "body" | "title";
}

function Btn({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`flex h-6 w-6 items-center justify-center rounded transition-colors ${
        active ? "bg-[#534AB7] text-white" : "text-gray-400 hover:bg-gray-100 hover:text-gray-700"
      }`}
    >
      {children}
    </button>
  );
}

function Sep() {
  return <div className="mx-0.5 h-4 w-px shrink-0 bg-gray-200" />;
}

function LinkDialog({ editor, onClose }: { editor: Editor; onClose: () => void }) {
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
    <div className="flex items-center gap-1.5 border-t border-gray-100 bg-gray-50/60 px-2 py-1.5">
      <input
        ref={inputRef}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            apply();
          }
          if (e.key === "Escape") onClose();
        }}
        placeholder="https://example.com"
        className="min-w-0 flex-1 text-xs outline-none text-gray-800 placeholder:text-gray-300"
      />
      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault();
          apply();
        }}
        className="shrink-0 rounded bg-[#534AB7] px-2 py-0.5 text-[11px] font-medium text-white hover:bg-[#4340a0] transition-colors"
      >
        Apply
      </button>
      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault();
          onClose();
        }}
        className="shrink-0 text-xs text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>
    </div>
  );
}

function Toolbar({ editor, showLists }: { editor: Editor; showLists: boolean }) {
  const [showLink, setShowLink] = useState(false);

  return (
    <div className="border-b border-gray-100 bg-gray-50/40">
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1">
        <Btn title="Bold (⌘B)" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold className="size-3" />
        </Btn>
        <Btn title="Italic (⌘I)" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic className="size-3" />
        </Btn>
        <Btn
          title="Underline (⌘U)"
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon className="size-3" />
        </Btn>
        <Sep />
        <Btn title="Add link" active={editor.isActive("link")} onClick={() => setShowLink((v) => !v)}>
          <Link2 className="size-3" />
        </Btn>
        {editor.isActive("link") && (
          <Btn title="Remove link" onClick={() => editor.chain().focus().unsetLink().run()}>
            <Link2Off className="size-3" />
          </Btn>
        )}
        {showLists ? (
          <>
            <Sep />
            <Btn
              title="Bullet list"
              active={editor.isActive("bulletList")}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              <List className="size-3" />
            </Btn>
          </>
        ) : null}
      </div>
      {showLink && <LinkDialog editor={editor} onClose={() => setShowLink(false)} />}
    </div>
  );
}

/**
 * Compact rich-text field for short marketing copy (titles, descriptions,
 * intros, FAQ answers). Unlike RichTextEditor (blog posts), this has no
 * headings, images, tables, or alignment — just enough formatting for a
 * sentence or two — and auto-grows instead of scrolling in a fixed panel.
 */
export function InlineRichTextEditor({
  content,
  onChange,
  placeholder = "Write a short description…",
  minHeight,
  variant = "body",
}: InlineRichTextEditorProps) {
  const isTitle = variant === "title";
  const resolvedMinHeight = minHeight ?? (isTitle ? 36 : 64);
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const handleUpdate = useCallback(({ editor }: { editor: Editor }) => {
    const html = editor.getHTML();
    onChangeRef.current(html === "<p></p>" ? "" : html);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: false,
        underline: false,
        heading: false,
        codeBlock: false,
        blockquote: false,
        horizontalRule: false,
        bulletList: isTitle ? false : undefined,
        orderedList: isTitle ? false : undefined,
        listItem: isTitle ? false : undefined,
      }),
      LinkExt.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-[#534AB7] underline underline-offset-4 hover:text-[#463E9E] transition-colors",
          rel: "noopener noreferrer",
        },
      }),
      Placeholder.configure({ placeholder }),
      Underline,
    ],
    content: content || "",
    onUpdate: handleUpdate,
    editorProps: {
      attributes: {
        class: [
          "prose prose-sm max-w-none",
          "prose-p:my-0 prose-p:leading-relaxed",
          "prose-strong:font-semibold",
          "prose-a:text-[#534AB7] prose-a:no-underline hover:prose-a:underline",
          "prose-li:my-0 prose-li:marker:text-[#534AB7]",
          "px-3 py-2 outline-none focus:outline-none text-sm text-gray-900",
          isTitle ? "font-medium" : "",
        ].join(" "),
        style: `min-height: ${resolvedMinHeight}px`,
      },
    },
    immediatelyRender: false,
  });

  if (!editor) {
    return (
      <div
        className="rounded-lg border border-gray-200 bg-gray-50/50"
        style={{ minHeight: resolvedMinHeight + 40 }}
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white transition-all focus-within:border-[#534AB7] focus-within:ring-2 focus-within:ring-[#534AB7]/10">
      <Toolbar editor={editor} showLists={!isTitle} />
      <style>{`
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #9ca3af;
          pointer-events: none;
          height: 0;
        }
      `}</style>
      <EditorContent editor={editor} />
    </div>
  );
}
