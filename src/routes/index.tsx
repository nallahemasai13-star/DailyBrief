import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { newsQuery } from "@/lib/news/queries";
import { CATEGORIES, type Category } from "@/lib/news/types";
import { capitalize } from "@/lib/format";
import { CategoryBar } from "@/components/news/CategoryBar";
import { FeaturedArticle, HeadlineItem } from "@/components/news/FeaturedArticle";
import { ArticleGrid, EmptyState, ErrorState, GridSkeleton, SampleBanner } from "@/components/news/States";
import { Newspaper } from "lucide-react";

export const Route = createFileRoute("/")({
  validateSearch: (s: Record<string, unknown>): { category?: Category } =>
    CATEGORIES.includes(s["category"] as Category) ? { category: s["category"] as Category } : {},
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

function SectionTitle({ children }: { children: string }) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <h2 className="text-sm font-bold uppercase tracking-[0.2em]">{children}</h2>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

function Home() {
  const { category } = Route.useSearch();
  const { data, isPending, error, refetch } = useQuery(newsQuery({ category }));
  const [featured, ...rest] = data?.articles ?? [];
  const headlines = rest.slice(0, 4);
  const latest = rest.length > 6 ? rest.slice(4) : rest;

  return (
    <div className="space-y-10">
      <div className="md:hidden space-y-4">
        <h1 className="text-3xl font-semibold">{category ? capitalize(category) : "Top stories"}</h1>
        <CategoryBar active={category} />
      </div>
      <h1 className="sr-only md:not-sr-only md:text-sm md:font-bold md:uppercase md:tracking-[0.2em] md:text-muted-foreground">
        {category ? capitalize(category) : "Top stories"}
      </h1>
      {data?.sample && <SampleBanner />}
      {isPending ? (
        <>
          <div className="aspect-[16/7] animate-pulse rounded-lg bg-muted" />
          <GridSkeleton />
        </>
      ) : error ? (
        <ErrorState message={error.message} onRetry={() => refetch()} />
      ) : !featured ? (
        <EmptyState icon={<Newspaper className="h-8 w-8" />} title="No articles right now">Please check back later.</EmptyState>
      ) : (
        <>
          <section className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2"><FeaturedArticle article={featured} /></div>
            {headlines.length > 0 && (
              <aside className="lg:border-l lg:pl-8">
                <SectionTitle>Top headlines</SectionTitle>
                {headlines.map((a, i) => <HeadlineItem key={a.id} article={a} index={i + 1} />)}
              </aside>
            )}
          </section>
          {latest.length > 0 && (
            <section className="border-t-2 border-foreground pt-6">
              <SectionTitle>Latest news</SectionTitle>
              <ArticleGrid articles={latest} />
            </section>
          )}
        </>
      )}
    </div>
  );
}
