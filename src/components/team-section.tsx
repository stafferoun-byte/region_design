"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

const FONT =
  '"Wanted Sans Variable", "Wanted Sans", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';

/** Kora tokens from framer CSS */
const GREEN = "#5DC39B";
const HOVER_CREAM = "#FFFFF5";
const PLUS_BG = "#F7F7ED";
const CREAM = "#FFFFFA";
const DARK = "#292929";
const ROW_LINE = "rgba(227, 227, 227, 0.45)";

const TEAM = [
  {
    id: "inheritance",
    concern: "상속 문제로 고민하고 있어요.",
    name: "상속 전문센터 전국 0.2% 전문성",
    role: "유류분반환청구 · 상속재산분할 · 한정승인·상속포기 · 기여분청구 · 유언무효·특별수익",
    bio: "상속 분쟁의 초기 대응부터 판결·조정까지, 전국 상위 전문성으로 권리를 지킵니다.",
    image: "/images/practice/inheritance.png",
  },
  {
    id: "criminal",
    concern: "경찰에서 연락이 왔어요.",
    name: "형사 전문센터 경찰조사 밀착대응",
    role: "경찰조사 밀착대응 · 사기 · 학교폭력 · 횡령·배임 · 성범죄",
    bio: "수사 초기부터 재판까지 밀착 대응해 의뢰인의 권리와 일상을 지킵니다.",
    image: "/images/practice/criminal.png",
  },
  {
    id: "civil",
    concern: "돈을 돌려받고 싶어요.",
    name: "민사·손해배상 전문센터 끝까지 회수하는 전략",
    role: "대여금 반환 · 공사대금 · 손해배상청구 · 물품대금청구 · 약정금청구",
    bio: "증거 정리와 변론을 한 흐름으로 이어, 회수·배상까지 책임지고 대응합니다.",
    image: "/images/practice/civil.png",
  },
  {
    id: "family",
    concern: "이혼을 고민하고 있어요.",
    name: "이혼·가사 전문센터 이로운 결과를 설계",
    role: "이혼재산분할 · 상간자소송 · 위자료 · 양육권·친권 · 친양자입양 · 친생자관계부존재",
    bio: "감정보다 절차와 합의에 집중해, 가족과 일상을 다시 세울 해법을 설계합니다.",
    image: "/images/practice/family.png",
  },
  {
    id: "realestate",
    concern: "전세보증금을 돌려받고 싶어요.",
    name: "부동산·임대차 전문센터 가압류·강제집행 즉시대응",
    role: "전세보증금 반환 · 임차권등기명령 · 임대차 분쟁 · 소유권이전·말소 · 부동산 가처분",
    bio: "가압류·강제집행까지 즉시 대응해 부동산·임대차 분쟁을 빠르게 정리합니다.",
    image: "/images/practice/realestate.png",
  },
  {
    id: "traffic",
    concern: "교통사고 문제가 있어요.",
    name: "교통사고 전문센터 형사처벌·합의금 동시대응",
    role: "음주운전 · 무면허운전 · 교통사고 합의 · 12대 중과실 · 형사처벌 대응",
    bio: "형사처벌과 합의금 대응을 동시에 진행해 사고 이후를 빠르게 수습합니다.",
    image: "/images/practice/traffic.png",
  },
] as const;

const easeOut = [0.22, 1, 0.36, 1] as const;

/** Title: word blur reveal — two lines */
const TITLE_LINE_1 = ["지금,", "어떤", "도움이"] as const;
const TITLE_LINE_2 = ["필요하신가요?"] as const;

function TitleReveal({
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
        hidden: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
        show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
      }
    : {
        /* Exact Kora appear: opacity 0.001, y:2, scale:0.9, blur(5px) */
        hidden: {
          opacity: 0.001,
          y: 2,
          scale: 0.9,
          filter: "blur(5px)",
        },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: { duration: 0.7, ease: easeOut },
        },
      };

  const renderLine = (words: readonly string[], color: string) =>
    words.map((w, i) => (
      <span key={`${w}-${i}`}>
        <motion.span variants={word} className="inline-block" style={{ color }}>
          {w}
        </motion.span>
        {i < words.length - 1 ? " " : null}
      </span>
    ));

  return (
    <motion.h2
      className="text-[clamp(42px,5.2vw,68px)] leading-[1.28] font-bold tracking-[-0.05em] break-keep"
      style={{ fontFamily: FONT }}
      variants={container}
      initial="hidden"
      animate={inView || reduceMotion ? "show" : "hidden"}
      aria-label="지금, 어떤 도움이 필요하신가요?"
    >
      {renderLine(TITLE_LINE_1, "#FFFFFF")}
      <br />
      {renderLine(TITLE_LINE_2, "#CDEDE0")}
    </motion.h2>
  );
}

