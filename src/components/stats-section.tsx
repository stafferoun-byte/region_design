"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useMemo, useRef } from "react";
import { SectionTitleReveal } from "@/components/section-title-reveal";

const FONT_WANTED =
  '"Wanted Sans Variable", "Wanted Sans", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';

const EROUN_GREEN = "#5DC39B";
const TEXT_DARK = "#292929";
const TEXT_MUTED = "#616161";
const BAR_GRAY = "#E6E6E6";
const LABEL_ON_GREEN = "#FFFFFA";
const SECTION_BG = "#FCFCFA";

const STATS_TITLE_LINE_1 = [
  { text: "편안하고", color: "#000000" },
  { text: "이로운", color: "#000000" },
  { text: "상담", color: "#000000" },
] as const;

const STATS_TITLE_LINE_2 = [
  { text: "결과는", color: "#000000" },
  { text: "단단하게.", color: "#000000" },
] as const;

const AXIS_TICKS = [0, 2, 4, 6, 8, 10, 12, 14] as const;
const WITH_WIDTH = "100%";
const WITHOUT_WIDTH = "66%";

const easeOut = [0.22, 1, 0.36, 1] as const;

type Segment = { text: string; tone: "muted" | "green" };

const BODY_SEGMENTS: Segment[] = [
  {
    text: "우리 앞의 ",
    tone: "muted",
  },
  {
    text: "의뢰인이 가족이라면,\n우리는 어떻게 권리와 평온한 일상",
    tone: "green",
  },
  {
    text: "을 지켜낼까.\n\n이로운 파트너스의 변론은 ㅡ\n언제나 이 질문에서 시작됩니다.",
    tone: "muted",
  },
];

function CharReveal({
  segments,
  inView,
  reduceMotion,
  className,
}: {
  segments: Segment[];
  inView: boolean;
  reduceMotion: boolean | null;
  className?: string;
}) {
  const chars = useMemo(() => {
    const out: { ch: string; tone: Segment["tone"]; key: string }[] = [];
    let i = 0;
    for (const seg of segments) {
      for (const ch of seg.text) {
        out.push({ ch, tone: seg.tone, key: `${i}-${ch}` });
        i += 1;
      }
    }
    return out;
  }, [segments]);

  const container: Variants = {
    hidden: {},
    show: {
      transition: reduceMotion
        ? { duration: 0 }
        : { staggerChildren: 0.012, delayChildren: 0.12 },
    },
  };

  const child: Variants = reduceMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        show: { opacity: 1, y: 0 },
      }
    : {
        hidden: { opacity: 0, y: 8 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, ease: easeOut },
        },
      };

  return (
    <motion.p
      className={className}
      style={{ fontFamily: FONT_WANTED }}
      variants={container}
      initial="hidden"
      animate={inView || reduceMotion ? "show" : "hidden"}
      aria-label={segments.map((s) => s.text).join("")}
    >
      {chars.map((c, idx) =>
        c.ch === "\n" ? (
          <br key={`${c.key}-${idx}`} />
        ) : c.ch === " " ? (
          <span key={`${c.key}-${idx}`}> </span>
        ) : (
          <motion.span
            key={`${c.key}-${idx}`}
            variants={child}
            className="inline-block will-change-[opacity,transform]"
            style={{
              color: c.tone === "green" ? EROUN_GREEN : TEXT_MUTED,
            }}
          >
            {c.ch}
          </motion.span>
        ),
      )}
    </motion.p>
  );
}

function ChartBar({
  label,
  valueLabel,
  width,
  variant,
  delay,
  inView,
  reduceMotion,
}: {
  label: string;
  valueLabel: string;
  width: string;
  variant: "with" | "without";
  delay: number;
  inView: boolean;
  reduceMotion: boolean | null;
}) {
  const isWith = variant === "with";
  const labelColor = isWith ? LABEL_ON_GREEN : TEXT_DARK;
  const show = inView || reduceMotion;

  return (
    <div className="relative w-full">
      <div
        className="relative z-[1] h-[72px] overflow-hidden md:h-[84px]"
        style={{ width }}
      >
        {/* Bar fill scales — keep labels outside so Wanted Sans isn’t distorted */}
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{
            backgroundColor: isWith ? EROUN_GREEN : BAR_GRAY,
            borderRadius: 18,
            transformOrigin: "left center",
          }}
          initial={reduceMotion ? false : { scaleX: 0 }}
          animate={show ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.95,
            delay: reduceMotion ? 0 : delay,
            ease: easeOut,
          }}
        />
        <motion.div
          className="relative z-[1] h-full"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={show ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.4,
            delay: reduceMotion ? 0 : delay + 0.45,
            ease: easeOut,
          }}
        >
          <span
            className="absolute bottom-3 left-[18px] shrink-0 text-[16px] leading-[1.4] font-bold tracking-[-0.03em] md:text-[18px]"
            style={{
              fontFamily: FONT_WANTED,
              color: labelColor,
            }}
          >
            {label}
          </span>
          <span
            className="absolute top-1/2 right-3 shrink-0 -translate-y-1/2 text-[30px] leading-none font-bold tracking-[-0.06em] md:right-4 md:text-[38px] md:tracking-[-0.07em]"
            style={{
              fontFamily: FONT_WANTED,
              color: labelColor,
            }}
          >
            {valueLabel}
          </span>
        </motion.div>
      </div>
    </div>
  );
}

