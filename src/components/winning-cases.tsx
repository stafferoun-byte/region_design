"use client";

import { motion, useReducedMotion, type MotionValue, type Variants } from "framer-motion";
import { useState } from "react";

const FONT =
  '"Wanted Sans Variable", "Wanted Sans", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';

const TEAL = "#5DC39B";
const INK2 = "#363636";

/**
 * Soft brand-tinted cards — mint wash + stone, tied to #5DC39B
 */
const CARD_COLORS = [
  "#EBEBE1",
  "#E1E3D4",
  "#EFE3D5",
  "#D1C9BC",
  "#CDC6BA",
  "#E9E9E7",
] as const;
const CATEGORY_COLOR = "#5A7A70";

/** Same Kora appear ease as StatsSection */
const easeOut = [0.22, 1, 0.36, 1] as const;

type WinningCase = {
  id: string;
  category: string;
  title: string;
  lawyer: string;
  avatar: string;
};

const CASES: WinningCase[] = [
  {
    id: "1",
    category: "상속 · 유류분",
    title: "유류분 5,800만원\n청구 인용",
    lawyer: "이창재 대표변호사",
    avatar: "/images/eroun-logo.png",
  },
  {
    id: "2",
    category: "부동산 · 임대차",
    title: "보증금 4억 4천만원\n반환",
    lawyer: "김남열 변호사",
    avatar: "/images/eroun-logo.png",
  },
  {
    id: "3",
    category: "형사 · 성범죄",
    title: "무혐의 종결\n수사 종결",
    lawyer: "이창재 대표변호사",
    avatar: "/images/eroun-logo.png",
  },
  {
    id: "4",
    category: "민사 · 손해배상",
    title: "청구액 전액\n인용 판결",
    lawyer: "김남열 변호사",
    avatar: "/images/eroun-logo.png",
  },
  {
    id: "5",
    category: "가정 · 이혼",
    title: "양육권 · 재산분할\n유리한 조정",
    lawyer: "이창재 대표변호사",
    avatar: "/images/eroun-logo.png",
  },
  {
    id: "6",
    category: "보이스피싱",
    title: "피해금 회수\n절차 성공",
    lawyer: "김남열 변호사",
    avatar: "/images/eroun-logo.png",
  },
];

function CaseCard({
  item,
  color,
}: {
  item: WinningCase;
  color: string;
}) {
  return (
    <article
      className="flex h-[272px] w-[195px] shrink-0 flex-col overflow-hidden rounded-[20px] min-[1072px]:h-[372px] min-[1072px]:w-[255px] min-[1072px]:rounded-[24px]"
      style={{ backgroundColor: color }}
    >
      <a
        href="#cases"
        className="flex h-full w-full flex-col px-[18px] pt-8 pb-5 no-underline min-[1072px]:px-[27px] min-[1072px]:pt-11 min-[1072px]:pb-[30px]"
      >
        <p
          className="mb-3 text-[13px] leading-none font-semibold tracking-[-0.02em] min-[1072px]:mb-4 min-[1072px]:text-[15px]"
          style={{ fontFamily: FONT, color: CATEGORY_COLOR }}
        >
          {item.category}
        </p>

        <h4
          className="whitespace-pre-line text-[20px] leading-[1.3] font-bold tracking-[-0.04em] text-black min-[1072px]:text-[24px] min-[1072px]:leading-[1.35] min-[1072px]:tracking-[-1.2px]"
          style={{ fontFamily: FONT }}
        >
          {item.title}
        </h4>

        <div
          className="mt-auto mb-4 h-px w-full min-[1072px]:mb-5"
          style={{ backgroundColor: "rgba(0,0,0,0.12)" }}
        />

        <div
          className="flex items-center gap-[13px] text-[13px] font-bold min-[1072px]:gap-[15px] min-[1072px]:text-[15px]"
          style={{ fontFamily: FONT, color: INK2 }}
        >
          <span className="relative size-[60px] shrink-0 overflow-hidden rounded-full bg-white/70 min-[1072px]:size-[76px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.avatar}
              alt=""
              className="absolute inset-0 h-full w-full object-contain p-2"
              draggable={false}
            />
          </span>
          <span className="min-w-0 whitespace-nowrap leading-[1.3]">
            {item.lawyer}
          </span>
        </div>
      </a>
    </article>
  );
}

function CasesMarquee({ reverse }: { reverse: boolean }) {
  const loop = [...CASES, ...CASES];

  return (
    <div className="overflow-hidden">
      <div
        className="cases-marquee-track flex w-max"
        style={{
          animationDirection: reverse ? "reverse" : "normal",
          gap: "20px",
        }}
      >
        {loop.map((item, i) => (
          <CaseCard
            key={`${item.id}-${i}`}
            item={item}
            color={CARD_COLORS[i % CARD_COLORS.length]}
          />
        ))}
      </div>
    </div>
  );
}

