"use client";

import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

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

const ITEMS: Item[] = [
  {
    id: "contrib",
    term: "기여분",
    subtitle: "부모님을 모신 시간과\n나의 정성에 대한 권리",
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
];

/** Three rows — alternating scroll direction like Kuemmerlein */
const ROWS: { dir: "left" | "right"; order: number[] }[] = [
  { dir: "left", order: [0, 1, 2, 3, 4, 5, 6] },
  { dir: "right", order: [3, 4, 5, 6, 0, 1, 2] },
  { dir: "left", order: [5, 6, 0, 1, 2, 3, 4] },
];

function TermPill({ item }: { item: Item }) {
  return (
    <div
      className="legal-term-pill group relative inline-flex h-[76px] w-[min(92vw,420px)] shrink-0 items-center overflow-hidden rounded-[45px] pr-[90px] pl-7 transition-colors duration-300 md:h-[90px] md:w-[420px] md:pr-[100px] md:pl-9"
      style={{ backgroundColor: PILL }}
    >
      <p
        className="whitespace-pre-line text-left text-[14px] leading-[1.4] font-semibold tracking-[-0.03em] break-keep md:text-[16px]"
        style={{ color: INK, fontFamily: FONT }}
      >
        {item.subtitle}
      </p>
      <span
        className="absolute top-[5px] right-[5px] size-[66px] overflow-hidden rounded-full md:size-[80px]"
        style={{ backgroundColor: ACCENT }}
      >
        {item.image ? (
          <>
            <span className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0">
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
            </span>
            <span
              className="absolute inset-0 grid place-items-center px-1.5 text-center text-[14px] leading-[1.15] font-bold tracking-[-0.04em] break-keep text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:text-[16px]"
              style={{ fontFamily: FONT }}
            >
              {item.term}
            </span>
          </>
        ) : (
          <span
            className="grid size-full place-items-center px-1.5 text-center text-[14px] leading-[1.15] font-bold tracking-[-0.04em] break-keep text-white md:text-[16px]"
            style={{ fontFamily: FONT }}
          >
            {item.term}
          </span>
        )}
      </span>
    </div>
  );
}

function TickerRow({
  dir,
  order,
  reduceMotion,
}: {
  dir: "left" | "right";
  order: number[];
  reduceMotion: boolean | null;
}) {
  const sequence = order.map((i) => ITEMS[i]);
  /** Two copies for seamless -50% loop */
  const loop = [...sequence, ...sequence];

  return (
    <div className="w-full overflow-hidden">
      <div
        className={
          reduceMotion
            ? "flex w-max gap-[20px] md:gap-[30px]"
            : dir === "left"
              ? "legal-ticker-left flex w-max gap-[20px] md:gap-[30px]"
              : "legal-ticker-right flex w-max gap-[20px] md:gap-[30px]"
        }
      >
        {loop.map((item, i) => (
          <TermPill key={`${dir}-${item.id}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export function LegalTermsAccordionSection() {
  const reduceMotion = useReducedMotion();
  const [ctaHovered, setCtaHovered] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="relative w-full px-5 pt-[40px] pb-[40px] md:px-10 md:pt-[56px] md:pb-[60px] xl:px-12"
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
          <motion.h2
            className="max-w-[16em] text-[clamp(28px,3.6vw,48px)] leading-[1.2] font-bold tracking-[-0.05em] break-keep text-white will-change-[opacity,transform,filter]"
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
            transition={{
              duration: reduceMotion ? 0 : 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            변호사에게는 익숙한 용어지만,
            <br />
            당신에게는 처음일 수 있으니까
          </motion.h2>
          <motion.p
            className="max-w-none shrink-0 text-[20px] leading-[1.3] font-semibold tracking-[-0.04em] break-keep whitespace-nowrap text-white/85 will-change-[opacity,transform,filter] md:pb-1 md:text-[25px]"
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
            transition={{
              duration: reduceMotion ? 0 : 0.85,
              delay: reduceMotion ? 0 : 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            법은 이렇게 말하지만 사실은 이런 뜻이에요.
          </motion.p>
        </div>

        <div className="flex flex-col gap-4 md:gap-5">
          {ROWS.map((row) => (
            <TickerRow
              key={`${row.dir}-${row.order.join("-")}`}
              dir={row.dir}
              order={row.order}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        className="mx-auto mt-[84px] w-full max-w-[min(100%,1220px)] md:mt-[104px] md:max-w-[1340px]"
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
        transition={{
          duration: reduceMotion ? 0 : 0.7,
          delay: reduceMotion ? 0 : 0.18,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.a
          href="#consult"
          onMouseEnter={() => setCtaHovered(true)}
          onMouseLeave={() => setCtaHovered(false)}
          className="relative block h-[86px] w-full text-left no-underline md:h-[104px]"
          aria-label="상담 예약하기"
        >
          <motion.span
            className="flex min-h-[86px] items-center rounded-full px-[28px] md:min-h-[104px] md:px-[44px]"
            animate={
              reduceMotion
                ? undefined
                : {
                    width: ctaHovered ? "calc(100% - 116px)" : "100%",
                    paddingRight: 44,
                  }
            }
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            style={{ backgroundColor: ACCENT, height: "100%" }}
          >
            <span className="text-[18px] leading-[1.28] font-semibold tracking-[-0.04em] text-white md:text-[27px]">
              어려운 법률용어가 아닌, 일상의 언어로
              <br />
              쉽고 분명하게 안내해드릴게요.
            </span>
          </motion.span>

          <motion.span
            aria-hidden
            className="absolute top-0 right-0 block aspect-square h-full overflow-hidden rounded-full"
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
