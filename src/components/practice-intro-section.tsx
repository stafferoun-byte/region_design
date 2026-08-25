"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { SectionTitleReveal } from "@/components/section-title-reveal";

/**
 * Practice intro — layout matched to Kora About “Built by operators” block
 * @see https://kora.framer.media/about
 */

const FONT =
  '"Wanted Sans Variable", "Wanted Sans", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';

const CREAM = "#F7F7ED";
const INK = "#161616";
const MUTED = "#5C5C5C";
const ACCENT = "#5DC39B";
const easeOut = [0.22, 1, 0.36, 1] as const;

const PARTNER_LOGOS = [
  { src: "/images/partners/supreme-court.png", alt: "대법원" },
  { src: "/images/partners/seoul-central.png", alt: "서울중앙지방검찰청" },
  { src: "/images/partners/seoul-southern.png", alt: "서울남부지방검찰청" },
  { src: "/images/partners/namyangju-court.png", alt: "의정부지방법원" },
  { src: "/images/partners/seoul-family.png", alt: "서울가정법원" },
] as const;

const STATS = [
  { value: "전국 0.2%", label: ["대한변호사협회 인증", "상속전문변호사"] },
  { value: "37,000+", label: ["누적", "상담 건수"] },
  { value: "1,500억+", label: ["누적 상속사건", "처리금액"] },
] as const;

const INTRO_TITLE_LINE_1 = [
  { text: "남겨진", color: "#000000" },
  { text: "재산", color: "#000000" },
  { text: "너머의", color: "#000000" },
] as const;

const INTRO_TITLE_LINE_2 = [
  { text: "마음까지", color: "#000000" },
  { text: "살피겠습니다.", color: "#000000" },
] as const;

function QuoteMark() {
  return (
    <svg
      width="34"
      height="28"
      viewBox="0 0 48 40"
      fill="none"
      aria-hidden
      className="mt-0.5 shrink-0 -translate-x-32 rotate-180 md:-translate-x-48"
    >
      <path
        d="M0 22.4C0 10.08 6.72 2.24 18.24 0v8.96c-5.12.96-7.68 3.84-7.68 8.64h7.68V40H0V22.4Zm27.52 0C27.52 10.08 34.24 2.24 45.76 0v8.96c-5.12.96-7.68 3.84-7.68 8.64h7.68V40H27.52V22.4Z"
        fill={ACCENT}
      />
    </svg>
  );
}

