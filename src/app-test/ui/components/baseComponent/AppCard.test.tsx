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

    // ❌ INTENTIONAL FAILURE
    expect(child.textContent).toBe("Hello WRONG TEXT");
  });

  it("renders header title correctly", () => {
    render(<AppCard header={{ title: "My Header" }} />);

    // ❌ INTENTIONAL FAILURE
    expect(screen.getByText("Wrong Header")).toBeDefined();
  });
});
