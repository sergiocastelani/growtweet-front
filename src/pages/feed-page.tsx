import { TweetList } from "../components/tweet/tweet-list";
import { useEffect, useState } from "react";
import { TweetDisplayInfo } from "../api/dto/tweet-dtos";
import { ApiTweet } from "../api/api-tweet";
import { PageTitle } from "../components/ui/page-title";

export function FeedPage()
{
    const [tweets, setTweets] = useState<TweetDisplayInfo[]>([]);

    useEffect(() => {
        (new ApiTweet()).all()
            .then((response) => {
                setTweets(response.data.data);
            });
    }, []);

    return (
        <>
            <PageTitle>Home</PageTitle>
            <TweetList tweets={tweets} loading={tweets.length === 0}/>
        </>
    )
}
