import { CasesListing } from "@/components/cases-listing";
import { SitePageFrame } from "@/components/site-page-frame";
import { IBM_Plex_Sans_KR } from "next/font/google";
import { Suspense } from "react";

const ibmSans = IBM_Plex_Sans_KR({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
  variable: "--font-ibm-sans",
});

export default function CasesPage() {
  return (
    <div className={ibmSans.variable}>
      <SitePageFrame tone="none">
        <Suspense fallback={null}>
          <CasesListing />
        </Suspense>
      </SitePageFrame>
    </div>
  );
}
