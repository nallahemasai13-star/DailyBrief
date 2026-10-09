import { createServerFn } from "@tanstack/react-start";
import { filterSample } from "./sample";
import { articleId, CATEGORIES, type Article, type Category, type NewsResponse } from "./types";

interface NewsApiArticle {
  source: { name: string | null };
  author: string | null;
  title: string | null;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export const fetchNews = createServerFn({ method: "GET" })
  .inputValidator((input: { category?: string | undefined; q?: string | undefined }) => {
    const category = CATEGORIES.includes(input.category as Category)
      ? (input.category as Category)
      : undefined;
    const q = typeof input.q === "string" ? input.q.slice(0, 100).trim() : undefined;
    return { category, q: q || undefined };
  })
  .handler(async ({ data }): Promise<NewsResponse> => {
    const key = process.env["NEWS_API_KEY"];
    if (!key) return { articles: filterSample(data), sample: true };

    const params = new URLSearchParams({ pageSize: "30", language: "en" });
    let endpoint = "top-headlines";
    if (data.q) {
      endpoint = "everything";
      params.set("q", data.q);
      params.set("sortBy", "publishedAt");
    } else {
      params.delete("language");
      params.set("country", "us");
      if (data.category) params.set("category", data.category);
    }

    const res = await fetch(`https://newsapi.org/v2/${endpoint}?${params}`, {
      headers: { "X-Api-Key": key, "User-Agent": "DailyBrief/1.0" },
    });
    const json = (await res.json()) as { status: string; message?: string; articles?: NewsApiArticle[] };
    if (!res.ok || json.status !== "ok") {
      throw new Error(json.message || `News service error (${res.status})`);
    }

    const articles: Article[] = (json.articles ?? [])
      .filter((a) => a.title && a.title !== "[Removed]" && a.url)
      .map((a) => ({
        id: articleId(a.url),
        title: a.title!,
        description: a.description ?? "",
        content: a.content?.replace(/\s*\[\+\d+ chars\]$/, "") ?? undefined,
        url: a.url,
        image: a.urlToImage,
        source: a.source.name ?? "Unknown source",
        author: a.author,
        publishedAt: a.publishedAt,
        category: data.category,
      }));
    return { articles, sample: false };
  });
