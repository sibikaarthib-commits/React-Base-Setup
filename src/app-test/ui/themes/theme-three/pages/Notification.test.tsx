import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Notification } from "../../../../../app/ui/themes/theme-three/pages/Notification";

describe("Notification", () => {
  it("renders without crashing", () => {
    render(<Notification />);
  });

  it("renders welcome message", () => {
    render(<Notification />);
    expect(screen.getByText("Welcome to the Notification Page")).toBeDefined();
  });
});

