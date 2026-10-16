"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SITE_NAV } from "@/lib/site-nav";

/** Kora: footer circle bloom + card scale are desktop-only */
function useIsDesktop(query = "(min-width: 768px)") {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return isDesktop;
}

const FONT_WANTED =
  '"Wanted Sans Variable", "Wanted Sans", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';

/** Exact paths from kora.framer.media social icon masks (viewBox 0 0 40 40) */
const SOCIAL_LINKS = [
  {
    label: "네이버 블로그",
    href: "https://blog.naver.com/erounlaw",
    path: "M 25.34 21.06 L 14.22 5 H 5 V 35 H 14.66 V 18.94 L 25.78 35 H 35 V 5 H 25.34 V 21.06 Z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com",
    path: "M 20 14 C 16.686 14 14 16.686 14 20 C 14 23.314 16.686 26 20 26 C 23.314 26 26 23.314 26 20 C 26 16.686 23.314 14 20 14 Z M 20 10 C 25.523 10 30 14.477 30 20 C 30 25.523 25.523 30 20 30 C 14.477 30 10 25.523 10 20 C 10 14.477 14.477 10 20 10 Z M 33 9.5 C 33 10.881 31.881 12 30.5 12 C 29.119 12 28 10.881 28 9.5 C 28 8.119 29.119 7 30.5 7 C 31.881 7 33 8.119 33 9.5 Z M 20 4 C 15.052 4 14.244 4.014 11.942 4.116 C 10.374 4.19 9.322 4.4 8.346 4.78 C 7.529 5.08 6.791 5.561 6.186 6.186 C 5.56 6.791 5.079 7.529 4.778 8.346 C 4.398 9.326 4.188 10.376 4.116 11.942 C 4.012 14.15 3.998 14.922 3.998 20 C 3.998 24.95 4.012 25.756 4.114 28.058 C 4.188 29.624 4.398 30.678 4.776 31.652 C 5.116 32.522 5.516 33.148 6.18 33.812 C 6.854 34.484 7.48 34.886 8.34 35.218 C 9.328 35.6 10.38 35.812 11.94 35.884 C 14.148 35.988 14.92 36 19.998 36 C 24.948 36 25.754 35.986 28.056 35.884 C 29.62 35.81 30.672 35.6 31.65 35.222 C 32.466 34.921 33.204 34.44 33.81 33.816 C 34.484 33.144 34.886 32.518 35.218 31.656 C 35.598 30.672 35.81 29.62 35.882 28.056 C 35.986 25.85 35.998 25.076 35.998 20 C 35.998 15.052 35.984 14.244 35.882 11.942 C 35.808 10.378 35.596 9.322 35.218 8.346 C 34.917 7.53 34.436 6.792 33.812 6.186 C 33.207 5.56 32.469 5.078 31.652 4.778 C 30.672 4.398 29.62 4.188 28.056 4.116 C 25.85 4.012 25.078 4 19.998 4 Z M 20 0 C 25.434 0 26.112 0.02 28.246 0.12 C 30.374 0.22 31.826 0.554 33.1 1.05 C 34.42 1.558 35.532 2.246 36.644 3.356 C 37.661 4.356 38.448 5.565 38.95 6.9 C 39.444 8.174 39.78 9.626 39.88 11.756 C 39.974 13.888 40 14.566 40 20 C 40 25.434 39.98 26.112 39.88 28.244 C 39.78 30.374 39.444 31.824 38.95 33.1 C 38.449 34.436 37.662 35.645 36.644 36.644 C 35.644 37.661 34.435 38.448 33.1 38.95 C 31.826 39.444 30.374 39.78 28.246 39.88 C 26.112 39.974 25.434 40 20 40 C 14.566 40 13.888 39.98 11.754 39.88 C 9.626 39.78 8.176 39.444 6.9 38.95 C 5.565 38.449 4.355 37.662 3.356 36.644 C 2.339 35.644 1.552 34.435 1.05 33.1 C 0.554 31.826 0.22 30.374 0.12 28.244 C 0.024 26.112 0 25.434 0 20 C 0 14.566 0.02 13.888 0.12 11.756 C 0.22 9.624 0.554 8.176 1.05 6.9 C 1.55 5.564 2.338 4.355 3.356 3.356 C 4.355 2.338 5.565 1.551 6.9 1.05 C 8.174 0.554 9.624 0.22 11.754 0.12 C 13.888 0.026 14.566 0 20 0 Z",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com",
    path: "M 13.714 23 L 18.612 23 L 20.571 15 L 13.714 15 L 13.714 11 C 13.714 8.94 13.714 7 17.633 7 L 20.571 7 L 20.571 0.28 C 19.933 0.194 17.521 0 14.974 0 C 9.655 0 5.878 3.314 5.878 9.4 L 5.878 15 L 0 15 L 0 23 L 5.878 23 L 5.878 40 L 13.714 40 Z",
    // Kora FB glyph sits left in the 40×40 viewBox — nudge to optical center
    nudgeX: 9.7,
  },
] as const;

