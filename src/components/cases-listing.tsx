"use client";

import type { CaseCategory, WinningCaseItem } from "@/data/cases";
import { CASE_FILTERS, CASE_ITEMS } from "@/data/cases";
import { useAfterPageWipe, WordReveal } from "@/components/section-title-reveal";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import "@/styles/kuemmerlein-tiles.css";
import "./cases-listing.css";

const PAGE_SIZE = 6;
const easeOut = [0.22, 1, 0.36, 1] as const;

const FIELD_IDS = new Set<CaseCategory>([
  "inheritance",
  "criminal",
  "realestate",
  "divorce",
  "civil",
]);

function CaseCard({ item }: { item: WinningCaseItem }) {
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
      className={risen ? "case-card-rise is-in" : "case-card-rise"}
    >
    <Link href={item.href} className="case-card">
      <div className="case-card__img">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.image} alt="" draggable={false} />
      </div>
      <div className="case-card__body">
        <span className="case-card__tag">{item.categoryLabel}</span>
        <h3>{item.title}</h3>
        <div className="case-card__center">
          <span className="case-card__mark">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.black.png" alt="" draggable={false} />
          </span>
          <span>{item.center}</span>
        </div>
      </div>
    </Link>
    </div>
  );
}

export function CasesListing() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const headerRef = useRef<HTMLElement | null>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const pageReady = useAfterPageWipe();

  const fieldParam = searchParams.get("field");
  const activeField: "all" | CaseCategory =
    fieldParam && FIELD_IDS.has(fieldParam as CaseCategory)
      ? (fieldParam as CaseCategory)
      : "all";

  const filtered = useMemo(() => {
    if (activeField === "all") return CASE_ITEMS;
    return CASE_ITEMS.filter((item) => item.category === activeField);
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
    initial: reduceMotion ? false : ({ opacity: 0, y: 14 } as const),
    animate:
      headerInView || reduceMotion
        ? ({ opacity: 1, y: 0 } as const)
        : ({ opacity: 0, y: 14 } as const),
  };

  return (
    <div className="kuem-insights kuem-insights--on-white kuem-insights--cases">
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
            성공사례
          </motion.h1>
          <WordReveal
            as="p"
            lines={[
              [
                { text: "진심이" },
                { text: "결과가" },
                { text: "되는" },
                { text: "순간." },
              ],
              [
                { text: "이로운" },
                { text: "성공사례를" },
                { text: "소개합니다." },
              ],
            ]}
            inView={!!headerInView && pageReady}
            reduceMotion={reduceMotion}
            delay={0.1}
            className="kuem-insights__lead"
            ariaLabel="진심이 결과가 되는 순간. 이로운 성공사례를 소개합니다."
          />
        </header>

        <nav className="kuem-insights__filter" aria-label="분야">
          {CASE_FILTERS.map((filter) => {
            const selected = filter.id === activeField;
            return (
              <div key={filter.id} className="kuem-insights__filter-item">
                <Link
                  href={filter.href}
                  className="kuem-insights__filter-link"
                  aria-current={selected ? "page" : undefined}
                >
                  {filter.id === "all" ? (
                    <>
                      <span className="max-md:hidden">{filter.label}</span>
                      <span className="hidden max-md:inline" lang="en">
                        All
                      </span>
                    </>
                  ) : (
                    filter.label
                  )}
                </Link>
              </div>
            );
          })}
        </nav>

        <div className="kuem-insights__grid cases-grid">
          {pageItems.map((item) => (
            <CaseCard key={item.id} item={item} />
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
