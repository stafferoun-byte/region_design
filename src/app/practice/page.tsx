import { ConsultFormSection } from "@/components/consult-form-section";
import { FaqSection } from "@/components/faq-section";
import { SitePageFrame } from "@/components/site-page-frame";
import { TeamSection } from "@/components/team-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "업무분야 | 이로운 법률사무소",
  description: "상속, 형사, 민사, 이혼·가사, 부동산, 교통사고 전문 센터",
};

export default function PracticePage() {
  return (
    <SitePageFrame>
      <div className="pt-4 md:pt-6">
        <TeamSection />
      </div>
      <FaqSection />
      <ConsultFormSection />
    </SitePageFrame>
  );
}
