import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AppCard } from "../../../../app/ui/components/baseComponent/AppCard";

describe("AppCard", () => {
  it("renders children correctly", () => {
    render(
      <AppCard header={{ title: "Test Card" }}>
        <div data-testid="child">Hello Card</div>
      </AppCard>
    );

    const child = screen.getByTestId("child");
    expect(child).toBeDefined();
    expect(child.textContent).toBe("Hello Card");
  });

  it("renders header title correctly", () => {
    render(<AppCard header={{ title: "My Header" }} />);
    expect(screen.getByText("My Header")).toBeDefined();
  });
});
