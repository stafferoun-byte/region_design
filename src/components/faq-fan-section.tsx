"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const FONT =
  '"Wanted Sans Variable", "Wanted Sans", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';

const CREAM_A = "#eceae5";
const CREAM_B = "#eae7da";
const INK = "#1a1a1a";

/**
 * Scroll sequence from Webflow screenshots:
 * 1) stacked slight fan → 2) open fan → 3) flat 5-col strip (gap 1px)
 * @see https://webflow.com/made-in-webflow/website/testimonials-scrolling-animation
 */
type FaqItem = {
  id: string;
  kind: "faq" | "photo";
  question?: string;
  answer?: string;
  name?: string;
  role?: string;
  image?: string;
  avatar?: string;
  bg: string;
  /** column index 0..4 — distance from center drives motion */
  col: number;
};

const ITEMS: FaqItem[] = [
  {
    id: "1",
    kind: "faq",
    col: 0,
    question: "상담 비용은 얼마인가요?",
    answer:
      "초회 상담은 사건 유형에 따라 안내드립니다. 유선으로 빠르게 확인해 드릴 수 있어요.",
    name: "FAQ",
    role: "이로운 법률사무소",
    avatar: "/images/eroun-logo.png",
    bg: CREAM_A,
  },
  {
    id: "2",
    kind: "faq",
    col: 1,
    question: "방문 없이 상담이 가능한가요?",
    answer: "전화·화상 상담이 가능합니다. 일정에 맞춰 편하게 예약해 주세요.",
    name: "FAQ",
    role: "이로운 법률사무소",
    avatar: "/images/eroun-logo.png",
    bg: CREAM_B,
  },
  {
    id: "3",
    kind: "photo",
    col: 2,
    image: "/images/faq-center.png",
    bg: CREAM_B,
  },
  {
    id: "4",
    kind: "faq",
    col: 3,
    question: "야간·주말에도 상담이 되나요?",
    answer:
      "긴급 형사·성범죄 사건은 야간·주말에도 대응합니다. 상담센터로 연락해 주세요.",
    name: "FAQ",
    role: "이로운 법률사무소",
    avatar: "/images/eroun-logo.png",
    bg: CREAM_B,
  },
  {
    id: "5",
    kind: "faq",
    col: 4,
    question: "지방에서도 의뢰할 수 있나요?",
    answer:
      "전국 상담이 가능합니다. 필요 시 방문 일정을 함께 조율해 드립니다.",
    name: "FAQ",
    role: "이로운 법률사무소",
    avatar: "/images/eroun-logo.png",
    bg: CREAM_A,
  },
];

const CARD_SHADOW =
  "0 1px 3px rgba(0,0,0,0.06), 0 10px 28px rgba(0,0,0,0.10)";

function GridCard({
  item,
  progress,
  reduceMotion,
}: {
  item: FaqItem;
  progress: MotionValue<number>;
  reduceMotion: boolean | null;
}) {
  const fromCenter = item.col - 2; // -2..+2

  /**
   * p=0   stacked at center, slight fan (shot 1)
   * p=0.45 open fan (shot 2)
   * p=1   flat 5-col row, rotate 0 (shot 3)
   *
   * x is % of own card width so it stays responsive in the grid.
   */
  const x = useTransform(
    progress,
    [0, 0.45, 1],
    reduceMotion
      ? ["0%", "0%", "0%"]
      : [`${-fromCenter * 100}%`, `${-fromCenter * 55}%`, "0%"],
  );

  const rotate = useTransform(
    progress,
    [0, 0.45, 1],
    reduceMotion
      ? [0, 0, 0]
      : [fromCenter * 6, fromCenter * 12, 0],
  );

  // Cards keep sliding down with scroll after they open (Webflow)
  const y = useTransform(
    progress,
    [0, 0.45, 1],
    reduceMotion ? [0, 0, 0] : [0, fromCenter === 0 ? 0 : 8, fromCenter === 0 ? 0 : 28],
  );

  const zIndex = item.kind === "photo" ? 100 : 10 - Math.abs(fromCenter);

  return (
    <motion.article
      className="relative min-h-[400px] origin-bottom will-change-transform"
      style={{
        x,
        y,
        rotate,
        zIndex,
        backgroundColor: item.bg,
        borderRadius: 5,
        boxShadow: CARD_SHADOW,
      }}
    >
      {item.kind === "photo" ? (
        <div className="relative h-full min-h-[400px] w-full overflow-hidden rounded-[5px]">
          <Image
            src={item.image!}
            alt="이로운 법률사무소"
            fill
            className="object-cover object-center"
            sizes="(min-width: 1024px) 20vw, 100vw"
            priority
          />
        </div>
      ) : (
        <div className="flex h-full min-h-[400px] flex-col items-center justify-center gap-5 px-4 py-6 text-center">
          <p
            className="text-[13px] leading-[1.4] font-medium tracking-[-0.02em] md:text-[14px] lg:text-[15px]"
            style={{ fontFamily: FONT, color: INK }}
          >
            “{item.question} {item.answer}”
          </p>

          <div className="flex flex-col items-center gap-1.5">
            <span className="relative size-[48px] overflow-hidden rounded-full bg-white">
              <Image
                src={item.avatar!}
                alt=""
                fill
                className="object-contain p-1.5"
                sizes="48px"
              />
            </span>
            <span
              className="text-[12px] leading-[1.3] font-semibold"
              style={{ fontFamily: FONT, color: INK }}
            >
              {item.name}
            </span>
            <span
              className="text-[11px] leading-[1.3] text-black/50"
              style={{ fontFamily: FONT }}
            >
              {item.role}
            </span>
          </div>
        </div>
      )}
    </motion.article>
  );
}

