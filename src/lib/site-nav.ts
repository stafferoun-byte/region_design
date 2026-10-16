/** Shared primary navigation — used by header + footer */
export type SiteNavLink = {
  href: string;
  label: string;
  children?: readonly { href: string; label: string }[];
};

export const SITE_NAV: readonly SiteNavLink[] = [
  {
    href: "/about",
    label: "이로운 파트너스",
    children: [
      { href: "/about", label: "이로운 파트너스" },
      { href: "/lawyers", label: "이로운 변호사들" },
    ],
  },
  {
    href: "/practice",
    label: "업무분야",
    children: [
      { href: "/practice/inheritance", label: "상속전문센터" },
      { href: "/practice/criminal", label: "형사전문센터" },
      { href: "/practice/civil", label: "민사전문센터" },
      { href: "/practice/divorce", label: "이혼전문센터" },
      { href: "/practice/real-estate", label: "부동산전문센터" },
      { href: "/practice/traffic", label: "교통전문센터" },
    ],
  },
  { href: "/cases", label: "성공사례" },
  { href: "/columns", label: "이로운 칼럼" },
  { href: "/locations", label: "오시는길" },
];
