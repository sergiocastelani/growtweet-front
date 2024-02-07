import { styled } from "styled-components";
import { TweetList } from "../components/tweet/tweet-list";
import { useEffect, useState } from "react";
import { TweetDisplayInfo } from "../api/dto/tweet-dtos";
import { ApiTweet } from "../api/api-tweet";
import { useParams } from "react-router-dom";
import { TweetDisplayProps } from "../components/tweet/tweet-display";

export function RepliesPage()
{
    const { tweetId = "0" } = useParams();
    const [tweets, setTweets] = useState<TweetDisplayInfo[]>([]);

    useEffect(() => {
        const tweetIdInt = parseInt(tweetId);

        (new ApiTweet()).replies(tweetIdInt)
            .then((response) => {
                setTweets(response.data.data);
            })
            .catch((error) => {
                alert('An error ocurred while fetching data');
                console.error(error);
            });
    }, [tweetId]);

    function setTweetDisplayProps(index: number, props: TweetDisplayProps): void 
    {
        props.canNavigateDown = index !== 0;
        props.canNavigateUp = index === 0;
    }

    return (
        <>
            <Tittle>Home</Tittle>
            <TweetList 
                tweets={tweets} 
                loading={tweets.length === 0}
                beforeRenderDisplay={setTweetDisplayProps}
            />
        </>
    )
}

const Tittle = styled.header`
    padding: 1rem;
    margin: 0;
    font-size: 1.2rem;
    font-weight: bold;
`