function TeamRow({
  member,
  open,
  onToggle,
  reduceMotion,
}: {
  member: (typeof TEAM)[number];
  open: boolean;
  onToggle: () => void;
  reduceMotion: boolean | null;
}) {
  const [hovered, setHovered] = useState(false);
  const active = open || hovered;
  const rowRef = useRef<HTMLButtonElement | null>(null);
  const [pillScale, setPillScale] = useState(28);

  /* Cover row diagonal from a 50px circle */
  const measure = () => {
    const el = rowRef.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    const diag = Math.sqrt(width * width + height * height);
    setPillScale(Math.ceil(diag / 50) + 1);
  };

  const spring = reduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 220, damping: 24, mass: 0.85 };

  return (
    <motion.div
      variants={{
        hidden: reduceMotion
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 10, scale: 0.9 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.65, ease: easeOut },
        },
      }}
      className="relative"
    >
      {/* Default bottom rule — hides as the pill outline rolls up */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-0 left-0 z-[3] h-px"
        style={{ backgroundColor: ROW_LINE }}
        initial={false}
        animate={{ opacity: active ? 0 : 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.25 }}
      />

      <button
        ref={rowRef}
        type="button"
        onClick={onToggle}
        onMouseEnter={() => {
          measure();
          setHovered(true);
        }}
        onMouseLeave={() => setHovered(false)}
        aria-expanded={open}
        className="relative flex w-full cursor-pointer items-center gap-5 overflow-hidden rounded-[50px] p-[10px] text-left md:gap-[30px]"
      >
        {/*
          Cream fill: 50px circle at center → spring-scale to cover row.
        */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 z-0 size-[50px] rounded-full"
          style={{
            backgroundColor: HOVER_CREAM,
            marginLeft: -25,
            marginTop: -25,
          }}
          initial={false}
          animate={{ scale: active ? pillScale : 0 }}
          transition={spring}
        />

        {/*
          Bottom rule rolls up into a pill outline (scaleY from bottom).
        */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[2] origin-bottom rounded-[50px] border will-change-transform"
          style={{ borderColor: "rgba(255,255,255,0.9)" }}
          initial={false}
          animate={{
            opacity: active ? 1 : 0,
            scaleY: active ? 1 : 0.04,
          }}
          transition={spring}
        />

        {/* Avatar — photo + film grain, or empty cream circle */}
        <span
          className="relative z-[1] size-[60px] shrink-0 overflow-hidden rounded-full md:size-[80px]"
          style={{ backgroundColor: CREAM }}
          aria-hidden
        >
          {"image" in member && member.image ? (
            <>
              <Image
                src={member.image}
                alt=""
                fill
                className="object-cover object-center"
                sizes="(min-width: 810px) 80px, 60px"
              />
              {/* Film-grain noise like FAQ photo cards */}
              <span
                className="pointer-events-none absolute inset-0 mix-blend-overlay"
                style={{
                  opacity: 0.45,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  backgroundSize: "120px 120px",
                }}
              />
              <span
                className="pointer-events-none absolute inset-0 mix-blend-soft-light"
                style={{
                  opacity: 0.35,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  backgroundSize: "80px 80px",
                }}
              />
            </>
          ) : null}
        </span>

        {/* Title — always 2 lines; concern↔name swaps on hover, fields stay */}
        <span className="relative z-[1] flex min-h-[58px] min-w-0 flex-1 items-center gap-5 md:min-h-[64px]">
          <span className="flex min-w-0 flex-1 flex-col gap-2 md:gap-3">
            <AnimatePresence mode="wait" initial={false}>
              {active ? (
                <motion.span
                  key="detail-title"
                  className="block text-[17px] leading-[1.35] font-[585] tracking-[-0.03em] break-keep md:text-[20px]"
                  style={{ fontFamily: FONT, color: DARK }}
                  initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -3 }}
                  transition={{ duration: 0.2, ease: easeOut }}
                >
                  {member.name}
                </motion.span>
              ) : (
                <motion.span
                  key="concern-title"
                  className="block text-[20px] leading-[1.3] font-bold tracking-[-0.03em] break-keep md:text-[22px] xl:text-[24px]"
                  style={{ fontFamily: FONT, color: CREAM }}
                  initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -3 }}
                  transition={{ duration: 0.2, ease: easeOut }}
                >
                  {member.concern}
                </motion.span>
              )}
            </AnimatePresence>
            <span
              className="block text-[14px] leading-[1.5] font-semibold tracking-[-0.03em] break-keep transition-colors duration-200"
              style={{
                fontFamily: FONT,
                color: active ? "#616161" : "rgba(255,255,255,0.55)",
              }}
            >
              {member.role}
            </span>
          </span>
        </span>

        {/*
          Plus — Kora Team Member:
          outer spin 0→360 on hover (spring bounce .29 / duration .56);
          circle fills green + strokes go white; open → 45° (×).
        */}
        <motion.span
          className="relative z-[1] flex size-5 shrink-0 items-center justify-center overflow-hidden rounded-full will-change-transform"
          aria-hidden
          initial={false}
          animate={{
            backgroundColor: active ? GREEN : PLUS_BG,
            rotate: open ? 45 : hovered ? 360 : 0,
          }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { type: "spring", bounce: 0.29, duration: 0.56 }
          }
        >
          <span
            className="absolute top-1/2 left-1/2 h-[2px] w-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              backgroundColor: active ? "#FFFFFA" : DARK,
              transition: reduceMotion
                ? undefined
                : "background-color 0.2s ease",
            }}
          />
          <span
            className="absolute top-1/2 left-1/2 h-[10px] w-[2px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              backgroundColor: active ? "#FFFFFA" : DARK,
              transition: reduceMotion
                ? undefined
                : "background-color 0.2s ease",
            }}
          />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="bio"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: easeOut }}
            className="overflow-hidden"
          >
            <p
              className="max-w-[520px] px-[10px] pb-4 pl-[84px] text-[14px] leading-[1.5] font-semibold tracking-[-0.03em] text-white/80 md:pl-[120px]"
              style={{ fontFamily: FONT }}
            >
              {member.bio}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

