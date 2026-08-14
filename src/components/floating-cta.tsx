"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const FONT =
  '"Wanted Sans Variable", "Wanted Sans", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';

/** Kora tokens */
const CREAM = "#F7F7ED";
const WHITE = "#FFFFFA";
const ARROW_BG = "#F5F5E9";
const INK = "#242424";
const MUTED = "#616161";
const ACCENT = "#5DC39B";

/**
 * Case Study CTA card — placed by parent (not viewport-fixed).
 * Outer: cream #F7F7ED, 450w, pad/gap 10, radius 30.
 * Image flex:1 · Right white #FFFFFA flex:1.75, radius 20.
 * Hover: arrow → mint + white, scale 1.3.
 */
export function FloatingCta() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setVisible(true), reduceMotion ? 0 : 600);
    return () => window.clearTimeout(t);
  }, [reduceMotion]);

  return (
    <>
      {/* Mobile compact */}
      <motion.a
        href="#consult"
        aria-label="상담 예약하기"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{
          duration: reduceMotion ? 0 : 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="flex items-center gap-3 rounded-full py-2.5 pr-4 pl-2.5 shadow-[0_12px_32px_rgba(0,0,0,0.16)] md:hidden"
        style={{ backgroundColor: CREAM, fontFamily: FONT }}
      >
        <span
          className="grid size-9 place-items-center rounded-full text-[12px] font-bold text-white"
          style={{ backgroundColor: INK }}
        >
          상담
        </span>
        <span
          className="text-[13px] font-semibold tracking-[-0.02em]"
          style={{ color: INK }}
        >
          지금 상담 예약
        </span>
        <ArrowRight className="size-4" style={{ color: INK }} strokeWidth={2.2} />
      </motion.a>

      {/* Desktop — Kora proportions */}
      <motion.a
        href="#consult"
        aria-label="상담 예약하기"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        initial={
          reduceMotion ? false : { opacity: 0, y: 10, scale: 0.9 }
        }
        animate={
          visible
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 10, scale: 0.9 }
        }
        transition={{
          duration: reduceMotion ? 0 : 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="hidden text-left outline-none md:block"
        style={{ fontFamily: FONT }}
      >
        <div
          className="flex w-[450px] flex-row items-stretch gap-[10px] rounded-[30px] p-[10px] no-underline shadow-[0_18px_50px_rgba(0,0,0,0.14)]"
          style={{ backgroundColor: CREAM }}
        >
          {/* Image — flex:1 (~153px), stretch, radius 20; blurs on card hover */}
          <div className="relative w-px min-w-0 flex-[1_0_0] self-stretch overflow-hidden rounded-[20px]">
            <motion.div
              className="absolute inset-0"
              initial={false}
              animate={{
                filter: reduceMotion
                  ? "blur(0px)"
                  : hovered
                    ? "blur(5px)"
                    : "blur(0px)",
                scale: reduceMotion ? 1 : hovered ? 1.04 : 1,
              }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Native img — full-res, no Next Image recompression */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/cta/consult-hero.png"
                alt=""
                className="absolute inset-0 h-full w-full scale-[1.25] object-cover object-[32%_38%]"
                draggable={false}
              />
            </motion.div>
            <div className="absolute inset-0 z-[1] flex items-start justify-center pt-[14%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/eroun-logo.png"
                alt=""
                className="h-[30px] w-auto brightness-0 invert"
                draggable={false}
              />
            </div>
          </div>

          {/* Right — white panel flex:1.75, radius 20 */}
          <div
            className="flex w-px min-w-0 flex-[1.75_0_0] flex-col overflow-hidden rounded-[20px] text-left"
            style={{ backgroundColor: WHITE, textAlign: "left" }}
          >
            <div className="flex w-full flex-col gap-[10px] px-5 pt-5 pb-4 text-left">
              <span
                className="w-fit rounded-full px-4 py-2 text-[15px] leading-none font-semibold tracking-[-0.025em]"
                style={{ backgroundColor: INK, color: WHITE }}
              >
                상담 신청하기
              </span>
              <p
                className="w-full text-[13px] leading-[1.45] font-semibold tracking-[-0.025em]"
                style={{ color: INK }}
              >
                사건 초기부터 종결까지,
                <br />
                이로운과 함께하면 결과가 달라집니다.
              </p>
            </div>

            <div
              className="mt-auto flex w-full items-center gap-5 border-t px-5 py-5"
              style={{ borderColor: "rgba(227, 227, 227, 0.45)" }}
            >
              <div className="flex min-w-0 flex-1 items-center gap-[11px] text-left">
                <span
                  className="text-[25px] leading-[1.3] font-semibold tracking-[-0.04em]"
                  style={{ color: INK }}
                >
                  47%
                </span>
                <span
                  className="text-[13px] leading-[1.35] font-semibold tracking-[-0.025em]"
                  style={{ color: MUTED }}
                >
                  평균 승소·조정
                  <br />
                  성공률 상승
                </span>
              </div>

              {/*
                Kora arrow: black slides out right, white slides in from left,
                mint circle expands underneath, whole button scales 1.3.
              */}
              <motion.span
                className="relative flex size-[28px] shrink-0 items-center justify-center overflow-hidden rounded-full"
                animate={
                  reduceMotion
                    ? undefined
                    : { scale: hovered ? 1.3 : 1 }
                }
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ backgroundColor: ARROW_BG }}
              >
                <motion.span
                  aria-hidden
                  className="absolute rounded-full"
                  initial={false}
                  animate={
                    reduceMotion
                      ? {
                          width: hovered ? 28 : 2,
                          height: hovered ? 28 : 2,
                          opacity: hovered ? 1 : 0,
                        }
                      : {
                          width: hovered ? 28 : 2,
                          height: hovered ? 28 : 2,
                          left: hovered ? 0 : -2,
                          top: hovered ? 0 : "50%",
                          y: hovered ? 0 : "-50%",
                        }
                  }
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  style={{ backgroundColor: ACCENT }}
                />

                {/* Start — exits right */}
                <motion.span
                  className="relative z-[1] grid place-items-center"
                  initial={false}
                  animate={
                    reduceMotion
                      ? { opacity: hovered ? 0 : 1 }
                      : {
                          x: hovered ? 18 : 0,
                          opacity: hovered ? 0 : 1,
                        }
                  }
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ArrowRight
                    className="size-[13px]"
                    strokeWidth={2.4}
                    style={{ color: INK }}
                  />
                </motion.span>

                {/* Hover — enters from left */}
                <motion.span
                  className="absolute inset-0 z-[1] grid place-items-center"
                  initial={false}
                  animate={
                    reduceMotion
                      ? { opacity: hovered ? 1 : 0 }
                      : {
                          x: hovered ? 0 : -18,
                          opacity: hovered ? 1 : 0,
                        }
                  }
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ArrowRight
                    className="size-[13px]"
                    strokeWidth={2.4}
                    style={{ color: WHITE }}
                  />
                </motion.span>
              </motion.span>
            </div>
          </div>
        </div>
      </motion.a>
    </>
  );
}
