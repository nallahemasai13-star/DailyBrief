import { describe, expect, it } from "vitest";
import { friendlyError } from "./news.functions";

describe("friendlyError", () => {
  it("explains rate limits", () => {
    expect(friendlyError(429)).toMatch(/request limit/);
    expect(friendlyError(200, "rateLimited")).toMatch(/request limit/);
  });
  it("explains a bad key", () => {
    expect(friendlyError(401, "apiKeyInvalid")).toMatch(/key/);
  });
});
