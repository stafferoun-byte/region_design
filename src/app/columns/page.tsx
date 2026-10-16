import { InsightsListing } from "@/components/insights-listing";
import { SitePageFrame } from "@/components/site-page-frame";
import { IBM_Plex_Sans_KR, Noto_Serif_KR } from "next/font/google";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "이로운 칼럼 | 법무법인 이로운 파트너스",
  description:
    "사건 현장에서 쌓은 경험과 의뢰인에게 도움이 되는 법률 칼럼을 정리합니다.",
};

/** Korean glyph fallback for Rhymes Display titles */
const notoSerif = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-insight-kr",
  display: "swap",
});

const ibmSans = IBM_Plex_Sans_KR({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
  variable: "--font-ibm-sans",
});

export default function InsightsPage() {
  return (
    <div className={`${notoSerif.variable} ${ibmSans.variable}`}>
        <SitePageFrame tone="none">
        <Suspense fallback={null}>
          <InsightsListing />
        </Suspense>
      </SitePageFrame>
    </div>
  );
}
