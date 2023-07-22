import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Header from "../components/Header";
import Login from "../pages/Login";

const router = createBrowserRouter([
  {
    element: <Header />,
    children: [{ path: "/", element: <Home /> }],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
