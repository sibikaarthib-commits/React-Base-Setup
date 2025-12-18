import * as React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

export interface AppHeaderProps {
  title?: React.ReactNode;
  rightContent?: React.ReactNode; // user menu, icons, etc.
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title = "My App",
  rightContent,
}) => {
  return (
    <AppBar position="fixed" elevation={1}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" noWrap component="div">
          {title}
        </Typography>
        <Box>{rightContent}</Box>
      </Toolbar>
    </AppBar>
  );
};
