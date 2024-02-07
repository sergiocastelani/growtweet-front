import { styled } from "styled-components";
import { TweetList } from "../components/tweet/tweet-list";
import { useEffect, useState } from "react";
import { TweetDisplayInfo } from "../api/dto/tweet-dtos";
import { ApiTweet } from "../api/api-tweet";

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
            <Tittle>Home</Tittle>
            <TweetList tweets={tweets} loading={tweets.length === 0}/>
        </>
    )
}

const Tittle = styled.header`
    padding: 1rem;
    margin: 0;
    font-size: 1.2rem;
    font-weight: bold;
`
