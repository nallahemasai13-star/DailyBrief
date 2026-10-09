import { useSyncExternalStore } from "react";
import type { Article } from "./types";

/** Tiny localStorage-backed store with subscribe support. */
function createStore<T>(key: string, fallback: T) {
  const listeners = new Set<() => void>();
  let cache: T | undefined;
  const read = (): T => {
    if (cache !== undefined) return cache;
    if (typeof window === "undefined") return fallback;
    try {
      cache = JSON.parse(localStorage.getItem(key) ?? "null") ?? fallback;
    } catch {
      cache = fallback;
    }
    return cache as T;
  };
  const write = (v: T) => {
    cache = v;
    try {
      localStorage.setItem(key, JSON.stringify(v));
    } catch {
      /* storage full */
    }
    listeners.forEach((l) => l());
  };
  const subscribe = (l: () => void) => {
    listeners.add(l);
    return () => listeners.delete(l);
  };
  return { read, write, subscribe, fallback };
}

const EMPTY: Article[] = [];
const bookmarkStore = createStore<Article[]>("dailybrief:bookmarks", EMPTY);
const cacheStore = createStore<Article[]>("dailybrief:recent", EMPTY);

export function useBookmarks() {
  const bookmarks = useSyncExternalStore(bookmarkStore.subscribe, bookmarkStore.read, () => EMPTY);
  const isSaved = (id: string) => bookmarks.some((b) => b.id === id);
  const toggle = (a: Article) => {
    const cur = bookmarkStore.read();
    bookmarkStore.write(cur.some((b) => b.id === a.id) ? cur.filter((b) => b.id !== a.id) : [a, ...cur]);
  };
  return { bookmarks, isSaved, toggle };
}

export function rememberArticles(list: Article[]) {
  if (typeof window === "undefined") return;
  const ids = new Set(list.map((a) => a.id));
  cacheStore.write([...list, ...cacheStore.read().filter((a) => !ids.has(a.id))].slice(0, 200));
}

export function findArticle(id: string): Article | undefined {
  return cacheStore.read().find((a) => a.id === id) ?? bookmarkStore.read().find((a) => a.id === id);
}
