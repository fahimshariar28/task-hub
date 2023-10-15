import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import MainLayout from "./../Layout/MainLayout";
import ErrorPage from "./../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Teams from "../Pages/Teams/Teams";
import Tasks from "../Pages/Tasks/Tasks";
import Dashboard from "./../Pages/Dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Teams />,
      },
      {
        path: "/tasks/:teamId",
        element: <Tasks />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

export default router;
