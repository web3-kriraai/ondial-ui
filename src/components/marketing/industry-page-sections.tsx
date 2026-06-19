"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { createNoise2D } from "simplex-noise";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import {
  PhoneIncoming, PhoneOutgoing, CalendarDays, Filter, BellRing, FileText, UserCheck,
  MessageSquare, Clock, Plug, Languages, BarChart2, Settings, Database,
  ShieldCheck, Play,
  Brain, Wrench, CheckCheck, UserPlus, Bell, Tag, Search,
  Flame, Star, RotateCcw, PhoneCall, ListChecks, CalendarCheck,
  ArrowRight,
} from "lucide-react";
import type { IndustryCallDirection, IndustryPageContent, IndustryDemoScenario } from "@/data/industry-hero-content";
import { useDemoSync } from "@/components/providers/demo-sync-context";
import { IndustryStatsBento } from "@/components/marketing/industry-stats-bento";
import { IndustryServicesCarousel } from "@/components/marketing/industry-services-carousel";
import { TextReveal } from "@/components/ui/text-reveal";
import { marketingEyebrowClass } from "@/config/marketing-layout";
import { cn } from "@/lib/utils";

/* ─── Icon resolver ──────────────────────────────────────── */
const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  PhoneIncoming, PhoneOutgoing, CalendarDays, Filter, BellRing, FileText, UserCheck,
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
      style={{
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 0.38s ease, transform 0.38s ease"
      }}>
      <p className="text-[10px] font-medium mb-1 text-muted-foreground">
        {isAI ? "AI Agent" : "Caller"}
      </p>
      <div className={`max-w-[82%] px-3.5 py-2.5 text-[13px] leading-relaxed ${isAI
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
  const [activeIdx, setActiveIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);   // 0-1 for simulated / derived for real audio
  const [currentTime, setCurrentTime] = useState(0);   // real audio seconds
  const [audioDur, setAudioDur] = useState(0);   // real audio duration
  const [started, setStarted] = useState(false);
  const [bars, setBars] = useState<number[]>(() => Array(64).fill(5));

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const barsTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const simTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef(0);
  const tickRef = useRef(0);
  const noiseRef = useRef(createNoise2D());
  const chatRef = useRef<HTMLDivElement>(null);
  const { inlinePlaying: ctxPlaying, setInlineDemo, setInlineBars, resetInlineDemo } = useDemoSync();

  const scenario = scenarios[activeIdx];
  const hasAudio = !!scenario.audioSrc;
  const totalMsgs = scenario.messages.length;

  /* Unified 0-1 progress used for all render decisions */
  const renderProgress = hasAudio && audioDur > 0 ? currentTime / audioDur : progress;

  /* Per-message start fractions based on character proportions */
  const msgChars = scenario.messages.map(m => m.text.length);
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
        audio.play().catch(() => { });
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

  const durSecs = hasAudio ? audioDur : parseDur(scenario.duration);
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
        <span className={`flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border ${playing
          ? "bg-[#E7F8F2] text-[#0E7A5A] border-[#A3E6CE]"
          : started
            ? "bg-[#FFF7ED] text-[#92400E] border-[#FCD5A2]"
            : "bg-muted text-muted-foreground border-border/60"
          }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${playing ? "bg-[#10B981] animate-pulse" : started ? "bg-[#F59E0B]" : "bg-muted-foreground/40"
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
                {[0, 1, 2].map(i => (
                  <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#534AB7]/40"
                    style={{ animation: `dBounce 1.2s infinite ${i * 0.2}s` }} />
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
                  className={`text-[12px] px-3.5 py-1 rounded-full border transition-all font-medium ${activeIdx === i
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
                style={{
                  width: 52, height: 52,
                  background: "linear-gradient(145deg,#2d2175 0%,#534AB7 100%)",
                  boxShadow: "0 4px 12px -3px rgba(83,74,183,0.4)"
                }}>
                {bars.slice(4, 22).map((h, i) => (
                  <div key={i} className="flex-1 rounded-full mx-px"
                    style={{
                      height: `${Math.min(Math.max(h * 0.68, 2), 28)}px`,
                      background: "rgba(255,255,255,0.9)",
                      opacity: playing ? 1 : 0.35,
                      transition: "height 80ms ease"
                    }} />
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
                {[0, 1, 2, 3].map(i => (
                  <div key={i} className="w-[3px] rounded-full"
                    style={{
                      height: playing ? `${Math.min(Math.max(bars[i * 4] * 0.48, 3), 18)}px` : `${[8, 14, 10, 16][i]}px`,
                      background: "#534AB7", opacity: playing ? 0.9 : 0.35, transition: "height 80ms ease"
                    }} />
                ))}
              </div>
            </div>
            {/* Row 2 — progress */}
            <div className="px-4 mb-0.5">
              <div className="relative h-[3px] rounded-full bg-[#E8E7F8]">
                <div className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    width: `${progress * 100}%`,
                    background: "linear-gradient(90deg,#2d2175,#534AB7)",
                    transition: "width 80ms linear"
                  }} />
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
                <svg viewBox="0 0 512 512" className="w-5 h-5 fill-current"><path d="M459.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4L288 214.3V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160C27.1 237.2 24 246.2 24 256s3.1 18.8 9.5 24.2l192 160c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V297.7L459.5 440.6z" /></svg>
              </button>
              <button onClick={togglePlay}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-90 hover:scale-105"
                style={{ background: "linear-gradient(135deg,#534AB7,#3D33A5)", boxShadow: "0 6px 20px -4px rgba(83,74,183,0.5)" }}>
                {playing
                  ? <svg className="w-[16px] h-[16px]" viewBox="0 0 320 512" fill="white"><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z" /></svg>
                  : <svg className="w-[16px] h-[16px] ml-0.5" viewBox="0 0 384 512" fill="white"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" /></svg>
                }
              </button>
              <button onClick={() => handleScenario((activeIdx + 1) % scenarios.length)}
                className="text-[#534AB7]/40 hover:text-[#534AB7] transition-colors active:scale-90">
                <svg viewBox="0 0 512 512" className="w-5 h-5 fill-current"><path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4L224 214.3V96c0-12.4 7.2-23.7 18.4-29s24.5-3.6 34.1 4.4l192 160c6.4 5.4 9.5 14.4 9.5 24.2s-3.1 18.8-9.5 24.2l-192 160c-9.5 7.9-22.8 9.7-34.1 4.4s-18.4-16.6-18.4-29V297.7L52.5 440.6z" /></svg>
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
type CallStatus = "idle" | "ringing" | "live" | "resolved";
type StageStatus = "idle" | "active" | "processing" | "done";

interface SimAction { icon: string; label: string; val: string }
interface SimLog { t: string; dot: "pur" | "grn" | "amb"; text: string }
interface SimOutcome { icon: string; label: string; val: string }

function firstCallerMessage(scenario: IndustryDemoScenario) {
  return scenario.messages.find((m) => m.from === "caller")?.text ?? "";
}

function getCallDirection(scenario: IndustryDemoScenario): IndustryCallDirection {
  if (scenario.callDirection) return scenario.callDirection;
  return scenario.messages[0]?.from === "ai" ? "outbound" : "inbound";
}

const CALL_COPY: Record<IndustryCallDirection, {
  stageTitle: string;
  stageIcon: string;
  stageDesc: string;
  processing: string;
  done: string;
  ringing: string;
  partyLabel: string;
  simulate: string;
}> = {
  inbound: {
    stageTitle: "Call received",
    stageIcon: "PhoneIncoming",
    stageDesc: "Inbound call detected on your business number. AI agent answers within 2 seconds — no hold music.",
    processing: "Answering...",
    done: "Answered",
    ringing: "Ringing...",
    partyLabel: "Caller",
    simulate: "Simulate call",
  },
  outbound: {
    stageTitle: "Outbound call placed",
    stageIcon: "PhoneOutgoing",
    stageDesc: "AI agent dials the customer from your campaign list. When they answer, the personalised opener plays instantly.",
    processing: "Connecting...",
    done: "Connected",
    ringing: "Dialing...",
    partyLabel: "Customer",
    simulate: "Simulate call",
  },
};

function cleanAiResponse(text: string) {
  return text.replace(/^["'`]+|["'`]+$/g, "").trim();
}

const STAGE_DEFS = [
  { icon: "PhoneIncoming", title: "Call received" },
  { icon: "Brain", title: "Speech-to-text + NLP" },
  { icon: "Wrench", title: "Tool routing" },
  { icon: "MessageSquare", title: "AI response generated" },
  { icon: "CheckCheck", title: "Actions taken" },
  { icon: "BarChart2", title: "Call logged + analytics" },
];

const INTENT_LABELS = ["Intent", "Entity", "Sentiment", "Language", "Urgency"];

function HowItWorks({ scenarios }: { scenarios: IndustryDemoScenario[] }) {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [running, setRunning] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>("idle");

  const idleWave = [4, 6, 10, 16, 22, 16, 10, 6, 4, 3, 4, 6];
  const [waveH, setWaveH] = useState<number[]>(idleWave);

  const [stStatus, setStStatus] = useState<StageStatus[]>(Array(6).fill("idle"));
  const [stBadge, setStBadge] = useState<string[]>(Array(6).fill("Waiting"));
  const [stOpen, setStOpen] = useState<boolean[]>(Array(6).fill(false));

  const [intentTags, setIntentTags] = useState<{ label: string; matched: boolean }[]>(
    INTENT_LABELS.map(l => ({ label: l, matched: false }))
  );
  const [toolChips, setToolChips] = useState<{ label: string; icon: string; state: "calling" | "called" }[]>([]);
  const [tr0, setTr0] = useState<{ who: "ai" | "caller"; text: string }[]>([]);
  const [tr3, setTr3] = useState<{ who: "ai" | "caller"; text: string }[]>([]);
  const [actions, setActions] = useState<SimAction[]>([]);
  const [logLines, setLogLines] = useState<SimLog[]>([]);
  const [outcomes, setOutcomes] = useState<SimOutcome[]>([]);
  const [revealedSlots, setRevealedSlots] = useState<string[]>([]);
  const [highlightedSlot, setHighlightedSlot] = useState<string | null>(null);
  const [identityRevealed, setIdentityRevealed] = useState(0);

  const cancelRef = useRef(false);
  const waveTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const pipelineRef = useRef<HTMLDivElement>(null);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const sleep = (ms: number) =>
    new Promise<void>(res => setTimeout(res, ms));

  function stopWave() {
    if (waveTimer.current) { clearInterval(waveTimer.current); waveTimer.current = null; }
    setWaveH(idleWave);
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
    setRevealedSlots([]);
    setHighlightedSlot(null);
    setIdentityRevealed(0);
    if (pipelineRef.current) pipelineRef.current.scrollTo({ top: 0, behavior: "smooth" });
  }

  const [activeStageIdx, setActiveStageIdx] = useState(-1);

  function activateStage(i: number) {
    setStStatus(s => { const n = [...s]; n[i] = "active"; return n; });
    setStBadge(s => { const n = [...s]; n[i] = "Processing..."; return n; });
    setStOpen(s => { const n = [...s]; n[i] = true; return n; });
    setActiveStageIdx(i);
  }

  // Keep the active stage fully in view at all times.
  useEffect(() => {
    if (activeStageIdx < 0) return;
    const container = pipelineRef.current;
    const el = stageRefs.current[activeStageIdx];
    if (!container || !el) return;

    const doScroll = (isInitial = false) => {
      const cRect = container.getBoundingClientRect();
      const eRect = el.getBoundingClientRect();

      const headerAboveTop = eRect.top < cRect.top - 4;
      const bottomBelowBase = eRect.bottom > cRect.bottom + 4;

      if (isInitial || headerAboveTop) {
        const top = container.scrollTop + (eRect.top - cRect.top) - 10;
        container.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      } else if (bottomBelowBase) {
        const top = container.scrollTop + (eRect.bottom - cRect.bottom) + 10;
        container.scrollTo({ top, behavior: "smooth" });
      }
    };

    doScroll(true);

    const ro = new ResizeObserver(() => doScroll(false));
    ro.observe(el);

    return () => ro.disconnect();
  }, [activeStageIdx]);

  function processingStage(i: number, text: string) {
    setStStatus(s => { const n = [...s]; n[i] = "processing"; return n; });
    setStBadge(s => { const n = [...s]; n[i] = text; return n; });
  }
  function doneStage(i: number, text: string) {
    setStStatus(s => { const n = [...s]; n[i] = "done"; return n; });
    setStBadge(s => { const n = [...s]; n[i] = text; return n; });
  }

  useEffect(() => {
    setSceneIdx(0);
    hardReset();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reset when industry scenarios change
  }, [scenarios]);

  async function startSim() {
    if (running || scenarios.length === 0) return;
    cancelRef.current = false;
    setRunning(true);
    hardReset();
    const s = scenarios[sceneIdx];
    const callCopy = CALL_COPY[getCallDirection(s)];

    setCallStatus("ringing");
    await sleep(1300); if (cancelRef.current) return;

    setCallStatus("live");
    startWave();

    activateStage(0);
    await sleep(600); if (cancelRef.current) return;
    processingStage(0, callCopy.processing);
    const opening = s.messages.slice(0, 2);
    if (opening.length > 0) {
      for (const msg of opening) {
        setTr0(prev => [...prev, { who: msg.from, text: msg.text }]);
        await sleep(650); if (cancelRef.current) return;
      }
    } else {
      setTr0([{ who: "caller", text: firstCallerMessage(s) }]);
    }
    doneStage(0, callCopy.done);
    await sleep(500); if (cancelRef.current) return;

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

    activateStage(2);
    await sleep(400); if (cancelRef.current) return;
    processingStage(2, "Calling tools...");
    for (let i = 0; i < s.tools.length; i++) {
      await sleep(370); if (cancelRef.current) return;
      setToolChips(prev => [...prev, { ...s.tools[i], state: "calling" }]);
    }
    await sleep(700); if (cancelRef.current) return;
    setToolChips(prev => prev.map(c => ({ ...c, state: "called" })));
    if (s.availableSlots?.length) {
      for (const slot of s.availableSlots) {
        await sleep(280); if (cancelRef.current) return;
        setRevealedSlots(prev => [...prev, slot]);
      }
    }
    doneStage(2, s.availableSlots?.length ? "Slots loaded" : "Tools resolved");
    await sleep(400); if (cancelRef.current) return;

    activateStage(3);
    await sleep(500); if (cancelRef.current) return;
    processingStage(3, "Generating...");
    // Conversation turns only — final resolution comes from aiResponse (avoids duplicate AI bubbles)
    let followUp = s.messages.slice(2);
    const lastTurn = followUp[followUp.length - 1];
    if (lastTurn?.from === "ai") {
      followUp = followUp.slice(0, -1);
    }
    for (let fi = 0; fi < followUp.length; fi++) {
      const msg = followUp[fi];
      await sleep(520); if (cancelRef.current) return;
      setTr3(prev => [...prev, { who: msg.from, text: msg.text }]);
      if (s.selectedSlot && msg.from === "caller" && fi === 1) {
        setHighlightedSlot(s.selectedSlot);
      }
      if (s.identityChecks?.length && msg.from === "caller") {
        const callerReplies = followUp.filter((m) => m.from === "caller");
        const replyIdx = callerReplies.indexOf(msg);
        if (replyIdx >= 0 && replyIdx < s.identityChecks.length) {
          setIdentityRevealed(replyIdx + 1);
        }
      }
    }
    if (s.identityChecks?.length) {
      setIdentityRevealed(s.identityChecks.length);
    }
    await sleep(450); if (cancelRef.current) return;
    const closing = cleanAiResponse(s.aiResponse);
    if (closing) {
      setTr3(prev => [...prev, { who: "ai", text: closing }]);
    }
    doneStage(3, "Response spoken");
    await sleep(400); if (cancelRef.current) return;

    activateStage(4);
    await sleep(400); if (cancelRef.current) return;
    processingStage(4, "Executing...");
    for (let i = 0; i < s.actions.length; i++) {
      await sleep(370); if (cancelRef.current) return;
      setActions(prev => [...prev, s.actions[i]]);
    }
    doneStage(4, "All actions done");
    await sleep(400); if (cancelRef.current) return;

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

    setCallStatus("resolved");
    stopWave();
    setRunning(false);
  }

  function resetSim() {
    cancelRef.current = true;
    setRunning(false);
    hardReset();
  }

  useEffect(() => () => { cancelRef.current = true; stopWave(); }, []);

  const scene = scenarios[sceneIdx] ?? null;
  const isDone = callStatus === "resolved";
  const isLive = callStatus === "live";
  const direction = scene ? getCallDirection(scene) : "inbound";
  const callCopy = CALL_COPY[direction];
  const SimPhoneIcon = direction === "outbound" ? PhoneOutgoing : PhoneIncoming;

  const statusLabel: Record<CallStatus, string> = {
    idle: "Idle",
    ringing: callCopy.ringing,
    live: "Live call",
    resolved: "Resolved",
  };
  const statusCls: Record<CallStatus, string> = {
    idle: "bg-muted/60 text-muted-foreground",
    ringing: "bg-[#FAEEDA] text-[#633806] animate-pulse",
    live: "bg-[#E1F5EE] text-[#085041]",
    resolved: "bg-[#EEEDFE] text-[#3C3489]",
  };

  const stageBorderCls: Record<StageStatus, string> = {
    idle: "border-border/50",
    active: "border-[#7F77DD] shadow-sm shadow-[#7F77DD]/10",
    processing: "border-[#EF9F27]/60 shadow-sm shadow-[#EF9F27]/10",
    done: "border-[#1D9E75]/50",
  };
  const stageIconCls: Record<StageStatus, string> = {
    idle: "bg-muted/50 text-muted-foreground",
    active: "bg-[#EEEDFE] text-[#534AB7] ring-2 ring-[#534AB7]/20",
    processing: "bg-[#FAEEDA] text-[#633806] ring-2 ring-[#EF9F27]/20",
    done: "bg-[#E1F5EE] text-[#085041] ring-2 ring-[#1D9E75]/20",
  };
  const stageBadgeCls: Record<StageStatus, string> = {
    idle: "bg-muted/60 text-muted-foreground",
    active: "bg-[#EEEDFE] text-[#3C3489]",
    processing: "bg-[#FAEEDA] text-[#633806] animate-pulse",
    done: "bg-[#E1F5EE] text-[#085041]",
  };

  if (!scene) return null;

  return (
    <div>
      {/* Header */}
      <p className={cn(marketingEyebrowClass, "mb-4")}>How it works</p>
      <h2 className="text-balance text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl mb-3">
        From ring to resolution — live
      </h2>
      <p className="text-base leading-relaxed text-muted-foreground mb-8 max-w-xl">
        Watch the AI agent handle inbound and outbound calls — understand intent, call tools, and take action in real time.
      </p>

      {/* Simulation grid */}
      <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-6 items-start">

        {/* ── Left: phone + scenario ── */}
        <div className="flex sm:flex-col gap-4 flex-wrap w-full">

          {/* Phone frame */}
          <div className="bg-white/80 dark:bg-card/85 backdrop-blur-sm border border-border/80 shadow-md rounded-[24px] p-4.5 flex flex-col items-center gap-3.5 min-w-[170px] flex-1 sm:flex-none">
            <div className="w-12 h-1 bg-border/80 rounded-full mb-0.5" />

            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#534AB7] to-[#8F87EC] flex items-center justify-center text-sm font-semibold text-white shadow-inner">
              {scene.av}
            </div>

            <div className="text-center">
              <p className="text-[13px] font-semibold text-foreground leading-snug">{scene.caller}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{scene.num}</p>
            </div>

            <span className={cn("text-[10px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full transition-colors", statusCls[callStatus])}>
              {statusLabel[callStatus]}
            </span>

            {/* Waveform */}
            <div className="flex items-center gap-0.75 h-7 justify-center px-2">
              {waveH.map((h, i) => (
                <div key={i} className="w-[3px] rounded-full bg-[#534AB7] transition-all"
                  style={{ height: `${h}px`, transitionDuration: "130ms" }} />
              ))}
            </div>

            <button
              onClick={isDone ? resetSim : startSim}
              disabled={running && !isDone}
              className={cn(
                "w-full text-[12px] font-semibold rounded-xl px-3 py-2 transition-all active:scale-[0.98]",
                isDone
                  ? "bg-muted hover:bg-muted/80 text-foreground border border-border"
                  : "bg-[#534AB7] text-white hover:bg-[#4338CA] shadow-sm shadow-[#534AB7]/20 disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {isDone ? (
                <><RotateCcw className="inline w-3 h-3 mr-1.5 -mt-px" />Run again</>
              ) : (
                <><SimPhoneIcon className="inline w-3.5 h-3.5 mr-1.5 -mt-px animate-bounce" />{callCopy.simulate}</>
              )}
            </button>

            {(running || isDone) && (
              <button onClick={resetSim}
                className="w-full text-[12px] font-medium text-muted-foreground border border-border/80 rounded-xl px-3 py-1.5 hover:bg-muted/40 transition-colors">
                <RotateCcw className="inline w-3 h-3 mr-1.5 -mt-px" />Reset
              </button>
            )}
          </div>

          {/* Scenario selector */}
          <div className="w-full flex-1 sm:flex-none">
            <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-muted-foreground mb-2 ml-1">Scenario</p>
            <div className="flex flex-col gap-1.5">
              {scenarios.map((sc, i) => (
                <button key={i} onClick={() => { if (!running) { setSceneIdx(i); hardReset(); } }}
                  disabled={running}
                  className={cn(
                    "text-[11px] px-4 py-2 rounded-xl border text-left transition-all duration-200",
                    sceneIdx === i
                      ? "bg-[#EEEDFE] text-[#3C3489] border-[#AFA9EC] font-semibold shadow-sm"
                      : "bg-white/60 hover:bg-white border-border/50 text-muted-foreground hover:text-foreground disabled:opacity-50",
                  )}>
                  {sc.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: pipeline stages ── */}
        <div className="relative w-full">
          {/* Vertical connecting line */}
          <div className="absolute left-[28px] top-6 bottom-6 w-[2px] bg-border/40 z-0 pointer-events-none" />

          <div ref={pipelineRef}
            className="hiw-pipeline flex flex-col gap-2.5 overflow-y-auto pr-1 relative z-10"
            style={{ maxHeight: 520, scrollbarWidth: "thin", scrollbarColor: "#D4D2F0 transparent" }}>
            {STAGE_DEFS.map((def, i) => {
              const st = stStatus[i];
              const stageTitle = i === 0 ? callCopy.stageTitle : def.title;
              const stageIcon = i === 0 ? callCopy.stageIcon : def.icon;
              return (
                <div key={i}
                  ref={el => { stageRefs.current[i] = el; }}
                  className={cn(
                    "border rounded-xl overflow-hidden bg-background/95 backdrop-blur-sm transition-all duration-300 shrink-0",
                    stageBorderCls[st]
                  )}>
                  {/* Stage header */}
                  <div className="flex items-center gap-2.5 px-3.5 py-2.5">
                    <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 bg-background", stageIconCls[st])}>
                      <Icon name={stageIcon} className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[13px] font-semibold text-foreground flex-1">{stageTitle}</span>
                    <span className={cn("text-[10px] font-semibold px-2.5 py-0.5 rounded-full transition-colors", stageBadgeCls[st])}>
                      {stBadge[i]}
                    </span>
                  </div>

                  {/* Stage body — framer collapse */}
                  <motion.div
                    initial={false}
                    animate={{ height: stOpen[i] ? "auto" : 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden">
                    <div className="px-3.5 pb-3.5 pt-0.5 space-y-2.5 pl-[48px]">

                      {/* Stage 0 & 3: transcript */}
                      {(i === 0 || i === 3) && (
                        <>
                          <p className="text-[12px] text-muted-foreground leading-[1.6]">
                            {i === 0
                              ? callCopy.stageDesc
                              : scene.identityChecks?.length
                                ? "Collects required patient ID, date of birth, or email — then delivers results or confirms the booking."
                                : scene.availableSlots?.length
                                  ? "Offers available slots, records the caller's choice, and verifies identity before booking."
                                  : "Composes a natural, accurate reply using tool results — spoken back to the caller instantly."}
                          </p>
                          {i === 3 && identityRevealed > 0 && scene.identityChecks && (
                            <div className="mb-2.5 space-y-1.5">
                              <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                                Verification collected
                              </p>
                              {scene.identityChecks.slice(0, identityRevealed).map((check, ci) => (
                                <div key={ci}
                                  className="flex items-center justify-between gap-3 text-[11px] bg-background border border-border/60 rounded-lg px-2.5 py-1.5">
                                  <span className="text-muted-foreground shrink-0">{check.field}</span>
                                  <span className="font-medium text-foreground text-right truncate">{check.value}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          {i === 3 && revealedSlots.length > 0 && (
                            <div className="mb-2.5">
                              <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
                                Slot selected
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                {revealedSlots.map((slot, si) => (
                                  <span key={si}
                                    className={cn(
                                      "text-[11px] px-2.5 py-1 rounded-lg border",
                                      highlightedSlot === slot
                                        ? "bg-[#E1F5EE] text-[#085041] border-[#1D9E75]/50 font-semibold"
                                        : "bg-muted/30 text-muted-foreground border-border/40 line-through opacity-50",
                                    )}>
                                    {slot}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          <div className="bg-muted/30 rounded-lg px-3 py-2.5 flex flex-col gap-2">
                            {(i === 0 ? tr0 : tr3).map((m, mi) => (
                              <div key={mi} className={cn("flex flex-col gap-0.5", m.who === "ai" && "items-end")}>
                                <span className={cn("text-[10px] font-medium text-muted-foreground", m.who === "ai" && "text-right")}>
                                  {m.who === "ai" ? "AI agent" : callCopy.partyLabel}
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
                                    ? "bg-[#EEEDFE] text-[#3C3489] border-[#AFA9EC] font-medium"
                                    : "bg-muted/40 text-muted-foreground border-border/50"
                                )}>
                                {tag.label}
                              </span>
                            ))}
                          </div>
                        </>
                      )}

                      {/* Stage 2: tool chips + available slots */}
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
                          {revealedSlots.length > 0 && (
                            <div className="mt-2.5">
                              <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
                                Available slots
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                {revealedSlots.map((slot, si) => (
                                  <span key={si}
                                    className={cn(
                                      "text-[11px] px-2.5 py-1 rounded-lg border transition-all",
                                      highlightedSlot === slot
                                        ? "bg-[#E1F5EE] text-[#085041] border-[#1D9E75]/50 font-semibold ring-1 ring-[#1D9E75]/30"
                                        : "bg-background text-foreground border-border/60",
                                    )}>
                                    {slot}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
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
                              <div key={ai} className="border border-border/50 rounded-lg px-2.5 py-2 flex gap-2 items-start bg-background">
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
                                <div key={oi} className="bg-muted/30 rounded-lg p-2 text-center border border-border/40">
                                  <Icon name={o.icon} className="w-4 h-4 text-[#534AB7] mx-auto mb-1" />
                                  <p className="text-[10px] font-medium text-foreground leading-tight">{o.label}</p>
                                  <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">{o.val}</p>
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
    </div>
  );
}

/* ─── Shared animation helpers ───────────────────────────── */
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const cardGridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.14 } },
};
const cardRevealVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.52, ease: EASE_OUT, staggerChildren: 0.05, delayChildren: 0.1 },
  },
};
const USE_CASE_SOFT_COLORS = [
  { iconBg: "bg-[#EEEDFE]", iconColor: "text-[#534AB7]" },
  { iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]" },
  { iconBg: "bg-[#FAEEDA]", iconColor: "text-[#633806]" },
  { iconBg: "bg-[#E6F1FB]", iconColor: "text-[#0C447C]" },
  { iconBg: "bg-[#FCEBEB]", iconColor: "text-[#A32D2D]" },
] as const;

/** Shared S-curve shape (300 × 340) — used on every outcome card */
const OUTCOME_SHAPE = {
  width: 300,
  height: 340,
  path: "M 176 10 L 254 10 A 36 36 0 0 1 290 46 L 290 74 A 36 36 0 0 1 254 110 L 140 110 L 140 110 L 140 46 A 36 36 0 0 1 176 10 Z M 46 100 L 140 100 L 140 100 L 140 240 L 140 240 L 46 240 A 36 36 0 0 1 10 204 L 10 136 A 36 36 0 0 1 46 100 Z M 140 220 L 254 220 A 36 36 0 0 1 290 256 L 290 294 A 36 36 0 0 1 254 330 L 176 330 A 36 36 0 0 1 140 294 L 140 220 L 140 220 Z M 140 64 C 140 91 132.8 100 104 100 H 140 Z M 140 146 C 140 119 147.2 110 176 110 H 140 Z M 140 184 C 140 211 147.2 220 176 220 H 140 Z M 140 276 C 140 249 132.8 240 104 240 H 140 Z",
  gradFrom: { x: 300, y: 0 },
  gradTo: { x: 0, y: 340 },
} as const;

/** Natural shape proportions — avoids horizontal squash */
const OUTCOME_CARD_ASPECT = "300 / 340";

const OUTCOME_STAT_SHADOW =
  "[text-shadow:0_1px_4px_rgba(255,255,255,0.95),0_0_18px_rgba(255,255,255,0.85),0_2px_8px_rgba(255,255,255,0.5)]";
const OUTCOME_BODY_SHADOW =
  "[text-shadow:0_1px_3px_rgba(255,255,255,0.95),0_0_14px_rgba(255,255,255,0.8)]";
const OUTCOME_SUB_SHADOW =
  "[text-shadow:0_1px_2px_rgba(255,255,255,0.9),0_0_10px_rgba(255,255,255,0.75)]";

const OUTCOME_CARD_THEMES = [
  {
    softBg: "#EEEDFE",
    accent: "text-[#4338CA]",
    stops: [
      { offset: "0%", color: "#4338CA" },
      { offset: "45%", color: "#7C75E0" },
      { offset: "78%", color: "#C7D2FE" },
      { offset: "100%", color: "#EEEDFE" },
    ],
  },
  {
    softBg: "#E1F5EE",
    accent: "text-[#064E3B]",
    stops: [
      { offset: "0%", color: "#064E3B" },
      { offset: "45%", color: "#1D9E75" },
      { offset: "78%", color: "#D1FAE5" },
      { offset: "100%", color: "#E1F5EE" },
    ],
  },
  {
    softBg: "#FAEEDA",
    accent: "text-[#78350F]",
    stops: [
      { offset: "0%", color: "#78350F" },
      { offset: "45%", color: "#C2710C" },
      { offset: "78%", color: "#FEF3C7" },
      { offset: "100%", color: "#FAEEDA" },
    ],
  },
  {
    softBg: "#E6F1FB",
    accent: "text-[#1E3A8A]",
    stops: [
      { offset: "0%", color: "#1E3A8A" },
      { offset: "45%", color: "#2563EB" },
      { offset: "78%", color: "#DBEAFE" },
      { offset: "100%", color: "#E6F1FB" },
    ],
  },
] as const;

const cardTextVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: EASE_OUT } },
};

function FadeSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
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

/* ─── Full-width dot background for industry page sections ─ */
function IndustryDotBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 text-foreground/15"
      style={{
        backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
        backgroundSize: "14px 14px",
        maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent), linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent), linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)",
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
      }}
    />
  );
}

/* ─── Separators / labels — site-matched ─────────────────── */
function Eyebrow({ children }: { children: React.ReactNode }) {
  if (typeof children === "string") {
    return (
      <TextReveal
        as="p"
        className={cn(marketingEyebrowClass, "mb-4")}
        delay={0}
        stagger={0.14}
        inViewAmount={0.45}
      >
        {children}
      </TextReveal>
    );
  }
  return <motion.p variants={fadeUp} className={cn(marketingEyebrowClass, "mb-4")}>{children}</motion.p>;
}
function SectionHead({ title, sub }: { title: React.ReactNode; sub: string }) {
  const headingClass =
    "text-balance text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl mb-3";
  const subClass = "text-base leading-relaxed text-muted-foreground mb-8 max-w-xl";

  return (
    <>
      {typeof title === "string" ? (
        <TextReveal as="h2" className={headingClass} delay={0.05} stagger={0.055} inViewAmount={0.35}>
          {title}
        </TextReveal>
      ) : (
        <motion.h2 variants={fadeUp} className={headingClass}>
          {title}
        </motion.h2>
      )}
      <TextReveal as="p" className={subClass} delay={0.2} stagger={0.028} inViewAmount={0.3}>
        {sub}
      </TextReveal>
    </>
  );
}

/* ─── Main ───────────────────────────────────────────────── */
export function IndustryPageSections({ content, industryName }: {
  content: IndustryPageContent;
  industryName: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const useCaseGridRef = useRef<HTMLDivElement>(null);
  const useCaseGridInView = useInView(useCaseGridRef, { once: true, amount: 0.08 });
  const showUseCaseCards = prefersReducedMotion || useCaseGridInView;

  return (
    <div className="relative isolate w-full min-w-0">
      <IndustryDotBackground />
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">

        {/* ── Headline + CTAs ── */}
        <FadeSection className="pt-12 sm:pt-16 pb-8">
          <TextReveal
            as="h1"
            className="text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.5rem] mb-4"
            delay={0.05}
            stagger={0.05}
            inViewAmount={0.4}
            segments={[
              { text: `${content.headline} ` },
              { text: content.headlineHighlight, className: "text-[#534AB7]" },
            ]}
          />
          <TextReveal
            as="p"
            className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg max-w-xl mb-7"
            delay={0.22}
            stagger={0.028}
            inViewAmount={0.35}
          >
            {content.subheadline}
          </TextReveal>
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

        {/* ── Stats bento ── */}
        <FadeSection className="pb-12 sm:pb-16">
          <IndustryStatsBento stats={content.stats} />
        </FadeSection>

        {/* ── How it works simulation ── */}
        <FadeSection className="py-12 sm:py-16">
          <HowItWorks scenarios={content.demoScenarios} />
        </FadeSection>

        {/* ── Use cases ── */}
        <FadeSection className="py-12 sm:py-16">
          {/*
          SVG clip-path for use-case card inner shape.
          Original path viewBox: x 50→370 (w=320), y 175→340 (h=165)
          Normalised: Xn=(x-50)/320  Yn=(y-175)/165
          Container must keep aspect-ratio 320/165 so curves aren't distorted.
        */}
          <svg width="0" height="0" aria-hidden className="absolute overflow-hidden">
            <defs>
              <clipPath id="uc-inner-clip" clipPathUnits="objectBoundingBox">
                <path d="M0,0.485 V0.121 Q0,0 0.0625,0 H0.719 Q0.781,0 0.781,0.103 V0.273 Q0.781,0.382 0.844,0.382 H0.953 Q1,0.382 1,0.473 V0.879 Q1,1 0.938,1 H0.059 Q0,1 0,0.879 Z" />
              </clipPath>
            </defs>
          </svg>

          <Eyebrow>Use cases</Eyebrow>
          <SectionHead
            title="What the agent handles"
            sub="Every routine call — handled automatically, perfectly, every time."
          />

          <motion.div
            ref={useCaseGridRef}
            variants={cardGridVariants}
            initial="hidden"
            animate={showUseCaseCards ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-4 justify-items-center"
          >
            {content.useCases.map((uc, i) => (
              <motion.div key={i} variants={cardRevealVariants}
                className="group relative w-full max-w-[340px] bg-white border border-border/60 rounded-2xl overflow-hidden hover:shadow-md transition-shadow px-3 pt-2.5 pb-4">

                <div className="relative w-full aspect-320/165">
                  <motion.div
                    variants={cardTextVariants}
                    className={cn("absolute inset-0", uc.iconBg)}
                    style={{ clipPath: "url(#uc-inner-clip)" }}
                  />

                  <motion.div variants={cardTextVariants} className="absolute top-2.5 right-3.5 z-20">
                    <Icon name={uc.icon} className={cn("w-6.5 h-6.5", uc.iconColor)} />
                  </motion.div>

                  <motion.div variants={cardTextVariants} className="absolute top-0.5 left-0.5 w-[72%] z-10 px-3 pt-2.5 pr-1">
                    <p className={cn("text-sm sm:text-[15px] mt-1 ml-1.5 font-semibold leading-tight", uc.iconColor)}>
                      {uc.title}
                    </p>
                  </motion.div>

                  <motion.div variants={cardTextVariants} className="absolute inset-x-0 bottom-0 top-[38%] z-10 px-3.5 pt-1.5 pb-3">
                    <p className="text-[12px] sm:text-[13px] text-foreground/70 leading-relaxed">
                      {uc.description}
                    </p>
                  </motion.div>
                </div>

              </motion.div>
            ))}
          </motion.div>
        </FadeSection>

        {/* ── How it helps ── */}
        <FadeSection className="py-12 sm:py-16">
          {/*
          Benefit card clip-path — viewBox 0→150 (w=150), 0→50 (h=50)
          Normalised: Xn=x/150  Yn=y/50
        */}
          <svg width="0" height="0" aria-hidden className="absolute overflow-hidden">
            <defs>
              <clipPath id="benefit-card-clip" clipPathUnits="objectBoundingBox">
                <path d="M0,0.8 V0.4 Q0,0.3 0.033,0.3 Q0.1,0.3 0.1,0.1 Q0.1,0 0.133,0 H0.933 Q1,0 1,0.2 V0.6 Q1,0.7 0.967,0.7 Q0.9,0.7 0.9,0.9 Q0.9,1 0.867,1 H0.067 Q0,1 0,0.8 Z" />
              </clipPath>
            </defs>
          </svg>

          <Eyebrow>How OnDial helps</Eyebrow>
          <SectionHead
            title={<>Built for <span className="text-[#534AB7]">{industryName.toLowerCase()}</span> teams</>}
            sub="From small teams to large operations — fits right into your workflow."
          />
          <motion.div variants={cardGridVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {content.benefits.map((b, i) => {
              const colors = USE_CASE_SOFT_COLORS[i % USE_CASE_SOFT_COLORS.length];
              return (
                <motion.div key={i} variants={cardRevealVariants}
                  className="group relative w-full bg-white border border-border/60 rounded-2xl overflow-hidden hover:shadow-md transition-shadow px-2.5 py-2.5">

                  <div className="relative w-full aspect-150/50">
                    <motion.div
                      variants={cardTextVariants}
                      className={cn("absolute inset-0", colors.iconBg)}
                      style={{ clipPath: "url(#benefit-card-clip)" }}
                    />

                    <motion.div variants={cardTextVariants} className="absolute top-2 left-2 z-20">
                      <Icon name={b.icon} className={cn("w-6.5 h-6.5", colors.iconColor)} />
                    </motion.div>
                    <motion.div variants={cardTextVariants} className="absolute bottom-0 right-0 bg-black w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full flex items-center justify-center z-20">

                      <ArrowRight className="w-4 h-4 text-white rotate-30" />
                    </motion.div>
                    <motion.div variants={cardTextVariants} className="absolute top-2 left-[18%] right-2 z-10">
                      <p className={cn("text-sm sm:text-[15px] font-semibold mt-1.5 leading-tight", colors.iconColor)}>
                        {b.title}
                      </p>
                    </motion.div>

                    <motion.div variants={cardTextVariants} className="absolute inset-x-2 bottom-2 top-[42%] z-10">
                      <p className="text-[12px] sm:text-[13px] text-foreground/70 px-3 leading-relaxed">
                        {b.description}
                      </p>
                    </motion.div>
                  </div>

                </motion.div>
              );
            })}
          </motion.div>
        </FadeSection>

        {/* ── Outcomes ── */}
        <FadeSection className="py-12 sm:py-16">
          <Eyebrow>Outcomes</Eyebrow>
          <SectionHead
            title={<>Results {industryName.toLowerCase()} teams see</>}
            sub="Measured across 500+ businesses using OnDial."
          />
          <motion.div variants={stagger} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {content.outcomes.map((o, i) => {
              const theme = OUTCOME_CARD_THEMES[i % OUTCOME_CARD_THEMES.length];
              const gradId = `outcome-grad-${i}`;
              return (
                <motion.div key={i} variants={fadeUp}
                  className="relative w-full min-h-[260px] sm:min-h-[300px] overflow-hidden rounded-2xl"
                  style={{ aspectRatio: OUTCOME_CARD_ASPECT, backgroundColor: theme.softBg }}>

                  <svg
                    viewBox={`0 0 ${OUTCOME_SHAPE.width} ${OUTCOME_SHAPE.height}`}
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="none"
                    shapeRendering="geometricPrecision"
                    aria-hidden
                  >
                    <defs>
                      <linearGradient
                        id={gradId}
                        gradientUnits="userSpaceOnUse"
                        x1={OUTCOME_SHAPE.gradFrom.x}
                        y1={OUTCOME_SHAPE.gradFrom.y}
                        x2={OUTCOME_SHAPE.gradTo.x}
                        y2={OUTCOME_SHAPE.gradTo.y}
                      >
                        {theme.stops.map((stop) => (
                          <stop key={stop.offset} offset={stop.offset} stopColor={stop.color} />
                        ))}
                      </linearGradient>
                    </defs>
                    <path d={OUTCOME_SHAPE.path} fill={`url(#${gradId})`} />
                  </svg>

                  <div className="relative z-10 h-full text-left">
                    <p className={cn(
                      "absolute top-4 left-4 sm:top-5 sm:left-5",
                      "text-[1.75rem] sm:text-[2.25rem] font-semibold leading-none tracking-tight",
                      theme.accent,
                      OUTCOME_STAT_SHADOW,
                    )}>
                      {o.value}
                    </p>
                    <div className="absolute inset-x-4 bottom-4 sm:inset-x-5 sm:bottom-5 space-y-1">
                      <p className={cn(
                        "text-xs sm:text-sm font-semibold text-foreground leading-snug",
                        OUTCOME_BODY_SHADOW,
                      )}>
                        {o.label}
                      </p>
                      <p className={cn(
                        "text-[11px] sm:text-xs text-foreground/70 leading-snug",
                        OUTCOME_SUB_SHADOW,
                      )}>
                        {o.sublabel}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </FadeSection>


        {/* ── Services — 3D clickable carousel ── */}
        <FadeSection className="py-12 sm:py-16">
          <Eyebrow>Services</Eyebrow>
          <SectionHead
            title={content.serviceHeadline}
            sub={content.serviceSubheadline}
          />
          <motion.div variants={fadeUp}>
            <IndustryServicesCarousel items={content.services} />
          </motion.div>
        </FadeSection>

        {/* ── Testimonial ── */}
        <FadeSection className="py-12 sm:py-16">
          <motion.div variants={fadeUp}
            className="relative border border-border/60 rounded-2xl p-7 bg-background overflow-hidden">
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
        <FadeSection className="py-12 sm:py-16">
          <motion.div variants={fadeUp}>
            {/* Outer white card frame */}
            <div className="rounded-[1.75rem] bg-white border border-border/60 shadow-lg p-2">
              {/* Inner purple gradient banner */}
              <div className="relative overflow-hidden rounded-2xl text-white"
                style={{ background: "linear-gradient(135deg, #6259C9 0%, #534AB7 50%, #3D33A5 100%)" }}>

                {/* Decorative blobs */}
                <span aria-hidden className="absolute -left-8 -top-8 w-36 h-36 rounded-full bg-white/10 blur-2xl" />
                <span aria-hidden className="absolute right-4 bottom-4 w-28 h-28 rounded-full bg-white/10 blur-xl" />
                <span aria-hidden className="absolute right-1/3 -top-6 w-20 h-20 rounded-full bg-white/[0.07]" />

                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 px-7 py-7">

                  {/* Left — badge + headline + sub */}
                  <div className="min-w-0">
                    <span className="inline-flex items-center gap-1.5 mb-3 rounded-full bg-white/15 border border-white/20 px-3 py-1 text-[0.6875rem] font-medium uppercase tracking-widest text-white/90">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A5F3C4] inline-block" />
                      Get started free
                    </span>
                    <h2 className="text-xl sm:text-2xl font-semibold leading-snug tracking-tight text-white mb-2 text-balance">
                      {content.ctaHeadline}
                    </h2>
                    <p className="text-sm text-white/70 leading-relaxed max-w-sm">
                      {content.ctaSubheadline}
                    </p>
                  </div>

                  {/* Right — buttons + social proof */}
                  <div className="flex flex-col items-start sm:items-end gap-4 shrink-0">
                    <div className="flex gap-2.5 flex-wrap">
                      <Link href="/pricing"
                        className="inline-flex items-center gap-2 rounded-full bg-white text-[#3D33A5] px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 shadow-sm whitespace-nowrap">
                        <CalendarDays className="w-3.5 h-3.5" /> Book a demo →
                      </Link>
                      <Link href="/pricing"
                        className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/20 whitespace-nowrap">
                        Start free trial
                      </Link>
                    </div>
                    {/* Social proof */}
                    <div className="flex items-center gap-2.5">
                      <div className="flex -space-x-2.5">
                        {[
                          "photo-1494790108377-be9c29b29330",
                          "photo-1507003211169-0a1dd7228f2d",
                          "photo-1438761681033-6461ffad8d80",
                          "photo-1500648767791-00dcc994a43e"
                        ].map((photoId, i) => (
                          <img
                            key={i}
                            src={`https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=64&h=64&q=80`}
                            alt="Customer Avatar"
                            className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm"
                          />
                        ))}
                      </div>
                      <p className="text-[11px] text-white/75 leading-tight">
                        <span className="font-semibold text-white">500+</span> businesses trust OnDial
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </motion.div>
        </FadeSection>

      </div>
    </div>
  );
}
