import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import TaskDetails from "../components/TaskDetailsModal";
// import Header from "../components/Header";

const router = createBrowserRouter([
  // {
  //   element: <Header />,
  //   children: [{ path: "/", element: <Home /> }],
  // },
  {
    element: <Home />,
    path: "/",
  },
]);

export default router;
