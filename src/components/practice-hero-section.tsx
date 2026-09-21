"use client";

import { HeroNav } from "@/components/hero-nav";

/**
 * Practice top hero — photo frame + nav.
 * Copy cleared for upcoming content.
 */

const FONT =
  '"Wanted Sans Variable", "Wanted Sans", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';

const HERO_BG = "/images/practice/hero-bg.png?v=3";

export function PracticeHeroSection() {
  return (
    <>
      {/* Same floating pill as home — fixed to viewport */}
      <HeroNav />
      <section
        className="relative z-0 h-svh w-full bg-[#FCFCFA]"
        style={{ fontFamily: FONT }}
        aria-label="업무분야"
      >
        <div className="relative h-full w-full overflow-hidden">
          <div className="absolute inset-5 overflow-hidden rounded-[40px]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("${HERO_BG}")`,
                backgroundSize: "cover",
                backgroundPosition: "50% 50%",
                backgroundRepeat: "no-repeat",
              }}
              aria-hidden
            />
          </div>
        </div>
      </section>
    </>
  );
}
