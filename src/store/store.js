import { configureStore } from "@reduxjs/toolkit";
import setTheme from "../feature/slice/theme";
import sidebar from "../feature/slice/toggelSidebar";
import dashboard from "../feature/slice/dashboardSlice";

export const store = configureStore({
  reducer: {
    Settheme: setTheme,
    Sidebar: sidebar,
    DashboardData: dashboard,
  },
  devTools: true,
});
