export const CATEGORIES = [
  "technology",
  "business",
  "sports",
  "health",
  "science",
  "entertainment",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Article {
  id: string;
  title: string;
  description: string;
  content?: string;
  url: string;
  image: string | null;
  source: string;
  author?: string | null;
  publishedAt: string;
  category?: Category;
}

export interface NewsResponse {
  articles: Article[];
  /** true when sample articles are returned because no API key is configured */
  sample: boolean;
}

export function articleId(url: string): string {
  let h = 5381;
  for (let i = 0; i < url.length; i++) h = ((h << 5) + h + url.charCodeAt(i)) >>> 0;
  return h.toString(36);
}
