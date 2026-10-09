import { Link } from "@tanstack/react-router";
import type { Article } from "@/lib/news/types";
import { formatDate } from "@/lib/format";
import { ArticleImage } from "./ArticleImage";
import { BookmarkButton } from "./ArticleCard";

export function FeaturedArticle({ article }: { article: Article }) {
  return (
    <Link
      to="/article/$id"
      params={{ id: article.id }}
      className="group relative block overflow-hidden rounded-3xl bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <ArticleImage src={article.image} alt="" className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105 sm:aspect-[16/8]" />
      <div className="absolute inset-0 bg-gradient-to-t from-overlay via-overlay/40 to-transparent" />
      <BookmarkButton article={article} className="absolute right-4 top-4" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-overlay-foreground sm:p-8 lg:max-w-3xl">
        <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-foreground">Featured</span>
        <h2 className="mt-3 text-2xl font-semibold leading-tight sm:text-4xl">{article.title}</h2>
        {article.description && <p className="mt-2 line-clamp-2-safe text-sm opacity-90 sm:text-base">{article.description}</p>}
        <p className="mt-3 text-xs font-medium opacity-80">
          {article.source} · {formatDate(article.publishedAt)}
        </p>
      </div>
    </Link>
  );
}
