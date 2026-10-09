import { describe, expect, it } from "vitest";
import { filterSample } from "./sample";

describe("filterSample", () => {
  it("returns only the chosen category", () => {
    const list = filterSample({ category: "sports" });
    expect(list.length).toBe(2);
    expect(list.every((a) => a.category === "sports")).toBe(true);
  });
  it("returns nothing for a keyword with no matches", () => {
    expect(filterSample({ q: "zzqqxx" })).toEqual([]);
  });
  it("matches keyword in titles", () => {
    expect(filterSample({ q: "marathon" }).length).toBe(1);
  });
});
