import { styled } from "styled-components";
import { TweetDisplayInfo } from "../../api/dto/tweet-dtos";
import { TweetDisplay, TweetDisplayProps } from "./tweet-display";
import { TweetDisplayLoading } from "./tweet-display-loading";

export interface TweetListProps 
{
    tweets: TweetDisplayInfo[];
    loading?: boolean;
    beforeRenderDisplay?: (index: number, props: TweetDisplayProps) => void;
};

export function TweetList(props: TweetListProps)
{
    if (props.loading)
        return (
            <>
                <TweetDisplayLoading opacity={0.5}/>
                <TweetDisplayLoading opacity={0.2}/>
                <TweetDisplayLoading opacity={0.1}/>
            </>
        );

    return (
        <Wrapper>
            {props.tweets.map((tweet, index) => {
                const displayProps : TweetDisplayProps = {
                    tweet,
                    canNavigateDown: true,
                    canNavigateUp: true,
                };
                props.beforeRenderDisplay?.(index, displayProps);

                return <TweetDisplay key={tweet.id} {... displayProps}/>
            })}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    padding: 0;
    margin: 0;
    width: 100%;
`;
