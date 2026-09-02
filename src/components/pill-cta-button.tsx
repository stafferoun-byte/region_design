"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";

const FONT =
  '"Wanted Sans Variable", "Wanted Sans", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';

const spring = {
  type: "spring" as const,
  stiffness: 280,
  damping: 24,
  mass: 0.7,
};

type PillCtaButtonProps = {
  href: string;
  label: string;
  /** Pill background */
  bg?: string;
  /** Default label color */
  cream?: string;
  /** Hover label color */
  dark?: string;
  /** Hover dot color */
  accent?: string;
  /** Bloom fill on hover */
  bloom?: string;
  className?: string;
  compact?: boolean;
};

/** Kora Apply Now — text swap + cream bloom from dot (fixed pill width) */
export function PillCtaButton({
  href,
  label,
  bg = "#3D3D3D",
  cream = "#FFFFFA",
  dark = "#292929",
  accent = "#5DC39B",
  bloom = "#FFFFFA",
  className,
  compact = false,
}: PillCtaButtonProps) {
  const [hovered, setHovered] = useState(false);
  const btnRef = useRef<HTMLDivElement | null>(null);
  const [bloomScale, setBloomScale] = useState(28);

  const measure = () => {
    const el = btnRef.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    const cx = width - 20;
    const cy = height / 2;
    const maxDist = Math.sqrt(cx * cx + cy * cy);
    setBloomScale(Math.ceil(maxDist / 5) + 10);
  };

  const textClass = compact
    ? "whitespace-nowrap text-[14px] leading-[1.5] font-semibold tracking-[-0.03em]"
    : "whitespace-nowrap text-[15px] leading-[1.5] font-semibold tracking-[-0.03em] min-[1200px]:text-[16px]";

  const pillClass = compact
    ? "relative flex items-center gap-[25px] rounded-[40px] px-[15px] py-[10px]"
    : "relative flex items-center gap-[25px] rounded-[40px] px-[18px] py-3";

  return (
    <Link
      href={href}
      onMouseEnter={() => {
        measure();
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      className={`relative inline-flex w-fit no-underline ${className ?? ""}`}
    >
      <motion.div
        ref={btnRef}
        className={`${pillClass} overflow-hidden`}
        initial={false}
        animate={{ backgroundColor: hovered ? bloom : bg }}
        transition={spring}
      >
        {/* Invisible sizer keeps width stable; layers swap in place */}
        <span className={`relative z-[4] block ${textClass}`}>
          <span className="invisible" aria-hidden>
            {label}
          </span>
          <motion.span
            className={`absolute inset-0 ${textClass}`}
            style={{ fontFamily: FONT, color: cream }}
            initial={false}
            animate={
              hovered
                ? { opacity: 0, y: -18, scale: 0.96 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            transition={spring}
          >
            {label}
          </motion.span>
          <motion.span
            className={`absolute inset-0 ${textClass}`}
            style={{ fontFamily: FONT, color: dark }}
            initial={false}
            animate={
              hovered
                ? { opacity: 1, y: 0, scale: 1, rotate: 0 }
                : { opacity: 0, y: 14, scale: 0.96, rotate: -12 }
            }
            transition={spring}
          >
            {label}
          </motion.span>
        </span>

        {/* Fixed 10px slot — cream / accent / bloom never change layout width */}
        <span className="relative z-[2] size-[10px] shrink-0">
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-[30px]"
            style={{ backgroundColor: bloom }}
            initial={false}
            animate={{ scale: hovered ? 0 : 1, opacity: hovered ? 0 : 1 }}
            transition={spring}
          />
          <motion.span
            aria-hidden
            className="absolute inset-0 z-[1] rounded-[30px]"
            style={{ backgroundColor: accent }}
            initial={false}
            animate={{ scale: hovered ? 1 : 0 }}
            transition={spring}
          />
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 rounded-[30px]"
            style={{
              backgroundColor: bloom,
              transformOrigin: "center center",
            }}
            initial={false}
            animate={{ scale: hovered ? bloomScale : 0 }}
            transition={spring}
          />
        </span>
      </motion.div>
    </Link>
  );
}
