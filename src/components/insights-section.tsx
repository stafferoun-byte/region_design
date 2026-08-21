"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

/**
 * Insights — layout/tokens from Kora Insights
 * @see https://kora.framer.media/
 */

const FONT =
  '"Wanted Sans Variable", "Wanted Sans", "Manrope", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';

const INK = "#242424";
const MUTED = "#616161";
const LABEL = "#FAFAF7";
const DATE = "#E6E6E6";

const easeOut = [0.22, 1, 0.36, 1] as const;

type Insight = {
  id: string;
  href: string;
  category: string;
  date: string;
  datetime: string;
  title: string;
  image: string;
  icon: "monitor" | "target";
};

const INSIGHTS: Insight[] = [
  {
    id: "1",
    href: "#",
    category: "형사 절차",
    date: "2026. 3. 4.",
    datetime: "2026-03-04",
    title: "수사 초기, 진술 전에\n꼭 알아두어야 할 것들",
    image:
      "https://framerusercontent.com/images/ZUKAuHzqrTMon49eyQdZ9vuSDfY.jpeg",
    icon: "monitor",
  },
  {
    id: "2",
    href: "#",
    category: "이혼·가사",
    date: "2026. 3. 3.",
    datetime: "2026-03-03",
    title: "합의 이혼과 소송 이혼,\n선택이 갈리는 지점",
    image:
      "https://framerusercontent.com/images/IXWqaCHPbvPQKcyZ9Mch2cWh9hU.jpg",
    icon: "target",
  },
];

function CategoryIcon({ type }: { type: Insight["icon"] }) {
  if (type === "target") {
    return (
      <svg viewBox="0 0 24 24" className="size-3.5" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="8" stroke={INK} strokeWidth="2" />
        <circle cx="12" cy="12" r="3.5" stroke={INK} strokeWidth="2" />
        <circle cx="12" cy="12" r="1.2" fill={INK} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="size-3.5" fill="none" aria-hidden>
      <rect
        x="3"
        y="4"
        width="18"
        height="12"
        rx="2"
        stroke={INK}
        strokeWidth="2"
      />
      <path
        d="M8 20h8M12 16v4"
        stroke={INK}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function InsightCard({
  item,
  reduceMotion,
  delay,
}: {
  item: Insight;
  reduceMotion: boolean | null;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={item.href}
      className="group relative flex aspect-[3/4] w-full flex-col justify-between overflow-hidden rounded-[30px] p-5 no-underline md:p-[30px]"
      initial={
        reduceMotion ? false : { opacity: 0.001, y: 10, scale: 0.9 }
      }
      whileInView={
        reduceMotion
          ? undefined
          : { opacity: 1, y: 0, scale: 1 }
      }
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: reduceMotion ? 0 : 0.75,
        ease: easeOut,
        delay: reduceMotion ? 0 : delay,
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Image — Kora: scale up + blur(5px) on hover */}
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{
          filter: reduceMotion
            ? "blur(0px)"
            : hovered
              ? "blur(5px)"
              : "blur(0px)",
          scale: reduceMotion ? 1 : hovered ? 1.08 : 1,
        }}
        transition={{ duration: 0.45, ease: easeOut }}
      >
        <Image
          src={item.image}
          alt=""
          fill
          sizes="(min-width: 1200px) 28vw, (min-width: 810px) 42vw, 92vw"
          className="object-cover object-top"
          style={{ borderRadius: "inherit" }}
        />
      </motion.div>

      {/* Bottom gradient — always on for title readability */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          backgroundColor: INK,
          opacity: 0.4,
          maskImage: "linear-gradient(180deg, transparent 0%, #000 100%)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 0%, #000 100%)",
        }}
      />

      {/* Full black overlay — fades in on hover (Kora) */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ backgroundColor: INK }}
        initial={false}
        animate={{
          opacity: reduceMotion ? 0 : hovered ? 0.35 : 0,
        }}
        transition={{ duration: 0.45, ease: easeOut }}
      />

      <span
        className="relative z-[2] inline-flex w-max items-center gap-[7px] overflow-hidden rounded-[15px] py-0.5 pr-[11px] pl-0.5"
        style={{ backgroundColor: INK }}
      >
        <span className="grid size-[24px] place-items-center rounded-full bg-white">
          <CategoryIcon type={item.icon} />
        </span>
        <span
          className="text-[13px] leading-[1.5] font-semibold tracking-[-0.025em]"
          style={{ color: LABEL, fontFamily: FONT }}
        >
          {item.category}
        </span>
      </span>

      <div className="relative z-[2] flex flex-col gap-[7px]">
        <time
          dateTime={item.datetime}
          className="text-[14px] leading-[1.5] font-semibold tracking-[-0.03em]"
          style={{ color: DATE, fontFamily: FONT }}
        >
          {item.date}
        </time>
        <h3
          className="text-[20px] leading-[1.3] font-bold tracking-[-0.04em] break-keep whitespace-pre-line md:text-[25px]"
          style={{ color: LABEL, fontFamily: FONT }}
        >
          {item.title}
        </h3>
      </div>
    </motion.a>
  );
}

