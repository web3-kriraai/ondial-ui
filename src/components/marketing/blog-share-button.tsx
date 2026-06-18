"use client";

import { useEffect, useState } from "react";
import { Menu } from "@base-ui/react/menu";
import { Copy, Mail, Share2 } from "lucide-react";
import { toast } from "sonner";

import { buttonVariants } from "@/components/ui/button";
import { getShareLinks } from "@/lib/share-links";
import { cn } from "@/lib/utils";

type BlogShareButtonProps = {
  title: string;
  url: string;
};

const menuItemClass =
  "flex w-full cursor-default items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-foreground outline-none select-none data-highlighted:bg-muted";

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-4 shrink-0 fill-current">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.56V9h3.554v11.452z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-4 shrink-0 fill-current">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-4 shrink-0 fill-current">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function BlogShareButton({ title, url }: BlogShareButtonProps) {
  const [canNativeShare, setCanNativeShare] = useState(false);
  const links = getShareLinks(url, title);

  useEffect(() => {
    setCanNativeShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Couldn't copy link");
    }
  };

  const nativeShare = async () => {
    if (!navigator.share) return;

    try {
      await navigator.share({ title, url, text: title });
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      toast.error("Couldn't share this article");
    }
  };

  return (
    <Menu.Root modal={false}>
      <Menu.Trigger
        aria-label="Share article"
        className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }), "shrink-0 rounded-full")}
      >
        <Share2 className="size-3.5" />
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Positioner side="bottom" align="end" sideOffset={6} className="z-50 outline-none">
          <Menu.Popup className="min-w-[11.5rem] origin-[var(--transform-origin)] rounded-xl border border-border bg-popover p-1 text-popover-foreground shadow-md outline-none">
            <Menu.Group>
              <Menu.GroupLabel className="px-2.5 py-1.5 text-xs font-medium text-muted-foreground">
                Share
              </Menu.GroupLabel>

              {canNativeShare ? (
                <Menu.Item className={menuItemClass} onClick={nativeShare}>
                  <Share2 className="size-4 shrink-0" />
                  Share via…
                </Menu.Item>
              ) : null}

              <Menu.Item className={menuItemClass} onClick={copyLink}>
                <Copy className="size-4 shrink-0" />
                Copy link
              </Menu.Item>

              <Menu.Separator className="mx-1 my-1 h-px bg-border" />

              <Menu.LinkItem
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={menuItemClass}
                closeOnClick
              >
                <LinkedInIcon />
                LinkedIn
              </Menu.LinkItem>

              <Menu.LinkItem
                href={links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className={menuItemClass}
                closeOnClick
              >
                <XIcon />
                X (Twitter)
              </Menu.LinkItem>

              <Menu.LinkItem
                href={links.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className={menuItemClass}
                closeOnClick
              >
                <FacebookIcon />
                Facebook
              </Menu.LinkItem>

              <Menu.LinkItem href={links.email} className={menuItemClass} closeOnClick>
                <Mail className="size-4 shrink-0" />
                Email
              </Menu.LinkItem>
            </Menu.Group>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
