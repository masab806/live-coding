import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import CodeEditor from "./pages/CodeEditor";
import HomePage from "./pages/Home";

const router = createBrowserRouter([
   {
      path: "/",
      element: <RootLayout/>,
      children: [
         {
            path: "/",
            index: true,
            element: <HomePage/>
         },
        {
            path: "editor",
            element: <CodeEditor/>
        }
      ]
   }
])

export default router