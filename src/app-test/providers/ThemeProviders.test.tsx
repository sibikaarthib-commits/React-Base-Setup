
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AppThemeProvider } from "../../app/providers/ThemeProviders";

describe("AppThemeProvider", () => {
  it("renders children without crashing", () => {
    render(
      <AppThemeProvider>
        <div data-testid="child">Hello Theme</div>
      </AppThemeProvider>
    );

    const child = screen.getByTestId("child");
    expect(child).toBeDefined();
    expect(child.textContent).toBe("Hello Theme");
  });
});
