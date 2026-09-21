"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { HeroNav } from "@/components/hero-nav";
import { ConsultFormSection } from "@/components/consult-form-section";
import { FaqSection } from "@/components/faq-section";
import { InsightsSection } from "@/components/insights-section";
import { LegalTermsAccordionSection } from "@/components/legal-terms-accordion-section";
import { SiteFooter } from "@/components/site-footer";
import { StatsSection } from "@/components/stats-section";
import { TeamSection } from "@/components/team-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { WinningCases } from "@/components/winning-cases";
import { WishNetworkSection } from "@/components/wish-network-section";
import { useEffect, useRef, useState } from "react";

/** Desktop only — hero sticky zoom scrub (Kora mobile scrolls normally) */
function useIsDesktop(query = "(min-width: 1024px)") {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return isDesktop;
}

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

const FONT_PRETENDARD =
  '"Pretendard", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';

/** Flip to true to restore mobile hero copy overlay */
const SHOW_HERO_MOBILE_COPY = false;

/** Mobile-only hero copy — PC has the same lines burned into the video */
function HeroMobileCopy({ reduceMotion }: { reduceMotion: boolean | null }) {
  const lines: {
    key: string;
    mt?: boolean;
    parts: { text: string; bold?: boolean }[];
  }[] = [
    { key: "l0", parts: [{ text: "하나의 사건번호가 아닌," }] },
    {
      key: "l1",
      parts: [
        { text: "한 사람의 삶", bold: true },
        { text: "으로" },
      ],
    },
    { key: "l2", mt: true, parts: [{ text: "이로운 변호사들," }] },
    { key: "l3", parts: [{ text: "이로운 파트너스", bold: true }] },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center px-6 md:hidden">
      <div
        className="flex w-full max-w-[20ch] flex-col items-center text-center text-[clamp(26px,7vw,34px)] leading-[1.25] tracking-[-0.04em] text-white"
        style={{ fontFamily: FONT_PRETENDARD }}
        aria-label="하나의 사건번호가 아닌, 한 사람의 삶으로. 이로운 변호사들, 이로운 파트너스"
      >
        {lines.map((line, i) => (
          <motion.p
            key={line.key}
            className={`font-light${line.mt ? " mt-7" : ""}`}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: 2.4,
                    delay: 0.5 + i * 0.95,
                    ease: "easeInOut",
                  }
            }
          >
            {line.parts.map((part) => (
              <span
                key={part.text}
                className={part.bold ? "font-semibold" : undefined}
              >
                {part.text}
              </span>
            ))}
          </motion.p>
        ))}
      </div>
    </div>
  );
}

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
          className="sticky top-0 min-h-svh w-full"
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
                  className="origin-center text-center text-[28px] leading-[1.15] font-semibold tracking-[-0.06em] text-black will-change-transform sm:text-[35px] md:text-[60px] md:font-bold xl:text-[80px]"
                >
                  일상의 회복을 위한
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
                  className="origin-center text-center text-[28px] leading-[1.15] font-semibold tracking-[-0.06em] text-black will-change-transform sm:text-[35px] md:text-[60px] md:font-bold xl:text-[80px]"
                >
                  이로운 파트너스의{" "}
                  <span className="text-[#5DC39B]">진심</span>
                  <span className="ml-[0.08em] text-[0.72em]">.</span>
                </motion.div>
              </motion.div>
            </div>
          </div>

          <motion.div
            style={{ opacity: casesOpacity, backgroundColor: "#FCFCFA" }}
            className="relative z-[1] flex min-h-svh flex-col justify-center py-12 pb-16 md:py-16 md:pb-24"
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
  const isDesktop = useIsDesktop();
  const enableHeroScrub = isDesktop && !reduceMotion;

  const framePad = useMotionValue(24);
  const frameRadius = useMotionValue(40);
  const darkOpacity = useMotionValue(0);
  const logoOpacity = useMotionValue(1);
  const logoY = useMotionValue(0);

  // Drive hero expand from Lenis/window scroll — Framer useScroll was not updating.
  useEffect(() => {
    const REST_PAD = enableHeroScrub ? 24 : 20;
    const REST_RADIUS = enableHeroScrub ? 40 : 36;

    if (!enableHeroScrub) {
      framePad.set(REST_PAD);
      frameRadius.set(REST_RADIUS);
      darkOpacity.set(0);
      logoOpacity.set(1);
      logoY.set(0);
      return;
    }

    const update = () => {
      const el = heroTransitionRef.current;
      if (!el) return;

      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;

      const p = Math.min(1, Math.max(0, -el.getBoundingClientRect().top / total));

      // Expand through first ~55% of the sticky track
      const t = Math.min(1, p / 0.55);
      const s = t * t * (3 - 2 * t);
      framePad.set(REST_PAD * (1 - s));
      frameRadius.set(REST_RADIUS * (1 - s));

      // Logos fade mid-expand
      const logoT = Math.min(1, Math.max(0, (p - 0.12) / 0.28));
      logoOpacity.set(1 - logoT);
      logoY.set(-20 * logoT);

      // Darken after mostly full-bleed
      const darkT = Math.min(1, Math.max(0, (p - 0.4) / 0.4));
      darkOpacity.set(0.42 * darkT);
    };

    update();

    const lenis = (
      window as unknown as { __lenis?: { on: Function; off: Function } }
    ).__lenis;

    // Lenis mounts in a parent effect after this one — retry briefly to attach.
    let attached: { on: Function; off: Function } | null = lenis ?? null;
    if (attached?.on) {
      attached.on("scroll", update);
    }

    const retry = window.setInterval(() => {
      if (attached) {
        window.clearInterval(retry);
        return;
      }
      const late = (
        window as unknown as { __lenis?: { on: Function; off: Function } }
      ).__lenis;
      if (late?.on) {
        attached = late;
        late.on("scroll", update);
        update();
        window.clearInterval(retry);
      }
    }, 50);
    window.setTimeout(() => window.clearInterval(retry), 2000);

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.clearInterval(retry);
      attached?.off?.("scroll", update);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [
    enableHeroScrub,
    framePad,
    frameRadius,
    darkOpacity,
    logoOpacity,
    logoY,
  ]);

  const heroFrame = (
    <motion.div
      className="box-border h-full w-full bg-[#FCFCFA] will-change-[padding]"
      style={{ padding: framePad }}
    >
      <motion.div
        className="relative isolate h-full w-full overflow-hidden will-change-[border-radius]"
        style={{ borderRadius: frameRadius }}
      >
        <video
          className="absolute inset-0 h-full w-full object-cover object-[42%_center] md:object-center"
          src="/videos/hero.mp4?v=3"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />

        {SHOW_HERO_MOBILE_COPY ? (
          <HeroMobileCopy reduceMotion={reduceMotion} />
        ) : null}

        <motion.div
          className="institution-logo-strip pointer-events-none absolute right-auto bottom-8 left-6 z-[1] max-w-[72%] sm:bottom-10 sm:left-10 sm:max-w-[62%] md:bottom-[56px] md:left-[48px] md:max-w-[58%]"
          style={{ opacity: logoOpacity, y: logoY }}
        >
          <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_2%,black_98%,transparent)]">
            <div className="marquee-track flex min-w-max items-center gap-10 md:gap-20">
              {[...partnerLogos, ...partnerLogos].map((logo, index) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={`${logo.alt}-${index}`}
                  src={`${logo.src}?v=4`}
                  alt={logo.alt}
                  className="h-8 w-auto object-contain sm:h-10 md:h-12"
                />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-0 z-[2] bg-black/50"
          style={{ opacity: darkOpacity }}
        />
      </motion.div>
    </motion.div>
  );

  return (
    <main
      id="top"
      className="relative bg-[#FCFCFA] text-[#161616]"
      suppressHydrationWarning
    >
      <HeroNav />

      {/*
        Same DOM always (ref must stay mounted). Desktop: tall scrub track + sticky.
        Mobile: one viewport, static rounded card via enableHeroScrub=false.
      */}
      <div
        ref={heroTransitionRef}
        className={`relative z-0 ${isDesktop ? "h-[240svh]" : "h-svh"}`}
      >
        <section
          className={`h-svh w-full bg-[#FCFCFA] ${isDesktop ? "sticky top-0" : "relative"}`}
        >
          {heroFrame}
        </section>
      </div>

      <ChangesSection reduceMotion={reduceMotion} />

      {/* Green team box rises from below over the wish network */}
      <div className="relative z-20">
        <div className="sticky top-0 z-0 bg-[#FCFCFA]">
          <WishNetworkSection />
          {/* Bottom breathing room — does not shrink the network */}
          <div className="h-[120px] md:h-[160px] xl:h-[200px]" aria-hidden />
        </div>
        <div className="pointer-events-none h-[90svh] md:h-[110svh]" aria-hidden />
        <div className="relative z-10">
          <TeamSection />
        </div>
      </div>

      <div className="relative z-20 bg-[#FCFCFA]">
        <StatsSection />
        <LegalTermsAccordionSection />
        <TestimonialsSection />
        <FaqSection />
        <InsightsSection />
      </div>
      {/* CTA shrinks + footer circle rises — shared scroll stage */}
      <div className="relative z-20 overflow-x-clip bg-[#FCFCFA]">
        <ConsultFormSection />
        <SiteFooter />
      </div>
    </main>
  );
}
