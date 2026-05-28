"use client";

import { useState } from "react";
import { BlogCard, type BlogPost } from "@/components/marketing/blog-card";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function BlogList({ posts }: { posts: BlogPost[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Shows exactly 2 rows on large desktop monitors (4 cols)
  
  const totalPages = Math.ceil(posts.length / itemsPerPage);

  const currentPosts = posts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Scroll to top of grid when page changes
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({
      top: 400, // roughly the top of the grid
      behavior: "smooth"
    });
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-6 md:gap-10">
        {currentPosts.map((post, index) => (
          <BlogCard key={post.id} post={post} index={index} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="flex items-center justify-center p-3 rounded-full border border-primary/20 hover:bg-primary/10 disabled:opacity-50 disabled:pointer-events-none transition-colors"
          >
            <ChevronLeft className="size-5" />
          </button>
          
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`size-10 rounded-full text-sm font-bold transition-all ${
                  currentPage === i + 1 
                    ? "bg-primary text-primary-foreground scale-110 shadow-md" 
                    : "hover:bg-primary/10 text-muted-foreground"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center p-3 rounded-full border border-primary/20 hover:bg-primary/10 disabled:opacity-50 disabled:pointer-events-none transition-colors"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
}
