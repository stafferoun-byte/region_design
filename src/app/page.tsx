"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
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
import { useEffect, useRef, useState, type ReactNode } from "react";

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

/** Mobile hero copy — off for now; restore when ready */
const SHOW_HERO_MOBILE_COPY = false;

/** Soft line dissolve — matches hero.mp4 burned-in caption timing */
function HeroVideoLine({
  children,
  delay,
  reduceMotion,
  className,
}: {
  children: ReactNode;
  delay: number;
  reduceMotion: boolean | null;
  className?: string;
}) {
  return (
    <motion.p
      className={className}
      initial={
        reduceMotion
          ? false
          : { opacity: 0, filter: "blur(3px)" }
      }
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              duration: 1.6,
              delay,
              ease: [0.33, 0.1, 0.25, 1],
            }
      }
      style={{
        willChange: "opacity, filter",
        textShadow:
          "0 1px 10px rgba(0,0,0,0.28), 0 0 2px rgba(0,0,0,0.18)",
      }}
    >
      {children}
    </motion.p>
  );
}

function HeroMobileCopy({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <div className="pointer-events-none flex h-full w-full items-center justify-center px-6">
      <div
        className="flex w-full max-w-[22ch] translate-y-24 flex-col text-[clamp(22px,5.8vw,28px)] leading-[1.35] tracking-[-0.03em] text-white antialiased"
        style={{
          fontFamily: FONT_PRETENDARD,
          WebkitFontSmoothing: "antialiased",
        }}
        aria-label="하나의 사건번호가 아닌, 한 사람의 삶으로. 이로운 변호사들, 이로운 파트너스"
      >
        {/* Left block — mirrors video left captions */}
        <div className="flex flex-col self-start text-left font-light">
          <HeroVideoLine delay={0.7} reduceMotion={reduceMotion}>
            하나의 사건번호가 아닌,
          </HeroVideoLine>
          <HeroVideoLine delay={2.1} reduceMotion={reduceMotion}>
            <span className="font-semibold">한 사람의 삶</span>으로
          </HeroVideoLine>
        </div>

        {/* Right block — mirrors video right captions */}
        <div className="mt-8 flex flex-col self-end text-right font-light">
          <HeroVideoLine delay={4.2} reduceMotion={reduceMotion}>
            이로운 변호사들,
          </HeroVideoLine>
          <HeroVideoLine delay={5.4} reduceMotion={reduceMotion}>
            <span className="font-semibold">이로운 파트너스</span>
          </HeroVideoLine>
        </div>
      </div>
    </div>
  );
}