export function PracticeIntroSection() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.25 });

  const appear = (delay = 0) => ({
    initial: reduceMotion ? false : ({ opacity: 0, y: 14 } as const),
    animate:
      inView || reduceMotion
        ? ({ opacity: 1, y: 0 } as const)
        : ({ opacity: 0, y: 14 } as const),
    transition: {
      duration: reduceMotion ? 0 : 0.55,
      ease: easeOut,
      delay: reduceMotion ? 0 : delay,
    },
  });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#FCFCFA] px-5 pt-24 pb-32 md:px-10 md:pt-[100px] md:pb-[180px] xl:px-12 xl:pt-[120px] xl:pb-[220px]"
      style={{ fontFamily: FONT }}
      aria-labelledby="practice-intro-heading"
    >
      <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-12 md:gap-14 xl:gap-16">
        {/* Kora: “Built by operators” section title under hero */}
        <SectionTitleReveal
          id="practice-intro-heading"
          lines={[INTRO_TITLE_LINE_1, INTRO_TITLE_LINE_2]}
          inView={inView}
          reduceMotion={reduceMotion}
          className="max-w-[18em] text-[clamp(32px,4.2vw,56px)] leading-[1.2] font-bold tracking-[-0.05em] break-keep will-change-[opacity,transform]"
          style={{ fontFamily: FONT }}
        />

        {/* Story cards + gallery/stats — tight stack */}
        <div className="flex w-full flex-col gap-4 md:gap-5 xl:gap-6">
          {/* Kora: 2-column story + portrait */}
          <div className="grid w-full grid-cols-1 gap-4 md:gap-5 xl:grid-cols-2 xl:gap-6">
            {/* Left cream card */}
            <motion.article
              {...appear(0.06)}
              className="relative flex min-h-[460px] flex-col justify-between gap-10 overflow-hidden rounded-[28px] p-7 md:min-h-[520px] md:rounded-[32px] md:p-9 xl:min-h-[560px] xl:p-10"
              style={{ backgroundColor: CREAM }}
            >
              <div className="flex flex-col gap-6 md:gap-7">
                <div className="flex items-start justify-between gap-1 md:gap-2">
                  <motion.p
                    {...appear(0.1)}
                    className="max-w-[20em] text-[clamp(18px,1.9vw,24px)] leading-[1.3] font-bold tracking-[-0.04em] break-keep"
                    style={{ color: INK }}
                  >
                    처음에는 대부분
                    <br />
                    숫자로 확인되는 전문성을 보고
                    <br />
                    이로운 상속전문센터를 찾아오십니다.
                  </motion.p>
                  <QuoteMark />
                </div>

                <div
                  className="flex max-w-[36em] flex-col gap-4 text-[15px] leading-[1.65] font-medium tracking-[-0.02em] break-keep md:text-[16px]"
                  style={{ color: "#2A2A2A" }}
                >
                  <motion.p {...appear(0.16)}>
                    그러나 사건을 마친 뒤 오래 남는 것은 결과만이 아니었습니다.
                    <br />
                    눈에 보이는 재산보다 더 무거웠던 오해와
                    <br />
                    외면받았던 감정까지 꺼내놓을 수 있었던 시간.
                  </motion.p>
                  <motion.p {...appear(0.22)}>
                    이로운이 생각하는 상속분쟁의 해결은
                    <br />
                    재산을 나누는 데서 끝나지 않습니다.
                  </motion.p>
                  <motion.p {...appear(0.28)}>
                    법적으로 받아야 할 몫이 분명해지고, 오랫동안 얽혀 있던
                    마음까지
                    <br />
                    제자리를 찾아갈 때 상속은 비로소 온전히 정리된다고
                    믿습니다.
                  </motion.p>
                </div>
              </div>

              <div className="-mx-1 -translate-y-2 overflow-hidden md:-translate-y-3 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                <div className="marquee-track flex w-max items-center gap-20 md:gap-24">
                  {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, index) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={`${logo.src}-${index}`}
                      src={logo.src}
                      alt={logo.alt}
                      className="h-7 w-auto shrink-0 object-contain brightness-0 md:h-8"
                      draggable={false}
                    />
                  ))}
                </div>
              </div>
            </motion.article>

            {/* Right image card */}
            <motion.div
              {...appear(0.12)}
              className="relative min-h-[400px] overflow-hidden rounded-[28px] md:min-h-[520px] md:rounded-[32px] xl:min-h-[560px]"
            >
              <Image
                src="/images/hiring.png"
                alt="이로운 법률사무소"
                fill
                sizes="(max-width: 1280px) 100vw, 720px"
                quality={100}
                unoptimized
                className="object-cover object-[center_35%]"
                priority
              />
            </motion.div>
          </div>

          {/* Stats under story cards */}
          <motion.dl
            {...appear(0.16)}
            className="mt-10 grid w-full grid-cols-1 gap-8 sm:mt-12 sm:grid-cols-3 sm:gap-6 md:mt-16"
          >
            {STATS.map((stat) => (
              <div
                key={stat.value}
                className="flex items-center gap-4 md:gap-5"
              >
                <dt
                  className="shrink-0 text-[clamp(28px,3.2vw,48px)] leading-none font-bold tracking-[-0.05em] break-keep"
                  style={{ color: INK }}
                >
                  {stat.value}
                </dt>
                <dd
                  className="text-[13px] leading-[1.35] font-semibold tracking-[-0.02em] break-keep md:text-[14px]"
                  style={{ color: MUTED }}
                >
                  {stat.label[0]}
                  <br />
                  {stat.label[1]}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
