import React from "react";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { themes, type BrandKey } from "../ui/themes/theme";
import { appConfig } from "../shared/appConfig/appConfig";

type Props = {
  brand?: BrandKey;
  children: React.ReactNode;
};

export const AppThemeProvider: React.FC<Props> = ({ brand, children }) => {
  const selectedBrand: BrandKey = brand ?? appConfig.brand;
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes[selectedBrand]}>{children}</ThemeProvider>
    </StyledEngineProvider>
  );
};
