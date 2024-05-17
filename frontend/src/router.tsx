import { createBrowserRouter } from "react-router-dom";
import RootRoute from "./routes/root";
import Error404Route from "./routes/error-404";
import BrowseRoute from "./routes/browse";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
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
