import * as React from "react";
import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import { AppHeader } from "../../../components/layout/AppHeader";
import { AppSidebar, type AppSidebarItem } from "../../../components/layout/AppSidebar";
import { AppFooter } from "../../../components/layout/AppFooter";

export interface AppLayoutProps {
  sidebarItems: AppSidebarItem[];
  showSidebar?: boolean;
  showFooter?: boolean;
}

export const AppLayoutThree: React.FC<AppLayoutProps> = ({
  sidebarItems,
  showSidebar = true,
  showFooter = true,
}) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppHeader />
      {showSidebar && (
        <AppSidebar
          open={sidebarOpen}
          items={sidebarItems}
          onClose={() => setSidebarOpen(false)}
        />
      )}

      <Box
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.default",
        }}
      >
        <Toolbar />
        <Box sx={{ flex: 1, p: 2 }}>
          <Outlet />
        </Box>
        {showFooter && <AppFooter />}
      </Box>
    </Box>
  );
};

