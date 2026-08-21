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

export const INSIGHT_CATEGORY_LABEL: Record<InsightCategory, string> = {
  inheritance: "상속",
  criminal: "형사",
  realestate: "부동산",
  divorce: "이혼",
  other: "기타",
};

export const INSIGHT_ARTICLES: InsightArticle[] = [
  {
    id: "1",
    category: "criminal",
    categoryLabel: INSIGHT_CATEGORY_LABEL.criminal,
    date: "19. August 2026",
    datetime: "2026-08-19",
    author: "",
    title: "수사 초기, 진술 전에 꼭 알아두어야 할 것들",
    image: "/images/insights/mailbox.png",
    href: "/insights/1",
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
    href: "/insights/2",
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
    href: "/insights/3",
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
    href: "/insights/4",
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
    href: "/insights/5",
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
    href: "/insights/6",
  },
];

export const INSIGHT_FILTERS = [
  { id: "all" as const, label: "전체칼럼", href: "/insights" },
  {
    id: "inheritance" as const,
    label: "상속",
    href: "/insights?field=inheritance",
    children: [
      { label: "상속재산분할", href: "/insights?field=inheritance" },
      { label: "유류분반환청구", href: "/insights?field=inheritance" },
      { label: "성년후견인", href: "/insights?field=inheritance" },
      { label: "친양자입양", href: "/insights?field=inheritance" },
      { label: "공유물분할청구소송", href: "/insights?field=inheritance" },
    ],
  },
  {
    id: "criminal" as const,
    label: "형사",
    href: "/insights?field=criminal",
    children: [
      { label: "교통사고", href: "/insights?field=criminal" },
      { label: "학교폭력", href: "/insights?field=criminal" },
    ],
  },
  {
    id: "realestate" as const,
    label: "부동산",
    href: "/insights?field=realestate",
    children: [
      { label: "전세보증금 반환", href: "/insights?field=realestate" },
      { label: "명도소송", href: "/insights?field=realestate" },
      { label: "소유권이전등기", href: "/insights?field=realestate" },
      { label: "유치권", href: "/insights?field=realestate" },
    ],
  },
  {
    id: "divorce" as const,
    label: "이혼",
    href: "/insights?field=divorce",
    children: [
      { label: "협의이혼", href: "/insights?field=divorce" },
      { label: "재판이혼", href: "/insights?field=divorce" },
      { label: "양육권·양육비", href: "/insights?field=divorce" },
      { label: "재산분할", href: "/insights?field=divorce" },
    ],
  },
  {
    id: "other" as const,
    label: "기타",
    href: "/insights?field=other",
    children: [
      { label: "상담 준비", href: "/insights?field=other" },
      { label: "일반 민사", href: "/insights?field=other" },
    ],
  },
] as const;
