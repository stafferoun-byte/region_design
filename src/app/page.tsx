"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { SiteFooter } from "@/components/site-footer";
import { StatsSection } from "@/components/stats-section";
import { TeamSection } from "@/components/team-section";

/** Existing hero institution logos — reuse project assets as-is */
const partnerLogos = [
  { src: "/images/partners/supreme-court.png", alt: "대법원" },
  { src: "/images/partners/seoul-central.png", alt: "서울중앙지방검찰청" },
  { src: "/images/partners/seoul-southern.png", alt: "서울남부지방검찰청" },
  { src: "/images/partners/namyangju-court.png", alt: "의정부지방법원 남양주지원" },
  { src: "/images/partners/seoul-family.png", alt: "서울가정법원" },
  { src: "/images/partners/seoul-central-district.png", alt: "서울중앙지방검찰청 로고" },
];

const TEAM_IMAGE = "/images/lawyer-popout01.png";

const FONT_WANTED =
  '"Wanted Sans Variable", "Wanted Sans", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';

const EXPERT_CARDS = [
  {
    branch: "남양주점",
    name: "이로운 변호사",
    address: "경기 남양주시 다산중앙로82번안길 152",
    phone: "1800-9730",
  },
  {
    branch: "서울점",
    name: "이로운 변호사",
    address: "서울 사무소 · 2026년 9월 오픈 예정",
    phone: "1800-9730",
  },
  {
    branch: "상담센터",
    name: "이로운 변호사",
    address: "전국 상담 · 방문 예약 가능",
    phone: "1800-9730",
  },
  {
    branch: "형사센터",
    name: "이로운 변호사",
    address: "형사 · 성범죄 · 보이스피싱 대응",
    phone: "1800-9730",
  },
  {
    branch: "상속센터",
    name: "이로운 변호사",
    address: "상속 · 유류분 · 유언 자문",
    phone: "1800-9730",
  },
] as const;

type ExpertCardData = (typeof EXPERT_CARDS)[number];

function ExpertCard({ card }: { card: ExpertCardData }) {
  return (
    <div className="flex h-[300px] w-[210px] shrink-0 flex-col gap-3 rounded-[20px] bg-white p-3 shadow-[0_1px_6px_rgba(0,0,0,0.03)] md:h-[320px] md:w-[230px] md:gap-4 md:p-4">
      <div className="mx-auto h-[110px] w-[68%] shrink-0 rounded-[16px] bg-[#eef1f5] md:h-[128px]" />
      <div className="flex shrink-0 flex-col gap-1.5 pt-5 md:pt-6">
        <div className="flex flex-col">
          <p
            className="text-[13px] leading-[1.4] text-[#181d27] md:text-[14px]"
            style={{ fontFamily: FONT_WANTED }}
          >
            {card.branch}
          </p>
          <p
            className="text-[15px] leading-[1.4] font-medium text-[#181d27] md:text-[16px]"
            style={{ fontFamily: FONT_WANTED }}
          >
            {card.name}
          </p>
        </div>
        <div className="flex flex-col gap-0.5">
          <p
            className="text-[12px] leading-[1.4] text-[#717680] md:text-[13px]"
            style={{ fontFamily: FONT_WANTED }}
          >
            {card.address}
          </p>
          <p
            className="text-[12px] leading-[1.4] text-[#181d27] md:text-[13px]"
            style={{ fontFamily: FONT_WANTED }}
          >
            {card.phone}
          </p>
        </div>
      </div>
    </div>
  );
}

function TeamImageCard() {
  return (
    <div className="relative w-full overflow-visible">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={TEAM_IMAGE}
        alt="이로운 법률사무소"
        className="h-auto w-full object-contain"
      />
    </div>
  );
}

