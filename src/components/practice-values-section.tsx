"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SectionTitleReveal } from "@/components/section-title-reveal";

/**
 * Practice process — Kora home “Phase” accordion
 * @see https://kora.framer.media/#top
 */

const FONT =
  '"Wanted Sans Variable", "Wanted Sans", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';

const CREAM = "#F5F5E9";
const INK = "#242424";
const MUTED = "#9A9A9A";
const ACCENT = "#5DC39B";
const WHITE = "#FFFFFA";
const easeOut = [0.22, 1, 0.36, 1] as const;

const GRAIN_OVERLAY = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const GRAIN_SOFT = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const PHASES = [
  {
    id: "01",
    title: "상속재산의 범위",
    body: "남아 있는 부동산과 예금뿐 아니라 생전 증여, 인출된 예금과 부동산 처분대금까지 확인합니다.",
    tags: "생전 증여 · 금융재산 조회 · 숨겨진 상속재산",
    image: "/images/practice/inheritance-scope.jpg",
    Icon: IconSearch,
  },
  {
    id: "02",
    title: "특별수익",
    body: "형제 중 누군가가 집이나 사업자금을 먼저 받았다면, 상속분을 미리 받은 재산인지 따져봅니다.",
    tags: "증여 부동산 · 주택자금 · 사업자금 · 혼인자금",
    image: "/images/practice/inheritance.png",
    Icon: IconDesign,
  },
  {
    id: "03",
    title: "기여분",
    body: "간병기간과 생활비·병원비, 재산관리 내역을 살펴 통상적인 도움을 넘어선 기여인지 확인합니다.",
    tags: "부모 부양 · 장기간 간병 · 병원비 · 재산관리",
    image: "/images/practice/contribution.jpg",
    Icon: IconBuild,
  },
  {
    id: "04",
    title: "유언과 유류분",
    body: "유언장이 법적으로 유효한지, 법이 보장하는 최소한의 상속분이 침해되지는 않았는지 살펴봅니다.",
    tags: "유언장 효력 · 유언무효 · 유류분 반환청구",
    image: "/images/practice/hero-bg.jpg",
    Icon: IconTransfer,
  },
] as const;

const VALUES_TITLE_LINE_1 = [{ text: "법정상속분만", color: INK }] as const;

const VALUES_TITLE_LINE_2 = [
  { text: "계산해서는", color: INK },
  { text: "알", color: MUTED },
  { text: "수", color: MUTED },
  { text: "없는", color: MUTED },
  { text: "몫.", color: MUTED },
] as const;

