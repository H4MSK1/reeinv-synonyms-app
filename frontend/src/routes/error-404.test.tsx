import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Error404Route from "./error-404";

describe("Error404Route", () => {
  it("should render properly", () => {
    render(
      <MemoryRouter>
        <Error404Route />
      </MemoryRouter>
    );
  });
});
