"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { HeroNav } from "@/components/hero-nav";

/**
 * Practice top hero — Kora-style headline + trust row over photo
 * Main: h-svh · inset-5 · rounded-[40px] · HeroNav overlay sibling
 */

const FONT =
  '"Wanted Sans Variable", "Wanted Sans", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';

const ACCENT = "#5DC39B";
const easeOut = [0.22, 1, 0.36, 1] as const;

const HERO_BG = "/images/practice/hero-bg.png?v=3";

const TRUST_AVATARS = [
  "/images/c2ad675e-3571-4adc-b8fe-7bb0aa39fd56.png",
  "/images/9c00079f-e305-4291-b185-cb7f98589029.png",
  "/images/2bc8a0dd-2ed6-4203-b843-bd26675b7373.png",
  "/images/1adec6e9-d677-4e1f-9556-ea97118afaba.png",
] as const;

function StarIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill={ACCENT}
      aria-hidden
    >
      <path d="M12 2.5l2.9 6.1 6.7.8-5 4.7 1.3 6.6L12 17.8 6.1 20.7 7.4 14.1l-5-4.7 6.7-.8L12 2.5z" />
    </svg>
  );
}

export function PracticeHeroSection() {
  const reduceMotion = useReducedMotion();

  const appear = (delay = 0) => ({
    initial: reduceMotion ? false : ({ opacity: 0, y: 18 } as const),
    animate: { opacity: 1, y: 0 } as const,
    transition: {
      duration: reduceMotion ? 0 : 0.65,
      ease: easeOut,
      delay: reduceMotion ? 0 : delay,
    },
  });

  return (
    <section
      className="relative z-0 h-svh w-full bg-[#FCFCFA]"
      style={{ fontFamily: FONT }}
      aria-labelledby="practice-hero-heading"
    >
      <div className="relative h-full w-full overflow-hidden">
        <div className="absolute inset-5 overflow-hidden rounded-[40px]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("${HERO_BG}")`,
              backgroundSize: "cover",
              backgroundPosition: "50% 50%",
              backgroundRepeat: "no-repeat",
            }}
            aria-hidden
          />

          <div className="absolute inset-0 z-[1] flex items-center px-8 sm:px-10 md:px-12 xl:px-14">
            <div className="flex max-w-[720px] flex-col gap-5 md:gap-6">
              <motion.h1
                id="practice-hero-heading"
                {...appear(0.05)}
                className="text-[clamp(34px,5.2vw,68px)] leading-[1.12] font-bold tracking-[-0.05em] break-keep text-white will-change-[opacity,transform] [text-shadow:0_1px_16px_rgba(0,0,0,0.3)]"
              >
                좋은 선택이,
                <br />
                더 나은 결과를 만듭니다.
              </motion.h1>

              <motion.p
                {...appear(0.14)}
                className="max-w-[34em] text-[16px] leading-[1.6] font-medium tracking-[-0.02em] break-keep text-white md:text-[19px] md:leading-[1.55] [text-shadow:0_1px_12px_rgba(0,0,0,0.35)]"
              >
                자원이 많은 쪽이 이기는 게 아닙니다.
                <br />
                방향이 분명한 쪽이 이깁니다.
                <br />
                이로운은 쟁점을 선명히 잡고, 끝까지 함께합니다.
              </motion.p>

              <motion.div
                {...appear(0.22)}
                className="mt-1 flex flex-wrap items-center gap-3 md:mt-2 md:gap-4"
              >
                <div className="flex items-center pl-1">
                  {TRUST_AVATARS.map((src, i) => (
                    <span
                      key={src}
                      className="relative -ml-2.5 size-9 overflow-hidden rounded-full border-2 border-white/90 first:ml-0 md:size-10"
                      style={{ zIndex: TRUST_AVATARS.length - i }}
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        sizes="40px"
                        className="object-cover object-top"
                      />
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-0.5" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>

                <p className="text-[13px] font-medium tracking-[-0.02em] text-white/85 md:text-[14px]">
                  37,000+ 상담이 쌓은 신뢰
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        <HeroNav />
      </div>
    </section>
  );
}
