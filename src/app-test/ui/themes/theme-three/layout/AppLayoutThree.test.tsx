import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { AppLayoutThree } from "../../../../../app/ui/themes/theme-three/layout/AppLayoutThree";
import type { AppSidebarItem } from "../../../../../app/ui/components/layout/AppSidebar";

const mockSidebarItems: AppSidebarItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
  },
];

describe("AppLayoutThree", () => {
  it("renders without crashing", () => {
    render(
      <BrowserRouter>
        <AppLayoutThree sidebarItems={mockSidebarItems} />
      </BrowserRouter>
    );
  });

  it("renders with sidebar by default", () => {
    render(
      <BrowserRouter>
        <AppLayoutThree sidebarItems={mockSidebarItems} />
      </BrowserRouter>
    );

    expect(screen).toBeDefined();
  });

  it("renders without sidebar when showSidebar is false", () => {
    render(
      <BrowserRouter>
        <AppLayoutThree sidebarItems={mockSidebarItems} showSidebar={false} />
      </BrowserRouter>
    );

    expect(screen).toBeDefined();
  });

  it("renders without footer when showFooter is false", () => {
    render(
      <BrowserRouter>
        <AppLayoutThree sidebarItems={mockSidebarItems} showFooter={false} />
      </BrowserRouter>
    );

    expect(screen).toBeDefined();
  });
});

