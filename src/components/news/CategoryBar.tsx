import { Link } from "@tanstack/react-router";
import { CATEGORIES, type Category } from "@/lib/news/types";
import { capitalize } from "@/lib/format";

export function CategoryBar({ active }: { active?: Category }) {
  const base = "shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  const on = "border-primary bg-primary text-primary-foreground";
  const off = "bg-card text-foreground hover:border-primary hover:text-primary";
  return (
    <nav aria-label="News categories" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
      <Link to="/" search={{}} className={`${base} ${!active ? on : off}`} aria-current={!active ? "page" : undefined}>
        Top stories
      </Link>
      {CATEGORIES.map((c) => (
        <Link key={c} to="/" search={{ category: c }} className={`${base} ${active === c ? on : off}`} aria-current={active === c ? "page" : undefined}>
          {capitalize(c)}
        </Link>
      ))}
    </nav>
  );
}
