// src/app/App.tsx
import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./app/ui/AppRoute";
import { AppThemeProvider } from "./app/providers/ThemeProviders";
import { appConfig } from "./app/shared/appConfig/appconfig";

export const App: React.FC = () => (
  <AppThemeProvider brand={appConfig.brand}>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </AppThemeProvider>
);
