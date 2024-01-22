import { useEffect } from "react";
import { ApiAuth } from "../api/api-auth";

export function FeedPage()
{
    useEffect(() => {
        new ApiAuth().get('/tweet/all');
    },[]);

    const logout = async () => {
        await new ApiAuth().logout();
        window.location.href = '/';
    }

    return (
        <div>
            <h1>Feed</h1>
            <button onClick={logout}>Logout</button>
        </div>
    )
}