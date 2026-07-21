import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Content from "./pages/content";
import Layout from "./layouts/layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "dashboard",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "content",
        element: <Content />,
      },
    ],
  },
]);
