import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { VITE_APP_NAME } from "@/constants";
import { render } from "@/lib/test-utils";
import AppLayout from "./app-layout";

describe("AppLayout", () => {
  it("should render children properly", () => {
    // When
    render(
      <AppLayout>
        <div>Hi there</div>
      </AppLayout>
    );
    // Then
    const content = screen.getByText(/Hi there/i);
    expect(content).toBeInTheDocument();
  });

  it("should set the document title", () => {
    // Given
    const title = "My synonym";
    // When
    render(
      <AppLayout title={title}>
        <div>Test Content</div>
      </AppLayout>
    );
    // Then
    expect(document.title).toBe(`${title} — ${VITE_APP_NAME}`);
  });
});
