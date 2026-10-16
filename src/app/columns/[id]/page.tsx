import { ColumnArticle } from "@/components/column-article";
import { SitePageFrame } from "@/components/site-page-frame";
import { COLUMN_BODIES } from "@/data/column-articles";
import { INSIGHT_ARTICLES } from "@/data/insights";
import { IBM_Plex_Sans_KR } from "next/font/google";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const ibmSans = IBM_Plex_Sans_KR({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
  variable: "--font-ibm-sans",
});

type ColumnPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return INSIGHT_ARTICLES.map((article) => ({ id: article.id }));
}

export async function generateMetadata({
  params,
}: ColumnPageProps): Promise<Metadata> {
  const { id } = await params;
  const article = INSIGHT_ARTICLES.find((item) => item.id === id);
  if (!article) return { title: "이로운 칼럼" };
  return {
    title: `${article.title} | 이로운 칼럼`,
    description: COLUMN_BODIES[article.id]?.lead ?? article.title,
  };
}

export default async function ColumnPage({ params }: ColumnPageProps) {
  const { id } = await params;
  const article = INSIGHT_ARTICLES.find((item) => item.id === id);
  const body = article ? COLUMN_BODIES[article.id] : undefined;
  if (!article || !body) notFound();

  const related = INSIGHT_ARTICLES.filter((item) => item.id !== article.id).slice(0, 2);

  return (
    <div className={ibmSans.variable}>
      <SitePageFrame tone="none">
        <ColumnArticle
          article={article}
          lead={body.lead}
          sections={body.sections}
          related={related}
        />
      </SitePageFrame>
    </div>
  );
}
