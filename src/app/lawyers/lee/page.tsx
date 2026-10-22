import { AttorneysEthics } from "@/components/attorneys-ethics";
import { SitePageFrame } from "@/components/site-page-frame";
import { LEE_CHANG_JAE_BIO } from "@/data/attorney-profiles";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이창재 변호사 | 법무법인 이로운 파트너스",
  description: "이로운 파트너스 이창재 변호사 소개",
};

export default function LeeChangJaePage() {
  return (
    <SitePageFrame tone="none">
      <AttorneysEthics
        imageSrc="/images/attorneys/lee-chang-jae.png"
        mobileImageSrc="/images/attorneys/lee-chang-jae-mobile.png"
        imageAlt="이창재 변호사"
        aspectRatio="1632 / 963"
        headline={["이로운 대표변호사", "이창재변호사"]}
        paragraphs={LEE_CHANG_JAE_BIO}
      />
    </SitePageFrame>
  );
}
