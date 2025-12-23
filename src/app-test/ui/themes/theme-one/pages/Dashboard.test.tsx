import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Dashboard } from "../../../../../app/ui/themes/theme-one/pages/Dashboard";

describe("Dashboard", () => {
  it("renders without crashing", () => {
    render(<Dashboard />);
  });

  it("renders welcome message", () => {
    render(<Dashboard />);
    expect(screen.getByText("Welcome to the Dashboard")).toBeDefined();
  });
});

