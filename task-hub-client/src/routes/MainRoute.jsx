import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import MainLayout from "./../Layout/MainLayout";
import ErrorPage from "./../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Teams from "../Pages/Teams/Teams";
import Tasks from "../Pages/Tasks/Tasks";
import Dashboard from "./../Pages/Dashboard/Dashboard";
import Home from "../Pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/teams",
        element: (
          <PrivateRoute>
            <Teams />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "/tasks/:teamId",
        element: (
          <PrivateRoute>
            <Tasks />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />{" "}
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

export default router;
