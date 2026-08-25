"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import {
  FormEvent,
  type ReactNode,
  useRef,
  useState,
} from "react";
import { SectionTitleReveal } from "@/components/section-title-reveal";

/**
 * Consultation CTA + form — layout/tokens from Kora CTA
 * @see https://kora.framer.media/
 */

const FONT =
  '"Wanted Sans Variable", "Wanted Sans", "Manrope", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';

const ACCENT = "#5DC39B";
const INK = "#292929";
const MUTED = "#616161";
const GLASS = "rgba(227, 227, 227, 0.45)";
const INPUT_BG = "rgba(255, 255, 255, 0.35)";
const CHIP_BG = "rgba(255, 255, 255, 0.35)";
const RING = "rgba(255, 255, 255, 0.75)";
/** Checkbox selected: cream circle + muted check (Kora) */
const CHECK_ON = "#FAFAF7";
const CHECK_OFF = "rgba(255, 255, 255, 0.35)";
/** Radio selected: dark fill (Kora #3D3D3D) */
const RADIO_ON = "#3D3D3D";
const RADIO_OFF = "rgba(255, 255, 255, 0.5)";

const BG = "/images/consult-seoul-night.jpg";

const easeOut = [0.22, 1, 0.36, 1] as const;

const FEATURES = [
  "사건 초기 대응 로드맵",
  "쟁점·위험 요소 진단",
  "다음 단계와 일정 안내",
] as const;

const CONSULT_TITLE_LINE_1 = [
  { text: "지금,", color: "#FFFFFF" },
  { text: "이로운과", color: "#FFFFFF" },
] as const;

const CONSULT_TITLE_LINE_2 = [
  { text: "상담을", color: "#FFFFFF" },
  { text: "시작하세요.", color: "#FFFFFF" },
] as const;

const PRACTICE_AREAS = [
  "형사",
  "이혼·가사",
  "상속",
  "민사·부동산",
  "교통사고",
] as const;

const STAGES = ["상담만", "수사 초기", "기소 전·후", "재판 중"] as const;

function FeatureIcon() {
  return (
    <span
      aria-hidden
      className="grid size-7 shrink-0 place-items-center rounded-full border border-white/50"
    >
      <svg viewBox="0 0 16 16" className="size-3.5" fill="none">
        <path
          d="M3 8.5 6.2 11.5 13 4.5"
          stroke="#FFFFFA"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <span
      className="text-[13px] leading-[1.5] font-semibold tracking-[-0.025em]"
      style={{ color: INK, fontFamily: FONT }}
    >
      {children}
    </span>
  );
}

