'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const VoiceAIVisualizer = () => {
  return (
    <div className="relative w-full max-w-lg aspect-square mx-auto flex items-center justify-center">
      {/* Background glow */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Outer rings */}
      <motion.div 
        className="absolute inset-4 sm:inset-8 border border-indigo-500/20 rounded-full"
        animate={{ rotate: 360, scale: [1, 1.02, 1] }}
        transition={{ duration: 20, rotate: { repeat: Infinity, ease: "linear" }, scale: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
      />
      <motion.div 
        className="absolute inset-12 sm:inset-20 border border-dashed border-purple-500/30 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute inset-20 sm:inset-32 border border-indigo-500/20 rounded-full"
        animate={{ rotate: 180, scale: [1, 0.98, 1] }}
        transition={{ duration: 15, rotate: { repeat: Infinity, ease: "linear" }, scale: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
      />

      {/* Orbiting particles */}
      <motion.div
        className="absolute inset-4 sm:inset-8"
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.8)]" />
      </motion.div>
      <motion.div
        className="absolute inset-12 sm:inset-20"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
      </motion.div>
      <motion.div
        className="absolute inset-20 sm:inset-32"
        animate={{ rotate: 180 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-indigo-400 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
      </motion.div>

      {/* Center Core */}
      <div className="relative z-10 w-32 h-32 sm:w-40 sm:h-40 bg-white/90 backdrop-blur-xl rounded-full shadow-2xl flex items-center justify-center border border-indigo-100/50">
        {/* Core pulsing background */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-full opacity-10"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute inset-2 border border-indigo-200/50 rounded-full"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        
        {/* Voice Waveform */}
        <div className="flex items-center justify-center gap-1 sm:gap-1.5 h-16 w-full px-6">
          {[
            { height: [16, 32, 16], delay: 0 },
            { height: [24, 48, 24], delay: 0.15 },
            { height: [32, 64, 32], delay: 0.3 },
            { height: [24, 48, 24], delay: 0.45 },
            { height: [16, 32, 16], delay: 0.6 },
          ].map((bar, i) => (
            <motion.div
              key={i}
              className="w-1.5 sm:w-2 bg-gradient-to-t from-indigo-600 to-purple-500 rounded-full"
              animate={{ height: bar.height }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: bar.delay
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default function StateVoiceAIBusinessBenefits({ title, description, items = [] }) {
  if (!items?.length) return null;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-indigo-50/30 overflow-hidden relative">
      {/* Background abstract elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-purple-100/40 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-indigo-100/40 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="section-heading bg-clip-text text-transparent bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 mb-6">{title}</h2>
          {description ? (
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{description}</p>
          ) : null}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* List Content */}
          <div className="space-y-4">
            {items.map((line, index) => (
              <motion.div
                key={index}
                className="group relative flex items-start space-x-4 p-5 bg-white/80 backdrop-blur-md rounded-2xl border border-indigo-50/50 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(99,102,241,0.1)] transition-all duration-500 hover:-translate-y-1"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              >
                {/* Hover gradient background effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="relative flex-shrink-0 w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mt-0.5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-md shadow-indigo-200">
                  <Check className="w-5 h-5 text-white" strokeWidth={2.5} />
                  {/* Subtle pulse behind the check icon on hover */}
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:animate-ping rounded-xl pointer-events-none" />
                </div>
                <p className="relative text-gray-700 text-lg leading-relaxed flex-1 font-medium">{line}</p>
              </motion.div>
            ))}
          </div>

          {/* AI Animation Side */}
          <motion.div 
            className="flex justify-center items-center w-full mt-8 lg:mt-0"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <VoiceAIVisualizer />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