/**
 * Stats content stays put (graph does not scrub).
 * Next section (Team green box) rises over this via sticky + document flow.
 */
export function StatsSection() {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<HTMLDivElement | null>(null);

  const headerInView = useInView(headerRef, {
    once: true,
    amount: 0.4,
    margin: "0px 0px -8% 0px",
  });
  const chartInView = useInView(chartRef, {
    once: true,
    amount: 0.35,
    margin: "0px 0px -10% 0px",
  });
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="services"
      className="relative w-full scroll-mt-[130px] bg-[#FCFCFA]"
      aria-label="Services"
      style={{ backgroundColor: SECTION_BG }}
    >
      <div className="flex min-h-svh w-full items-center px-5 pt-[100px] pb-[60px] md:px-10 md:pt-[140px] md:pb-[90px] xl:px-12 xl:pt-[180px] xl:pb-[120px]">
        <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-[30px] md:gap-[50px] xl:gap-20">
          <div ref={headerRef}>
            <SectionTitleReveal
              lines={[STATS_TITLE_LINE_1, STATS_TITLE_LINE_2]}
              inView={headerInView}
              reduceMotion={reduceMotion}
              className="text-[clamp(30px,3.8vw,48px)] leading-[1.28] font-bold tracking-[-0.05em] break-keep will-change-[opacity,transform]"
              style={{ fontFamily: FONT_WANTED }}
              ariaLabel="편안하고 이로운 상담 결과는 단단하게."
            />
          </div>

          <div className="flex w-full flex-col items-start gap-[30px] md:gap-[50px]">
            <div className="flex w-full max-w-[750px] flex-col gap-5">
              <CharReveal
                segments={BODY_SEGMENTS}
                inView={headerInView}
                reduceMotion={reduceMotion}
                className="text-[20px] leading-[1.3] font-semibold tracking-[-0.04em] md:text-[25px]"
              />
            </div>

            <div ref={chartRef} className="relative w-full px-[15px] py-10">
              <div className="relative w-full pt-12 pb-5">
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 bottom-[14px] z-0 overflow-visible"
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={
                    chartInView || reduceMotion
                      ? { opacity: 1 }
                      : { opacity: 0 }
                  }
                  transition={{
                    duration: reduceMotion ? 0 : 0.5,
                    delay: reduceMotion ? 0 : 0.2,
                    ease: easeOut,
                  }}
                >
                  <div
                    className="absolute right-0 bottom-0 left-0 border-b border-dashed"
                    style={{ borderColor: BAR_GRAY }}
                  />
                  <div className="absolute inset-0 flex justify-between">
                    {AXIS_TICKS.map((tick) => (
                      <div key={tick} className="relative h-full w-0">
                        <div
                          className="absolute inset-y-0 left-0 w-0 border-l border-dashed"
                          style={{ borderColor: BAR_GRAY }}
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>

                <div className="relative z-[1] flex flex-col gap-4">
                  <ChartBar
                    label="누적 사건처리 규모"
                    valueLabel="557,821,000원+"
                    width={WITH_WIDTH}
                    variant="with"
                    delay={0}
                    inView={chartInView}
                    reduceMotion={reduceMotion}
                  />
                  <ChartBar
                    label="누적 상담건수"
                    valueLabel="37,000건+"
                    width={WITHOUT_WIDTH}
                    variant="without"
                    delay={0.12}
                    inView={chartInView}
                    reduceMotion={reduceMotion}
                  />
                </div>

                <motion.div
                  className="absolute right-0 bottom-0 left-0 z-[1] flex h-5 items-end justify-between"
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={
                    chartInView || reduceMotion
                      ? { opacity: 1 }
                      : { opacity: 0 }
                  }
                  transition={{
                    duration: reduceMotion ? 0 : 0.5,
                    delay: reduceMotion ? 0 : 0.35,
                    ease: easeOut,
                  }}
                >
                  {AXIS_TICKS.map((tick) => (
                    <span
                      key={tick}
                      className="w-0 text-center text-[13px] leading-none font-semibold tracking-[-0.025em]"
                      style={{ fontFamily: FONT_WANTED, color: TEXT_MUTED }}
                    >
                      <span className="inline-block -translate-x-1/2">
                        {tick}M
                      </span>
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