/** Kora Apply Now — structure from framer-bdcy0 Desktop */
function ApplyNowButton() {
  const [hovered, setHovered] = useState(false);
  const btnRef = useRef<HTMLDivElement | null>(null);
  const [bloomScale, setBloomScale] = useState(28);

  const measure = () => {
    const el = btnRef.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    // Cream circle is 10px (radius 5), anchored near the right edge.
    // Scale must reach the farthest corner from that origin — use radius, not diameter.
    const cx = width - 20;
    const cy = height / 2;
    const maxDist = Math.sqrt(cx * cx + cy * cy);
    setBloomScale(Math.ceil(maxDist / 5) + 4);
  };

  const spring = {
    type: "spring" as const,
    stiffness: 280,
    damping: 24,
    mass: 0.7,
  };

  return (
    <a
      href="#consult"
      onMouseEnter={() => {
        measure();
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      className="relative inline-flex w-fit overflow-hidden rounded-[40px] no-underline"
    >
      {/* Button — slightly larger pill */}
      <div
        ref={btnRef}
        className="relative flex items-center gap-[25px] rounded-[40px] bg-[#242424] px-[18px] py-3"
      >
        {/* Text — clips exit/enter */}
        <span className="relative z-[4] overflow-hidden">
          {/* Default — cream; on hover → absolute top -30 */}
          <motion.span
            className="block whitespace-nowrap text-[15px] leading-[1.5] font-semibold tracking-[-0.03em] min-[1200px]:text-[16px]"
            style={{
              fontFamily: FONT,
              color: CREAM,
              position: hovered ? "absolute" : "relative",
              top: hovered ? -30 : undefined,
              left: hovered ? 0 : undefined,
            }}
            initial={false}
            animate={
              hovered
                ? { opacity: 0, scale: 0.9 }
                : { opacity: 1, scale: 1 }
            }
            transition={spring}
          >
            함께 방법을 찾아보기
          </motion.span>
          {/* Hover — dark; default absolute bottom -30, scale .9 rotate -30 */}
          <motion.span
            className="block whitespace-nowrap text-[15px] leading-[1.5] font-semibold tracking-[-0.03em] min-[1200px]:text-[16px]"
            style={{
              fontFamily: FONT,
              color: DARK,
              position: hovered ? "relative" : "absolute",
              bottom: hovered ? undefined : -30,
              left: hovered ? undefined : 0,
            }}
            initial={false}
            animate={
              hovered
                ? { opacity: 1, scale: 1, rotate: 0 }
                : { opacity: 0, scale: 0.9, rotate: -30 }
            }
            transition={spring}
          >
            함께 방법을 찾아보기
          </motion.span>
        </span>

        {/*
          Dark Dot — default absolute over cream circle, scale 0.
          On hover: relative (takes cream's flex slot), scale 1.
        */}
        <motion.span
          aria-hidden
          className="z-[4] size-[10px] shrink-0 rounded-[30px] bg-[#242424]"
          style={
            hovered
              ? { position: "relative", order: 2 }
              : { position: "absolute", bottom: 17, right: 15 }
          }
          initial={false}
          animate={{ scale: hovered ? 1 : 0 }}
          transition={spring}
        />

        {/*
          Hover Color — cream 10×10 = visible white dot in flex.
          On hover: absolute + scale up to fill pill.
        */}
        <motion.span
          aria-hidden
          className="z-[1] size-[10px] shrink-0 rounded-[30px]"
          style={{
            backgroundColor: CREAM,
            position: hovered ? "absolute" : "relative",
            top: hovered ? "50%" : undefined,
            right: hovered ? 15 : undefined,
            marginTop: hovered ? -5 : undefined,
            order: hovered ? 1 : undefined,
          }}
          initial={false}
          animate={{ scale: hovered ? bloomScale : 1 }}
          transition={spring}
        />
      </div>
    </a>
  );
}

/**
 * Kora Bottom hiring row — breakpoints match Framer:
 * ≥1200 desktop · 810–1199 tablet · <810 mobile
 */
const HIRE_LINE_1 = ["한", "사람의"] as const;
const HIRE_LINE_2 = ["소중한", "삶이", "걸린", "일로."] as const;

function HiringBlock({ reduceMotion }: { reduceMotion: boolean | null }) {
  const copyRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(copyRef, {
    once: true,
    amount: 0.55,
    margin: "0px 0px -12% 0px",
  });
  const show = reduceMotion ? true : inView;

  const wordContainer: Variants = {
    hidden: {},
    show: {
      transition: reduceMotion
        ? { duration: 0 }
        : { staggerChildren: 0.06, delayChildren: 0.04 },
    },
  };

  const word: Variants = reduceMotion
    ? {
        hidden: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
        show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
      }
    : {
        hidden: {
          opacity: 0.001,
          y: 2,
          scale: 0.9,
          filter: "blur(5px)",
        },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: { duration: 0.7, ease: easeOut },
        },
      };

  const renderLine = (words: readonly string[]) =>
    words.map((w, i) => (
      <span key={`${w}-${i}`}>
        <motion.span variants={word} className="inline-block" style={{ color: CREAM }}>
          {w}
        </motion.span>
        {i < words.length - 1 ? " " : null}
      </span>
    ));

  return (
    <div className="flex w-full flex-col gap-[30px] min-[810px]:flex-row min-[810px]:items-end min-[810px]:gap-[50px]">
      <div className="w-full min-w-0 min-[810px]:flex-[2_0_0%]">
        <motion.div
          className="relative aspect-[3/2] w-full overflow-hidden rounded-[30px]"
          style={{ transformPerspective: 1200 }}
          initial={reduceMotion ? false : { scale: 0.9, rotate: 3, opacity: 0 }}
          whileInView={
            reduceMotion
              ? undefined
              : { scale: 1, rotate: 0, opacity: 1 }
          }
          viewport={{ once: true, amount: 0.35 }}
          animate={
            reduceMotion ? { scale: 1, rotate: 0, opacity: 1 } : undefined
          }
          transition={{
            duration: reduceMotion ? 0 : 1,
            ease: easeOut,
          }}
        >
          <Image
            src="/images/hiring.png?v=4"
            alt=""
            fill
            quality={100}
            unoptimized
            className="object-cover object-[center_40%]"
            sizes="(min-width: 1200px) 900px, 100vw"
            priority
          />
        </motion.div>
      </div>

      {/* Right copy — own inView so text animates when it actually appears */}
      <div
        ref={copyRef}
        className="flex w-full flex-col items-start gap-5 min-[810px]:w-[320px] min-[810px]:flex-none min-[810px]:gap-[30px] min-[1200px]:w-auto min-[1200px]:min-w-0 min-[1200px]:flex-[1_0_0%]"
      >
        <div className="flex w-full max-w-[280px] flex-col items-start gap-[15px] min-[810px]:max-w-[400px] min-[810px]:gap-5 min-[1200px]:max-w-[520px]">
          <motion.h3
            className="w-full text-[25px] leading-[1.1] font-bold tracking-[-0.04em] break-keep min-[810px]:text-[30px] min-[1200px]:text-[45px]"
            style={{ fontFamily: FONT, fontVariationSettings: '"wght" 700' }}
            variants={wordContainer}
            initial="hidden"
            animate={show ? "show" : "hidden"}
            aria-label="한 사람의 소중한 삶이 걸린 일로."
          >
            {renderLine(HIRE_LINE_1)}
            <br />
            {renderLine(HIRE_LINE_2)}
          </motion.h3>
          <motion.p
            className="w-max max-w-none whitespace-nowrap text-[14px] leading-[1.5] font-semibold tracking-[-0.03em] min-[810px]:text-[15px] min-[1200px]:text-[17px]"
            style={{ fontFamily: FONT, color: CREAM }}
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0.001,
                    y: 2,
                    scale: 0.9,
                    filter: "blur(5px)",
                  }
            }
            animate={
              show
                ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                : {
                    opacity: 0.001,
                    y: 2,
                    scale: 0.9,
                    filter: "blur(5px)",
                  }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.7,
              delay: reduceMotion ? 0 : 0.28,
              ease: easeOut,
            }}
          >
            이로운 변호사들, 이로운 파트너스.
          </motion.p>
        </div>

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0.001,
                  y: 2,
                  scale: 0.9,
                  filter: "blur(5px)",
                }
          }
          animate={
            show
              ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
              : {
                  opacity: 0.001,
                  y: 2,
                  scale: 0.9,
                  filter: "blur(5px)",
                }
          }
          transition={{
            duration: reduceMotion ? 0 : 0.7,
            delay: reduceMotion ? 0 : 0.42,
            ease: easeOut,
          }}
        >
          <ApplyNowButton />
        </motion.div>
      </div>
    </div>
  );
}

