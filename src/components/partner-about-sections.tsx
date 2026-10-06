import "./partner-joongang.css";
import Link from "next/link";

const GROUPS = [
  {
    tit: "Inheritance",
    txt: "유류분·상속재산분할·한정승인과 상속포기까지, 상속 분쟁의 처음부터 판결·조정까지 맡습니다.",
    name: "상속 전문센터",
  },
  {
    tit: "Criminal",
    txt: "경찰 조사 초기부터 재판까지 밀착 대응해, 의뢰인의 권리와 일상을 지킵니다.",
    name: "형사 전문센터",
  },
  {
    tit: "Family",
    txt: "이혼·재산분할·양육권·위자료. 감정보다 절차와 합의에 집중해 일상을 다시 세웁니다.",
    name: "이혼·가사 전문센터",
  },
  {
    tit: "Civil",
    txt: "대여금·공사대금·손해배상. 증거 정리와 변론을 한 흐름으로 이어 회수까지 책임집니다.",
    name: "민사·손해배상 전문센터",
  },
  {
    tit: "Real Estate",
    txt: "전세보증금·임대차·가압류와 강제집행. 부동산 분쟁을 미루지 않고 바로 정리합니다.",
    name: "부동산·임대차 전문센터",
  },
  {
    tit: "Traffic",
    txt: "교통사고의 형사처벌과 합의금 대응을 함께 진행해, 사고 이후를 빠르게 수습합니다.",
    name: "교통사고 전문센터",
  },
] as const;

export function PartnerAboutSections() {
  return (
    <div className="jg-about">
      <section className="jg-mission">
        <h2 className="jg-subTit">
          이로운 파트너스는
          <br /> 사건번호가 아닌 삶을 보는
          <br /> 법률사무소입니다
        </h2>
        <div className="jg-missionArea">
          <p className="jg-subTxt">
            사건번호가 아닌, 한 사람의 삶을
            <br /> 중심에 두겠다는 마음으로,
            <br /> 이로운 파트너스가 함께합니다.
            <br /> 형사·이혼·상속·민사까지,
            <br /> 복잡한 법률 문제 앞에서
            <br /> 가장 이로운 길을 찾아드립니다.
          </p>
          <div className="jg-missionImg">
            <img
              src="/images/testimonials/lawyers-hero.png"
              alt="이로운 파트너스 변호사들"
              width={1707}
              height={1280}
            />
          </div>
          <p className="jg-missionCap">
            한 사람의 삶을 중심에 두고,
            <br /> 가장 이로운 길을 찾습니다
          </p>
        </div>
      </section>

      <section className="jg-affiliate">
        <h2 className="jg-subTit">
          이로운 파트너스는
          <br /> 여섯 전문센터와 함께
          <br /> 사건을 맡습니다
        </h2>
        <div className="jg-affList jg-affList--top">
          <ol>
            <li>
              <p>형사·이혼·상속·민사·부동산·교통을 한자리에서 맡는 법률 파트너</p>
              <strong>이로운 파트너스</strong>
            </li>
          </ol>
        </div>
        {GROUPS.map((group) => (
          <div className="jg-affList" key={group.tit}>
            <strong className="jg-affTit">{group.tit}</strong>
            <ol>
              <li>
                <p>{group.txt}</p>
                <Link href="/practice">{group.name}</Link>
              </li>
            </ol>
          </div>
        ))}
      </section>
    </div>
  );
}