function SocialIcon({
  path,
  className,
  nudgeX = 0,
  fillRule = "nonzero",
}: {
  path: string;
  className?: string;
  nudgeX?: number;
  fillRule?: "nonzero" | "evenodd";
}) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <path
        fill="currentColor"
        fillRule={fillRule}
        d={path}
        transform={nudgeX ? `translate(${nudgeX} 0)` : undefined}
      />
    </svg>
  );
}

function SocialButton({
  href,
  label,
  path,
  nudgeX = 0,
  fillRule = "nonzero",
}: {
  href: string;
  label: string;
  path: string;
  nudgeX?: number;
  fillRule?: "nonzero" | "evenodd";
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#FFFFFA] p-2 md:size-[52px] md:p-2.5"
    >
      {/* Kora Hover BG — green circle expands from center */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 scale-0 rounded-full bg-[#5DC39B] transition-transform duration-300 ease-out group-hover:scale-100"
      />
      <SocialIcon
        path={path}
        nudgeX={nudgeX}
        fillRule={fillRule}
        className="relative z-[1] size-4 text-black transition-colors duration-300 group-hover:text-[#F5F5E9] md:size-[22px]"
      />
    </a>
  );
}

function CopyPhoneRow({ phone }: { phone: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(phone);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1600);
        } catch {
          /* ignore */
        }
      }}
      className="group inline-flex items-center gap-2.5 text-left"
      aria-label={copied ? "번호 복사됨" : "번호 복사"}
    >
      {/* Exact Kora Framer copy icon (viewBox 0 0 48 43) */}
      <span className="relative flex size-[30px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#5DC39B] transition-colors duration-200 group-hover:bg-black">
        <svg
          viewBox="0 0 48 43"
          className={`absolute h-4 w-[21px] transition-opacity duration-200 ${
            copied ? "opacity-0" : "opacity-100"
          }`}
          fill="none"
          aria-hidden
        >
          <path
            d="M 0 10.251 C 0 5.419 0 3.003 1.501 1.501 C 3.003 0 5.419 0 10.251 0 L 11.96 0 C 16.792 0 19.208 0 20.71 1.501 C 22.211 3.003 22.211 5.419 22.211 10.251 L 22.211 11.96 C 22.211 16.792 22.211 19.208 20.71 20.71 C 19.208 22.211 16.792 22.211 11.96 22.211 L 10.251 22.211 C 5.419 22.211 3.003 22.211 1.501 20.71 C 0 19.208 0 16.792 0 11.96 Z"
            transform="translate(18.789 16.789)"
            stroke="#F7F7ED"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 25.628 11.96 C 25.624 6.907 25.547 4.291 24.077 2.499 C 23.793 2.153 23.476 1.835 23.13 1.551 C 21.239 0 18.431 0 12.814 0 C 7.197 0 4.389 0 2.499 1.551 C 2.153 1.835 1.835 2.153 1.551 2.499 C 0 4.389 0 7.197 0 12.814 C 0 18.431 0 21.239 1.551 23.13 C 1.835 23.476 2.153 23.793 2.499 24.077 C 4.291 25.547 6.907 25.624 11.96 25.628"
            transform="translate(7 5)"
            stroke="#F7F7ED"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          viewBox="0 0 24 24"
          className={`absolute size-[14px] text-[#F7F7ED] transition-opacity duration-200 ${
            copied ? "opacity-100" : "opacity-0"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M5 12.5 10 17.5 19 7.5" />
        </svg>
      </span>
      <span
        className="text-[22px] leading-none font-bold tracking-[-0.04em] text-[#242424] transition-colors duration-200 group-hover:text-[#616161] md:text-[26px]"
        style={{ fontFamily: FONT_WANTED }}
      >
        {copied ? "Copied!" : phone}
      </span>
    </button>
  );
}

export function SiteFooter() {
  const footerRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const isDesktop = useIsDesktop();
  /** Circle bloom + card scale: desktop only (Kora mobile has none) */
  const enableScrollFx = isDesktop === true && reduceMotion !== true;
  /** Wordmark grow: mobile + desktop */
  const enableWordmarkFx = reduceMotion !== true;

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  // Smooth the scroll progress so scale eases like Kora (not 1:1 jumpy)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: enableScrollFx || enableWordmarkFx ? 55 : 500,
    damping: enableScrollFx || enableWordmarkFx ? 26 : 40,
    mass: 0.55,
    restDelta: 0.0001,
  });

  // BG Circle Expand — desktop only
  const circleScale = useTransform(
    smoothProgress,
    [0, 0.08, 0.22, 0.45, 1],
    enableScrollFx ? [0, 1.1, 3.2, 7, 14] : [14, 14, 14, 14, 14],
  );

  // Outer Container — desktop only (Kora mobile has no shrink/grow)
  const cardScale = useTransform(
    smoothProgress,
    [0, 0.35, 0.65, 0.9, 1],
    enableScrollFx ? [0.85, 0.88, 0.94, 0.99, 1] : [1, 1, 1, 1, 1],
  );

  // FitText — mobile + desktop
  const wordmarkScale = useTransform(
    smoothProgress,
    [0.15, 0.45, 0.75, 0.95],
    enableWordmarkFx ? [0.1, 0.4, 0.82, 1] : [1, 1, 1, 1],
  );

  return (
    <footer
      ref={footerRef}
      id="footer"
      className="relative isolate z-20 w-full"
    >
      {/*
        Desktop only: blooming mint circle.
        Mobile: no circle, no mint frame — cream card sits on page bg (Kora).
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[-100vmax] bottom-0 z-0 hidden overflow-hidden md:block"
      >
        <div className="absolute inset-x-0 top-[100vmax] bottom-0">
          <motion.div
            className="absolute top-1/2 left-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5DC39B] will-change-transform"
            style={{ scale: circleScale }}
          />
        </div>
      </div>

      {/*
        Mobile: side inset so card scale is visible.
        Desktop: inset so mint bloom shows around the card.
      */}
      <div className="relative z-[1] w-full px-3 pt-2.5 pb-4 sm:px-3.5 md:px-5 md:pt-4 md:pb-7">
        <motion.div
          className="flex w-full origin-center flex-col overflow-hidden rounded-[44px] bg-[#F5F5E9] will-change-transform md:rounded-[40px]"
          style={{ scale: cardScale }}
        >
          {/* Outer Container — padding-top only: 120 / 90 / 60 */}
          <div className="flex w-full flex-col pt-[60px] md:pt-[90px] xl:pt-[120px]">
            {/*
              Inside Container — max 1600, gap 80, pad 40
              Bottom row is last child → flush to card floor (no bottom pad)
            */}
            <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-[50px] px-5 md:gap-[60px] md:px-8 xl:gap-20 xl:px-10">
              <div className="grid w-full grid-cols-1 items-start gap-x-[50px] gap-y-8 lg:grid-cols-2 lg:gap-y-12">
                {/* Logo */}
                <div className="order-1 lg:order-none lg:col-start-1 lg:row-start-1">
                  <Link href="/" aria-label="홈" className="inline-flex w-fit">
                    <Image
                      src="/images/logo.black.png"
                      alt="법무법인 이로운 파트너스"
                      width={2182}
                      height={628}
                      className="h-9 w-auto object-contain md:h-10"
                      style={{ width: "auto" }}
                    />
                  </Link>
                </div>

                {/* Pitch + contact — spans logo + address rows on desktop */}
                <div
                  className="order-2 flex w-full flex-col gap-12 scroll-mt-28 lg:order-none lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:gap-14"
                >
                  <div className="flex flex-col gap-6">
                  <p
                    className="max-w-[600px] text-[20px] leading-[1.45] font-[650] tracking-[-0.04em] text-[#242424] md:text-[24px]"
                    style={{ fontFamily: FONT_WANTED }}
                  >
                    <span className="text-[#616161]">
                      일상의 회복을 위한 법률 파트너.
                    </span>
                    <br />
                    따뜻하고 이로운 변호사가 함께하겠습니다.
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-full">
                      <Image
                        src="/images/faq/avatar-ceo-v4.png"
                        alt="이창재 대표변호사"
                        fill
                        sizes="128px"
                        quality={100}
                        className="object-cover object-[center_20%]"
                      />
                    </div>
                    <div className="flex flex-col gap-0.5" style={{ fontFamily: FONT_WANTED }}>
                      <p className="text-[15px] leading-none font-semibold tracking-[-0.03em] text-[#242424] md:text-[16px]">
                        이창재 대표변호사
                      </p>
                      <p lang="en" className="text-[13px] leading-none font-medium tracking-[-0.02em] text-[#616161] md:text-[14px]">
                        Changjae Lee
                      </p>
                    </div>
                  </div>
                  </div>

                  <div className="flex flex-col items-start gap-3">
                    <a
                      href="mailto:consult@erounpartners.com"
                      lang="en"
                      className="text-[13px] leading-none font-semibold tracking-[-0.03em] text-[#616161] transition-colors hover:text-[#242424] md:text-[16px]"
                      style={{ fontFamily: FONT_WANTED }}
                    >
                      consult@erounpartners.com
                    </a>
                    <CopyPhoneRow phone="1800-9730" />
                  </div>
                </div>

                {/* Address — desktop only */}
                <div className="order-5 hidden max-w-[520px] lg:order-none lg:col-start-1 lg:row-start-2 lg:block">
                  <p
                    lang="en"
                    className="text-[14px] font-semibold tracking-[-0.02em] text-[#616161]"
                    style={{ fontFamily: FONT_WANTED }}
                  >
                    Address
                  </p>
                  <div
                    className="mt-2 space-y-1 text-[13px] leading-[1.5] font-semibold tracking-[-0.025em] text-black md:mt-3 md:text-[15px]"
                    style={{ fontFamily: FONT_WANTED }}
                  >
                    <p>
                      서울주사무소 서울 강남구 청담동 53-4 파라곤빌딩 5층
                    </p>
                    <p>
                      남양주분사무소 경기 남양주시 다산중앙로82번안길 152
                      중앙법조타워 2층 202호
                    </p>
                  </div>
                </div>

                {/* Socials + Legal (left) | Navigation (right, top-aligned with Socials) */}
                <div className="order-4 flex flex-col gap-10 md:gap-12 lg:order-none lg:col-start-1 lg:row-start-3">
                  <div>
                    <p
                      lang="en"
                      className="text-[14px] font-semibold tracking-[-0.02em] text-[#616161]"
                      style={{ fontFamily: FONT_WANTED }}
                    >
                      Socials
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2.5">
                      {SOCIAL_LINKS.map((social) => (
                        <SocialButton
                          key={social.label}
                          href={social.href}
                          label={social.label}
                          path={social.path}
                          nudgeX={"nudgeX" in social ? social.nudgeX : 0}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <p
                      lang="en"
                      className="text-[14px] font-semibold tracking-[-0.02em] text-[#616161]"
                      style={{ fontFamily: FONT_WANTED }}
                    >
                      Legal
                    </p>
                    <div
                      className="mt-3 flex flex-row flex-wrap items-center gap-x-4 gap-y-1 text-[13px] leading-[1.5] font-semibold tracking-[-0.025em] text-black md:text-[15px]"
                      style={{ fontFamily: FONT_WANTED }}
                    >
                      <Link
                        href="/privacy"
                        className="transition-opacity hover:opacity-70"
                      >
                        개인정보처리방침
                      </Link>
                      <Link
                        href="/terms"
                        className="transition-opacity hover:opacity-70"
                      >
                        이용약관
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="order-3 lg:order-none lg:col-start-2 lg:row-start-3">
                  <p
                    lang="en"
                    className="text-[14px] font-semibold tracking-[-0.02em] text-[#616161]"
                    style={{ fontFamily: FONT_WANTED }}
                  >
                    Navigation
                  </p>
                  <ul className="mt-3 flex flex-col gap-0.5">
                    {SITE_NAV.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="group inline-flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-2.5 -ml-2.5 text-[17px] font-semibold tracking-[-0.02em] text-[#242424] transition-colors duration-200 hover:bg-[#5DC39B] hover:text-[#F5F5E9] md:text-[22px] md:font-bold"
                          style={{ fontFamily: FONT_WANTED }}
                        >
                          <span className="size-1.5 shrink-0 rounded-full bg-[#242424] transition-colors duration-200 group-hover:bg-[#F5F5E9]" />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/*
                Bottom — Kora FitText:
                - Full size in layout, scales 0.1→1 with origin bottom-left
                  so the wordmark stays glued to the cream card floor while growing
              */}
              <div className="relative grid w-full grid-cols-1 items-end md:grid-cols-4 md:gap-x-[50px]">
                <div className="relative min-w-0 overflow-x-clip md:col-span-3">
                  {/* Invisible spacer keeps layout height at full size */}
                  <p
                    aria-hidden
                    lang="en"
                    className="invisible w-full whitespace-nowrap text-[clamp(118px,28vw,180px)] leading-[0.68] font-semibold tracking-[-0.05em] md:text-[clamp(100px,18vw,400px)]"
                    style={{ fontFamily: FONT_WANTED }}
                  >
                    Eroun
                  </p>
                  <motion.p
                    lang="en"
                    className="absolute bottom-0 left-0 w-full origin-bottom-left whitespace-nowrap text-[clamp(118px,28vw,180px)] leading-[0.68] font-semibold tracking-[-0.05em] text-[#5DC39B] select-none will-change-transform md:text-[clamp(100px,18vw,400px)]"
                    style={{
                      fontFamily: FONT_WANTED,
                      scale: wordmarkScale,
                    }}
                  >
                    Eroun
                  </motion.p>
                </div>

                <div
                  className="relative z-[1] flex flex-col items-start gap-0.5 pb-5 text-[12px] leading-[1.5] font-medium tracking-[-0.025em] text-[#616161] max-md:order-first max-md:mt-2 max-md:mb-9 max-md:pb-0 md:items-end md:self-end md:text-right md:text-[13px] md:font-semibold"
                  style={{ fontFamily: FONT_WANTED }}
                >
                  <p>© 2026 법무법인 이로운 파트너스 <span lang="en">All rights reserved.</span></p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
