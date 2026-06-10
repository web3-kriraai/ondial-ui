"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { createNoise2D } from "simplex-noise";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import {
  PhoneIncoming, CalendarDays, Filter, BellRing, FileText, UserCheck,
  MessageSquare, Clock, Plug, Languages, BarChart2, Settings, Database,
  ShieldCheck, Play,
  Brain, Wrench, CheckCheck, UserPlus, Bell, Tag, Search,
  Flame, Star, RotateCcw, PhoneCall, ListChecks, CalendarCheck,
} from "lucide-react";
import type { IndustryPageContent } from "@/data/industry-hero-content";
import { useDemoSync } from "@/components/providers/demo-sync-context";
import { marketingEyebrowClass } from "@/config/marketing-layout";
import { cn } from "@/lib/utils";

/* ─── Icon resolver ──────────────────────────────────────── */
const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  PhoneIncoming, CalendarDays, Filter, BellRing, FileText, UserCheck,
  MessageSquare, Clock, Plug, Languages, BarChart2, Settings, Database, ShieldCheck,
  Brain, Wrench, CheckCheck, UserPlus, Bell, Tag, Search,
  Flame, Star, RotateCcw, PhoneCall, ListChecks, CalendarCheck,
};
function Icon({ name, className }: { name: string; className?: string }) {
  const C = ICONS[name] ?? PhoneIncoming;
  return <C className={className} />;
}

