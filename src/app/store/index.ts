import { configureStore } from "@reduxjs/toolkit";
import { authReducer, logout } from "../features/auth/authSlice";
import { setAuthErrorHandler } from "../api/httpClient";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Central place to react to 401/403 globally (used by Axios interceptor).
setAuthErrorHandler(() => {
  try {
    store.dispatch(logout());
  } catch {
    // no-op
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
