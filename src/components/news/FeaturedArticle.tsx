import { Link } from "@tanstack/react-router";
import type { Article } from "@/lib/news/types";
import { formatDate, capitalize } from "@/lib/format";
import { ArticleImage } from "./ArticleImage";
import { BookmarkButton } from "./ArticleCard";

export function FeaturedArticle({ article }: { article: Article }) {
  return (
    <Link to="/article/$id" params={{ id: article.id }} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      <div className="relative overflow-hidden rounded-lg bg-muted">
        <ArticleImage src={article.image} alt="" className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-[1.02]" />
        <BookmarkButton article={article} className="absolute right-3 top-3" />
      </div>
      <p className="mt-4 text-xs font-bold uppercase tracking-widest text-primary">
        {article.category ? capitalize(article.category) : "Top story"}
      </p>
      <h2 className="mt-2 text-3xl font-semibold leading-tight group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4 sm:text-4xl">
        {article.title}
      </h2>
      {article.description && <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{article.description}</p>}
      <p className="mt-3 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{article.source}</span> · {formatDate(article.publishedAt)}
      </p>
    </Link>
  );
}

export function HeadlineItem({ article, index }: { article: Article; index: number }) {
  return (
    <Link to="/article/$id" params={{ id: article.id }} className="group flex gap-4 border-b py-4 first:pt-0 last:border-0">
      <span className="font-serif text-3xl font-bold leading-none text-primary/40">{index}</span>
      <div className="min-w-0">
        <h3 className="text-base font-semibold leading-snug group-hover:text-primary">{article.title}</h3>
        <p className="mt-1 text-xs text-muted-foreground">{article.source} · {formatDate(article.publishedAt)}</p>
      </div>
    </Link>
  );
}
