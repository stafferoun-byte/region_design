import { PracticeBrandPage } from "@/components/practice-brand-page";
import { SitePageFrame } from "@/components/site-page-frame";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "업무분야 | 이로운 법률사무소",
  description: "이로운 법률사무소 업무분야",
};

/**
 * Practice page — JoongAng Brand layout
 * (@see https://www.joonganggroup.com/brand/)
 * HeroNav + footer via SitePageFrame (unchanged).
 */
export default function PracticePage() {
  return (
    <SitePageFrame tone="none">
      <PracticeBrandPage />
    </SitePageFrame>
  );
}
