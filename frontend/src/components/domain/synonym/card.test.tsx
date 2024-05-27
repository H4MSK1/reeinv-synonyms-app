import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "@/lib/test-utils";
import SynonymCard, { SynonymCardPlaceholder } from "./card";

describe("SynonymCardPlaceholder", () => {
  it("should render properly", () => {
    // When
    render(<SynonymCardPlaceholder />);
    // Then
    expect(screen.getByTestId("synonym-card-placeholder")).toBeDefined();
  });
});

describe("SynonymCard", () => {
  it("should render properly", () => {
    // Given
    const props = {
      word: "happy",
      synonyms: ["joyful"],
    };
    // When
    render(<SynonymCard {...props} />);
    // Then
    expect(screen.getByText("Synonyms for")).toBeDefined();
    expect(screen.getByTestId("synonym").textContent).toEqual("happy");
  });

  it("should render placeholder component when isLoading", () => {
    // Given
    const props = {
      word: "happy",
      synonyms: ["joyful"],
      isLoading: true,
    };
    // When
    render(<SynonymCard {...props} />);
    // Then
    expect(screen.getByTestId("synonym-card-placeholder")).toBeDefined();
  });

  it("should render 2 synonyms of given word with correct links", () => {
    // Given
    const props = {
      word: "happy",
      synonyms: ["joyful", "glad"],
    };
    // When
    render(<SynonymCard {...props} />);
    // Then
    const links = screen.getAllByTestId("synonym-link");
    expect(links).toHaveLength(2);
    expect(links[0].getAttribute("href")).toEqual("/joyful");
    expect(links[1].getAttribute("href")).toEqual("/glad");
  });
});
