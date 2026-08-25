"use client";

import { HeroNav } from "@/components/hero-nav";
import { SiteFooter } from "@/components/site-footer";
import type { ReactNode } from "react";

/** Shared chrome for category pages: sticky nav + content + identical footer */
export function SitePageFrame({
  children,
  tone = "cream",
  showNav = true,
}: {
  children: ReactNode;
  /** cream = default site · paper = Küemmerlein soft-grey0 */
  tone?: "cream" | "paper";
  /** false when a page embeds its own hero nav (e.g. practice) */
  showNav?: boolean;
}) {
  const bg = tone === "paper" ? "#F6F6F4" : "#FCFCFA";

  return (
    <div className="relative min-h-svh text-[#161616]" style={{ backgroundColor: bg }}>
      {showNav ? (
        <HeroNav variant="sticky" stickyTone={tone === "paper" ? "paper" : "cream"} />
      ) : null}
      <main className="relative z-10">{children}</main>
      <div className="relative z-20 overflow-x-clip" style={{ backgroundColor: bg }}>
        <SiteFooter />
      </div>
    </div>
  );
}
