"use client";

import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { SectionTitleReveal, WordReveal } from "@/components/section-title-reveal";

/**
 * Legal-terms ticker — layout from Kümmerlein Über uns team ticker
 * @see https://www.kuemmerlein.de/ueber-uns/
 * Circle = term · left text = definition
 */

type Item = {
  id: string;
  term: string;
  subtitle: string;
  image?: string;
};

const ACCENT = "#5DC39B";
const PILL = "#FCFCFA";
const INK = "#242424";
const FONT =
  '"Wanted Sans Variable", "Wanted Sans", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';

const TITLE_LINE_1 = [{ text: "변호사에게는", color: "#FFFFFF" }] as const;

const TITLE_LINE_2 = [
  { text: "익숙한", color: "#FFFFFF" },
  { text: "용어지만,", color: "#FFFFFF" },
] as const;

const TITLE_LINE_3 = [{ text: "당신에게는", color: "#FFFFFF" }] as const;

const TITLE_LINE_4 = [
  { text: "처음일", color: "#FFFFFF" },
  { text: "수", color: "#FFFFFF" },
  { text: "있으니까", color: "#FFFFFF" },
] as const;

const CAPTION_LINE = [
  { text: "법은", color: "rgba(255,255,255,0.85)" },
  { text: "이렇게", color: "rgba(255,255,255,0.85)" },
  { text: "말하지만", color: "rgba(255,255,255,0.85)" },
  { text: "사실은", color: "rgba(255,255,255,0.85)" },
  { text: "이런", color: "rgba(255,255,255,0.85)" },
  { text: "뜻이에요.", color: "rgba(255,255,255,0.85)" },
] as const;

const ITEMS: Item[] = [
  {
    id: "contrib",
    term: "기여분",
    subtitle: "부모님을 돌본 나의 시간과\n희생이 상속에 반영된 몫",
    image: "/images/dbd0ccc9-5a78-4d7a-8da4-821e6534d742.png",
  },
  {
    id: "visitation",
    term: "면접교섭권",
    subtitle: "부부는 끝나도 부모로 남을 권리",
    image: "/images/9850f0e9-3eba-43ba-9959-c439444bea75.png",
  },
  {
    id: "limited-acceptance",
    term: "한정승인",
    subtitle: "내가 물려받은 만큼만 책임지는 것",
    image: "/images/ab9bc582-31b7-42c4-b8e6-a1329d5f8567.png",
  },
  {
    id: "presumption-of-innocence",
    term: "무죄추정",
    subtitle: "판결 전까지는, 누구도 죄인이 아니에요",
    image: "/images/b7acc50e-da46-45d3-9c67-138fc0c329cd.png",
  },
  {
    id: "special-benefit",
    term: "특별수익",
    subtitle: "먼저 받아간 재산은, 다시 계산에 들어와요",
    image: "/images/201e8a0d-8a93-4582-a01f-938a69fc1abd.png",
  },
  {
    id: "plaintiff-standing",
    term: "원고적격",
    subtitle: "이 소송을 제기할 자격이 있는 사람",
    image: "/images/85fc96e3-4345-43bc-a6c8-1f4d649a2fa6.png",
  },
  {
    id: "reserve",
    term: "유류분",
    subtitle: "유언으로도 빼앗을 수 없는,\n법이 남겨둔 최소한의 몫",
    image: "/images/eff650fb-8405-456c-85e1-9b2dd692e4c1.png",
  },
  {
    id: "divorce-consolation",
    term: "이혼 위자료",
    subtitle: "혼인 중 받은 상처에\n책임을 묻는 것",
    image: "/images/legal-terms/이혼위자료.jpg",
  },
  {
    id: "property-disclosure",
    term: "재산명시",
    subtitle: "내가 알지 못했던 재산까지\n확인하는 절차",
    image: "/images/legal-terms/재산명시.jpg",
  },
  {
    id: "parentage",
    term: "친생자관계\n확인",
    subtitle: "자신의 부모가 누구인지\n법적으로 확인하는 절차",
    image: "/images/legal-terms/친생자관계확인.jpg",
  },
  {
    id: "full-adoption",
    term: "친양자입양",
    subtitle: "함께 살아온 가족을 법적으로도\n온전한 가족으로 만드는 일",
    image: "/images/legal-terms/친양자입양.jpg",
  },
  {
    id: "adult-guardianship",
    term: "성년후견",
    subtitle: "혼자 판단하기 어려운 가족을\n대신해 권리를 지키는 제도",
    image: "/images/legal-terms/성년후견.jpg",
  },
  {
    id: "provisional-attachment",
    term: "가압류",
    subtitle: "판결 전 재산이 사라지지 않도록\n미리 붙잡아두는 조치",
    image: "/images/legal-terms/가압류.jpg",
  },
  {
    id: "compulsory-execution",
    term: "강제집행",
    subtitle: "승소판결문에 그치지 않고\n실제 회수로 이어가는 절차",
    image: "/images/legal-terms/강제집행.jpg",
  },
  {
    id: "renunciation",
    term: "상속포기",
    subtitle: "가족이라는 이유로\n빚까지 떠안지 않기 위한 선택",
    image: "/images/legal-terms/상속포기.jpg",
  },
  {
    id: "habeas-review",
    term: "구속적부심",
    subtitle: "이미 이루어진 구속이 타당한지\n다시 판단받는 절차",
    image: "/images/legal-terms/구속적부심.jpg",
  },
  {
    id: "sentencing-materials",
    term: "양형자료",
    subtitle: "한 번의 잘못이 아닌,\n살아온 과정까지 보여주는 자료",
    image: "/images/legal-terms/양형자료.jpg",
  },
];

