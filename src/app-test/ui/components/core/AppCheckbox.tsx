import * as React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import type { CheckboxProps } from "@mui/material";
import type { AppColor } from "./types";

export interface AppCheckboxProps
  extends Omit<CheckboxProps, "color"> {
  color?: AppColor;
  label?: string;
}

export const AppCheckbox: React.FC<AppCheckboxProps> = ({
  label,
  color,
  ...checkboxProps
}) => {
  const muiColor = color === "inherit" ? undefined : color;
  const control = <Checkbox {...checkboxProps} color={muiColor} />;
  return label ? (
    <FormControlLabel control={control} label={label} />
  ) : (
    control
  );
};
