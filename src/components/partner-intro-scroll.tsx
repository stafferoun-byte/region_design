"use client";

/**
 * 1) Intro — thumb scale(0.188, 0.18), photo peeks at the bottom
 * 2) First scroll — photo eases open, inset from the sides, full image height kept
 * 3) After 500ms — after-copy lines slide up (.is-start)
 * 4) Further scroll — sticky ends and the section leaves
 */

import "./partner-intro.css";
import Link from "next/link";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

const INTRO_LINES = [
  "당신 곁 -",
  "가장 가까이에서",
  "법을 이야기하는 이로운 변호사들.",
  "",
  "사건번호가 아닌,",
  "한 사람의 삶을 중심에 두고",
  "복잡한 법률문제 앞에서 가장 이로운 길을 찾아드리겠습니다.",
] as const;

/** Team photo file is 1024×769. Expanded frame uses this so the bottom stays intact. */
const PHOTO_RATIO = 575 / 1024;

/** One extra viewport of rest on the expanded frame, then the next section. */
const HOLD_VH = 1;
const WHITE_BELOW_PX = 0;

/** default-ko.js: 500ms to .start, then 800ms before the page can move on */
const LOCK_MS = 1400;

function outerHeight(el: HTMLElement) {
  const s = getComputedStyle(el);
  return (
    el.offsetHeight +
    (parseFloat(s.marginTop) || 0) +
    (parseFloat(s.marginBottom) || 0)
  );
}

