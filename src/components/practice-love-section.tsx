"use client";

import { useEffect, useRef } from "react";
import { InViewSectionTitle } from "@/components/section-title-reveal";
import "./practice-love.css";

const IMG = "/images/joongang/share/love";

/** JoongAng Share / Love. @see https://www.joonganggroup.com/share/#love */
export function PracticeLoveSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = [...root.querySelectorAll<HTMLElement>(".jg-love-item")];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const apply = () => {
      if (reduced) {
        items.forEach((item) => item.classList.add("is-active"));
        return;
      }
      const vh = window.innerHeight;
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const thumb = item.querySelector<HTMLElement>(".jg-love-thumb");
        const thumbRect = thumb?.getBoundingClientRect();
        const thumbMid = thumbRect ? thumbRect.top + thumbRect.height / 2 : rect.top;
        if (rect.bottom <= 0) {
          item.classList.remove("is-active");
          item.classList.add("is-stop");
          return;
        }
        if (vh / 2 >= thumbMid - 100) {
          item.classList.add("is-active");
          item.classList.remove("is-stop");
          return;
        }
        if (rect.top > vh) {
          item.classList.remove("is-active");
        }
      });
    };

    apply();
    let attached: { on: Function; off: Function } | null =
      (window as unknown as { __lenis?: { on: Function; off: Function } }).__lenis ?? null;
    attached?.on?.("scroll", apply);
    const retry = window.setInterval(() => {
      if (attached) {
        window.clearInterval(retry);
        return;
      }
      const late = (window as unknown as { __lenis?: { on: Function; off: Function } }).__lenis;
      if (late?.on) {
        attached = late;
        late.on("scroll", apply);
        apply();
        window.clearInterval(retry);
      }
    }, 50);
    const stopRetry = window.setTimeout(() => window.clearInterval(retry), 2000);
    window.addEventListener("scroll", apply, { passive: true });
    window.addEventListener("resize", apply);
    return () => {
      window.clearInterval(retry);
      window.clearTimeout(stopRetry);
      attached?.off?.("scroll", apply);
      window.removeEventListener("scroll", apply);
      window.removeEventListener("resize", apply);
    };
  }, []);

  return (
    <section ref={rootRef} className="jg-love" aria-label="대표 상속 성공사례">
      <InViewSectionTitle
        className="jg-love-name"
        as="span"
        ariaLabel="대표 상속 성공사례"
        lines={[["대표", "상속", "성공사례"]]}
      />
      <ul className="jg-love-list">
        <li className="jg-love-item jg-love-group">
          <div className="jg-love-middle">
            <div className="jg-love-thumb">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${IMG}/img_share_hope0302_2024.jpg`} alt="" />
              <span className="jg-love-zoom">이미지 보기</span>
              <div className="jg-love-sides">
                <div className="jg-love-side">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${IMG}/img_share_hope0301_2024.jpg`} alt="" />
                </div>
                <div className="jg-love-side">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${IMG}/img_share_hope0303_2024.jpg`} alt="" />
                </div>
              </div>
            </div>
            <div className="jg-love-copy">
              <span className="jg-love-link">중앙그룹 사회 공헌</span>
              <p className="jg-love-lead">세상과 당신 사이, 중앙그룹이 있습니다.</p>
              <p className="jg-love-body">
                1994년 국내 언론사 최초로 자원봉사 캠페인을 시작한 중앙그룹은
                <br className="jg-love-mHide" />
                자원봉사 대축제, 수해 복구 지원, 국제 긴급 구호 등 다양한
                <br className="jg-love-mHide" />
                공익 캠페인과 함께했습니다. 2020년부터는 취약 계층 및 지역 사회
                <br className="jg-love-mHide" />
                지원을 위한 &apos;온(溫) 캠페인&apos;과 환경 보호를 위한 &apos;그린 메신저 캠페인&apos;
                <br className="jg-love-mHide" />
                등을 펼치며 콘텐트 그룹에 걸맞는 &apos;공감&apos;과 &apos;참여&apos;를 키워드로
                <br className="jg-love-mHide" />
                진정성 있는 사회공헌 활동을 지속하고 있습니다.
              </p>
            </div>
          </div>
        </li>

        <li className="jg-love-item jg-love-weaza">
          <div className="jg-love-middle">
            <div className="jg-love-thumb">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${IMG}/img_share_love0101_2024.jpg`} alt="" />
              <span className="jg-love-zoom">이미지 보기</span>
              <div className="jg-love-sides">
                <div className="jg-love-side">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${IMG}/img_share_love0102_2024.jpg`} alt="" />
                </div>
                <div className="jg-love-side">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="jg-love-mShow" src={`${IMG}/img_share_love0103_2024.jpg`} alt="" />
                </div>
              </div>
            </div>
            <div className="jg-love-copy">
              <a
                className="jg-love-link"
                href="http://weaja.joins.com"
                target="_blank"
                rel="noopener noreferrer"
                title="새 창으로 이동"
              >
                위아자 나눔위크
              </a>
              <p className="jg-love-lead is-loose">
                친환경과 나눔의 가치를 실현하는
                <br />
                대한민국 대표 나눔 행사
              </p>
              <p className="jg-love-body">
                위아자 나눔위크는 중앙일보와 JTBC가 주최하고 GS칼텍스가 후원하는
                <br className="jg-love-mHide" />
                사람과 지구를 &apos;위하고 아끼는 자원 나눔&apos; 캠페인입니다.
                <br className="jg-love-mHide" />
                2005년 중앙일보 창간 40주년을 맞아 처음 개최한 위아자는
                <br className="jg-love-mHide" />
                온 ·오프라인을 넘나들며 친환경과 나눔을 테마로 한 행사를
                <br className="jg-love-mHide" />
                다채롭게 펼칩니다. 명사들의 애장품 기증과 판매를 통해 자원을
                <br className="jg-love-mHide" />
                순환하고, 친환경 체험을 통해 긍정적인 환경 변화를 함께 만들며,
                <br className="jg-love-mHide" />
                판매 수익금 기부를 통해 나눔의 가치를 확산합니다.
              </p>
            </div>
          </div>
        </li>
      </ul>
    </section>
  );
}
