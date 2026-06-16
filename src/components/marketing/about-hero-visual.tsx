"use client";

import { Clock3, Globe2, MessageCircle, Mic, Phone } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState, type ElementType } from "react";

import { useLoaderComplete } from "@/components/providers/loader-context";
import {
  ABOUT_HERO_CONTENT,
  type AboutHeroConversationMessage,
  type AboutHeroHighlightId,
} from "@/data/about-hero-content";
import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;

const PAUSE_BETWEEN_MESSAGES_MS = 700;
const MS_PER_WORD = 260;
const WORD_FADE_IN_MS = 140;
const WORD_OPACITY_DURATION = 0.48;
const CONVERSATION_START_DELAY_MS = 300;

const highlightMeta: Record<
  AboutHeroHighlightId,
  { icon: ElementType; iconClass: string }
> = {
  availability: { icon: Clock3, iconClass: "bg-[#e1f5ee] text-[#085041]" },
  languages: { icon: Globe2, iconClass: "bg-[#e6f1fb] text-[#0c447c]" },
  human: {
    icon: MessageCircle,
    iconClass:
      "bg-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l)/0.12)] text-[hsl(var(--section-accent-h)_var(--section-accent-s)_calc(var(--section-accent-l)-18%))]",
  },
};

const frameVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

const chipVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeOut, delay: 0.2 + index * 0.08 },
  }),
};

const MESSAGE_ENTER_OFFSET = 20;

const messageEnterVariants: Variants = {
  hidden: (isCustomer: boolean) => ({
    opacity: 0,
    x: isCustomer ? -MESSAGE_ENTER_OFFSET : MESSAGE_ENTER_OFFSET,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.48, ease: easeOut },
  },
};

const customerSpeakGlow = [
  "0 0 0 2px rgb(12 68 124 / 0.18)",
  "0 0 0 4px rgb(12 68 124 / 0.08)",
  "0 0 0 2px rgb(12 68 124 / 0.18)",
];

const agentSpeakGlow = [
  "0 0 0 2px hsl(var(--section-accent-h) var(--section-accent-s) var(--section-accent-l) / 0.2)",
  "0 0 0 4px hsl(var(--section-accent-h) var(--section-accent-s) var(--section-accent-l) / 0.08)",
  "0 0 0 2px hsl(var(--section-accent-h) var(--section-accent-s) var(--section-accent-l) / 0.2)",
];

const customerBubbleGlow = [
  "0 0 0 1px rgb(12 68 124 / 0.08)",
  "0 0 0 2px rgb(12 68 124 / 0.14), 0 0 10px rgb(12 68 124 / 0.06)",
  "0 0 0 1px rgb(12 68 124 / 0.08)",
];

const agentBubbleGlow = [
  "0 0 0 1px hsl(var(--section-accent-h) var(--section-accent-s) var(--section-accent-l) / 0.1)",
  "0 0 0 2px hsl(var(--section-accent-h) var(--section-accent-s) var(--section-accent-l) / 0.18), 0 0 10px hsl(var(--section-accent-h) var(--section-accent-s) var(--section-accent-l) / 0.08)",
  "0 0 0 1px hsl(var(--section-accent-h) var(--section-accent-s) var(--section-accent-l) / 0.1)",
];

