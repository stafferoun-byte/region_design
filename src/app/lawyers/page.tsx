import { LawyersListing } from "@/components/lawyers-listing";
import { SitePageFrame } from "@/components/site-page-frame";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이로운 변호사들 | 법무법인 이로운 파트너스",
  description: "법무법인 이로운 파트너스 변호사 소개",
};

export default function AttorneysPage() {
  return (
    <SitePageFrame tone="none">
      <LawyersListing />
    </SitePageFrame>
  );
}
