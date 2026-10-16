import { SitePageFrame } from "@/components/site-page-frame";
import type { Metadata } from "next";
import Link from "next/link";

const FONT_PRETENDARD =
  '"Pretendard", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';

const ATTORNEYS = [
  { href: "/lawyers/lee-chang-jae", label: "이창재 대표변호사" },
  { href: "/lawyers/kang-nuri", label: "강누리 변호사" },
  { href: "/lawyers/kim-nam-yeol", label: "김남열 변호사" },
] as const;

export const metadata: Metadata = {
  title: "이로운 변호사들 | 법무법인 이로운 파트너스",
  description: "법무법인 이로운 파트너스 변호사 소개",
};

export default function AttorneysPage() {
  return (
    <SitePageFrame tone="none">
      <section className="px-5 pt-28 pb-32 md:px-10 xl:px-12">
        <h1
          className="text-[clamp(30px,3.8vw,48px)] leading-[1.15] font-bold tracking-[-0.04em] text-black"
          style={{ fontFamily: "var(--font-ibm-sans), 'IBM Plex Sans KR', sans-serif" }}
        >
          이로운 변호사들
        </h1>
        <nav
          aria-label="변호사"
          className="mt-12 flex max-w-[960px] border-b border-[#e6e6e6]"
        >
          {ATTORNEYS.map((attorney) => (
            <Link
              key={attorney.href}
              href={attorney.href}
              className="flex-1 border-b-2 border-transparent px-2 py-5 text-center text-[14px] leading-snug tracking-[-0.03em] break-keep text-black transition-colors hover:border-[#5DC39B] md:text-[18px]"
              style={{ fontFamily: FONT_PRETENDARD }}
            >
              {attorney.label}
            </Link>
          ))}
        </nav>
      </section>
    </SitePageFrame>
  );
}
