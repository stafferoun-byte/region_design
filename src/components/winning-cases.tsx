"use client";

import { motion, useReducedMotion, type MotionValue } from "framer-motion";
import { useState } from "react";
import { SectionTitleReveal } from "@/components/section-title-reveal";

const FONT =
  '"Wanted Sans Variable", "Wanted Sans", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';

const TEAL = "#5DC39B";
const INK2 = "#363636";
const DIVIDER = "rgba(0, 0, 0, 0.1)";

/**
 * Floating glass: translucent fill, white edge highlight, soft outer shade.
 * No hard border; no inner dark shade.
 */

type WinningCase = {
  id: string;
  category: string;
  title: string;
  lawyer: string;
  avatar: string;
  image: string;
};

const CASES: WinningCase[] = [
  {
    id: "1",
    category: "상속 · 유류분",
    title: "유류분 5,800만원\n청구 인용",
    lawyer: "이창재 대표변호사",
    avatar: "/images/eroun-logo.png",
    image: "/images/practice/inheritance.png",
  },
  {
    id: "2",
    category: "부동산 · 임대차",
    title: "보증금 4억 4천만원\n반환",
    lawyer: "김남열 변호사",
    avatar: "/images/eroun-logo.png",
    image: "/images/practice/realestate.png",
  },
  {
    id: "3",
    category: "형사 · 성범죄",
    title: "무혐의 종결\n수사 종결",
    lawyer: "이창재 대표변호사",
    avatar: "/images/eroun-logo.png",
    image: "/images/practice/criminal.png",
  },
  {
    id: "4",
    category: "민사 · 손해배상",
    title: "청구액 전액\n인용 판결",
    lawyer: "김남열 변호사",
    avatar: "/images/eroun-logo.png",
    image: "/images/practice/civil.png",
  },
  {
    id: "5",
    category: "가정 · 이혼",
    title: "양육권 · 재산분할\n유리한 조정",
    lawyer: "이창재 대표변호사",
    avatar: "/images/eroun-logo.png",
    image: "/images/practice/family.png",
  },
  {
    id: "6",
    category: "보이스피싱",
    title: "피해금 회수\n절차 성공",
    lawyer: "김남열 변호사",
    avatar: "/images/eroun-logo.png",
    image: "/images/insights/case-files.png",
  },
];

