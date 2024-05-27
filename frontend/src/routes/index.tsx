import { createBrowserRouter } from "react-router-dom";
import HomeRoute from "./home";
import Error404Route from "./error-404";

export const router = createBrowserRouter([
  {
    path: "/:word?",
    element: <HomeRoute />,
  },
  {
    path: "*",
    element: <Error404Route />,
  },
]);
