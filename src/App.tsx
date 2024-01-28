import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { FeedPage } from "./pages/feed-page";
import { LoginPage } from "./pages/login/login-page";
import './app-style.css'
import { ProfilePage } from "./pages/profile-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FeedPage/>,
  },
  {
    path: "/home",
    element: <FeedPage/>,
  },
  {
    path: "/profile/:userId",
    element: <ProfilePage/>,
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
