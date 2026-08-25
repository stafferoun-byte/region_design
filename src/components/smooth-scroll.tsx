"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import "lenis/dist/lenis.css";

/** Smooth scroll — lighter settings so Framer appear animations stay fluid */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      // Slightly snappier than before — less float vs motion overlap
      duration: 0.95,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.4,
    });

    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return children;
}
