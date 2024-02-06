import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { FeedPage } from "./pages/feed-page";
import { LoginPage } from "./pages/login/login-page";
import './app-style.css'
import { ProfilePage } from "./pages/profile/profile-page";
import { ExplorePage } from "./pages/explore-page";
import { NewAccountPage } from "./pages/new-account/new-account-page";
import { RepliesPage } from "./pages/replies-page";

export const appRouter = createBrowserRouter([
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
    path: "/new-account",
    element: <NewAccountPage/>,
  },
  {
    path: "/profile/:userId",
    element: <ProfilePage/>,
  },
  {
    path: "/replies/:tweetId",
    element: <RepliesPage/>,
  },
]);


function App() {
  return (
    <RouterProvider router={appRouter} />
  )
}

export default App
