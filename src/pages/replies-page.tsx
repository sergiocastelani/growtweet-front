import { styled } from "styled-components";
import { NavBar } from "../components/nav-bar";
import { TweetList } from "../components/tweet/tweet-list";
import { News } from "../components/news";
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
        <Wrapper>
            <NavBar/>
            <CentralWidget>
                <Tittle>Home</Tittle>
                <TweetList 
                    tweets={tweets} 
                    loading={tweets.length === 0}
                    beforeRenderDisplay={setTweetDisplayProps}
                />
            </CentralWidget>
            <News/>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    align-items: stretch;
    justify-content: center;
    height: 100vh;
    padding: 0;
    margin: 0;
    background-color: var(--color-bg-2);
    color: var(--color-fg-2);
`;

const CentralWidget = styled.div`
    padding: 0;
    width: 50%;
    max-width: 600px;
`;

const Tittle = styled.header`
    padding: 1rem;
    margin: 0;
    font-size: 1.2rem;
    font-weight: bold;
`
