export type CaseCategory =
  | "inheritance"
  | "criminal"
  | "realestate"
  | "divorce"
  | "civil";

export type WinningCaseItem = {
  id: string;
  category: CaseCategory;
  categoryLabel: string;
  center: string;
  title: string;
  image: string;
  href: string;
};

export const CASE_ITEMS: WinningCaseItem[] = [
  {
    id: "1",
    category: "inheritance",
    categoryLabel: "상속",
    center: "이로운 상속전문센터",
    title: "상속재산분할 17억 규모 전액 방어",
    image: "/images/practice/inheritance.png",
    href: "/practice/inheritance",
  },
  {
    id: "2",
    category: "realestate",
    categoryLabel: "부동산",
    center: "이로운 부동산전문센터",
    title: "보증금 4억 4천만원 반환",
    image: "/images/cases/deposit.jpg",
    href: "/practice/real-estate",
  },
  {
    id: "6",
    category: "criminal",
    categoryLabel: "형사",
    center: "이로운 형사전문센터",
    title: "피해금 회수 절차 성공",
    image: "/images/cases/recovery.jpg",
    href: "/practice/criminal",
  },
  {
    id: "4",
    category: "civil",
    categoryLabel: "민사",
    center: "이로운 민사전문센터",
    title: "청구액 전액 인용 판결",
    image: "/images/cases/judgment.jpg",
    href: "/practice/civil",
  },
  {
    id: "5",
    category: "divorce",
    categoryLabel: "이혼",
    center: "이로운 이혼전문센터",
    title: "양육권 · 재산분할 유리한 조정",
    image: "/images/cases/custody.jpg",
    href: "/practice/divorce",
  },
  {
    id: "3",
    category: "criminal",
    categoryLabel: "형사",
    center: "이로운 형사전문센터",
    title: "무혐의 종결, 수사 종결",
    image: "/images/cases/no-charge.jpg?v=3",
    href: "/practice/criminal",
  },
];

export const CASE_FILTERS = [
  { id: "all" as const, label: "전체사례", href: "/cases" },
  { id: "inheritance" as const, label: "상속", href: "/cases?field=inheritance" },
  { id: "criminal" as const, label: "형사", href: "/cases?field=criminal" },
  { id: "realestate" as const, label: "부동산", href: "/cases?field=realestate" },
  { id: "divorce" as const, label: "이혼", href: "/cases?field=divorce" },
  { id: "civil" as const, label: "민사", href: "/cases?field=civil" },
] as const;
