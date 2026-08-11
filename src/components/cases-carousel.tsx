"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import type { PointerEvent } from "react";
import "./cases-carousel.css";

type GradCase = {
  type: "grad" | "grad-deep";
  tag: string;
  l1: string;
  l2: string;
  desc: string;
};

type CertCase = {
  type: "cert";
  img: string;
  band: string;
  seal: string;
  cap: string;
};

type CaseItem = GradCase | CertCase;

const CASES: CaseItem[] = [
  {
    type: "grad",
    tag: "상속재산파산",
    l1: "상속재산파산",
    l2: "채무 정리<br>성공.",
    desc: "복잡하게 얽힌 채무까지<br>깔끔하게 정리했습니다",
  },
  {
    type: "cert",
    img: "/images/carousel/slide-01.jpg",
    band: "책임제한",
    seal: "<b>인</b><i>용</i>",
    cap: "한정승인",
  },
  {
    type: "grad",
    tag: "특별대리인",
    l1: "미성년 상속인",
    l2: "특별대리인<br>선임.",
    desc: "미성년 상속인의 권익까지<br>안전하게 보호했습니다",
  },
  {
    type: "cert",
    img: "/images/carousel/slide-02.jpg",
    band: "빚 차단",
    seal: "<b>인</b><i>용</i>",
    cap: "상속포기",
  },
  {
    type: "grad-deep",
    tag: "채권자 대응",
    l1: "개인<br>채권자청구",
    l2: "방어 성공.",
    desc: "갑작스러운 청구에도 끝까지<br>대응해 권리를 지켰습니다",
  },
  {
    type: "cert",
    img: "/images/carousel/slide-03.jpg",
    band: "예외 인정",
    seal: "<b>인</b><i>용</i>",
    cap: "특별한정승인",
  },
  {
    type: "grad-deep",
    tag: "다수 상속인",
    l1: "상속인 5인",
    l2: "동시 해결.",
    desc: "여러 상속인의 절차를 한 번에<br>안전하게 해결했습니다",
  },
  {
    type: "cert",
    img: "/images/carousel/slide-04.jpg",
    band: "무방문 인용",
    seal: "<b>인</b><i>용</i>",
    cap: "한정승인",
  },
  {
    type: "grad",
    tag: "채권양도",
    l1: "채권 양도 후",
    l2: "추심 차단.",
    desc: "여러 차례 양도된 채권에도<br>안전하게 대응했습니다",
  },
  {
    type: "cert",
    img: "/images/carousel/slide-05.jpg",
    band: "고액 채무 방어",
    seal: "<b>인</b><i>용</i>",
    cap: "상속포기",
  },
  {
    type: "grad-deep",
    tag: "지급명령",
    l1: "지급명령",
    l2: "신속 대응.",
    desc: "갑작스러운 지급명령에도<br>신속하게 대응했습니다",
  },
  {
    type: "cert",
    img: "/images/carousel/slide-06.jpg",
    band: "예외 인정",
    seal: "<b>인</b><i>용</i>",
    cap: "특별한정승인",
  },
];

function onTiltMove(e: PointerEvent<HTMLElement>, reduce: boolean | null) {
  if (reduce) return;
  const card = e.currentTarget;
  const r = card.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width - 0.5;
  const py = (e.clientY - r.top) / r.height - 0.5;
  card.style.transition = "transform .08s linear";
  card.style.transform = `perspective(700px) translateZ(30px) rotateX(${(-py * 15).toFixed(2)}deg) rotateY(${(px * 18).toFixed(2)}deg) scale(1.06)`;
  card.style.zIndex = "20";
}

function onTiltLeave(e: PointerEvent<HTMLElement>, reduce: boolean | null) {
  if (reduce) return;
  const card = e.currentTarget;
  card.style.transition = "transform .45s cubic-bezier(.2,.7,.2,1)";
  card.style.transform = "";
  card.style.zIndex = "";
}

function CaseCard({
  item,
  reduce,
}: {
  item: CaseItem;
  reduce: boolean | null;
}) {
  if (item.type === "cert") {
    return (
      <article
        className="jcard"
        onPointerMove={(e) => onTiltMove(e, reduce)}
        onPointerLeave={(e) => onTiltLeave(e, reduce)}
      >
        <div className="jcard-ribbon">
          <span>{item.band}</span>
        </div>
        <div className="jcard-frame">
          <Image
            className="jcard-doc"
            src={item.img}
            alt={`${item.cap} 승소 판결문`}
            fill
            sizes="212px"
            unoptimized
          />
        </div>
        <div className="jcard-cap">
          <span
            className="jcard-seal"
            aria-hidden
            dangerouslySetInnerHTML={{ __html: item.seal }}
          />
          <span className="cap-case">{item.cap}</span>
          <span className="cap-sub">EROUN LAW FIRM</span>
        </div>
      </article>
    );
  }

  return (
    <article
      className={`card-grad${item.type === "grad-deep" ? " deep" : ""}`}
      onPointerMove={(e) => onTiltMove(e, reduce)}
      onPointerLeave={(e) => onTiltLeave(e, reduce)}
    >
      <span className="g-tag">{item.tag}</span>
      <h3
        className="g-h"
        dangerouslySetInnerHTML={{
          __html: `${item.l1}<br><span class="em">${item.l2}</span>`,
        }}
      />
      <p className="g-b" dangerouslySetInnerHTML={{ __html: item.desc }} />
    </article>
  );
}

function Track({
  items,
  direction,
  reduce,
}: {
  items: CaseItem[];
  direction: "left" | "right";
  reduce: boolean | null;
}) {
  const loop = [...items, ...items, ...items];
  return (
    <div
      className={`track ${direction === "left" ? "track-left" : "track-right"}`}
    >
      {loop.map((item, i) => (
        <CaseCard key={`${item.type}-${i}`} item={item} reduce={reduce} />
      ))}
    </div>
  );
}

export function CasesCarousel() {
  const reduce = useReducedMotion();
  const row1 = CASES.slice(0, 6);
  const row2 = CASES.slice(6, 12);

  return (
    <div
      className="cases-carousel"
      aria-label="이로운 법률사무소 승소사례 캐러셀"
    >
      <div className="stage">
        <div className="rows">
          <Track items={row1} direction="left" reduce={reduce} />
          <Track items={row2} direction="right" reduce={reduce} />
        </div>
      </div>
    </div>
  );
}
