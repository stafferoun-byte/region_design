"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import layout from "./network-layout.json";

const FONT =
  '"Wanted Sans Variable", "Wanted Sans", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';

const easeOut = [0.22, 1, 0.36, 1] as const;

const TITLE_LINE_1 = [
  { text: "여러분의", color: "#000000" },
  { text: "소망은", color: "#000000" },
] as const;

const TITLE_LINE_2 = [
  { text: "이로운", color: "#5DC39B" },
  { text: "파트너스", color: "#5DC39B" },
  { text: "변호사들", color: "#5DC39B", glue: true },
  { text: "의", color: "#000000" },
  { text: "소망이기도", color: "#000000" },
  { text: "합니다.", color: "#000000" },
] as const;

const W = layout.W;
const H = layout.H;
const STROKE = 4.25;
const SEG = 3;
const EASE = [0.19, 1, 0.22, 1] as const;

/**
 * Left (0–5): Clay teal / purple / navy assets + positions.
 * Right (6–11): locked — do not change yellow/sky tuning.
 */
const CIRCLE_SRCS = [
  "/images/pastel-teal-woman-sunglasses-head-transparent.png", // 0 mint left
  "/images/pastel-purple-real-male-student-transparent.png", // 1 purple bottom-left
  "/images/navy-young-woman-ponytail-different-v2.png", // 2 dark top-left
  "/images/pastel-purple-natural-baby-v2.png", // 3 purple mid-left
  "/images/navy-smiling-woman-transparent.png", // 4 dark bottom
  "/images/pastel-teal-fresh-female-student-transparent.png", // 5 mint top
  "/images/pastel-yellow-woman-full-v2.png", // 6 CENTER yellow
  "/images/pastel-yellow-natural-woman-60s-transparent.png", // 7 yellow upper-right
  "/images/pastel-skyblue-natural-young-man-transparent.png", // 8 sky bottom
  "/images/pastel-skyblue-man-transparent.png", // 9 sky top-right
  "/images/pastel-yellow-neighbor-man-60s-transparent.png", // 10 yellow bottom-right
  "/images/pastel-skyblue-humble-grandfather-v2.png", // 11 sky far-right
] as const;

const CIRCLES = layout.circles.map((c, i) => ({
  x: c.x,
  y: c.y,
  sizePct: c.sizePct,
  rPx: c.rPx,
  src: CIRCLE_SRCS[i],
}));

const COLORS = {
  sky: "#D9EEF8",
  mint: "#B8EBD9",
  yellow: "#F5EBB8",
  purple: "#D0CFE0",
  dark: "#C5D6EE",
} as const;

/** Same-color only. Right-side sky/yellow defs stay as tuned. */
const LINE_DEFS: {
  st: number;
  ed: number;
  color: string;
  opacity: number;
  sidePos: 1 | -1;
  bend: number;
  delay: number;
  /** Extra horizontal pull on curve (px in artboard space) */
  biasX?: number;
  /** Scale rim inset so dashes meet the visible face disk */
  rimScale?: number;
}[] = [
  // mint — left ↔ top, slightly rounder
  { st: 0, ed: 5, color: COLORS.mint, opacity: 0.9, sidePos: 1, bend: 0.13, delay: 0 },
  // purple — gentler curve
  { st: 1, ed: 3, color: COLORS.purple, opacity: 0.88, sidePos: 1, bend: 0.1, delay: 80 },
  // navy — rounder arc, clear the purple baby
  {
    st: 2,
    ed: 4,
    color: COLORS.dark,
    opacity: 0.85,
    sidePos: 1,
    bend: 0.24,
    biasX: 8,
    delay: 120,
  },
  // sky — top man ↔ grandfather
  {
    st: 9,
    ed: 11,
    color: COLORS.sky,
    opacity: 0.92,
    sidePos: 1,
    bend: 0.1,
    biasX: 6,
    rimScale: 0.95,
    delay: 180,
  },
  // grandfather ↔ bottom man — reach face after grandfather moved right
  {
    st: 11,
    ed: 8,
    color: COLORS.sky,
    opacity: 0.92,
    sidePos: -1,
    bend: 0.14,
    biasX: -12,
    rimScale: 0.95,
    delay: 220,
  },
  // yellow — only upper↔center flipped; center↔man unchanged
  { st: 7, ed: 6, color: COLORS.yellow, opacity: 0.92, sidePos: -1, bend: 0.16, delay: 260 },
  { st: 6, ed: 10, color: COLORS.yellow, opacity: 0.92, sidePos: 1, bend: 0.24, delay: 300 },
];

