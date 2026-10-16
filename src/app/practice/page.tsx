import { PartnerCentersSection } from "@/components/partner-about-sections";
import { SitePageFrame } from "@/components/site-page-frame";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "업무분야 | 법무법인 이로운 파트너스",
  description: "법무법인 이로운 파트너스 업무분야",
};

export default function PracticeIndexPage() {
  return (
    <div className="practice-rhythm">
      <SitePageFrame tone="none">
        <PartnerCentersSection />
      </SitePageFrame>
    </div>
  );
}
