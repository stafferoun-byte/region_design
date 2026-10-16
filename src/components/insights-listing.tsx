"use client";

import type { InsightArticle, InsightCategory } from "@/data/insights";
import { INSIGHT_ARTICLES, INSIGHT_FILTERS } from "@/data/insights";
import { useAfterPageWipe, WordReveal } from "@/components/section-title-reveal";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import "@/styles/kuemmerlein-fonts.css";
import "@/styles/kuemmerlein-tiles.css";

/**
 * Pixel-matched to Küemmerlein news tiles
 * @see https://www.kuemmerlein.de/en/news/all-news/
 */

const PAGE_SIZE = 6;
const easeOut = [0.22, 1, 0.36, 1] as const;

const FIELD_IDS = new Set<InsightCategory>([
  "inheritance",
  "criminal",
  "realestate",
  "divorce",
  "other",
]);

function MaskCorner() {
  return (
    <svg
      className="kuem-mask-br"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 31 31"
      aria-hidden
    >
      <path
        style={{ fill: "var(--page_bg_color)" }}
        d="M0,30v1h31V0h-1c0,16.57-13.43,30-30,30Z"
      />
    </svg>
  );
}

/** Exact Küemmerlein arrow SVG */
function ArrowSvg() {
  return (
    <svg
      className="kuem-tile__arrow"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 12"
      aria-hidden
    >
      <path d="M11.02,1.48c0-.28-.22-.5-.5-.5h-4.5c-.28,0-.5.22-.5.5s.22.5.5.5h4v4c0,.28.22.5.5.5s.5-.22.5-.5V1.48Z" />
      <rect
        x="-.57"
        y="5.57"
        width="13"
        height="1"
        transform="translate(-2.56 5.97) rotate(-45)"
      />
    </svg>
  );
}

function ArticleCard({ article }: { article: InsightArticle }) {
  const riseRef = useRef<HTMLDivElement | null>(null);
  const [risen, setRisen] = useState(false);

  useEffect(() => {
    const el = riseRef.current;
    if (!el) return;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!mobile || reduce) {
      setRisen(true);
      return;
    }
    let done = false;
    const reveal = () => {
      if (done) return;
      const rect = el.getBoundingClientRect();
      if (rect.top > window.innerHeight * 0.88) return;
      done = true;
      setRisen(true);
      window.removeEventListener("scroll", reveal);
      lenis?.off?.("scroll", reveal);
    };
    const lenis = (
      window as unknown as { __lenis?: { on?: Function; off?: Function } }
    ).__lenis;
    reveal();
    window.addEventListener("scroll", reveal, { passive: true });
    lenis?.on?.("scroll", reveal);
    return () => {
      window.removeEventListener("scroll", reveal);
      lenis?.off?.("scroll", reveal);
    };
  }, []);

  return (
    <div
      ref={riseRef}
      className={risen ? "insight-card-rise is-in" : "insight-card-rise"}
    >
    <article className="kuem-tile group relative">
      <Link
        href={article.href}
        className="absolute inset-0 z-[2]"
        aria-label={article.title}
      />
      <div className="kuem-tile__top">
        <div className="kuem-tile__content">
          <div className="kuem-tile__img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={article.image} alt="" draggable={false} />
            <Link
              href={article.href}
              className="absolute inset-0 z-[1]"
              aria-label={article.title}
            />
          </div>

          <div className="kuem-tile__meta">
            <div className="kuem-tile__date">
              <time dateTime={article.datetime}>{article.date}</time>
            </div>
            {article.author ? (
              <div className="kuem-tile__author">{article.author}</div>
            ) : null}
          </div>

          <div className="kuem-tile__tags">
            <span className="kuem-tile__tag">{article.categoryLabel}</span>
          </div>

          <h3 className="kuem-tile__title">
            <Link href={article.href}>{article.title}</Link>
          </h3>
        </div>
        <MaskCorner />
      </div>

      <div className="kuem-tile__bottom">
        <div className="kuem-tile__left">
          <MaskCorner />
        </div>
        <div className="kuem-tile__cutout">
          <div className="kuem-tile__circle">
            <Link
              href={article.href}
              className="kuem-tile__circle-inner"
              aria-label={`${article.title} 읽기`}
            >
              <ArrowSvg />
            </Link>
          </div>
        </div>
      </div>
    </article>
    </div>
  );
}

