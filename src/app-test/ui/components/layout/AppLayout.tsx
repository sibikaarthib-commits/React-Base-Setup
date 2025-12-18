import * as React from "react";
import { Box, Toolbar } from "@mui/material";
import { AppHeader } from "./AppHeader";
import { AppSidebar, type AppSidebarItem } from "./AppSidebar";
import { AppFooter } from "./AppFooter";

export interface AppLayoutProps {
  children: React.ReactNode;
  sidebarItems: AppSidebarItem[];
  showSidebar?: boolean;
  showFooter?: boolean;
}

const DRAWER_WIDTH = 240;
export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  sidebarItems,
  showSidebar = true,
  showFooter = true,
}) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppHeader
        rightContent={
          showSidebar ? (
            // you can use your AppIconButton here
            <button onClick={toggleSidebar}>Menu</button>
          ) : null
        }
      />

      {showSidebar && (
        <AppSidebar
          items={sidebarItems}
          open={sidebarOpen}
          onClose={toggleSidebar}
          width={DRAWER_WIDTH}
        />
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          ml: { md: showSidebar ? `${DRAWER_WIDTH}px` : 0 },
        }}
      >
        {/* header offset */}
        <Toolbar />

        {/* page content */}
        <Box sx={{ flex: 1, p: 2 }}>{children}</Box>

        {showFooter && <AppFooter />}
      </Box>
    </Box>
  );
};
