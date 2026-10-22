import { ColumnArticle } from "@/components/column-article";
import { SitePageFrame } from "@/components/site-page-frame";
import { columnBodyFor } from "@/data/column-articles";
import { findColumnArticle, INSIGHT_ARTICLES, columnSlug } from "@/data/insights";
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
  return INSIGHT_ARTICLES.map((article) => ({ id: columnSlug(article.title) }));
}

export async function generateMetadata({
  params,
}: ColumnPageProps): Promise<Metadata> {
  const { id } = await params;
  const article = findColumnArticle(id);
  if (!article) return { title: "이로운 칼럼" };
  return {
    title: `${article.title} | 이로운 칼럼`,
    description: columnBodyFor(article).lead,
  };
}

export default async function ColumnPage({ params }: ColumnPageProps) {
  const { id } = await params;
  const article = findColumnArticle(id);
  if (!article) notFound();
  const body = columnBodyFor(article);

  const related = INSIGHT_ARTICLES.filter((item) => item.id !== article.id).slice(0, 2);

  return (
    <div className={ibmSans.variable}>
      <SitePageFrame tone="cream">
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
