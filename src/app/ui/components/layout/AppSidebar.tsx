import * as React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Toolbar,
} from "@mui/material";

export interface AppSidebarItem {
  id: string;
  label: string;
  path: string; 
  icon?: React.ReactNode;
  onClick?: () => void;
}

export interface AppSidebarProps {
  items: AppSidebarItem[];
  open: boolean;
  onClose: () => void;
  width?: number;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  items,
  open,
  onClose,
  width = 240,
}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const drawerContent = (
    <>
      <Toolbar />
      <List>
        {items.map((item) => (
          <ListItemButton key={item.id} onClick={item.onClick}>
            {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </>
  );

  return (
    <>
      {/* Mobile: temporary drawer */}
      {!isDesktop && (
        <Drawer
          variant="temporary"
          open={open}
          onClose={onClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { width },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Desktop: permanent drawer */}
      {isDesktop && (
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": { width },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};
