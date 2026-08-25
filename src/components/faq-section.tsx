"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useRef, useState } from "react";
import { SectionTitleReveal } from "@/components/section-title-reveal";

/**
 * FAQ — layout/tokens from Kora FAQ
 * @see https://kora.framer.media/
 */

const FONT =
  '"Wanted Sans Variable", "Wanted Sans", "Manrope", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';

const ACCENT = "#5DC39B";
const CREAM = "#F7F7ED";
const CARD = "#FFFFFA";
const INK = "#242424";
const MUTED = "#5C5C5C";
/** Match contact island width (Kora floating cream panels) */
const PANEL_MAX = "560px";

const FAQ_TITLE_LINE_1 = [
  { text: "상담", color: "#000000" },
  { text: "전", color: "#000000" },
] as const;

const FAQ_TITLE_LINE_2 = [
  { text: "많이", color: "#000000" },
  { text: "문의하시는", color: "#000000" },
  { text: "질문을", color: "#000000" },
  { text: "정리했습니다.", color: "#000000" },
] as const;

type CategoryId = "general" | "pricing" | "process" | "results";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: "general", label: "상담" },
  { id: "pricing", label: "비용" },
  { id: "process", label: "진행" },
  { id: "results", label: "결과" },
];

const FAQ_BY_CATEGORY: Record<CategoryId, FaqItem[]> = {
  general: [
    {
      id: "g1",
      question: "상담은 어떻게 진행되나요?",
      answer:
        "먼저 사건 경위와 현재 상황을 차분히 듣고, 법적으로 중요한 쟁점과 선택지를 쉬운 말로 정리해 드립니다. 급한 일정이나 위험 요소가 있다면 우선순위를 함께 잡아 드리고, 다음 단계까지 분명하게 안내합니다.",
    },
    {
      id: "g2",
      question: "첫 상담 때 무엇을 준비하면 되나요?",
      answer:
        "관련 서류(계약서, 고소장, 판결문, 문자·이메일 기록 등)가 있다면 가져와 주세요. 없어도 괜찮습니다. 지금까지의 경과를 시간순으로 메모해 오시면 상담이 더 빠르고 정확해집니다.",
    },
    {
      id: "g3",
      question: "전화·화상 상담도 가능한가요?",
      answer:
        "네. 방문이 어려우신 경우 전화 또는 화상으로도 상담을 진행합니다. 다만 서류 확인이 중요한 사건은 방문 상담을 권하며, 상황에 맞춰 안내해 드립니다.",
    },
    {
      id: "g4",
      question: "상담 내용은 비밀이 보장되나요?",
      answer:
        "물론입니다. 상담 과정에서 말씀하신 내용과 제출하신 자료는 변호사의 비밀유지 의무에 따라 엄격히 보호됩니다.",
    },
  ],
  pricing: [
    {
      id: "p1",
      question: "수임료는 어떻게 정해지나요?",
      answer:
        "사건의 난이도, 예상 기간, 필요한 절차에 따라 달라집니다. 상담 후 범위를 함께 정한 뒤, 착수금·성공보수 등 구조를 투명하게 안내드립니다. 예상치 못한 추가 비용이 생기지 않도록 사전에 기준을 명확히 합니다.",
    },
    {
      id: "p2",
      question: "상담 비용이 별도로 있나요?",
      answer:
        "초기 상담 비용은 사건 유형과 소요 시간에 따라 안내드립니다. 수임으로 이어지는 경우 상담료를 수임료에 반영하는 방식도 가능하니, 예약 시 편하게 문의해 주세요.",
    },
    {
      id: "p3",
      question: "분할 납부가 가능한가요?",
      answer:
        "사건 성격과 진행 단계에 따라 분할 납부를 협의할 수 있습니다. 부담이 되지 않는 일정을 함께 맞춰 드리겠습니다.",
    },
    {
      id: "p4",
      question: "패소하면 비용을 돌려받을 수 있나요?",
      answer:
        "성공보수 약정이 있는 경우 결과에 따라 정산 방식이 달라집니다. 계약 전에 승패와 무관한 기본 비용, 성공보수 조건을 문서로 분명히 안내드립니다.",
    },
  ],
  process: [
    {
      id: "c1",
      question: "수임 후 진행 상황은 어떻게 알 수 있나요?",
      answer:
        "주요 일정·서류 제출·상대 대응이 있을 때마다 먼저 연락드립니다. 궁금한 점은 언제든 물어보셔도 되고, 법률 용어도 일상 언어로 다시 풀어 설명드립니다.",
    },
    {
      id: "c2",
      question: "사건은 보통 얼마나 걸리나요?",
      answer:
        "사건 유형과 법원·상대방 대응에 따라 다릅니다. 상담 단계에서 대략적인 기간과 변수(합의 가능성, 증거 확보 등)를 솔직하게 말씀드리고, 진행 중에도 일정을 업데이트합니다.",
    },
    {
      id: "c3",
      question: "제가 직접 해야 할 일이 있나요?",
      answer:
        "사실관계 확인, 자료 준비, 중요 결정은 의뢰인분의 도움이 필요합니다. 대신 ‘지금 무엇을, 왜, 언제까지’ 해야 하는지를 단계별로 정리해 드리니 혼자 고민하지 않으셔도 됩니다.",
    },
    {
      id: "c4",
      question: "중간에 담당 변호사가 바뀌나요?",
      answer:
        "원칙적으로 처음 배정된 팀이 끝까지 함께합니다. 불가피한 사정이 있으면 사전 안내 후, 인수인계가 끊기지 않도록 조치합니다.",
    },
  ],
  results: [
    {
      id: "r1",
      question: "승소를 보장해 주시나요?",
      answer:
        "어떤 법률사무소도 결과를 장담할 수는 없습니다. 대신 유리·불리한 지점을 숨기지 않고 설명하고, 현실적인 목표와 전략을 함께 세우는 것을 원칙으로 합니다.",
    },
    {
      id: "r2",
      question: "합의와 재판 중 무엇을 택해야 할까요?",
      answer:
        "시간·비용·감정적 부담·실현 가능한 결과를 기준으로 비교해 드립니다. ‘이기는 것’만이 아니라, 일상으로 더 빨리·더 안전하게 돌아가는 길을 함께 고릅니다.",
    },
    {
      id: "r3",
      question: "사건이 끝난 뒤에도 도움을 받을 수 있나요?",
      answer:
        "판결·합의 이후 이행, 기록 보관, 비슷한 상황 예방까지 필요하시면 이어서 도와드립니다. 한 번의 사건으로 끝나지 않도록, 다음을 위한 안내도 남겨 드립니다.",
    },
    {
      id: "r4",
      question: "다른 사무소에서 진행 중인 사건도 상담할 수 있나요?",
      answer:
        "네. 현재 진행 상황과 자료를 기준으로 객관적인 의견을 드립니다. 선임 전환이 필요하면 절차와 유의사항도 함께 안내합니다.",
    },
  ],
};