/**
 * Bubble copy + locked positions (do not nudge without user ask).
 * Scene A — 3 bubbles · Scene B — 2 bubbles
 */
const BUBBLE_SCENES = [
  {
    id: "three",
    holdMs: 1100,
    items: [
      {
        id: "recovery",
        text: "편안한 일상의 회복",
        emoji: "/images/emojis/candle.png",
        x: 12,
        y: 42,
        radius: "0 56px 56px 56px",
        stagger: 0,
      },
      {
        id: "rights",
        text: "정당한 권리를 지키는 것",
        emoji: "/images/emojis/heart.png",
        x: 38,
        y: 76,
        radius: "56px 56px 56px 0",
        stagger: 0.35,
      },
      {
        id: "team",
        text: "함께 걷는 든든한 한 팀",
        emoji: "/images/emojis/clap.png",
        x: 55,
        y: 41,
        radius: "56px 56px 56px 0",
        stagger: 0.7,
      },
    ],
  },
  {
    id: "two",
    holdMs: 1100,
    items: [
      {
        id: "precious",
        text: "가장 소중한 것에 시간을 쓰는 삶",
        emoji: "/images/emojis/sparkles.png",
        x: 46,
        y: 1,
        radius: "56px 56px 0 56px",
        stagger: 0,
      },
      {
        id: "free",
        text: "짐도 불안도 내려놓은 자유로운 마음",
        emoji: "/images/emojis/relieved-face.png",
        x: 28,
        y: 38,
        radius: "56px 56px 56px 0",
        stagger: 0.35,
      },
    ],
  },
] as const;

/** Sharp corner → fold/unfold origin (position coords untouched) */
function bubbleOrigin(radius: string): string {
  const p = radius.split(/\s+/);
  if (p[0] === "0") return "0% 0%";
  if (p[1] === "0") return "100% 0%";
  if (p[2] === "0") return "100% 100%";
  if (p[3] === "0") return "0% 100%";
  return "50% 50%";
}

const ENTER = CIRCLES.map((_, i) => ({
  x: ((i % 3) - 1) * 36 + (i % 2 === 0 ? -16 : 20),
  y: (i % 2 === 0 ? -56 : 44) + (i % 5) * 3,
  s: 0.62 + (i % 4) * 0.06,
  d: (i % 5) * 0.04,
}));

type BuiltLine = {
  d: string;
  points: [number, number][];
  len: number;
  color: string;
  opacity: number;
  delay: number;
};

function toPx(c: { x: number; y: number }) {
  return { x: (c.x / 100) * W, y: (c.y / 100) * H };
}

/** Pull endpoints to circle rims so dashes meet faces, not centers */
function rimPoint(
  from: { x: number; y: number },
  to: { x: number; y: number },
  radius: number,
  rimScale = 1,
) {
  const a = toPx(from);
  const b = toPx(to);
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = Math.hypot(dx, dy) || 1;
  const pad = radius * rimScale + STROKE * 0.35;
  return {
    x: a.x + (dx / dist) * pad,
    y: a.y + (dy / dist) * pad,
  };
}

