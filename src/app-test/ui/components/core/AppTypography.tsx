import * as React from "react";
import { Typography } from "@mui/material";
import type { TypographyProps } from "@mui/material";
import type { AppAlign } from "./types";

export interface AppTypographyProps
  extends Omit<TypographyProps, "align"> {
  align?: AppAlign;
}

export const AppTypography: React.FC<AppTypographyProps> = (props) => {
  return <Typography {...props} />;
};
