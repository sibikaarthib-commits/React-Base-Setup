import React from "react";
import { TextField, type TextFieldProps } from "@mui/material";

export type AppInputType = "text" | "number" | "password" | "textarea";

export interface AppInputProps
  extends Omit<TextFieldProps, "variant" | "type"> {
  type?: AppInputType;
  errorText?: string;
  containerClassName?: string; // Tailwind for wrapper
}

export const AppInput: React.FC<AppInputProps> = ({
  type = "text",
  error,
  errorText,
  multiline,
  minRows,
  containerClassName,
  ...rest
}) => {
  const isTextarea = type === "textarea";

  return (
    <div className={containerClassName}>
      <TextField
        {...rest}
        type={isTextarea ? "text" : type}
        multiline={isTextarea || multiline}
        minRows={isTextarea ? 3 : minRows}
        error={error || !!errorText}
        helperText={errorText || rest.helperText}
        variant="outlined"
        size="small"
        fullWidth
      />
    </div>
  );
};
