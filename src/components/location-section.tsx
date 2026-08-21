"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const FONT =
  '"Wanted Sans Variable", "Wanted Sans", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';

const OFFICES = [
  {
    label: "서울주사무소",
    detail: "2026. 9 개소예정",
  },
  {
    label: "남양주분사무소",
    detail:
      "경기 남양주시 다산중앙로82번안길 152 중앙법조타워 2층 202호",
  },
] as const;

export function LocationSection() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      id="location"
      className="relative w-full px-5 pt-10 pb-16 md:px-10 md:pt-14 md:pb-24 xl:px-12"
      aria-labelledby="location-heading"
    >
      <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-10 md:gap-14">
        <motion.div
          initial={
            reduceMotion ? false : { opacity: 0.001, y: 16, filter: "blur(5px)" }
          }
          animate={
            inView || reduceMotion
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0.001, y: 16, filter: "blur(5px)" }
          }
          transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="mb-3 text-[14px] font-semibold tracking-[-0.02em] text-[#616161]"
            style={{ fontFamily: FONT }}
          >
            Location
          </p>
          <h1
            id="location-heading"
            className="max-w-[14em] text-[clamp(32px,4.5vw,56px)] leading-[1.12] font-bold tracking-[-0.045em] break-keep text-[#292929]"
            style={{ fontFamily: FONT }}
          >
            오시는길
          </h1>
          <p
            className="mt-5 max-w-[36em] text-[17px] leading-[1.55] font-medium tracking-[-0.03em] text-[#616161] md:text-[20px]"
            style={{ fontFamily: FONT }}
          >
            가까운 사무소에서 편안하게 상담받으세요.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {OFFICES.map((office, i) => (
            <motion.div
              key={office.label}
              className="rounded-[30px] bg-[#F5F5E9] px-7 py-8 md:px-9 md:py-10"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={
                inView || reduceMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{
                duration: reduceMotion ? 0 : 0.55,
                delay: reduceMotion ? 0 : 0.08 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <p
                className="text-[14px] font-semibold tracking-[-0.02em] text-[#5DC39B]"
                style={{ fontFamily: FONT }}
              >
                {office.label}
              </p>
              <p
                className="mt-3 text-[18px] leading-[1.45] font-semibold tracking-[-0.03em] break-keep text-[#292929] md:text-[20px]"
                style={{ fontFamily: FONT }}
              >
                {office.detail}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="overflow-hidden rounded-[30px] bg-[#E8E8E0]">
          <div className="flex aspect-[16/9] w-full items-center justify-center px-6 md:aspect-[21/9]">
            <p
              className="text-center text-[15px] font-semibold tracking-[-0.02em] text-[#616161] md:text-[16px]"
              style={{ fontFamily: FONT }}
            >
              지도는 서울주사무소 개소 후 안내됩니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
