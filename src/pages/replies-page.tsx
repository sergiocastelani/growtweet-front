import { styled } from "styled-components";
import { TweetList } from "../components/tweet/tweet-list";
import { useEffect, useState } from "react";
import { TweetDisplayInfo } from "../api/dto/tweet-dtos";
import { ApiTweet } from "../api/api-tweet";
import { useParams } from "react-router-dom";
import { TweetDisplayProps } from "../components/tweet/tweet-display";
import { PageTitle } from "../components/ui/page-title";
import { InlineAlert } from "../components/ui/inline-alert";

/** Where the replies request stands for the current tweetId. */
type RepliesLoadStatus = "loading" | "loaded" | "failed";

/** Same text as the former browser alert; kept verbatim (FR-12). */
const FETCH_ERROR_MESSAGE = "An error ocurred while fetching data";
const EMPTY_REPLIES_MESSAGE = "No replies yet";

export function RepliesPage()
{
    const { tweetId = "0" } = useParams();
    const [tweets, setTweets] = useState<TweetDisplayInfo[]>([]);
    const [loadStatus, setLoadStatus] = useState<RepliesLoadStatus>("loading");
    const [shownTweetId, setShownTweetId] = useState(tweetId);

    // Reset during render (not in the effect) so the previous tweetId's rows,
    // error or empty message are never committed for the new tweetId.
    if (shownTweetId !== tweetId)
    {
        setShownTweetId(tweetId);
        setLoadStatus("loading");
        setTweets([]);
    }

    useEffect(() => {
        const tweetIdInt = parseInt(tweetId);

        (new ApiTweet()).replies(tweetIdInt)
            .then((response) => {
                setTweets(response.data.data);
                setLoadStatus("loaded");
            })
            .catch((error) => {
                setLoadStatus("failed");
                console.error(error);
            });
    }, [tweetId]);

    function setTweetDisplayProps(index: number, props: TweetDisplayProps): void 
    {
        props.canNavigateDown = index !== 0;
        props.canNavigateUp = index === 0;
    }

    function renderContent()
    {
        if (loadStatus === "failed")
            return <FetchErrorAlert>{FETCH_ERROR_MESSAGE}</FetchErrorAlert>;

        if (loadStatus === "loaded" && tweets.length === 0)
            return <EmptyMessage>{EMPTY_REPLIES_MESSAGE}</EmptyMessage>;

        return (
            <TweetList
                tweets={tweets}
                loading={loadStatus === "loading"}
                beforeRenderDisplay={setTweetDisplayProps}
            />
        );
    }

    return (
        <>
            <PageTitle>Home</PageTitle>
            {renderContent()}
        </>
    )
}

const FetchErrorAlert = styled(InlineAlert)`
    margin: var(--space-4);
`;

const EmptyMessage = styled.p`
    margin: 0;
    padding: var(--space-5) var(--space-4);
    text-align: center;
    font-size: var(--font-size-sm);
    line-height: var(--line-height-base);
    color: var(--color-text-muted);
`;
