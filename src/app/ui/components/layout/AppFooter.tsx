import * as React from "react";
import { Box, Typography } from "@mui/material";

export interface AppFooterProps {
  content?: React.ReactNode;
}

export const AppFooter: React.FC<AppFooterProps> = ({
  content = "© 2025 My App",
}) => {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: 1,
        borderColor: "divider",
        py: 1.5,
        px: 2,
        textAlign: "center",
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="caption" color="text.secondary">
        {content}
      </Typography>
    </Box>
  );
};
