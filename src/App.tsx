import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { FeedPage } from "./pages/feed-page";
import { LoginPage } from "./pages/login-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FeedPage/>,
  },
  {
    path: "/login",
    element: <LoginPage/>,
  },
]);


function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