export function InsightsListing() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const headerRef = useRef<HTMLElement | null>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const pageReady = useAfterPageWipe();

  const fieldParam = searchParams.get("field");
  const activeField: "all" | InsightCategory =
    fieldParam && FIELD_IDS.has(fieldParam as InsightCategory)
      ? (fieldParam as InsightCategory)
      : "all";

  const filtered = useMemo(() => {
    if (activeField === "all") return INSIGHT_ARTICLES;
    return INSIGHT_ARTICLES.filter((a) => a.category === activeField);
  }, [activeField]);

  useEffect(() => {
    setPage(1);
  }, [activeField]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const appear = {
    initial: reduceMotion
      ? false
      : ({ opacity: 0, y: 14 } as const),
    animate:
      headerInView || reduceMotion
        ? ({ opacity: 1, y: 0 } as const)
        : ({ opacity: 0, y: 14 } as const),
  };

  return (
    <div className="kuem-insights kuem-insights--on-white kuem-insights--columns">
      <div className="kuem-insights__pad">
        <header ref={headerRef}>
          <motion.h1
            className="kuem-insights__title kuem-insights__title--ibm will-change-[opacity,transform]"
            initial={appear.initial}
            animate={appear.animate}
            transition={{
              duration: reduceMotion ? 0 : 0.85,
              ease: easeOut,
            }}
          >
            이로운 인사이트
          </motion.h1>
          <WordReveal
            as="p"
            lines={[
              [
                { text: "이로운" },
                { text: "칼럼에서는" },
                { text: "현장에서" },
                { text: "쌓은" },
                { text: "경험을" },
                { text: "바탕으로," },
              ],
              [
                { text: "의뢰인에게" },
                { text: "실제로" },
                { text: "도움이" },
                { text: "되는" },
                { text: "법률" },
                { text: "이야기를" },
                { text: "짧게" },
                { text: "전합니다." },
              ],
              [
                { text: "복잡한" },
                { text: "쟁점을" },
                { text: "정리해" },
                { text: "다음" },
                { text: "결정을" },
                { text: "위한" },
                { text: "공간을" },
                { text: "엽니다." },
              ],
            ]}
            inView={!!headerInView && pageReady}
            reduceMotion={reduceMotion}
            delay={0.1}
            className="kuem-insights__lead"
            ariaLabel="이로운 칼럼에서는 현장에서 쌓은 경험을 바탕으로, 의뢰인에게 실제로 도움이 되는 법률 이야기를 짧게 전합니다. 복잡한 쟁점을 정리해 다음 결정을 위한 공간을 엽니다."
          />
        </header>

        <nav className="kuem-insights__filter" aria-label="분야">
          {INSIGHT_FILTERS.map((f) => {
            const selected = f.id === activeField;
            const children =
              "children" in f && f.children ? f.children : null;
            return (
              <div
                key={f.id}
                className="kuem-insights__filter-item"
              >
                <Link
                  href={f.href}
                  className="kuem-insights__filter-link"
                  aria-current={selected ? "page" : undefined}
                  aria-haspopup={children ? "menu" : undefined}
                >
                  {f.id === "all" ? (
                    <>
                      <span className="max-md:hidden">{f.label}</span>
                      <span className="hidden max-md:inline" lang="en">
                        All
                      </span>
                    </>
                  ) : (
                    f.label
                  )}
                </Link>
                {children ? (
                  <ul className="kuem-insights__filter-menu" role="menu">
                    {children.map((child) => (
                      <li key={child.label} role="none">
                        <Link
                          href={child.href}
                          role="menuitem"
                          className="kuem-insights__filter-menu-link"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            );
          })}
        </nav>

        <div className="kuem-insights__grid">
          {pageItems.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        <nav className="kuem-insights__pager" aria-label="페이지네이션">
          <ul className="kuem-insights__pager-list">
            {Array.from(
              { length: Math.min(totalPages, 4) },
              (_, i) => i + 1,
            ).map((n) => (
              <li key={n} className="kuem-insights__pager-item">
                {currentPage === n ? (
                  <span className="kuem-insights__pager-current">{n}</span>
                ) : (
                  <button
                    type="button"
                    className="kuem-insights__pager-link"
                    onClick={() => setPage(n)}
                  >
                    {n}
                  </button>
                )}
              </li>
            ))}
            {totalPages > 4 ? (
              <>
                <li className="kuem-insights__pager-item">
                  <span className="kuem-insights__pager-ellipsis" aria-hidden>
                    …
                  </span>
                </li>
                <li className="kuem-insights__pager-item">
                  {currentPage === totalPages ? (
                    <span className="kuem-insights__pager-current">
                      {totalPages}
                    </span>
                  ) : (
                    <button
                      type="button"
                      className="kuem-insights__pager-link"
                      onClick={() => setPage(totalPages)}
                    >
                      {totalPages}
                    </button>
                  )}
                </li>
              </>
            ) : null}
            <li className="kuem-insights__pager-item">
              <button
                type="button"
                className="kuem-insights__pager-link kuem-insights__pager-next"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
              >
                NEXT
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
