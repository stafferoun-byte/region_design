"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import "@/styles/kuemmerlein-tiles.css";

const FONT =
  '"Wanted Sans Variable", "Wanted Sans", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';

const PHONE = "1800-9730";
const EMAIL = "legal@erounlaw.com";

const easeOut = [0.22, 1, 0.36, 1] as const;

/** Kora contact copy icon — mint circle + overlapping squares */
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
        style={{ fontFamily: FONT }}
      >
        {copied ? "Copied!" : phone}
      </span>
    </button>
  );
}

/**
 * Location page — insights header + Kora contact info row
 * @see https://kora.framer.media/contact
 */
export function LocationSection() {
  const ref = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const headerInView = useInView(headerRef, { once: true, amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const show = inView || !!reduceMotion;
  const showHeader = headerInView || !!reduceMotion;

  const appear = {
    initial: reduceMotion ? false : ({ opacity: 0, y: 14 } as const),
    animate: showHeader
      ? ({ opacity: 1, y: 0 } as const)
      : ({ opacity: 0, y: 14 } as const),
  };

  return (
    <section ref={ref} id="location" aria-labelledby="location-heading">
      <div className="kuem-insights">
        <div className="kuem-insights__pad">
          <header ref={headerRef}>
            <motion.h1
              id="location-heading"
              className="kuem-insights__title will-change-[opacity,transform]"
              initial={appear.initial}
              animate={appear.animate}
              transition={{
                duration: reduceMotion ? 0 : 0.85,
                ease: easeOut,
              }}
            >
              오시는길.
            </motion.h1>
            <motion.p
              className="kuem-insights__lead will-change-[opacity,transform]"
              initial={appear.initial}
              animate={appear.animate}
              transition={{
                duration: reduceMotion ? 0 : 0.85,
                ease: easeOut,
                delay: reduceMotion ? 0 : 0.1,
              }}
            >
              가까운 사무소에서 편안하게 상담받으세요.
            </motion.p>
          </header>

          {/* Kora contact row — contact left; offices grouped closer on the right */}
          <motion.div
            className="mt-[calc(var(--margin_m)+72px)] ml-[var(--insights-inset-x)] flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:pr-[min(11vw,168px)]"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{
              duration: reduceMotion ? 0 : 0.65,
              delay: reduceMotion ? 0 : 0.12,
              ease: easeOut,
            }}
          >
            {/* Contact — aligns under “오시는길.” */}
            <div className="flex shrink-0 flex-col gap-4">
              <a
                href={`mailto:${EMAIL}`}
                className="text-[15px] leading-none font-semibold tracking-[-0.03em] text-[#616161] transition-colors hover:text-[#242424] md:text-[16px]"
                style={{ fontFamily: FONT }}
              >
                {EMAIL}
              </a>
              <CopyPhoneRow phone={PHONE} />
            </div>

            {/* 서울 + 남양주 — tighter pair */}
            <div className="flex flex-col gap-8 sm:flex-row sm:gap-10 md:gap-12 lg:gap-14">
              <div className="min-w-[9.5rem]">
                <p
                  className="text-[13px] leading-none font-semibold tracking-[-0.03em] text-[#616161] md:text-[14px]"
                  style={{ fontFamily: FONT }}
                >
                  서울주사무소
                </p>
                <div
                  className="mt-3.5 space-y-1 text-[15px] leading-[1.4] font-bold tracking-[-0.035em] break-keep text-[#242424] md:text-[16px]"
                  style={{ fontFamily: FONT }}
                >
                  <p>2026. 9 개소예정</p>
                </div>
              </div>

              <div>
                <p
                  className="text-[13px] leading-none font-semibold tracking-[-0.03em] text-[#616161] md:text-[14px]"
                  style={{ fontFamily: FONT }}
                >
                  남양주분사무소
                </p>
                <div
                  className="mt-3.5 max-w-[20em] space-y-0.5 text-[15px] leading-[1.4] font-bold tracking-[-0.035em] break-keep text-[#242424] md:text-[16px]"
                  style={{ fontFamily: FONT }}
                >
                  <p>경기 남양주시 다산중앙로82번안길 152</p>
                  <p>중앙법조타워 2층 202호</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
