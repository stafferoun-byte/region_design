"use client";

import { PillCtaButton } from "@/components/pill-cta-button";
import type { ColumnParagraph, ColumnSection } from "@/data/column-articles";
import type { InsightArticle } from "@/data/insights";
import "@/styles/kuemmerlein-fonts.css";
import Link from "next/link";
import { useEffect, useState } from "react";

const FONT_TITLE =
  "var(--font-ibm-sans), 'IBM Plex Sans KR', sans-serif";
const FONT_DATE = '"ABC Monument Grotesk Semi-Mono", monospace, sans-serif';
const FONT_BODY =
  '"Pretendard", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';

function paragraphText(paragraph: ColumnParagraph) {
  return typeof paragraph === "string" ? paragraph : paragraph.callout;
}

function ColumnParagraphBlock({ paragraph }: { paragraph: ColumnParagraph }) {
  if (typeof paragraph !== "string") {
    return (
      <p className="mt-6 rounded-[20px] bg-[#5DC39B] px-5 py-5 text-[16px] leading-[1.7] tracking-[-0.02em] break-words text-white md:px-8 md:py-7">
        {paragraph.callout}
      </p>
    );
  }
  return (
    <p className="mt-4 text-[16px] leading-[1.7] tracking-[-0.02em] break-words text-[#4a4a4a]">
      {paragraph}
    </p>
  );
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function RelatedCardIcon({ type }: { type: "target" | "monitor" }) {
  if (type === "target") {
    return (
      <svg viewBox="0 0 24 24" className="size-3.5" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="8" stroke="#242424" strokeWidth="2" />
        <circle cx="12" cy="12" r="3.5" stroke="#242424" strokeWidth="2" />
        <circle cx="12" cy="12" r="1.2" fill="#242424" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="size-3.5" fill="none" aria-hidden>
      <rect x="3" y="4" width="18" height="12" rx="2" stroke="#242424" strokeWidth="2" />
      <path d="M8 20h8M12 16v4" stroke="#242424" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const RELATED_IMAGES = [
  "/images/insights/family-law.png",
  "/images/insights/consultation.png",
] as const;

function formatDotDate(datetime: string) {
  const [year, month, day] = datetime.split("-");
  if (!year || !month || !day) return datetime;
  return `${year}. ${Number(month)}. ${Number(day)}.`;
}

function formatEnDate(datetime: string) {
  const [year, month, day] = datetime.split("-");
  const monthName = MONTHS[Number(month) - 1];
  if (!year || !monthName || !day) return datetime;
  return `${monthName} ${Number(day)}, ${year}`;
}

function ShareIcon({ kind }: { kind: "naver" | "instagram" | "facebook" }) {
  if (kind === "naver") {
    return (
      <svg viewBox="0 0 40 40" aria-hidden className="h-[18px] w-[18px]" fill="currentColor">
        <path d="M 25.34 21.06 L 14.22 5 H 5 V 35 H 14.66 V 18.94 L 25.78 35 H 35 V 5 H 25.34 V 21.06 Z" />
      </svg>
    );
  }
  if (kind === "instagram") {
    return (
      <svg viewBox="0 0 40 40" aria-hidden className="h-[18px] w-[18px]" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M 20 14 C 16.686 14 14 16.686 14 20 C 14 23.314 16.686 26 20 26 C 23.314 26 26 23.314 26 20 C 26 16.686 23.314 14 20 14 Z M 20 10 C 25.523 10 30 14.477 30 20 C 30 25.523 25.523 30 20 30 C 14.477 30 10 25.523 10 20 C 10 14.477 14.477 10 20 10 Z M 33 9.5 C 33 10.881 31.881 12 30.5 12 C 29.119 12 28 10.881 28 9.5 C 28 8.119 29.119 7 30.5 7 C 31.881 7 33 8.119 33 9.5 Z M 20 4 C 15.052 4 14.244 4.014 11.942 4.116 C 10.374 4.19 9.322 4.4 8.346 4.78 C 7.529 5.08 6.791 5.561 6.186 6.186 C 5.56 6.791 5.079 7.529 4.778 8.346 C 4.398 9.326 4.188 10.376 4.116 11.942 C 4.012 14.15 3.998 14.922 3.998 20 C 3.998 24.95 4.012 25.756 4.114 28.058 C 4.188 29.624 4.398 30.678 4.776 31.652 C 5.116 32.522 5.516 33.148 6.18 33.812 C 6.854 34.484 7.48 34.886 8.34 35.218 C 9.328 35.6 10.38 35.812 11.94 35.884 C 14.148 35.988 14.92 36 19.998 36 C 24.948 36 25.754 35.986 28.056 35.884 C 29.62 35.81 30.672 35.6 31.65 35.222 C 32.466 34.921 33.204 34.44 33.81 33.816 C 34.484 33.144 34.886 32.518 35.218 31.656 C 35.598 30.672 35.81 29.62 35.882 28.056 C 35.986 25.85 35.998 25.076 35.998 20 C 35.998 15.052 35.984 14.244 35.882 11.942 C 35.808 10.378 35.596 9.322 35.218 8.346 C 34.917 7.53 34.436 6.792 33.812 6.186 C 33.207 5.56 32.469 5.078 31.652 4.778 C 30.672 4.398 29.62 4.188 28.056 4.116 C 25.85 4.012 25.078 4 19.998 4 Z M 20 0 C 25.434 0 26.112 0.02 28.246 0.12 C 30.374 0.22 31.826 0.554 33.1 1.05 C 34.42 1.558 35.532 2.246 36.644 3.356 C 37.661 4.356 38.448 5.565 38.95 6.9 C 39.444 8.174 39.78 9.626 39.88 11.756 C 39.974 13.888 40 14.566 40 20 C 40 25.434 39.98 26.112 39.88 28.244 C 39.78 30.374 39.444 31.824 38.95 33.1 C 38.449 34.436 37.662 35.645 36.644 36.644 C 35.644 37.661 34.435 38.448 33.1 38.95 C 31.826 39.444 30.374 39.78 28.246 39.88 C 26.112 39.974 25.434 40 20 40 C 14.566 40 13.888 39.98 11.754 39.88 C 9.626 39.78 8.176 39.444 6.9 38.95 C 5.565 38.449 4.355 37.662 3.356 36.644 C 2.339 35.644 1.552 34.435 1.05 33.1 C 0.554 31.826 0.22 30.374 0.12 28.244 C 0.024 26.112 0 25.434 0 20 C 0 14.566 0.02 13.888 0.12 11.756 C 0.22 9.624 0.554 8.176 1.05 6.9 C 1.55 5.564 2.338 4.355 3.356 3.356 C 4.355 2.338 5.565 1.551 6.9 1.05 C 8.174 0.554 9.624 0.22 11.754 0.12 C 13.888 0.026 14.566 0 20 0 Z"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 40 40" aria-hidden className="h-[18px] w-[18px]" fill="currentColor">
      <path
        transform="translate(9.7 0)"
        d="M 13.714 23 L 18.612 23 L 20.571 15 L 13.714 15 L 13.714 11 C 13.714 8.94 13.714 7 17.633 7 L 20.571 7 L 20.571 0.28 C 19.933 0.194 17.521 0 14.974 0 C 9.655 0 5.878 3.314 5.878 9.4 L 5.878 15 L 0 15 L 0 23 L 5.878 23 L 5.878 40 L 13.714 40 Z"
      />
    </svg>
  );
}

export function ColumnArticle({
  article,
  lead,
  sections,
  related,
}: {
  article: InsightArticle;
  lead: string;
  sections: readonly ColumnSection[];
  related: readonly InsightArticle[];
}) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    setShareUrl(window.location.href);
    const update = () => {
      let current = sections[0]?.id ?? "";
      for (const section of sections) {
        const node = document.getElementById(section.id);
        if (!node) continue;
        if (node.getBoundingClientRect().top <= 160) current = section.id;
      }
      setActiveId(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    const lenis = (
      window as unknown as { __lenis?: { on?: Function; off?: Function } }
    ).__lenis;
    lenis?.on?.("scroll", update);
    return () => {
      window.removeEventListener("scroll", update);
      lenis?.off?.("scroll", update);
    };
  }, [sections]);

  const encoded = encodeURIComponent(shareUrl || article.href);
  const shareText = encodeURIComponent(article.title);
  const shares = [
    {
      kind: "naver" as const,
      label: "네이버에 공유",
      href: `https://share.naver.com/web/shareView.naver?url=${encoded}&title=${shareText}`,
    },
    {
      kind: "instagram" as const,
      label: "인스타그램",
      href: "https://www.instagram.com",
    },
    {
      kind: "facebook" as const,
      label: "페이스북에 공유",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
    },
  ];

  return (
    <article className="bg-[#FCFCFA] text-[#171717]" style={{ fontFamily: FONT_BODY }}>
      <div className="mx-auto w-full max-w-[1720px] overflow-x-clip px-4 pt-6 pb-20 md:px-10 md:pt-14 md:pb-24 xl:px-[60px]">
        <div className="grid w-full min-w-0 max-w-[1120px] items-start gap-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-20">
          <aside className="hidden w-full min-w-0 lg:sticky lg:top-28 lg:block">
            <div className="rounded-[24px] border border-[#eceae4] bg-white px-6 py-7">
              <p
                className="text-[22px] leading-none font-bold tracking-[-0.04em]"
                style={{ fontFamily: FONT_TITLE }}
              >
                목차
              </p>
              <nav aria-label="목차" className="mt-6">
                <ol className="flex flex-col gap-1.5">
                  {sections.map((section) => {
                    const active = section.id === activeId;
                    return (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className={`block w-full rounded-lg px-3.5 py-2 text-[15px] leading-[1.35] tracking-[-0.02em] text-[#1c1c1c] ${
                            active ? "bg-[#F7F5EC]" : ""
                          }`}
                          aria-current={active ? "true" : undefined}
                          onClick={() => setActiveId(section.id)}
                        >
                          {section.heading}
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </nav>
              <div className="-mx-6 mt-8 border-t border-[#eeeae3] pt-5">
                <div className="flex items-center justify-between gap-4 px-6">
                  <p lang="en" className="text-[15px] tracking-[-0.02em] text-[#1c1c1c]">
                    Share
                  </p>
                  <div className="flex items-center gap-3.5">
                    {shares.map((item) => (
                      <a
                        key={item.kind}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={item.label}
                        className="text-[#111111]"
                      >
                        <ShareIcon kind={item.kind} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <div className="w-full min-w-0">
            <p
              className="text-[13px] tracking-[0.02em] text-[#9a9a9a]"
              style={{ fontFamily: FONT_DATE }}
            >
              {formatEnDate(article.datetime)}
            </p>
            <h1
              className="mt-4 max-w-full text-[30px] leading-[1.3] font-bold tracking-[-0.045em] break-words text-[#141414] md:max-w-[18em] md:text-[clamp(30px,3.5vw,44px)] md:leading-[1.2]"
              style={{ fontFamily: FONT_TITLE }}
            >
              {article.title}
            </h1>
            <p className="mt-5 max-w-full text-[16px] leading-[1.7] tracking-[-0.02em] break-words text-[#4a4a4a] md:mt-6 md:max-w-[640px] md:text-[18px] md:leading-[1.6]">
              {lead}
            </p>
            <div className="mt-10 flex max-w-[640px] flex-col gap-10 md:mt-12 md:gap-12">
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-28">
                  <h2
                    className="text-[20px] leading-[1.35] font-bold tracking-[-0.04em] break-words text-[#141414] md:text-[22px]"
                    style={{ fontFamily: FONT_TITLE }}
                  >
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((paragraph) => (
                    <ColumnParagraphBlock key={paragraphText(paragraph)} paragraph={paragraph} />
                  ))}
                </section>
              ))}
            </div>
          </div>
        </div>

        {related.length ? (
          <section className="mt-20 md:mt-44">
            <div className="mx-auto flex w-full max-w-[1600px] flex-col items-stretch gap-8 md:gap-10 xl:flex-row xl:items-stretch xl:gap-[50px]">
              <div className="flex w-full flex-col justify-between gap-8 xl:min-w-0 xl:flex-1">
                <div className="flex flex-col gap-5">
                  <h2
                    className="text-[30px] leading-[1.15] font-bold tracking-[-0.04em] md:text-[42px] md:leading-[1.15]"
                    style={{ fontFamily: FONT_TITLE }}
                  >
                    이로운
                    <br />
                    인사이트
                  </h2>
                  <p
                    className="max-w-full text-[clamp(13px,3.7vw,15px)] leading-[1.45] font-semibold tracking-[-0.045em] text-[#616161] md:max-w-[22em] md:text-[20px] md:leading-[1.35] md:tracking-[-0.04em]"
                    style={{
                      fontFamily:
                        '"Wanted Sans Variable", "Wanted Sans", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                    }}
                  >
                    <span className="md:hidden">
                      사건 현장에서 쌓은 경험과,
                      <br />
                      <span className="whitespace-nowrap">
                        의뢰인에게 도움이 되는 법률 칼럼을 정리합니다.
                      </span>
                    </span>
                    <span className="hidden md:inline">
                      사건 현장에서 쌓은 경험과,
                      <br />
                      의뢰인에게 도움이 되는 법률 칼럼을 정리합니다.
                    </span>
                  </p>
                </div>
                <PillCtaButton
                  href="/columns"
                  label="전체 보기"
                  bg="#242424"
                  cream="#FFFFFA"
                  dark="#242424"
                  accent="#5DC39B"
                  bloom="#F7F7ED"
                  compact
                />
              </div>
              <ul className="flex w-full min-w-0 flex-col gap-5 sm:grid sm:grid-cols-2 xl:flex-[1.6]">
                {related.map((item, index) => (
                  <li key={item.id} className="min-w-0">
                    <Link
                      href={item.href}
                      className="group relative flex aspect-[3/4] w-full flex-col justify-between overflow-hidden rounded-[30px] p-5 pb-11 no-underline md:p-[30px]"
                      style={{
                        fontFamily:
                          '"Wanted Sans Variable", "Wanted Sans", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                      }}
                    >
                      <img
                        src={RELATED_IMAGES[index] ?? item.image}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover object-top transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08] group-hover:blur-[5px]"
                      />
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 z-[1]"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(36,36,36,0.22) 0%, rgba(36,36,36,0.28) 38%, rgba(36,36,36,0.78) 100%)",
                        }}
                      />
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 z-[1] bg-[#242424] opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-[0.35]"
                      />
                      <span className="relative z-[2] inline-flex w-max items-center gap-[7px] rounded-[15px] bg-[#242424] py-0.5 pr-[11px] pl-0.5">
                        <span className="grid size-6 place-items-center rounded-full bg-white">
                          <RelatedCardIcon type={index === 0 ? "target" : "monitor"} />
                        </span>
                        <span className="text-[13px] leading-[1.5] font-semibold tracking-[-0.025em] text-[#FAFAF7]">
                          {item.categoryLabel}
                        </span>
                      </span>
                      <span className="relative z-[2] flex flex-col gap-[7px]">
                        <time
                          dateTime={item.datetime}
                          className="text-[14px] leading-[1.5] font-semibold tracking-[-0.03em] text-[#E6E6E6]"
                        >
                          {formatDotDate(item.datetime)}
                        </time>
                        <span className="text-[20px] leading-[1.3] font-bold tracking-[-0.04em] break-words text-[#FAFAF7] md:text-[25px]">
                          {item.title}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}
      </div>
    </article>
  );
}
