import { SitePageFrame } from "@/components/site-page-frame";
import { WishNetworkSection } from "@/components/wish-network-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이로운 파트너스 | 이로운 법률사무소",
  description: "이로운 파트너스 변호사들과 함께하는 법률 파트너십",
};

export default function PartnersPage() {
  return (
    <SitePageFrame>
      <div className="pb-8 md:pb-12">
        <WishNetworkSection />
      </div>
    </SitePageFrame>
  );
}