function ChangesSection({ reduceMotion }: { reduceMotion: boolean | null }) {
  const cardTriggerRef = useRef<HTMLDivElement | null>(null);
  const [casesReveal, setCasesReveal] = useState(!!reduceMotion);
  const [isMobile, setIsMobile] = useState(false);
  /** Manual scroll progress — Framer useScroll skips frames with Lenis/touch on mobile */
  const splitProgress = useMotionValue(0);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const updateMq = () => setIsMobile(mq.matches);
    updateMq();
    mq.addEventListener("change", updateMq);
    return () => mq.removeEventListener("change", updateMq);
  }, []);

  useEffect(() => {
    const update = () => {
      const el = cardTriggerRef.current;
      if (!el) return;
      // Match Framer offset ["start end", "start start"]
      const top = el.getBoundingClientRect().top;
      const vh = window.innerHeight || 1;
      const p = Math.min(1, Math.max(0, 1 - top / vh));
      splitProgress.set(p);
    };

    update();

    let attached: { on: Function; off: Function } | null =
      (
        window as unknown as { __lenis?: { on: Function; off: Function } }
      ).__lenis ?? null;
    if (attached?.on) attached.on("scroll", update);

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
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.clearInterval(retry);
      attached?.off?.("scroll", update);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [splitProgress]);

  /** Shared L/R split progress — mobile + desktop */
  const splitLocal = splitProgress;

  /** Mobile: less 3D, shorter travel — smoother on phones */
  const splitX = isMobile ? 920 : 2000;
  const splitRot = isMobile ? 28 : 60;
  const splitScaleTo = isMobile ? 1.22 : 1.5;

  const line1X = useTransform(splitLocal, (v) =>
    reduceMotion ? 0 : -splitX * v,
  );
  const line1RotateY = useTransform(splitLocal, (v) =>
    reduceMotion ? 0 : -splitRot * v,
  );
  const line1Scale = useTransform(splitLocal, (v) =>
    reduceMotion ? 1 : 1 + (splitScaleTo - 1) * v,
  );
  const line1Opacity = useTransform(splitLocal, (v) => {
    if (reduceMotion) return 0;
    if (v <= 0.5) return 1 - v * 0.6;
    if (v >= 0.82) return 0;
    return 0.4 * (1 - (v - 0.5) / 0.32);
  });

  const line2X = useTransform(splitLocal, (v) =>
    reduceMotion ? 0 : splitX * v,
  );
  const line2RotateY = useTransform(splitLocal, (v) =>
    reduceMotion ? 0 : splitRot * v,
  );
  const line2Scale = useTransform(splitLocal, (v) =>
    reduceMotion ? 1 : 1 + (splitScaleTo - 1) * v,
  );
  const line2Opacity = useTransform(splitLocal, (v) => {
    if (reduceMotion) return 0;
    if (v <= 0.5) return 1 - v * 0.6;
    if (v >= 0.82) return 0;
    return 0.4 * (1 - (v - 0.5) / 0.32);
  });

  const casesOpacity = useTransform(splitLocal, (v) => {
    if (reduceMotion) return 1;
    const a = isMobile ? 0.35 : 0.45;
    const b = isMobile ? 0.65 : 0.75;
    if (v <= a) return 0;
    if (v >= b) return 1;
    return 0.85 * ((v - a) / (b - a));
  });

  const casesTitleOpacity = useTransform(splitLocal, (v) => {
    if (reduceMotion) return 1;
    const a = isMobile ? 0.58 : 0.72;
    const b = isMobile ? 0.82 : 0.9;
    if (v <= a) return 0;
    if (v >= b) return 1;
    return (v - a) / (b - a);
  });

  useMotionValueEvent(splitLocal, "change", (v) => {
    const threshold = isMobile ? 0.4 : 0.55;
    if (reduceMotion || v >= threshold) {
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
          style={{ perspective: isMobile ? 800 : 1200, backgroundColor: "#FCFCFA" }}
        >
          {/*
            Headline sits in a true viewport-height layer (h-svh), not the full
            sticky content height — so it stays vertically centered on any phone.
          */}
          <div className="pointer-events-none absolute top-0 right-0 left-0 z-[2] flex h-svh items-center justify-center overflow-x-clip">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={enterTransition}
              className="flex w-[min(900px,calc(100%-40px))] flex-col items-center gap-1 will-change-transform md:gap-2"
            >
              <motion.div
                style={{
                  x: line1X,
                  rotateY: line1RotateY,
                  scale: line1Scale,
                  opacity: line1Opacity,
                  transformPerspective: isMobile ? 800 : 1200,
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
                  transformPerspective: isMobile ? 800 : 1200,
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

          <motion.div
            style={{ opacity: casesOpacity, backgroundColor: "#FCFCFA" }}
            className="relative z-[1] flex min-h-svh flex-col justify-start pt-[104px] pb-16 md:pt-[148px] md:pb-20"
          >
            <WinningCases
              reveal={casesReveal}
              titleOpacity={casesTitleOpacity}
            />
          </motion.div>
        </div>

        <div
          ref={cardTriggerRef}
          className="pointer-events-none h-[100svh] w-full md:h-[100svh]"
          aria-hidden
        />
        <div className="pointer-events-none h-[40svh] w-full md:h-[50svh]" aria-hidden />
      </div>
    </section>
  );
}

export default function Home() {
  const heroTransitionRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const isDesktop = useIsDesktop();
  /** Kora: rounded inset → full-bleed on scroll (mobile + desktop) */
  const enableHeroScrub = !reduceMotion;

  const framePad = useMotionValue(24);
  const frameRadius = useMotionValue(40);
  const darkOpacity = useMotionValue(0);
  const logoOpacity = useMotionValue(1);
  const logoY = useMotionValue(0);

  // Drive hero expand from Lenis/window scroll — Framer useScroll was not updating.
  useEffect(() => {
    const REST_PAD = isDesktop ? 24 : 16;
    const REST_RADIUS = isDesktop ? 40 : 28;

    if (!enableHeroScrub) {
      framePad.set(REST_PAD);
      frameRadius.set(REST_RADIUS);
      darkOpacity.set(0);
      logoOpacity.set(1);
      logoY.set(0);
      return;
    }

    // Seed inset frame before first scroll tick
    framePad.set(REST_PAD);
    frameRadius.set(REST_RADIUS);

    const update = () => {
      const el = heroTransitionRef.current;
      if (!el) return;

      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;

      const p = Math.min(1, Math.max(0, -el.getBoundingClientRect().top / total));

      // Expand through first ~55% of the sticky track (Kora-style)
      const t = Math.min(1, p / 0.55);
      const s = t * t * (3 - 2 * t);
      framePad.set(REST_PAD * (1 - s));
      frameRadius.set(REST_RADIUS * (1 - s));

      // Logos fade mid-expand
      const logoT = Math.min(1, Math.max(0, (p - 0.12) / 0.28));
      logoOpacity.set(1 - logoT);
      logoY.set(-20 * logoT);

      // Darken after mostly full-bleed — leads into blur headline section
      const darkT = Math.min(1, Math.max(0, (p - 0.4) / 0.4));
      darkOpacity.set((isDesktop ? 0.42 : 0.5) * darkT);
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
    isDesktop,
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
          <motion.div
            className="absolute inset-0 z-[1] md:hidden"
            style={{ opacity: logoOpacity }}
          >
            <HeroMobileCopy reduceMotion={reduceMotion} />
          </motion.div>
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
        Kora sequence: rounded inset → full-bleed → (scroll) blur headline → cases.
        Sticky scrub track on both mobile and desktop.
      */}
      <div
        ref={heroTransitionRef}
        className={`relative z-0 ${enableHeroScrub ? "h-[200svh] md:h-[240svh]" : "h-svh"}`}
      >
        <section
          className={`h-svh w-full bg-[#FCFCFA] ${enableHeroScrub ? "sticky top-0" : "relative"}`}
        >
          {heroFrame}
        </section>
      </div>

      <ChangesSection reduceMotion={reduceMotion} />

      {/* Green team box rises from below over the wish network */}
      <div className="relative z-20">
        <div className="sticky top-0 z-0 min-h-svh bg-[#FCFCFA] md:flex md:flex-col">
          {/*
            Mobile: fill viewport under nav (min-h-svh) so the cream spacer
            doesn’t cover the lower faces. Desktop centers in the pin frame.
          */}
          <div className="pt-[108px] pb-6 md:flex md:flex-1 md:flex-col md:justify-center md:pt-[108px] md:pb-10 xl:pt-[112px] xl:pb-12">
            <WishNetworkSection />
          </div>
        </div>
        <div className="pointer-events-none h-[90svh] w-full md:h-[110svh]" aria-hidden />
        <div className="relative z-10 bg-[#FCFCFA]">
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
