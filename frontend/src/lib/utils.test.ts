import { describe, expect, it } from "vitest";
import { textToSpeech } from "./utils";

describe("utils", () => {
  describe("textToSpeech", () => {
    it("promise should throw error when speechSynthesis is not supported", async () => {
      // Given
      Object.defineProperty(window, "speechSynthesis", {
        value: undefined,
        writable: true,
      });
      // Then
      await expect(textToSpeech("happy")).rejects.toThrowError();
    });
  });
});
