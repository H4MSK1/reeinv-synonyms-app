import { isEmpty } from "./is-empty";

describe("isEmpty", () => {
  it("should return true for empty values", () => {
    expect(isEmpty(undefined)).toBe(true);
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty("")).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty({})).toBe(true);
  });

  it("should return false for non-empty values", () => {
    expect(isEmpty("test")).toBe(false);
    expect(isEmpty(["array item", "array item 2"])).toBe(false);
    expect(isEmpty({ recipe: "plain chicken, no seasoning" })).toBe(false);
  });
});
