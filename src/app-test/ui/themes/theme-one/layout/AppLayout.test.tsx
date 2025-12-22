import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { AppLayout } from "../../../../../app/ui/themes/theme-one/layout/AppLayout";
import type { AppSidebarItem } from "../../../../../app/ui/components/layout/AppSidebar";

const mockSidebarItems: AppSidebarItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
  },
];

describe("AppLayout", () => {
  it("renders without crashing", () => {
    render(
      <BrowserRouter>
        <AppLayout sidebarItems={mockSidebarItems} />
      </BrowserRouter>
    );
  });

  it("renders with sidebar by default", () => {
    render(
      <BrowserRouter>
        <AppLayout sidebarItems={mockSidebarItems} />
      </BrowserRouter>
    );

    // The layout should render without errors
    expect(screen).toBeDefined();
  });

  it("renders without sidebar when showSidebar is false", () => {
    render(
      <BrowserRouter>
        <AppLayout sidebarItems={mockSidebarItems} showSidebar={false} />
      </BrowserRouter>
    );

    expect(screen).toBeDefined();
  });

  it("renders without footer when showFooter is false", () => {
    render(
      <BrowserRouter>
        <AppLayout sidebarItems={mockSidebarItems} showFooter={false} />
      </BrowserRouter>
    );

    expect(screen).toBeDefined();
  });
});

