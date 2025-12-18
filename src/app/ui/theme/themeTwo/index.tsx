import { Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Notification } from "./pages/Notification";
import { AppLayoutTwo } from "./layout/AppLayoutTwo";
import type { AppSidebarItem } from "../../components/layout/AppSidebar";

const sidebarItems: AppSidebarItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    id: "orders",
    label: "Orders",
    path: "/orders",
  }
];


export const ThemeTwoRoutes = (
  <Route
    path="/"
    element={<AppLayoutTwo sidebarItems={sidebarItems} showSidebar showFooter />}
  >
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="orders" element={<Notification />} />
  </Route>
);
