"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SITE_NAV } from "@/lib/site-nav";

type HeroNavProps = {
  /** overlay: absolute over hero video · sticky: fixed bar on inner pages */
  variant?: "overlay" | "sticky";
  /** Sticky bar wash — match page background */
  stickyTone?: "cream" | "paper";
};

export function HeroNav({
  variant = "overlay",
  stickyTone = "cream",
}: HeroNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const isSticky = variant === "sticky";
  const stickyBg =
    stickyTone === "paper" ? "bg-[#F6F6F4]/90" : "bg-[#FCFCFA]/90";

  useEffect(() => {
    if (!menuOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <div
      ref={rootRef}
      className={
        isSticky
          ? `sticky top-0 z-50 w-full ${stickyBg} px-5 pt-5 pb-3 backdrop-blur-md md:px-10 xl:px-12`
          : "absolute inset-x-0 top-0 z-[5] px-[calc(1.25rem+12px)] pt-[calc(1.25rem+16px)] sm:px-[calc(1.25rem+14px)]"
      }
    >
      <div className="relative">
        <div className="flex w-full items-center justify-between gap-3 rounded-full bg-white py-3 pr-3 pl-4 text-[#171717] shadow-[0_8px_20px_rgba(0,0,0,0.08)] lg:inline-flex lg:w-auto lg:justify-start">
          <Link href="/" className="shrink-0" aria-label="이로운 법률사무소 홈">
            <Image
              src="/images/eroun-logo.png"
              alt="이로운 법률사무소"
              width={240}
              height={56}
              className="h-10 w-auto shrink-0 object-contain sm:h-11 lg:h-12"
              style={{ width: "auto" }}
              priority
            />
          </Link>

          <nav className="hidden items-center gap-2 text-[16px] font-medium tracking-[-0.03em] text-black lg:flex">
            {SITE_NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex min-w-[7.5rem] items-center justify-center rounded-full px-3 py-2.5 text-center transition-colors hover:bg-[#5DC39B] hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="relative flex size-10 shrink-0 items-center justify-center rounded-full lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="hero-mobile-menu"
            aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="flex h-3.5 w-5 flex-col justify-between" aria-hidden>
              <span className="block h-[2px] w-full rounded-full bg-[#292929]" />
              <span className="block h-[2px] w-full rounded-full bg-[#292929]" />
              <span className="block h-[2px] w-full rounded-full bg-[#292929]" />
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
            >
              {SITE_NAV.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-5 py-3.5 text-[18px] font-medium tracking-[-0.03em] text-[#292929] transition-colors hover:bg-[#5DC39B]/10"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
