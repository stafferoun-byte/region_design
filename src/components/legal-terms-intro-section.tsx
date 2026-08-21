"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const FONT =
  '"Wanted Sans Variable", "Wanted Sans", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';

export function LegalTermsIntroSection() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.35 });

  return (
    <section
      ref={sectionRef}
      className="relative w-full px-5 pt-[70px] pb-[8px] md:px-10 md:pt-[100px] md:pb-[12px] xl:px-[60px] xl:pt-[120px] xl:pb-[16px]"
      style={{ fontFamily: FONT }}
    >
      <div className="mx-auto flex w-full max-w-[1600px] flex-col px-6 md:px-10 xl:px-12">
        <motion.h2
          initial={
            reduceMotion
              ? false
              : { opacity: 0.001, y: 2, scale: 0.9, filter: "blur(5px)" }
          }
          animate={
            inView || reduceMotion
              ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
              : { opacity: 0.001, y: 2, scale: 0.9, filter: "blur(5px)" }
          }
          transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(30px,3.8vw,48px)] leading-[1.28] font-bold tracking-[-0.05em] break-keep text-black will-change-[opacity,transform,filter]"
        >
          변호사에게는 익숙한 용어지만,
          <br />
          당신에게는 처음일 수 있으니까
        </motion.h2>
      </div>
    </section>
  );
}
