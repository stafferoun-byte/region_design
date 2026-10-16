"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "./attorneys-ethics.css";

type AttorneysEthicsProps = {
  imageSrc: string;
  imageAlt: string;
  aspectRatio: string;
  paragraphs: readonly string[];
  headline?: readonly [string, string];
};

/** Layout of https://www.joonganggroup.com/ethics/ plus the homepage value block. */
export function AttorneysEthics({
  imageSrc,
  imageAlt,
  aspectRatio,
  paragraphs,
  headline = ["중앙그룹이 지키고", "실천하겠습니다"],
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
                <span className="jg-ethics-keep">{headline[0]}</span>
                <br />
                {headline[1]}
              </dt>
              {paragraphs.map((paragraph) => (
                <dd key={paragraph}>{paragraph}</dd>
              ))}
            </dl>
            <Link href="/about" className="jg-ethics-report">
              <span>이로운 파트너스</span>
            </Link>
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
            <span>법의 중심은</span>
          </span>
          <span className="jg-value-reveal">
            <span>사람입니다</span>
          </span>
        </strong>
        <div className="jg-value-list">
          <ul>
            <li className={cardsOn >= 1 ? "jg-value-card is-on" : "jg-value-card"}>
              <Link href="/lawyers" className="jg-value-card-link">
                <span className="jg-value-line" />
                <div className="jg-value-copy">
                  <span className="jg-value-reveal">
                    <span>한 사람의 삶을 먼저 생각하는</span>
                  </span>
                  <span className="jg-value-reveal">
                    <span>이로운 변호사들입니다.</span>
                  </span>
                </div>
                <strong className="jg-value-name">
                  <span className="jg-value-reveal">
                    <span lang="en">Lawyers</span>
                  </span>
                </strong>
                <span className="jg-value-thumb">
                  <span>
                    <img
                      src="/images/partners/eroun-team.jpg"
                      alt="이로운 변호사들"
                      style={{ objectPosition: "center 22%" }}
                    />
                  </span>
                </span>
              </Link>
            </li>
            <li className={cardsOn >= 2 ? "jg-value-card is-on" : "jg-value-card"}>
              <Link href="/practice" className="jg-value-card-link">
                <span className="jg-value-line" />
                <div className="jg-value-copy">
                  <span className="jg-value-reveal">
                    <span>당신의 일상을 지키는</span>
                  </span>
                  <span className="jg-value-reveal">
                    <span>이로운 법률 서비스를 만나보세요.</span>
                  </span>
                </div>
                <strong className="jg-value-name">
                  <span className="jg-value-reveal">
                    <span lang="en">Practice</span>
                  </span>
                </strong>
                <span className="jg-value-thumb">
                  <span>
                    <img
                      src="/images/practice/hero-bg.jpg"
                      alt="법률 상담"
                      style={{ objectPosition: "center 45%" }}
                    />
                  </span>
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
    </>
  );
}
