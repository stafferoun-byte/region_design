import { AttorneysEthics } from "@/components/attorneys-ethics";
import { SitePageFrame } from "@/components/site-page-frame";
import { KANG_NURI_BIO } from "@/data/attorney-profiles";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "강누리 변호사 | 법무법인 이로운 파트너스",
  description: "이로운 파트너스 강누리 변호사 소개",
};

export default function KangNuriPage() {
  return (
    <SitePageFrame tone="none">
      <AttorneysEthics
        imageSrc="/images/attorneys/kang-nuri.jpg"
        mobileImageSrc="/images/attorneys/kang-nuri-mobile.png?v=3"
        imageAlt="강누리 변호사"
        aspectRatio="3000 / 1733"
        headline="강누리 파트너 변호사"
        paragraphs={KANG_NURI_BIO}
      />
    </SitePageFrame>
  );
}
