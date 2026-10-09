import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark } from "lucide-react";
import { useBookmarks } from "@/lib/news/store";
import { ArticleGrid, EmptyState } from "@/components/news/States";

export const Route = createFileRoute("/bookmarks")({
  head: () => ({
    meta: [
      { title: "Saved articles — DailyBrief" },
      { name: "description", content: "Your bookmarked news articles on DailyBrief." },
      { property: "og:title", content: "Saved articles — DailyBrief" },
      { property: "og:description", content: "Keep the stories that matter to you." },
    ],
  }),
  component: BookmarksPage,
});

function BookmarksPage() {
  const { bookmarks } = useBookmarks();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold sm:text-4xl">Bookmarks</h1>
      {bookmarks.length === 0 ? (
        <EmptyState icon={<Bookmark className="h-8 w-8" />} title="No saved articles yet">
          Tap the bookmark icon on any story to save it.{" "}
          <Link to="/" className="font-semibold text-primary">Browse news</Link>
        </EmptyState>
      ) : (
        <ArticleGrid articles={bookmarks} />
      )}
    </div>
  );
}
