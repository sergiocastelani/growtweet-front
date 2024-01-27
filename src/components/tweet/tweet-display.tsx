import { styled } from "styled-components";
import { Tweet } from "../../api/dto/tweet-types";
import emptyAvatar from '../../assets/empty_avatar.png'
import { HiOutlineChatBubbleLeft } from "react-icons/hi2";
import { IoMdHeartEmpty } from "react-icons/io";

export interface TweetDisplayProps 
{
    tweet: Tweet;
}

export function TweetDisplay(props: TweetDisplayProps) 
{
    const tweet = props.tweet;

    return (
        <Wrapper>
            <Picture src={tweet.picture ?? emptyAvatar}/>
            <Description>
                <header>
                    <UserName>{tweet.id}</UserName>
                    <UserTag>@{tweet.id}</UserTag> • <RelativeTime>3h</RelativeTime>
                </header>

                <Content>{tweet.content}</Content>

                <footer>
                    <Icon><HiOutlineChatBubbleLeft/> <span>0</span></Icon>
                    <Icon><IoMdHeartEmpty/> <span>0</span></Icon>
                </footer>
            </Description>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    border-width: 1px 0 0 0;
    border-style: solid;
    border-color: color-mix(in srgb, var(--color-3) 30%, transparent);
    margin: 0;
    padding: 1rem;
    gap: 1rem;
    font-size: 0.8rem;
`;

const Picture = styled.img`
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
`;

const Description = styled.div`
    display: flex;
    flex-direction: column;

    & > footer {
        display: flex;
        flex-direction: row;
    }
`;

const Content = styled.p`
    margin: 5px 0;
`;

const UserName = styled.span`
    font-weight: bold;
    margin-right: 1rem;
`;

const UserTag = styled.span``;

const RelativeTime = styled.span``;

const Icon = styled.span`
    display: flex;
    align-items: center;
    gap: 0.3rem;
    margin-right: 1rem;

    & > svg {
        font-size: 1.3rem;
        cursor: pointer;
    }
`;