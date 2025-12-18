import * as React from "react";
import { Button } from "@mui/material";
import type { ButtonProps } from "@mui/material";
import type { AppColor, AppSize, AppVariant } from "./types";

export interface AppButtonProps
  extends Omit<ButtonProps, "color" | "size" | "variant"> {
  color?: AppColor;
  size?: AppSize;
  variant?: AppVariant;
}

export const AppButton: React.FC<AppButtonProps> = (props) => {
  return <Button {...props} />;
};
