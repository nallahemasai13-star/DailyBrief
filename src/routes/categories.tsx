import { createFileRoute, Link } from "@tanstack/react-router";
import { Briefcase, Clapperboard, Cpu, FlaskConical, HeartPulse, Trophy } from "lucide-react";
import { CATEGORIES, type Category } from "@/lib/news/types";
import { capitalize } from "@/lib/format";

const ICONS: Record<Category, typeof Cpu> = {
  technology: Cpu, business: Briefcase, sports: Trophy, health: HeartPulse, science: FlaskConical, entertainment: Clapperboard,
};

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "News categories — DailyBrief" },
      { name: "description", content: "Browse news by technology, business, sports, health, science and entertainment." },
      { property: "og:title", content: "News categories — DailyBrief" },
      { property: "og:description", content: "Pick a topic and read the latest headlines." },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold sm:text-4xl">Categories</h1>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {CATEGORIES.map((c) => {
          const Icon = ICONS[c];
          return (
            <Link key={c} to="/" search={{ category: c }} className="group flex flex-col gap-4 rounded-2xl border bg-card p-5 transition hover:-translate-y-0.5 hover:border-primary hover:shadow-lg sm:p-6">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <span className="font-serif text-xl font-semibold">{capitalize(c)}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