export function TeamSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });
  const reduceMotion = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(null);

  const listVariants: Variants = {
    hidden: {},
    show: {
      transition: reduceMotion
        ? { duration: 0 }
        : { staggerChildren: 0.07, delayChildren: 0.15 },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="team"
      className="relative z-10 w-full bg-transparent"
      aria-label="팀 소개"
    >
      {/* Outer inset matches StatsSection horizontal padding */}
      <div className="mx-auto w-full max-w-[1920px] px-5 pb-5 md:px-10 xl:px-12">
        {/*
          Green box — rises over the pinned graph section
        */}
        <motion.div
          className="flex w-full flex-col gap-[60px] overflow-hidden rounded-[40px] pt-[100px] pb-[60px] md:gap-[90px] md:pt-[140px] md:pb-[90px] xl:gap-[120px] xl:pt-[180px] xl:pb-[120px]"
          style={{ backgroundColor: GREEN }}
          initial={reduceMotion ? false : { y: 72, opacity: 0.92 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: reduceMotion ? 0 : 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* Inside — same max-w as StatsSection */}
          <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-[70px] md:gap-[90px] xl:gap-[110px]">
            <TitleReveal inView={!!inView} reduceMotion={reduceMotion} />

            <motion.div
              className="grid w-full grid-cols-1 gap-x-[30px] gap-y-[15px] md:grid-cols-2"
              variants={listVariants}
              initial="hidden"
              animate={inView || reduceMotion ? "show" : "hidden"}
            >
              {TEAM.map((member) => (
                <TeamRow
                  key={member.id}
                  member={member}
                  open={openId === member.id}
                  onToggle={() =>
                    setOpenId((cur) => (cur === member.id ? null : member.id))
                  }
                  reduceMotion={reduceMotion}
                />
              ))}
            </motion.div>
          </div>

          {/* Bottom — Join us / hiring */}
          <div className="mx-auto w-full max-w-[1480px]">
            <HiringBlock reduceMotion={reduceMotion} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
