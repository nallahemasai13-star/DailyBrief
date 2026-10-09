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
      className="group flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-muted">
        <ArticleImage src={article.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
        <BookmarkButton article={article} className="absolute right-2 top-2" />
      </div>
      <div className="flex flex-1 flex-col gap-2 pt-4">
        {article.category && (
          <span className="text-xs font-bold uppercase tracking-widest text-primary">{capitalize(article.category)}</span>
        )}
        <h3 className="line-clamp-2-safe text-xl font-semibold leading-snug group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">{article.title}</h3>
        {article.description && <p className="line-clamp-2-safe text-sm leading-relaxed text-muted-foreground">{article.description}</p>}
        <div className="mt-auto pt-1 text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">{article.source}</span> ·{" "}
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
        </div>
      </div>
    </Link>
  );
}
