import { ConsultFormSection } from "@/components/consult-form-section";
import { SitePageFrame } from "@/components/site-page-frame";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "상담예약 | 이로운 법률사무소",
  description: "이로운 법률사무소 무료 상담 예약",
};

export default function ConsultPage() {
  return (
    <SitePageFrame>
      <ConsultFormSection />
    </SitePageFrame>
  );
}
