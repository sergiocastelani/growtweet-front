import { createBrowserRouter } from "react-router-dom";
import { FeedPage } from "./pages/feed-page";
import { LoginPage } from "./pages/login/login-page";
import { ProfilePage } from "./pages/profile/profile-page";
import { ExplorePage } from "./pages/explore-page";
import { NewAccountPage } from "./pages/new-account/new-account-page";
import { RepliesPage } from "./pages/replies-page";
import { MainTemplatePage } from "./pages/main-template-page";

export const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <MainTemplatePage />,
        children: [
            {
                path: "",
                element: <FeedPage />,
            },
            {
                path: "/explore",
                element: <ExplorePage />,
            },
            {
                path: "/home",
                element: <FeedPage />,
            },
            {
                path: "/profile/:userId",
                element: <ProfilePage />,
            },
            {
                path: "/replies/:tweetId",
                element: <RepliesPage />,
            },
        ]
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/new-account",
        element: <NewAccountPage />,
    },
]);


