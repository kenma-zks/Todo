import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Header from "../components/Header";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

const router = createBrowserRouter([
  {
    element: <Header />,
    children: [{ path: "/", element: <Home /> }],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
]);

export default router;
