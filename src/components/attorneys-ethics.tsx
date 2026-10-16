"use client";

import { useEffect, useRef, useState } from "react";
import "./attorneys-ethics.css";

type AttorneysEthicsProps = {
  imageSrc: string;
  imageAlt: string;
  aspectRatio: string;
  paragraphs: readonly string[];
};

/** Layout of https://www.joonganggroup.com/ethics/ plus the homepage value block. */
export function AttorneysEthics({
  imageSrc,
  imageAlt,
  aspectRatio,
  paragraphs,
}: AttorneysEthicsProps) {
  const [on, setOn] = useState(false);
  const [valueIn, setValueIn] = useState(false);
  const [cardsOn, setCardsOn] = useState(0);
  const valueRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => setOn(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const el = valueRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setValueIn(true);
        observer.disconnect();
      },
      { threshold: 0.28 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!valueIn) return;
    const first = window.setTimeout(() => setCardsOn(1), 40);
    const second = window.setTimeout(() => setCardsOn(2), 560);
    return () => {
      window.clearTimeout(first);
      window.clearTimeout(second);
    };
  }, [valueIn]);

  return (
    <>
    <section className={on ? "jg-ethics on" : "jg-ethics"}>
      <div className="jg-ethics-wrap">
        <div className="jg-ethics-box">
          <div className="jg-ethics-bg" style={{ aspectRatio }}>
            <img src={imageSrc} alt={imageAlt} />
            <div className="jg-ethics-line" />
          </div>
          <div className="jg-ethics-txt">
            <dl>
              <dt>
                중앙그룹이
                <br className="wHide" /> 지키고
                <br />
                실천하겠습니다
              </dt>
              {paragraphs.map((paragraph) => (
                <dd key={paragraph}>{paragraph}</dd>
              ))}
            </dl>
            <a
              href="https://jebo.joonganggroup.com/"
              className="jg-ethics-report"
              target="_blank"
              rel="noreferrer"
              title="새 창으로 이동"
            >
              <span>제보하기</span>
            </a>
          </div>
        </div>
      </div>
    </section>
    <section
      ref={valueRef}
      className={valueIn ? "jg-value is-in" : "jg-value"}
    >
      <div className="jg-value-wrap">
        <strong className="jg-value-title">
          <span className="jg-value-reveal">
            <span>세상의 중심은</span>
          </span>
          <span className="jg-value-reveal">
            <span>사람입니다</span>
          </span>
        </strong>
        <div className="jg-value-list">
          <ul>
            <li className={cardsOn >= 1 ? "jg-value-card is-on" : "jg-value-card"}>
              <span className="jg-value-line" />
              <div className="jg-value-copy">
                <span className="jg-value-reveal">
                  <span>중앙그룹은 우리 사회 곳곳에</span>
                </span>
                <span className="jg-value-reveal">
                  <span>밝은 희망을 전달합니다.</span>
                </span>
              </div>
              <strong className="jg-value-name">
                <span className="jg-value-reveal">
                  <span lang="en">Share</span>
                </span>
              </strong>
              <a
                href="https://www.joonganggroup.com/share/"
                className="jg-value-thumb"
                target="_blank"
                rel="noreferrer"
              >
                <span>
                  <picture>
                    <source
                      media="(max-width: 1023px)"
                      srcSet="/images/joongang/main/m_img_main_share.png"
                    />
                    <img src="/images/joongang/main/img_main_share.png" alt="" />
                  </picture>
                </span>
              </a>
            </li>
            <li className={cardsOn >= 2 ? "jg-value-card is-on" : "jg-value-card"}>
              <span className="jg-value-line" />
              <div className="jg-value-copy">
                <span className="jg-value-reveal mHide">
                  <span>중앙그룹과 함께하는 길은 언제나</span>
                </span>
                <span className="jg-value-reveal wHide">
                  <span>중앙그룹과 함께하는 길은</span>
                </span>
                <span className="jg-value-reveal mHide">
                  <span>열려있습니다.</span>
                </span>
                <span className="jg-value-reveal wHide">
                  <span>언제나 열려있습니다.</span>
                </span>
              </div>
              <strong className="jg-value-name">
                <span className="jg-value-reveal">
                  <span lang="en">Recruit</span>
                </span>
              </strong>
              <a
                href="https://www.joonganggroup.com/recruit/"
                className="jg-value-thumb"
                target="_blank"
                rel="noreferrer"
              >
                <span>
                  <picture>
                    <source
                      media="(max-width: 1023px)"
                      srcSet="/images/joongang/main/m_img_main_recruit.png"
                    />
                    <img
                      src="/images/joongang/main/img_main_recruit.png"
                      alt=""
                    />
                  </picture>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
    </>
  );
}
