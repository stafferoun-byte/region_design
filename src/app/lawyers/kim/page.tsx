import { AttorneysEthics } from "@/components/attorneys-ethics";
import { SitePageFrame } from "@/components/site-page-frame";
import { KIM_NAM_YEOL_BIO } from "@/data/attorney-profiles";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "김남열 변호사 | 법무법인 이로운 파트너스",
  description: "이로운 파트너스 김남열 변호사 소개",
};

export default function KimNamYeolPage() {
  return (
    <SitePageFrame tone="none">
      <AttorneysEthics
        imageSrc="/images/attorneys/kim-nam-yeol.png"
        mobileImageSrc="/images/attorneys/kim-nam-yeol-mobile.png"
        imageAlt="김남열 변호사"
        aspectRatio="1632 / 964"
        headline={["이로운 파트너변호사", "김남열변호사"]}
        paragraphs={KIM_NAM_YEOL_BIO}
      />
    </SitePageFrame>
  );
}
