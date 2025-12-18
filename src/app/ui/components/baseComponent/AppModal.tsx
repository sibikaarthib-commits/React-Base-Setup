import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import type { DialogProps } from "@mui/material";

export interface AppModalProps
  extends Omit<DialogProps, "open" | "onClose" | "title"> {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  headerAction?: React.ReactNode;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  maxWidth?: DialogProps["maxWidth"];
  fullWidth?: boolean;
  fullScreen?: boolean;
}
export const AppModal: React.FC<AppModalProps> = ({
  open,
  onClose,
  title,
  headerAction,
  children,
  actions,
  maxWidth = "sm",
  fullWidth = true,
  fullScreen,
  sx,
  ...dialogProps
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      fullScreen={fullScreen}
      sx={sx}
      {...dialogProps}
    >
      {(title || headerAction) && (
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <span>{title}</span>
          {headerAction}
        </DialogTitle>
      )}

      {children && (
        <DialogContent
          dividers
          sx={{
            // spacing and typography can later be controlled from theme JSON
          }}
        >
          {children}
        </DialogContent>
      )}

      {actions && (
        <DialogActions
          sx={{
            px: 3,
            py: 2,
          }}
        >
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
};
