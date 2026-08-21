"use client";

import { SitePageFrame } from "@/components/site-page-frame";
import { WinningCases } from "@/components/winning-cases";

export default function CasesPage() {
  return (
    <SitePageFrame>
      <div className="py-10 md:py-16 xl:py-20">
        <WinningCases reveal />
      </div>
    </SitePageFrame>
  );
}
