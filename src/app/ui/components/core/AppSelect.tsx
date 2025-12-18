import * as React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
type AppSize = "small" | "medium";

export interface AppSelectOption {
  label: string;
  value: string | number;
}

export interface AppSelectProps {
  id?: string;
  label?: string;
  value: string | number;
  options: AppSelectOption[];
  size?: AppSize;
  fullWidth?: boolean;
  disabled?: boolean;
  errorText?: string;
  onChange: (value: string | number) => void;
}

/**
 * Simple single-select component.
 */
export const AppSelect: React.FC<AppSelectProps> = ({
  id,
  label,
  value,
  options,
  size = "small",
  fullWidth = true,
  disabled,
  errorText,
  onChange,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value;
    const matchedOption = options.find(opt => String(opt.value) === newValue);
    if (matchedOption && typeof matchedOption.value === "number") {
      onChange(Number(newValue));
    } else {
      onChange(newValue);
    }
  };

  const labelId = id ? `${id}-label` : undefined;

  return (
    <FormControl
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      error={!!errorText}
    >
      {label && <InputLabel id={labelId}>{label}</InputLabel>}
      <Select
        labelId={labelId}
        id={id}
        value={String(value)}
        label={label}
        onChange={handleChange}
      >
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
      {errorText && (
        <span style={{ color: "var(--mui-palette-error-main)", fontSize: 12 }}>
          {errorText}
        </span>
      )}
    </FormControl>
  );
};
