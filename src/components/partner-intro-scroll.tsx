"use client";

/**
 * JoongAng keyVisual (default-ko.js mainUI):
 * 1) Intro — thumb scale(0.188, 0.18), photo peeks at the bottom
 * 2) First scroll — 0.5s ease to full-bleed (translateX -offset, translateY -mItemPos+460)
 * 3) After 500ms — after-copy lines slide up (.is-start)
 * 4) Further scroll — sticky ends and the section leaves
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

const INTRO_LINES = [
  "당신 곁 -",
  "가장 가까이에서",
  "법을 이야기하는 이로운 변호사들.",
  "",
  "사건번호가 아닌,",
  "한 사람의 삶을 중심에 두고",
  "복잡한 법률문제 앞에서 가장 이로운 길을 찾아드리겠습니다.",
] as const;

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

  const scrollAfterRef = useRef(false);
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
   * thumb height = innerWidth * 1380/1440,
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
    const frameH = w * (1380 / 1440);
    if (w > 767) thumb.style.height = `${frameH}px`;
    else thumb.style.height = "";

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

  /** default-ko.js resize.mainResizeNext — photo grows from the intro scale. */
  const placeExpanded = (animate: boolean) => {
    const frame = layoutFrame();
    const after = afterBoxRef.current;
    const thumb = thumbRef.current;
    if (!frame || !after || !thumb) return;
    const { w, mItemPos, kvLeft } = frame;

    after.style.transition = animate ? "" : "none";
    thumb.style.transition = animate ? "" : "none";
    thumb.style.width = "";
    thumb.style.maxWidth = "";

    if (w > 767) thumb.style.height = `${w * (1380 / 1440)}px`;

    // default-ko.js: photo flush to the viewport edges, top locked at +460.
    if (w <= 767) {
      after.style.transform = `translateY(calc(${-mItemPos}px + 24.33vw))`;
      thumb.style.transform = `scale(1) translateX(-26.66vw) translateY(calc(${-mItemPos}px + 41.33vw))`;
    } else if (w <= 1280) {
      after.style.transform = `translateY(calc(${-mItemPos}px + 17.36vw))`;
      thumb.style.transform = `translateX(${-kvLeft}px) translateY(calc(${-mItemPos}px + 31.94vw))`;
    } else if (w >= 1920) {
      after.style.transform = `translateY(${-mItemPos + 245}px)`;
      thumb.style.transform = `translateX(-637px) translateY(${-mItemPos + 460}px)`;
    } else {
      after.style.transform = `translateY(${-mItemPos + 245}px)`;
      thumb.style.transform = `translateX(${-kvLeft}px) translateY(${-mItemPos + 460}px)`;
    }
  };

  const clearExpanded = () => {
    const after = afterBoxRef.current;
    const thumb = thumbRef.current;
    if (after) {
      after.style.transform = "";
      after.style.transition = "";
    }
    if (thumb) {
      thumb.style.transform = "";
      thumb.style.transition = "";
      thumb.style.width = "";
      thumb.style.maxWidth = "";
    }
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
      const locked = performance.now() < lockUntilRef.current;
      if (locked) return;

      const shouldExpand = top < -1;

      if (shouldExpand && !scrollAfterRef.current) {
        const y = Math.max(0, window.scrollY + top);
        lockYRef.current = y;
        lockUntilRef.current = performance.now() + LOCK_MS;
        setPinned(true);
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

      if (top > 8 && scrollAfterRef.current) {
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

  const bgUrl = "/images/partners/eroun-team.jpg";

  return (
    <div ref={trackRef} className="jg-track" style={{ height: trackHeight }}>
      <div className={utilOn ? "jg-util" : "jg-util is-off"} aria-hidden={!utilOn}>
        <div className="jg-utilInner">
          <p className="jg-utilCopy">
            © 2026 법무법인 이로운 파트너스
            <br />
            <span lang="en">All Rights Reserved</span>
          </p>
          <div className="jg-utilLang">
            <span className="is-on" lang="en">
              KOR
            </span>
            <span lang="en">ENG</span>
          </div>
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
                  이로운 파트너스가
                  있습니다
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
                        든든하고 <span className="jg-point">이로운</span> 변호사들,{" "}
                        <span className="jg-point">이로운 파트너스</span>
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
                    {INTRO_LINES.map((line, index) => (
                      <div
                        key={`${index}-${line}`}
                        className={line ? "jg-txtLine jg-lead" : "jg-txtLine"}
                      >
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>
                  <div className="jg-btnHover jg-txtLine">
                    <Link href="/practice/inheritance" className="jg-btnView">
                      <span>더 알아보기</span>
                    </Link>
                  </div>
                </div>
              </div>

              <div ref={thumbRef} className="jg-thumb">
                <span
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