/** Multi-select pill — pale circle → cream + check when on */
function CheckChip({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={checked}
      className="inline-flex items-center gap-2.5 rounded-full py-2.5 pr-[13px] pl-2.5 transition-[background-color] duration-200"
      style={{ backgroundColor: CHIP_BG, fontFamily: FONT }}
    >
      <span
        aria-hidden
        className="grid size-[18px] shrink-0 place-items-center rounded-full transition-colors duration-200"
        style={{ backgroundColor: checked ? CHECK_ON : CHECK_OFF }}
      >
        {checked ? (
          <svg viewBox="0 0 12 12" className="size-2.5" fill="none">
            <path
              d="M2.2 6.2 4.8 8.8 9.8 3.2"
              stroke={MUTED}
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </span>
      <span
        className="text-[13px] leading-[1.5] font-semibold tracking-[-0.025em]"
        style={{ color: INK }}
      >
        {label}
      </span>
    </button>
  );
}

/** Single-select pill — pale circle → solid dark when on */
function RadioChip({
  label,
  checked,
  onSelect,
}: {
  label: string;
  checked: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      onClick={onSelect}
      className="inline-flex items-center gap-2.5 rounded-full py-2.5 pr-[13px] pl-2.5 transition-[background-color] duration-200"
      style={{ backgroundColor: CHIP_BG, fontFamily: FONT }}
    >
      <span
        aria-hidden
        className="size-[18px] shrink-0 rounded-full transition-colors duration-200"
        style={{ backgroundColor: checked ? RADIO_ON : RADIO_OFF }}
      />
      <span
        className="text-[13px] leading-[1.5] font-semibold tracking-[-0.025em]"
        style={{ color: INK }}
      >
        {label}
      </span>
    </button>
  );
}

export function ConsultFormSection() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });

  /**
   * Kora CTA → footer: as the box bottom leaves the viewport,
   * Outer Container eases 1 → ~0.85 while the footer circle rises.
   */
  const { scrollYProgress } = useScroll({
    target: boxRef,
    offset: ["end end", "end start"],
  });
  const smoothExit = useSpring(scrollYProgress, {
    stiffness: reduceMotion ? 500 : 120,
    damping: reduceMotion ? 40 : 28,
    mass: 0.4,
    restDelta: 0.001,
  });
  const boxScale = useTransform(
    smoothExit,
    [0, 0.25, 0.55, 0.85, 1],
    reduceMotion ? [1, 1, 1, 1, 1] : [1, 0.985, 0.96, 0.94, 0.92],
  );

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [areas, setAreas] = useState<string[]>([]);
  const [stage, setStage] = useState<string>("");
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleArea = (area: string) => {
    setAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area],
    );
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      id="consult"
      className="relative z-10 w-full scroll-mt-24 overflow-x-clip bg-transparent"
      aria-labelledby="consult-heading"
    >
      {/* Outer inset matches TeamSection green box */}
      <div className="mx-auto w-full max-w-[1920px] px-5 py-5 md:px-10 xl:px-12">
        <motion.div
          ref={boxRef}
          className="relative w-full origin-center overflow-hidden rounded-[40px] will-change-transform"
          style={{ scale: boxScale }}
        >
          {/* Background — native img keeps full-res (no Next recompression) */}
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={BG}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
              decoding="async"
              draggable={false}
            />
            <div aria-hidden className="absolute inset-0 bg-black/25" />
          </div>

          <div className="relative z-[1] flex flex-col px-5 py-[60px] md:px-10 md:py-[90px] xl:px-12 xl:py-[120px]">
          {/* Main row: left + form stretch so bottoms match */}
          <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-8 xl:gap-10">
            {/* Left */}
            <div className="flex min-w-0 flex-1 flex-col justify-between gap-10 lg:gap-12">
              <div className="flex flex-col gap-8 md:gap-10">
                <SectionTitleReveal
                  id="consult-heading"
                  lines={[CONSULT_TITLE_LINE_1, CONSULT_TITLE_LINE_2]}
                  inView={inView}
                  reduceMotion={reduceMotion}
                  className="max-w-[14em] text-[clamp(32px,4.5vw,56px)] leading-[1.12] font-bold tracking-[-0.045em] break-keep will-change-[opacity,transform]"
                  style={{ fontFamily: FONT }}
                />

                <ul className="flex flex-col gap-3.5">
                  {FEATURES.map((f, i) => (
                    <motion.li
                      key={f}
                      className="flex items-center gap-3 text-[16px] leading-[1.35] font-semibold tracking-[-0.03em] text-white md:text-[17px]"
                      style={{ fontFamily: FONT }}
                      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                      animate={
                        inView || reduceMotion
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 10 }
                      }
                      transition={{
                        duration: reduceMotion ? 0 : 0.55,
                        ease: easeOut,
                        delay: reduceMotion ? 0 : 0.12 + i * 0.06,
                      }}
                    >
                      <FeatureIcon />
                      {f}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Testimonial — bottom aligns with form bottom */}
              <motion.div
                className="flex max-w-[420px] flex-col gap-4"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={
                  inView || reduceMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 16 }
                }
                transition={{
                  duration: reduceMotion ? 0 : 0.7,
                  ease: easeOut,
                  delay: reduceMotion ? 0 : 0.28,
                }}
              >
                <div className="flex gap-1.5" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className="size-2 rounded-full"
                      style={{ backgroundColor: ACCENT }}
                    />
                  ))}
                </div>
                <blockquote
                  className="text-[20px] leading-[1.45] font-semibold tracking-[-0.03em] break-keep md:text-[23px]"
                  style={{ fontFamily: FONT, color: "#FFFFFF" }}
                >
                  &ldquo;사건만 봐 주는 변호사가 아니라,
                  <br />
                  제 삶을 함께 지켜 주는
                  <br />
                  믿을 수 있는 팀이었습니다.&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <span className="relative size-11 overflow-hidden rounded-full bg-white/20">
                    <Image
                      src="/images/c2ad675e-3571-4adc-b8fe-7bb0aa39fd56.png"
                      alt=""
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span
                      className="text-[14px] leading-none font-semibold tracking-[-0.03em]"
                      style={{ fontFamily: FONT, color: "#FFFFFF" }}
                    >
                      김서연 님
                    </span>
                    <span
                      className="text-[13px] leading-none font-semibold tracking-[-0.025em] text-white/75"
                      style={{ fontFamily: FONT }}
                    >
                      가사 사건 의뢰인
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Form only in stretch row */}
            <motion.form
              onSubmit={onSubmit}
              className="flex w-full flex-col gap-7 self-stretch overflow-hidden rounded-[30px] lg:-ml-3 lg:w-[min(100%,600px)] lg:shrink-0 xl:-ml-5 xl:w-[640px]"
              style={{
                fontFamily: FONT,
                backgroundColor: GLASS,
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                boxShadow: `0 0 0 1px ${RING}`,
              }}
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 16 }
              }
              animate={
                inView || reduceMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 16 }
              }
              transition={{
                duration: reduceMotion ? 0 : 0.55,
                ease: easeOut,
                delay: reduceMotion ? 0 : 0.06,
              }}
            >
              <div className="flex flex-col gap-5 px-5 pt-6 md:gap-7 md:px-7 md:pt-9">
                {/* Full logo — nudge left so emblem aligns with copy below (asset has left pad) */}
                <div className="flex items-center overflow-visible">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/eroun-logo.png"
                    alt="이로운 법률사무소"
                    className="h-9 w-auto -translate-x-[calc(100%*132/842)] object-contain md:h-10"
                    draggable={false}
                  />
                </div>

                <p
                  className="text-[18px] leading-[1.35] font-semibold tracking-[-0.035em] break-keep md:text-[20px]"
                  style={{ color: INK }}
                >
                  부담 없이 상황을 알려 주세요.
                  <br />
                  <span style={{ color: MUTED }}>
                    어떻게 도와드릴 수 있는지 함께 정리해 드립니다.
                  </span>
                </p>

                {/* Name / Contact */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-2">
                    <FieldLabel>성함</FieldLabel>
                    <input
                      type="text"
                      name="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="홍길동"
                      className="h-12 rounded-[20px] border-0 px-4 text-[14px] font-semibold tracking-[-0.03em] outline-none placeholder:text-[#616161] focus:ring-2 focus:ring-white/60"
                      style={{ backgroundColor: INPUT_BG, color: INK }}
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <FieldLabel>연락처</FieldLabel>
                    <input
                      type="tel"
                      name="contact"
                      required
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="010-0000-0000"
                      className="h-12 rounded-[20px] border-0 px-4 text-[14px] font-semibold tracking-[-0.03em] outline-none placeholder:text-[#616161] focus:ring-2 focus:ring-white/60"
                      style={{ backgroundColor: INPUT_BG, color: INK }}
                    />
                  </label>
                </div>

                {/* Practice areas — multi-select check chips */}
                <fieldset className="flex flex-col gap-3">
                  <legend>
                    <FieldLabel>관심 분야를 선택해 주세요</FieldLabel>
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {PRACTICE_AREAS.map((area) => (
                      <CheckChip
                        key={area}
                        label={area}
                        checked={areas.includes(area)}
                        onToggle={() => toggleArea(area)}
                      />
                    ))}
                  </div>
                </fieldset>

                {/* Stage — single-select radio chips */}
                <fieldset className="flex flex-col gap-3" role="radiogroup">
                  <legend>
                    <FieldLabel>현재 진행 단계</FieldLabel>
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {STAGES.map((s) => (
                      <RadioChip
                        key={s}
                        label={s}
                        checked={stage === s}
                        onSelect={() => setStage(s)}
                      />
                    ))}
                  </div>
                </fieldset>

                {/* Message */}
                <label className="flex flex-col gap-2">
                  <FieldLabel>상담하고 싶은 내용</FieldLabel>
                  <textarea
                    name="message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="사건 경위, 현재 상황, 궁금한 점을 편하게 적어 주세요."
                    className="min-h-[140px] resize-y rounded-[20px] border-0 px-4 py-3.5 text-[14px] leading-[1.45] font-semibold tracking-[-0.03em] outline-none placeholder:text-[#616161] focus:ring-2 focus:ring-white/60"
                    style={{ backgroundColor: INPUT_BG, color: INK }}
                  />
                </label>

                {/* Terms */}
                <label className="flex cursor-pointer items-start gap-2.5">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    required
                    className="mt-0.5 size-4 shrink-0 accent-[#5DC39B]"
                  />
                  <span
                    className="text-[13px] leading-[1.45] font-semibold tracking-[-0.025em]"
                    style={{ color: INK }}
                  >
                    개인정보 수집·이용에 동의합니다.
                  </span>
                </label>
              </div>

              {/* Footer */}
              <div
                className="mt-auto flex flex-col gap-4 border-t px-5 py-6 sm:flex-row sm:items-center sm:justify-between md:px-7 md:py-7"
                style={{ borderColor: "rgba(255,255,255,0.35)" }}
              >
                <p
                  className="max-w-[14em] text-[13px] leading-[1.4] font-semibold tracking-[-0.025em]"
                  style={{ color: INK }}
                >
                  {submitted ? (
                    <>접수되었습니다. 빠르게 연락드리겠습니다.</>
                  ) : (
                    <>
                      <span style={{ color: MUTED }}>보통 </span>
                      <span>24시간 내</span>
                      <span style={{ color: MUTED }}>
                        {" "}
                        연락드려 일정을 안내합니다.
                      </span>
                    </>
                  )}
                </p>

                <button
                  type="submit"
                  className="group inline-flex shrink-0 items-center gap-3 self-end rounded-full bg-[#242424] px-5 py-3 text-[14px] font-semibold tracking-[-0.03em] text-[#FFFFFA] transition-colors hover:bg-black sm:self-auto"
                >
                  {submitted ? "신청 완료" : "상담 신청하기"}
                  <span
                    aria-hidden
                    className="size-2.5 rounded-full bg-[#F7F7ED] transition-transform group-hover:scale-110"
                  />
                </button>
              </div>
            </motion.form>
          </div>

          {/* Stats — under the form column */}
          <div className="mx-auto flex w-full max-w-[1480px] justify-end pt-12 md:pt-14">
            <div className="flex w-full flex-col gap-5 sm:flex-row sm:flex-wrap sm:gap-x-12 sm:gap-y-4 lg:w-[min(100%,600px)] lg:-ml-3 xl:w-[640px] xl:-ml-5">
              {[
                { value: "12,000+", label: "누적 상담" },
                { value: "98%", label: "의뢰인 만족도" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="flex items-baseline gap-3"
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={
                    inView || reduceMotion
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 12 }
                  }
                  transition={{
                    duration: reduceMotion ? 0 : 0.65,
                    ease: easeOut,
                    delay: reduceMotion ? 0 : 0.35 + i * 0.08,
                  }}
                >
                  <span
                    className="text-[clamp(32px,4vw,48px)] leading-none font-bold tracking-[-0.05em] text-white"
                    style={{ fontFamily: FONT }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-[15px] leading-[1.3] font-semibold tracking-[-0.03em] text-white/75 md:text-[17px]"
                    style={{ fontFamily: FONT }}
                  >
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        </motion.div>
      </div>
    </section>
  );
}
