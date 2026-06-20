import type { ReactNode } from "react";
import Image from "next/image";
import { documentToReactComponents, type Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import type { Block, Document, Inline } from "@contentful/rich-text-types";

import type { ContentfulAsset, ContentfulRichText } from "@/lib/contentful/types";
import { cn } from "@/lib/utils";

type BlogRichTextProps = {
  document: ContentfulRichText;
};

const linkClassName =
  "font-medium text-[#534AB7] underline-offset-4 transition-colors hover:text-[#463E9E] hover:underline";

export const proseClassName = cn(
  "prose prose-slate prose-base max-w-none dark:prose-invert",
  "prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-foreground",
  "prose-h1:text-3xl prose-h1:sm:text-4xl",
  "prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-2xl prose-h2:sm:text-[1.75rem]",
  "prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-xl prose-h3:sm:text-2xl",
  "prose-h4:mt-6 prose-h4:mb-2 prose-h4:text-lg prose-h4:sm:text-xl",
  "prose-h5:text-base prose-h5:sm:text-lg",
  "prose-h6:text-sm prose-h6:sm:text-base",
  "prose-p:text-muted-foreground prose-p:leading-7",
  "prose-strong:font-semibold prose-strong:text-foreground",
  "prose-a:text-[#534AB7] prose-a:font-medium prose-a:no-underline prose-a:underline-offset-4 hover:prose-a:text-[#463E9E] hover:prose-a:underline",
  "prose-li:text-muted-foreground prose-li:my-1 prose-li:marker:text-[#534AB7]",
  "prose-li>p:my-0",
  "prose-blockquote:border-[#534AB7]/30 prose-blockquote:text-muted-foreground",
  "prose-hr:border-border/60",
  "prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[0.875em] prose-code:before:content-none prose-code:after:content-none",
);

function buildAssetMap(assets: ContentfulAsset[] | undefined) {
  return new Map((assets ?? []).map((asset) => [asset.sys.id, asset]));
}

function RichTextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const isExternal = href.startsWith("http://") || href.startsWith("https://") || href.startsWith("//");

  return (
    <a
      href={href}
      className={linkClassName}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

function RichTextEmbeddedAsset({ asset }: { asset: ContentfulAsset | undefined }) {
  if (!asset?.url) return null;

  const isImage = asset.contentType?.startsWith("image/") ?? true;
  if (!isImage) {
    return (
      <figure className="not-prose my-8">
        <RichTextLink href={asset.url}>{asset.title || "Download file"}</RichTextLink>
      </figure>
    );
  }

  const aspectRatio =
    asset.width && asset.height && asset.height > 0 ? asset.width / asset.height : 16 / 9;

  return (
    <figure className="not-prose my-8 sm:my-10">
      <div
        className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl"
        style={{ aspectRatio }}
      >
        <Image
          src={asset.url}
          alt={asset.description || asset.title || "Blog image"}
          fill
          className="object-contain object-center"
          sizes="(max-width: 768px) 100vw, 896px"
        />
      </div>
      {asset.description ? (
        <figcaption className="mt-2.5 text-center text-sm leading-relaxed text-muted-foreground">
          {asset.description}
        </figcaption>
      ) : null}
    </figure>
  );
}

function createRenderOptions(assetMap: Map<string, ContentfulAsset>): Options {
  return {
    renderMark: {
      [MARKS.BOLD]: (text: ReactNode) => <strong>{text}</strong>,
      [MARKS.ITALIC]: (text: ReactNode) => <em>{text}</em>,
      [MARKS.UNDERLINE]: (text: ReactNode) => <u>{text}</u>,
      [MARKS.STRIKETHROUGH]: (text: ReactNode) => <s>{text}</s>,
      [MARKS.CODE]: (text: ReactNode) => <code>{text}</code>,
      [MARKS.SUBSCRIPT]: (text: ReactNode) => <sub>{text}</sub>,
      [MARKS.SUPERSCRIPT]: (text: ReactNode) => <sup>{text}</sup>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node: unknown, children: ReactNode) => (
        <p className="mb-5 last:mb-0">{children}</p>
      ),
      [BLOCKS.HEADING_1]: (_node: unknown, children: ReactNode) => <h1>{children}</h1>,
      [BLOCKS.HEADING_2]: (_node: unknown, children: ReactNode) => <h2>{children}</h2>,
      [BLOCKS.HEADING_3]: (_node: unknown, children: ReactNode) => <h3>{children}</h3>,
      [BLOCKS.HEADING_4]: (_node: unknown, children: ReactNode) => <h4>{children}</h4>,
      [BLOCKS.HEADING_5]: (_node: unknown, children: ReactNode) => <h5>{children}</h5>,
      [BLOCKS.HEADING_6]: (_node: unknown, children: ReactNode) => <h6>{children}</h6>,
      [BLOCKS.UL_LIST]: (_node: unknown, children: ReactNode) => (
        <ul className="my-6 list-disc space-y-2 pl-6">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (_node: unknown, children: ReactNode) => (
        <ol className="my-6 list-decimal space-y-2 pl-6">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (_node: unknown, children: ReactNode) => <li>{children}</li>,
      [BLOCKS.QUOTE]: (_node: unknown, children: ReactNode) => (
        <blockquote className="my-6 border-l-4 border-[#534AB7]/30 pl-4 italic text-muted-foreground">
          {children}
        </blockquote>
      ),
      [BLOCKS.HR]: () => <hr className="my-8 border-border/60" />,
      [BLOCKS.TABLE]: (_node: unknown, children: ReactNode) => (
        <div className="not-prose my-8 overflow-x-auto rounded-xl border border-border/50">
          <table className="w-full min-w-[32rem] border-collapse text-left text-sm">{children}</table>
        </div>
      ),
      [BLOCKS.TABLE_ROW]: (_node: unknown, children: ReactNode) => (
        <tr className="border-b border-border/40 last:border-b-0">{children}</tr>
      ),
      [BLOCKS.TABLE_HEADER_CELL]: (_node: unknown, children: ReactNode) => (
        <th className="bg-muted/40 px-4 py-3 font-semibold text-foreground">{children}</th>
      ),
      [BLOCKS.TABLE_CELL]: (_node: unknown, children: ReactNode) => (
        <td className="px-4 py-3 text-muted-foreground">{children}</td>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline) => {
        const assetId = (node as Block).data.target?.sys?.id;
        if (!assetId) return null;
        return <RichTextEmbeddedAsset asset={assetMap.get(assetId)} />;
      },
      [INLINES.HYPERLINK]: (node: Block | Inline, children: ReactNode) => (
        <RichTextLink href={(node as Inline).data.uri}>{children}</RichTextLink>
      ),
      [INLINES.ASSET_HYPERLINK]: (node: Block | Inline, children: ReactNode) => {
        const assetId = (node as Inline).data.target?.sys?.id;
        const asset = assetId ? assetMap.get(assetId) : undefined;
        if (!asset?.url) return <>{children}</>;
        return <RichTextLink href={asset.url}>{children}</RichTextLink>;
      },
    },
  };
}

export function BlogRichText({ document }: BlogRichTextProps) {
  const assetMap = buildAssetMap(document.links?.assets?.block);
  const options = createRenderOptions(assetMap);

  return (
    <div className={proseClassName}>
      {documentToReactComponents(document.json as Document, options)}
    </div>
  );
}
