import { styled } from "styled-components";
import { TweetDisplayInfo } from "../../api/dto/tweet-dtos";
import { TweetDisplay } from "./tweet-display";

export interface TweetListProps 
{
    tweets: TweetDisplayInfo[];
};

export function TweetList(props: TweetListProps)
{
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
