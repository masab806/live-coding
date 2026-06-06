import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import CodeEditor from "../pages/CodeEditor";
import HomePage from "../pages/Home";
import NotFound from "../components/NotFound";
import ProtectedRoutes from "./protectedRoutes";

const router = createBrowserRouter([
   {
      path: "/",
      element: <RootLayout />,
      children: [
         {
            path: "/",
            index: true,
            element: <HomePage />
         },
         {
            path: "editor",
            element: <ProtectedRoutes/>,
            children: [
               {
                  index: true,
                  element: <CodeEditor/>
               }
            ]
         },
         {
            path: "*",
            element: <NotFound/>
         }
      ]
   }
])

export default router