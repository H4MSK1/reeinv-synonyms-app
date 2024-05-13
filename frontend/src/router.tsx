import { createBrowserRouter } from "react-router-dom";
import RootRoute from "./routes/root";
import Error404Route from "./routes/error-404";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
  },
  {
    path: "*",
    element: <Error404Route />,
  },
]);
