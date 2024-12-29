import { createBrowserRouter } from "react-router-dom";
import { UserLayout } from "../layout/UserLayout";
import { Home } from "../pages/user/Home";
import { About } from "../pages/user/About";
import { Menu } from "../pages/user/menu";

 
export const router = createBrowserRouter([
    {
      path: "",
      element: <UserLayout/>,
    children: [{

        path: "",
        element: <Home/>
    },
    {
        path: "about",
        element: <About/>

    },
    {
        path: "menu",
        element: <Menu/> 
    }




]

      
    },

  ]);