function NavArrows({
  onPrev,
  onNext,
  labelPrev,
  labelNext,
}: {
  onPrev: () => void;
  onNext: () => void;
  labelPrev: string;
  labelNext: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        aria-label={labelPrev}
        onClick={onPrev}
        className="flex size-5 items-center justify-center text-[#5DC39B]"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 5L8 12l7 7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        type="button"
        aria-label={labelNext}
        onClick={onNext}
        className="flex size-5 items-center justify-center text-[#5DC39B]"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 5l7 7-7 7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

function LawyerPopout() {
  return (
    <div className="relative z-10 w-[min(100%,280px)] shrink-0 md:w-[300px] xl:w-[320px]">
      <div className="relative flex h-[272px] w-full items-end justify-center overflow-visible min-[1072px]:h-[372px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/lawyer-popout01.png"
          alt="이창재 대표변호사"
          className="h-full w-auto max-w-full origin-bottom object-contain object-bottom"
          decoding="async"
        />
      </div>
      <p
        className="absolute top-full left-0 right-0 mt-1.5 text-center text-[13px] font-medium"
        style={{ fontFamily: FONT, color: INK2 }}
      >
        이창재 대표변호사
      </p>
    </div>
  );
}

/** Same word blur reveal as Team / Wish section titles */
const TITLE_LINE_2 = ["이로운", "성공사례를", "소개합니다."] as const;

function CasesTitleReveal({
  show,
  reduceMotion,
}: {
  show: boolean;
  reduceMotion: boolean | null;
}) {
  const container: Variants = {
    hidden: {},
    show: {
      transition: reduceMotion
        ? { duration: 0 }
        : { staggerChildren: 0.055, delayChildren: 0.02 },
    },
  };

  const word: Variants = reduceMotion
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

  const renderLine = (words: readonly string[]) =>
    words.map((w, i) => (
      <span key={`${w}-${i}`}>
        <motion.span
          variants={word}
          className="inline-block will-change-[opacity,transform]"
        >
          {w}
        </motion.span>
        {i < words.length - 1 ? " " : null}
      </span>
    ));

  return (
    <motion.h3
      className="text-center text-[clamp(30px,3.8vw,48px)] leading-[1.28] font-bold tracking-[-0.05em] break-keep text-black"
      style={{ fontFamily: FONT }}
      variants={container}
      initial="hidden"
      animate={show || reduceMotion ? "show" : "hidden"}
      aria-label="진심이 결과가 되는 순간. 이로운 성공사례를 소개합니다."
    >
      <motion.span
        variants={word}
        className="inline-block will-change-[opacity,transform]"
      >
        진심이
      </motion.span>{" "}
      <motion.span
        variants={word}
        className="inline-block will-change-[opacity,transform]"
      >
        결과가
      </motion.span>{" "}
      <motion.span
        variants={word}
        className="inline-block will-change-[opacity,transform]"
      >
        되는
      </motion.span>{" "}
      <motion.span
        variants={word}
        className="inline-block will-change-[opacity,transform]"
      >
        순간.
      </motion.span>
      <br />
      {renderLine(TITLE_LINE_2)}
    </motion.h3>
  );
}

export function WinningCases({
  reveal = true,
  titleOpacity,
}: {
  reveal?: boolean;
  /** When set, delays the section title until the overlay split headline is gone */
  titleOpacity?: MotionValue<number>;
}) {
  const [reverse, setReverse] = useState(false);
  const reduceMotion = useReducedMotion();
  const show = reveal || !!reduceMotion;

  return (
    <section
      id="cases"
      className="w-full overflow-x-clip pl-8 md:pl-12 xl:pl-20"
      style={{ backgroundColor: "#FCFCFA" }}
      aria-label="승소사례"
    >
      <motion.div
        className="pr-8 md:pr-12 xl:pr-20"
        style={titleOpacity ? { opacity: titleOpacity } : undefined}
      >
        <CasesTitleReveal show={show} reduceMotion={reduceMotion} />
      </motion.div>

      <div className="relative mx-auto mt-16 w-full max-w-[1920px] md:mt-20 xl:mt-24">
        {/* Mobile */}
        <div className="md:hidden">
          <div className="mb-10 flex justify-center pr-8">
            <LawyerPopout />
          </div>

          <div className="mb-4 flex items-center justify-between pr-8">
            <NavArrows
              onPrev={() => setReverse(true)}
              onNext={() => setReverse(false)}
              labelPrev="반대 방향"
              labelNext="왼쪽 흐름"
            />
            <a
              href="#cases"
              className="mr-3 inline-flex h-8 items-center justify-center rounded-full border px-3.5 text-[12px] font-light tracking-[1px] no-underline"
              style={{
                borderColor: TEAL,
                backgroundColor: TEAL,
                color: "#FFFFFF",
                fontFamily: FONT,
              }}
            >
              MORE
            </a>
          </div>

          <div className="overflow-hidden">
            <CasesMarquee reverse={reverse} />
          </div>
        </div>

        {/* Desktop */}
        <div className="relative hidden md:block">
          <div className="flex w-full items-end gap-8 pb-8 xl:gap-10">
            <LawyerPopout />

            <div className="min-w-0 flex-1 self-end overflow-hidden">
              <div className="mb-4 flex items-center justify-between pr-10 xl:pr-14">
                <NavArrows
                  onPrev={() => setReverse(true)}
                  onNext={() => setReverse(false)}
                  labelPrev="반대 방향"
                  labelNext="왼쪽 흐름"
                />
                <a
                  href="#cases"
                  className="mr-4 inline-flex h-8 w-[96px] items-center justify-center rounded-full border text-[13px] font-light tracking-[1px] no-underline xl:mr-6"
                  style={{
                    borderColor: TEAL,
                    backgroundColor: TEAL,
                    color: "#FFFFFF",
                    fontFamily: FONT,
                  }}
                >
                  MORE
                </a>
              </div>

              <CasesMarquee reverse={reverse} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
