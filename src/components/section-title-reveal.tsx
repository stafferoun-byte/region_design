"use client";

import { useEffect, useRef, useState, type Ref } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";

export type TitleWord = {
  text: string;
  color?: string;
  /** Omit space after this word (e.g. "변호사들" + "의") */
  glue?: boolean;
  fontSize?: string;
  lineHeight?: string;
};

const easeOut = [0.22, 1, 0.36, 1] as const;

/** Wait out the page circle wipe so an above-the-fold subtitle is seen staggering in. */
export function useAfterPageWipe(delay = 680) {
  const reduceMotion = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), reduceMotion ? 0 : delay);
    return () => window.clearTimeout(id);
  }, [reduceMotion, delay]);

  return ready;
}

type WordRevealProps = {
  id?: string;
  lines: readonly (readonly TitleWord[])[];
  className?: string;
  style?: React.CSSProperties;
  inView: boolean;
  reduceMotion: boolean | null;
  ariaLabel?: string;
  as?: "h2" | "p" | "span" | "div";
  /** Delay before the first word (e.g. stagger list items) */
  delay?: number;
  ref?: Ref<HTMLElement>;
};

/** Word-by-word reveal — matches WishTitleReveal / Team TitleReveal */
export function WordReveal({
  id,
  lines,
  className,
  style,
  inView,
  reduceMotion,
  ariaLabel,
  as = "span",
  delay = 0.02,
  ref,
}: WordRevealProps) {
  const container: Variants = {
    hidden: {},
    show: {
      transition: reduceMotion
        ? { duration: 0 }
        : { staggerChildren: 0.08, delayChildren: delay },
    },
  };

  const word: Variants = reduceMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        show: { opacity: 1, y: 0 },
      }
    : {
        hidden: { opacity: 0, y: 12 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: easeOut },
        },
      };

  const renderLine = (words: readonly TitleWord[]) =>
    words.map((w, i) => (
      <span key={`${w.text}-${i}`}>
        <motion.span
          variants={word}
          className="inline-block"
          style={{ color: w.color ?? "#000000", fontSize: w.fontSize, lineHeight: w.lineHeight }}
        >{w.text}</motion.span>{i < words.length - 1 && !w.glue ? " " : null}
      </span>
    ));

  const label =
    ariaLabel ?? lines.flatMap((line) => line.map((w) => w.text)).join(" ");

  const Component =
    as === "h2"
      ? motion.h2
      : as === "p"
        ? motion.p
        : as === "div"
          ? motion.div
          : motion.span;

  return (
    <Component
      ref={ref as Ref<HTMLDivElement>}
      id={id}
      className={className}
      style={style}
      variants={container}
      initial="hidden"
      animate={inView || reduceMotion ? "show" : "hidden"}
      aria-label={label}
    >
      {lines.map((line, lineIndex) => (
        <span key={lineIndex}>
          {lineIndex > 0 ? <br /> : null}
          {renderLine(line)}
        </span>
      ))}
    </Component>
  );
}

type SectionTitleRevealProps = Omit<WordRevealProps, "as">;

export function SectionTitleReveal(props: SectionTitleRevealProps) {
  return <WordReveal {...props} as="h2" />;
}

/** Section headline that plays the homepage subtitle reveal when it scrolls into view. */
export function InViewSectionTitle({
  lines,
  className,
  ariaLabel,
  as = "h2",
}: {
  lines: readonly (readonly (string | { text: string; color?: string; glue?: boolean })[])[];
  className?: string;
  ariaLabel?: string;
  as?: "h2" | "p" | "span";
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.25,
    margin: "0px 0px -6% 0px",
  });
  const reduceMotion = useReducedMotion();

  return (
    <WordReveal
      ref={ref}
      as={as}
      className={className}
      lines={lines.map((line) =>
        line.map((word) =>
          typeof word === "string"
            ? { text: word, color: "inherit" }
            : { text: word.text, color: word.color ?? "inherit", glue: word.glue },
        ),
      )}
      inView={!!inView}
      reduceMotion={reduceMotion}
      ariaLabel={ariaLabel}
    />
  );
}
