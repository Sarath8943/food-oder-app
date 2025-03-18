import { createBrowserRouter } from "react-router-dom";
import { UserLayout } from "../layout/UserLayout";
import { Home } from "../pages/user/Home";
import { About } from "../pages/user/About";
import { ErrorPge } from "../pages/shared/ErrorPge";
import { Land } from "../pages/user/Land";
import { Login } from "../pages/shared/Login";
import { Signup } from "../pages/shared/Signup";
import { Menu } from "../pages/user/Menu";

export const router = createBrowserRouter([
  {
    path: "",
    element: <UserLayout />,
    errorElement: <ErrorPge />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "Land",
        element: <Land />,
      },
      {
        path: "/Menu/:id",
        element: <Menu/>,
      },


    ],
  },
]);
