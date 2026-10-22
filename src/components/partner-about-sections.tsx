import { QuestionRows } from "@/components/practice-affiliate-section";
import { InViewSectionTitle } from "@/components/section-title-reveal";
import "./partner-intro.css";
import { IBM_Plex_Sans_KR } from "next/font/google";
import Link from "next/link";

const ibmSans = IBM_Plex_Sans_KR({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
  variable: "--font-ibm-sans",
});

const GROUPS = [
  {
    ko: "상속",
    tit: "Inheritance",
    txt: "상속을 준비하는 일부터 재산과 채무의 정리, 가족 간 분쟁까지 상속 과정에 필요한 자문과 소송을 진행합니다.",
    tags: "상속재산분할 · 유류분 · 유언 · 한정승인 · 상속포기",
    href: "/practice/inheritance",
  },
  {
    ko: "형사",
    tit: "Criminal",
    txt: "개인과 기업의 형사사건에서 의뢰인의 입장에 따라 고소·고발 대리와 수사 대응, 형사재판 변호를 맡습니다.",
    tags: "수사 대응 · 형사재판 · 고소대리 · 고발 · 구속 대응",
    href: "/practice/criminal",
  },
  {
    ko: "이혼·가사",
    tit: "Family",
    txt: "이혼과 재산분할, 양육 문제를 다루며 의뢰인 분의 의사와 이혼 너머의 새로운 삶까지 고려해 협의·조정·소송을 진행합니다.",
    tags: "이혼 · 재산분할 · 위자료 · 친권·양육권 · 양육비 · 면접교섭",
    href: "/practice/divorce",
  },
  {
    ko: "민사·손해배상",
    tit: "Civil",
    txt: "계약과 금전거래, 손해배상 등 민사분쟁을 다루며, 의뢰인이 부담할 시간과 비용, 해결의 실익을 고려해 협상·소송·강제집행을 진행합니다.",
    tags: "대여금 · 공사대금 · 계약 분쟁 · 손해배상 · 채권추심",
    href: "/practice/civil",
  },
  {
    ko: "부동산·임대차",
    tit: "Real Estate",
    txt: "주거와 사업의 기반이 되는 부동산의 매매·임대차를 자문하고, 의뢰인의 자산과 이용 목적을 고려해 소유권·보증금·명도 등 관련 분쟁에 대응합니다.",
    tags: "매매계약 · 임대차 · 보증금 반환 · 명도 · 소유권 분쟁 · 가압류·가처분",
    href: "/practice/real-estate",
  },
  {
    ko: "교통",
    tit: "Traffic",
    txt: "교통사고의 형사처벌과 합의금 대응을 함께 진행해, 사고 이후를 빠르게 수습합니다.",
    tags: "형사처벌 · 합의금 · 과실비율 · 보험분쟁 · 면허처분",
    href: "/practice/traffic",
  },
] as const;

export function PartnerCentersSection({
  titleLines = [
    ["이로운", "파트너스의"],
    [
      { text: "전문센터", color: "#5DC39B", glue: true },
      "를",
      "소개합니다",
    ],
  ],
  items,
}: {
  titleLines?: readonly (readonly (string | { text: string; color?: string; glue?: boolean })[])[];
  items?: readonly { no: string; q: string; a: string }[];
} = {}) {
  return (
    <section className={`jg-about jg-affiliate ${ibmSans.variable}`}>
      <InViewSectionTitle
        className="jg-subTit"
        ariaLabel={titleLines
          .map((line) => line.map((word) => (typeof word === "string" ? word : word.text)).join(" "))
          .join(" ")}
        lines={titleLines}
      />
      {items ? (
        <QuestionRows items={items} />
      ) : (
        <>
          <div className="jg-affList jg-affList--top">
            <ol>
              <li>
                <p>따뜻하고 이로운 법률 파트너</p>
                <strong>이로운 파트너스</strong>
              </li>
            </ol>
          </div>
          {GROUPS.map((group) => (
            <div className="jg-affList" key={group.tit}>
              <strong className="jg-affTit">
                <span className="jg-affKo">{group.ko}</span>
                <span lang="en">{group.tit}</span>
              </strong>
              <ol>
                <li>
                  <p>{group.txt}</p>
                  {group.tags ? (
                    <Link href={group.href} className="jg-affTags">
                      {group.tags}
                    </Link>
                  ) : null}
                </li>
              </ol>
            </div>
          ))}
        </>
      )}
    </section>
  );
}

export function PartnerAboutSections() {
  return (
    <div className="jg-about">
      <section className="jg-mission">
        <InViewSectionTitle
          className="jg-subTit jg-mHide"
          ariaLabel="이로운 파트너스가 믿는 것."
          lines={[
            [
              { text: "이로운", color: "#5DC39B" },
              { text: "파트너스", color: "#5DC39B", glue: true },
              "가",
              "믿는",
              "것.",
            ],
          ]}
        />
        <InViewSectionTitle
          className="jg-subTit jg-wHide"
          ariaLabel="이로운 파트너스가 믿는 것."
          lines={[
            [
              { text: "이로운", color: "#5DC39B" },
              { text: "파트너스", color: "#5DC39B", glue: true },
              "가",
            ],
            ["믿는", "것."],
          ]}
        />
        <div className="jg-missionArea">
          <p className="jg-subTxt">
            변호사는 단순한 법 기술자가 아닌,
            <br /> 더 나은 사회를 만들어가는 법률 전문가입니다.
            <br />
            <br /> 법률은 또다른 장벽이 아닌,
            <br /> 사람들 사이의 갈등을 풀어내는 도구여야 합니다.
            <br />
            <br /> 의뢰인의 삶에 이로운 변화를 만드는 것,
            <br /> 그것이 우리의 사명입니다.
          </p>
          <div className="jg-missionImg">
            <img
              src="/images/testimonials/lawyers-hero.png"
              alt="이로운 파트너스 변호사들"
              width={1707}
              height={1280}
            />
          </div>
          <div className="jg-missionCap">
            <InViewSectionTitle
              as="p"
              className="jg-missionCapTit jg-mHide"
              ariaLabel="이로운 파트너스가 바라는 것."
              lines={[["이로운", "파트너스가", "바라는", "것."]]}
            />
            <InViewSectionTitle
              as="p"
              className="jg-missionCapTit jg-wHide"
              ariaLabel="이로운 파트너스가 바라는 것."
              lines={[
                ["이로운", "파트너스가"],
                ["바라는", "것."],
              ]}
            />
            <p>
              <InViewSectionTitle
                as="span"
                className="jg-missionCapLead"
                ariaLabel="무너지지 않기를"
                lines={[["무너지지 않기를"]]}
              />
              <br />
              법적인 문제가 발생하더라도,
              <br />그 일이 당신의 전부가 되지 않기를 바랍니다.
            </p>
            <p>
              <InViewSectionTitle
                as="span"
                className="jg-missionCapLead"
                ariaLabel="단단해지기를"
                lines={[["단단해지기를"]]}
              />
              <br />
              당신의 마음이 한결 가벼워지고,
              <br />
              일상이 다시 단단해지기를 바랍니다.
            </p>
            <p>
              <InViewSectionTitle
                as="span"
                className="jg-missionCapLead"
                ariaLabel="힘이 되기를"
                lines={[["힘이 되기를"]]}
              />
              <br />
              우리의 진심 담은 노력이,
              <br />
              당신에게 이로운 힘이 되기를 바랍니다.
            </p>
          </div>
        </div>
      </section>

      <PartnerCentersSection />
    </div>
  );
}
