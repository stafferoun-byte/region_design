import type { ReactNode } from "react";
import { InViewSectionTitle } from "@/components/section-title-reveal";
import "./practice-inherit.css";

type InheritItem = {
  no: string;
  title: string;
  body: string;
  tags: string;
  hoverImage?: string;
  imagePosition?: string;
};

type TitleLine = readonly (string | { text: string; color?: string; glue?: boolean })[];

const ITEMS = [
  {
    no: "01",
    title: "상속재산의 범위",
    body: "남아 있는 부동산과 예금뿐 아니라 생전 증여, 인출된 예금과 부동산 처분대금까지 확인합니다.",
    tags: "생전 증여 · 금융재산 조회 · 숨겨진 상속재산",
    hoverImage: "/images/practice/inherit-card-hover.jpg",
  },
  {
    no: "02",
    title: "특별수익",
    body: "형제 중 누군가가 집이나 사업자금을 먼저 받았다면, 상속분을 미리 받은 재산인지 따져봅니다.",
    tags: "증여 부동산 · 주택자금 · 사업자금 · 혼인자금",
    hoverImage: "/images/practice/inherit-card-hover-02.jpg",
  },
  {
    no: "03",
    title: "기여분",
    body: "간병기간과 생활비·병원비, 재산관리 내역을 살펴 통상적인 도움을 넘어선 기여인지 확인합니다.",
    tags: "부모 부양 · 장기간 간병 · 병원비 · 재산관리",
    hoverImage: "/images/practice/inherit-card-hover-03.jpg",
  },
  {
    no: "04",
    title: "유언과 유류분",
    body: "유언장이 법적으로 유효한지, 법이 보장하는 최소한의 상속분이 침해되지는 않았는지 살펴봅니다.",
    tags: "유언장 효력 · 유언무효 · 유류분 반환청구",
    hoverImage: "/images/practice/inherit-card-hover-04.jpg",
  },
];

const DEFAULT_INHERIT_TITLE: readonly TitleLine[] = [
  ["법정상속분만"],
  ["계산해서는"],
  [
    { text: "알", color: "#5DC39B" },
    { text: "수", color: "#5DC39B" },
    { text: "없는", color: "#5DC39B" },
    { text: "몫", color: "#5DC39B", glue: true },
    { text: ".", color: "#000" },
  ],
];

/** Inheritance practice block in the JoongAng About mood. */
export function PracticeInheritSection({
  ariaLabel = "법정상속분만 계산해서는 알 수 없는 몫.",
  titleLines = DEFAULT_INHERIT_TITLE,
  intro,
  items = ITEMS,
  close = (
    <>
      <span className="jg-inh-mline">이로운은 남아 있는 재산만</span>{" "}
      <span className="jg-inh-mline">나누지 않습니다.</span>
    </>
  ),
}: {
  ariaLabel?: string;
  titleLines?: readonly TitleLine[];
  intro?: ReactNode;
  items?: readonly InheritItem[];
  close?: ReactNode;
} = {}) {
  return (
    <section className="jg-inh" aria-label={ariaLabel}>
      <div className="jg-inh-intro">
        <InViewSectionTitle
          className="jg-inh-title"
          ariaLabel={ariaLabel}
          lines={titleLines}
        />
        <div className="jg-inh-copy">
          {intro ?? (
            <p>
              같은 자녀라도 실제로 받게 되는 재산은 달라질 수 있습니다. <br className="jg-inh-br" />
              특정 자녀가 생전에 재산을 먼저 받았는지, 부모님을 부양하거나 재산관리를 도맡은 사람이 있는지, <br className="jg-inh-br" />
              유언으로 누군가의 몫이 지나치게 줄어들지는 않았는지에 따라 상속분을 다시 계산해야 하기 때문입니다.
            </p>
          )}
        </div>
      </div>
      <div className="jg-inh-grid">
        {items.map((item) => (
          <article className="jg-inh-item" key={item.no}>
            {"hoverImage" in item && item.hoverImage ? (
              <span className="jg-inh-photo" aria-hidden>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.hoverImage}
                  alt=""
                  style={
                    "imagePosition" in item && item.imagePosition
                      ? { objectPosition: item.imagePosition }
                      : undefined
                  }
                />
              </span>
            ) : null}
            <p className="jg-inh-no">{item.no}</p>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            <p className="jg-inh-tags">{item.tags}</p>
          </article>
        ))}
      </div>
      {close ? <p className="jg-inh-close">{close}</p> : null}
    </section>
  );
}
