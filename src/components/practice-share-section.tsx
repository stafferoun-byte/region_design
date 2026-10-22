"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import "./practice-share.css";
import "../app/practice/section-rhythm.css";

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

type ShareMode = "desktop" | "tablet" | "mobile";

function shareMode(width: number): ShareMode {
  if (width <= 767) return "mobile";
  if (width <= 1280) return "tablet";
  return "desktop";
}

const DEFAULT_SHARE_IMAGE = "/images/practice/share-hero.jpg?v=2";

const DEFAULT_SHARE_COLUMNS = [
  [
    "부모님을 오래 돌본 시간을 인정받고 싶은 마음이, 무작정 더 많은 재산을 바라는 마음과 같지는 않습니다. 다른 형제에게 먼저 건너간 재산을 묻는 일도 가족을 의심한다는 뜻은 아닙니다. 그런데도 상속 앞에서는 정당한 질문조차 꺼내기 어려울 때가 있습니다. 관계를 지키기 위해 양보하자니 설명받지 못한 일들이 마음에 남고, 자신의 몫을 이야기하자니 가족과 멀어질까 망설이게 되죠.",
    "이로운 파트너스는 의뢰인의 삶의 여정에 어떤 말하지 못한 굴곡이 있었는지, 무엇 때문에 마음이 가장 힘들었으며, 이번 상속에서 무엇만은 지키고 싶은지 듣는 데서 시작합니다. 미처 따져 묻지 못한 재산의 행방도, 부모님의 뜻으로 받은 재산을 지켜야 하는 사정도 지나치지 않습니다.",
  ],
  [
    "생전에 재산이 이전된 이유와 그동안의 부양을 살펴, 의뢰인의 권리를 뒷받침할 근거를 갖춥니다. 가족 사이에서 직접 꺼내기 어려웠던 요구는 변호사가 전하고, 사실과 다른 주장에는 증거와 법리로 대응하겠습니다.",
    "받아야 할 몫을 찾는 일도, 지켜온 재산을 지키는 일도, 이제 혼자 감당하지 않으셔도 됩니다.",
  ],
] as const;

/**
 */
export function PracticeShareSection({
  ariaLabel = "남겨진 재산 너머의 마음까지 살피겠습니다.",
  titleLines = ["남겨진 재산 너머의", "마음까지 살피겠습니다."],
  columns = DEFAULT_SHARE_COLUMNS,
  imageSrc = DEFAULT_SHARE_IMAGE,
  ctaHref = "/about",
  ctaLabel = "법무법인 이로운 파트너스 소개",
  ctaSide = "end",
}: {
  ariaLabel?: string;
  titleLines?: readonly string[];
  columns?: readonly (readonly string[])[];
  imageSrc?: string;
  ctaHref?: string;
  ctaLabel?: string;
  ctaSide?: "start" | "end";
} = {}) {
  const trackRef = useRef<HTMLElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const txtRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    const txt = txtRef.current;
    const img = imgRef.current;
    const copy = copyRef.current;
    if (!track || !thumb || !txt || !img || !copy) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let previousDuration: number | undefined;
    const tuneLenis = () => {
      const lenis = (
        window as unknown as { __lenis?: { options: { duration: number } } }
      ).__lenis;
      if (!lenis || previousDuration !== undefined) return;
      previousDuration = lenis.options.duration;
      lenis.options.duration = 0.2;
    };
    tuneLenis();

    const apply = () => {
      const width = window.innerWidth;
      const mode = shareMode(width);
      const vw = width / 100;
      const lenis = (window as unknown as { __lenis?: { scroll?: number } }).__lenis;
      const scrolled = reduced ? 9999 : (lenis?.scroll ?? window.scrollY);

      img.src = imageSrc;

      if (reduced) {
        copy.classList.add("is-active");
      } else {
        const rect = copy.getBoundingClientRect();
        const vh = window.innerHeight;
        if (rect.top < vh * 0.85) copy.classList.add("is-active");
        else if (rect.top > vh) copy.classList.remove("is-active");
      }

      if (mode === "mobile") {
        thumb.style.transform = "";
        thumb.style.transformOrigin = "";
        txt.style.transform = "";
        copy.classList.add("is-active");
        return;
      }

      const thumbT = clamp01(scrolled / 1100);
      const textT = clamp01(scrolled / 1400);
      const scale = lerp(0.4109, 1, thumbT);

      if (mode === "tablet") {
        thumb.style.transform = `scale(${scale}) translateY(${lerp(0, -24.44 * vw, thumbT)}px)`;
        txt.style.transform = `translateY(${lerp(19.23 * vw, 15 * vw, textT)}px)`;
      } else {
        thumb.style.transform = `scale(${scale}) translateY(${lerp(0, -352, thumbT)}px)`;
        txt.style.transform = `translateY(${lerp(277, 216, textT)}px)`;
      }

      thumb.style.transformOrigin = `center ${lerp(50, 0, thumbT)}%`;
    };

    apply();

    let attached: { on: Function; off: Function } | null =
      (window as unknown as { __lenis?: { on: Function; off: Function } }).__lenis ??
      null;
    if (attached?.on) attached.on("scroll", apply);

    const retry = window.setInterval(() => {
      tuneLenis();
      if (attached) {
        window.clearInterval(retry);
        return;
      }
      const late = (window as unknown as { __lenis?: { on: Function; off: Function } })
        .__lenis;
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
      const lenis = (
        window as unknown as { __lenis?: { options: { duration: number } } }
      ).__lenis;
      if (lenis && previousDuration !== undefined) {
        lenis.options.duration = previousDuration;
      }
      attached?.off?.("scroll", apply);
      window.removeEventListener("scroll", apply);
      window.removeEventListener("resize", apply);
    };
  }, [imageSrc]);

  return (
    <>
    <section ref={trackRef} className="jg-share-track" aria-label={ariaLabel}>
      <div className="jg-share-sticky">
        <div className="jg-share-key">
          <div className="jg-share-area">
            <div ref={thumbRef} className="jg-share-thumb">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef}
                src={imageSrc}
                alt=""
              />
            </div>
            <div ref={txtRef} className="jg-share-txt">
              <h2>
                {titleLines.map((line, index) => (
                  <span key={line}>
                    {index > 0 ? <br /> : null}
                    {line}
                  </span>
                ))}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div ref={copyRef} className="jg-share-copy">
      {columns.map((paragraphs, index) => (
        <div className="jg-share-col" key={paragraphs[0]?.slice(0, 12) ?? index}>
          {paragraphs.map((text) => (
            <p className="jg-share-paragraph" key={text.slice(0, 24)}>
              {text}
            </p>
          ))}
          {ctaSide === "end" && index === columns.length - 1 ? (
            <Link className="jg-share-pdf" href={ctaHref}>
              {ctaLabel}
            </Link>
          ) : null}
        </div>
      ))}
      {ctaSide === "start" ? (
        <Link className="jg-share-pdf is-start" href={ctaHref}>
          {ctaLabel}
        </Link>
      ) : null}
    </div>
    </>
  );
}