/** Three rows — unique items per row (no cross-row repeats on screen) */
const ROWS: { dir: "left" | "right"; order: number[] }[] = [
  { dir: "left", order: [0, 1, 2, 3, 4, 5] },
  { dir: "right", order: [6, 7, 8, 9, 10, 11] },
  { dir: "left", order: [12, 13, 14, 15, 16] },
];

function TermPill({
  item,
  forceOpen = false,
}: {
  item: Item;
  forceOpen?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const revealed = forceOpen || open || hovered;
  const termLabel = item.term.replace(/\n/g, " ");
  const flip = reduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 420, damping: 28, mass: 0.7 };

  return (
    <motion.button
      type="button"
      aria-pressed={revealed}
      aria-label={revealed ? `${termLabel} 가리기` : `${termLabel} 보기`}
      onClick={() => setOpen((v) => !v)}
      onMouseEnter={() => {
        if (
          typeof window !== "undefined" &&
          window.matchMedia("(hover: hover) and (pointer: fine)").matches
        ) {
          setHovered(true);
        }
      }}
      onMouseLeave={() => setHovered(false)}
      className="legal-term-pill group relative inline-flex h-[60px] w-[min(68vw,280px)] shrink-0 cursor-pointer items-center overflow-hidden rounded-[40px] pr-[70px] pl-7 text-left outline-none focus-visible:ring-2 focus-visible:ring-white/70 md:h-[90px] md:w-[420px] md:rounded-[45px] md:pr-[100px] md:pl-9"
      style={{ backgroundColor: PILL }}
    >
      <p
        className="relative z-[1] whitespace-pre-line text-left text-[12px] leading-[1.35] font-medium tracking-[-0.03em] break-keep md:text-[17px] md:leading-[1.35] md:font-semibold"
        style={{ color: INK, fontFamily: FONT }}
      >
        {item.subtitle}
      </p>

      <span
        aria-hidden
        className="pointer-events-none absolute top-[4px] right-[4px] z-[2] size-[52px] rounded-full [perspective:600px] md:top-[5px] md:right-[5px] md:size-[80px]"
      >
        <motion.span
          className="relative block size-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: revealed ? 180 : 0 }}
          transition={flip}
        >
          {/* Front — photo */}
          <span
            className="absolute inset-0 overflow-hidden rounded-full"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              backgroundColor: ACCENT,
            }}
          >
            {item.image ? (
              <>
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className="object-cover object-[center_40%]"
                  sizes="80px"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 mix-blend-overlay"
                  style={{
                    opacity: 0.45,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: "120px 120px",
                  }}
                />
                <span
                  aria-hidden
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

          {/* Back — legal term */}
          <span
            className="absolute inset-0 flex flex-col items-center justify-center rounded-full px-1 text-center text-[11px] leading-none font-bold tracking-[-0.04em] break-keep text-white md:px-1.5 md:text-[15px]"
            style={{
              fontFamily: FONT,
              backgroundColor: ACCENT,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            {item.term.split("\n").map((line) => (
              <span key={line} className="block leading-[1.2]">
                {line}
              </span>
            ))}
          </span>
        </motion.span>
      </span>
    </motion.button>
  );
}

function TickerRow({
  dir,
  order,
  reduceMotion,
  forceOpen,
}: {
  dir: "left" | "right";
  order: number[];
  reduceMotion: boolean | null;
  forceOpen?: boolean;
}) {
  const sequence = order.map((i) => ITEMS[i]);
  /** Two copies for seamless -50% loop */
  const loop = [...sequence, ...sequence];

  return (
    <div className="w-full overflow-hidden">
      <div
        className={
          reduceMotion
            ? "flex w-max gap-[14px] md:gap-[30px]"
            : dir === "left"
              ? "legal-ticker-left flex w-max gap-[14px] md:gap-[30px]"
              : "legal-ticker-right flex w-max gap-[14px] md:gap-[30px]"
        }
      >
        {loop.map((item, i) => (
          <TermPill
            key={`${dir}-${item.id}-${i}`}
            item={item}
            forceOpen={forceOpen}
          />
        ))}
      </div>
    </div>
  );
}

export function LegalTermsAccordionSection() {
  const reduceMotion = useReducedMotion();
  const [ctaHovered, setCtaHovered] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="relative w-full px-5 pt-[40px] pb-[72px] md:px-10 md:pt-[56px] md:pb-[60px] xl:px-12"
      aria-label="법률 용어"
      style={{ fontFamily: FONT }}
    >
      <motion.div
        className="mx-auto w-full max-w-[1480px] overflow-hidden rounded-[30px] pt-[clamp(40px,8vw,84px)] pb-[clamp(56px,10vw,110px)]"
        style={{ backgroundColor: ACCENT }}
        initial={
          reduceMotion ? false : { opacity: 0.001, y: 12 }
        }
        animate={
          inView || reduceMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 0.001, y: 12 }
        }
        transition={{
          duration: reduceMotion ? 0 : 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="mb-[clamp(52px,7vw,96px)] flex flex-col gap-6 px-6 md:flex-row md:items-end md:justify-start md:gap-[clamp(36px,5vw,80px)] md:px-10 xl:px-14">
          <SectionTitleReveal
            lines={[TITLE_LINE_1, TITLE_LINE_2, TITLE_LINE_3, TITLE_LINE_4]}
            inView={inView}
            reduceMotion={reduceMotion}
            className="max-w-[16em] text-[30px] leading-[1.15] font-bold tracking-[-0.04em] break-keep will-change-[opacity,transform] md:text-[clamp(28px,3.6vw,48px)] md:leading-[1.2] md:tracking-[-0.05em]"
            style={{ fontFamily: FONT, color: "#FFFFFF" }}
            ariaLabel="변호사에게는 익숙한 용어지만, 당신에게는 처음일 수 있으니까"
          />
          <WordReveal
            as="p"
            lines={[CAPTION_LINE]}
            inView={inView}
            reduceMotion={reduceMotion}
            delay={0.1}
            className="max-w-none shrink-0 text-[15px] leading-[1.4] font-semibold tracking-[-0.04em] break-keep will-change-[opacity,transform] md:pb-1 md:text-[25px] md:leading-[1.3] md:whitespace-nowrap"
            style={{ fontFamily: FONT }}
            ariaLabel="법은 이렇게 말하지만 사실은 이런 뜻이에요."
          />
        </div>

        <div className="flex flex-col gap-3 md:gap-5">
          {ROWS.map((row) => (
            <TickerRow
              key={`${row.dir}-${row.order.join("-")}`}
              dir={row.dir}
              order={row.order}
              reduceMotion={reduceMotion}
              forceOpen={showTerms}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        className="mx-auto mt-[48px] mb-6 flex w-full max-w-[min(100%,1220px)] justify-center md:mt-[104px] md:mb-0 md:block md:max-w-[1340px]"
        initial={
          reduceMotion
            ? false
            : { opacity: 0, y: 14 }
        }
        animate={
          inView || reduceMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 14 }
        }
        transition={{
          duration: reduceMotion ? 0 : 0.7,
          delay: reduceMotion ? 0 : 0.18,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.a
          href="#consult"
          onMouseEnter={() => {
            if (
              typeof window !== "undefined" &&
              window.matchMedia("(max-width: 767px)").matches
            ) {
              return;
            }
            setCtaHovered(true);
          }}
          onMouseLeave={() => setCtaHovered(false)}
          onClick={(e) => {
            if (typeof window === "undefined") return;
            if (window.matchMedia("(max-width: 767px)").matches) {
              e.preventDefault();
              setCtaHovered(false);
              setShowTerms((v) => !v);
            }
          }}
          className="relative block h-[72px] w-[min(88%,320px)] text-left no-underline md:h-[104px] md:w-full"
          aria-label={
            showTerms
              ? "법률 용어 사진으로 되돌리기"
              : "법률 용어 단어로 보기"
          }
          aria-pressed={showTerms}
        >
          <motion.span
            className="flex h-full min-h-[72px] w-full items-center justify-start rounded-full px-6 text-left md:min-h-[104px] md:px-[44px]"
            animate={
              reduceMotion
                ? undefined
                : {
                    width: ctaHovered ? "calc(100% - 116px)" : "100%",
                  }
            }
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            style={{ backgroundColor: ACCENT, height: "100%" }}
          >
            <span className="flex flex-col gap-0.5 text-white">
              <span className="text-[15px] leading-[1.25] font-semibold tracking-[-0.04em] md:text-[30px]">
                어려운 법률용어가 아닌, 일상의 언어로
              </span>
              <span className="text-[15px] leading-[1.25] font-semibold tracking-[-0.04em] md:text-[18px]">
                쉽고 분명하게 안내해드릴게요.
              </span>
            </span>
          </motion.span>

          {/* Desktop hover only — circle split; mobile stays a single capsule */}
          <motion.span
            aria-hidden
            className="absolute top-0 right-0 hidden aspect-square h-full overflow-hidden rounded-full md:block"
            initial={false}
            animate={
              reduceMotion
                ? { opacity: 0, scale: 0.2 }
                : ctaHovered
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.2 }
            }
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            style={{
              backgroundColor: ACCENT,
              transformOrigin: "center center",
            }}
          />
        </motion.a>
      </motion.div>
    </section>
  );
}
