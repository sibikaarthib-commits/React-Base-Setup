import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    // Include test files anywhere in src/ (including app-test folder)
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    // Optionally exclude node_modules and other directories
    exclude: ["node_modules", "dist", ".git", ".husky"],
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
