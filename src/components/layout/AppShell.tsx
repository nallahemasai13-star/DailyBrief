import { Link } from "@tanstack/react-router";
import { Bookmark, Home, LayoutGrid, Moon, Search, Sun } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

const NAV = [
  { to: "/", label: "Home", icon: Home },
  { to: "/search", label: "Search", icon: Search },
  { to: "/categories", label: "Categories", icon: LayoutGrid },
  { to: "/bookmarks", label: "Bookmarks", icon: Bookmark },
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
    <button onClick={flip} aria-label={dark ? "Switch to light theme" : "Switch to dark theme"} className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-card hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <header className="sticky top-0 z-30 border-b bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4">
          <Link to="/" className="font-serif text-2xl font-bold tracking-tight">
            Daily<span className="text-primary">Brief</span>
          </Link>
          <nav aria-label="Main" className="hidden flex-1 items-center gap-1 md:flex">
            {NAV.map(({ to, label }) => (
              <Link key={to} to={to} activeOptions={{ exact: to === "/", includeSearch: false }} className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground" activeProps={{ className: "bg-accent text-accent-foreground" }}>
                {label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto"><ThemeToggle /></div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6 sm:py-8">{children}</main>
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