function ChangesSection({ reduceMotion }: { reduceMotion: boolean | null }) {
  const cardTriggerRef = useRef<HTMLDivElement | null>(null);

  // Headline splits → experts fades in (same sticky frame)
  const { scrollYProgress: splitProgress } = useScroll({
    target: cardTriggerRef,
    offset: ["start end", "start start"],
  });

  const line1X = useTransform(
    splitProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, -2000],
  );
  const line1RotateY = useTransform(
    splitProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, -60],
  );
  const line1Scale = useTransform(
    splitProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [1, 1.5],
  );
  const line1Opacity = useTransform(
    splitProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [1, 0],
  );

  const line2X = useTransform(
    splitProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 2000],
  );
  const line2RotateY = useTransform(
    splitProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 60],
  );
  const line2Scale = useTransform(
    splitProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [1, 1.5],
  );
  const line2Opacity = useTransform(
    splitProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [1, 0],
  );

  // Appear in place (opacity only — no slide-up)
  const expertsOpacity = useTransform(
    splitProgress,
    [0.2, 0.7],
    reduceMotion ? [1, 1] : [0, 1],
  );

  const enterTransition = reduceMotion
    ? { duration: 0 }
    : {
        type: "spring" as const,
        stiffness: 358,
        damping: 100,
        mass: 1,
        delay: 0,
      };

  return (
    <section className="changes-section relative z-20 bg-white">
      <div className="relative">
        <div
          className="sticky top-0 min-h-svh w-full bg-white [overflow-x:clip]"
          style={{ perspective: 1200 }}
        >
          {/* Headline — splits L/R in place */}
          <div className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center overflow-x-clip">
            <div className="w-[min(900px,calc(100%-40px))]">
              <motion.div
                initial={
                  reduceMotion ? false : { opacity: 0, y: -300, scale: 1.1 }
                }
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={enterTransition}
                className="flex flex-col items-center gap-1 will-change-transform md:gap-2"
              >
                <motion.div
                  style={{
                    x: line1X,
                    rotateY: line1RotateY,
                    scale: line1Scale,
                    opacity: line1Opacity,
                    transformPerspective: 1200,
                    fontFamily: FONT_WANTED,
                  }}
                  className="origin-center text-center text-[35px] leading-[1.15] font-semibold tracking-[-0.06em] text-black will-change-transform md:text-[60px] md:font-bold xl:text-[80px]"
                >
                  일상의 회복을 <span className="text-[#3D3D3D]">위한</span>
                </motion.div>
                <motion.div
                  style={{
                    x: line2X,
                    rotateY: line2RotateY,
                    scale: line2Scale,
                    opacity: line2Opacity,
                    transformPerspective: 1200,
                    fontFamily: FONT_WANTED,
                  }}
                  className="origin-center text-center text-[35px] leading-[1.15] font-semibold tracking-[-0.06em] text-[#3D3D3D] will-change-transform md:text-[60px] md:font-bold xl:text-[80px]"
                >
                  이로운 파트너스의 진심<span className="ml-[0.08em] text-[0.72em]">.</span>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Experts — fades in after split (no inset clip box) */}
          <motion.div
            style={{ opacity: expertsOpacity }}
            className="relative z-[1] flex min-h-svh flex-col bg-white pt-28 pb-10 md:pt-32"
          >
            <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-24 px-5 md:gap-28 md:px-8">
              {/* Copy stays up */}
              <div className="flex w-full flex-col items-center gap-3 text-center">
                <h3
                  className="text-[clamp(34px,4.2vw,52px)] leading-[1.28] font-bold tracking-[-0.06em] text-black"
                  style={{ fontFamily: FONT_WANTED }}
                >
                  일상의 회복을 위한
                  <br />
                  이로운 파트너스의 진심.
                </h3>
                <p
                  className="mt-1 text-[clamp(16px,1.8vw,22px)] leading-[1.3] font-semibold tracking-[-0.04em] text-[#616161]"
                  style={{ fontFamily: FONT_WANTED }}
                >
                  승소 판결문으로 증명합니다.
                </p>
              </div>
            </div>

            {/* Photo fixed left — cards marquee only in the space to the right */}
            <div className="mx-auto mt-24 w-full max-w-[1440px] px-5 md:mt-28 md:px-8">
              <div className="grid w-full grid-cols-[min(320px,32%)_minmax(0,1fr)] grid-rows-[auto_auto] gap-x-5 md:gap-x-8">
                <div className="col-start-1 row-start-1">
                  <TeamImageCard />
                </div>

                <div className="col-start-2 row-start-1 self-end bg-transparent [overflow-x:clip] [overflow-y:visible]">
                  <div className="expert-marquee-track flex w-max items-end gap-3 md:gap-4">
                    {[...EXPERT_CARDS, ...EXPERT_CARDS].map((card, i) => (
                      <ExpertCard key={`${card.branch}-${i}`} card={card} />
                    ))}
                  </div>
                </div>

                <p
                  className="col-start-1 row-start-2 mt-2 text-center text-[14px] leading-[1.4] font-medium text-[#181d27]"
                  style={{ fontFamily: FONT_WANTED }}
                >
                  이로운 법률사무소
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll track: split + reveal, then hold */}
        <div
          ref={cardTriggerRef}
          className="pointer-events-none h-[100svh] w-full"
          aria-hidden
        />
        <div className="pointer-events-none h-[50svh] w-full" aria-hidden />
      </div>
    </section>
  );
}

