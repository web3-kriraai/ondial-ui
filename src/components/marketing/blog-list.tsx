"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";

import { useShellScroll } from "@/components/layout/shell-scroll-context";
import { BlogCard, type BlogPost } from "@/components/marketing/blog-card";
import { blogListingGridClass } from "@/config/marketing-layout";
import { getPageSlice } from "@/lib/pagination";

const Pagination = dynamic(
  () => import("@/components/ui/pagination").then((module) => module.Pagination),
  { ssr: false },
);

const ITEMS_PER_PAGE = 8;
const easeOut = [0.22, 1, 0.36, 1] as const;

type BlogListProps = {
  posts: BlogPost[];
};

export function BlogList({ posts }: BlogListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const { scrollToTop } = useShellScroll();
  const prefersReducedMotion = useReducedMotion();
  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE) || 1;
  const currentPosts = getPageSlice(posts, currentPage, ITEMS_PER_PAGE);

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      scrollToTop(prefersReducedMotion ? "auto" : "smooth");
    },
    [scrollToTop, prefersReducedMotion],
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between border-b border-border/10 pb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
          All Articles ({posts.length})
        </span>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentPage}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: easeOut }}
          className={blogListingGridClass}
        >
          {currentPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </motion.div>
      </AnimatePresence>

      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, ease: easeOut, delay: 0.15 }}
      >
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={posts.length}
          pageSize={ITEMS_PER_PAGE}
          onPageChange={handlePageChange}
          className="mt-2"
        />
      </motion.div>
    </div>
  );
}