const AVATAR_SLOTS = 3;

const easeOut = [0.22, 1, 0.36, 1] as const;

const faqListVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.06,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

const faqItemVariants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.36,
      ease: easeOut,
    },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: {
      duration: 0.18,
      ease: easeOut,
    },
  },
};

/** Kora FAQ Plus: cream 20×20 circle → rotate 180° + V slides out (clipped) → minus */
function PlusMinus({ open }: { open: boolean }) {
  const icon = "#292929";
  const ease = "cubic-bezier(0.22, 1, 0.36, 1)";

  return (
    <span
      aria-hidden
      className="relative flex size-5 shrink-0 flex-col items-center justify-center overflow-visible p-1"
      style={{
        backgroundColor: CREAM,
        borderRadius: "100%",
      }}
    >
      <span
        className="relative h-px w-full flex-1 overflow-clip"
        style={{
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          transition: `transform 0.35s ${ease}`,
        }}
      >
        {/* V — slides down out of clip when open */}
        <span
          className="absolute left-[calc(50%-1px)] z-[1] h-full w-[2px] rounded-[30px]"
          style={{
            backgroundColor: icon,
            top: open ? 12 : 0,
            transition: `top 0.35s ${ease}`,
          }}
        />
        {/* H */}
        <span
          className="absolute top-[calc(50%-1px)] left-0 z-[1] h-[2px] w-full rounded-[30px]"
          style={{ backgroundColor: icon }}
        />
      </span>
    </span>
  );
}

