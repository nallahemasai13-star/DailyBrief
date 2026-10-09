import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { newsQuery } from "@/lib/news/queries";
import { CATEGORIES, type Category } from "@/lib/news/types";
import { capitalize } from "@/lib/format";
import { CategoryBar } from "@/components/news/CategoryBar";
import { FeaturedArticle } from "@/components/news/FeaturedArticle";
import { ArticleGrid, EmptyState, ErrorState, GridSkeleton, SampleBanner } from "@/components/news/States";
import { Newspaper } from "lucide-react";

export const Route = createFileRoute("/")({
  validateSearch: (s: Record<string, unknown>): { category?: Category } =>
    CATEGORIES.includes(s.category as Category) ? { category: s.category as Category } : {},
  head: () => ({
    meta: [
      { title: "DailyBrief — Today's top news, beautifully curated" },
      { name: "description", content: "Read the latest headlines in technology, business, sports, health, science and entertainment." },
      { property: "og:title", content: "DailyBrief — Today's top news" },
      { property: "og:description", content: "The latest headlines across six categories in a clean, editorial reader." },
    ],
  }),
  component: Home,
});

function Home() {
  const { category } = Route.useSearch();
  const { data, isPending, error, refetch } = useQuery(newsQuery({ category }));
  const [featured, ...rest] = data?.articles ?? [];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-muted-foreground">
          {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </p>
        <h1 className="text-3xl font-semibold sm:text-4xl">{category ? capitalize(category) : "Top stories"}</h1>
      </div>
      <CategoryBar active={category} />
      {data?.sample && <SampleBanner />}
      {isPending ? (
        <>
          <div className="aspect-[4/5] animate-pulse rounded-3xl bg-muted sm:aspect-[16/8]" />
          <GridSkeleton />
        </>
      ) : error ? (
        <ErrorState message={error.message} onRetry={() => refetch()} />
      ) : !featured ? (
        <EmptyState icon={<Newspaper className="h-8 w-8" />} title="No articles right now">Please check back later.</EmptyState>
      ) : (
        <>
          <FeaturedArticle article={featured} />
          <h2 className="pt-2 text-2xl font-semibold">Latest news</h2>
          <ArticleGrid articles={rest} />
        </>
      )}
    </div>
  );
}