function parseDur(d: string): number {
  const [m, s] = d.split(":").map(Number);
  return (m ?? 0) * 60 + (s ?? 0);
}
function fmtSecs(s: number) {
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

/* ─── Light chat bubble with optional word-level highlight ─── */
function Bubble({ msg, from, activeWordIdx = -1 }: {
  msg: string;
  from: "ai" | "caller";
  activeWordIdx?: number;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);
  const isAI = from === "ai";

  /* Render words as spans so the active one can be highlighted */
  function renderWords() {
    const tokens = msg.split(/(\s+)/);
    let wi = 0;
    return tokens.map((tok, i) => {
      if (/^\s+$/.test(tok)) return <span key={i}>{tok}</span>;
      const idx = wi++;
      const active = idx === activeWordIdx;
      return (
        <span key={i}
          className={active ? (isAI ? "rounded px-0.5 bg-white/30" : "rounded px-0.5 bg-[#534AB7]/20") : ""}>
          {tok}
        </span>
      );
    });
  }

  return (
    <div className={`flex flex-col ${isAI ? "items-end" : "items-start"}`}
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 0.38s ease, transform 0.38s ease" }}>
      <p className="text-[10px] font-medium mb-1 text-muted-foreground">
        {isAI ? "AI Agent" : "Caller"}
      </p>
      <div className={`max-w-[82%] px-3.5 py-2.5 text-[13px] leading-relaxed ${
        isAI
          ? "rounded-2xl rounded-br-sm bg-[#534AB7] text-white"
          : "rounded-2xl rounded-bl-sm bg-[#F1F0F9] text-[#1a1a2e] border border-[#E5E3F6]"
      }`}>
        {activeWordIdx >= 0 ? renderWords() : msg}
      </div>
    </div>
  );
}

/* ─── Demo player ────────────────────────────────────────── */
function DemoPlayer({ scenarios }: { scenarios: IndustryPageContent["demoScenarios"] }) {
  const [activeIdx,   setActiveIdx]   = useState(0);
  const [playing,     setPlaying]     = useState(false);
  const [progress,    setProgress]    = useState(0);   // 0-1 for simulated / derived for real audio
  const [currentTime, setCurrentTime] = useState(0);   // real audio seconds
  const [audioDur,    setAudioDur]    = useState(0);   // real audio duration
  const [started,     setStarted]     = useState(false);
  const [bars,        setBars]        = useState<number[]>(() => Array(64).fill(5));

  const audioRef     = useRef<HTMLAudioElement | null>(null);
  const barsTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const simTimerRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef  = useRef(0);
  const tickRef      = useRef(0);
  const noiseRef     = useRef(createNoise2D());
  const chatRef      = useRef<HTMLDivElement>(null);
  const { inlinePlaying: ctxPlaying, setInlineDemo, setInlineBars, resetInlineDemo } = useDemoSync();

  const scenario  = scenarios[activeIdx];
  const hasAudio  = !!scenario.audioSrc;
  const totalMsgs = scenario.messages.length;

  /* Unified 0-1 progress used for all render decisions */
  const renderProgress = hasAudio && audioDur > 0 ? currentTime / audioDur : progress;

  /* Per-message start fractions based on character proportions */
  const msgChars  = scenario.messages.map(m => m.text.length);
  const totalChars = msgChars.reduce((a, b) => a + b, 0) || 1;
  const msgStartFrac = msgChars.reduce<number[]>((acc, _, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + msgChars[i - 1] / totalChars);
    return acc;
  }, []);

  /* Which messages are visible */
  const visibleCount = hasAudio
    ? Math.max(1, msgStartFrac.filter(f => renderProgress >= f).length)
    : !started
      ? 1
      : renderProgress >= 1
        ? totalMsgs
        : Math.max(1, Math.floor(renderProgress * totalMsgs) + 1);

  /* Index of the message currently being spoken */
  const activeMessageIdx = playing
    ? (() => { let a = 0; msgStartFrac.forEach((f, i) => { if (renderProgress >= f) a = i; }); return a; })()
    : -1;

  /* Which word within the active message to highlight */
  function getWordIdx(msgIdx: number): number {
    if (msgIdx !== activeMessageIdx || !playing) return -1;
    const s = msgStartFrac[msgIdx];
    const e = msgStartFrac[msgIdx + 1] ?? 1;
    const frac = Math.min((renderProgress - s) / Math.max(e - s, 0.001), 0.999);
    const words = scenario.messages[msgIdx].text.trim().split(/\s+/);
    return Math.min(Math.floor(frac * words.length), words.length - 1);
  }

  /* Bar animation (shared between real + simulated) */
  const animateBars = useCallback(() => {
    tickRef.current += 0.042;
    const t = tickRef.current;
    const n = noiseRef.current;
    const next = Array.from({ length: 64 }, (_, i) => {
      const e = i < 4 || i > 60 ? 0.22 : 1;
      return Math.min(Math.max((n(i * 0.15, t) + 1) * 0.5 * 32 * e + 2, 2), 32);
    });
    setBars(next);
    setInlineBars(next);
  }, [setInlineBars]);

  function stopBars() {
    if (barsTimerRef.current) { clearInterval(barsTimerRef.current); barsTimerRef.current = null; }
  }
  function startBars() {
    if (!barsTimerRef.current) barsTimerRef.current = setInterval(animateBars, 80);
  }
  function stopSim() {
    if (simTimerRef.current) { clearInterval(simTimerRef.current); simTimerRef.current = null; }
  }

  /* ── Real audio element setup ── */
  useEffect(() => {
    if (!scenario.audioSrc) return;
    const audio = new Audio(scenario.audioSrc);
    audioRef.current = audio;

    const onMeta = () => setAudioDur(audio.duration);
    const onTime = () => {
      setCurrentTime(audio.currentTime);
      setInlineDemo(true, scenario.label, audio.currentTime / (audio.duration || 1));
    };
    const onEnded = () => {
      setPlaying(false);
      stopBars();
      setCurrentTime(audio.duration);
      setInlineDemo(false, scenario.label, 1);
    };

    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
      audio.src = "";
      audioRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenario.audioSrc, scenario.label]);

  /* Context-driven pause (floating player stops → inline stops too) */
  useEffect(() => {
    if (!ctxPlaying && playing) {
      if (hasAudio && audioRef.current) audioRef.current.pause();
      else stopSim();
      setPlaying(false);
      stopBars();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctxPlaying]);

  /* Auto-scroll chat on new bubble */
  useEffect(() => {
    const el = chatRef.current;
    if (!el) return;
    requestAnimationFrame(() => el.scrollTo({ top: el.scrollHeight, behavior: "smooth" }));
  }, [visibleCount]);

  function handleScenario(i: number) {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
    stopSim(); stopBars();
    setActiveIdx(i);
    setPlaying(false); setProgress(0); setCurrentTime(0); setAudioDur(0); setStarted(false);
    progressRef.current = 0; tickRef.current = 0;
    setBars(Array(64).fill(5));
    resetInlineDemo();
  }

  function togglePlay() {
    /* ── Real audio ── */
    if (hasAudio) {
      const audio = audioRef.current;
      if (!audio) return;
      if (playing) {
        audio.pause();
        setPlaying(false); stopBars();
        setInlineDemo(false, scenario.label, audio.currentTime / (audioDur || 1));
      } else {
        setStarted(true);
        audio.play().catch(() => {});
        setPlaying(true); startBars();
        setInlineDemo(true, scenario.label, audio.currentTime / (audioDur || 1));
      }
      return;
    }
    /* ── Simulated playback ── */
    if (playing) {
      stopSim(); stopBars();
      setPlaying(false);
      setInlineDemo(false, scenario.label, progressRef.current);
      return;
    }
    setStarted(true);
    if (progressRef.current >= 1) { progressRef.current = 0; setProgress(0); }
    setPlaying(true); startBars();
    setInlineDemo(true, scenario.label, progressRef.current);
    simTimerRef.current = setInterval(() => {
      animateBars();
      const next = progressRef.current + 0.015;
      if (next >= 1) {
        progressRef.current = 1; setProgress(1); stopSim(); stopBars();
        setPlaying(false); setInlineDemo(false, scenario.label, 1);
        return;
      }
      progressRef.current = next; setProgress(next);
      setInlineDemo(true, scenario.label, next);
    }, 80);
  }

  /* Unmount cleanup */
  useEffect(() => () => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.src = ""; }
    stopSim(); stopBars(); resetInlineDemo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const durSecs    = hasAudio ? audioDur : parseDur(scenario.duration);
  const elapsedSec = hasAudio ? currentTime : renderProgress * durSecs;

  return (
    <div className="rounded-2xl overflow-hidden mb-10 select-none border border-border/60 bg-background"
      style={{ boxShadow: "0 4px 32px -8px rgba(83,74,183,0.12), 0 1px 4px rgba(0,0,0,0.06)" }}>

      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border/60 bg-background">
        <div className="flex items-center gap-2 text-[13px] font-semibold text-foreground">
          <PhoneIncoming className="w-4 h-4 text-[#534AB7]" />
          Live call demo
        </div>
        <span className={`flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border ${
          playing
            ? "bg-[#E7F8F2] text-[#0E7A5A] border-[#A3E6CE]"
            : started
              ? "bg-[#FFF7ED] text-[#92400E] border-[#FCD5A2]"
              : "bg-muted text-muted-foreground border-border/60"
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${
            playing ? "bg-[#10B981] animate-pulse" : started ? "bg-[#F59E0B]" : "bg-muted-foreground/40"
          }`} />
          {playing ? "AI speaking" : started ? "Paused" : "Ready"}
        </span>
      </div>

      {/* ── Body — 2-col ── */}
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ minHeight: 340 }}>

        {/* LEFT — Synced transcript */}
        <div className="flex flex-col overflow-hidden border-b md:border-b-0 md:border-r border-border/60">
          <div className="px-4 pt-3 pb-2 shrink-0 border-b border-border/60">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Live Transcript</p>
          </div>
          <div ref={chatRef} className="transcript-scroll flex flex-col gap-3 p-4 overflow-y-auto flex-1"
            style={{ maxHeight: 400, minHeight: 220, scrollbarWidth: "thin", scrollbarColor: "#D4D2F0 transparent" }}>
            {!started && (
              <div className="flex flex-col items-center justify-center h-full py-10 gap-3">
                <div className="w-10 h-10 rounded-full bg-[#EEEDFE] flex items-center justify-center">
                  <PhoneIncoming className="w-4.5 h-4.5 text-[#534AB7]" />
                </div>
                <p className="text-[12px] text-muted-foreground text-center leading-relaxed">
                  Press play to hear<br />the conversation
                </p>
              </div>
            )}
            {scenario.messages.slice(0, visibleCount).map((msg, i) => (
              <Bubble
                key={`${activeIdx}-${i}`}
                msg={msg.text}
                from={msg.from}
                activeWordIdx={getWordIdx(i)}
              />
            ))}
            {playing && visibleCount < totalMsgs && (
              <div className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl rounded-bl-sm w-fit bg-[#F1F0F9] border border-[#E5E3F6]">
                {[0,1,2].map(i => (
                  <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#534AB7]/40"
                    style={{ animation: `dBounce 1.2s infinite ${i*0.2}s` }} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — Controls (light) */}
        <div className="flex flex-col gap-4 p-4 bg-[#FAFAFA]">

          {/* Scenario tabs */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Choose scenario</p>
            <div className="flex flex-wrap gap-1.5">
              {scenarios.map((s, i) => (
                <button key={i} onClick={() => handleScenario(i)}
                  className={`text-[12px] px-3.5 py-1 rounded-full border transition-all font-medium ${
                    activeIdx === i
                      ? "bg-[#534AB7] text-white border-[#534AB7]"
                      : "bg-white text-[#6b6b8a] border-border/70 hover:border-[#534AB7]/40 hover:text-[#534AB7]"
                  }`}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Player card — light version */}
          <div className="rounded-2xl border border-border/60 bg-white overflow-hidden"
            style={{ boxShadow: "0 2px 12px -3px rgba(83,74,183,0.10)" }}>
            {/* Row 1 — album art + title + wave */}
            <div className="flex items-center gap-3 px-3.5 pt-3.5 pb-2">
              <div className="shrink-0 rounded-[10px] overflow-hidden flex items-center justify-between px-[5px]"
                style={{ width: 52, height: 52,
                  background: "linear-gradient(145deg,#2d2175 0%,#534AB7 100%)",
                  boxShadow: "0 4px 12px -3px rgba(83,74,183,0.4)" }}>
                {bars.slice(4, 22).map((h, i) => (
                  <div key={i} className="flex-1 rounded-full mx-px"
                    style={{ height: `${Math.min(Math.max(h * 0.68, 2), 28)}px`,
                      background: "rgba(255,255,255,0.9)",
                      opacity: playing ? 1 : 0.35,
                      transition: "height 80ms ease" }} />
                ))}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[0.875rem] text-foreground leading-tight truncate">{scenario.label}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <p className="text-[0.7rem] text-muted-foreground">AI Voice · Demo</p>
                  {scenario.lang && (
                    <span className="text-[0.6rem] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded-full bg-[#EEEDFE] text-[#534AB7]">
                      {scenario.lang}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-end gap-[2.5px] shrink-0" style={{ height: 18 }}>
                {[0,1,2,3].map(i => (
                  <div key={i} className="w-[3px] rounded-full"
                    style={{ height: playing ? `${Math.min(Math.max(bars[i*4]*0.48,3),18)}px` : `${[8,14,10,16][i]}px`,
                      background: "#534AB7", opacity: playing ? 0.9 : 0.35, transition: "height 80ms ease" }} />
                ))}
              </div>
            </div>
            {/* Row 2 — progress */}
            <div className="px-4 mb-0.5">
              <div className="relative h-[3px] rounded-full bg-[#E8E7F8]">
                <div className="absolute inset-y-0 left-0 rounded-full"
                  style={{ width: `${progress * 100}%`,
                    background: "linear-gradient(90deg,#2d2175,#534AB7)",
                    transition: "width 80ms linear" }} />
              </div>
              <div className="flex justify-between text-[10px] mt-1 text-muted-foreground">
                <span>{fmtSecs(elapsedSec)}</span>
                <span>-{fmtSecs(Math.max(0, durSecs - elapsedSec))}</span>
              </div>
            </div>
            {/* Row 3 — controls */}
            <div className="flex items-center justify-center gap-8 pb-4 pt-1">
              <button onClick={() => handleScenario((activeIdx - 1 + scenarios.length) % scenarios.length)}
                className="text-[#534AB7]/40 hover:text-[#534AB7] transition-colors active:scale-90">
                <svg viewBox="0 0 512 512" className="w-5 h-5 fill-current"><path d="M459.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4L288 214.3V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160C27.1 237.2 24 246.2 24 256s3.1 18.8 9.5 24.2l192 160c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V297.7L459.5 440.6z"/></svg>
              </button>
              <button onClick={togglePlay}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-90 hover:scale-105"
                style={{ background: "linear-gradient(135deg,#534AB7,#3D33A5)", boxShadow: "0 6px 20px -4px rgba(83,74,183,0.5)" }}>
                {playing
                  ? <svg className="w-[16px] h-[16px]" viewBox="0 0 320 512" fill="white"><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>
                  : <svg className="w-[16px] h-[16px] ml-0.5" viewBox="0 0 384 512" fill="white"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
                }
              </button>
              <button onClick={() => handleScenario((activeIdx + 1) % scenarios.length)}
                className="text-[#534AB7]/40 hover:text-[#534AB7] transition-colors active:scale-90">
                <svg viewBox="0 0 512 512" className="w-5 h-5 fill-current"><path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4L224 214.3V96c0-12.4 7.2-23.7 18.4-29s24.5-3.6 34.1 4.4l192 160c6.4 5.4 9.5 14.4 9.5 24.2s-3.1 18.8-9.5 24.2l-192 160c-9.5 7.9-22.8 9.7-34.1 4.4s-18.4-16.6-18.4-29V297.7L52.5 440.6z"/></svg>
              </button>
            </div>
          </div>

          {/* AI response */}
          <div className="rounded-xl px-4 py-3 bg-white border border-border/60">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">AI Response</p>
            <p className="text-[12px] leading-relaxed text-foreground/75 italic">
              "{scenario.aiResponse}"
            </p>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes dBounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-5px)}}
        .transcript-scroll::-webkit-scrollbar{width:4px}
        .transcript-scroll::-webkit-scrollbar-track{background:transparent}
        .transcript-scroll::-webkit-scrollbar-thumb{background:#D4D2F0;border-radius:99px}
        .transcript-scroll::-webkit-scrollbar-thumb:hover{background:#9B96E0}
        .hiw-pipeline::-webkit-scrollbar{width:4px}
        .hiw-pipeline::-webkit-scrollbar-track{background:transparent}
        .hiw-pipeline::-webkit-scrollbar-thumb{background:#D4D2F0;border-radius:99px}
        .hiw-pipeline::-webkit-scrollbar-thumb:hover{background:#9B96E0}
      `}</style>
    </div>
  );
}

/* ─── How it works — interactive call simulation ─────────── */
type CallStatus  = "idle" | "ringing" | "live" | "resolved";
type StageStatus = "idle" | "active" | "processing" | "done";

interface SimTool    { label: string; icon: string }
interface SimAction  { icon: string; label: string; val: string }
interface SimLog     { t: string; dot: "pur" | "grn" | "amb"; text: string }
interface SimOutcome { icon: string; label: string; val: string }
interface SimScene {
  caller: string; num: string; av: string;
  callerMsg: string;
  intents: string[];
  tools: SimTool[];
  aiReply: string;
  actions: SimAction[];
  logLines: SimLog[];
  outcomes: SimOutcome[];
}

const RE_SCENES: SimScene[] = [
  {
    caller: "Ravi Shah", num: "+91 98765 43210", av: "RS",
    callerMsg: "Hi, I saw a 3BHK listing on your site in Bandra West — is it still available, and what's the asking price?",
    intents: ["Property inquiry", "3BHK · Bandra West", "Positive", "English", "Normal"],
    tools: [
      { label: "listing_search()", icon: "Database" },
      { label: "price_lookup()",   icon: "Tag" },
      { label: "crm_lookup()",     icon: "Search" },
    ],
    aiReply: "Yes, the 3BHK in Bandra West is still available! It's ₹1.2 Cr for 1,450 sq ft with parking. Would you like to schedule a viewing?",
    actions: [
      { icon: "Database", label: "Listing fetched",    val: "3BHK · Bandra West · ₹1.2Cr" },
      { icon: "UserPlus", label: "Lead created",       val: "CRM · Ravi Shah" },
      { icon: "FileText", label: "Transcript saved",   val: "Full call recorded" },
      { icon: "Bell",     label: "Agent notified",     val: "Slack alert sent" },
    ],
    logLines: [
      { t: "0:01", dot: "pur", text: "Call answered by AI agent" },
      { t: "0:03", dot: "pur", text: "Intent detected: property inquiry" },
      { t: "0:04", dot: "amb", text: "listing_search() called → 1 result" },
      { t: "0:04", dot: "amb", text: "crm_lookup() → new lead" },
      { t: "0:06", dot: "pur", text: "Response generated + spoken" },
      { t: "0:09", dot: "grn", text: "Lead logged in CRM · agent notified" },
    ],
    outcomes: [
      { icon: "PhoneCall",  label: "Call answered", val: "< 2s" },
      { icon: "UserCheck",  label: "Lead captured",  val: "CRM updated" },
      { icon: "Star",       label: "CSAT",           val: "4.9 / 5" },
      { icon: "Clock",      label: "Handle time",    val: "1m 12s" },
    ],
  },
  {
    caller: "Priya Mehta", num: "+91 90000 11223", av: "PM",
    callerMsg: "I'd like to book a viewing for the sea-facing 2BHK in Worli. Can you check Saturday morning?",
    intents: ["Booking intent", "2BHK · Worli · Sat", "Positive", "English", "High"],
    tools: [
      { label: "calendar_check()", icon: "CalendarDays" },
      { label: "slot_book()",      icon: "CalendarCheck" },
      { label: "sms_send()",       icon: "MessageSquare" },
    ],
    aiReply: "Saturday 11 AM is available for the Worli 2BHK. I've booked it for you and sent a confirmation SMS with the address.",
    actions: [
      { icon: "CalendarCheck", label: "Slot booked",   val: "Sat · 11:00 AM · Worli" },
      { icon: "MessageSquare", label: "SMS sent",      val: "Confirmation to Priya" },
      { icon: "Database",      label: "CRM updated",   val: "Viewing scheduled" },
      { icon: "UserCheck",     label: "Agent assigned",val: "Amit K. notified" },
    ],
    logLines: [
      { t: "0:01", dot: "pur", text: "Call answered by AI agent" },
      { t: "0:03", dot: "pur", text: "Intent: viewing request — Worli 2BHK" },
      { t: "0:04", dot: "amb", text: "calendar_check() → Sat 11am free" },
      { t: "0:05", dot: "amb", text: "slot_book() → confirmed" },
      { t: "0:05", dot: "amb", text: "sms_send() → confirmation dispatched" },
      { t: "0:07", dot: "grn", text: "Viewing booked · agent notified" },
    ],
    outcomes: [
      { icon: "CalendarCheck", label: "Viewing booked", val: "Sat 11 AM" },
      { icon: "MessageSquare", label: "SMS sent",       val: "Confirmed" },
      { icon: "Star",          label: "CSAT",           val: "5.0 / 5" },
      { icon: "Clock",         label: "Handle time",    val: "0m 58s" },
    ],
  },
  {
    caller: "Ankit Desai", num: "+91 77711 88990", av: "AD",
    callerMsg: "I'm looking for a flat. Budget is around 60 lakhs. I want to move in within 2 months. Any options?",
    intents: ["Lead qualification", "Budget ₹60L · 2mo", "Positive", "English", "High urgency"],
    tools: [
      { label: "lead_score()",    icon: "BarChart2" },
      { label: "listing_match()", icon: "Search" },
      { label: "crm_create()",    icon: "UserPlus" },
      { label: "agent_alert()",   icon: "Bell" },
    ],
    aiReply: "Great! Based on your budget and timeline, I have 3 listings that could be a perfect fit. I've flagged your inquiry as high priority — our agent will call you within the hour.",
    actions: [
      { icon: "Flame",    label: "Lead scored",       val: "Hot · 94 / 100" },
      { icon: "Search",   label: "3 listings matched", val: "₹55–62L range" },
      { icon: "UserPlus", label: "Lead created",      val: "CRM · High priority" },
      { icon: "Bell",     label: "Agent alerted",     val: "Immediate callback" },
    ],
    logLines: [
      { t: "0:01", dot: "pur", text: "Call answered by AI agent" },
      { t: "0:03", dot: "pur", text: "Intent: lead qualification · budget ₹60L" },
      { t: "0:04", dot: "amb", text: "lead_score() → 94/100 hot lead" },
      { t: "0:04", dot: "amb", text: "listing_match() → 3 results" },
      { t: "0:05", dot: "amb", text: "crm_create() → lead saved" },
      { t: "0:06", dot: "grn", text: "Agent alerted · callback scheduled" },
    ],
    outcomes: [
      { icon: "Flame",      label: "Hot lead",          val: "Score 94/100" },
      { icon: "ListChecks", label: "Listings matched",  val: "3 properties" },
      { icon: "Star",       label: "CSAT",              val: "4.8 / 5" },
      { icon: "Clock",      label: "Handle time",       val: "1m 30s" },
    ],
  },
];

const STAGE_DEFS = [
  { icon: "PhoneIncoming", title: "Call received" },
  { icon: "Brain",         title: "Speech-to-text + NLP" },
  { icon: "Wrench",        title: "Tool routing" },
  { icon: "MessageSquare", title: "AI response generated" },
  { icon: "CheckCheck",    title: "Actions taken" },
  { icon: "BarChart2",     title: "Call logged + analytics" },
];

const INTENT_LABELS = ["Intent", "Entity", "Sentiment", "Language", "Urgency"];

function HowItWorks() {
  const [sceneIdx,   setSceneIdx]   = useState(0);
  const [running,    setRunning]    = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>("idle");
  const [waveH,      setWaveH]      = useState<number[]>(Array(12).fill(4));

  const [stStatus, setStStatus] = useState<StageStatus[]>(Array(6).fill("idle"));
  const [stBadge,  setStBadge]  = useState<string[]>(Array(6).fill("Waiting"));
  const [stOpen,   setStOpen]   = useState<boolean[]>(Array(6).fill(false));

  const [intentTags, setIntentTags] = useState<{ label: string; matched: boolean }[]>(
    INTENT_LABELS.map(l => ({ label: l, matched: false }))
  );
  const [toolChips, setToolChips] = useState<{ label: string; icon: string; state: "calling" | "called" }[]>([]);
  const [tr0,       setTr0]       = useState<{ who: "ai" | "caller"; text: string }[]>([]);
  const [tr3,       setTr3]       = useState<{ who: "ai" | "caller"; text: string }[]>([]);
  const [actions,   setActions]   = useState<SimAction[]>([]);
  const [logLines,  setLogLines]  = useState<SimLog[]>([]);
  const [outcomes,  setOutcomes]  = useState<SimOutcome[]>([]);

  const cancelRef   = useRef(false);
  const waveTimer   = useRef<ReturnType<typeof setInterval> | null>(null);
  const pipelineRef = useRef<HTMLDivElement>(null);
  const stageRefs   = useRef<(HTMLDivElement | null)[]>([]);

  const sleep = (ms: number) =>
    new Promise<void>(res => setTimeout(res, ms));

  function stopWave() {
    if (waveTimer.current) { clearInterval(waveTimer.current); waveTimer.current = null; }
    setWaveH(Array(12).fill(4));
  }

  function startWave() {
    stopWave();
    waveTimer.current = setInterval(() => {
      setWaveH(Array.from({ length: 12 }, () => 4 + Math.round(Math.random() * 22)));
    }, 130);
  }

  function hardReset() {
    stopWave();
    setCallStatus("idle");
    setStStatus(Array(6).fill("idle"));
    setStBadge(Array(6).fill("Waiting"));
    setStOpen(Array(6).fill(false));
    setActiveStageIdx(-1);
    setIntentTags(INTENT_LABELS.map(l => ({ label: l, matched: false })));
    setToolChips([]);
    setTr0([]); setTr3([]);
    setActions([]); setLogLines([]); setOutcomes([]);
    if (pipelineRef.current) pipelineRef.current.scrollTo({ top: 0, behavior: "smooth" });

  }

  const [activeStageIdx, setActiveStageIdx] = useState(-1);

  function activateStage(i: number) {
    setStStatus(s => { const n = [...s]; n[i] = "active"; return n; });
    setStBadge(s  => { const n = [...s]; n[i] = "Processing..."; return n; });
    setStOpen(s   => { const n = [...s]; n[i] = true; return n; });
    setActiveStageIdx(i);
  }

  // Keep the active stage fully in view at all times.
  // • If the header scrolls above the container → scroll up to pin it at top.
  // • If the bottom grows below the container (log lines, outcomes being added) → follow it down.
  // ResizeObserver fires for every pixel of growth so nothing ever gets clipped.
  useEffect(() => {
    if (activeStageIdx < 0) return;
    const container = pipelineRef.current;
    const el        = stageRefs.current[activeStageIdx];
    if (!container || !el) return;

    const doScroll = (isInitial = false) => {
      const cRect = container.getBoundingClientRect();
      const eRect = el.getBoundingClientRect();

      const headerAboveTop  = eRect.top  < cRect.top  - 4;
      const bottomBelowBase = eRect.bottom > cRect.bottom + 4;

      if (isInitial || headerAboveTop) {
        // Pin header to top of container
        const top = container.scrollTop + (eRect.top - cRect.top) - 10;
        container.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      } else if (bottomBelowBase) {
        // Follow new content growing at the bottom
        const top = container.scrollTop + (eRect.bottom - cRect.bottom) + 10;
        container.scrollTo({ top, behavior: "smooth" });
      }
    };

    // Anchor header immediately
    doScroll(true);

    // Track all size changes for the lifetime of this active stage
    const ro = new ResizeObserver(() => doScroll(false));
    ro.observe(el);

    return () => ro.disconnect();
  }, [activeStageIdx]);
  function processingStage(i: number, text: string) {
    setStStatus(s => { const n = [...s]; n[i] = "processing"; return n; });
    setStBadge(s  => { const n = [...s]; n[i] = text; return n; });
  }
  function doneStage(i: number, text: string) {
    setStStatus(s => { const n = [...s]; n[i] = "done"; return n; });
    setStBadge(s  => { const n = [...s]; n[i] = text; return n; });
  }

  async function startSim() {
    if (running) return;
    cancelRef.current = false;
    setRunning(true);
    hardReset();
    const s = RE_SCENES[sceneIdx];

    // ─ Ringing ─
    setCallStatus("ringing");
    await sleep(1300); if (cancelRef.current) return;

    // ─ Live ─
    setCallStatus("live");
    startWave();

    // Stage 0 — Call received
    activateStage(0);
    await sleep(600); if (cancelRef.current) return;
    processingStage(0, "Answering...");
    setTr0([{ who: "caller", text: s.callerMsg }]);
    await sleep(950); if (cancelRef.current) return;
    setTr0(t => [...t, { who: "ai", text: "Thank you for calling! Let me look into that for you right away." }]);
    doneStage(0, "Answered");
    await sleep(500); if (cancelRef.current) return;

    // Stage 1 — NLP
    activateStage(1);
    await sleep(500); if (cancelRef.current) return;
    processingStage(1, "Analysing...");
    for (let i = 0; i < s.intents.length; i++) {
      await sleep(260); if (cancelRef.current) return;
      const label = s.intents[i];
      setIntentTags(prev => {
        const n = [...prev];
        n[i] = { label, matched: true };
        return n;
      });
    }
    await sleep(400); if (cancelRef.current) return;
    doneStage(1, "Intent detected");
    await sleep(400); if (cancelRef.current) return;

    // Stage 2 — Tool routing
    activateStage(2);
    await sleep(400); if (cancelRef.current) return;
    processingStage(2, "Calling tools...");
    for (let i = 0; i < s.tools.length; i++) {
      await sleep(370); if (cancelRef.current) return;
      setToolChips(prev => [...prev, { ...s.tools[i], state: "calling" }]);
    }
    await sleep(700); if (cancelRef.current) return;
    setToolChips(prev => prev.map(c => ({ ...c, state: "called" })));
    doneStage(2, "Tools resolved");
    await sleep(400); if (cancelRef.current) return;

    // Stage 3 — AI response
    activateStage(3);
    await sleep(500); if (cancelRef.current) return;
    processingStage(3, "Generating...");
    await sleep(850); if (cancelRef.current) return;
    setTr3([{ who: "ai", text: s.aiReply }]);
    doneStage(3, "Response spoken");
    await sleep(400); if (cancelRef.current) return;

    // Stage 4 — Actions
    activateStage(4);
    await sleep(400); if (cancelRef.current) return;
    processingStage(4, "Executing...");
    for (let i = 0; i < s.actions.length; i++) {
      await sleep(370); if (cancelRef.current) return;
      setActions(prev => [...prev, s.actions[i]]);
    }
    doneStage(4, "All actions done");
    await sleep(400); if (cancelRef.current) return;

    // Stage 5 — Logging
    activateStage(5);
    await sleep(400); if (cancelRef.current) return;
    processingStage(5, "Logging...");
    for (let i = 0; i < s.logLines.length; i++) {
      await sleep(310); if (cancelRef.current) return;
      setLogLines(prev => [...prev, s.logLines[i]]);
    }
    await sleep(400); if (cancelRef.current) return;
    setOutcomes(s.outcomes);
    doneStage(5, "Logged");

    // Resolved
    setCallStatus("resolved");
    stopWave();
    setRunning(false);
  }

  function resetSim() {
    cancelRef.current = true;
    setRunning(false);
    hardReset();
  }

  // Cleanup on unmount
  useEffect(() => () => { cancelRef.current = true; stopWave(); }, []);

  const scene  = RE_SCENES[sceneIdx];
  const isDone = callStatus === "resolved";
  const isLive = callStatus === "live";

  const statusLabel: Record<CallStatus, string> = {
    idle: "Idle", ringing: "Ringing...", live: "Live call", resolved: "Resolved",
  };
  const statusCls: Record<CallStatus, string> = {
    idle:     "bg-muted/60 text-muted-foreground",
    ringing:  "bg-[#FAEEDA] text-[#633806]",
    live:     "bg-[#E1F5EE] text-[#085041]",
    resolved: "bg-[#EEEDFE] text-[#3C3489]",
  };

  const stageBorderCls: Record<StageStatus, string> = {
    idle:       "border-border/50",
    active:     "border-[#7F77DD]",
    processing: "border-[#EF9F27]/60",
    done:       "border-[#1D9E75]/50",
  };
  const stageIconCls: Record<StageStatus, string> = {
    idle:       "bg-muted/50 text-muted-foreground",
    active:     "bg-[#EEEDFE] text-[#534AB7]",
    processing: "bg-[#FAEEDA] text-[#633806]",
    done:       "bg-[#E1F5EE] text-[#085041]",
  };
  const stageBadgeCls: Record<StageStatus, string> = {
    idle:       "bg-muted/60 text-muted-foreground",
    active:     "bg-[#EEEDFE] text-[#3C3489]",
    processing: "bg-[#FAEEDA] text-[#633806]",
    done:       "bg-[#E1F5EE] text-[#085041]",
  };

  return (
    <div>
      {/* Header */}
      <p className={cn(marketingEyebrowClass, "mb-4")}>How it works</p>
      <h2 className="text-balance text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl mb-3">
        From ring to resolution — live
      </h2>
      <p className="text-base leading-relaxed text-muted-foreground mb-8 max-w-xl">
        Watch the AI agent receive a call, understand intent, call tools, and take action in real time.
      </p>

      {/* Simulation grid */}
      <div className="grid grid-cols-1 sm:grid-cols-[188px_1fr] gap-3 items-start">

        {/* ── Left: phone + scenario ── */}
        <div className="flex sm:flex-col gap-3 flex-wrap" style={{ maxHeight: 520 }}>

          {/* Phone frame */}
          <div className="bg-muted/30 border border-border/60 rounded-2xl p-4 flex flex-col items-center gap-3 min-w-[160px] flex-1 sm:flex-none">
            <div className="w-12 h-1 bg-border/60 rounded-full" />

            <div className="w-12 h-12 rounded-full bg-[#EEEDFE] flex items-center justify-center text-base font-semibold text-[#3C3489]">
              {scene.av}
            </div>

            <div className="text-center">
              <p className="text-[13px] font-medium text-foreground">{scene.caller}</p>
              <p className="text-[11px] text-muted-foreground">{scene.num}</p>
            </div>

            <span className={cn("text-[11px] font-medium px-3 py-0.5 rounded-full transition-colors", statusCls[callStatus])}>
              {statusLabel[callStatus]}
            </span>

            {/* Waveform */}
            <div className="flex items-center gap-0.5 h-7 justify-center">
              {waveH.map((h, i) => (
                <div key={i} className="w-[3px] rounded-sm bg-[#AFA9EC]"
                  style={{ height: `${h}px`, transition: "height 130ms" }} />
              ))}
            </div>

            <button
              onClick={isDone ? resetSim : startSim}
              disabled={running && !isDone}
              className={cn(
                "w-full text-[12px] font-medium rounded-xl px-3 py-1.5 transition-colors",
                "bg-[#534AB7] text-white hover:bg-[#4338CA] disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {isDone ? (
                <><RotateCcw className="inline w-3 h-3 mr-1 -mt-px" />Run again</>
              ) : (
                <><PhoneIncoming className="inline w-3 h-3 mr-1 -mt-px" />Simulate call</>
              )}
            </button>

            {(running || isDone) && (
              <button onClick={resetSim}
                className="w-full text-[12px] text-muted-foreground border border-border/60 rounded-xl px-3 py-1.5 hover:bg-muted/40 transition-colors">
                <RotateCcw className="inline w-3 h-3 mr-1 -mt-px" />Reset
              </button>
            )}
          </div>

          {/* Scenario selector */}
          <div className="flex-1 sm:flex-none">
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-2">Scenario</p>
            <div className="flex flex-col gap-1.5">
              {RE_SCENES.map((sc, i) => (
                <button key={i} onClick={() => { if (!running) { setSceneIdx(i); hardReset(); } }}
                  disabled={running}
                  className={cn(
                    "text-[11px] px-3 py-1.5 rounded-full border text-left transition-all",
                    sceneIdx === i
                      ? "bg-[#EEEDFE] text-[#3C3489] border-[#AFA9EC] font-medium"
                      : "bg-background text-muted-foreground border-border/50 hover:bg-muted/40 disabled:opacity-50",
                  )}>
                  {sc.caller === "Ravi Shah"   ? "Property inquiry" :
                   sc.caller === "Priya Mehta" ? "Book a viewing"   : "Lead qualification"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: pipeline stages ── */}
        <div ref={pipelineRef}
          className="hiw-pipeline flex flex-col gap-2 overflow-y-auto pr-1"
          style={{ height: 520, scrollbarWidth: "thin", scrollbarColor: "#D4D2F0 transparent" }}>
          {STAGE_DEFS.map((def, i) => {
            const st = stStatus[i];
            return (
              <div key={i}
                ref={el => { stageRefs.current[i] = el; }}
                className={cn(
                  "border rounded-xl overflow-hidden bg-background transition-colors duration-300 shrink-0",
                  stageBorderCls[st]
                )}>
                {/* Stage header */}
                <div className="flex items-center gap-2.5 px-3.5 py-2.5">
                  <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors", stageIconCls[st])}>
                    <Icon name={def.icon} className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[13px] font-medium text-foreground flex-1">{def.title}</span>
                  <span className={cn("text-[10px] font-medium px-2.5 py-0.5 rounded-full transition-colors", stageBadgeCls[st])}>
                    {stBadge[i]}
                  </span>
                </div>

                {/* Stage body — framer collapse */}
                <motion.div
                  initial={false}
                  animate={{ height: stOpen[i] ? "auto" : 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden">
                  <div className="px-3.5 pb-3 pt-0 space-y-2">

                    {/* Stage 0 & 3: transcript */}
                    {(i === 0 || i === 3) && (
                      <>
                        <p className="text-[12px] text-muted-foreground leading-[1.6]">
                          {i === 0
                            ? "Inbound call detected on your business number. AI agent answers within 2 seconds — no hold music."
                            : "Composes a natural, accurate reply using tool results — spoken back to the caller instantly."}
                        </p>
                        <div className="bg-muted/30 rounded-lg px-3 py-2.5 flex flex-col gap-2">
                          {(i === 0 ? tr0 : tr3).map((m, mi) => (
                            <div key={mi} className={cn("flex flex-col gap-0.5", m.who === "ai" && "items-end")}>
                              <span className={cn("text-[10px] font-medium text-muted-foreground", m.who === "ai" && "text-right")}>
                                {m.who === "ai" ? "AI agent" : "Caller"}
                              </span>
                              <div className={cn(
                                "text-[12px] px-2.5 py-1.5 rounded-lg leading-snug max-w-[90%]",
                                m.who === "ai"
                                  ? "bg-[#EEEDFE] text-[#26215C]"
                                  : "bg-background border border-border/60 text-foreground"
                              )}>
                                {m.text}
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {/* Stage 1: intent tags */}
                    {i === 1 && (
                      <>
                        <p className="text-[12px] text-muted-foreground leading-[1.6]">
                          Transcribes speech in real time, detects language, and extracts meaning from the conversation.
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {intentTags.map((tag, ti) => (
                            <span key={ti}
                              className={cn(
                                "text-[11px] px-2.5 py-0.5 rounded-full border transition-all",
                                tag.matched
                                  ? "bg-[#EEEDFE] text-[#3C3489] border-[#AFA9EC]"
                                  : "bg-muted/40 text-muted-foreground border-border/50"
                              )}>
                              {tag.label}
                            </span>
                          ))}
                        </div>
                      </>
                    )}

                    {/* Stage 2: tool chips */}
                    {i === 2 && (
                      <>
                        <p className="text-[12px] text-muted-foreground leading-[1.6]">
                          Based on detected intent, the agent selects and calls the right tools simultaneously.
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {toolChips.map((tc, ti) => (
                            <span key={ti}
                              className={cn(
                                "text-[11px] px-2.5 py-1 rounded-full border flex items-center gap-1 transition-all",
                                tc.state === "called"
                                  ? "bg-[#E1F5EE] text-[#085041] border-[#1D9E75]/40"
                                  : "bg-[#FAEEDA] text-[#633806] border-[#EF9F27]/40"
                              )}>
                              <Icon name={tc.icon} className="w-3 h-3" />
                              {tc.label}
                            </span>
                          ))}
                        </div>
                      </>
                    )}

                    {/* Stage 4: action cards */}
                    {i === 4 && (
                      <>
                        <p className="text-[12px] text-muted-foreground leading-[1.6]">
                          All downstream actions fire automatically — no human needed.
                        </p>
                        <div className="grid grid-cols-2 gap-1.5 mt-1">
                          {actions.map((a, ai) => (
                            <div key={ai} className="border border-border/50 rounded-lg px-2.5 py-2 flex gap-2 items-start">
                              <Icon name={a.icon} className="w-3.5 h-3.5 text-[#1D9E75] shrink-0 mt-0.5" />
                              <div>
                                <p className="text-[11px] font-medium text-foreground leading-tight">{a.label}</p>
                                <p className="text-[10px] text-muted-foreground leading-tight">{a.val}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {/* Stage 5: log + outcomes */}
                    {i === 5 && (
                      <>
                        <p className="text-[12px] text-muted-foreground leading-[1.6]">
                          Full transcript, sentiment score, and outcome recorded automatically in your dashboard.
                        </p>
                        {logLines.length > 0 && (
                          <div className="bg-muted/30 rounded-lg px-2.5 py-2 mt-1 space-y-1">
                            {logLines.map((l, li) => (
                              <div key={li} className="flex items-baseline gap-1.5">
                                <span className="text-[10px] text-muted-foreground min-w-[28px]">{l.t}</span>
                                <span className={cn("w-1.5 h-1.5 rounded-full shrink-0 mt-[3px]",
                                  l.dot === "pur" ? "bg-[#7F77DD]" :
                                  l.dot === "grn" ? "bg-[#1D9E75]" : "bg-[#EF9F27]"
                                )} />
                                <span className="text-[11px] text-muted-foreground">{l.text}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        {outcomes.length > 0 && (
                          <div className="grid grid-cols-4 gap-1.5 mt-2">
                            {outcomes.map((o, oi) => (
                              <div key={oi} className="bg-muted/30 rounded-lg p-2 text-center">
                                <Icon name={o.icon} className="w-4 h-4 text-[#534AB7] mx-auto mb-1" />
                                <p className="text-[10px] font-medium text-foreground leading-tight">{o.label}</p>
                                <p className="text-[10px] text-muted-foreground leading-tight">{o.val}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}

                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── Shared animation helpers ───────────────────────────── */
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

function FadeSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref  = useRef<HTMLDivElement>(null);
  const skip = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.12 });
  return (
    <motion.div ref={ref} variants={stagger}
      initial="hidden" animate={skip || inView ? "visible" : "hidden"}
      className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Separators / labels — site-matched ─────────────────── */
function Sep() { return <hr className="border-0 border-t border-border/40 my-12" />; }
function Eyebrow({ children }: { children: React.ReactNode }) {
  return <motion.p variants={fadeUp} className={cn(marketingEyebrowClass, "mb-4")}>{children}</motion.p>;
}
function SectionHead({ title, sub }: { title: React.ReactNode; sub: string }) {
  return (
    <>
      <motion.h2 variants={fadeUp}
        className="text-balance text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl mb-3">
        {title}
      </motion.h2>
      <motion.p variants={fadeUp} className="text-base leading-relaxed text-muted-foreground mb-8 max-w-xl">
        {sub}
      </motion.p>
    </>
  );
}

/* ─── Main ───────────────────────────────────────────────── */
export function IndustryPageSections({ content, industryName }: {
  content: IndustryPageContent;
  industryName: string;
}) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 pb-20 pt-8">

      {/* ── Headline + CTAs ── */}
      <FadeSection className="mb-10">
        <motion.h1 variants={fadeUp}
          className="text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.5rem] mb-4">
          {content.headline}{" "}
          <span className="text-[#534AB7]">{content.headlineHighlight}</span>
        </motion.h1>
        <motion.p variants={fadeUp}
          className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg max-w-xl mb-7">
          {content.subheadline}
        </motion.p>
        <motion.div variants={fadeUp} className="flex gap-3 flex-wrap">
          <Link href="/pricing"
            className="inline-flex items-center gap-2 rounded-full bg-[#534AB7] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#4338CA]">
            <Play className="w-3.5 h-3.5 fill-white" /> Hear a demo call
          </Link>
          <Link href="/pricing"
            className="inline-flex items-center rounded-full border border-border/70 px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/50">
            Start free trial
          </Link>
        </motion.div>
      </FadeSection>

      {/* ── Stats strip ── */}
      <FadeSection className="mb-12">
        <motion.div variants={stagger}
          className="grid grid-cols-2 sm:grid-cols-4 border border-border/60 rounded-2xl overflow-hidden divide-x divide-y sm:divide-y-0 divide-border/60">
          {content.stats.map((s, i) => (
            <motion.div key={i} variants={fadeUp} className="px-5 py-6 text-center bg-background">
              <p className="text-[2rem] font-semibold text-foreground leading-none mb-1">{s.value}</p>
              <p className="text-xs text-muted-foreground tracking-wide">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </FadeSection>

      <Sep />

      {/* ── How it works simulation ── */}
      <FadeSection className="mb-12">
        <HowItWorks />
      </FadeSection>

      <Sep />

      {/* ── Use cases ── */}
      <FadeSection>
        <Eyebrow>Use cases</Eyebrow>
        <SectionHead
          title="What the agent handles"
          sub="Every routine call — handled automatically, perfectly, every time."
        />
        <motion.div variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-2">
          {content.useCases.map((uc, i) => (
            <motion.div key={i} variants={fadeUp}
              className="border border-border/60 rounded-2xl p-5 bg-background hover:shadow-md transition-shadow group">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${uc.iconBg}`}>
                <Icon name={uc.icon} className={`w-5 h-5 ${uc.iconColor}`} />
              </div>
              <p className="text-sm font-semibold text-foreground mb-1.5">{uc.title}</p>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{uc.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </FadeSection>

      <Sep />

      {/* ── How it helps ── */}
      <FadeSection>
        <Eyebrow>How OnDial helps</Eyebrow>
        <SectionHead
          title={<>Built for <span className="text-[#534AB7]">{industryName.toLowerCase()}</span> teams</>}
          sub="From small teams to large operations — fits right into your workflow."
        />
        <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
          {content.benefits.map((b, i) => (
            <motion.div key={i} variants={fadeUp}
              className="flex gap-4 items-start p-5 border border-border/60 rounded-2xl bg-background hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-[#EEEDFE] flex items-center justify-center shrink-0 mt-0.5">
                <Icon name={b.icon} className="w-5 h-5 text-[#534AB7]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">{b.title}</p>
                <p className="text-[13px] text-muted-foreground leading-relaxed">{b.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </FadeSection>

      <Sep />

      {/* ── Outcomes ── */}
      <FadeSection>
        <Eyebrow>Outcomes</Eyebrow>
        <SectionHead
          title={<>Results {industryName.toLowerCase()} teams see</>}
          sub="Measured across 500+ businesses using OnDial."
        />
        <motion.div variants={stagger} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-2">
          {content.outcomes.map((o, i) => (
            <motion.div key={i} variants={fadeUp}
              className="bg-muted/30 border border-border/50 rounded-2xl p-6 text-center">
              <p className="text-[2.25rem] font-semibold text-foreground leading-none mb-1.5">{o.value}</p>
              <p className="text-sm font-medium text-foreground mb-0.5">{o.label}</p>
              <p className="text-xs text-muted-foreground leading-snug">{o.sublabel}</p>
            </motion.div>
          ))}
        </motion.div>
      </FadeSection>

      <Sep />

      {/* ── Testimonial ── */}
      <FadeSection>
        <motion.div variants={fadeUp}
          className="relative border border-border/60 rounded-2xl p-7 bg-background mb-12 overflow-hidden">
          <span className="absolute -top-1 right-5 text-[72px] leading-none font-serif select-none pointer-events-none text-[#534AB7]/10">
            "
          </span>
          <p className="text-base text-foreground leading-[1.75] mb-6 relative z-10 max-w-2xl">
            {content.testimonial.quote}
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="w-10 h-10 rounded-full bg-[#EEEDFE] flex items-center justify-center text-sm font-semibold text-[#3C3489] shrink-0">
              {content.testimonial.initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground">{content.testimonial.name}</p>
              <p className="text-xs text-muted-foreground">{content.testimonial.role}</p>
            </div>
            <span className="ml-auto text-xs font-medium bg-[#E1F5EE] text-[#085041] px-3 py-1 rounded-full shrink-0">
              ✓ Verified customer
            </span>
          </div>
        </motion.div>
      </FadeSection>

      {/* ── CTA ── */}
      <FadeSection>
        {/*
          SVG clip-path definition — objectBoundingBox so it scales to any element size.
          Original viewBox: (10,5)→(490,156), Width=480, Height=151
          Normalised: X_n=(X-10)/480, Y_n=(Y-5)/151
        */}
        <svg width="0" height="0" className="absolute overflow-hidden" aria-hidden>
          <defs>
            <clipPath id="cta-clip" clipPathUnits="objectBoundingBox">
              <path d="
                M0,0.4305
                V0.0397
                Q0,0 0.0104,0
                H0.4479
                Q0.4583,0 0.4750,0.0530
                Q0.4813,0.0728 0.4917,0.0795
                H0.9896
                Q1,0.0795 1,0.1126
                V0.8808
                Q1,0.9073 0.9958,0.9139
                L0.9729,0.9735
                Q0.9646,1 0.9583,1
                H0.2313
                Q0.2250,1 0.2188,0.9801
                L0.2021,0.9404
                Q0.1958,0.9272 0.1875,0.9272
                H0.0125
                Q0,0.9272 0,0.8874
                Z
              " />
            </clipPath>
          </defs>
        </svg>

        {/* drop-shadow traces the clip shape (unlike box-shadow which ignores clip-path) */}
        <motion.div variants={fadeUp}>
          <div className="text-white"
            style={{
              background: "linear-gradient(135deg, #6259C9 0%, #534AB7 45%, #3D33A5 100%)",
              clipPath: "url(#cta-clip)",
            }}>
            {/* Inner content constrained to safe visible zone of the custom shape */}
            <div className="mx-auto max-w-xl text-center px-6 py-9">
              <p className="mb-3 inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-white/80">
                Get started
              </p>
              <h2 className="text-balance text-xl font-semibold leading-tight tracking-tight text-white sm:text-2xl mb-2.5">
                {content.ctaHeadline}
              </h2>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                {content.ctaSubheadline}
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                <Link href="/pricing"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-[#3D33A5] px-5 py-2 text-sm font-medium transition-opacity hover:opacity-90 shadow-sm">
                  <CalendarDays className="w-3.5 h-3.5" /> Book a live demo
                </Link>
                <Link href="/pricing"
                  className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20">
                  Start free trial
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </FadeSection>

    </div>
  );
}
