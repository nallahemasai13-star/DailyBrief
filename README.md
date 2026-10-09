# DailyBrief — News Reader

A modern, responsive news reader built with React, TypeScript, TanStack Start and Tailwind CSS.

## Features
- Top stories with a featured headline and article cards
- Categories: Technology, Business, Sports, Health, Science, Entertainment
- Keyword search with empty-result messaging
- Article detail page with link to the original publisher
- Bookmarks saved in the browser (persist between sessions)
- Light / dark theme, mobile bottom navigation, desktop top navigation
- Loading skeletons and error states

## Setup
```bash
bun install
bun run dev
```

## News API
Articles come from [NewsAPI.org](https://newsapi.org). The key is read **only on the server** (`src/lib/news/news.functions.ts`) from the `NEWS_API_KEY` environment variable and is never sent to the browser.

If `NEWS_API_KEY` is not set, the app shows clearly labeled sample articles so it can still be demonstrated.

## Structure
```
src/
  components/layout   App shell + navigation
  components/news     Cards, featured story, states, category bar
  lib/news            Types, server function, sample data, bookmarks store
  routes              Pages: /, /search, /categories, /bookmarks, /article/$id
```

## Tests
```bash
bunx vitest run
```
