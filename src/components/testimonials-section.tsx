"use client";

import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { SectionTitleReveal } from "@/components/section-title-reveal";

/** Kora Appear spring — bounce 0.29, duration 0.46 */
const koraSpring = {
  type: "spring" as const,
  bounce: 0.29,
  duration: 0.46,
};

/** Match site stack; Kora uses Manrope — layout/tokens stay 1:1 */
const FONT =
  '"Wanted Sans Variable", "Wanted Sans", "Manrope", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';

/* Exact Kora design tokens */
const ACCENT = "#5DC39B";
const BLACK = "#242424";
const CREAM = "#F5F5E9";
const CARD = "#FFFFFA";
const OVERLAY = "#292929";

const TITLE_LINE = [
  { text: "함께", color: "#FFFFFF" },
  { text: "한", color: "#FFFFFF" },
  { text: "분들의", color: "#FFFFFF" },
  { text: "이야기", color: "#FFFFFF" },
] as const;

const HERO_BG = "/images/testimonials/lawyers-hero.png";

const HERO = {
  quote:
    "사건만 봐 주는 변호사가 아니라,\n제 삶을 함께 지켜 주는 팀이었습니다.",
  body: "막막했던 상황에서 방향부터 차분히 잡아 주셨고, 불안한 질문에 하나하나 답해 주셨습니다. 재판 과정에서도 제가 이해할 수 있게 설명해 주시니 마음이 놓였고, 결과까지 책임감 있게 이끌어 주셨습니다. 다시 일상으로 돌아올 수 있게 해 주셔서 진심으로 감사합니다.",
  name: "김서연 님",
  role: "가사 사건 의뢰인",
  avatar:
    "/images/c2ad675e-3571-4adc-b8fe-7bb0aa39fd56.png",
};

const CARDS = [
  {
    id: "marcus",
    quote:
      "다른 곳에서 형식적인 상담만 받고 불안해하던 중이었습니다. 이로운은 처음부터 끝까지 솔직하게 설명해 주시고, 제가 이해될 때까지 기다려 주셨습니다. 불리한 점도 숨기지 않고 말씀해 주셔서 오히려 신뢰가 생겼고, 그 신뢰가 결과로 이어졌습니다. 혼자였다면 버티기 힘들었을 시간을 함께 걸어 주셔서 감사합니다.",
    name: "박준호 님",
    role: "형사 사건 의뢰인",
    avatar:
      "/images/9c00079f-e305-4291-b185-cb7f98589029.png",
  },
  {
    id: "david",
    quote:
      "주변에서는 길게 끌라고만 했습니다. 이로운 변호사님들은 오히려 ‘어디에 힘을 모을지’를 정확히 짚어 주셨고, 불필요한 싸움을 줄여 주셨습니다. 서류 하나, 일정 하나도 허투루 넘기지 않으셨고, 제가 놓치기 쉬운 부분까지 먼저 챙겨 주셨습니다. 그 판단 하나로 시간과 비용을 많이 아낄 수 있었습니다.",
    name: "이도현 님",
    role: "민사 사건 의뢰인",
    avatar:
      "/images/2bc8a0dd-2ed6-4203-b843-bd26675b7373.png",
  },
  {
    id: "jennifer",
    quote:
      "사건이 끝난 뒤에도 ‘다음에 비슷한 일이 생기면 이렇게 하세요’까지 남겨 주셨습니다. 의존하게 만드는 곳이 아니라, 스스로 설 수 있게 도와 주는 파트너였습니다. 진행 중에도 제 상황을 세심하게 물어봐 주시고, 감정적으로 흔들릴 때마다 현실적인 선택지를 차분히 정리해 주셨던 점이 가장 기억에 남습니다.",
    name: "최유진 님",
    role: "부동산 사건 의뢰인",
    avatar:
      "/images/1adec6e9-d677-4e1f-9556-ea97118afaba.png",
  },
] as const;

function Stars() {
  return (
    <div className="flex items-center gap-[5px]" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="size-[9px] rounded-full"
          style={{ backgroundColor: ACCENT }}
        />
      ))}
    </div>
  );
}

function PlusMinus({ open }: { open: boolean }) {
  const color = open ? ACCENT : BLACK;
  return (
    <span
      className="relative grid size-8 place-items-center rounded-full"
      style={{ backgroundColor: open ? "#F7F7ED" : "transparent" }}
      aria-hidden
    >
      <span className="relative block size-5">
        <span
          className="absolute top-1/2 left-0 h-[2px] w-full -translate-y-1/2 rounded-[30px] transition-colors duration-300"
          style={{ backgroundColor: color }}
        />
        <span
          className={`absolute top-0 left-1/2 h-full w-[2px] -translate-x-1/2 rounded-[30px] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "scale-y-0" : "scale-y-100"
          }`}
          style={{ backgroundColor: color }}
        />
      </span>
    </span>
  );
}

