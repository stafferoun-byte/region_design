export type InsightCategory =
  | "inheritance"
  | "criminal"
  | "realestate"
  | "divorce"
  | "other";

export type InsightArticle = {
  id: string;
  category: InsightCategory;
  categoryLabel: string;
  /** Title-case English date; CSS uppercases via type__tiny_text_uc */
  date: string;
  datetime: string;
  author: string;
  title: string;
  image: string;
  href: string;
};

/** greeda-style path: 제목 띄어쓰기와 문장부호를 하이픈으로 나눈다. */
export function columnSlug(title: string) {
  return title
    .trim()
    .replace(/[?？!！.,，、·:："“”"'‘’()[\]{}]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function columnPath(title: string) {
  return `/columns/${columnSlug(title)}`;
}

export const INSIGHT_CATEGORY_LABEL: Record<InsightCategory, string> = {
  inheritance: "상속",
  criminal: "형사",
  realestate: "부동산",
  divorce: "이혼",
  other: "기타",
};

const INSIGHT_ARTICLE_SOURCE: InsightArticle[] = [
  {
    id: "1",
    category: "criminal",
    categoryLabel: INSIGHT_CATEGORY_LABEL.criminal,
    date: "19. August 2026",
    datetime: "2026-08-19",
    author: "",
    title: "수사 초기, 진술 전에 꼭 알아두어야 할 것들",
    image: "/images/insights/mailbox.png",
    href: "/columns/1",
  },
  {
    id: "2",
    category: "divorce",
    categoryLabel: INSIGHT_CATEGORY_LABEL.divorce,
    date: "07. August 2026",
    datetime: "2026-08-07",
    author: "",
    title: "합의 이혼과 소송 이혼, 선택이 갈리는 지점",
    image: "/images/insights/legal-balance.png",
    href: "/columns/2",
  },
  {
    id: "3",
    category: "other",
    categoryLabel: INSIGHT_CATEGORY_LABEL.other,
    date: "28. July 2026",
    datetime: "2026-07-28",
    author: "",
    title: "첫 상담에서 무엇을 준비하면 좋을까요",
    image: "/images/insights/dining-table.png",
    href: "/columns/3",
  },
  {
    id: "4",
    category: "realestate",
    categoryLabel: INSIGHT_CATEGORY_LABEL.realestate,
    date: "27. July 2026",
    datetime: "2026-07-27",
    author: "",
    title: "전세보증금 반환, 가압류가 필요한 순간",
    image:
      "https://www.kuemmerlein.de/wp-content/uploads/2026/07/Blatt_Tropfen_V3_2500px.jpg",
    href: "/columns/4",
  },
  {
    id: "5",
    category: "other",
    categoryLabel: INSIGHT_CATEGORY_LABEL.other,
    date: "24. July 2026",
    datetime: "2026-07-24",
    author: "",
    title: "온라인 상담 예약 전에 확인하면 좋은 체크리스트",
    image: "/images/insights/stone-cubes.png",
    href: "/columns/5",
  },
  {
    id: "6",
    category: "other",
    categoryLabel: INSIGHT_CATEGORY_LABEL.other,
    date: "23. July 2026",
    datetime: "2026-07-23",
    author: "",
    title: "교통사고 합의, 서두르기 전에 따져볼 것들",
    image: "/images/insights/case-files.png",
    href: "/columns/6",
  },
  {
    id: "7",
    category: "inheritance",
    categoryLabel: INSIGHT_CATEGORY_LABEL.inheritance,
    date: "3. March 2026",
    datetime: "2026-03-03",
    author: "",
    title: "생전에 받은 재산도 상속할 때 포함될까요?",
    image: "/images/insights/family-law.png",
    href: "/columns/7",
  },
];

export const INSIGHT_ARTICLES: InsightArticle[] = INSIGHT_ARTICLE_SOURCE.map(
  (article) => ({
    ...article,
    href: columnPath(article.title),
  }),
);

export function findColumnArticle(param: string) {
  const key = decodeURIComponent(param);
  return INSIGHT_ARTICLES.find(
    (article) => columnSlug(article.title) === key || article.id === key,
  );
}

export const INSIGHT_FILTERS = [
  { id: "all" as const, label: "전체칼럼", href: "/columns" },
  {
    id: "inheritance" as const,
    label: "상속",
    href: "/columns?field=inheritance",
    children: [
      { label: "상속재산분할", href: "/columns?field=inheritance" },
      { label: "유류분반환청구", href: "/columns?field=inheritance" },
      { label: "성년후견인", href: "/columns?field=inheritance" },
      { label: "친양자입양", href: "/columns?field=inheritance" },
      { label: "공유물분할청구소송", href: "/columns?field=inheritance" },
    ],
  },
  {
    id: "criminal" as const,
    label: "형사",
    href: "/columns?field=criminal",
    children: [
      { label: "교통사고", href: "/columns?field=criminal" },
      { label: "학교폭력", href: "/columns?field=criminal" },
    ],
  },
  {
    id: "realestate" as const,
    label: "부동산",
    href: "/columns?field=realestate",
    children: [
      { label: "전세보증금 반환", href: "/columns?field=realestate" },
      { label: "명도소송", href: "/columns?field=realestate" },
      { label: "소유권이전등기", href: "/columns?field=realestate" },
      { label: "유치권", href: "/columns?field=realestate" },
    ],
  },
  {
    id: "divorce" as const,
    label: "이혼",
    href: "/columns?field=divorce",
    children: [
      { label: "협의이혼", href: "/columns?field=divorce" },
      { label: "재판이혼", href: "/columns?field=divorce" },
      { label: "양육권·양육비", href: "/columns?field=divorce" },
      { label: "재산분할", href: "/columns?field=divorce" },
    ],
  },
  {
    id: "other" as const,
    label: "기타",
    href: "/columns?field=other",
    children: [
      { label: "상담 준비", href: "/columns?field=other" },
      { label: "일반 민사", href: "/columns?field=other" },
    ],
  },
] as const;
