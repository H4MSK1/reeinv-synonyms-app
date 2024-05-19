import "@/components/domain/synonym/card-set/__mocks__";
import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import HomeRoute from "./home";
import { MemoryRouter } from "react-router-dom";

describe("HomeRoute", () => {
  it("should render properly", () => {
    render(
      <MemoryRouter>
        <HomeRoute />
      </MemoryRouter>
    );
  });
});
