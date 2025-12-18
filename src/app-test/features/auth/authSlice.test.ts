import { describe, it, expect } from "vitest";
import { authReducer, logout, login } from "../../../app/features/auth/authSlice";
import type { AuthState } from "../../../app/features/auth/authSlice";
import type { RootState } from "../../../app/store";

/* ---------------------------
   Reducer tests
---------------------------- */

describe("authSlice reducer", () => {
  const initialState: AuthState = {
    user: null,
    status: "idle",
    error: null,
  };

  it("should return initial state", () => {
    const state = authReducer(undefined, { type: "unknown" });
    expect(state).toEqual(initialState);
  });

  it("should handle logout", () => {
    const loggedInState: AuthState = {
      user: { id: "1", email: "admin@example.com" },
      status: "succeeded",
      error: null,
    };

    const state = authReducer(loggedInState, logout());

    expect(state.user).toBeNull();
    expect(state.status).toBe("idle");
    expect(state.error).toBeNull();
  });

  it("should handle login.pending", () => {
    const action = { type: login.pending.type };
    const state = authReducer(initialState, action);

    expect(state.status).toBe("loading");
    expect(state.error).toBeNull();
  });

  it("should handle login.fulfilled", () => {
    const action = {
      type: login.fulfilled.type,
      payload: { id: "1", email: "admin@example.com" },
    };

    const state = authReducer(initialState, action);

    expect(state.status).toBe("succeeded");
    expect(state.user).toEqual({
      id: "1",
      email: "admin@example.com",
    });
  });

  it("should handle login.rejected", () => {
    const action = {
      type: login.rejected.type,
      payload: "Invalid email or password",
    };

    const state = authReducer(initialState, action);

    expect(state.status).toBe("failed");
    expect(state.error).toBe("Invalid email or password");
  });
});

/* ---------------------------
   Selector tests
---------------------------- */

describe("auth selectors", () => {
  const mockState = {
    auth: {
      user: { id: "1", email: "admin@example.com" },
      status: "succeeded",
      error: null,
    },
  } as RootState;

  it("selectAuthUser", async () => {
    const { selectAuthUser } = await import("../../../app/features/auth/authSlice");
    expect(selectAuthUser(mockState)).toEqual({
      id: "1",
      email: "admin@example.com",
    });
  });

  it("selectAuthStatus", async () => {
    const { selectAuthStatus } = await import("../../../app/features/auth/authSlice");
    expect(selectAuthStatus(mockState)).toBe("succeeded");
  });

  it("selectAuthError", async () => {
    const { selectAuthError } = await import("../../../app/features/auth/authSlice");
    expect(selectAuthError(mockState)).toBeNull();
  });
});
