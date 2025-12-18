import * as React from "react";
import { IconButton } from "@mui/material";
import type { IconButtonProps } from "@mui/material";
import type { AppColor, AppSize } from "./types";

export interface AppIconButtonProps
  extends Omit<IconButtonProps, "color" | "size"> {
  color?: AppColor;
  size?: AppSize;
}

/**
 * Icon-only button; pairs with AppIcon.
 */
export const AppIconButton: React.FC<AppIconButtonProps> = (props) => {
  return <IconButton {...props} />;
};