export function InsightsSection() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      id="insights"
      className="relative w-full px-5 py-[60px] md:px-10 md:py-[90px] xl:px-[60px] xl:py-[120px]"
      style={{ fontFamily: FONT, backgroundColor: "#FCFCFA" }}
      aria-labelledby="insights-heading"
    >
      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-stretch gap-8 md:gap-10 xl:flex-row xl:items-stretch xl:gap-[50px]">
        {/* Left — title / description / CTA */}
        <div className="flex w-full flex-col justify-between gap-10 xl:w-auto xl:min-w-0 xl:flex-1">
          <div className="flex flex-col gap-5 md:gap-[30px]">
            <motion.h2
              id="insights-heading"
              className="text-[clamp(36px,5vw,60px)] leading-[1.05] font-bold tracking-[-0.04em] break-keep will-change-[opacity,transform,filter]"
              style={{ color: INK }}
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0.001, y: 2, scale: 0.9, filter: "blur(5px)" }
              }
              animate={
                inView || reduceMotion
                  ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                  : { opacity: 0.001, y: 2, scale: 0.9, filter: "blur(5px)" }
              }
              transition={{
                duration: reduceMotion ? 0 : 0.85,
                ease: easeOut,
              }}
            >
              이로운 인사이트
            </motion.h2>
            <motion.p
              className="max-w-[22em] text-[20px] leading-[1.3] font-semibold tracking-[-0.04em] break-keep md:text-[25px]"
              style={{ color: MUTED }}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={
                inView || reduceMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 8 }
              }
              transition={{
                duration: reduceMotion ? 0 : 0.7,
                ease: easeOut,
                delay: reduceMotion ? 0 : 0.08,
              }}
            >
              사건 현장에서 쌓은 경험과,
              <br />
              의뢰인에게 도움이 되는 법률 칼럼을 정리합니다.
            </motion.p>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={
              inView || reduceMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 8 }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.65,
              ease: easeOut,
              delay: reduceMotion ? 0 : 0.14,
            }}
          >
            <Link
              href="/insights"
              className="group inline-flex items-center gap-[25px] rounded-[40px] bg-[#242424] px-[15px] py-[10px] no-underline transition-colors duration-250 hover:bg-[#F7F7ED]"
            >
              <span className="text-[14px] leading-[1.5] font-semibold tracking-[-0.03em] text-[#FFFFFA] transition-colors duration-250 group-hover:text-[#242424]">
                전체 보기
              </span>
              <span
                aria-hidden
                className="size-2.5 shrink-0 rounded-full bg-[#F7F7ED] transition-colors duration-250 group-hover:bg-[#242424]"
              />
            </Link>
          </motion.div>
        </div>

        {/* Right — two insight cards */}
        <div className="flex w-full flex-col gap-5 sm:flex-row xl:w-auto xl:min-w-0 xl:flex-[2]">
          {INSIGHTS.map((item, i) => (
            <div key={item.id} className="min-w-0 flex-1">
              <InsightCard
                item={item}
                reduceMotion={reduceMotion}
                delay={0.12 + i * 0.08}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
