import { createBrowserRouter } from "react-router-dom";
import HomeRoute from "./home";
import Error404Route from "./error-404";
import BrowseRoute from "./browse";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeRoute />,
  },
  {
    path: "/browse",
    element: <BrowseRoute />,
  },
  {
    path: "*",
    element: <Error404Route />,
  },
]);