export function PartnerIntroScroll() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const sectionWrapRef = useRef<HTMLDivElement | null>(null);
  const keyVisualRef = useRef<HTMLDivElement | null>(null);
  const slideInnerRef = useRef<HTMLDivElement | null>(null);
  const afterBoxRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);
  const thumbFromRef = useRef<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);

  const scrollAfterRef = useRef(false);
  const leftIntroRef = useRef(false);
  const startTimerRef = useRef<number | null>(null);
  const utilOnRef = useRef(true);
  const [utilOn, setUtilOn] = useState(true);
  const lockUntilRef = useRef(0);
  const lockYRef = useRef(0);
  const releaseTimerRef = useRef<number | null>(null);
  const [pinned, setPinned] = useState(false);

  const [intro, setIntro] = useState(false);
  const [scrollAfter, setScrollAfter] = useState(false);
  const [started, setStarted] = useState(false);
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
      "jg-pretendard-var",
      "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css",
    );
    const t = window.setTimeout(() => setIntro(true), 300);
    return () => window.clearTimeout(t);
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
      const thumb = thumbRef.current;
      if (thumb) thumb.style.transition = "none";
      layoutFrame();
      window.requestAnimationFrame(() => {
        if (thumb && !scrollAfterRef.current) thumb.style.transition = "";
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
    // placeIntro is stable enough: it only reads refs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * default-ko.js resize.mainResizePrev:
   * thumb height matches the office photo (1024×575),
   * inner height = beforeBox + that height * 0.122,
   * paddingTop pins the stack to the viewport bottom.
   */
  const layoutFrame = () => {
    const kv = keyVisualRef.current;
    const inner = slideInnerRef.current;
    const thumb = thumbRef.current;
    if (!kv || !inner || !thumb) return null;
    const slide = kv.querySelector(".jg-visualSlideBox") as HTMLElement | null;
    const before = kv.querySelector(".jg-beforeBox") as HTMLElement | null;
    const keyText = kv.querySelector(".jg-keyText") as HTMLElement | null;
    if (!slide || !before || !keyText) return null;

    const w = window.innerWidth;
    const viewH = window.innerHeight;

    if (w <= 767) {
      thumb.style.height = "";
      thumb.style.width = "";
      thumb.style.maxWidth = "";
      thumb.style.transform = "";
      inner.style.height = "auto";
      inner.style.maxHeight = "none";
      inner.style.overflow = "visible";
      slide.style.paddingTop = "";
      return {
        w,
        mItemPos: inner.offsetTop,
        kvLeft: kv.getBoundingClientRect().left,
      };
    }

    const frameH = w * PHOTO_RATIO;
    thumb.style.height = `${frameH}px`;

    inner.style.height = `${outerHeight(before) + frameH * 0.122 + 1}px`;
    inner.style.maxHeight = "none";
    inner.style.overflow = "visible";

    const pad = viewH - (outerHeight(keyText) + outerHeight(inner));
    slide.style.paddingTop = `${pad}px`;

    return {
      w,
      mItemPos: inner.offsetTop,
      kvLeft: kv.getBoundingClientRect().left,
    };
  };

  /** Photo opens to a centered frame: side margins stay, and the whole image is kept. */
  const placeExpanded = (animate: boolean) => {
    const frame = layoutFrame();
    const after = afterBoxRef.current;
    const thumb = thumbRef.current;
    const section = sectionWrapRef.current;
    if (!frame || !after || !thumb || !section) return;
    const { w, mItemPos, kvLeft } = frame;
    const viewH = window.innerHeight;

    after.style.transition = animate ? "" : "none";
    thumb.style.transition = animate ? "" : "none";

    const frameW = w <= 767 ? w : Math.min(w * 0.92, 1920);
    const frameH = frameW * PHOTO_RATIO;
    const photoTop = w <= 767 ? 0 : w <= 1280 ? w * 0.3194 : 460;
    if (w > 767) {
      thumb.style.width = `${frameW}px`;
      thumb.style.maxWidth = `${frameW}px`;
      thumb.style.height = `${frameH}px`;
      thumb.style.transform = `translateX(${(w - frameW) / 2 - kvLeft}px) translateY(${-mItemPos + photoTop}px)`;
    } else {
      thumb.style.width = "";
      thumb.style.maxWidth = "";
      thumb.style.height = "";
      thumb.style.transform = "";
    }

    if (w <= 767) {
      after.style.transform = "translateY(0)";
      section.style.position = "";
      section.style.overflow = "";
      section.style.height = "";
      section.style.minHeight = "";
      const tail = Math.round(w * 0.04);
      const nextTrack = `${section.offsetHeight + tail}px`;
      setTrackHeight((prev) => (prev === nextTrack ? prev : nextTrack));
      const from = thumbFromRef.current;
      thumbFromRef.current = null;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (from && animate && !reduce && from.width > 0 && from.height > 0) {
        const to = thumb.getBoundingClientRect();
        const s = from.height / to.height;
        const scaledW = to.width * s;
        const visualLeft = from.left + from.width / 2 - scaledW / 2;
        const visualTop = from.top + from.height - to.height * s;
        const dx = visualLeft - to.left;
        const dy = visualTop - to.top;
        thumb.style.transformOrigin = "top left";
        thumb.style.transition = "none";
        thumb.style.transform = `translate(${dx}px, ${dy}px) scale(${s})`;
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            thumb.style.transition =
              "transform 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955)";
            thumb.style.transform = "translate(0px, 0px) scale(1)";
          });
        });
      }
      return;
    } else if (w <= 1280) {
      after.style.transform = `translateY(calc(${-mItemPos}px + 19.2vw))`;
    } else {
      after.style.transform = `translateY(${-mItemPos + 274}px)`;
    }

    const sectionH = Math.max(viewH, photoTop + frameH);
    section.style.position = "relative";
    section.style.overflow = "visible";
    section.style.height = "auto";
    section.style.minHeight = `${sectionH}px`;
    const nextTrack = `${sectionH + 40}px`;
    setTrackHeight((prev) => (prev === nextTrack ? prev : nextTrack));
  };

  const clearExpanded = () => {
    const after = afterBoxRef.current;
    const thumb = thumbRef.current;
    const section = sectionWrapRef.current;
    if (after) {
      after.style.transform = "";
      after.style.transition = "";
    }
    if (thumb) {
      thumb.style.transform = "";
      thumb.style.transition = "";
      thumb.style.width = "";
      thumb.style.maxWidth = "";
      thumb.style.height = "";
    }
    if (section) {
      section.style.position = "";
      section.style.overflow = "";
      section.style.height = "";
      section.style.minHeight = "";
    }
    const viewH = window.innerHeight;
    const next = `${viewH + Math.round(viewH * HOLD_VH) + WHITE_BELOW_PX}px`;
    setTrackHeight((prev) => (prev === next ? prev : next));
    layoutFrame();
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
    const lenis = () =>
      (
        window as unknown as {
          __lenis?: {
            scrollTo: (
              v: number,
              opts?: { immediate?: boolean; force?: boolean },
            ) => void;
          };
        }
      ).__lenis;

    let snapping = false;
    const snapTop = () => {
      if (snapping) return;
      const top = trackRef.current?.getBoundingClientRect().top ?? 0;
      if (window.scrollY <= 1 && top >= -1) return;
      snapping = true;
      lenis()?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
      snapping = false;
    };

    // Lenis keeps the previous page's scroll in flight across the route
    // change. That leftover position looks like a scroll and opens the
    // expanded frame before the visitor has moved. Rest at the intro first.
    snapTop();
    let armed = false;
    let settleTimer: number | null = null;
    const armIfResting = () => {
      settleTimer = null;
      const top = trackRef.current?.getBoundingClientRect().top ?? 0;
      if (window.scrollY <= 1 && top >= -1) {
        armed = true;
        return;
      }
      snapTop();
      settleTimer = window.setTimeout(armIfResting, 80);
    };
    settleTimer = window.setTimeout(armIfResting, 80);

    const onScroll = () => {
      const el = trackRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const top = rect.top;
      const onFirst = rect.bottom > window.innerHeight * 0.62;
      if (onFirst !== utilOnRef.current) {
        utilOnRef.current = onFirst;
        setUtilOn(onFirst);
      }
      if (!armed) {
        if (window.scrollY > 1 || top < -1) snapTop();
        return;
      }
      const locked = performance.now() < lockUntilRef.current;
      if (locked) return;

      const shouldExpand = top < -1;

      if (shouldExpand && !scrollAfterRef.current) {
        if (window.innerWidth <= 767 && thumbRef.current) {
          const from = thumbRef.current.getBoundingClientRect();
          thumbFromRef.current = {
            left: from.left,
            top: from.top,
            width: from.width,
            height: from.height,
          };
        }
        const y = Math.max(0, window.scrollY + top);
        lockYRef.current = y;
        lockUntilRef.current = performance.now() + LOCK_MS;
        if (window.innerWidth > 767) setPinned(true);
        setScrollAfter(true);
        const lenis = (
          window as unknown as {
            __lenis?: {
              stop: () => void;
              start: () => void;
              scrollTo: (v: number, opts?: object) => void;
            };
          }
        ).__lenis;
        lenis?.scrollTo(y, { immediate: true, force: true });
        lenis?.stop();
        const hold = () => {
          if (performance.now() >= lockUntilRef.current) return;
          if (Math.abs(window.scrollY - lockYRef.current) > 1) {
            window.scrollTo(0, lockYRef.current);
            lenis?.scrollTo(lockYRef.current, { immediate: true, force: true });
          }
          window.requestAnimationFrame(hold);
        };
        window.requestAnimationFrame(hold);
        if (startTimerRef.current) window.clearTimeout(startTimerRef.current);
        startTimerRef.current = window.setTimeout(() => {
          setStarted(true);
          startTimerRef.current = null;
        }, 500);
        if (releaseTimerRef.current) window.clearTimeout(releaseTimerRef.current);
        releaseTimerRef.current = window.setTimeout(() => {
          lockUntilRef.current = 0;
          setPinned(false);
          lenis?.start();
          releaseTimerRef.current = null;
        }, LOCK_MS);
        return;
      }

      if (rect.bottom < window.innerHeight * 0.4) leftIntroRef.current = true;

      if (leftIntroRef.current && top >= -1 && scrollAfterRef.current) {
        leftIntroRef.current = false;
        scrollAfterRef.current = false;
        if (startTimerRef.current) {
          window.clearTimeout(startTimerRef.current);
          startTimerRef.current = null;
        }
        setStarted(false);
        setScrollAfter(false);
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
      if (settleTimer) window.clearTimeout(settleTimer);
      if (startTimerRef.current) window.clearTimeout(startTimerRef.current);
      if (releaseTimerRef.current) window.clearTimeout(releaseTimerRef.current);
      (
        window as unknown as { __lenis?: { start: () => void } }
      ).__lenis?.start();
      window.clearInterval(retry);
      attached?.off?.("scroll", onScroll);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bgUrl = "/images/partners/eroun-office.jpg?v=4";
  const bgUrlMobile = "/images/partners/eroun-office-mobile.jpg?v=1";

  return (
    <div ref={trackRef} className="jg-track" style={{ height: trackHeight }}>
      <div
        className={utilOn && !scrollAfter ? "jg-util" : "jg-util is-off"}
        aria-hidden={!utilOn || scrollAfter}
      >
        <div className="jg-utilInner">
          <p className="jg-utilCopy">
            © 2026 법무법인 이로운 파트너스
            <br />
            <span lang="en">All Rights Reserved</span>
            <span className="jg-utilRule" aria-hidden="true" />
          </p>
        </div>
      </div>
      <div
        ref={sectionWrapRef}
        className={pinned ? "jg-sectionWrap is-fixed is-pinned" : "jg-sectionWrap is-fixed"}
      >
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
              <div className="jg-txtLine">
                <span className="jg-keyTextKeep">
                  이로운 파트너스가 <span className="jg-mBr">있습니다</span>
                </span>
              </div>
            </strong>

            <div ref={slideInnerRef} className="jg-visualSlideInner">
              <div className="jg-beforeBox">
                <span className="jg-line" />
                <div className="jg-titleBox">
                  <strong className="jg-subject">
                    <div className="jg-txtLine">
                      <em>
                        든든하고 <span className="jg-point">이로운 변호사들</span>, 이로운 파트너스
                      </em>
                    </div>
                  </strong>
                </div>
                <strong className="jg-name">
                  <div className="jg-txtLine">
                    <span lang="en">EROUN PARTNERS</span>
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
                    {INTRO_LINES.map((line, index) => (
                      <div
                        key={`${index}-${line}`}
                        className={line ? "jg-txtLine jg-lead" : "jg-txtLine"}
                      >
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>
                  <div className="jg-paragraph jg-wHide">
                    {INTRO_LINES.slice(0, 3).map((line, index) => (
                      <div
                        key={`${index}-${line}`}
                        className="jg-txtLine jg-lead"
                      >
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>
                  <div className="jg-btnHover jg-txtLine">
                    <Link href="/lawyers" className="jg-btnView">
                      <span>이로운 변호사</span>
                    </Link>
                  </div>
                </div>
              </div>

              <div ref={thumbRef} className="jg-thumb">
                <span
                  className="jg-bg jg-bgDesk"
                  style={{ backgroundImage: `url(${bgUrl})` }}
                />
                <span
                  className="jg-bg jg-bgM"
                  style={{ backgroundImage: `url(${bgUrlMobile})` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
