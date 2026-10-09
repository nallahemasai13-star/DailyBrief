import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ExternalLink, FileQuestion } from "lucide-react";
import { findArticle } from "@/lib/news/store";
import { SAMPLE_ARTICLES } from "@/lib/news/sample";
import type { Article } from "@/lib/news/types";
import { formatDate, capitalize } from "@/lib/format";
import { ArticleImage } from "@/components/news/ArticleImage";
import { BookmarkButton } from "@/components/news/ArticleCard";
import { EmptyState } from "@/components/news/States";

export const Route = createFileRoute("/article/$id")({
  head: () => ({
    meta: [
      { title: "Article — DailyBrief" },
      { name: "description", content: "Read the full story summary on DailyBrief." },
      { property: "og:title", content: "Article — DailyBrief" },
      { property: "og:description", content: "Read the full story summary on DailyBrief." },
    ],
  }),
  component: ArticlePage,
});

function ArticlePage() {
  const { id } = Route.useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null | undefined>(undefined);

  useEffect(() => {
    setArticle(findArticle(id) ?? SAMPLE_ARTICLES.find((a) => a.id === id) ?? null);
  }, [id]);

  useEffect(() => {
    if (article) document.title = `${article.title} — DailyBrief`;
  }, [article]);

  const back = (
    <button onClick={() => router.history.back()} className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary">
      <ArrowLeft className="h-4 w-4" /> Back
    </button>
  );

  if (article === undefined) {
    return <div className="mx-auto max-w-3xl space-y-4" role="status" aria-label="Loading article"><div className="h-10 w-3/4 animate-pulse rounded bg-muted" /><div className="aspect-video animate-pulse rounded-2xl bg-muted" /></div>;
  }
  if (article === null) {
    return (
      <div className="mx-auto max-w-3xl space-y-4">
        {back}
        <EmptyState icon={<FileQuestion className="h-8 w-8" />} title="Article not found">
          This story is no longer available. <Link to="/" className="font-semibold text-primary">Go to top stories</Link>
        </EmptyState>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl space-y-6">
      {back}
      <header className="space-y-3">
        {article.category && <span className="text-sm font-semibold uppercase tracking-wider text-primary">{capitalize(article.category)}</span>}
        <h1 className="text-3xl font-semibold leading-tight sm:text-5xl">{article.title}</h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{article.source}</span>
          {article.author && <span>by {article.author}</span>}
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          <BookmarkButton article={article} className="ml-auto border" />
        </div>
      </header>
      <ArticleImage src={article.image} alt={article.title} className="aspect-video w-full rounded-2xl object-cover" />
      {article.description && <p className="font-serif text-xl leading-relaxed">{article.description}</p>}
      {article.content && article.content !== article.description && <p className="leading-relaxed text-muted-foreground">{article.content}</p>}
      <a href={article.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90">
        Read full article at {article.source} <ExternalLink className="h-4 w-4" />
      </a>
    </article>
  );
}