function MobileList({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <div className="mx-auto flex w-full max-w-[420px] flex-col gap-px px-5 pb-16 md:hidden">
      {ITEMS.map((item, i) => {
        const fromLeft = i % 2 === 0;
        if (item.kind === "photo") {
          return (
            <motion.div
              key={item.id}
              className="relative aspect-[3/4] w-full overflow-hidden"
              style={{ borderRadius: 5, boxShadow: CARD_SHADOW }}
              initial={reduceMotion ? false : { x: fromLeft ? -48 : 48 }}
              whileInView={{ x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={item.image!}
                alt="이로운 법률사무소"
                fill
                className="object-cover"
                sizes="400px"
              />
            </motion.div>
          );
        }
        return (
          <motion.article
            key={item.id}
            className="flex flex-col items-center gap-4 px-5 py-10 text-center"
            style={{
              backgroundColor: item.bg,
              borderRadius: 5,
              boxShadow: CARD_SHADOW,
            }}
            initial={reduceMotion ? false : { x: fromLeft ? -48 : 48 }}
            whileInView={{ x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="text-[15px] leading-[1.4] font-medium"
              style={{ fontFamily: FONT, color: INK }}
            >
              “{item.question} {item.answer}”
            </p>
            <div className="flex flex-col items-center gap-1.5">
              <span className="relative size-12 overflow-hidden rounded-full bg-white">
                <Image
                  src={item.avatar!}
                  alt=""
                  fill
                  className="object-contain p-1.5"
                  sizes="48px"
                />
              </span>
              <span
                className="text-[12px] font-semibold"
                style={{ fontFamily: FONT, color: INK }}
              >
                {item.name}
              </span>
              <span
                className="text-[11px] text-black/50"
                style={{ fontFamily: FONT }}
              >
                {item.role}
              </span>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}

export function FaqFanSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative z-20 bg-white"
      aria-label="자주 묻는 질문"
    >
      {/* Desktop: sticky title + grid; tall track drives stack→fan→row */}
      <div className="relative hidden h-[280vh] md:block">
        <div className="sticky top-0 flex min-h-svh flex-col items-center pt-[min(8vh,64px)] pb-10">
          <h2
            className="relative z-20 mb-16 max-w-[18ch] px-6 text-center text-[clamp(32px,4vw,52px)] leading-[1.15] font-bold tracking-[-0.05em] text-[#1a1a1a] lg:mb-20"
            style={{ fontFamily: FONT }}
          >
            상담 전 많이 문의하시는
            <br />
            질문을 정리했습니다.
          </h2>

          {/* Exact Webflow strip: 5 cols, 1px gap */}
          <div className="grid w-full grid-cols-5 gap-px px-3 lg:px-6">
            {ITEMS.map((item) => (
              <GridCard
                key={item.id}
                item={item}
                progress={scrollYProgress}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="px-5 pt-16 pb-12">
          <h2
            className="mx-auto max-w-[16ch] text-center text-[28px] leading-[1.3] font-bold tracking-[-0.05em] text-[#1a1a1a]"
            style={{ fontFamily: FONT }}
          >
            상담 전 많이 문의하시는
            <br />
            질문을 정리했습니다.
          </h2>
        </div>
        <MobileList reduceMotion={reduceMotion} />
      </div>
    </section>
  );
}
