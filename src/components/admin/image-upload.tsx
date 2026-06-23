"use client";

import { useState, useRef, useCallback, DragEvent, ChangeEvent } from "react";
import Image from "next/image";
import { Upload, X, ImageIcon, Loader2, Link } from "lucide-react";

import { SEO_FETCH_INIT } from "@/lib/admin/seo-fetch";

export interface ImageDimensions {
  width: number;
  height: number;
}

interface ImageUploadProps {
  value: string;
  /** Called with the URL (and optionally dimensions) whenever the image changes */
  onChange: (url: string, dimensions?: ImageDimensions) => void;
  /** Initial dimensions to use for the preview before a new upload */
  initialDimensions?: ImageDimensions | null;
  folder?: string;
  /** Only used for the drop-zone placeholder aspect when no image is set */
  placeholderAspect?: "video" | "square";
  label?: string;
}

type UploadState = "idle" | "uploading" | "error";

type UploadResponse = {
  url: string;
  width: number;
  height: number;
};

export function ImageUpload({
  value,
  onChange,
  initialDimensions,
  folder = "blog",
  placeholderAspect = "video",
  label = "Image",
}: ImageUploadProps) {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [urlMode, setUrlMode] = useState(false);
  const [urlInput, setUrlInput] = useState(value);
  // Tracks the last-uploaded dimensions so preview uses them immediately
  const [uploadedDims, setUploadedDims] = useState<ImageDimensions | null>(
    initialDimensions ?? null,
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const placeholderAspectClass =
    placeholderAspect === "square" ? "aspect-square" : "aspect-video";

  // The actual aspect ratio for the preview — uses real dims if available
  const previewStyle =
    uploadedDims && uploadedDims.width > 0 && uploadedDims.height > 0
      ? { aspectRatio: `${uploadedDims.width} / ${uploadedDims.height}` }
      : placeholderAspect === "square"
        ? { aspectRatio: "1 / 1" }
        : { aspectRatio: "16 / 9" };

  async function uploadFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setErrorMsg("Only image files are supported.");
      setUploadState("error");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg("File too large — max 10 MB.");
      setUploadState("error");
      return;
    }

    setUploadState("uploading");
    setErrorMsg("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        ...SEO_FETCH_INIT,
        body: formData,
      });

      if (!res.ok) {
        const body = await res.json() as { error?: string };
        throw new Error(body.error ?? "Upload failed");
      }

      const data = await res.json() as UploadResponse;
      const dims: ImageDimensions | undefined =
        data.width && data.height ? { width: data.width, height: data.height } : undefined;

      setUploadedDims(dims ?? null);
      onChange(data.url, dims);
      setUploadState("idle");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Upload failed");
      setUploadState("error");
    }
  }

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;
      uploadFile(files[0]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [folder],
  );

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    handleFiles(e.target.files);
    if (inputRef.current) inputRef.current.value = "";
  }

  function handleClear() {
    onChange("", undefined);
    setUploadedDims(null);
    setUrlInput("");
    setUploadState("idle");
    setErrorMsg("");
  }

  function handleUrlSave() {
    // When pasting a URL we don't have dimensions — clear them so the blog
    // renderer uses the image's natural size via CSS max-width: 100%
    onChange(urlInput.trim(), undefined);
    setUploadedDims(null);
    setUrlMode(false);
  }

  return (
    <div className="space-y-2">
      {/* Preview / drop zone */}
      {value ? (
        <div className="relative group overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
          <div className="relative w-full" style={previewStyle}>
            <Image
              src={value}
              alt={label}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          {/* Dimensions badge */}
          {uploadedDims && (
            <span className="absolute bottom-2 left-2 rounded bg-black/50 px-1.5 py-0.5 text-[10px] font-mono text-white">
              {uploadedDims.width} × {uploadedDims.height}
            </span>
          )}
          {/* Hover actions */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="rounded-md bg-white/90 px-3 py-1.5 text-xs font-medium text-gray-800 hover:bg-white transition-colors flex items-center gap-1.5"
            >
              <Upload className="size-3" /> Replace
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="rounded-md bg-white/90 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-white transition-colors flex items-center gap-1.5"
            >
              <X className="size-3" /> Remove
            </button>
          </div>
          {uploadState === "uploading" && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Loader2 className="size-6 text-white animate-spin" />
            </div>
          )}
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !urlMode && inputRef.current?.click()}
          className={`relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed transition-all cursor-pointer select-none ${placeholderAspectClass} ${
            isDragging
              ? "border-[#534AB7] bg-[#534AB7]/5"
              : uploadState === "error"
                ? "border-red-300 bg-red-50"
                : "border-gray-200 bg-gray-50 hover:border-[#534AB7]/50 hover:bg-gray-100"
          }`}
        >
          {uploadState === "uploading" ? (
            <div className="flex flex-col items-center gap-2 text-[#534AB7]">
              <Loader2 className="size-7 animate-spin" strokeWidth={1.5} />
              <span className="text-xs font-medium">Uploading…</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 px-4 text-center">
              <div className={`rounded-full p-2 ${uploadState === "error" ? "bg-red-100" : "bg-gray-100"}`}>
                <ImageIcon
                  className={`size-5 ${uploadState === "error" ? "text-red-400" : "text-gray-400"}`}
                  strokeWidth={1.5}
                />
              </div>
              {uploadState === "error" ? (
                <p className="text-xs text-red-500">{errorMsg}</p>
              ) : (
                <p className="text-xs text-gray-400">
                  <span className="font-medium text-[#534AB7]">Click to upload</span> or drag &amp; drop
                </p>
              )}
              <p className="text-[10px] text-gray-300">PNG, JPG, WebP · max 10 MB</p>
            </div>
          )}
        </div>
      )}

      {/* URL paste mode */}
      {!value && (
        <div>
          {urlMode ? (
            <div className="flex gap-1.5">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleUrlSave()}
                placeholder="https://example.com/image.jpg"
                autoFocus
                className="flex-1 rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs text-gray-800 outline-none focus:border-[#534AB7] focus:ring-1 focus:ring-[#534AB7]/10"
              />
              <button
                type="button"
                onClick={handleUrlSave}
                className="rounded-md bg-[#534AB7] px-2.5 py-1.5 text-xs font-medium text-white hover:bg-[#4340a0] transition-colors"
              >
                Use
              </button>
              <button
                type="button"
                onClick={() => setUrlMode(false)}
                className="rounded-md border border-gray-200 px-2.5 py-1.5 text-xs text-gray-500 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setUrlMode(true)}
              className="flex items-center gap-1.5 text-[10px] text-gray-400 hover:text-[#534AB7] transition-colors"
            >
              <Link className="size-3" /> Or paste an image URL instead
            </button>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleInputChange}
      />
    </div>
  );
}