export function AboutHeroVisual() {
  const prefersReducedMotion = useReducedMotion();
  const isLoaderComplete = useLoaderComplete();
  const show = prefersReducedMotion || isLoaderComplete;
  const panel = ABOUT_HERO_CONTENT.platformPanel;
  const messages = panel.messages;

  const [activeIndex, setActiveIndex] = useState(0);
  const [conversationStarted, setConversationStarted] = useState(false);
  const [conversationSession, setConversationSession] = useState(0);
  const activeIndexRef = useRef(activeIndex);
  const startTimerRef = useRef<number | null>(null);
  const isFirstConversationStartRef = useRef(true);
  activeIndexRef.current = activeIndex;

  const beginConversation = useCallback(() => {
    if (startTimerRef.current !== null) {
      window.clearTimeout(startTimerRef.current);
      startTimerRef.current = null;
    }
    setConversationStarted(true);
  }, []);

  const scheduleConversationStart = useCallback(() => {
    if (startTimerRef.current !== null) {
      window.clearTimeout(startTimerRef.current);
      startTimerRef.current = null;
    }

    setConversationStarted(false);

    if (prefersReducedMotion) {
      isFirstConversationStartRef.current = false;
      beginConversation();
      return;
    }

    const delay = isFirstConversationStartRef.current ? CONVERSATION_START_DELAY_MS : 0;

    if (delay === 0) {
      beginConversation();
      return;
    }

    startTimerRef.current = window.setTimeout(() => {
      startTimerRef.current = null;
      isFirstConversationStartRef.current = false;
      beginConversation();
    }, delay);
  }, [beginConversation, prefersReducedMotion]);

  const resetConversation = useCallback(() => {
    setActiveIndex(0);
    setConversationSession((session) => session + 1);

    if (isFirstConversationStartRef.current) {
      scheduleConversationStart();
      return;
    }

    beginConversation();
  }, [beginConversation, scheduleConversationStart]);

  useEffect(() => {
    if (!show) {
      if (startTimerRef.current !== null) {
        window.clearTimeout(startTimerRef.current);
        startTimerRef.current = null;
      }
      setConversationStarted(false);
      setActiveIndex(0);
      return;
    }

    resetConversation();
  }, [show, resetConversation]);

  const handleWordsComplete = useCallback(
    (index: number) => {
      if (index !== activeIndexRef.current) return;

      const delay = prefersReducedMotion ? 250 : PAUSE_BETWEEN_MESSAGES_MS;
      window.setTimeout(() => {
        if (index !== activeIndexRef.current) return;

        if (index < messages.length - 1) {
          setActiveIndex(index + 1);
          return;
        }
        window.setTimeout(resetConversation, prefersReducedMotion ? 600 : 1800);
      }, delay);
    },
    [messages.length, prefersReducedMotion, resetConversation],
  );

  return (
    <div className="relative flex h-full min-w-0 w-full max-lg:h-154" aria-hidden>
      <div
        className="flex h-full min-w-0 w-full flex-col overflow-hidden rounded-2xl border border-black/8 bg-background shadow-[0_1px_2px_rgb(15_23_42/0.04),0_8px_24px_-12px_rgb(15_23_42/0.12)] sm:h-94 sm:rounded-[1.25rem]"
        style={{ height: "100%" }}
      >
        <div className="flex shrink-0 items-center gap-2 border-b border-black/6 bg-[color-mix(in_oklab,var(--muted)_35%,var(--background))] px-[0.85rem] py-[0.45rem]">
          <div className="flex shrink-0 items-center gap-[0.3rem]">
            <span className="h-[0.45rem] w-[0.45rem] rounded-full bg-[#ff5f57]" />
            <span className="h-[0.45rem] w-[0.45rem] rounded-full bg-[#febc2e]" />
            <span className="h-[0.45rem] w-[0.45rem] rounded-full bg-[#28c840]" />
          </div>
          <span className="min-w-0 flex-1 truncate text-[0.6875rem] font-semibold text-foreground">
            OnDial Voice Agent
          </span>
        </div>

        <header className="flex shrink-0 items-center justify-between gap-2 border-b border-black/6 px-[0.85rem] py-2 sm:px-4">
          <div className="flex min-w-0 items-center gap-[0.4rem]">
            <span className="h-[0.4rem] w-[0.4rem] shrink-0 rounded-full bg-[#085041] shadow-[0_0_0_3px_rgb(8_80_65/0.14)] motion-safe:animate-pulse motion-reduce:animate-none" />
            <span className="text-[0.5625rem] font-bold tracking-widest text-[#085041] uppercase">
              {panel.status}
            </span>
            <span className="h-[0.7rem] w-px shrink-0 bg-black/10" />
            <Phone className="h-3 w-3 shrink-0 text-muted-foreground" strokeWidth={1.75} />
            <span className="truncate text-xs font-semibold text-foreground">{panel.title}</span>
          </div>
          <span className="shrink-0 rounded-full border border-black/8 bg-background px-2 py-[0.2rem] text-[0.5625rem] font-semibold text-muted-foreground">
            {panel.metric}
          </span>
        </header>

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-3 py-[0.35rem] sm:px-4">
          <div className="flex h-full min-h-0 flex-col justify-start gap-[0.35rem] overflow-hidden p-[0.1rem]">
            {conversationStarted
              ? messages.slice(0, activeIndex + 1).map((message, index) => (
                  <ConversationMessage
                    key={`${message.id}-${conversationSession}`}
                    message={message}
                    callerName={panel.callerName}
                    isActive={index === activeIndex}
                    isSpoken={index < activeIndex}
                    prefersReducedMotion={prefersReducedMotion}
                    onWordsComplete={() => handleWordsComplete(index)}
                  />
                ))
              : null}
          </div>
        </div>

        <footer className="grid shrink-0 grid-cols-3 gap-[0.35rem] border-t border-black/6 px-[0.85rem] pt-[0.55rem] pb-[0.65rem] sm:px-4">
          {ABOUT_HERO_CONTENT.highlights.map((highlight) => {
            const { icon: Icon, iconClass } = highlightMeta[highlight.id];

            return (
              <div
                key={highlight.id}
                className="flex flex-col items-center gap-[0.2rem] rounded-[0.6rem] border border-black/6 bg-background p-[0.35rem_0.2rem] text-center"
              >
                <span
                  className={cn(
                    "mb-[0.2rem] grid h-8 w-8 place-items-center rounded-lg",
                    iconClass,
                  )}
                >
                  <Icon className="h-[1.2rem] w-[1.2rem]" strokeWidth={1.75} />
                </span>
                <span className="text-[0.825rem] leading-[1.1] font-bold text-foreground">
                  {highlight.value}
                </span>
                <span className="text-[0.575rem] leading-tight text-muted-foreground">
                  {highlight.label}
                </span>
              </div>
            );
          })}
        </footer>
      </div>
    </div>
  );
}

