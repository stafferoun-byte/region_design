"use client";

import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";

const FONT_WANTED =
  '"Wanted Sans Variable", "Wanted Sans", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';

const EROUN_GREEN = "#5DC39B";

/** Max axis value for bar widths (14M) */
const AXIS_MAX = 14;
const WITH_VALUE = 14.2;
const WITHOUT_VALUE = 9.6;
const AXIS_TICKS = [0, 2, 4, 6, 8, 10, 12, 14] as const;

const easeOut = [0.22, 1, 0.36, 1] as const;

function ChartBar({
  label,
  valueLabel,
  widthPct,
  variant,
  delay,
  inView,
  reduceMotion,
}: {
  label: string;
  valueLabel: string;
  widthPct: number;
  variant: "with" | "without";
  delay: number;
  inView: boolean;
  reduceMotion: boolean | null;
}) {
  const isWith = variant === "with";

  return (
    <div className="relative w-full">
      <motion.div
        className={`flex h-[52px] items-center justify-between overflow-hidden rounded-full px-5 md:h-[58px] md:px-6 ${
          isWith ? "text-white" : "text-[#242424]"
        }`}
        style={{
          backgroundColor: isWith ? EROUN_GREEN : "#E8E8E3",
          width: `${widthPct}%`,
          originX: 0,
        }}
        initial={reduceMotion ? false : { scaleX: 0, opacity: 0.85 }}
        animate={
          inView || reduceMotion
            ? { scaleX: 1, opacity: 1 }
            : { scaleX: 0, opacity: 0.85 }
        }
        transition={{
          duration: reduceMotion ? 0 : 1.15,
          delay: reduceMotion ? 0 : delay,
          ease: easeOut,
        }}
      >
        <motion.span
          className="shrink-0 text-[14px] font-semibold tracking-[-0.03em] md:text-[15px]"
          style={{ fontFamily: FONT_WANTED }}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={inView || reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.45,
            delay: reduceMotion ? 0 : delay + 0.55,
            ease: "easeOut",
          }}
        >
          {label}
        </motion.span>
        <motion.span
          className="shrink-0 text-[14px] font-semibold tracking-[-0.03em] md:text-[15px]"
          style={{ fontFamily: FONT_WANTED }}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={inView || reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.45,
            delay: reduceMotion ? 0 : delay + 0.65,
            ease: "easeOut",
          }}
        >
          {valueLabel}
        </motion.span>
      </motion.div>
    </div>
  );
}

export function StatsSection() {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<HTMLDivElement | null>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.4 });
  const inView = useInView(chartRef, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();

  const withPct = Math.min(100, (WITH_VALUE / AXIS_MAX) * 100);
  const withoutPct = Math.min(100, (WITHOUT_VALUE / AXIS_MAX) * 100);

  const textReveal = (delay: number) =>
    reduceMotion
      ? {
          initial: false as const,
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 0 },
        }
      : {
          initial: { opacity: 0, y: 36, filter: "blur(12px)" },
          animate: headerInView
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 36, filter: "blur(12px)" },
          transition: {
            duration: 0.9,
            delay,
            ease: easeOut,
          },
        };

  const titleAnim = textReveal(0);
  const bodyAnim = textReveal(0.12);
  const noteAnim = textReveal(0.22);

  return (
    <section
      id="services"
      className="relative w-full bg-white px-5 py-20 md:px-8 md:py-28 lg:py-32"
      aria-label="Services"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 md:gap-16">
        {/* Header — Kora Services. (blur + rise reveal) */}
        <div
          ref={headerRef}
          className="flex max-w-[820px] flex-col gap-5 md:gap-6"
        >
          <motion.h2
            initial={titleAnim.initial}
            animate={titleAnim.animate}
            transition={titleAnim.transition}
            className="text-[clamp(40px,5.5vw,64px)] leading-[1.05] font-bold tracking-[-0.055em] text-[#181d27] will-change-[opacity,transform,filter]"
            style={{ fontFamily: FONT_WANTED }}
          >
            Services.
          </motion.h2>

          <motion.p
            initial={bodyAnim.initial}
            animate={bodyAnim.animate}
            transition={bodyAnim.transition}
            className="text-[clamp(17px,1.9vw,22px)] leading-[1.45] font-semibold tracking-[-0.035em] text-[#242424] will-change-[opacity,transform,filter]"
            style={{ fontFamily: FONT_WANTED }}
          >
            Within six months of working with Eroun, clients experienced an{" "}
            <span style={{ color: EROUN_GREEN }}>
              average 47% increase in annual revenue
            </span>{" "}
            based on pre and post-engagement performance.
          </motion.p>

          <motion.p
            initial={noteAnim.initial}
            animate={noteAnim.animate}
            transition={noteAnim.transition}
            className="text-[13px] leading-[1.45] font-medium tracking-[-0.02em] text-[#9a9a9a] will-change-[opacity,transform,filter] md:text-[14px]"
            style={{ fontFamily: FONT_WANTED }}
          >
            *Across B2B clients with $5M to $50M in annual revenue over a
            standard 6-month engagement.
          </motion.p>
        </div>

        {/* Comparison chart */}
        <div ref={chartRef} className="relative w-full pt-2 md:pt-4">
          {/* Vertical grid lines */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 bottom-8 flex justify-between"
          >
            {AXIS_TICKS.map((tick) => (
              <div key={tick} className="relative flex h-full w-0 justify-center">
                <div className="h-full w-px bg-[#ececec]" />
              </div>
            ))}
          </div>

          <div className="relative flex flex-col gap-3 py-2 md:gap-3.5 md:py-3">
            <ChartBar
              label="With Eroun"
              valueLabel="$14.2M avg ARR"
              widthPct={withPct}
              variant="with"
              delay={0.05}
              inView={inView}
              reduceMotion={reduceMotion}
            />
            <ChartBar
              label="Without"
              valueLabel="$9.6M avg ARR"
              widthPct={withoutPct}
              variant="without"
              delay={0.18}
              inView={inView}
              reduceMotion={reduceMotion}
            />
          </div>

          {/* Axis labels */}
          <div className="relative mt-3 flex justify-between md:mt-4">
            {AXIS_TICKS.map((tick) => (
              <span
                key={tick}
                className="w-0 text-center text-[12px] font-medium tracking-[-0.02em] text-[#9a9a9a] md:text-[13px]"
                style={{ fontFamily: FONT_WANTED }}
              >
                <span className="inline-block -translate-x-1/2">{tick}M</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
