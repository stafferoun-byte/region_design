import { ConsultFormSection } from "@/components/consult-form-section";
import { FaqSection } from "@/components/faq-section";
import { LocationSection } from "@/components/location-section";
import { SitePageFrame } from "@/components/site-page-frame";
import type { Metadata } from "next";
import { IBM_Plex_Sans_KR } from "next/font/google";

const ibmSans = IBM_Plex_Sans_KR({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
  variable: "--font-ibm-sans",
});

export const metadata: Metadata = {
  title: "오시는길 | 법무법인 이로운 파트너스",
  description: "법무법인 이로운 파트너스 서울·남양주 사무소 안내",
};

export default function LocationPage() {
  return (
    <div className={ibmSans.variable}>
    <SitePageFrame tone="none">
      <LocationSection />
      <ConsultFormSection />
      <FaqSection background="#FFFFFF" />
    </SitePageFrame>
    </div>
  );
}
