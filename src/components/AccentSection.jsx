'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mic, Globe2, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AccentSection({
  title = "Regional Accents & Dialects",
  description = "Our AI voice agent understands and speaks in various regional accents, ensuring authentic communication with your audience.",
  accents = []
}) {
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const scrollContainerRef = useRef(null);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollPrev(scrollLeft > 0);
      setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollNext = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 200; // w-[200px]
      const gap = 16; // gap-4
      const scrollAmount = cardWidth + gap;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScrollButtons, 300);
    }
  };

  const scrollPrev = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 200;
      const gap = 16;
      const scrollAmount = cardWidth + gap;
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScrollButtons, 300);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const handleResize = () => {
      checkScrollButtons();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [accents.length]);

  // Color gradients for different accent cards
  const accentColors = [
    { bg: 'from-blue-50 to-cyan-50', border: 'border-blue-200', text: 'text-blue-700', icon: 'text-blue-600' },
    { bg: 'from-purple-50 to-pink-50', border: 'border-purple-200', text: 'text-purple-700', icon: 'text-purple-600' },
    { bg: 'from-green-50 to-emerald-50', border: 'border-green-200', text: 'text-green-700', icon: 'text-green-600' },
    { bg: 'from-orange-50 to-amber-50', border: 'border-orange-200', text: 'text-orange-700', icon: 'text-orange-600' },
    { bg: 'from-indigo-50 to-violet-50', border: 'border-indigo-200', text: 'text-indigo-700', icon: 'text-indigo-600' },
    { bg: 'from-teal-50 to-cyan-50', border: 'border-teal-200', text: 'text-teal-700', icon: 'text-teal-600' },
    { bg: 'from-rose-50 to-pink-50', border: 'border-rose-200', text: 'text-rose-700', icon: 'text-rose-600' },
    { bg: 'from-yellow-50 to-orange-50', border: 'border-yellow-200', text: 'text-yellow-700', icon: 'text-yellow-600' },
  ];

  const getColorScheme = (index) => {
    return accentColors[index % accentColors.length];
  };

  if (!accents || accents.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center mb-4"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <Globe2 className="w-6 h-6 text-white" />
            </div>
          </motion.div>

          <motion.h2
            className="section-heading text-gray-900 mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {title}
          </motion.h2>

          <motion.div
            className="my-2 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full border border-indigo-200">
              <MapPin className="w-4 h-4 text-indigo-600" />
              <p className="text-sm text-indigo-700 ">
                Supporting {accents.length} regional accents for authentic communication
              </p>
            </div>
          </motion.div>

          {description && (
            <motion.p
              className="text-base text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {description}
            </motion.p>
          )}
        </div>

        {/* Accents Slider */}
        <div className="relative px-12">
          {/* Navigation Buttons */}
          {canScrollPrev && (
            <button
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg border-2 border-indigo-200 flex items-center justify-center hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-300"
              aria-label="Previous accents"
            >
              <ChevronLeft className="w-6 h-6 text-indigo-600" />
            </button>
          )}

          {canScrollNext && (
            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg border-2 border-indigo-200 flex items-center justify-center hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-300"
              aria-label="Next accents"
            >
              <ChevronRight className="w-6 h-6 text-indigo-600" />
            </button>
          )}

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className={`flex gap-4 overflow-x-auto overflow-y-visible scrollbar-hide scroll-smooth pb-4 ${accents.length < 6 ? 'justify-center' : 'justify-start'
              }`}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            onScroll={checkScrollButtons}
          >
            {accents.map((accent, index) => {
              const colors = getColorScheme(index);
              return (
                <motion.div
                  key={index}
                  className={`flex-shrink-0 w-[180px] sm:w-[200px] bg-gradient-to-br ${colors.bg} rounded-xl p-4 border-2 ${colors.border} hover:shadow-lg transition-all duration-300 cursor-pointer group shadow-md `}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-10 h-10 bg-white rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 border ${colors.border}`}>
                      <Mic className={`w-5 h-5 ${colors.icon}`} />
                    </div>
                    <h3 className={` text-sm ${colors.text} group-hover:scale-105 transition-transform duration-300`}>
                      {accent}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Scrollbar Hide CSS */}
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </div>

      </div>
    </section>
  );
}