export default function Home() {
  const heroTransitionRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroTransitionRef,
    offset: ["start start", "end end"],
  });

  // Zoom + mild darken finish at end of track → next section rises immediately
  const frameScale = useTransform(
    scrollYProgress,
    [0, 0.18, 1],
    reduceMotion ? [1, 1, 1] : [1, 1, 1.1],
  );

  // Cap darkness to the mid-dim look (not full black)
  const darkOpacity = useTransform(
    scrollYProgress,
    [0.2, 1],
    [0, 0.42],
  );

  const logoOpacity = useTransform(scrollYProgress, [0, 0.14, 0.4], [1, 1, 0]);
  const logoY = useTransform(
    scrollYProgress,
    [0.14, 0.4],
    [0, reduceMotion ? 0 : -24],
  );

  return (
    <main id="top" className="relative bg-white text-[#161616]">
      {/*
        Sticky hero stays pinned while the scroll track + next section move.
        After zoom/darken, the next section rises over it.
      */}
      <section className="sticky top-0 z-0 h-svh w-full">
        <div className="relative h-full w-full overflow-hidden">
          <motion.div
            className="absolute inset-0 z-0 origin-center will-change-transform"
            style={{ scale: frameScale }}
          >
            <div className="absolute inset-5 overflow-hidden rounded-[40px]">
              <video
                className="absolute inset-0 h-full w-full object-cover object-center"
                src="/videos/hero.mp4?v=3"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
            </div>
          </motion.div>

          <motion.div
            className="institution-logo-strip pointer-events-none absolute right-auto bottom-[52px] left-[44px] z-[1] max-w-[58%] sm:bottom-[56px] sm:left-[48px]"
            style={{ opacity: logoOpacity, y: logoY }}
          >
            <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_88%,transparent)]">
              <div className="marquee-track flex min-w-max items-center gap-20">
                {[...partnerLogos, ...partnerLogos].map((logo, index) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={`${logo.alt}-${index}`}
                    src={`${logo.src}?v=2`}
                    alt={logo.alt}
                    className="h-12 w-auto object-contain"
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="pointer-events-none absolute inset-0 z-[2] origin-center"
            style={{ scale: frameScale }}
          >
            <motion.div
              className="absolute inset-5 rounded-[40px] bg-black/50"
              style={{ opacity: darkOpacity }}
            />
          </motion.div>

          <div className="absolute inset-x-0 top-0 z-[5] px-[calc(1.25rem+12px)] pt-[calc(1.25rem+16px)] sm:px-[calc(1.25rem+14px)]">
            <div className="inline-flex items-center gap-1 rounded-full bg-white py-3 pr-3 pl-4 text-[#171717] shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
              <Image
                src="/images/eroun-logo.png"
                alt="이로운 법률사무소"
                width={240}
                height={56}
                className="h-12 w-auto shrink-0 object-contain"
                priority
              />
              <nav className="hidden items-center gap-2 text-[16px] font-medium tracking-[-0.03em] text-black lg:flex">
                <a
                  href="#partners"
                  className="inline-flex min-w-[7.5rem] items-center justify-center rounded-full px-3 py-2.5 text-center transition-colors hover:bg-[#5DC39B] hover:text-white"
                >
                  이로운 파트너스
                </a>
                <a
                  href="#practice"
                  className="inline-flex min-w-[7.5rem] items-center justify-center rounded-full px-3 py-2.5 text-center transition-colors hover:bg-[#5DC39B] hover:text-white"
                >
                  업무분야
                </a>
                <a
                  href="#cases"
                  className="inline-flex min-w-[7.5rem] items-center justify-center rounded-full px-3 py-2.5 text-center transition-colors hover:bg-[#5DC39B] hover:text-white"
                >
                  성공사례
                </a>
                <a
                  href="#consult"
                  className="inline-flex min-w-[7.5rem] items-center justify-center rounded-full px-3 py-2.5 text-center transition-colors hover:bg-[#5DC39B] hover:text-white"
                >
                  상담예약
                </a>
                <a
                  href="#location"
                  className="inline-flex min-w-[7.5rem] items-center justify-center rounded-full px-3 py-2.5 text-center transition-colors hover:bg-[#5DC39B] hover:text-white"
                >
                  오시는길
                </a>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* Track ends when zoom/dim finish — next section covers right then */}
      <div
        ref={heroTransitionRef}
        className="pointer-events-none -mt-[100svh] h-[180svh] md:h-[200svh]"
        aria-hidden
      />

      <ChangesSection reduceMotion={reduceMotion} />

      {/* Covers sticky hero so the video never peeks under later sections */}
      <div className="relative z-20 overflow-x-clip bg-white">
        <StatsSection />
        <TeamSection />
        <SiteFooter />
      </div>
    </main>
  );
}
