import { useEffect } from "react";
import { ApiConnection } from "../api/api-connection"

export function FeedPage()
{
    useEffect(() => {
        new ApiConnection().get('/tweet/all');
    },[]);

    const logout = async () => {
        await new ApiConnection().post('/auth/logout');
        window.location.href = '/';
    }

    return (
        <div>
            <h1>Feed</h1>
            <button onClick={logout}>Logout</button>
        </div>
    )
}