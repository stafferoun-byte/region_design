import { ConsultFormSection } from "@/components/consult-form-section";
import { SitePageFrame } from "@/components/site-page-frame";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "상담예약 | 법무법인 이로운 파트너스",
  description: "법무법인 이로운 파트너스 무료 상담 예약",
};

export default function ConsultPage() {
  return (
    <SitePageFrame>
      <ConsultFormSection />
    </SitePageFrame>
  );
}
