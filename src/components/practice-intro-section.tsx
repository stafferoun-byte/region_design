"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

/**
 * Practice services list — hover bar + tilted preview image
 * Layout matched to reference services strip
 */

const FONT =
  '"Wanted Sans Variable", "Wanted Sans", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';

const INK = "#111111";
const MUTED = "#8A8A8A";

type ServiceItem = {
  id: string;
  label: string;
  href: string;
  image: string;
};

const SERVICES: ServiceItem[] = [
  {
    id: "inheritance",
    label: "Inheritance",
    href: "#inheritance",
    image: "/images/practice/inheritance.png",
  },
  {
    id: "criminal",
    label: "Criminal Law",
    href: "#criminal",
    image: "/images/practice/criminal.png",
  },
  {
    id: "realestate",
    label: "Real Estate",
    href: "#realestate",
    image: "/images/practice/realestate.png",
  },
  {
    id: "family",
    label: "Divorce & Family Law",
    href: "#divorce",
    image: "/images/practice/family.png",
  },
];

export function PracticeIntroSection() {
  const reduceMotion = useReducedMotion();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section
      className="relative w-full overflow-x-clip bg-[#FCFCFA]"
      style={{ fontFamily: FONT }}
      aria-labelledby="practice-intro-heading"
    >
      <div className="mx-auto w-full max-w-[1480px] px-5 pt-16 pb-10 md:px-10 md:pt-20 md:pb-12 xl:px-12 xl:pt-24 xl:pb-14">
        {/* Header row */}
        <div className="mb-14 grid grid-cols-1 gap-6 md:mb-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_auto] md:items-start md:gap-8 xl:mb-20">
          <p
            id="practice-intro-heading"
            className="max-w-[20em] text-[13px] leading-[1.55] font-medium tracking-[-0.02em] break-keep md:text-[14px]"
            style={{ color: MUTED }}
          >
            상속부터 형사·이혼·부동산까지,
            <br />
            쟁점을 선명히 잡고 끝까지 함께합니다.
          </p>
          <p
            className="text-[13px] leading-[1.55] font-medium tracking-[-0.02em] break-keep md:text-center md:text-[14px]"
            style={{ color: MUTED }}
          >
            이로운이 다루는 업무분야를 살펴보세요.
          </p>
          <p
            className="text-[14px] leading-none font-bold tracking-[-0.03em] md:pt-0.5 md:justify-self-end md:text-[15px]"
            style={{ color: INK }}
            aria-hidden
          >
            (02)
          </p>
        </div>
      </div>

      <ul
        className="relative w-full"
        onMouseLeave={() => setHoveredId(null)}
      >
        {SERVICES.map((item) => {
          const isActive = hoveredId === item.id;

          return (
            <li
              key={item.id}
              className="relative"
              onMouseEnter={() => setHoveredId(item.id)}
              onFocus={() => setHoveredId(item.id)}
            >
              {/* Full-bleed black hover bar */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-screen -translate-x-1/2 transition-colors duration-300 ease-out"
                style={{
                  backgroundColor: isActive ? "#000000" : "transparent",
                }}
              />

              <a
                href={item.href}
                className="relative z-[1] mx-auto flex min-h-[72px] w-full max-w-[1480px] items-center justify-center px-5 py-3 no-underline transition-colors duration-300 md:min-h-[84px] md:px-10 md:py-3.5 xl:min-h-[92px] xl:px-12 xl:py-4"
                style={{ color: isActive ? "#FFFFFF" : INK }}
              >
                <span className="text-center text-[clamp(26px,7.2vw,82px)] leading-[1.05] font-semibold tracking-[-0.055em] break-words">
                  {item.label}
                </span>
              </a>

              {/* Tilted preview — only on hover, desktop+ */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute top-1/2 right-[18%] z-[3] hidden w-[min(14vw,150px)] -translate-y-1/2 md:block xl:right-[22%] xl:w-[min(12vw,168px)]"
                initial={false}
                animate={
                  isActive
                    ? { opacity: 1, rotate: -6, scale: 1, x: 0 }
                    : {
                        opacity: 0,
                        rotate: reduceMotion ? -6 : -12,
                        scale: reduceMotion ? 1 : 0.92,
                        x: reduceMotion ? 0 : 16,
                      }
                }
                transition={{
                  duration: reduceMotion ? 0 : 0.32,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div
                  className="relative aspect-[3/4] overflow-hidden rounded-[3px] bg-[#eee]"
                  style={{
                    boxShadow:
                      "0 16px 36px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.08)",
                  }}
                >
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="168px"
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </li>
          );
        })}
      </ul>

      <div className="h-16 md:h-20 xl:h-24" aria-hidden />
    </section>
  );
}