function FaqRow({
  item,
  open,
  onToggle,
  reduceMotion,
}: {
  item: FaqItem;
  open: boolean;
  onToggle: () => void;
  reduceMotion: boolean | null;
}) {
  return (
    <div
      className="overflow-hidden rounded-[26px] transition-[background-color] duration-300 md:rounded-[28px]"
      style={{ backgroundColor: open ? "#FFFFFF" : CARD }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center gap-4 px-5 py-4 text-left md:gap-5 md:px-6 md:py-[18px]"
      >
        <span
          className="min-w-0 flex-1 text-[16px] leading-[1.35] font-bold tracking-[-0.03em] break-keep md:text-[18px]"
          style={{ color: INK, fontFamily: FONT }}
        >
          {item.question}
        </span>
        <PlusMinus open={open} />
      </button>

      <div
        className="grid"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: reduceMotion
            ? undefined
            : "grid-template-rows 0.38s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div className="min-h-0 overflow-hidden">
          <p
            className="max-w-[540px] px-5 pb-5 text-[14px] leading-[1.65] font-medium tracking-[-0.02em] break-keep md:px-6 md:pb-6 md:text-[15px]"
            style={{
              color: MUTED,
              fontFamily: FONT,
              opacity: open ? 1 : 0,
              transition: reduceMotion
                ? undefined
                : "opacity 0.28s ease",
            }}
          >
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FaqSection({
  items: customItems,
  categoryLabel,
  categories: customCategories,
  faqByCategory: customFaqByCategory,
}: {
  items?: FaqItem[];
  /** When set with custom items, shows a single mint pill instead of tabs */
  categoryLabel?: string;
  /** Custom tab labels (id + label). Requires faqByCategory. */
  categories?: { id: string; label: string }[];
  faqByCategory?: Record<string, FaqItem[]>;
} = {}) {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.18 });
  /** Fire when the question list itself is on screen — not just the heading */
  const listInView = useInView(listRef, {
    once: true,
    amount: 0.35,
    margin: "0px 0px -8% 0px",
  });

  const useCustomTabs = Boolean(
    customCategories?.length && customFaqByCategory,
  );
  const initialCustomId = customCategories?.[0]?.id ?? "general";

  const [category, setCategory] = useState<string>(
    useCustomTabs ? initialCustomId : "general",
  );
  const [openId, setOpenId] = useState<string>(() => {
    if (customItems?.[0]?.id) return customItems[0].id;
    if (useCustomTabs) {
      return customFaqByCategory![initialCustomId]?.[0]?.id ?? "";
    }
    return "g1";
  });
  const [copied, setCopied] = useState(false);

  const items = customItems
    ? customItems
    : useCustomTabs
      ? (customFaqByCategory![category] ?? [])
      : FAQ_BY_CATEGORY[category as CategoryId];

  const showDefaultCategories = !customItems && !useCustomTabs;
  const showCustomCategories = useCustomTabs && !customItems;
  const showSinglePill = Boolean(customItems && categoryLabel);
  const tabCategories = showCustomCategories
    ? customCategories!
    : CATEGORIES;
  const listKey = customItems ? "custom" : category;
  const phone = "1800-9730";
  const listRevealed = Boolean(reduceMotion || listInView);

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(phone);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative w-full px-5 py-[60px] md:px-10 md:py-[90px] xl:px-12 xl:py-[120px]"
      style={{ fontFamily: FONT, backgroundColor: "#FCFCFA" }}
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-10 md:gap-14 xl:gap-16">
        <SectionTitleReveal
          id="faq-heading"
          lines={[FAQ_TITLE_LINE_1, FAQ_TITLE_LINE_2]}
          inView={inView}
          reduceMotion={reduceMotion}
          className="mx-auto max-w-[16em] text-center text-[clamp(30px,3.8vw,48px)] leading-[1.28] font-bold tracking-[-0.05em] break-keep will-change-[opacity,transform]"
          style={{ fontFamily: FONT }}
        />

        <div className="flex w-full flex-col items-center gap-3 md:gap-4">
          {/* Kora cream panel — same width as contact island, ~10px inset */}
          <motion.div
            className="flex w-full flex-col items-center overflow-hidden rounded-[40px] p-[10px]"
            style={{ backgroundColor: CREAM, maxWidth: PANEL_MAX }}
            initial={
              reduceMotion ? false : { opacity: 0, y: 14 }
            }
            animate={
              inView || reduceMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 14 }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.5,
              delay: reduceMotion ? 0 : 0.04,
              ease: easeOut,
            }}
          >
            <div className="flex w-full flex-col items-center gap-[10px]">
              {showDefaultCategories || showCustomCategories ? (
                <div
                  className="flex flex-wrap items-center justify-center gap-[5px] pt-3 pb-1"
                  role="tablist"
                  aria-label="FAQ 카테고리"
                >
                  {tabCategories.map((cat) => {
                    const active = cat.id === category;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => {
                          setCategory(cat.id);
                          const nextItems = showCustomCategories
                            ? customFaqByCategory![cat.id]
                            : FAQ_BY_CATEGORY[cat.id as CategoryId];
                          setOpenId(nextItems?.[0]?.id ?? "");
                        }}
                        className="cursor-pointer rounded-full px-4 py-2 text-[15px] font-semibold tracking-[-0.02em] transition-colors duration-250 md:px-5 md:text-[16px]"
                        style={{
                          backgroundColor: active ? ACCENT : "transparent",
                          color: active ? "#FFFFFA" : INK,
                          fontFamily: FONT,
                        }}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              ) : showSinglePill ? (
                <div className="flex items-center justify-center pt-3 pb-1">
                  <span
                    className="rounded-full px-4 py-2 text-[15px] font-semibold tracking-[-0.02em] md:px-5 md:text-[16px]"
                    style={{
                      backgroundColor: ACCENT,
                      color: "#FFFFFA",
                      fontFamily: FONT,
                    }}
                  >
                    {categoryLabel}
                  </span>
                </div>
              ) : (
                <div className="h-3" aria-hidden />
              )}

              <div
                ref={listRef}
                className="flex w-full flex-col gap-[10px]"
              >
                {!listRevealed ? (
                  <div
                    className="flex flex-col gap-[10px]"
                    aria-hidden
                    style={{ opacity: 0.001, pointerEvents: "none" }}
                  >
                    {items.map((item) => (
                      <FaqRow
                        key={item.id}
                        item={item}
                        open={false}
                        onToggle={() => {}}
                        reduceMotion
                      />
                    ))}
                  </div>
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={listKey}
                      className="flex flex-col gap-[10px]"
                      variants={reduceMotion ? undefined : faqListVariants}
                      initial={reduceMotion ? false : "hidden"}
                      animate="show"
                      exit={reduceMotion ? undefined : "exit"}
                    >
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          variants={
                            reduceMotion ? undefined : faqItemVariants
                          }
                        >
                          <FaqRow
                            item={item}
                            open={openId === item.id}
                            onToggle={() =>
                              setOpenId((prev) =>
                                prev === item.id ? "" : item.id,
                              )
                            }
                            reduceMotion={reduceMotion}
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            </div>
          </motion.div>

          {/* Kora: separate floating contact island — same width */}
          <motion.div
            className="flex w-full flex-col items-center gap-4 rounded-[40px] px-5 py-5 md:flex-row md:justify-start md:gap-8 md:px-6 md:py-6 md:pl-6 md:pr-8"
            style={{ backgroundColor: CREAM, maxWidth: PANEL_MAX }}
            initial={
              reduceMotion ? false : { opacity: 0, y: 14 }
            }
            animate={
              inView || reduceMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 14 }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.5,
              delay: reduceMotion ? 0 : 0.08,
              ease: easeOut,
            }}
          >
            <div className="flex items-center md:ml-3" aria-hidden>
              {Array.from({ length: AVATAR_SLOTS }).map((_, i) => {
                const isCenter = i === 1;
                return (
                  <span
                    key={i}
                    className={`relative shrink-0 overflow-hidden rounded-full border-2 border-[#F7F7ED] ${
                      isCenter
                        ? "z-20 size-12 md:size-[52px]"
                        : "z-10 size-11 md:size-12"
                    }`}
                    style={{
                      marginLeft: i === 0 ? 0 : isCenter ? -14 : -12,
                      backgroundColor: "#E4E4DC",
                    }}
                  />
                );
              })}
            </div>

            <div className="flex flex-col items-center gap-1.5 text-center md:ml-3 md:items-start md:text-left">
              <p
                className="text-[12px] font-medium tracking-[-0.02em] md:text-[13px]"
                style={{ color: MUTED }}
              >
                더 궁금한 점이 있으신가요? 언제든 연락 주세요.
              </p>
              <button
                type="button"
                onClick={copyPhone}
                className="group inline-flex cursor-pointer items-center gap-2.5 text-left"
                aria-label={copied ? "번호 복사됨" : `${phone} 복사하기`}
              >
                {/* Same Kora copy chip as footer */}
                <span className="relative flex size-[30px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#5DC39B] transition-colors duration-200 group-hover:bg-black">
                  <svg
                    viewBox="0 0 48 43"
                    className={`absolute h-4 w-[21px] transition-opacity duration-200 ${
                      copied ? "opacity-0" : "opacity-100"
                    }`}
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M 0 10.251 C 0 5.419 0 3.003 1.501 1.501 C 3.003 0 5.419 0 10.251 0 L 11.96 0 C 16.792 0 19.208 0 20.71 1.501 C 22.211 3.003 22.211 5.419 22.211 10.251 L 22.211 11.96 C 22.211 16.792 22.211 19.208 20.71 20.71 C 19.208 22.211 16.792 22.211 11.96 22.211 L 10.251 22.211 C 5.419 22.211 3.003 22.211 1.501 20.71 C 0 19.208 0 16.792 0 11.96 Z"
                      transform="translate(18.789 16.789)"
                      stroke="#F7F7ED"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 25.628 11.96 C 25.624 6.907 25.547 4.291 24.077 2.499 C 23.793 2.153 23.476 1.835 23.13 1.551 C 21.239 0 18.431 0 12.814 0 C 7.197 0 4.389 0 2.499 1.551 C 2.153 1.835 1.835 2.153 1.551 2.499 C 0 4.389 0 7.197 0 12.814 C 0 18.431 0 21.239 1.551 23.13 C 1.835 23.476 2.153 23.793 2.499 24.077 C 4.291 25.547 6.907 25.624 11.96 25.628"
                      transform="translate(7 5)"
                      stroke="#F7F7ED"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <svg
                    viewBox="0 0 24 24"
                    className={`absolute size-[14px] text-[#F7F7ED] transition-opacity duration-200 ${
                      copied ? "opacity-100" : "opacity-0"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M5 12.5 10 17.5 19 7.5" />
                  </svg>
                </span>
                <span
                  className="text-[18px] font-bold tracking-[-0.03em] transition-colors duration-200 group-hover:text-[#616161] md:text-[22px]"
                  style={{ color: INK }}
                >
                  {copied ? "복사됨!" : phone}
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
