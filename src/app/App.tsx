import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routing/AppRoutes";
import { AppThemeProvider } from "./providers/ThemeProviders";
import { appConfig } from "./shared/appConfig/appConfig";

export const App: React.FC = () => (
  <AppThemeProvider brand={appConfig.brand}>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </AppThemeProvider>
);

