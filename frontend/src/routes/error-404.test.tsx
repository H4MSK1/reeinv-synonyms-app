import { describe, it } from "vitest";
import { render } from "@/lib/test-utils";
import Error404Route from "./error-404";

describe("Error404Route", () => {
  it("should render properly", () => {
    render(<Error404Route />);
  });
});
