import "./__mocks__";
import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import SynonymCardSet from ".";

describe("SynonymCardSet", () => {
  it("should render properly", () => {
    const props = {
      synonyms: ["joyful", "happy", "unhappy"],
    };

    render(
      <MemoryRouter>
        <SynonymCardSet {...props} />
      </MemoryRouter>
    );
  });
});
