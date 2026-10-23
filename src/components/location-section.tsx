"use client";

import { NaverSlippyMap } from "@/components/naver-slippy-map";
import { useAfterPageWipe, WordReveal } from "@/components/section-title-reveal";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import "@/styles/kuemmerlein-tiles.css";

const FONT =
  '"Wanted Sans Variable", "Wanted Sans", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';

const PHONE = "1800-9730";
const EMAIL = "consult@erounpartners.com";

const OFFICES = [
  {
    id: "seoul",
    label: "서울주사무소",
    lines: ["서울 강남구 청담동 53-4", "파라곤빌딩 5층"],
    mobileLines: ["서울 강남구 청담동 53-4 파라곤빌딩 5층"],
    note: "(청담역 13번 출구, 도보 10분)",
    lat: 37.5245752,
    lng: 127.0532769,
  },
  {
    id: "namyangju",
    label: "남양주분사무소",
    lines: ["경기 남양주시 다산중앙로82번안길 152", "중앙법조타워 2층 202호"],
    mobileLines: [
      "경기 남양주시 다산중앙로82번안길 152",
      "중앙법조타워 2층 202호",
    ],
    note: null,
    lat: 37.6129192,
    lng: 127.1684121,
  },
] as const;

type OfficeId = (typeof OFFICES)[number]["id"];
type Office = (typeof OFFICES)[number];

const easeOut = [0.22, 1, 0.36, 1] as const;

