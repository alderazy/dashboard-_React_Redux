import { configureStore } from "@reduxjs/toolkit";
import setTheme from "../feature/slice/theme";
import sidebar from "../feature/slice/toggelSidebar";

export const store = configureStore({
  reducer: {
    Settheme: setTheme,
    Sidebar: sidebar,
  },
  devTools: true,
});
