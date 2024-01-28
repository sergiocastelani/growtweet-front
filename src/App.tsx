import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { FeedPage } from "./pages/feed-page";
import { LoginPage } from "./pages/login/login-page";
import './app-style.css'
import { ProfilePage } from "./pages/profile-page";
import { ExplorePage } from "./pages/explore-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FeedPage/>,
  },
  {
    path: "/explore",
    element: <ExplorePage/>,
  },
  {
    path: "/home",
    element: <FeedPage/>,
  },
  {
    path: "/login",
    element: <LoginPage/>,
  },
  {
    path: "/profile/:userId",
    element: <ProfilePage/>,
  },
]);


function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
