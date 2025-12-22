import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "../../app/routing/AppRoutes";
import { ReduxProvider } from "../../app/providers/ReduxProvider";
import { AppThemeProvider } from "../../app/providers/ThemeProviders";

describe("AppRoutes", () => {
  it("renders without crashing", () => {
    render(
      <ReduxProvider>
        <AppThemeProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AppThemeProvider>
      </ReduxProvider>
    );
  });

  it("renders Login page when user is not authenticated", () => {
    render(
      <ReduxProvider>
        <AppThemeProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AppThemeProvider>
      </ReduxProvider>
    );

    // Check if Login form is present (from Login component)
    expect(screen.getByLabelText("Email")).toBeDefined();
  });
});

