import { describe, it, expect } from "vitest";
import { store } from "../../app/store"; // adjust path if needed

describe("Redux store", () => {
  it("should have the correct initial state", () => {
    const state = store.getState();
    
    // Check that auth slice exists
    expect(state.auth).toBeDefined();
    
    // Initial state of auth
    expect(state.auth.user).toBeNull();
    expect(state.auth.status).toBe("idle");
    expect(state.auth.error).toBeNull();
  });

  it("should allow dispatching actions", () => {
    // simple dispatch test
    const action = { type: "auth/logout" };
    const result = store.dispatch(action);
    
    expect(store.getState().auth.user).toBeNull();
    expect(result).toBeDefined();
  });
});
