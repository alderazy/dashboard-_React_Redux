import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./App.css";
import Over from "./feature/over";
import { useSelector } from "react-redux";
import i18n from "./i18n";

function App() {
  const theme = useSelector((state) => state.Settheme.theme);
  const lang = useSelector((state) => state.Settheme.lang);

  useEffect(() => {
    // set theme
    theme === "dark"
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
    // set lang
    lang === "en"
      ? document.documentElement.setAttribute("dir", "ltr")
      : document.documentElement.setAttribute("dir", "rtl");

    i18n.changeLanguage(lang);
  }, [theme, lang]);
  return (
    <>
      <div>
        <Over />
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
