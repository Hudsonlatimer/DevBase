import { describe, expect, it } from "vitest";
import { safeNextPath } from "./safe-redirect";

describe("safeNextPath", () => {
  it("returns same-origin paths unchanged", () => {
    expect(safeNextPath("/dashboard")).toBe("/dashboard");
    expect(safeNextPath("/dashboard?page=3")).toBe("/dashboard?page=3");
    expect(safeNextPath("/dashboard/abc-123")).toBe("/dashboard/abc-123");
  });

  it("returns null for empty / whitespace input", () => {
    expect(safeNextPath("")).toBeNull();
    expect(safeNextPath(null)).toBeNull();
    expect(safeNextPath(undefined)).toBeNull();
  });

  it("rejects protocol-relative URLs (//evil.com)", () => {
    // The classic open-redirect payload — browsers treat // as
    // "same protocol, different host."
    expect(safeNextPath("//evil.com")).toBeNull();
    expect(safeNextPath("//evil.com/path")).toBeNull();
  });

  it("rejects backslash-prefixed paths (/\\evil.com)", () => {
    // Some URL parsers normalize backslash to forward slash.
    expect(safeNextPath("/\\evil.com")).toBeNull();
  });

  it("rejects absolute URLs", () => {
    expect(safeNextPath("https://evil.com/path")).toBeNull();
    expect(safeNextPath("http://evil.com")).toBeNull();
    expect(safeNextPath("javascript:alert(1)")).toBeNull();
  });

  it("rejects bare relative paths without leading slash", () => {
    expect(safeNextPath("dashboard")).toBeNull();
    expect(safeNextPath("../dashboard")).toBeNull();
  });

  it("treats non-string input as missing", () => {
    expect(safeNextPath(undefined as unknown as string)).toBeNull();
  });
});
