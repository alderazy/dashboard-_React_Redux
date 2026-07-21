import { createSlice } from "@reduxjs/toolkit";
export const ToggelSidebar = createSlice({
  name: "sidebar",
  initialState: { sidebar: false, over: false },
  reducers: {
    toggelSidebar: (state) => {
      state.sidebar = !state.sidebar;
    },
    toggelOver: (state) => {
      state.over = !state.over;
    },
  },
});

export const { toggelSidebar, toggelOver } = ToggelSidebar.actions;
export default ToggelSidebar.reducer;
