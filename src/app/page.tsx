"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SiteFooter } from "@/components/site-footer";
import { StatsSection } from "@/components/stats-section";
import { TeamSection } from "@/components/team-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { WinningCases } from "@/components/winning-cases";
import { WishNetworkSection } from "@/components/wish-network-section";

/** Existing hero institution logos — reuse project assets as-is */
const partnerLogos = [
  { src: "/images/partners/supreme-court.png", alt: "대법원" },
  { src: "/images/partners/seoul-central.png", alt: "서울중앙지방검찰청" },
  { src: "/images/partners/seoul-southern.png", alt: "서울남부지방검찰청" },
  { src: "/images/partners/namyangju-court.png", alt: "의정부지방법원" },
  { src: "/images/partners/seoul-family.png", alt: "서울가정법원" },
];

const FONT_WANTED =
  '"Wanted Sans Variable", "Wanted Sans", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';

function ChangesSection({ reduceMotion }: { reduceMotion: boolean | null }) {
  const cardTriggerRef = useRef<HTMLDivElement | null>(null);
  const [casesReveal, setCasesReveal] = useState(!!reduceMotion);

  const { scrollYProgress: splitProgress } = useScroll({
    target: cardTriggerRef,
    offset: ["start end", "start start"],
  });

  /**
   * Strong L/R split (Kora-style). Headline must fully clear before
   * the cases title appears — otherwise the same copy double-renders
   * and looks like a horizontal tear through the glyphs.
   */
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
    [0, 0.55, 0.85],
    reduceMotion ? [0, 0, 0] : [1, 0.35, 0],
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
    [0, 0.55, 0.85],
    reduceMotion ? [0, 0, 0] : [1, 0.35, 0],
  );

  const casesOpacity = useTransform(
    splitProgress,
    [0.45, 0.75, 1],
    reduceMotion ? [1, 1, 1] : [0, 0.85, 1],
  );

  /** Cases section title — only after overlay headline is gone */
  const casesTitleOpacity = useTransform(
    splitProgress,
    [0.72, 0.9],
    reduceMotion ? [1, 1] : [0, 1],
  );

  useMotionValueEvent(splitProgress, "change", (v) => {
    if (reduceMotion || v >= 0.55) {
      setCasesReveal((prev) => prev || true);
    }
  });

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
    <section className="changes-section relative z-20" style={{ backgroundColor: "#FCFCFA" }}>
      <div className="relative">
        <div
          className="sticky top-0 min-h-svh w-full overflow-x-clip"
          style={{ perspective: 1200, backgroundColor: "#FCFCFA" }}
        >
          {/* Headline — splits hard L/R */}
          <div className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center overflow-x-clip">
            <div className="w-[min(900px,calc(100%-40px))]">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
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
                  이로운 파트너스의 진심
                  <span className="ml-[0.08em] text-[0.72em]">.</span>
                </motion.div>
              </motion.div>
            </div>
          </div>

          <motion.div
            style={{ opacity: casesOpacity, backgroundColor: "#FCFCFA" }}
            className="relative z-[1] flex min-h-svh flex-col justify-center py-12 md:py-16"
          >
            <WinningCases
              reveal={casesReveal}
              titleOpacity={casesTitleOpacity}
            />
          </motion.div>
        </div>

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Avoid hydration mismatch from browser extensions injecting styles
  // (e.g. user-select) into SSR HTML before React hydrates.
  if (!mounted) {
    return (
      <main
        id="top"
        className="relative min-h-svh bg-white text-[#161616]"
        suppressHydrationWarning
      />
    );
  }

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
            <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_2%,black_98%,transparent)]">
              <div className="marquee-track flex min-w-max items-center gap-20">
                {[...partnerLogos, ...partnerLogos].map((logo, index) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={`${logo.alt}-${index}`}
                    src={`${logo.src}?v=4`}
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
                style={{ width: "auto" }}
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

      {/* Green team box rises from below over the wish network */}
      <div className="relative z-20">
        <div className="sticky top-0 z-0 bg-white">
          <WishNetworkSection />
          {/* Bottom breathing room — does not shrink the network */}
          <div className="h-[120px] md:h-[160px] xl:h-[200px]" aria-hidden />
        </div>
        <div className="pointer-events-none h-[90svh] md:h-[110svh]" aria-hidden />
        <div className="relative z-10">
          <TeamSection />
        </div>
      </div>

      <div className="relative z-20 bg-white">
        <StatsSection />
        <TestimonialsSection />
        <SiteFooter />
      </div>
    </main>
  );
}
