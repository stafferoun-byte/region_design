"use client";

/**
 * JoongAng Brand title motion for /practice.
 * Matches brandUI skrollr + `.section.active .keyVisual .name`:
 * fixed top 340px, margin-top -143px, font 260→72, padding-top 0→175
 * across the hero, then those values stay put.
 * @see https://www.joonganggroup.com/brand/
 */

import "./practice-brand.css";
import {
  BRAND_SECTIONS,
  type BrandItem,
} from "@/data/practice-brand-data";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const PIN_ID = "pb-live-title";

function ensureFonts() {
  const add = (id: string, href: string) => {
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  };
  add(
    "pb-inter",
    "https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,500..700&display=swap",
  );
  add(
    "pb-pretendard",
    "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css",
  );
}

function ensurePinEl(): HTMLElement {
  let el = document.getElementById(PIN_ID) as HTMLElement | null;
  if (!el) {
    el = document.createElement("strong");
    el.id = PIN_ID;
    el.className = "pb-catName pb-catName--live";
    el.setAttribute("aria-hidden", "true");
    document.body.appendChild(el);
  }
  return el;
}

function Gallery({ images }: { images: string[] }) {
  const [front, setFront] = useState(0);
  const n = images.length;
  if (!n) return null;
  const bump = (d: 1 | -1) => setFront((i) => (i + d + n) % n);

  return (
    <div className="pb-gallery" onClick={() => bump(1)} role="presentation">
      <div className="pb-imgCont">
        {images.map((src, i) => (
          <div
            key={src}
            className="pb-gImg"
            style={{ zIndex: n - ((i - front + n) % n) + 2 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" />
          </div>
        ))}
      </div>
      {n > 1 ? (
        <div className="pb-arr" onClick={(e) => e.stopPropagation()}>
          <button type="button" onClick={() => bump(-1)}>
            Prev
          </button>
          <button type="button" onClick={() => bump(1)}>
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
}

function BrandCard({ item }: { item: BrandItem }) {
  const nameInner = item.nameHtml ? (
    <span dangerouslySetInnerHTML={{ __html: item.nameHtml }} />
  ) : item.nameEn ? (
    <span lang="en">{item.name}</span>
  ) : (
    item.name
  );

  return (
    <div className="pb-item">
      <div className="pb-thumb">
        {item.gallery?.length ? (
          <Gallery images={item.gallery} />
        ) : item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.image} alt="" />
        ) : null}
      </div>
      <div className="pb-txtBox">
        <div
          className={["pb-txtName", item.nameEn ? "is-en" : ""]
            .filter(Boolean)
            .join(" ")}
        >
          {item.href ? (
            <a
              className="pb-link"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {nameInner}
            </a>
          ) : (
            nameInner
          )}
        </div>
        <strong className="pb-tit">{item.tit}</strong>
        <div className="pb-info">
          {item.info.map((line, i) =>
            line === "" ? (
              <div key={`g-${i}`} className="pb-gap" />
            ) : (
              <p key={`${i}-${line.slice(0, 10)}`}>{line}</p>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * desktop (>1280): fixed top 340, margin -143, pad 0→175, font 260→72
 * keyframes at keyVisualTop+100 and keyVisualTop+height (default-ko.js brandUI)
 */
function specFor(idx: number, w: number) {
  if (w <= 767) {
    return {
      fontFrom: ((idx === 2 || idx === 3 ? 20.13 : 18.13) * w) / 100,
      fontTo: (10.13 * w) / 100,
      seam: (9.86 * w) / 100,
      padTo: (12.15 * w) / 100,
      pinY: (40 * w) / 100,
      lead: 0,
    };
  }
  if (w <= 1280) {
    return {
      fontFrom: ((idx === 2 || idx === 3 ? 20.83 : 18.05) * w) / 100,
      fontTo: (5 * w) / 100,
      seam: (9.93 * w) / 100,
      padTo: (12.15 * w) / 100,
      pinY: (23.61 * w) / 100,
      lead: 50,
    };
  }
  return {
    fontFrom: idx === 2 || idx === 3 ? 300 : 260,
    fontTo: 72,
    seam: 143,
    padTo: 175,
    pinY: 340,
    lead: 100,
  };
}

export function PracticeBrandPage() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const nameRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    ensureFonts();
  }, []);

  useLayoutEffect(() => {
    const pinEl = ensurePinEl();
    let raf = 0;

    const tick = () => {
      const w = window.innerWidth;
      const scrollY = window.scrollY;

      let activeIdx = -1;
      let live:
        | {
            label: string;
            top: number;
            font: number;
            pad: number;
            seam: number;
          }
        | null = null;

      sectionRefs.current.forEach((sec, idx) => {
        const name = nameRefs.current[idx];
        if (name) {
          name.style.visibility = "hidden";
          name.style.opacity = "0";
        }
        if (!sec) return;
        const kv = sec.querySelector(".pb-keyVisual") as HTMLElement | null;
        if (!kv) return;

        const spec = specFor(idx, w);
        const kvRect = kv.getBoundingClientRect();
        const secRect = sec.getBoundingClientRect();
        const kvDocTop = kvRect.top + scrollY;
        const secDocTop = secRect.top + scrollY;
        // First hero is already on screen at rest (section offset is below 0 scroll).
        // Later sections take over once their top reaches the pin line.
        if (
          secRect.bottom > 40 &&
          scrollY + spec.pinY + 1 >= secDocTop
        ) {
          activeIdx = idx;
        }
        if (idx !== activeIdx) return;

        nameRefs.current.forEach((other, otherIdx) => {
          if (otherIdx !== idx && other) {
            other.style.visibility = "hidden";
            other.style.opacity = "0";
          }
        });

        const heroH = Math.max(1, kv.offsetHeight);
        // brandUI skrollr: data-(keyVisualTop+100) → data-(keyVisualTop+height)
        const animStart = kvDocTop + spec.lead;
        const animEnd = kvDocTop + heroH;
        const t = Math.min(
          1,
          Math.max(0, (scrollY - animStart) / Math.max(1, animEnd - animStart)),
        );
        const label = BRAND_SECTIONS[idx]?.label ?? "";

        // After the hero, JoongAng releases the title into the white gap
        // under the photo (absolute, scrolls with the section — not stuck on the card).
        if (scrollY >= animEnd && name) {
          name.style.visibility = "visible";
          name.style.opacity = "1";
          name.style.position = "absolute";
          name.style.top = `${heroH + spec.pinY}px`;
          name.style.left = "-100%";
          name.style.right = "-100%";
          name.style.marginTop = `${-spec.seam}px`;
          name.style.paddingTop = `${spec.padTo}px`;
          name.style.fontSize = `${spec.fontTo}px`;
          name.style.zIndex = "6";
          name.style.transform = "none";
          name.style.textAlign = "center";
          return;
        }

        live = {
          label,
          // Photo still below the pin line: ride the seam. Otherwise lock top at 340.
          top: kvRect.top > spec.pinY ? kvRect.top : spec.pinY,
          font: spec.fontFrom + (spec.fontTo - spec.fontFrom) * t,
          pad: spec.padTo * t,
          seam: spec.seam,
        };
      });

      if (!live?.label) {
        pinEl.style.display = "none";
        pinEl.textContent = "";
        return;
      }

      pinEl.textContent = live.label;
      pinEl.style.cssText = [
        "display:block",
        "position:fixed",
        `top:${live.top}px`,
        "left:0",
        "right:0",
        `margin:${-live.seam}px 0 0 0`,
        `padding:${live.pad}px 0 0 0`,
        `font-size:${live.font.toFixed(2)}px`,
        "font-family:Inter,Helvetica,sans-serif",
        "font-weight:700",
        "line-height:1",
        "letter-spacing:-0.04em",
        "color:#000",
        "white-space:nowrap",
        "text-align:center",
        "pointer-events:none",
        "transform:none",
        "opacity:1",
        "visibility:visible",
        "z-index:40",
      ].join(";");
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };

    tick();

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
        window.clearInterval(retry);
      }
    }, 50);
    window.setTimeout(() => window.clearInterval(retry), 2000);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(retry);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      attached?.off?.("scroll", onScroll);
      document.getElementById(PIN_ID)?.remove();
    };
  }, []);

  return (
    <div className="pb-brand">
      <div className="pb-brandWrap">
        {BRAND_SECTIONS.map((section, i) => (
          <section
            key={section.menuId}
            id={section.menuId}
            ref={(el) => {
              sectionRefs.current[i] = el;
            }}
            className={`pb-section ${section.className}`}
            data-menu-id={section.menuId}
          >
            <div className="pb-keyVisual">
              <div className="pb-bg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={section.hero} alt="" />
              </div>
              <strong
                ref={(el) => {
                  nameRefs.current[i] = el;
                }}
                className="pb-catName"
              >
                {section.label}
              </strong>
            </div>
            <div className="pb-brandList">
              <div className="pb-brandListArea">
                {section.items.map((item) => (
                  <BrandCard key={item.name + item.tit} item={item} />
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