function buildLine(
  stIdx: number,
  edIdx: number,
  sidePos: number,
  bendRatio: number,
  color: string,
  opacity: number,
  delay: number,
  biasX = 0,
  rimScale = 1,
): BuiltLine {
  const st = CIRCLES[stIdx];
  const ed = CIRCLES[edIdx];
  const a = rimPoint(st, ed, st.rPx, rimScale);
  const b = rimPoint(ed, st, ed.rPx, rimScale);
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = Math.hypot(dx, dy) || 1;
  const ux = dx / dist;
  const uy = dy / dist;
  const bend = dist * bendRatio * sidePos;

  const c1x = a.x + dx / 3 + uy * bend + biasX;
  const c1y = a.y + dy / 3 - ux * bend;
  const c2x = a.x + (2 * dx) / 3 + uy * bend + biasX;
  const c2y = a.y + (2 * dy) / 3 - ux * bend;
  const cubic = `M${a.x} ${a.y} C${c1x} ${c1y} ${c2x} ${c2y} ${b.x} ${b.y}`;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.style.cssText =
    "position:absolute;width:0;height:0;overflow:hidden;pointer-events:none";
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", cubic);
  svg.appendChild(path);
  document.body.appendChild(svg);

  const total = path.getTotalLength();
  const points: [number, number][] = [];
  const parts: string[] = [];
  for (let i = 0; i <= total / SEG; i++) {
    const q = path.getPointAtLength(Math.min(SEG * i, total));
    const X = Math.round(10 * q.x) / 10;
    const Y = Math.round(10 * q.y) / 10;
    points.push([X, Y]);
    parts.push(`${i === 0 ? "M" : "L"}${X} ${Y} `);
  }
  document.body.removeChild(svg);

  return {
    d: parts.join(""),
    points,
    len: total,
    color,
    opacity,
    delay,
  };
}

function wavePath(points: [number, number][], len: number, o: number) {
  // SlackIntro / Clay updateLinesWave — traveling bounce along the curve
  const r = 1 - (2 * o - 1) * (2 * o - 1);
  const amp = Math.max(12, len / 50);
  const phase = -o * Math.max(40, (0.4 * len) / 2.8);
  let tx = 0;
  let ty = 0;
  const out: string[] = [];
  for (let u = 0; u < points.length; u++) {
    const g = u / points.length;
    let f = 2 * (0.9 - Math.pow(4 * g - 2 + 2 - 4 * o, 2));
    if (f < 0) f = 0;
    const v = Math.sin(phase + (0.4 * u) / (0.5 + g)) * r * amp * f;
    if (u > 0) {
      tx = (points[u][0] - points[u - 1][0]) / SEG;
      ty = (points[u][1] - points[u - 1][1]) / SEG;
    }
    out.push(
      `${u === 0 ? "M" : "L"}${points[u][0] + ty * v} ${points[u][1] - tx * v} `,
    );
  }
  return out.join("");
}

