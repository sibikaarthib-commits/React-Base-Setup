import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ReduxProvider } from "../../app/providers/ReduxProvider";

describe("ReduxProvider", () => {
  it("renders children without crashing", () => {
    render(
      <ReduxProvider>
        <div data-testid="child">Hello Redux</div>
      </ReduxProvider>
    );

    // Verify the child is rendered
    const child = screen.getByTestId("child");
    expect(child).toBeDefined();
    expect(child.textContent).toBe("Hello Redux");
  });
});
