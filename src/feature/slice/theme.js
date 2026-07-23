import { createSlice } from "@reduxjs/toolkit";
const initialState = localStorage.getItem("theme") || "dark";
const thelang = localStorage.getItem("lang") || "en";
const initialStatetheme = {
  theme: initialState,
  lang: thelang,
};
export const setTheme = createSlice({
  name: "theme",
  initialState: initialStatetheme,
  reducers: {
    // control theme
    toggelTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", state.theme);
    },

    // control lang
    toggelLang: (state) => {
      state.lang = state.lang === "en" ? "ar" : "en";
      localStorage.setItem("lang", state.lang);
    },
  },
});

export const { toggelTheme, toggelLang } = setTheme.actions;
export default setTheme.reducer;
