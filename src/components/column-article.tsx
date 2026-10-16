"use client";

import type { ColumnSection } from "@/data/column-articles";
import type { InsightArticle } from "@/data/insights";
import Link from "next/link";
import { useEffect, useState } from "react";

const FONT_TITLE =
  "var(--font-ibm-sans), 'IBM Plex Sans KR', sans-serif";
const FONT_BODY =
  '"Pretendard", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';

function formatKoDate(datetime: string) {
  const [year, month, day] = datetime.split("-");
  if (!year || !month || !day) return datetime;
  return `${year}년 ${Number(month)}월 ${Number(day)}일`;
}

function ShareIcon({ kind }: { kind: "facebook" | "x" | "linkedin" }) {
  if (kind === "facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="h-[18px] w-[18px]" fill="currentColor">
        <path d="M14.5 8.5V6.8c0-.7.5-1 1.1-1H17V3h-2.1C12.4 3 11 4.4 11 6.6v1.9H9v2.7h2V21h3.5v-9.8h2.3l.4-2.7h-2.7Z" />
      </svg>
    );
  }
  if (kind === "x") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="h-[16px] w-[16px]" fill="currentColor">
        <path d="M14.7 10.4 21.4 3h-1.6l-5.8 6.4L9.2 3H3.4l7 10L3.4 21h1.6l6.2-6.8L14.8 21h5.8l-7.3-10.6Zm-2.2 2.4-.7-1-5.7-7.8h2.5l4.6 6.3.7 1 6 8.2h-2.5l-4.9-6.7Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-[18px] w-[18px]" fill="currentColor">
      <path d="M6.5 9H4V20h2.5V9ZM5.2 3.8A1.6 1.6 0 1 0 5.2 7a1.6 1.6 0 0 0 0-3.2ZM20 20h-2.5v-5.6c0-1.6-.6-2.6-2-2.6-1 0-1.6.7-1.9 1.3-.1.2-.1.6-.1.9V20H11V9h2.4v1.5c.4-.7 1.3-1.8 3.2-1.8 2.3 0 4 1.5 4 4.8V20Z" />
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
      kind: "facebook" as const,
      label: "페이스북에 공유",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
    },
    {
      kind: "x" as const,
      label: "X에 공유",
      href: `https://twitter.com/intent/tweet?url=${encoded}&text=${shareText}`,
    },
    {
      kind: "linkedin" as const,
      label: "링크드인에 공유",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
    },
  ];

  return (
    <article className="bg-[#F6F5F2] text-[#171717]" style={{ fontFamily: FONT_BODY }}>
      <div className="mx-auto w-full max-w-[1120px] px-5 pt-8 pb-24 md:px-10 md:pt-14">
        <p className="text-[14px] text-[#8a8a8a]">
          <Link href="/columns" className="text-[#171717] hover:text-[#5DC39B]">
            이로운 칼럼
          </Link>
          <span aria-hidden> /</span>
        </p>
        <p className="mt-6 text-[14px] text-[#6d6d6d]">{article.categoryLabel}</p>
        <h1
          className="mt-3 max-w-[18em] text-[clamp(32px,4vw,52px)] leading-[1.2] font-bold tracking-[-0.045em]"
          style={{ fontFamily: FONT_TITLE }}
        >
          {article.title}
        </h1>

        <div className="mt-10 grid items-start gap-8 lg:mt-14 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-20">
          <aside className="lg:sticky lg:top-28">
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
                          className={`inline-block max-w-full rounded-2xl px-3.5 py-2 text-[15px] leading-[1.35] tracking-[-0.02em] text-[#1c1c1c] ${
                            active ? "bg-[#F3F1E4]" : ""
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
              <div className="mt-8 border-t border-[#eeeae3] pt-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[15px] tracking-[-0.02em] text-[#1c1c1c]">공유</p>
                  <div className="flex items-center gap-3.5">
                    {shares.map((item) => (
                      <a
                        key={item.kind}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={item.label}
                        className={
                          item.kind === "facebook"
                            ? "text-[#1877F2]"
                            : item.kind === "linkedin"
                              ? "text-[#0A66C2]"
                              : "text-[#111111]"
                        }
                      >
                        <ShareIcon kind={item.kind} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <div className="min-w-0">
            <p className="text-[13px] tracking-[-0.01em] text-[#9a9a9a]">
              {formatKoDate(article.datetime)}
            </p>
            <p
              className="mt-4 text-[clamp(30px,3.5vw,44px)] leading-[1.18] font-bold tracking-[-0.045em] text-[#141414]"
              style={{ fontFamily: FONT_TITLE }}
            >
              {lead}
            </p>
            <div className="mt-12 flex max-w-[640px] flex-col gap-12">
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-28">
                  <h2
                    className="text-[22px] leading-[1.35] font-bold tracking-[-0.04em] text-[#141414]"
                    style={{ fontFamily: FONT_TITLE }}
                  >
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="mt-4 text-[16px] leading-[1.7] tracking-[-0.02em] text-[#4a4a4a]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}
            </div>
          </div>
        </div>

        {related.length ? (
          <section className="mt-20 border-t border-[#e4e2dc] pt-12">
            <div className="flex items-end justify-between gap-6">
              <h2
                className="text-[28px] leading-none font-bold tracking-[-0.04em] md:text-[34px]"
                style={{ fontFamily: FONT_TITLE }}
              >
                다른 칼럼
              </h2>
              <Link
                href="/columns"
                className="text-[14px] tracking-[-0.03em] text-[#171717] underline decoration-[#cfcfcf] underline-offset-4"
              >
                전체 보기
              </Link>
            </div>
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {related.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="block rounded-[20px] bg-white px-6 py-6 hover:bg-[#fbfbfa]"
                  >
                    <p className="text-[13px] text-[#8a8a8a]">
                      {item.categoryLabel}
                      <span className="mx-2">·</span>
                      {formatKoDate(item.datetime)}
                    </p>
                    <p
                      className="mt-3 text-[18px] leading-[1.4] font-bold tracking-[-0.04em]"
                      style={{ fontFamily: FONT_TITLE }}
                    >
                      {item.title}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </article>
  );
}
