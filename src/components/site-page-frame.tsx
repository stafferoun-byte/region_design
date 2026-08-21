"use client";

import { HeroNav } from "@/components/hero-nav";
import { SiteFooter } from "@/components/site-footer";
import type { ReactNode } from "react";

/** Shared chrome for category pages: sticky nav + content + identical footer */
export function SitePageFrame({
  children,
  tone = "cream",
}: {
  children: ReactNode;
  /** cream = default site · paper = Küemmerlein soft-grey0 */
  tone?: "cream" | "paper";
}) {
  const bg = tone === "paper" ? "#F6F6F4" : "#FCFCFA";

  return (
    <div className="relative min-h-svh text-[#161616]" style={{ backgroundColor: bg }}>
      <HeroNav variant="sticky" stickyTone={tone === "paper" ? "paper" : "cream"} />
      <main className="relative z-10">{children}</main>
      <div className="relative z-20 overflow-x-clip" style={{ backgroundColor: bg }}>
        <SiteFooter />
      </div>
    </div>
  );
}
