import { ConsultFormSection } from "@/components/consult-form-section";
import { PartnerCentersSection } from "@/components/partner-about-sections";
import { PracticeAffiliateSection } from "@/components/practice-affiliate-section";
import { PracticeInheritSection } from "@/components/practice-inherit-section";
import { PracticeStrategySection } from "@/components/practice-strategy-section";
import { PracticeShareSection } from "@/components/practice-share-section";
import { SitePageFrame } from "@/components/site-page-frame";
import type { Metadata } from "next";
import { IBM_Plex_Sans_KR } from "next/font/google";

const ibmSans = IBM_Plex_Sans_KR({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-ibm-sans",
});

export const metadata: Metadata = {
  title: "상속 | 법무법인 이로운 파트너스",
  description: "법무법인 이로운 파트너스 상속 업무",
};

/**
 * HeroNav + footer via SitePageFrame.
 */
export default function PracticePage() {
  return (
    <div className={`${ibmSans.variable} practice-rhythm`}>
      <SitePageFrame tone="none">
        <PracticeShareSection imageSrc="/images/practice/inherit-hero.jpg" />
        <PracticeAffiliateSection />
        <PracticeInheritSection />
        <PracticeStrategySection />
        <PartnerCentersSection
          titleLines={[
            ["상담을", "앞두고,"],
            [
              { text: "이런", color: "#5DC39B" },
              { text: "점이", color: "#5DC39B" },
              { text: "궁금", color: "#5DC39B", glue: true },
              "하셨나요?",
            ],
          ]}
          items={[
            {
              no: "01",
              q: "소송을 해야 할지 아직 결정하지 못했어요.",
              a: "상담이 곧 소송의 시작은 아닙니다. 가족 간에 다르게 알고 있는 사실과 법적으로 다툴 문제를 구분하고, 협의로 조정할 수 있는 금액과 조건부터 검토합니다. 의뢰인이 직접 설명하기 어려운 요구는 변호사를 통해 전할 수 있습니다. 다만 권리행사 기한이나 재산 처분 우려 때문에 먼저 조치해야 할 문제가 있다면 그 이유를 별도로 설명합니다.",
            },
            {
              no: "02",
              q: "이미 작성한 상속재산분할협의서도 다시 다툴 수 있나요?",
              a: "단순히 분할 결과가 아쉽다는 이유만으로 협의의 효력이 없어지지는 않습니다. 다만 일부 상속인이 빠졌거나, 중요한 착오 또는 사기·강박이 있었다면 무효나 취소 사유를 검토할 수 있습니다. 작성 당시의 설명과 주고받은 자료, 실제 합의 내용이 무엇이었는지 확인해 다툴 근거를 판단합니다.",
            },
            {
              no: "03",
              q: "부모님께 받은 재산을 돌려달라며 소송을 걸어왔어요.",
              a: "소장에 적힌 청구액을 그대로 전제로 삼지 않습니다. 받은 재산이 실제 증여인지, 특별한 부양에 대한 보상이었는지, 상대방이 이미 받은 재산이 계산에서 빠지지는 않았는지 확인합니다. 청구의 종류와 적용 법령에 따라 제외할 재산과 다툴 평가액을 정리해, 인정할 부분과 방어할 부분을 구분합니다.",
            },
            {
              no: "04",
              q: "다른 상속인이 재산을 처분하려 하면 막을 수 있나요?",
              a: "청구하려는 권리와 재산의 상태에 따라 가압류·가처분 등 보전처분을 검토할 수 있습니다. 돈을 청구하는지, 부동산의 권리 자체를 다투는지에 따라 필요한 절차가 달라집니다. 처분 움직임을 보여주는 자료와 권리의 근거를 갖춰, 본안 판단 전에 필요한 조치를 신청할 수 있는지 검토합니다.",
            },
          ]}
        />
        <ConsultFormSection
          titleClassName="max-w-none text-[clamp(27px,calc(2.7vw-1px),39px)] !leading-[1.18]"
          titleLines={[
            [
              { text: "가족에게는", color: "#FFFFFF" },
              { text: "꺼내기", color: "#FFFFFF" },
              { text: "어려웠던", color: "#FFFFFF" },
              { text: "이야기,", color: "#FFFFFF" },
            ],
            [
              { text: "이로운", color: "#FFFFFF", fontSize: "clamp(31px, calc(4.5vw - 1px), 55px)" },
              { text: "파트너스에게는", color: "#FFFFFF", fontSize: "clamp(31px, calc(4.5vw - 1px), 55px)" },
            ],
            [
              { text: "편안히", color: "#FFFFFF", fontSize: "clamp(31px, calc(4.5vw - 1px), 55px)", lineHeight: "1.08" },
              { text: "털어놓으세요.", color: "#FFFFFF", fontSize: "clamp(31px, calc(4.5vw - 1px), 55px)", lineHeight: "1.08" },
            ],
          ]}
          cardIntro={{
            lead: "어디서부터 이야기해야 할지, 아직 분명하지 않아도 괜찮습니다.",
            support: "오랫동안 마음에 남아 있던 일부터 천천히 들려주세요.",
          }}
        />
      </SitePageFrame>
    </div>
  );
}
