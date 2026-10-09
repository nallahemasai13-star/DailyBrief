import { Link } from "@tanstack/react-router";
import { Bookmark, Home, LayoutGrid, Moon, Search, Sun } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { CATEGORIES } from "@/lib/news/types";
import { capitalize } from "@/lib/format";

const NAV = [
  { to: "/", label: "Home", icon: Home },
  { to: "/search", label: "Search", icon: Search },
  { to: "/categories", label: "Categories", icon: LayoutGrid },
  { to: "/bookmarks", label: "Saved", icon: Bookmark },
] as const;

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("dailybrief:theme");
    const d = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(d);
    document.documentElement.classList.toggle("dark", d);
  }, []);
  const flip = () => {
    const d = !dark;
    setDark(d);
    document.documentElement.classList.toggle("dark", d);
    localStorage.setItem("dailybrief:theme", d ? "dark" : "light");
  };
  return (
    <button onClick={flip} aria-label={dark ? "Switch to light theme" : "Switch to dark theme"} className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

function Today() {
  const [d, setD] = useState("");
  useEffect(() => setD(new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })), []);
  return <span>{d}</span>;
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <header className="border-b bg-background">
        <div className="mx-auto flex h-10 max-w-6xl items-center justify-between px-4 text-xs text-muted-foreground">
          <Today />
          <div className="flex items-center gap-1">
            <Link to="/search" className="hidden h-8 w-8 items-center justify-center rounded-md hover:bg-muted hover:text-foreground md:inline-flex" aria-label="Search">
              <Search className="h-4 w-4" />
            </Link>
            <Link to="/bookmarks" className="hidden h-8 items-center gap-1.5 rounded-md px-2 font-medium hover:bg-muted hover:text-foreground md:inline-flex">
              <Bookmark className="h-4 w-4" /> Saved
            </Link>
            <ThemeToggle />
          </div>
        </div>
        <div className="mx-auto max-w-6xl border-t px-4 py-5 text-center">
          <Link to="/" className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">
            Daily<span className="text-primary">Brief</span>
          </Link>
          <p className="mt-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">Independent news, clearly told</p>
        </div>
      </header>
      <nav aria-label="Sections" className="sticky top-0 z-30 hidden border-b-2 border-foreground bg-background/95 backdrop-blur md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-1 px-4">
          <Link to="/" search={{}} activeOptions={{ exact: true, includeSearch: true }} className="border-b-2 border-transparent px-3 py-3 text-sm font-semibold text-muted-foreground hover:text-foreground" activeProps={{ className: "!border-primary !text-foreground" }}>
            Top Stories
          </Link>
          {CATEGORIES.map((c) => (
            <Link key={c} to="/" search={{ category: c }} activeOptions={{ includeSearch: true }} className="border-b-2 border-transparent px-3 py-3 text-sm font-semibold text-muted-foreground hover:text-foreground" activeProps={{ className: "!border-primary !text-foreground" }}>
              {capitalize(c)}
            </Link>
          ))}
        </div>
      </nav>
      <main className="mx-auto max-w-6xl px-4 py-6 sm:py-10">{children}</main>
      <footer className="hidden border-t py-8 text-center text-xs text-muted-foreground md:block">
        © {new Date().getFullYear()} DailyBrief · A college project news reader
      </footer>
      <nav aria-label="Mobile" className="fixed inset-x-0 bottom-0 z-30 border-t bg-background/95 backdrop-blur md:hidden">
        <div className="grid grid-cols-4">
          {NAV.map(({ to, label, icon: Icon }) => (
            <Link key={to} to={to} activeOptions={{ exact: to === "/", includeSearch: false }} className="flex flex-col items-center gap-1 py-2.5 text-xs font-medium text-muted-foreground" activeProps={{ className: "text-primary" }}>
              <Icon className="h-5 w-5" aria-hidden />
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
