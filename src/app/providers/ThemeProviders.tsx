import React from "react";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { themes, type BrandKey } from "../ui/theme/theme";
import { appConfig } from "../shared/appConfig/appconfig";

type Props = {
  brand?: BrandKey;
  children: React.ReactNode;
};

export const AppThemeProvider: React.FC<Props> = ({ brand, children }) => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={themes[brand ?? appConfig.brand]}>{children}</ThemeProvider>
  </StyledEngineProvider>
);