function IconSearch({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle
        cx="11"
        cy="11"
        r="6.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M16.2 16.2 21 21"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconDesign({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M4 19h16M7 16V8.5A2.5 2.5 0 0 1 9.5 6h5A2.5 2.5 0 0 1 17 8.5V16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M9 11h6M9 14h4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconBuild({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M4 20V10l8-5 8 5v10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M10 20v-6h4v6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconTransfer({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M7 8h11M15 4l4 4-4 4M17 16H6M9 12l-4 4 4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhaseTray({
  active,
  onSelect,
  reduceMotion,
}: {
  active: number;
  onSelect: (index: number) => void;
  reduceMotion: boolean | null;
}) {
  return (
    <div
      className="flex w-full flex-col gap-2.5 rounded-[28px] p-2.5 md:flex-row md:gap-3 md:rounded-[32px] md:p-3 md:min-h-[380px] xl:min-h-[420px]"
      style={{ backgroundColor: CREAM }}
    >
      {PHASES.map((phase, index) => {
        const isActive = active === index;
        const Icon = phase.Icon;

        return (
          <motion.button
            key={phase.id}
            type="button"
            layout
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    layout: {
                      type: "spring",
                      stiffness: 320,
                      damping: 34,
                      mass: 0.85,
                    },
                    backgroundColor: { duration: 0.25, ease: easeOut },
                  }
            }
            onMouseEnter={() => {
              if (reduceMotion) return;
              onSelect(index);
            }}
            onFocus={() => onSelect(index)}
            onClick={() => onSelect(index)}
            aria-pressed={isActive}
            className={`relative flex overflow-hidden rounded-[22px] text-left outline-none md:rounded-[26px] ${
              isActive
                ? "min-h-[280px] w-full md:min-h-0 md:flex-[2.5] md:min-w-0"
                : "min-h-[64px] w-full md:min-h-0 md:flex-[0.85] md:min-w-[84px] md:cursor-pointer"
            }`}
            style={{
              backgroundColor: isActive ? "transparent" : WHITE,
              color: isActive ? WHITE : INK,
            }}
          >
            {isActive ? (
              <div aria-hidden className="absolute inset-0 isolate overflow-hidden">
                <Image
                  src={phase.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 720px, 100vw"
                  quality={100}
                  unoptimized
                  className="object-cover object-center brightness-[0.88] saturate-[0.9]"
                />
                <span
                  className="pointer-events-none absolute inset-0 mix-blend-multiply"
                  style={{
                    opacity: 0.1,
                    backgroundImage: GRAIN_OVERLAY,
                    backgroundSize: "100px 100px",
                  }}
                />
                <span
                  className="pointer-events-none absolute inset-0 mix-blend-overlay"
                  style={{
                    opacity: 0.22,
                    backgroundImage: GRAIN_OVERLAY,
                    backgroundSize: "120px 120px",
                  }}
                />
                <span
                  className="pointer-events-none absolute inset-0 mix-blend-soft-light"
                  style={{
                    opacity: 0.14,
                    backgroundImage: GRAIN_SOFT,
                    backgroundSize: "80px 80px",
                  }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/82 via-black/45 to-black/20" />
              </div>
            ) : null}

            <AnimatePresence initial={false}>
              {!isActive ? (
                <motion.span
                  key={`closed-${phase.id}`}
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.18 }}
                  className="flex w-full items-center justify-between px-5 py-4 md:absolute md:inset-0 md:z-10 md:flex-col md:items-center md:justify-start md:gap-4 md:px-3 md:pt-6"
                >
                  <span className="text-[13px] font-bold tracking-[-0.03em] md:text-[14px]">
                    {phase.id}
                  </span>
                  <span className="text-[15px] font-semibold tracking-[-0.03em] md:hidden">
                    {phase.title}
                  </span>
                </motion.span>
              ) : null}
            </AnimatePresence>

            <AnimatePresence initial={false} mode="popLayout">
              {isActive ? (
                <motion.div
                  key={`open-${phase.id}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.32,
                    ease: easeOut,
                    delay: reduceMotion ? 0 : 0.05,
                  }}
                  className="relative z-10 isolate flex h-full w-full flex-col justify-between gap-8 p-6 [text-shadow:0_1px_3px_rgba(0,0,0,0.85),0_4px_20px_rgba(0,0,0,0.5)] md:p-7 xl:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-[13px] font-bold tracking-[-0.03em] text-white md:text-[14px]">
                      {phase.id}
                    </p>
                    <div className="flex items-center gap-1.5" aria-hidden>
                      {PHASES.map((_, dot) => (
                        <motion.span
                          key={dot}
                          className="size-1.5 rounded-full"
                          animate={{
                            backgroundColor:
                              dot === index
                                ? ACCENT
                                : "rgba(255,255,255,0.55)",
                            scale: dot === index ? 1.15 : 1,
                          }}
                          transition={{ duration: 0.2 }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="relative z-10 flex max-w-[34em] flex-col gap-3">
                    <Icon className="relative z-10 size-7 shrink-0 text-white md:size-8" />
                    <h3 className="relative z-10 text-[26px] leading-none font-bold tracking-[-0.04em] text-white md:text-[30px] xl:text-[34px]">
                      {phase.title}
                    </h3>
                    <p
                      className={`relative z-10 text-[14px] leading-[1.55] font-medium tracking-[-0.02em] break-keep text-white md:text-[15px] ${
                        phase.id === "04" ? "md:whitespace-nowrap" : ""
                      }`}
                    >
                      {phase.body}
                    </p>
                    <p className="text-[13px] leading-[1.5] font-semibold tracking-[-0.02em] break-keep text-white/75 md:text-[14px]">
                      {phase.tags}
                    </p>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}

export function PracticeValuesSection() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (inView) setActive(0);
  }, [inView]);

  const appear = (delay = 0) => ({
    initial: reduceMotion ? false : ({ opacity: 0, y: 16 } as const),
    animate:
      inView || reduceMotion
        ? ({ opacity: 1, y: 0 } as const)
        : ({ opacity: 0, y: 16 } as const),
    transition: {
      duration: reduceMotion ? 0 : 0.55,
      ease: easeOut,
      delay: reduceMotion ? 0 : delay,
    },
  });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#FCFCFA] px-5 pt-6 pb-16 md:px-10 md:pt-10 md:pb-[100px] xl:px-12 xl:pb-[120px]"
      style={{ fontFamily: FONT }}
      aria-labelledby="practice-values-heading"
    >
      <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-10 md:gap-12 xl:gap-14">
        <div className="flex max-w-[920px] flex-col gap-4 md:gap-5">
          <SectionTitleReveal
            id="practice-values-heading"
            lines={[VALUES_TITLE_LINE_1, VALUES_TITLE_LINE_2]}
            inView={inView}
            reduceMotion={reduceMotion}
            className="text-[clamp(32px,4.4vw,56px)] leading-[1.18] font-bold tracking-[-0.05em] break-keep will-change-[opacity,transform]"
            style={{ fontFamily: FONT }}
          />

          <motion.div
            {...appear(0.08)}
            className="flex max-w-[40em] flex-col gap-4 text-[17px] leading-[1.65] font-medium tracking-[-0.02em] break-keep md:gap-5 md:text-[20px] md:leading-[1.6] xl:text-[21px]"
            style={{ color: "#616161" }}
          >
            <p>
              같은 자녀라도 실제로 받게 되는 재산은 달라질 수 있습니다.
              <br />
              특정 자녀가 생전에 재산을 먼저 받았는지,
              <br />
              부모님을 오랫동안 부양하거나 재산관리를 도맡은 사람이 있는지,
              <br />
              유언으로 누군가의 몫이 지나치게 줄어들지는
              <br />
              않았는지에 따라 상속분을 다시 계산해야 하기 때문입니다.
            </p>
            <p>이로운은 남아 있는 재산만 나누지 않습니다.</p>
          </motion.div>
        </div>

        <motion.div {...appear(0.14)}>
          <PhaseTray
            active={active}
            onSelect={setActive}
            reduceMotion={reduceMotion}
          />
        </motion.div>
      </div>
    </section>
  );
}
