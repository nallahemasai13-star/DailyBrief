import { AlertTriangle, Info } from "lucide-react";
import type { ReactNode } from "react";
import type { Article } from "@/lib/news/types";
import { ArticleCard } from "./ArticleCard";

export function CardSkeleton() {
  return (
    <div aria-hidden>
      <div className="aspect-[16/10] animate-pulse rounded-lg bg-muted" />
      <div className="space-y-3 pt-4">
        <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
        <div className="h-5 w-full animate-pulse rounded bg-muted" />
        <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3" role="status" aria-label="Loading articles">
      {Array.from({ length: count }).map((_, i) => <CardSkeleton key={i} />)}
    </div>
  );
}

export function ArticleGrid({ articles }: { articles: Article[] }) {
  return (
    <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((a) => <ArticleCard key={a.id} article={a} />)}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div role="alert" className="flex flex-col items-center gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 p-8 text-center">
      <AlertTriangle className="h-8 w-8 text-destructive" aria-hidden />
      <p className="font-semibold">Couldn't load news</p>
      <p className="text-sm text-muted-foreground">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
          Try again
        </button>
      )}
    </div>
  );
}

export function EmptyState({ icon, title, children }: { icon: ReactNode; title: string; children?: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed p-10 text-center">
      <div className="text-muted-foreground">{icon}</div>
      <p className="text-lg font-semibold">{title}</p>
      {children && <div className="text-sm text-muted-foreground">{children}</div>}
    </div>
  );
}

export function SampleBanner() {
  return (
    <div className="flex items-start gap-2 rounded-xl bg-accent px-4 py-3 text-sm text-accent-foreground">
      <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      <span><strong>Sample articles.</strong> No news API key is configured, so demo content is shown.</span>
    </div>
  );
}