function ConversationMessage({
  message,
  callerName,
  isActive,
  isSpoken,
  prefersReducedMotion,
  onWordsComplete,
}: {
  message: AboutHeroConversationMessage;
  callerName: string;
  isActive: boolean;
  isSpoken: boolean;
  prefersReducedMotion: boolean | null;
  onWordsComplete: () => void;
}) {
  const isCustomer = message.role === "customer";
  const label = isCustomer ? callerName : "OnDial";
  const initial = isCustomer ? callerName.charAt(0) : "O";
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasEntered, setHasEntered] = useState(Boolean(prefersReducedMotion || isSpoken));

  useEffect(() => {
    if (isSpoken || prefersReducedMotion) {
      setHasEntered(true);
      return;
    }

    if (!isActive) {
      setHasEntered(false);
      return;
    }

    setHasEntered(false);

    const fallbackTimer = window.setTimeout(() => {
      setHasEntered(true);
    }, 520);

    return () => window.clearTimeout(fallbackTimer);
  }, [isActive, isSpoken, message.id, prefersReducedMotion]);

  const handleEnterComplete = useCallback(() => {
    if (isActive) {
      setHasEntered(true);
    }
  }, [isActive]);

  return (
    <motion.div
      className={cn(
        "flex min-w-0 max-w-full shrink-0 gap-[0.4rem]",
        isCustomer
          ? "w-fit self-start pr-[0.35rem]"
          : "flex-row-reverse self-end pl-[0.35rem]",
      )}
      custom={isCustomer}
      variants={messageEnterVariants}
      initial={prefersReducedMotion || isSpoken ? false : "hidden"}
      animate="visible"
      onAnimationComplete={handleEnterComplete}
    >
      <motion.div
        className={cn(
          "grid h-[1.35rem] w-[1.35rem] shrink-0 place-items-center rounded-full text-[0.5rem] font-bold transition-shadow duration-250 sm:h-6 sm:w-6 sm:text-[0.5625rem]",
          isCustomer
            ? "bg-[#e6f1fb] text-[#0c447c]"
            : "bg-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l)/0.14)] text-[hsl(var(--section-accent-h)_var(--section-accent-s)_calc(var(--section-accent-l)-18%))]",
        )}
        animate={
          isSpeaking && !prefersReducedMotion
            ? { boxShadow: isCustomer ? customerSpeakGlow : agentSpeakGlow }
            : { boxShadow: "0 0 0 0px transparent" }
        }
        transition={
          isSpeaking && !prefersReducedMotion
            ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.25 }
        }
      >
        {initial}
      </motion.div>

      <div
        className={cn(
          "flex min-w-0 max-w-[calc(100%-1.65rem)] flex-1 flex-col gap-[0.1rem]",
          !isCustomer && "items-end",
        )}
      >
        <span
          className={cn(
            "inline-flex items-center gap-1 text-[0.4375rem] font-bold tracking-[0.08em] text-muted-foreground uppercase sm:text-[0.5rem]",
            !isCustomer &&
              "text-[hsl(var(--section-accent-h)_var(--section-accent-s)_calc(var(--section-accent-l)-12%))]",
          )}
        >
          {label}
          {isSpeaking ? (
            <SpeakingDots isCustomer={isCustomer} prefersReducedMotion={prefersReducedMotion} />
          ) : null}
        </span>
        <motion.p
          className={cn(
            "m-0 rounded-[0.6rem] px-2 py-[0.3rem] text-[0.6875rem] leading-[1.4] wrap-break-word text-foreground sm:px-[0.55rem] sm:py-[0.35rem] sm:text-xs",
            isCustomer
              ? "rounded-tl-sm border border-black/8 bg-background"
              : "rounded-tr-sm border border-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l)/0.14)] bg-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l)/0.08)]",
            isSpeaking &&
              isCustomer &&
              "border-[rgb(12_68_124/0.22)]",
            isSpeaking &&
              !isCustomer &&
              "border-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l)/0.28)]",
          )}
          animate={
            isSpeaking && !prefersReducedMotion
              ? { boxShadow: isCustomer ? customerBubbleGlow : agentBubbleGlow }
              : { boxShadow: "0 0 0 0px transparent" }
          }
          transition={
            isSpeaking && !prefersReducedMotion
              ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.25 }
          }
        >
          <SpeakingWords
            text={message.text}
            isCustomer={isCustomer}
            isActive={isActive && hasEntered}
            isSpoken={isSpoken}
            prefersReducedMotion={prefersReducedMotion}
            onSpeakingChange={setIsSpeaking}
            onComplete={onWordsComplete}
          />
        </motion.p>
        {isSpeaking ? (
          <div
            className={cn(
              "mt-[0.12rem] inline-flex max-w-full items-center gap-[0.3rem] rounded-full py-[0.12rem] pr-[0.4rem] pl-[0.3rem]",
              isCustomer
                ? "self-start border border-[rgb(12_68_124/0.12)] bg-[rgb(12_68_124/0.08)]"
                : "self-end border border-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l)/0.14)] bg-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l)/0.1)]",
            )}
          >
            <Mic
              className={cn(
                "h-[0.55rem] w-[0.55rem] shrink-0 motion-safe:animate-pulse motion-reduce:animate-none",
                isCustomer
                  ? "text-[#0c447c]"
                  : "text-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l))]",
              )}
              strokeWidth={2.25}
              aria-hidden
            />
            <span
              className={cn(
                "text-[0.4375rem] font-bold tracking-[0.06em] whitespace-nowrap uppercase",
                isCustomer
                  ? "text-[#0c447c]"
                  : "text-[hsl(var(--section-accent-h)_var(--section-accent-s)_calc(var(--section-accent-l)-12%))]",
              )}
            >
              Speaking
            </span>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}

function SpeakingWords({
  text,
  isCustomer,
  isActive,
  isSpoken,
  prefersReducedMotion,
  onSpeakingChange,
  onComplete,
}: {
  text: string;
  isCustomer: boolean;
  isActive: boolean;
  isSpoken: boolean;
  prefersReducedMotion: boolean | null;
  onSpeakingChange: (speaking: boolean) => void;
  onComplete: () => void;
}) {
  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);
  const [litCount, setLitCount] = useState(isSpoken ? words.length : 0);
  const completedRef = useRef(false);
  const isActiveRef = useRef(isActive);
  const onCompleteRef = useRef(onComplete);
  const onSpeakingChangeRef = useRef(onSpeakingChange);

  isActiveRef.current = isActive;
  onCompleteRef.current = onComplete;
  onSpeakingChangeRef.current = onSpeakingChange;

  useEffect(() => {
    completedRef.current = false;

    if (isSpoken) {
      setLitCount(words.length);
      onSpeakingChangeRef.current(false);
      return;
    }

    if (!isActive) {
      setLitCount(0);
      onSpeakingChangeRef.current(false);
      return;
    }

    if (prefersReducedMotion) {
      setLitCount(words.length);
      onSpeakingChangeRef.current(false);
      if (!completedRef.current) {
        completedRef.current = true;
        onCompleteRef.current();
      }
      return;
    }

    setLitCount(0);
    onSpeakingChangeRef.current(false);
    let index = 0;
    const timers: number[] = [];

    const speakNext = () => {
      if (!isActiveRef.current) return;

      index += 1;
      setLitCount(index);

      if (index >= words.length) {
        onSpeakingChangeRef.current(false);
        if (!completedRef.current && isActiveRef.current) {
          completedRef.current = true;
          onCompleteRef.current();
        }
        return;
      }

      const word = words[index] ?? "";
      const delay = Math.max(MS_PER_WORD, word.length * 38);
      timers.push(window.setTimeout(speakNext, delay));
    };

    timers.push(
      window.setTimeout(() => {
        if (!isActiveRef.current) return;
        onSpeakingChangeRef.current(true);
        timers.push(window.setTimeout(speakNext, MS_PER_WORD * 0.75));
      }, WORD_FADE_IN_MS),
    );

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      onSpeakingChangeRef.current(false);
    };
  }, [isActive, isSpoken, prefersReducedMotion, words]);

  return (
    <>
      {words.map((word, index) => {
        const isPast = index < litCount;
        const isCurrent = isActive && index === litCount;
        const isPending = !isPast && !isCurrent;

        return (
          <span key={`${word}-${index}`}>
            <motion.span
              className={cn(
                "inline rounded-md transition-[background-color,box-shadow] duration-[0.38s] motion-reduce:transition-none",
                isPast && "text-foreground",
                isPending && "text-foreground",
                isCurrent &&
                  isCustomer &&
                  "bg-[#e6f1fb] text-foreground shadow-[0_0_0_1px_rgb(12_68_124/0.12)]",
                isCurrent &&
                  !isCustomer &&
                  "bg-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l)/0.18)] text-foreground shadow-[0_0_0_1px_hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l)/0.15)]",
              )}
              initial={false}
              animate={{ opacity: isPending ? 0.32 : 1 }}
              transition={{
                duration: prefersReducedMotion ? 0 : WORD_OPACITY_DURATION,
                ease: easeOut,
              }}
            >
              {word}
            </motion.span>
            {index < words.length - 1 ? " " : null}
          </span>
        );
      })}
    </>
  );
}

const DOT_DELAYS = [0, 0.15, 0.3] as const;

function SpeakingDots({
  isCustomer,
  prefersReducedMotion,
}: {
  isCustomer: boolean;
  prefersReducedMotion: boolean | null;
}) {
  return (
    <span className="inline-flex items-center gap-[0.1rem]" aria-hidden>
      {DOT_DELAYS.map((delay) => (
        <motion.span
          key={delay}
          className={cn(
            "h-[0.16rem] w-[0.16rem] rounded-full",
            isCustomer
              ? "bg-[#0c447c]"
              : "bg-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l))]",
          )}
          animate={
            prefersReducedMotion
              ? { y: 0, opacity: 1 }
              : { y: [0, -2, 0], opacity: [0.35, 1, 0.35] }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : {
                  duration: 1.1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay,
                  times: [0, 0.4, 1],
                }
          }
        />
      ))}
    </span>
  );
}

const WAVE_BAR_HEIGHTS = [0.35, 0.65, 1, 0.5, 0.85, 0.4, 0.75, 0.55, 0.9, 0.45, 0.7] as const;
