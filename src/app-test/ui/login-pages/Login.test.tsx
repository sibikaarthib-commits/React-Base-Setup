import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { Login } from "../../../app/ui/login-pages/Login";
import { ReduxProvider } from "../../../app/providers/ReduxProvider";
import { AppThemeProvider } from "../../../app/providers/ThemeProviders";
import * as reduxHooks from "../../../app/shared/hooks/useRedux";
import * as authSlice from "../../../app/features/auth/authSlice";

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    vi.spyOn(reduxHooks, "useAppSelector").mockReturnValue(null);
    vi.spyOn(reduxHooks, "useAppDispatch").mockReturnValue(vi.fn());

    render(
      <ReduxProvider>
        <AppThemeProvider>
          <BrowserRouter>
            <Login />
          </BrowserRouter>
        </AppThemeProvider>
      </ReduxProvider>
    );
  });

  it("renders login form", () => {
    vi.spyOn(reduxHooks, "useAppSelector").mockReturnValue(null);
    vi.spyOn(reduxHooks, "useAppDispatch").mockReturnValue(vi.fn());

    render(
      <ReduxProvider>
        <AppThemeProvider>
          <BrowserRouter>
            <Login />
          </BrowserRouter>
        </AppThemeProvider>
      </ReduxProvider>
    );

    expect(screen.getByLabelText("Email")).toBeDefined();
  });

  it("shows error message when login fails", () => {
    vi.spyOn(reduxHooks, "useAppSelector").mockImplementation((selector) => {
      if (selector === authSlice.selectAuthError) {
        return "Invalid email or password";
      }
      if (selector === authSlice.selectAuthStatus) {
        return "failed";
      }
      return null;
    });
    vi.spyOn(reduxHooks, "useAppDispatch").mockReturnValue(vi.fn());

    render(
      <ReduxProvider>
        <AppThemeProvider>
          <BrowserRouter>
            <Login />
          </BrowserRouter>
        </AppThemeProvider>
      </ReduxProvider>
    );

    expect(screen.getByText("Invalid email or password")).toBeDefined();
  });
});

