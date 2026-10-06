"use client";

/**
 * JoongAng-style keyVisual:
 * 1) Intro — small photo
 * 2) Scroll — snap expand; white top + seam locked
 * 3) Photo stays fixed in the band below the seam (no scrub / no pan)
 * 4) Further scroll — sticky ends; whole composition leaves together
 */

import "./partner-joongang.css";
import Link from "next/link";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

const HOLD_VH = 0.55;
const WHITE_BELOW_PX = 160;

/** partner_kv.jpg is 1024×769 — box uses this so the photo is not cropped */
const PHOTO_RATIO = 769 / 1024;

/** default-ko.js mainUI: afterBox +245 / thumb +460 */
function jgOffsets(w: number) {
  if (w <= 767) {
    return { after: w * 0.2433, thumb: w * 0.4133, thumbX: -(w * 0.2666) };
  }
  if (w <= 1280) {
    return { after: w * 0.1736, thumb: w * 0.3194, thumbX: 0 };
  }
  return { after: 245, thumb: 460, thumbX: 0 };
}

export function PartnerIntroScroll() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const sectionWrapRef = useRef<HTMLDivElement | null>(null);
  const keyVisualRef = useRef<HTMLDivElement | null>(null);
  const slideInnerRef = useRef<HTMLDivElement | null>(null);
  const afterBoxRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLSpanElement | null>(null);

  const scrollAfterRef = useRef(false);
  const startTimerRef = useRef<number | null>(null);
  const snappingRef = useRef(false);
  const expandLockUntilRef = useRef(0);

  const [intro, setIntro] = useState(false);
  const [scrollAfter, setScrollAfter] = useState(false);
  const [started, setStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [trackHeight, setTrackHeight] = useState<CSSProperties["height"]>(
    "180svh",
  );

  useEffect(() => {
    scrollAfterRef.current = scrollAfter;
  }, [scrollAfter]);

  useEffect(() => {
    const ensure = (id: string, href: string) => {
      if (document.getElementById(id)) return;
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    };
    ensure(
      "jg-inter",
      "https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,500..600&display=swap",
    );
    ensure(
      "jg-pretendard-var",
      "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css",
    );
    const t = window.setTimeout(() => setIntro(true), 300);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const measure = () => {
      if (scrollAfterRef.current) {
        placeExpanded(false);
        return;
      }
      const viewH = window.innerHeight;
      const hold = Math.round(viewH * HOLD_VH);
      const next = `${viewH + hold + WHITE_BELOW_PX}px`;
      setTrackHeight((prev) => (prev === next ? prev : next));
      placeIntro();
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
    // placeIntro is stable enough: it only reads refs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Intro: pin the small photo block to the bottom of the viewport (mainUI paddingTop). */
  const placeIntro = () => {
    const kv = keyVisualRef.current;
    const inner = slideInnerRef.current;
    const thumb = thumbRef.current;
    if (!kv || !inner) return;
    const slide = kv.querySelector(".jg-visualSlideBox") as HTMLElement | null;
    const before = kv.querySelector(".jg-beforeBox") as HTMLElement | null;
    const keyText = kv.querySelector(".jg-keyText") as HTMLElement | null;
    if (!slide || !before || !keyText) return;

    const w = window.innerWidth;
    const viewH = window.innerHeight;
    const short = viewH <= 900 && w > 767;
    const scaleX = w <= 767 ? 0.624 : 0.188;
    const scaleY = w <= 767 ? 0.624 : 0.18;
    const thumbOffset = w <= 767 ? w * 0.2913 : short ? 117 : 157;
    // Visual box matches the photo, so the thumbnail is not letterboxed.
    const thumbH = (w * scaleX * PHOTO_RATIO) / scaleY;
    if (thumb && w > 767) thumb.style.height = `${thumbH}px`;

    // Scaled photo must sit inside the inner, not get clipped past the fold.
    const visualBottom = thumbOffset + thumbH * scaleY;
    inner.style.height = `${Math.ceil(visualBottom)}px`;
    inner.style.maxHeight = "none";
    inner.style.overflow = "visible";

    const secTop = sectionWrapRef.current
      ? Math.max(0, sectionWrapRef.current.getBoundingClientRect().top)
      : 0;
    const keyH =
      keyText.offsetHeight +
      parseFloat(getComputedStyle(keyText).marginBottom || "0");
    const pad = Math.max(0, viewH - 20 - secTop - keyH - visualBottom);
    slide.style.paddingTop = `${pad}px`;
  };

  /** Scroll: key text leaves, photo scales to the seam, after-title locks at +245. */
  const placeExpanded = (animate: boolean) => {
    const kv = keyVisualRef.current;
    const inner = slideInnerRef.current;
    const after = afterBoxRef.current;
    const thumb = thumbRef.current;
    const bg = bgRef.current;
    if (!kv || !inner || !after || !thumb) return;

    placeIntro();

    const w = window.innerWidth;
    const off = jgOffsets(w);
    const mItemPos = inner.offsetTop;
    const kvLeft = kv.getBoundingClientRect().left;
    // Wide JoongAng frame is 1920px and centered, so the sides stay white.
    // Narrower windows keep that same inset (about 9.5% each side).
    const photoW =
      w <= 767 ? w : Math.min(1920, Math.round(w * 0.8105));
    const photoH = Math.round(photoW * PHOTO_RATIO);
    const targetLeft = w <= 767 ? 0 : Math.round((w - photoW) / 2);
    const thumbX = w <= 767 ? off.thumbX : targetLeft - kvLeft;

    after.style.transition = animate ? "" : "none";
    thumb.style.transition = animate
      ? "all 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955)"
      : "none";

    // Box matches the photo, so the bitmap is not sliced on any edge.
    thumb.style.width = `${photoW}px`;
    thumb.style.maxWidth = "none";
    thumb.style.height = `${photoH}px`;
    thumb.style.overflow = "hidden";
    after.style.transform = `translateY(${-mItemPos + off.after}px)`;
    thumb.style.transform = `translateX(${thumbX}px) translateY(${-mItemPos + off.thumb}px) scale(1)`;

    if (bg) {
      bg.style.height = "100%";
      bg.style.width = "100%";
      bg.style.transform = "rotateX(0deg)";
      bg.style.transition = "none";
      bg.style.backgroundSize = "100% 100%";
      bg.style.backgroundPosition = "center center";
      bg.style.backgroundRepeat = "no-repeat";
    }

    const sectionH = Math.ceil(off.thumb + photoH + WHITE_BELOW_PX);
    const wrap = sectionWrapRef.current;
    if (wrap) {
      wrap.style.height = `${sectionH}px`;
      wrap.style.overflow = "visible";
    }
    const nextTrack = `${sectionH}px`;
    setTrackHeight((prev) => (prev === nextTrack ? prev : nextTrack));
  };

  const clearExpanded = () => {
    const after = afterBoxRef.current;
    const thumb = thumbRef.current;
    const bg = bgRef.current;
    if (after) {
      after.style.transform = "";
      after.style.transition = "";
    }
    if (thumb) {
      thumb.style.transform = "";
      thumb.style.transition = "";
      thumb.style.height = "";
      thumb.style.width = "";
      thumb.style.maxWidth = "";
      thumb.style.overflow = "";
    }
    if (bg) {
      bg.style.transform = "";
      bg.style.transition = "";
      bg.style.height = "";
      bg.style.width = "";
      bg.style.backgroundSize = "";
      bg.style.backgroundPosition = "";
    }
    const wrap = sectionWrapRef.current;
    if (wrap) {
      wrap.style.height = "";
      wrap.style.overflow = "";
    }
    const viewH = window.innerHeight;
    const hold = Math.round(viewH * HOLD_VH);
    const nextTrack = `${viewH + hold + WHITE_BELOW_PX}px`;
    setTrackHeight((prev) => (prev === nextTrack ? prev : nextTrack));
    placeIntro();
  };

  useLayoutEffect(() => {
    if (scrollAfter) {
      placeExpanded(true);
    } else {
      clearExpanded();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollAfter]);

  useEffect(() => {
    const onResize = () => {
      if (scrollAfterRef.current) placeExpanded(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const scrollToY = (y: number) => {
      const lenis = (
        window as unknown as {
          __lenis?: { scrollTo: (v: number, opts?: object) => void };
        }
      ).__lenis;
      if (lenis?.scrollTo) {
        lenis.scrollTo(y, {
          duration: 0.5,
          easing: (t: number) => 1 - Math.pow(1 - t, 3),
        });
      } else {
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    };

    const onScroll = () => {
      const el = trackRef.current;
      if (!el || snappingRef.current) return;

      const viewH = window.innerHeight;
      const top = el.getBoundingClientRect().top;
      const scrolled = Math.min(
        Math.max(-top, 0),
        Math.max(0, el.offsetHeight - viewH),
      );
      const shouldExpand = scrolled > 0;

      if (shouldExpand && !scrollAfterRef.current) {
        setScrollAfter(true);
        expandLockUntilRef.current = performance.now() + 520;
        if (startTimerRef.current) window.clearTimeout(startTimerRef.current);
        startTimerRef.current = window.setTimeout(() => {
          setStarted(true);
          startTimerRef.current = null;
        }, 520);

        snappingRef.current = true;
        const target = window.scrollY + el.getBoundingClientRect().top;
        scrollToY(target);
        window.setTimeout(() => {
          snappingRef.current = false;
        }, 560);
        return;
      }

      if (!shouldExpand && scrollAfterRef.current) {
        if (startTimerRef.current) {
          window.clearTimeout(startTimerRef.current);
          startTimerRef.current = null;
        }
        expandLockUntilRef.current = 0;
        setStarted(false);
        setScrollAfter(false);
        clearExpanded();
        return;
      }

      if (!shouldExpand || !scrollAfterRef.current) return;

      // Keep composition locked while sticky — photo must not drift
      if (performance.now() >= expandLockUntilRef.current) {
        placeExpanded(false);
      }
    };

    onScroll();

    let attached: { on: Function; off: Function } | null =
      (
        window as unknown as { __lenis?: { on: Function; off: Function } }
      ).__lenis ?? null;
    if (attached?.on) attached.on("scroll", onScroll);

    const retry = window.setInterval(() => {
      if (attached) {
        window.clearInterval(retry);
        return;
      }
      const late = (
        window as unknown as { __lenis?: { on: Function; off: Function } }
      ).__lenis;
      if (late?.on) {
        attached = late;
        late.on("scroll", onScroll);
        onScroll();
        window.clearInterval(retry);
      }
    }, 50);
    window.setTimeout(() => window.clearInterval(retry), 2000);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (startTimerRef.current) window.clearTimeout(startTimerRef.current);
      window.clearInterval(retry);
      attached?.off?.("scroll", onScroll);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bgUrl = isMobile
    ? "/images/joongang/partner_kv_m.jpg"
    : "/images/joongang/partner_kv.jpg";

  return (
    <div ref={trackRef} className="jg-track" style={{ height: trackHeight }}>
      <div ref={sectionWrapRef} className="jg-sectionWrap is-fixed">
        <div
          ref={keyVisualRef}
          className={[
            "jg-keyVisual",
            scrollAfter ? "is-scrollAfter" : "",
            started ? "is-start" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div
            className={["jg-visualSlideBox", intro ? "is-intro" : ""]
              .filter(Boolean)
              .join(" ")}
          >
            <strong className="jg-keyText">
              <div className="jg-txtLine">
                <span>법과</span>
              </div>
              <div className="jg-txtLine">
                <span>당신 사이,</span>
              </div>
              <div className="jg-txtLine jg-mHide">
                <span>
                  <span className="jg-hoverAccent">이로운 파트너스</span>가
                  있습니다
                </span>
              </div>
              <div className="jg-txtLine jg-wHide">
                <span>
                  <span className="jg-hoverAccent">이로운 파트너스</span>가
                </span>
              </div>
              <div className="jg-txtLine jg-wHide">
                <span>있습니다</span>
              </div>
            </strong>

            <div ref={slideInnerRef} className="jg-visualSlideInner">
              <div className="jg-beforeBox">
                <span className="jg-line" />
                <div className="jg-titleBox">
                  <strong className="jg-subject">
                    <div className="jg-txtLine">
                      <em>하나의 사건번호가 아닌, 한 사람의 삶으로</em>
                    </div>
                  </strong>
                </div>
                <strong className="jg-name">
                  <div className="jg-txtLine">
                    <span lang="en">Eroun Partners</span>
                  </div>
                </strong>
              </div>

              <div ref={afterBoxRef} className="jg-afterBox">
                <div className="jg-titleBox">
                  <strong className="jg-subject">
                    <div className="jg-txtLine">
                      <em>하나의</em>
                    </div>
                    <div className="jg-txtLine">
                      <em>사건번호가 아닌,</em>
                    </div>
                    <div className="jg-txtLine">
                      <em>한 사람의 삶으로</em>
                    </div>
                  </strong>
                </div>
                <div className="jg-nextTxt">
                  <div className="jg-paragraph jg-mHide">
                    {[
                      "사건번호가 아닌, 한 사람의 삶을",
                      "중심에 두겠다는 마음으로,",
                      "이로운 파트너스가 함께합니다.",
                      "형사·이혼·상속·민사까지,",
                      "복잡한 법률 문제 앞에서",
                      "가장 이로운 길을 찾아드립니다.",
                    ].map((line) => (
                      <div key={line} className="jg-txtLine">
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>
                  <div className="jg-paragraph jg-wHide">
                    {[
                      "사건번호가 아닌, 한 사람의 삶을",
                      "중심에 두겠다는 마음으로,",
                      "이로운 파트너스가 함께합니다.",
                      "형사·이혼·상속·민사까지,",
                      "복잡한 법률 문제 앞에서",
                      "가장 이로운 길을 찾아드립니다.",
                    ].map((line) => (
                      <div key={line} className="jg-txtLine">
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>
                  <div className="jg-btnHover jg-txtLine">
                    <Link href="/practice" className="jg-btnView">
                      <span>더 알아보기</span>
                    </Link>
                  </div>
                </div>
              </div>

              <div ref={thumbRef} className="jg-thumb">
                <span
                  ref={bgRef}
                  className="jg-bg"
                  style={{ backgroundImage: `url(${bgUrl})` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
