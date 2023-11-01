import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Page404 from "../pages/Page404";
import RootLayout from "./RootLayout";
import Favorites from "../pages/Favorites";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
      { path: "*", element: <Page404 /> },
    ],
  },
]);
