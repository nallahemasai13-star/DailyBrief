import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { Search as SearchIcon, SearchX } from "lucide-react";
import { newsQuery } from "@/lib/news/queries";
import { ArticleGrid, EmptyState, ErrorState, GridSkeleton, SampleBanner } from "@/components/news/States";

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>): { q?: string } =>
    typeof s["q"] === "string" && s["q"].trim() ? { q: s["q"].trim() } : {},
  head: () => ({
    meta: [
      { title: "Search news — DailyBrief" },
      { name: "description", content: "Search the latest news articles by keyword on DailyBrief." },
      { property: "og:title", content: "Search news — DailyBrief" },
      { property: "og:description", content: "Find news stories on any topic by keyword." },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate({ from: "/search" });
  const [value, setValue] = useState(q ?? "");
  const { data, isFetching, error, refetch } = useQuery({ ...newsQuery({ q }), enabled: !!q });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    navigate({ search: value.trim() ? { q: value.trim() } : {} });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold sm:text-4xl">Search</h1>
      <form onSubmit={submit} role="search" className="flex gap-2">
        <label htmlFor="q" className="sr-only">Search news</label>
        <div className="relative flex-1">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <input id="q" name="q" type="search" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Search for topics, e.g. climate, AI, football" maxLength={100} className="h-12 w-full rounded-full border bg-card pl-11 pr-4 text-base outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <button type="submit" className="h-12 rounded-full bg-primary px-6 font-semibold text-primary-foreground hover:bg-primary/90">Search</button>
      </form>
      {!q ? (
        <EmptyState icon={<SearchIcon className="h-8 w-8" />} title="Find any story">Type a keyword above to search the news.</EmptyState>
      ) : isFetching && !data ? (
        <GridSkeleton />
      ) : error ? (
        <ErrorState message={error.message} onRetry={() => refetch()} />
      ) : data && data.articles.length === 0 ? (
        <EmptyState icon={<SearchX className="h-8 w-8" />} title={`No results for "${q}"`}>Try a different or broader keyword.</EmptyState>
      ) : data ? (
        <>
          {data.sample && <SampleBanner />}
          <p className="text-sm text-muted-foreground">{data.articles.length} results for "{q}"</p>
          <ArticleGrid articles={data.articles} />
        </>
      ) : null}
    </div>
  );
}
