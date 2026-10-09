<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture
- News is fetched only via the server function in src/lib/news/news.functions.ts — keeps the API key server-side; it falls back to labeled sample data when no key is set.
- Bookmarks and the recently-seen article cache live in localStorage (src/lib/news/store.ts) — no accounts needed; the article detail page resolves articles from that cache.
