"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
};

export function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const path = "M0 117 V60 Q0 40 20 40 H80 Q100 40 100 20 Q100 0 120 0 H280 Q300 0 300 20 V340 Q301 360 280 360 H221 Q200 360 200 380 Q200 400 180 399 V400 H20 Q0 400 0 380 Z";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex justify-center w-full"
    >
      {/* Main div for the card */}
      <div className="group relative w-full aspect-[3/4] bg-red-500 rounded-2xl transition-transform duration-500">
        
        {/* Glow effect on hover behind the card */}
        <div className="absolute inset-0 bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 rounded-full" />

        <Link href={`/blog/${post.id}`} className="absolute inset-0 z-20" />
        
        {/* Top-Left Cutout Text (Date) */}
        <div className="absolute top-0 left-0 w-[33.33%] h-[10%] flex items-center justify-center z-10 pointer-events-none px-1">
          <span className="block text-[12px] sm:text-[14px] font-black  text-white drop-shadow-sm text-center">
            {post.date}
          </span>
        </div>

        {/* Bottom-Right Cutout Text (Author) */}
        <div className="absolute bottom-0 right-0 w-[33.33%] h-[10%] flex items-center justify-center z-10 pointer-events-none px-1">
          <span className="block text-[12px] sm:text-[14px] font-black  text-white drop-shadow-sm text-center">
            {post.author.name}
          </span>
        </div>

        {/* The SVG shape fully covering the parent div */}
        <svg 
          viewBox="0 0 300 400" 
          className="absolute inset-0 w-full h-full drop-shadow-2xl"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <clipPath id={`clip-${post.id}`}>
              <path d={path} />
            </clipPath>
          </defs>
          
          {/* Base shape background */}
          <path d={path} fill="#0a0a0a" className="transition-colors duration-500" />
          
          {/* Inside this SVG div, two divs using foreignObject */}
          <foreignObject x="0" y="0" width="300" height="400" clipPath={`url(#clip-${post.id})`}>
            <div className="relative w-full h-full bg-black">
              
              {/* Div 1: Image */}
              <div className="absolute inset-0 w-full h-full">
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                {/* Gradient overlay to make text readable and transition beautifully */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[2px]" />
              </div>

              {/* Title & Category visible when NOT hovered */}
              <div className="absolute inset-0 flex flex-col justify-end px-8 transition-all duration-500 group-hover:opacity-0 group-hover:-translate-y-4 z-0 pointer-events-none">
                <div className="mb-3 flex items-center gap-2">
                  <span className="rounded-full bg-black/50 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-md border border-white/10 uppercase tracking-widest">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold leading-tight tracking-tight text-white drop-shadow-md line-clamp-2">
                  {post.title}
                </h3>
                {/* Spacer to avoid bottom-right cutout */}
                <div className="shrink-0 h-[12%]" />
              </div>

              {/* Div 2: Content (appears on hover) */}
              <div className="absolute inset-0 flex flex-col px-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-8 group-hover:translate-y-0 z-10">
                
                {/* Spacer to avoid top-left cutout */}
                <div className="shrink-0 h-[12%]" />

                <div className="mb-4 flex items-center gap-3 text-[10px] font-bold text-white uppercase tracking-widest">
                  <span className="rounded-full bg-black/50 px-3 py-1 backdrop-blur-md text-white border border-white/10">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1 text-white/80">
                    <Clock className="size-3" />
                    {post.readTime}
                  </div>
                </div>

                <h3 className="mb-3 text-2xl font-black leading-tight tracking-tight text-white drop-shadow-lg">
                  {post.title}
                </h3>
                
                <p className="mb-6 line-clamp-4 text-sm leading-relaxed text-white/80">
                  {post.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/20">
                  <div className="flex items-center gap-2">
                    <div className="relative size-8 overflow-hidden rounded-full border border-white/20">
                      <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                    </div>
                    <span className="text-xs font-bold text-white">{post.author.name}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-black text-white transition-transform group-hover:translate-x-1">
                    Read <ArrowRight className="size-3" />
                  </div>
                </div>

                {/* Spacer to avoid bottom-right cutout */}
                <div className="shrink-0 h-[12%]" />

              </div>

            </div>
          </foreignObject>

          {/* Stroke outline drawn on top */}
          <path 
            d={path} 
            stroke="rgba(255,255,255,0.15)" 
            strokeWidth="2" 
            className="group-hover:stroke-primary/60 transition-colors duration-500 pointer-events-none" 
          />
        </svg>

      </div>
    </motion.div>
  );
}
