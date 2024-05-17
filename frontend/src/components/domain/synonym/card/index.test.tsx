import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import SynonymCard from ".";
import { MemoryRouter } from "react-router-dom";

describe("SynonymCard", () => {
  it("should render properly", () => {
    const props = {
      synonym: "happy",
      relatedSynonyms: ["joyful"],
    };

    render(
      <MemoryRouter>
        <SynonymCard {...props} />
      </MemoryRouter>
    );

    expect(screen.getByText("Synonyms for")).toBeDefined();
    expect(screen.getByTestId("synonym").textContent).toEqual("happy");
  });
});
