import { Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Notification } from "./pages/Notification";
import { AppLayoutThree } from "./layout/AppLayoutThree";
import type { AppSidebarItem } from "../../components/layout/AppSidebar";

const sidebarItems: AppSidebarItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
  },
];

export const ThemeThreeRoutes = (
  <Route
    path="/"
    element={<AppLayoutThree sidebarItems={sidebarItems} showSidebar showFooter />}
  >
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="orders" element={<Notification />} />
  </Route>
);