function CaseCard({ item }: { item: WinningCase }) {
  return (
    <div
      className="relative h-[272px] w-[195px] shrink-0 rounded-[20px] min-[1072px]:h-[372px] min-[1072px]:w-[255px] min-[1072px]:rounded-[24px]"
      style={{
        boxShadow:
          "0 -10px 28px -14px rgba(0, 0, 0, 0.1), 0 18px 44px -18px rgba(0, 0, 0, 0.14), 0 6px 14px -8px rgba(0, 0, 0, 0.06)",
      }}
    >
      <article
        className="flex h-full w-full flex-col overflow-hidden rounded-[20px] min-[1072px]:rounded-[24px]"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.32)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow:
            "inset 0 0 0 1px rgba(255, 255, 255, 0.95), inset 0 1px 0 rgba(255, 255, 255, 1)",
        }}
      >
        <a
          href="#cases"
          className="flex h-full w-full flex-col px-3.5 pt-3.5 pb-4 no-underline min-[1072px]:px-4 min-[1072px]:pt-4 min-[1072px]:pb-5"
        >
          {/* Top — photo / 승소사례 visual */}
          <div className="relative h-[96px] shrink-0 overflow-hidden rounded-[14px] min-[1072px]:h-[132px] min-[1072px]:rounded-[16px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 mix-blend-overlay"
              style={{
                opacity: 0.42,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundSize: "110px 110px",
              }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 mix-blend-soft-light"
              style={{
                opacity: 0.3,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.25' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundSize: "70px 70px",
              }}
            />
          </div>

          {/* Bottom — pill, title, lawyer */}
          <div className="mt-3 flex min-h-0 flex-1 flex-col justify-end min-[1072px]:mt-3.5">
            <p
              className="mb-2 w-fit rounded-full px-2.5 py-1 text-[11px] leading-none font-semibold tracking-[-0.02em] text-white min-[1072px]:mb-2.5 min-[1072px]:px-3 min-[1072px]:py-1.5 min-[1072px]:text-[12px]"
              style={{ fontFamily: FONT, backgroundColor: TEAL }}
            >
              {item.category}
            </p>

            <h4
              className="whitespace-pre-line text-[18px] leading-[1.3] font-bold tracking-[-0.04em] text-black min-[1072px]:text-[24px] min-[1072px]:leading-[1.32] min-[1072px]:tracking-[-1.2px]"
              style={{ fontFamily: FONT }}
            >
              {item.title}
            </h4>

            <div
              className="my-2.5 h-px w-full min-[1072px]:my-3"
              style={{ backgroundColor: DIVIDER }}
            />

            <div
              className="flex items-center gap-2.5 text-[14px] font-bold min-[1072px]:gap-3 min-[1072px]:text-[16px]"
              style={{ fontFamily: FONT, color: INK2 }}
            >
              <span
                className="relative size-11 shrink-0 overflow-hidden rounded-full bg-transparent min-[1072px]:size-[52px]"
                style={{ boxShadow: `inset 0 0 0 1px ${DIVIDER}` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.avatar}
                  alt=""
                  className="absolute inset-0 h-full w-full object-contain p-1.5"
                  draggable={false}
                />
              </span>
              <span className="min-w-0 whitespace-nowrap leading-[1.3]">
                {item.lawyer}
              </span>
            </div>
          </div>
        </a>
      </article>
    </div>
  );
}

function CasesMarquee({ reverse }: { reverse: boolean }) {
  const loop = [...CASES, ...CASES];

  return (
    <div className="overflow-x-clip pt-6 pb-8">
      <div
        className="cases-marquee-track flex w-max"
        style={{
          animationDirection: reverse ? "reverse" : "normal",
          gap: "20px",
        }}
      >
        {loop.map((item, i) => (
          <CaseCard key={`${item.id}-${i}`} item={item} />
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

const CASES_TITLE_LINE_1 = [
  { text: "진심이", color: "#000000" },
  { text: "결과가", color: "#000000" },
  { text: "되는", color: "#000000" },
  { text: "순간.", color: "#000000" },
] as const;

const CASES_TITLE_LINE_2 = [
  { text: "이로운", color: TEAL },
  { text: "성공사례", color: TEAL, glue: true },
  { text: "를", color: "#000000" },
  { text: "소개합니다.", color: "#000000" },
] as const;

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
        <SectionTitleReveal
          lines={[CASES_TITLE_LINE_1, CASES_TITLE_LINE_2]}
          inView={show}
          reduceMotion={reduceMotion}
          className="text-center text-[clamp(30px,3.8vw,48px)] leading-[1.28] font-bold tracking-[-0.05em] break-keep"
          style={{ fontFamily: FONT }}
          ariaLabel="진심이 결과가 되는 순간. 이로운 성공사례를 소개합니다."
        />
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
                borderColor: "#F5F5E9",
                backgroundColor: "#F5F5E9",
                color: "#242424",
                fontFamily: FONT,
              }}
            >
              MORE
            </a>
          </div>

          <CasesMarquee reverse={reverse} />
        </div>

        {/* Desktop */}
        <div className="relative hidden md:block">
          <div className="flex w-full items-end gap-8 xl:gap-10">
            <div className="pb-8">
              <LawyerPopout />
            </div>

            <div className="flex min-w-0 flex-1 flex-col self-end">
              <div className="mb-4 flex shrink-0 items-center justify-between pr-10 xl:pr-14">
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
                    borderColor: "#F5F5E9",
                    backgroundColor: "#F5F5E9",
                    color: "#242424",
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
