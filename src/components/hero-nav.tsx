"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SITE_NAV } from "@/lib/site-nav";

const FONT_PRETENDARD =
  '"Pretendard", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';

type HeroNavProps = {
  /** overlay: absolute over hero video · sticky: fixed bar on inner pages */
  variant?: "overlay" | "sticky";
  /** Sticky bar wash — match page background */
  stickyTone?: "cream" | "paper";
  /** Fixed over the first screen so it does not push the page down */
  fixedBar?: boolean;
};

const linkClass =
  "relative z-10 inline-flex min-w-[6.5rem] cursor-pointer items-center justify-center rounded-full px-3 py-2 text-center transition-colors";

/** Kora nav pill — spring on the selector in script_main (bounce 0.29, duration 0.56). */
const PILL_SPRING = { type: "spring" as const, duration: 0.56, bounce: 0.29 };

type PillBox = { x: number; y: number; w: number; h: number };

function submenuId(href: string) {
  return `site-submenu-${href.replaceAll("/", "")}`;
}

export function HeroNav({
  variant = "overlay",
  stickyTone: _stickyTone = "cream",
  fixedBar = false,
}: HeroNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [barHover, setBarHover] = useState(false);
  const [hoverHref, setHoverHref] = useState<string | null>(null);
  const [pill, setPill] = useState<PillBox | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLElement>(null);
  const lastPillRef = useRef<PillBox>({ x: 0, y: 0, w: 120, h: 44 });
  const isSticky = variant === "sticky";
  if (pill) lastPillRef.current = pill;
  const ghost = pill ?? lastPillRef.current;

  function placePill(el: HTMLElement) {
    const nav = linksRef.current;
    if (!nav) return;
    const nr = nav.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    setPill({
      x: r.left - nr.left,
      y: r.top - nr.top,
      w: r.width,
      h: r.height,
    });
  }

  function clearPill() {
    setHoverHref(null);
    setPill(null);
  }

  useEffect(() => {
    if (!menuOpen && !openKey) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
        setOpenKey(null);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setOpenKey(null);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, openKey]);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <div
      ref={rootRef}
      className={
        isSticky
          ? `${fixedBar ? "fixed inset-x-0" : "sticky"} top-0 z-50 w-full bg-transparent px-5 pt-5 pb-3 md:px-10 xl:px-12`
          : /* Kora: floating pill stays on screen while scrolling */
            "fixed inset-x-0 top-0 z-50 px-[calc(1.25rem+4px)] pt-[calc(1.25rem+8px)] sm:px-[calc(1.25rem+6px)] md:px-[calc(1.25rem+16px)] md:pt-[calc(1.25rem+16px)]"
      }
    >
      <div
        aria-hidden
        className={`pointer-events-none fixed inset-0 hidden bg-[rgba(0,0,0,0.45)] transition-[opacity,backdrop-filter] duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] lg:block ${
          barHover ? "opacity-100 backdrop-blur-[8px]" : "opacity-0 backdrop-blur-none"
        }`}
      />
      <div className="relative z-10">
        <div
          className="flex w-full items-center justify-between gap-3 rounded-full bg-white py-3 pr-3 pl-7 text-[#171717] shadow-[0_8px_20px_rgba(0,0,0,0.08)] md:pl-10 lg:inline-flex lg:w-auto lg:justify-start"
          onMouseEnter={() => setBarHover(true)}
          onMouseLeave={() => {
            setBarHover(false);
            clearPill();
          }}
        >
          <Link href="/" className="shrink-0" aria-label="법무법인 이로운 파트너스 홈">
            <Image
              src="/images/logo.black.png"
              alt="법무법인 이로운 파트너스"
              width={2182}
              height={628}
              className="h-7 w-auto shrink-0 object-contain"
              style={{ width: "auto" }}
              priority
            />
          </Link>

          <nav
            ref={linksRef}
            className="relative ml-4 hidden items-center gap-2 text-[13px] leading-[1.5] font-normal tracking-[-0.03em] text-black lg:flex"
            style={{ fontFamily: FONT_PRETENDARD }}
            onMouseLeave={clearPill}
          >
            <motion.span
              aria-hidden
              className="pointer-events-none absolute top-0 left-0 z-0 rounded-full bg-[#5DC39B]"
              initial={false}
              animate={{
                x: ghost.x,
                y: pill ? ghost.y : ghost.y + 50,
                width: ghost.w,
                height: ghost.h,
                opacity: pill ? 1 : 0,
                scale: pill ? 1 : 0.4,
              }}
              transition={PILL_SPRING}
            />
            {SITE_NAV.map((link) =>
              link.children ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={(event) => {
                    setOpenKey(link.href);
                    setHoverHref(link.href);
                    const button = event.currentTarget.querySelector("button");
                    if (button) placePill(button);
                  }}
                  onMouseLeave={() =>
                    setOpenKey((key) => (key === link.href ? null : key))
                  }
                >
                  <button
                    type="button"
                    aria-expanded={openKey === link.href}
                    aria-controls={submenuId(link.href)}
                    className={`${linkClass} ${hoverHref === link.href ? "text-[#FCFCFA]" : ""}`}
                    onClick={() =>
                      setOpenKey((key) => (key === link.href ? null : link.href))
                    }
                  >
                    {link.label}
                  </button>
                  <AnimatePresence>
                    {openKey === link.href ? (
                      <motion.div
                        id={submenuId(link.href)}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-full left-0 z-50 pt-[18px]"
                      >
                        <div
                          className="w-[200px] overflow-hidden rounded-[24px] py-2 shadow-[0_0_0_1px_#ffffff80]"
                          style={{
                            backgroundColor: "#ffffff59",
                            backdropFilter: "blur(10px)",
                            WebkitBackdropFilter: "blur(10px)",
                          }}
                        >
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block whitespace-nowrap px-5 py-2.5 text-[13px] font-normal tracking-[-0.03em] text-white transition-colors duration-300 ease-out hover:font-semibold"
                            onClick={() => setOpenKey(null)}
                          >
                            {child.label}
                          </Link>
                        ))}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${linkClass} ${hoverHref === link.href ? "text-[#FCFCFA]" : ""}`}
                  onMouseEnter={(event) => {
                    setHoverHref(link.href);
                    placePill(event.currentTarget);
                  }}
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          <button
            type="button"
            className="relative flex size-8 shrink-0 items-center justify-center rounded-full bg-[#F5F5E9] lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="hero-mobile-menu"
            aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="relative h-3.5 w-5" aria-hidden>
              <span
                className={`absolute left-0 block h-[2px] w-full rounded-full bg-[#292929] transition-all duration-200 ease-out ${
                  menuOpen
                    ? "top-1/2 -translate-y-1/2 rotate-45"
                    : "top-0 translate-y-0 rotate-0"
                }`}
              />
              <span
                className={`absolute top-1/2 left-0 block h-[2px] w-full -translate-y-1/2 rounded-full bg-[#292929] transition-opacity duration-200 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-[2px] w-full rounded-full bg-[#292929] transition-all duration-200 ease-out ${
                  menuOpen
                    ? "top-1/2 -translate-y-1/2 -rotate-45"
                    : "bottom-0 translate-y-0 rotate-0"
                }`}
              />
            </span>
          </button>
        </div>

        <AnimatePresence>
          {menuOpen ? (
            <motion.nav
              id="hero-mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-[calc(100%+8px)] right-0 left-0 overflow-hidden rounded-[30px] border border-[rgba(227,227,227,0.45)] bg-white py-2 shadow-[0_8px_20px_rgba(0,0,0,0.08)] lg:hidden"
              style={{ fontFamily: FONT_PRETENDARD }}
            >
              {SITE_NAV.map((link) =>
                link.children ? (
                  <div key={link.href}>
                    <button
                      type="button"
                      aria-expanded={openKey === link.href}
                      className={`block w-full cursor-pointer px-5 py-3 text-left text-[15px] font-medium tracking-[-0.03em] transition-colors ${
                        openKey === link.href
                          ? "bg-[#5DC39B] text-white"
                          : "text-[#292929] hover:bg-[#5DC39B]/10"
                      }`}
                      onClick={() =>
                        setOpenKey((key) => (key === link.href ? null : link.href))
                      }
                    >
                      {link.label}
                    </button>
                    {openKey === link.href
                      ? link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block py-2.5 pr-5 pl-9 text-[14px] font-medium tracking-[-0.03em] text-[#292929] transition-colors hover:bg-[#5DC39B]/10"
                            onClick={() => {
                              setMenuOpen(false);
                              setOpenKey(null);
                            }}
                          >
                            {child.label}
                          </Link>
                        ))
                      : null}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-5 py-3 text-[15px] font-medium tracking-[-0.03em] text-[#292929] transition-colors hover:bg-[#5DC39B]/10"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
