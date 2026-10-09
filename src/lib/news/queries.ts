import { queryOptions } from "@tanstack/react-query";
import { fetchNews } from "./news.functions";
import { rememberArticles } from "./store";
import type { Category } from "./types";

export const newsQuery = (opts: { category?: Category | undefined; q?: string | undefined }) =>
  queryOptions({
    queryKey: ["news", opts.category ?? "all", opts.q ?? ""],
    queryFn: async () => {
      const res = await fetchNews({ data: opts });
      rememberArticles(res.articles);
      return res;
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
