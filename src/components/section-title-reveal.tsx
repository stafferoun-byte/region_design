"use client";

import { motion, type Variants } from "framer-motion";

export type TitleWord = {
  text: string;
  color?: string;
  /** Omit space after this word (e.g. "변호사들" + "의") */
  glue?: boolean;
};

const easeOut = [0.22, 1, 0.36, 1] as const;

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
}: WordRevealProps) {
  const container: Variants = {
    hidden: {},
    show: {
      transition: reduceMotion
        ? { duration: 0 }
        : { staggerChildren: 0.055, delayChildren: delay },
    },
  };

  const word: Variants = reduceMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        show: { opacity: 1, y: 0 },
      }
    : {
        hidden: { opacity: 0, y: 8 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, ease: easeOut },
        },
      };

  const renderLine = (words: readonly TitleWord[]) =>
    words.map((w, i) => (
      <span key={`${w.text}-${i}`}>
        <motion.span
          variants={word}
          className="inline-block"
          style={{ color: w.color ?? "#000000" }}
        >
          {w.text}
        </motion.span>
        {i < words.length - 1 && !w.glue ? " " : null}
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

type SectionTitleRevealProps = Omit<WordRevealProps, "as" | "delay">;

export function SectionTitleReveal(props: SectionTitleRevealProps) {
  return <WordReveal {...props} as="h2" />;
}
