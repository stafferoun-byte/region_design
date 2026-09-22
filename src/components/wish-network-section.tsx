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
/** Mobile artboard — tall enough to show full face network without clipping */
const H_MOBILE = Math.round(W * 0.88);
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

type CircleNode = {
  x: number;
  y: number;
  sizePct: number;
  rPx: number;
  src: string;
};

const CIRCLES: CircleNode[] = layout.circles.map((c, i) => ({
  x: c.x,
  y: c.y,
  sizePct: c.sizePct,
  rPx: c.rPx,
  src: CIRCLE_SRCS[i],
}));

/** Mobile — Slack-like sparse clusters by color. PC keeps CIRCLES.
 *  Top triangle: mint L ↔ mint R (line), navy seated lower between them.
 *  rPx ~0.68 of geometric radius so dashes meet the visible face (PNG has padding). */
const MOBILE_CIRCLES: CircleNode[] = [
  // 0 mint — top-left green
  { x: 14, y: 20, sizePct: 16, rPx: 38, src: CIRCLE_SRCS[0] },
  // 1 purple — bottom-left
  { x: 14, y: 76, sizePct: 15.5, rPx: 42, src: CIRCLE_SRCS[1] },
  // 2 dark — below & between the two mints
  { x: 46, y: 24, sizePct: 16, rPx: 44, src: CIRCLE_SRCS[2] },
  // 3 purple — mid-left (baby)
  { x: 28, y: 50, sizePct: 15.5, rPx: 42, src: CIRCLE_SRCS[3] },
  // 4 dark — lower left (hangs below)
  { x: 12, y: 110, sizePct: 15.5, rPx: 42, src: CIRCLE_SRCS[4] },
  // 5 mint — top-right green (단발) · links to 0
  { x: 70, y: 7, sizePct: 16, rPx: 38, src: CIRCLE_SRCS[5] },
  // 6 yellow — center
  { x: 50, y: 78, sizePct: 17, rPx: 38, src: CIRCLE_SRCS[6] },
  // 7 yellow — mid-right of yellow cluster
  { x: 64, y: 44, sizePct: 16, rPx: 38, src: CIRCLE_SRCS[7] },
  // 8 sky — under yellow center (hangs below artboard)
  { x: 44, y: 118, sizePct: 15.5, rPx: 42, src: CIRCLE_SRCS[8] },
  // 9 sky — upper-right
  { x: 90, y: 28, sizePct: 15.5, rPx: 42, src: CIRCLE_SRCS[9] },
  // 10 yellow — lower-right (hangs lower like sky under center)
  { x: 80, y: 108, sizePct: 16, rPx: 34, src: CIRCLE_SRCS[10] },
  // 11 sky — mid-right lower
  { x: 88, y: 78, sizePct: 15.5, rPx: 42, src: CIRCLE_SRCS[11] },
];

/** Mobile bubble positions — gaps in current face layout */
const MOBILE_BUBBLE_POS: Record<string, { x: number; y: number }> = {
  recovery: { x: 20, y: 27 },
  team: { x: 52, y: 56 },
  rights: { x: 18, y: 92 },
  precious: { x: 42, y: 8 },
  free: { x: 18, y: 56 },
};

/** Mobile bubble corner radii — scaled down vs desktop 56px */
const MOBILE_BUBBLE_RADIUS: Record<string, string> = {
  recovery: "0 28px 28px 28px",
  rights: "28px 28px 28px 0",
  team: "28px 28px 28px 0",
  precious: "28px 28px 0 28px",
  free: "28px 28px 28px 0",
};

/** Mobile line weight — desktop STROKE reads too thin on phone */
const STROKE_MOBILE = 9;
const DASH_DESKTOP = "2.6 9";
/**
 * Gap must exceed stroke (+ round caps) or dashes visually fuse into a solid line.
 * Pattern: short dash, wide gap — Slack-like dotted path.
 */
const DASH_MOBILE = "3.2 14";

