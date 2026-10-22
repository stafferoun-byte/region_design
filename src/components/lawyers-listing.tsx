"use client";

import { useAfterPageWipe, WordReveal } from "@/components/section-title-reveal";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import "@/styles/kuemmerlein-tiles.css";

const easeOut = [0.22, 1, 0.36, 1] as const;

const ATTORNEYS = [
  {
    href: "/lawyers/lee",
    label: "이창재 대표변호사",
    nameEn: "Changjae Lee",
    image: "/images/attorneys/lee-chang-jae.png",
    imagePosition: "center 32%",
  },
  {
    href: "/lawyers/kim",
    label: "김남열 파트너변호사",
    nameEn: "Namyeol Kim",
    image: "/images/attorneys/kim-nam-yeol.png",
  },
  {
    href: "/lawyers/kang",
    label: "강누리 파트너변호사",
    nameEn: "Nuri Kang",
    image: "/images/attorneys/kang-nuri-profile.png",
  },
] as const;

const LEAD = [
  [
    { text: "한" },
    { text: "사람의" },
    { text: "삶을" },
    { text: "먼저" },
    { text: "생각하는" },
    { text: "이로운" },
    { text: "변호사들입니다." },
  ],
  [
    { text: "사건번호가" },
    { text: "아닌" },
    { text: "삶을" },
    { text: "중심에" },
    { text: "두고," },
    { text: "가장" },
    { text: "이로운" },
    { text: "길을" },
    { text: "찾습니다." },
  ],
] as const;

export function LawyersListing() {
  const headerRef = useRef<HTMLElement | null>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const pageReady = useAfterPageWipe();

  const appear = {
    initial: reduceMotion ? false : ({ opacity: 0, y: 14 } as const),
    animate:
      headerInView || reduceMotion
        ? ({ opacity: 1, y: 0 } as const)
        : ({ opacity: 0, y: 14 } as const),
  };

  return (
    <div className="kuem-insights kuem-insights--on-white kuem-insights--columns">
      <div className="kuem-insights__pad">
        <header ref={headerRef}>
          <motion.h1
            className="kuem-insights__title kuem-insights__title--ibm will-change-[opacity,transform]"
            initial={appear.initial}
            animate={appear.animate}
            transition={{
              duration: reduceMotion ? 0 : 0.85,
              ease: easeOut,
            }}
          >
            이로운 변호사들
          </motion.h1>
          <WordReveal
            as="p"
            lines={LEAD}
            inView={!!headerInView && pageReady}
            reduceMotion={reduceMotion}
            delay={0.1}
            className="kuem-insights__lead"
            ariaLabel="한 사람의 삶을 먼저 생각하는 이로운 변호사들입니다. 사건번호가 아닌 삶을 중심에 두고, 가장 이로운 길을 찾습니다."
          />
        </header>
        <nav
          aria-label="변호사"
          className="mx-[var(--insights-inset-x)] mt-[96px] grid grid-cols-1 gap-16 md:mx-0 md:mt-[144px] md:gap-24"
        >
          {ATTORNEYS.map((attorney) => (
            <Link
              key={attorney.href}
              href={attorney.href}
              className="group block min-w-0 text-black"
            >
              <div className="relative aspect-[1920/830] w-full overflow-hidden">
                <img
                  src={attorney.image}
                  alt=""
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{
                    objectPosition:
                      "imagePosition" in attorney
                        ? attorney.imagePosition
                        : "center center",
                  }}
                />
              </div>
              <span className="mt-2 flex w-fit items-baseline gap-2.5 md:mt-4">
                <span
                  className="kuem-tile__title relative inline-block max-md:!text-[16px] max-md:!leading-[22px]"
                  style={{
                    fontFamily: "var(--font-ibm-sans), 'IBM Plex Sans KR', sans-serif",
                  }}
                >
                  {attorney.label}
                  <span
                    aria-hidden
                    className="absolute -bottom-[5px] left-0 h-px w-0 bg-black transition-[width] duration-300 group-hover:w-full"
                  />
                </span>
                <span
                  lang="en"
                  className="text-[12px] leading-none whitespace-nowrap md:text-[18px]"
                >
                  {attorney.nameEn}
                </span>
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
