import { styled } from "styled-components";
import { TweetDisplayInfo } from "../../api/dto/tweet-dtos";
import { TweetDisplay } from "./tweet-display";
import { TweetDisplayLoading } from "./tweet-display-loading";

export interface TweetListProps 
{
    tweets: TweetDisplayInfo[];
    loading?: boolean;
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
            {props.tweets.map(t => <TweetDisplay key={t.id} tweet={t}/>)}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    padding: 0;
    margin: 0;
    width: 100%;
`;