function WishTitleReveal({
  inView,
  reduceMotion,
}: {
  inView: boolean;
  reduceMotion: boolean | null;
}) {
  const container: Variants = {
    hidden: {},
    show: {
      transition: reduceMotion
        ? { duration: 0 }
        : { staggerChildren: 0.055, delayChildren: 0.02 },
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

  const renderLine = (
    words: readonly { text: string; color: string; glue?: boolean }[],
  ) =>
    words.map((w, i) => (
      <span key={`${w.text}-${i}`}>
        <motion.span
          variants={word}
          className={
            w.color === "#5DC39B"
              ? "inline-block text-[#5DC39B]"
              : "inline-block text-black"
          }
          style={{ color: w.color }}
        >
          {w.text}
        </motion.span>
        {i < words.length - 1 && !w.glue ? " " : null}
      </span>
    ));

  return (
    <motion.h2
      className="mx-auto max-w-[18em] text-center text-[clamp(30px,3.8vw,48px)] leading-[1.28] font-bold tracking-[-0.05em] break-keep md:max-w-none"
      style={{ fontFamily: FONT }}
      variants={container}
      initial="hidden"
      animate={inView || reduceMotion ? "show" : "hidden"}
      aria-label="여러분의 소망은 이로운 파트너스 변호사들의 소망이기도 합니다."
    >
      {renderLine(TITLE_LINE_1)}
      <br />
      {renderLine(TITLE_LINE_2)}
    </motion.h2>
  );
}

export function WishNetworkSection() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [lines, setLines] = useState<BuiltLine[]>([]);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const linesData = useRef<BuiltLine[]>([]);
  const currentLine = useRef(0);
  const [sceneIdx, setSceneIdx] = useState(0);
  const [bubblesOn, setBubblesOn] = useState(false);

  useEffect(() => {
    const built = LINE_DEFS.map((def) =>
      buildLine(
        def.st,
        def.ed,
        def.sidePos,
        def.bend,
        def.color,
        def.opacity,
        def.delay,
        def.biasX ?? 0,
        def.rimScale ?? 1,
      ),
    );
    linesData.current = built;
    setLines(built);
  }, [layout.circles]);

  useEffect(() => {
    if (!inView || reduceMotion || lines.length === 0) return;
    let cancelled = false;
    let intervalId: number | null = null;

    const runWave = () => {
      if (cancelled) return;
      const all = linesData.current;
      currentLine.current = (currentLine.current + 1) % all.length;
      const idx = currentLine.current;
      const e = all[idx];
      const el = pathRefs.current[idx];
      if (!e || !el) return;

      const t0 = Date.now();
      const dur = Math.max(1400, 2.3 * e.len);
      const end = t0 + dur;

      const tick = () => {
        if (cancelled) return;
        const now = Math.min(Math.max(Date.now(), t0), end);
        const o = (now - t0) / (end - t0 || 1);
        el.setAttribute("d", wavePath(e.points, e.len, o));
        if (o < 0.999) requestAnimationFrame(tick);
        else el.setAttribute("d", e.d);
      };
      requestAnimationFrame(tick);
    };

    const start = window.setTimeout(() => {
      runWave();
      intervalId = window.setInterval(runWave, 2000);
    }, 1750);

    return () => {
      cancelled = true;
      clearTimeout(start);
      if (intervalId != null) clearInterval(intervalId);
    };
  }, [inView, reduceMotion, lines.length]);

  // Bubble loop: scene in (stagger) → hold → scene out → next
  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setBubblesOn(true);
      return;
    }

    let cancelled = false;
    let timer: number | undefined;
    const APPEAR_PAD = 1300;
    const EXIT_PAD = 380;

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = window.setTimeout(resolve, ms);
      });

    const loop = async () => {
      let idx = 0;
      while (!cancelled) {
        setSceneIdx(idx);
        setBubblesOn(true);
        const scene = BUBBLE_SCENES[idx];
        await wait(APPEAR_PAD + scene.holdMs);
        if (cancelled) break;
        setBubblesOn(false);
        await wait(EXIT_PAD);
        if (cancelled) break;
        idx = (idx + 1) % BUBBLE_SCENES.length;
      }
    };

    void loop();
    return () => {
      cancelled = true;
      if (timer != null) window.clearTimeout(timer);
    };
  }, [inView, reduceMotion]);

  const activeScene = BUBBLE_SCENES[sceneIdx];

  return (
    <section
      ref={sectionRef}
      className="relative z-20 w-full overflow-x-clip px-5 py-[52px] md:px-10 md:py-[68px] xl:px-12 xl:py-[84px]"
      style={{ backgroundColor: "#FCFCFA" }}
      aria-label="이로운 파트너스"
    >
      <WishTitleReveal inView={!!inView} reduceMotion={reduceMotion} />

      <div className="relative mx-auto mt-8 w-full max-w-[1280px] md:mt-10 xl:mt-12">
        <div
          className="relative w-full"
          style={{ paddingBottom: `${(H / W) * 100}%` }}
        >
          <div className="absolute inset-0">
            <svg
              className="pointer-events-none absolute inset-0 z-[1] h-full w-full overflow-visible"
              viewBox={`0 0 ${W} ${H}`}
              fill="none"
              aria-hidden
            >
              {lines.map((line, i) => (
                <path
                  key={i}
                  ref={(el) => {
                    pathRefs.current[i] = el;
                  }}
                  className={reduceMotion ? undefined : "wish-dash-flow"}
                  d={line.d}
                  stroke={line.color}
                  strokeWidth={STROKE}
                  strokeLinecap="round"
                  /* Clay: short elongated dashes (not long strokes) */
                  strokeDasharray="2.6 9"
                  opacity={inView || reduceMotion ? line.opacity : 0}
                  style={{
                    transition: reduceMotion
                      ? undefined
                      : `opacity 0.9s ${line.delay}ms cubic-bezier(0.19, 1, 0.22, 1)`,
                  }}
                />
              ))}
            </svg>

            {CIRCLES.map((c, i) => {
              const enter = ENTER[i];
              const isCenterYellow = i === 6;
              return (
                <div
                  key={`face-${i}-${c.src}`}
                  className="absolute z-[2]"
                  style={{
                    left: `${c.x}%`,
                    top: `${c.y}%`,
                    width: `${isCenterYellow ? c.sizePct * 1.08 : c.sizePct}%`,
                    aspectRatio: "1 / 1",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <motion.div
                    className="size-full"
                    initial={
                      reduceMotion || isCenterYellow
                        ? false
                        : {
                            opacity: 0,
                            scale: enter.s,
                            x: enter.x,
                            y: enter.y,
                          }
                    }
                    animate={
                      isCenterYellow || inView || reduceMotion
                        ? { opacity: 1, scale: 1, x: 0, y: 0 }
                        : {
                            opacity: 0,
                            scale: enter.s,
                            x: enter.x,
                            y: enter.y,
                          }
                    }
                    transition={{
                      duration: reduceMotion ? 0 : 1,
                      delay: reduceMotion ? 0 : enter.d,
                      ease: EASE,
                    }}
                  >
                    <motion.div
                      className="relative size-full"
                      style={{
                        filter: "drop-shadow(0 8px 18px rgba(0, 0, 0, 0.14))",
                      }}
                      animate={
                        reduceMotion || !inView
                          ? undefined
                          : { y: [0, -5, 0, 4, 0], x: [0, 2, 0, -1.5, 0] }
                      }
                      transition={
                        reduceMotion
                          ? undefined
                          : {
                              duration: 5.4 + (i % 4) * 0.45,
                              delay: i * 0.14,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }
                      }
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={c.src}
                        alt=""
                        draggable={false}
                        className="pointer-events-none absolute inset-0 size-full object-contain"
                      />
                    </motion.div>
                  </motion.div>
                </div>
              );
            })}

            <AnimatePresence>
              {bubblesOn &&
                activeScene.items.map((b) => (
                  <motion.div
                    key={`${activeScene.id}-${b.id}`}
                    className="absolute z-[3]"
                    style={{
                      left: `${b.x}%`,
                      top: `${b.y}%`,
                      transform: "translate(-50%, -50%)",
                      transformOrigin: bubbleOrigin(b.radius),
                    }}
                    initial={
                      reduceMotion
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0 }
                    }
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{
                      opacity: 0,
                      scale: 0,
                      transition: {
                        duration: reduceMotion ? 0 : 0.28,
                        ease: [0.4, 0, 1, 1],
                      },
                    }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.4,
                      delay: reduceMotion ? 0 : b.stagger,
                      ease: EASE,
                    }}
                  >
                    <motion.div
                      animate={
                        reduceMotion
                          ? undefined
                          : { y: [0, -5, 0, 4, 0] }
                      }
                      transition={{
                        duration: 4.2,
                        delay: b.stagger,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <div
                        className="relative flex items-center gap-3 whitespace-nowrap px-6 py-4 text-[18px] leading-none font-semibold tracking-[-0.45px] text-[#1d1c1d] md:gap-3.5 md:px-8 md:py-5 md:text-[24px]"
                        style={{ fontFamily: FONT }}
                      >
                        <span
                          aria-hidden
                          className="absolute inset-0 -z-[1]"
                          style={{
                            background: "#fff",
                            borderRadius: b.radius,
                            boxShadow:
                              "0 10px 36px 0 rgba(211, 211, 224, 0.9)",
                          }}
                        />
                        <span>{b.text}</span>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <motion.img
                          src={b.emoji}
                          alt=""
                          draggable={false}
                          className="relative size-[30px] shrink-0 object-contain md:size-[38px]"
                          animate={
                            reduceMotion
                              ? undefined
                              : {
                                  y: [0, -4, 0, 3, 0],
                                  rotate: [0, -10, 0, 8, 0],
                                  scale: [1, 1.08, 1, 1.05, 1],
                                }
                          }
                          transition={{
                            duration: 2.4,
                            delay: b.stagger * 0.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
