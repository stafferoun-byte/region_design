import { ConsultFormSection } from "@/components/consult-form-section";
import { FaqSection, type FaqItem } from "@/components/faq-section";
import { PracticeHeroSection } from "@/components/practice-hero-section";
import { PracticeIntroSection } from "@/components/practice-intro-section";
import { PracticeValuesSection } from "@/components/practice-values-section";
import { SitePageFrame } from "@/components/site-page-frame";
import { TeamSection } from "@/components/team-section";
import { Noto_Serif_KR } from "next/font/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "업무분야 | 이로운 법률사무소",
  description: "상속, 형사, 민사, 이혼·가사, 부동산, 교통사고 전문 센터",
};

const practiceSerif = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-practice-serif",
  display: "swap",
});

const PRACTICE_CATEGORIES = [
  { id: "inheritance", label: "상속" },
  { id: "criminal", label: "형사" },
  { id: "divorce", label: "이혼" },
  { id: "realestate", label: "부동산" },
] as const;

const PRACTICE_FAQ: Record<string, FaqItem[]> = {
  inheritance: [
    {
      id: "inh1",
      question: "부모님 재산을 정확히 몰라도 시작할 수 있나요?",
      answer:
        "네. 먼저 확인 가능한 부동산과 금융재산, 보험과 채무의 범위를 정하고, 생전 처분된 재산이 의심된다면 추가로 확보할 자료를 살펴봅니다.",
    },
    {
      id: "inh2",
      question: "이미 작성한 상속재산분할협의서를 다시 다툴 수 있나요?",
      answer:
        "결과가 불리하다는 이유만으로 되돌리기는 어렵습니다. 상속인이 빠졌는지, 사기·강박이나 중대한 착오가 있었는지, 누락된 재산이 있는지에 따라 달라집니다.",
    },
    {
      id: "inh3",
      question: "부모님을 모셨다면 기여분이 인정되나요?",
      answer:
        "동거하거나 간병했다는 사실만으로 정해지지는 않습니다. 부양의 기간과 정도, 비용 부담과 재산 유지에 대한 기여를 객관적인 자료로 보여주어야 합니다.",
    },
    {
      id: "inh4",
      question: "다른 상속인이 재산을 처분하려 하면 막을 수 있나요?",
      answer:
        "재산의 명의와 현재 처분 가능성을 먼저 확인합니다. 필요하다면 분할심판과 별도로 가압류나 처분금지 가처분 등 보전조치를 검토합니다.",
    },
  ],
  criminal: [
    {
      id: "cr1",
      question: "경찰에서 연락이 오면 바로 출석해야 하나요?",
      answer:
        "출석 요구의 내용과 일정을 먼저 확인합니다. 임의동행인지 소환인지에 따라 대응이 달라지며, 진술 전에 사실관계와 유리·불리한 쟁점을 정리하는 것이 중요합니다.",
    },
    {
      id: "cr2",
      question: "조사에서 한 진술은 나중에 바꿀 수 있나요?",
      answer:
        "이미 기재된 진술은 수사·재판에서 중요한 자료가 됩니다. 착오나 강요·유도가 있었다면 정정·보완 가능성을 검토하지만, 처음부터 신중히 대응하는 편이 안전합니다.",
    },
    {
      id: "cr3",
      question: "합의가 되면 형사처벌이 없어지나요?",
      answer:
        "합의는 양형과 처분 결정에 영향을 줄 수 있지만, 죄명과 피해 정도에 따라 결과는 달라집니다. 합의 범위와 시기, 기록에 남는 방식까지 함께 설계해야 합니다.",
    },
    {
      id: "cr4",
      question: "학교폭력·사기 사건도 초기에 변호인이 필요한가요?",
      answer:
        "네. 초기 진술과 증거 확보가 결과를 크게 좌우합니다. 피해자·가해자 입장에 따라 대응 포인트가 다르니, 조사 전에 방향을 잡는 것이 좋습니다.",
    },
  ],
  divorce: [
    {
      id: "dv1",
      question: "협의이혼과 소송이혼, 어떤 경우에 갈리나요?",
      answer:
        "재산분할·양육·위자료 등 쟁점에 합의가 되면 협의이혼이 가능합니다. 합의가 어렵거나 상대가 응하지 않으면 소송으로 진행하는 경우가 많습니다.",
    },
    {
      id: "dv2",
      question: "재산분할은 어떻게 정해지나요?",
      answer:
        "혼인 중 형성된 공동재산의 기여도를 기준으로 합니다. 명의와 무관하게 실질 기여가 중요하며, 특유재산·혼인 전 재산은 원칙적으로 제외되는 경우가 많습니다.",
    },
    {
      id: "dv3",
      question: "양육권은 누가 가져가나요?",
      answer:
        "자녀의 복리가 최우선입니다. 양육 환경, 지금까지의 양육 주체, 자녀의 의사 등을 종합해 판단하며, 면접교섭과 양육비도 함께 정합니다.",
    },
    {
      id: "dv4",
      question: "상간소송은 언제 가능한가요?",
      answer:
        "배우자의 부정행위와 상대방의 인식·관여를 입증할 수 있을 때 검토합니다. 위자료 청구와 이혼 절차를 어떻게 연결할지는 증거와 시점에 따라 달라집니다.",
    },
  ],
  realestate: [
    {
      id: "re1",
      question: "전세보증금을 돌려받지 못하면 어떻게 해야 하나요?",
      answer:
        "계약 종료·명도·보증금 반환 청구의 순서를 정리합니다. 필요하면 임차권등기명령, 지급명령, 가압류 등 보전·집행 수단을 함께 검토합니다.",
    },
    {
      id: "re2",
      question: "집주인이 연락이 안 되면 보증금을 포기해야 하나요?",
      answer:
        "아닙니다. 내용증명과 소송·집행 절차로 대응할 수 있습니다. 선순위 권리와 시세를 확인해 회수 가능성을 먼저 진단하는 것이 중요합니다.",
    },
    {
      id: "re3",
      question: "임대차 분쟁에서 명도는 어떻게 진행되나요?",
      answer:
        "계약 해지·종료 사유와 점유 관계를 확인한 뒤 명도청구를 검토합니다. 강제집행이 필요하면 일정과 비용, 주의사항을 사전에 안내드립니다.",
    },
    {
      id: "re4",
      question: "소유권이전·말소도 소송으로 해결할 수 있나요?",
      answer:
        "네. 원인무효·사해행위·명의신탁 등 쟁점에 따라 청구 구성을 달리합니다. 등기부와 계약·이체 자료를 바탕으로 가능한 청구를 정리합니다.",
    },
  ],
};

export default function PracticePage() {
  return (
    <div className={practiceSerif.variable}>
      <SitePageFrame showNav={false}>
        <PracticeHeroSection />
        <PracticeIntroSection />
        <PracticeValuesSection />
        <div className="pt-10 md:pt-16">
          <TeamSection variant="practice" />
        </div>
        <FaqSection
          categories={[...PRACTICE_CATEGORIES]}
          faqByCategory={PRACTICE_FAQ}
        />
        <ConsultFormSection />
      </SitePageFrame>
    </div>
  );
}