function OfficeToggle({
  label,
  lines,
  note,
  open,
  controls,
  onClick,
  accordion = true,
  enlargeLabel = false,
  nowrap = false,
}: {
  label: string;
  lines: readonly string[];
  note?: string | null;
  open: boolean;
  controls: string;
  onClick: () => void;
  accordion?: boolean;
  enlargeLabel?: boolean;
  nowrap?: boolean;
}) {
  const Tag = accordion ? "button" : "div";
  return (
    <Tag
      type={accordion ? "button" : undefined}
      aria-expanded={accordion ? open : undefined}
      aria-controls={accordion ? controls : undefined}
      onClick={accordion ? onClick : undefined}
      className="group flex h-full w-full flex-col text-left"
    >
      <span className="flex min-h-7 items-center gap-2">
        <span
          className={`leading-none font-bold tracking-[-0.03em] text-[#616161] transition-colors group-hover:text-[#242424] md:font-semibold ${
            enlargeLabel ? "text-[15px]" : "text-[13px] md:text-[14px]"
          }`}
          style={{ fontFamily: FONT }}
        >
          {label}
        </span>
        {accordion ? (
          <span
            className={`flex size-7 shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${
              open ? "bg-[#5DC39B]" : "bg-[#F5F5E9] group-hover:bg-[#E7E7DF]"
            }`}
          >
            <svg
              viewBox="0 0 16 16"
              aria-hidden
              className={`size-3.5 transition-transform duration-300 ${
                open ? "rotate-180 text-[#F5F5E9]" : "text-[#171717]"
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3.5 6.25 8 10.25 12.5 6.25" />
            </svg>
          </span>
        ) : null}
      </span>
      <span
        className="mt-3.5 block min-h-[2.8em] space-y-0.5 text-[15px] leading-[1.4] font-medium tracking-[-0.035em] break-keep text-[#242424] md:text-[16px] md:font-bold"
        style={{ fontFamily: FONT }}
      >
        {lines.map((line) => (
          <span key={line} className={nowrap ? "block whitespace-nowrap" : "block"}>
            {line}
          </span>
        ))}
        {note ? (
          <span className="mt-1 block text-[13px] leading-[1.4] font-medium tracking-[-0.03em] text-[#616161]">
            {note}
          </span>
        ) : null}
      </span>
    </Tag>
  );
}

function OfficeMap({
  office,
  open,
  mapId,
  reduceMotion,
  className,
}: {
  office: Office;
  open: boolean;
  mapId: string;
  reduceMotion: boolean;
  className: string;
}) {
  return (
    <div
      id={mapId}
      className={`grid ${
        reduceMotion
          ? ""
          : "transition-[grid-template-rows,margin-top] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
      } ${open ? className : "mt-0 grid-rows-[0fr]"}`}
    >
      <div className="overflow-hidden">
        <div className="location-map overflow-hidden rounded-[28px] bg-[#F3F3EF] shadow-[0_16px_40px_-28px_rgba(0,0,0,0.28)]">
          {open ? (
            <NaverSlippyMap
              lat={office.lat}
              lng={office.lng}
              label={office.label}
            />
          ) : (
            <div className="h-[min(420px,70vw)] min-h-[260px]" />
          )}
        </div>
      </div>
    </div>
  );
}

function CopyPhoneRow({ phone }: { phone: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(phone);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1600);
        } catch {
          /* ignore */
        }
      }}
      className="group inline-flex items-center gap-2.5 text-left"
      aria-label={copied ? "번호 복사됨" : "번호 복사"}
    >
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
        className="text-[22px] leading-none font-bold tracking-[-0.04em] text-[#242424] transition-colors duration-200 group-hover:text-[#616161] md:text-[26px]"
        style={{ fontFamily: FONT }}
      >
        {copied ? "Copied!" : phone}
      </span>
    </button>
  );
}

/**
 */
export function LocationSection() {
  const ref = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const headerInView = useInView(headerRef, { once: true, amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const pageReady = useAfterPageWipe();
  const show = inView || !!reduceMotion;
  const showHeader = headerInView || !!reduceMotion;
  const [open, setOpen] = useState<Record<OfficeId, boolean>>({
    seoul: false,
    namyangju: false,
  });
  const [mobileOpen, setMobileOpen] = useState<Record<OfficeId, boolean>>({
    seoul: true,
    namyangju: false,
  });

  const appear = {
    initial: reduceMotion ? false : ({ opacity: 0, y: 14 } as const),
    animate: showHeader
      ? ({ opacity: 1, y: 0 } as const)
      : ({ opacity: 0, y: 14 } as const),
  };

  return (
    <section ref={ref} id="location" aria-labelledby="location-heading">
      <div className="kuem-insights kuem-insights--on-white kuem-insights--locations">
        <div className="kuem-insights__pad">
          <header ref={headerRef}>
            <motion.h1
              id="location-heading"
              className="kuem-insights__title kuem-insights__title--ibm will-change-[opacity,transform]"
              initial={appear.initial}
              animate={appear.animate}
              transition={{
                duration: reduceMotion ? 0 : 0.85,
                ease: easeOut,
              }}
            >
              오시는길
            </motion.h1>
            <WordReveal
              as="p"
              lines={[
                [
                  { text: "가까운" },
                  { text: "사무소에서" },
                  { text: "편안하게" },
                  { text: "상담받으세요." },
                ],
              ]}
              inView={showHeader && pageReady}
              reduceMotion={reduceMotion}
              delay={0.1}
              className="kuem-insights__lead"
              style={{ color: "#000" }}
              ariaLabel="가까운 사무소에서 편안하게 상담받으세요."
            />
          </header>

          <motion.div
            className="location-contact mt-[calc(var(--margin_m)+72px)] ml-[var(--insights-inset-x)] flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:pr-[min(11vw,168px)]"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{
              duration: reduceMotion ? 0 : 0.65,
              delay: reduceMotion ? 0 : 0.12,
              ease: easeOut,
            }}
          >
            {/* Contact — aligns under “오시는길.” */}
            <div className="flex shrink-0 flex-col gap-4">
              <a
                href={`mailto:${EMAIL}`}
                className="text-[15px] leading-none font-semibold tracking-[-0.03em] text-[#616161] transition-colors hover:text-[#242424] md:text-[16px]"
                style={{ fontFamily: FONT }}
              >
                {EMAIL}
              </a>
              <CopyPhoneRow phone={PHONE} />
            </div>

            <div className="grid w-full grid-cols-1 items-stretch gap-8 sm:grid-cols-2 sm:gap-x-10 md:w-[min(100%,760px)] md:gap-x-14">
              {OFFICES.map((office) => (
                <div key={office.id} className="min-w-0">
                  <div className={`md:hidden${office.id === "seoul" ? " mb-6 sm:mb-0" : ""}`}>
                    <OfficeToggle
                      label={office.label}
                      lines={office.mobileLines}
                      note={office.note}
                      enlargeLabel
                      nowrap={office.id === "seoul"}
                      open={mobileOpen[office.id]}
                      controls={`${office.id}-map-m`}
                      accordion={office.id !== "seoul"}
                      onClick={() =>
                        setMobileOpen((current) => ({
                          ...current,
                          [office.id]: !current[office.id],
                        }))
                      }
                    />
                    {office.id === "seoul" ? (
                      <div className="mt-5 overflow-hidden rounded-[18px] bg-[#F3F3EF] shadow-[0_16px_40px_-28px_rgba(0,0,0,0.28)]">
                        <img
                          src="/images/locations/seoul-paragon.jpg"
                          alt="서울주사무소 파라곤빌딩"
                          className="aspect-[3/4] w-full object-cover object-[center_42%]"
                        />
                      </div>
                    ) : null}
                    <OfficeMap
                      office={office}
                      open={office.id === "seoul" || mobileOpen[office.id]}
                      mapId={`${office.id}-map-m`}
                      reduceMotion={!!reduceMotion}
                      className={`${office.id === "seoul" ? "mt-3" : "mt-5"} grid-rows-[1fr]`}
                    />
                  </div>
                  <div className="hidden md:block">
                    <OfficeToggle
                      label={office.label}
                      lines={office.lines}
                      open={open[office.id]}
                      controls={`${office.id}-map`}
                      onClick={() =>
                        setOpen((current) => ({
                          ...current,
                          [office.id]: !current[office.id],
                        }))
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="location-maps ml-[var(--insights-inset-x)] hidden md:block md:pr-[min(11vw,168px)]"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{
              duration: reduceMotion ? 0 : 0.65,
              delay: reduceMotion ? 0 : 0.2,
              ease: easeOut,
            }}
          >
            {OFFICES.map((office) => (
              <OfficeMap
                key={office.id}
                office={office}
                open={open[office.id]}
                mapId={`${office.id}-map`}
                reduceMotion={!!reduceMotion}
                className="mt-16 grid-rows-[1fr]"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
