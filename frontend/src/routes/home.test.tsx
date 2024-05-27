import { describe, it } from "vitest";
import { render } from "@/lib/test-utils";
import HomeRoute from "./home";

describe("HomeRoute", () => {
  it("should render properly", () => {
    render(<HomeRoute />);
  });
});
