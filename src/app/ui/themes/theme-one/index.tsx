import { Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Notification } from "./pages/Notification";
import { AppLayout } from "./layout/AppLayout";
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
  },
  {
    id: "stores",
    label: "Stores",
    path: "/stores",
  },
  {
    id: "customers",
    label: "Customers",
    path: "/customers",
  },
];

export const ThemeOneRoutes = (
  <Route
    path="/"
    element={<AppLayout sidebarItems={sidebarItems} showSidebar showFooter />}
  >
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="orders" element={<Notification />} />
  </Route>
);