/** Expanded-card brand mark */
function BrandMark() {
  return (
    <span
      className="text-[14px] font-semibold tracking-[-0.03em]"
      style={{ color: BLACK, fontFamily: FONT }}
      aria-hidden
    >
      이로운 파트너스
    </span>
  );
}

function Avatar({
  src,
  alt,
  size = 58,
}: {
  src: string;
  alt: string;
  size?: number;
}) {
  return (
    <span
      className="relative shrink-0 overflow-hidden"
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: "#E8E8E8",
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${size}px`}
        className="object-cover"
      />
    </span>
  );
}

function AccordionCard({
  quote,
  name,
  role,
  avatar,
  open,
  onActivate,
  reduceMotion,
}: {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  open: boolean;
  onActivate: () => void;
  reduceMotion: boolean | null;
}) {
  return (
    <article
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      tabIndex={0}
      role="button"
      aria-expanded={open}
      className="relative flex h-full min-h-[360px] cursor-pointer flex-col justify-between overflow-hidden outline-none md:min-h-[400px]"
      style={{
        backgroundColor: CARD,
        borderRadius: 30,
        fontFamily: FONT,
      }}
    >
      {/* Plus — absolute top-right (Kora: top 15px right 15px) */}
      <div className="absolute top-[15px] right-[15px] z-10">
        <PlusMinus open={open} />
      </div>

      <div className="flex flex-col gap-5 p-[30px] pr-12">
        <Stars />

        {/* Dual quote layers: Big (open) / Small (closed) — Kora pattern */}
        <div className="relative min-h-[7.5rem]">
          <p
            className="text-[20px] leading-[1.35] font-semibold tracking-[-0.03em]"
            style={{
              color: BLACK,
              opacity: open ? 1 : 0,
              position: open ? "relative" : "absolute",
              inset: open ? undefined : 0,
              pointerEvents: open ? "auto" : "none",
              transition: reduceMotion ? undefined : "opacity 280ms ease",
            }}
          >
            &ldquo;{quote}&rdquo;
          </p>
          <p
            className="text-[14px] leading-[1.5] font-semibold tracking-[-0.03em]"
            style={{
              color: BLACK,
              opacity: open ? 0 : 1,
              position: open ? "absolute" : "relative",
              inset: open ? 0 : undefined,
              pointerEvents: open ? "none" : "auto",
              transition: reduceMotion ? undefined : "opacity 280ms ease",
            }}
          >
            &ldquo;{quote}&rdquo;
          </p>
        </div>
      </div>

      <div className="mt-auto flex items-center gap-4 px-[30px] pt-0 pb-[30px]">
        <div className="flex min-w-0 items-center gap-[15px]">
          <Avatar src={avatar} alt={name} size={58} />
          <div className="min-w-0">
            <p
              className="truncate text-[14px] font-semibold tracking-[-0.03em]"
              style={{ color: BLACK }}
            >
              {name}
            </p>
            <p
              className="truncate text-[13px] font-semibold tracking-[-0.025em]"
              style={{ color: "#616161" }}
            >
              {role}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export function TestimonialsSection() {
  const reduceMotion = useReducedMotion();
  /** Default open: first card (Kora SSR "1 Open") */
  const [openIndex, setOpenIndex] = useState(0);

  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.12 });
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.2 });

  const show = inView || !!reduceMotion;
  const showCards = cardsInView || !!reduceMotion;
  const appear = reduceMotion ? { duration: 0 } : koraSpring;

  const heroCardHidden = {
    opacity: 0,
    x: 30,
    y: 30,
    scale: 0.8,
    rotate: -5,
  } as const;

  const heroCardVisible = {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
  } as const;

  const gridColumns =
    openIndex === 0
      ? "2fr 1fr 1fr"
      : openIndex === 1
        ? "1fr 2fr 1fr"
        : "1fr 1fr 2fr";

  return (
    <section
      ref={sectionRef}
      className="relative flex w-full flex-col items-center gap-5 py-[60px] md:py-[90px] xl:py-[120px]"
      style={{ fontFamily: FONT }}
      aria-labelledby="testimonials-heading"
    >
      <div className="w-full max-w-[1600px] px-5 md:px-10 xl:px-[60px]">
        <div
          className="relative isolate aspect-[4/3] w-full overflow-hidden"
          style={{ borderRadius: 40 }}
        >
          {/* Image stays framed — Kora does not scale the photo on appear */}
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={HERO_BG}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-center"
              decoding="async"
            />
          </div>

          <div
            className="absolute inset-0"
            style={{ backgroundColor: OVERLAY, opacity: 0.18 }}
            aria-hidden
          />

          {/* Title — word-by-word (matches Wish / FAQ sections) */}
          <SectionTitleReveal
            id="testimonials-heading"
            lines={[TITLE_LINE]}
            inView={show}
            reduceMotion={reduceMotion}
            className="pointer-events-none absolute top-10 left-5 z-20 max-w-[11em] text-[clamp(42px,5.2vw,68px)] leading-[1.15] font-bold tracking-[-0.05em] break-keep select-none md:top-14 md:left-10 xl:top-16 xl:left-12"
            style={{ fontFamily: FONT }}
            ariaLabel="함께 한 분들의 이야기"
          />

          {/* Glass card — Kora: x30 y30 scale 0.8 rotate -5deg */}
          <div className="absolute top-[72%] left-5 z-10 w-[min(100%-2.5rem,320px)] -translate-y-1/2 md:left-10 md:w-[375px] xl:left-12">
            <motion.div
              className="will-change-[transform,opacity]"
              initial={reduceMotion ? false : heroCardHidden}
              whileInView={reduceMotion ? undefined : heroCardVisible}
              viewport={{ once: true, amount: 0.35, margin: "0px 0px -10% 0px" }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      opacity: {
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      },
                      x: { type: "spring", bounce: 0.29, duration: 0.58 },
                      y: { type: "spring", bounce: 0.29, duration: 0.58 },
                      scale: { type: "spring", bounce: 0.29, duration: 0.58 },
                      rotate: { type: "spring", bounce: 0.29, duration: 0.58 },
                    }
              }
            >
              <div
                className="flex flex-col gap-[30px] rounded-[30px] p-[30px] shadow-[0_0_0_1px_#ffffff80]"
                style={{
                  backgroundColor: "#ffffff59",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                }}
              >
                <div className="flex flex-col gap-5">
                  <p className="whitespace-pre-line text-[17px] leading-[1.35] font-semibold tracking-[-0.03em] text-[#FFFFFA] md:text-[20px]">
                    &ldquo;{HERO.quote}&rdquo;
                  </p>
                  <div
                    className="h-px w-full"
                    style={{ backgroundColor: "#e3e3e373" }}
                    aria-hidden
                  />
                  <p className="text-[14px] leading-[1.5] font-semibold tracking-[-0.03em] text-[#E6E6E6]">
                    {HERO.body}
                  </p>
                </div>
                <div className="flex items-center gap-[15px]">
                  <Avatar src={HERO.avatar} alt={HERO.name} size={58} />
                  <div>
                    <p className="text-[14px] font-semibold tracking-[-0.03em] text-[#FAFAF7]">
                      {HERO.name}
                    </p>
                    <p className="text-[13px] font-semibold tracking-[-0.025em] text-[#E6E6E6]">
                      {HERO.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div
        ref={cardsRef}
        className="w-full max-w-[1600px] px-5 md:px-10 xl:px-[60px]"
      >
        <div
          className="flex flex-col gap-[10px] p-[10px] md:hidden"
          style={{ backgroundColor: CREAM, borderRadius: 40 }}
        >
          {CARDS.map((card, i) => (
            <motion.div
              key={card.id}
              className="h-full"
              initial={
                reduceMotion ? false : { opacity: 0.001, y: 10, scale: 0.9 }
              }
              animate={
                showCards
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0.001, y: 10, scale: 0.9 }
              }
              transition={{
                ...appear,
                delay: reduceMotion ? 0 : i * 0.05,
              }}
            >
              <AccordionCard
                {...card}
                open={openIndex === i}
                onActivate={() => setOpenIndex(i)}
                reduceMotion={reduceMotion}
              />
            </motion.div>
          ))}
        </div>

        <div
          className="hidden gap-[10px] p-[10px] md:grid"
          style={{
            backgroundColor: CREAM,
            borderRadius: 40,
            gridTemplateColumns: gridColumns,
            transition: reduceMotion
              ? undefined
              : "grid-template-columns 450ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {CARDS.map((card, i) => (
            <motion.div
              key={`desk-${card.id}`}
              className="h-full min-h-0 min-w-0"
              initial={
                reduceMotion ? false : { opacity: 0.001, y: 10, scale: 0.9 }
              }
              animate={
                showCards
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0.001, y: 10, scale: 0.9 }
              }
              transition={{
                ...appear,
                delay: reduceMotion ? 0 : i * 0.05,
              }}
            >
              <AccordionCard
                {...card}
                open={openIndex === i}
                onActivate={() => setOpenIndex(i)}
                reduceMotion={reduceMotion}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
