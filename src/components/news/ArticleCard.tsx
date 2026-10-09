import { Link } from "@tanstack/react-router";
import { Bookmark } from "lucide-react";
import type { Article } from "@/lib/news/types";
import { formatDate, capitalize } from "@/lib/format";
import { useBookmarks } from "@/lib/news/store";
import { ArticleImage } from "./ArticleImage";

export function BookmarkButton({ article, className = "" }: { article: Article; className?: string }) {
  const { isSaved, toggle } = useBookmarks();
  const saved = isSaved(article.id);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(article);
      }}
      aria-pressed={saved}
      aria-label={saved ? "Remove bookmark" : "Save article"}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full bg-card/90 text-foreground shadow-sm backdrop-blur transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${className}`}
    >
      <Bookmark className={`h-4 w-4 ${saved ? "fill-primary text-primary" : ""}`} />
    </button>
  );
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      to="/article/$id"
      params={{ id: article.id }}
      className="group flex flex-col overflow-hidden rounded-2xl border bg-card transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <ArticleImage src={article.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <BookmarkButton article={article} className="absolute right-3 top-3" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <span className="text-primary">{article.source}</span>
          <span aria-hidden>•</span>
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          {article.category && (
            <span className="ml-auto rounded-full bg-accent px-2 py-0.5 text-accent-foreground">{capitalize(article.category)}</span>
          )}
        </div>
        <h3 className="line-clamp-2-safe text-lg font-semibold leading-snug group-hover:text-primary">{article.title}</h3>
        {article.description && <p className="line-clamp-2-safe text-sm text-muted-foreground">{article.description}</p>}
      </div>
    </Link>
  );
}