const COLORS = {
  sky: "#D9EEF8",
  mint: "#B8EBD9",
  /** Stronger mint for the top green↔green link on mobile */
  mintLine: "#7ED9B8",
  yellow: "#F5EBB8",
  /** Brighter yellow for yellow↔yellow links on mobile */
  yellowLine: "#FFE566",
  purple: "#D0CFE0",
  /** Stronger purple for purple links / stubs on mobile */
  purpleLine: "#B8B6D4",
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
const SHOW_BUBBLES = true;

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

function toPx(c: { x: number; y: number }, artH: number) {
  return { x: (c.x / 100) * W, y: (c.y / 100) * artH };
}

/** Pull endpoints to circle rims so dashes meet faces, not centers */
function rimPoint(
  from: { x: number; y: number },
  to: { x: number; y: number },
  radius: number,
  artH: number,
  strokeW: number,
  rimScale = 1,
) {
  const a = toPx(from, artH);
  const b = toPx(to, artH);
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = Math.hypot(dx, dy) || 1;
  const pad = radius * rimScale + strokeW * 0.35;
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
  circles: readonly CircleNode[],
  artH: number,
  strokeW: number,
  biasX = 0,
  rimScale = 1,
): BuiltLine {
  const st = circles[stIdx];
  const ed = circles[edIdx];
  const a = rimPoint(st, ed, st.rPx, artH, strokeW, rimScale);
  const b = rimPoint(ed, st, ed.rPx, artH, strokeW, rimScale);
  return strokeCubic(a, b, sidePos, bendRatio, color, opacity, delay, biasX);
}

/** Mobile — dangling yellow stub from a face out past the cluster (Slack-like) */
function buildOutgoingLine(
  fromIdx: number,
  tipPct: { x: number; y: number },
  sidePos: number,
  bendRatio: number,
  color: string,
  opacity: number,
  delay: number,
  circles: readonly CircleNode[],
  artH: number,
  strokeW: number,
  rimScale = 0.55,
): BuiltLine {
  const st = circles[fromIdx];
  const a = rimPoint(st, tipPct, st.rPx, artH, strokeW, rimScale);
  const b = toPx(tipPct, artH);
  return strokeCubic(a, b, sidePos, bendRatio, color, opacity, delay, 0);
}

function strokeCubic(
  a: { x: number; y: number },
  b: { x: number; y: number },
  sidePos: number,
  bendRatio: number,
  color: string,
  opacity: number,
  delay: number,
  biasX = 0,
): BuiltLine {
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const activeCircles = isMobile ? MOBILE_CIRCLES : CIRCLES;
  const artH = isMobile ? H_MOBILE : H;
  const strokeW = isMobile ? STROKE_MOBILE : STROKE;
  const dashArray = isMobile ? DASH_MOBILE : DASH_DESKTOP;

  useEffect(() => {
    const circles = isMobile ? MOBILE_CIRCLES : CIRCLES;
    const h = isMobile ? H_MOBILE : H;
    const strokeW = isMobile ? STROKE_MOBILE : STROKE;
    const built = LINE_DEFS.map((def) => {
      const isMintLink = def.st === 0 && def.ed === 5;
      const isYellowLink =
        (def.st === 7 && def.ed === 6) || (def.st === 6 && def.ed === 10);
      const isNavyLink = def.st === 2 && def.ed === 4;
      // Mobile same-color links: gentle arc that clearly joins matching faces
      let sidePos = def.sidePos;
      let bend = def.bend;
      let color = def.color;
      let opacity = def.opacity;
      let biasX = def.biasX ?? 0;
      let rimScale = def.rimScale ?? 1;

      if (isMobile && isMintLink) {
        sidePos = 1;
        bend = 0.06;
        color = COLORS.mintLine;
        opacity = 1;
        biasX = 0;
        rimScale = 0.55;
      } else if (isMobile && isYellowLink) {
        // 6↔10 bend flipped (was -1); 7↔6 unchanged at 1
        sidePos = 1;
        bend = 0.07;
        color = COLORS.yellowLine;
        opacity = 1;
        biasX = 0;
        rimScale = 0.55;
      } else if (isMobile && isNavyLink) {
        // Same bend side as desktop; mild arc clearing center yellow (6)
        sidePos = 1;
        bend = 0.15;
        biasX = 4;
        rimScale = 0.65;
      } else if (isMobile) {
        rimScale = (def.rimScale ?? 1) * 0.72;
      }

      return buildLine(
        def.st,
        def.ed,
        sidePos,
        bend,
        color,
        opacity,
        def.delay,
        circles,
        h,
        strokeW,
        biasX,
        rimScale,
      );
    });

    // Mobile only — yellow stub gently out to the right edge (slight rise)
    if (isMobile) {
      built.push(
        buildOutgoingLine(
          10,
          { x: 118, y: 102 },
          1,
          0.09,
          COLORS.yellowLine,
          0.95,
          340,
          circles,
          h,
          strokeW,
          0.45,
        ),
      );
      // Purple stub out left from male student
      built.push(
        buildOutgoingLine(
          1,
          { x: -14, y: 70 },
          -1,
          0.09,
          COLORS.purpleLine,
          0.95,
          360,
          circles,
          h,
          strokeW,
          0.45,
        ),
      );
    }

    linesData.current = built;
    setLines(built);
  }, [isMobile]);

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
    if (!SHOW_BUBBLES || !inView) return;
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
      className="relative z-20 w-full overflow-x-visible px-2 py-0 md:overflow-x-clip md:px-10 xl:px-12"
      style={{ backgroundColor: "#FCFCFA" }}
      aria-label="이로운 파트너스"
    >
      <WishTitleReveal inView={!!inView} reduceMotion={reduceMotion} />

      <div className="relative mx-auto mt-9 w-full max-w-[1280px] md:mt-8 xl:mt-9">
        <div
          className="relative w-full overflow-visible"
          style={{ paddingBottom: `${(artH / W) * 100}%` }}
        >
          <div className="absolute inset-0 overflow-visible">
            <svg
              className="pointer-events-none absolute inset-0 z-[1] h-full w-full overflow-visible"
              viewBox={`0 0 ${W} ${artH}`}
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
                  strokeWidth={strokeW}
                  strokeLinecap="round"
                  /* Clay: short elongated dashes (not long strokes) */
                  strokeDasharray={dashArray}
                  opacity={inView || reduceMotion ? line.opacity : 0}
                  style={{
                    transition: reduceMotion
                      ? undefined
                      : `opacity 0.9s ${line.delay}ms cubic-bezier(0.19, 1, 0.22, 1)`,
                  }}
                />
              ))}
            </svg>

            {activeCircles.map((c, i) => {
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
              {SHOW_BUBBLES &&
                bubblesOn &&
                activeScene.items.map((b) => {
                  const pos =
                    isMobile && MOBILE_BUBBLE_POS[b.id]
                      ? MOBILE_BUBBLE_POS[b.id]
                      : { x: b.x, y: b.y };
                  const radius =
                    isMobile && MOBILE_BUBBLE_RADIUS[b.id]
                      ? MOBILE_BUBBLE_RADIUS[b.id]
                      : b.radius;
                  return (
                  <motion.div
                    key={`${activeScene.id}-${b.id}`}
                    className="absolute z-[3]"
                    style={{
                      left: `${pos.x}%`,
                      top: `${pos.y}%`,
                      transform: "translate(-50%, -50%)",
                      transformOrigin: bubbleOrigin(radius),
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
                        className="relative origin-center scale-[0.92] md:scale-100"
                      >
                      <div
                        className="relative flex items-center gap-1.5 whitespace-nowrap px-3.5 py-2.5 text-[14px] leading-none font-semibold tracking-[-0.4px] text-[#1d1c1d] md:gap-3.5 md:px-8 md:py-5 md:text-[24px]"
                        style={{ fontFamily: FONT }}
                      >
                        <span
                          aria-hidden
                          className="absolute inset-0 -z-[1]"
                          style={{
                            background: "#fff",
                            borderRadius: radius,
                            boxShadow: isMobile
                              ? "0 6px 20px 0 rgba(211, 211, 224, 0.85)"
                              : "0 10px 36px 0 rgba(211, 211, 224, 0.9)",
                          }}
                        />
                        <span>{b.text}</span>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <motion.img
                          src={b.emoji}
                          alt=""
                          draggable={false}
                          className="relative size-[20px] shrink-0 object-contain md:size-[38px]"
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
                      </div>
                    </motion.div>
                  </motion.div>
                  );
                })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
