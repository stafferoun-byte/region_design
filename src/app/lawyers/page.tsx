import { SitePageFrame } from "@/components/site-page-frame";
import type { Metadata } from "next";
import Link from "next/link";

const FONT_PRETENDARD =
  '"Pretendard", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';

const ATTORNEYS = [
  {
    href: "/lawyers/lee-chang-jae",
    label: "이창재 대표변호사",
    image: "/images/attorneys/lee-chang-jae.png",
    position: "center 32%",
  },
  {
    href: "/lawyers/kang-nuri",
    label: "강누리 변호사",
    image: "/images/attorneys/kang-nuri.png",
    position: "56% 42%",
  },
  {
    href: "/lawyers/kim-nam-yeol",
    label: "김남열 변호사",
    image: "/images/attorneys/kim-nam-yeol.png",
    position: "58% 40%",
  },
] as const;

export const metadata: Metadata = {
  title: "이로운 변호사들 | 법무법인 이로운 파트너스",
  description: "법무법인 이로운 파트너스 변호사 소개",
};

export default function AttorneysPage() {
  return (
    <SitePageFrame tone="none">
      <section className="px-5 pt-6 pb-24 md:px-10 md:pt-28 md:pb-32 xl:px-12">
        <h1
          className="text-[34px] leading-[1.2] font-bold tracking-[-0.04em] text-black md:text-[clamp(30px,3.8vw,48px)] md:leading-[1.15]"
          style={{ fontFamily: "var(--font-ibm-sans), 'IBM Plex Sans KR', sans-serif" }}
        >
          이로운 변호사들
        </h1>
        <nav
          aria-label="변호사"
          className="mt-8 grid max-w-[960px] grid-cols-1 gap-10 md:mt-12 md:grid-cols-3 md:gap-6"
        >
          {ATTORNEYS.map((attorney) => (
            <Link
              key={attorney.href}
              href={attorney.href}
              className="block text-black"
              style={{ fontFamily: FONT_PRETENDARD }}
            >
              <span className="block aspect-[3/4] overflow-hidden bg-[#f4f4f2]">
                <img
                  src={attorney.image}
                  alt=""
                  className={`h-full w-full object-cover ${
                    attorney.href === "/lawyers/lee-chang-jae"
                      ? "max-md:[object-position:70%_32%] md:[object-position:center_32%]"
                      : attorney.href === "/lawyers/kang-nuri"
                        ? "max-md:[object-position:70%_42%] md:[object-position:56%_42%]"
                        : "max-md:[object-position:72%_40%] md:[object-position:58%_40%]"
                  }`}
                />
              </span>
              <span className="mt-3 block text-left text-[16px] leading-snug tracking-[-0.03em] break-keep md:text-[18px]">
                {attorney.label}
              </span>
            </Link>
          ))}
        </nav>
      </section>
    </SitePageFrame>
  );
}
