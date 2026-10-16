import { PartnerAboutSections } from "@/components/partner-about-sections";
import { PartnerIntroScroll } from "@/components/partner-intro-scroll";
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
  title: "이로운 파트너스 소개 | 법무법인 이로운 파트너스",
  description: "이로운 파트너스 소개",
};

export default function PartnersPage() {
  return (
    <div className={ibmSans.variable}>
      <SitePageFrame tone="none" navFixed>
        <PartnerIntroScroll />
        <PartnerAboutSections />
      </SitePageFrame>
    </div>
  );
}
