import "@/components/domain/synonym/card-set/__mocks__";
import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import RootRoute from "./root";
import { MemoryRouter } from "react-router-dom";

describe("RootRoute", () => {
  it("should render properly", () => {
    render(
      <MemoryRouter>
        <RootRoute />
      </MemoryRouter>
    );
  });
});
