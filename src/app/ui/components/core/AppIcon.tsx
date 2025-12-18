import * as React from "react";
import { SvgIcon } from "@mui/material";
import type { SvgIconProps } from "@mui/material";

/**
 * Base wrapper for SVG icons.
 * You can later map icon names from JSON to specific icons here.
 */
export type AppIconProps = SvgIconProps;

export const AppIcon: React.FC<AppIconProps> = (props) => {
  return <SvgIcon fontSize={props.fontSize ?? "medium"} {...props} />;
};
