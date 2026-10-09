import { articleId, type Article, type Category } from "./types";

const raw: Array<Omit<Article, "id" | "image"> & { seed: string }> = [
  { seed: "chip", category: "technology", source: "Tech Ledger", title: "New AI chips promise to halve data-center energy use", description: "A wave of specialized processors aims to make large AI models cheaper and greener to run, as demand for compute keeps climbing.", url: "https://example.com/sample/ai-chips", publishedAt: "2026-10-09T08:30:00Z" },
  { seed: "phone", category: "technology", source: "Gadget Daily", title: "Foldable phones finally go mainstream", description: "Prices have dropped below flagship slab phones for the first time, and shipments are up sharply year over year.", url: "https://example.com/sample/foldables", publishedAt: "2026-10-08T15:10:00Z" },
  { seed: "market", category: "business", source: "Market Wire", title: "Global markets rally as inflation cools", description: "Stocks climbed across Asia, Europe and the US after fresh data showed price growth easing faster than expected.", url: "https://example.com/sample/markets-rally", publishedAt: "2026-10-09T06:45:00Z" },
  { seed: "startup", category: "business", source: "Founders Weekly", title: "Student-run startups attract record seed funding", description: "Investors are betting earlier than ever on campus founders, with university accelerators reporting full cohorts.", url: "https://example.com/sample/student-startups", publishedAt: "2026-10-07T11:00:00Z" },
  { seed: "stadium", category: "sports", source: "Sports Desk", title: "Underdogs clinch dramatic last-minute victory in final", description: "A stoppage-time winner sealed the title for the youngest squad in the competition's history.", url: "https://example.com/sample/final", publishedAt: "2026-10-08T21:20:00Z" },
  { seed: "runner", category: "sports", source: "Track & Field Today", title: "Marathon world record falls in perfect conditions", description: "Cool temperatures and a flat course helped the field post the fastest times ever recorded.", url: "https://example.com/sample/marathon", publishedAt: "2026-10-06T09:00:00Z" },
  { seed: "health", category: "health", source: "Health Report", title: "Short daily walks linked to better sleep, study finds", description: "Researchers found that just 20 minutes of walking improved sleep quality in adults of all ages.", url: "https://example.com/sample/walks-sleep", publishedAt: "2026-10-08T07:30:00Z" },
  { seed: "lab", category: "health", source: "Medical Times", title: "New vaccine platform shows promise in early trials", description: "The approach could shorten development time for future vaccines from years to months.", url: "https://example.com/sample/vaccine-platform", publishedAt: "2026-10-05T13:15:00Z" },
  { seed: "space", category: "science", source: "Science Now", title: "Telescope captures most detailed image of a distant galaxy", description: "Astronomers say the image reveals star-forming regions never seen before in such clarity.", url: "https://example.com/sample/galaxy", publishedAt: "2026-10-09T04:00:00Z" },
  { seed: "ocean", category: "science", source: "Planet Journal", title: "Coral reefs show surprising signs of recovery", description: "Marine biologists report regrowth across several reefs once thought to be beyond saving.", url: "https://example.com/sample/coral", publishedAt: "2026-10-07T17:40:00Z" },
  { seed: "cinema", category: "entertainment", source: "Screen Scene", title: "Indie film breaks box-office records on opening weekend", description: "A low-budget drama outperformed major studio releases, driven by word of mouth on social media.", url: "https://example.com/sample/indie-film", publishedAt: "2026-10-08T19:00:00Z" },
  { seed: "concert", category: "entertainment", source: "Music Pulse", title: "Surprise reunion tour sells out in minutes", description: "Fans crashed ticketing sites as the band announced its first shows in over a decade.", url: "https://example.com/sample/reunion-tour", publishedAt: "2026-10-06T20:30:00Z" },
];

export const SAMPLE_ARTICLES: Article[] = raw.map(({ seed, ...a }) => ({
  ...a,
  id: articleId(a.url),
  image: `https://picsum.photos/seed/dailybrief-${seed}/1200/750`,
  content: `${a.description} This is a sample article shown because no news API key is configured.`,
}));

export function filterSample(opts: { category?: Category; q?: string }): Article[] {
  let list = SAMPLE_ARTICLES;
  if (opts.category) list = list.filter((a) => a.category === opts.category);
  if (opts.q) {
    const q = opts.q.toLowerCase().trim();
    list = list.filter((a) =>
      `${a.title} ${a.description} ${a.source}`.toLowerCase().includes(q),
    );
  }
  return [...list].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
