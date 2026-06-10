"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createNoise2D } from "simplex-noise";
import { motion, AnimatePresence, MotionConfig, useMotionValue } from "framer-motion";
import type { AudioDemoTrack } from "@/data/industry-hero-content";
import { useLoaderComplete } from "@/components/providers/loader-context";
import { useDemoSync } from "@/components/providers/demo-sync-context";

const INTERVAL = 80;
const TICK     = 0.042;
const SPRING   = { type: "spring", stiffness: 480, damping: 42, mass: 0.8 } as const;
const FAST     = { duration: 0.07 } as const;

function clamp(n: number, lo: number, hi: number) { return Math.min(Math.max(n, lo), hi); }
function fmt(s: number) { return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`; }
function neg(elapsed: number, total: number) {
  const r = Math.max(0, total - elapsed);
  return `-${Math.floor(r / 60)}:${String(Math.floor(r % 60)).padStart(2, "0")}`;
}

/* ─── Icons ──────────────────────────────────────────────── */
const StarIcon    = () => <svg viewBox="0 0 576 512" className="w-[18px] h-[18px] fill-white/50"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329l-24.6 145.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3L288.1 439.8l128.3 68.5c10.8 5.7 23.9 4.4 33.8-2.3s14.9-19.3 12.9-31.3L439.4 329l104.2-103.1c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>;
const RewindIcon  = () => <svg viewBox="0 0 512 512" className="w-[22px] h-[22px] fill-white"><path d="M459.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4L288 214.3V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160C27.1 237.2 24 246.2 24 256s3.1 18.8 9.5 24.2l192 160c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V297.7L459.5 440.6z"/></svg>;
const ForwardIcon = () => <svg viewBox="0 0 512 512" className="w-[22px] h-[22px] fill-white"><path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4L224 214.3V96c0-12.4 7.2-23.7 18.4-29s24.5-3.6 34.1 4.4l192 160c6.4 5.4 9.5 14.4 9.5 24.2s-3.1 18.8-9.5 24.2l-192 160c-9.5 7.9-22.8 9.7-34.1 4.4s-18.4-16.6-18.4-29V297.7L52.5 440.6z"/></svg>;
const AirplayIcon = () => <svg viewBox="0 0 576 512" className="w-[18px] h-[18px] fill-white/50"><path d="M549.8 237.5c-31.23-79.1-105.4-133.5-191.8-133.5c-104 0-192 80-207.8 179.1C137.7 291.4 128 303.6 128 318c0 27.67 22.33 42 49.97 42h.0547c.5664 0 1.125-.082 1.688-.1094C192.5 424.2 234.3 456 288 456c35.98 0 67.83-15.18 90.94-39.19l-68.94-68.94C303.8 353.9 296.3 356 288 356c-26.47 0-47.97-21.5-47.97-48s21.5-48 47.97-48c10.27 0 19.66 3.363 27.41 8.813l116.3-116.3C396.1 134.3 342.9 112 288 112c-93.01 0-171.9 60.72-199.2 144H288v128H172.7L64.03 320H27.97C12.53 320 0 307.5 0 292V220C0 204.5 12.53 192 27.97 192h54.16L288 0l205.8 192H548c15.44 0 27.97 12.53 27.97 27.97v72C576 307.5 563.5 320 548 320h-36.06L549.8 237.5z"/></svg>;
const WaveIcon    = ({ bars, accent, playing }: { bars: number[]; accent: string; playing: boolean }) => (
  <div className="flex items-end gap-[2px]" style={{ height: 18 }}>
    {[0,1,2,3].map(i => (
      <div key={i} className="w-[3px] rounded-full"
        style={{ height: playing ? `${clamp(bars[i*4] * 0.48, 3, 18)}px` : `${[8, 14, 10, 16][i]}px`,
          background: accent, opacity: 0.75,
          transition: `height ${INTERVAL}ms ease` }} />
    ))}
  </div>
);

/* ─── Main ───────────────────────────────────────────────── */
export function AudioDemoPlayer({ tracks }: { tracks: AudioDemoTrack[] }) {
  const [expanded, setExpanded] = useState(false);
  const [playing,  setPlaying]  = useState(false);
  const [idx,      setIdx]      = useState(0);
  const [elapsed,  setElapsed]  = useState(0);
  const [bars,     setBars]     = useState<number[]>(() => Array(64).fill(5));

  const tickRef    = useRef(0);
  const noiseRef   = useRef(createNoise2D());
  const dragY      = useMotionValue(0);
  const loaderDone = useLoaderComplete();
  const { activeLabel, inlinePlaying, inlineProgress, inlineBars, resetInlineDemo } = useDemoSync();

  const track    = tracks[idx] ?? tracks[0];
  const progress = elapsed / track.seconds;

  /* When the inline demo is active, mirror its state */
  const displayLabel    = inlinePlaying && activeLabel ? activeLabel : track.label;
  const displayProgress = inlinePlaying ? inlineProgress : progress;
  const isPlaying       = playing || inlinePlaying;
  const displayBars     = inlinePlaying ? inlineBars : bars;

  const animateBars = useCallback(() => {
    tickRef.current += TICK;
    const t = tickRef.current;
    const n = noiseRef.current;
    setBars(Array.from({ length: 64 }, (_, i) => {
      const e = (i < 4 || i > 60) ? 0.22 : 1;
      return clamp((n(i * 0.15, t) + 1) * 0.5 * 32 * e + 2, 2, 32);
    }));
  }, []);

  /* Bar animation — only run own noise when standalone playing; inline bars come from context */
  useEffect(() => {
    if (!playing || inlinePlaying) return;
    const id = setInterval(animateBars, INTERVAL);
    return () => clearInterval(id);
  }, [playing, inlinePlaying, animateBars]);

  /* Elapsed clock — only for the standalone floating player */
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setElapsed(e => {
        const next = e + INTERVAL / 1000;
        if (next >= track.seconds) { setPlaying(false); return 0; }
        return next;
      });
    }, INTERVAL);
    return () => clearInterval(id);
  }, [playing, track.seconds]);

  function changeTrack(dir: 1 | -1) {
    setIdx(i => (i + dir + tracks.length) % tracks.length);
    setElapsed(0); setPlaying(false); setBars(Array(64).fill(5));
  }

  /* pill bars */
  const litPill = Math.floor(displayProgress * 24);

  const shadow = `0 16px 48px -8px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.09), 0 0 28px -6px ${track.accent}28`;

  return (
    <MotionConfig transition={SPRING}>
      <AnimatePresence>
      {loaderDone && (
      <motion.div
        key="player-mount"
        initial={{ opacity: 0, y: 24, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1, transition: { delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
        exit={{ opacity: 0, y: 16, scale: 0.94, transition: { duration: 0.25 } }}
        style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999 }}
      >
      {/* Draggable anchor — y-draggable */}
      <motion.div
        drag="y"
        dragMomentum={false}
        dragElastic={0.12}
        dragConstraints={{ top: -(typeof window !== "undefined" ? window.innerHeight - 120 : 600), bottom: 0 }}
        style={{ y: dragY, touchAction: "none" }}
        className="select-none"
      >
        {/* ── Shape morph container — explicit dimensions so both states are always known ── */}
        <motion.div
          animate={{
            width:        expanded ? 340  : 260,
            height:       expanded ? 170  : 58,
            borderRadius: expanded ? 20   : 999,
          }}
          transition={SPRING}
          style={{
            background: "linear-gradient(150deg,#0c0c0f 0%,#161619 100%)",
            boxShadow: shadow,
            overflow: "hidden",
            position: "relative",
          }}
        >

          {/* ══════════════════════════
              COLLAPSED  pill
          ══════════════════════════ */}
          <AnimatePresence>
            {!expanded && (
              <motion.div key="pill"
                initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.18, duration: 0.18 } }}
                exit={{ opacity: 0, transition: FAST }}
                className="flex items-center gap-3 cursor-pointer"
                style={{ position: "absolute", inset: 0, padding: "0 14px" }}
                onClick={() => setExpanded(true)}
              >
                {/* Mini bars */}
                <div className="flex items-center gap-[2px] shrink-0" style={{ width: 48, height: 24 }}>
                  {displayBars.slice(0, 24).map((h, i) => (
                    <div key={i} className="flex-1 rounded-full"
                      style={{ height: `${clamp(h * 0.65, 2, 18)}px`,
                        background: i < litPill ? track.accent : "rgba(255,255,255,0.18)",
                        transition: `height ${INTERVAL}ms ease` }} />
                  ))}
                </div>
                <span className="flex-1 text-white text-[12.5px] font-medium truncate leading-tight">{displayLabel}</span>
                <motion.button whileTap={{ scale: 0.86 }}
                  onClick={e => {
                    e.stopPropagation();
                    if (inlinePlaying) { resetInlineDemo(); return; }
                    setPlaying(p => !p);
                  }}
                  className="w-[30px] h-[30px] rounded-full flex items-center justify-center shrink-0"
                  style={{ background: track.accent, boxShadow: `0 3px 12px -3px ${track.accent}90` }}>
                  <AnimatePresence mode="wait" initial={false}>
                    {isPlaying
                      ? <motion.svg key="pa" className="w-[10px] fill-white" viewBox="0 0 320 512" initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }} transition={{ duration: 0.1 }}><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></motion.svg>
                      : <motion.svg key="pl" className="w-[10px] fill-white ml-px" viewBox="0 0 384 512" initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }} transition={{ duration: 0.1 }}><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></motion.svg>
                    }
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ══════════════════════════
              EXPANDED  iPhone widget
          ══════════════════════════ */}
          <AnimatePresence>
            {expanded && (
              <motion.div key="card"
                initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.2 } }}
                exit={{ opacity: 0, transition: FAST }}
                style={{ position: "absolute", inset: 0, width: 340 }}
              >
                {/* Row 1 — art + info + wave icon */}
                <div className="flex items-center gap-3 px-3 pt-3 pb-2">
                  {/* Album art — centered waveform */}
                  <div className="shrink-0 rounded-[10px] overflow-hidden flex items-center justify-between px-[5px]"
                    style={{ width: 56, height: 56,
                      background: `linear-gradient(145deg,${track.from} 0%,${track.to} 100%)`,
                      boxShadow: `0 4px 14px -3px ${track.accent}55` }}>
                    {displayBars.slice(4, 22).map((h, i) => (
                      <div key={i} className="flex-1 rounded-full mx-px"
                        style={{ height: `${clamp(h * 0.72, 3, 30)}px`,
                          background: "rgba(255,255,255,0.85)",
                          opacity: isPlaying ? 1 : 0.45,
                          transition: `height ${INTERVAL}ms ease` }} />
                    ))}
                  </div>

                  {/* Track + artist */}
                  <div className="flex-1 min-w-0">
                    <AnimatePresence mode="wait">
                      <motion.div key={track.id}
                        initial={{ opacity: 0, x: 5 }} animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -5 }} transition={{ duration: 0.15 }}>
                        <p className="text-white font-semibold text-[0.9rem] leading-tight truncate">{displayLabel}</p>
                        <p className="text-white/45 text-[0.72rem] mt-[2px] truncate">{track.artist}</p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Waveform + close */}
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <button onClick={() => setExpanded(false)}
                      className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                      <svg className="w-2.5 h-2.5 fill-white/30" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3l105.4 105.3c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256l105.3-105.4z"/></svg>
                    </button>
                    <WaveIcon bars={displayBars} accent={track.accent} playing={isPlaying} />
                  </div>
                </div>

                {/* Row 2 — progress */}
                <div className="px-4 mb-1">
                  <div className="relative h-[3px] rounded-full" style={{ background: "rgba(255,255,255,0.12)" }}>
                    <motion.div className="absolute inset-y-0 left-0 rounded-full"
                      style={{ background: `linear-gradient(90deg, ${track.from}, ${track.accent})` }}
                      animate={{ width: `${displayProgress * 100}%` }}
                      transition={{ duration: 0.08, ease: "linear" }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-white/30 mt-1">
                    {inlinePlaying ? (
                      <>
                        <span>{Math.round(inlineProgress * 100)}%</span>
                        <span>Demo</span>
                      </>
                    ) : (
                      <>
                        <span>{fmt(elapsed)}</span>
                        <span>{neg(elapsed, track.seconds)}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Row 3 — controls */}
                <div className="flex items-center justify-between px-4 pb-3 pt-1">
                    <div></div>
                  <motion.button whileTap={{ scale: 0.82 }} onClick={() => changeTrack(-1)}>
                    <RewindIcon />
                  </motion.button>

                  <motion.button whileTap={{ scale: 0.88 }} whileHover={{ scale: 1.06 }}
                    onClick={() => { if (inlinePlaying) { resetInlineDemo(); return; } setPlaying(p => !p); }}
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: "white", boxShadow: `0 6px 20px -4px rgba(0,0,0,0.5)` }}>
                    <AnimatePresence mode="wait" initial={false}>
                      {isPlaying
                        ? <motion.svg key="pa" className="w-[18px] h-[18px]" viewBox="0 0 320 512" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.1 }}><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></motion.svg>
                        : <motion.svg key="pl" className="w-[18px] h-[18px] ml-0.5" viewBox="0 0 384 512" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.1 }}><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></motion.svg>
                      }
                    </AnimatePresence>
                  </motion.button>

                  <motion.button whileTap={{ scale: 0.82 }} onClick={() => changeTrack(1)}>
                    <ForwardIcon />
                  </motion.button>
                      <div></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </motion.div>
      </motion.div>
      )}
      </AnimatePresence>
    </MotionConfig>
  );
}
