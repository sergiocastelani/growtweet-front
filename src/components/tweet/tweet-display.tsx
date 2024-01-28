import { styled } from "styled-components";
import { TweetDisplayInfo } from "../../api/dto/tweet-dtos";
import emptyAvatar from '../../assets/empty_avatar.png'
import { HiOutlineChatBubbleLeft } from "react-icons/hi2";
import { IoIosHeart, IoMdHeartEmpty } from "react-icons/io";
import { ApiTweet } from "../../api/api-tweet";
import { useState } from "react";

export interface TweetDisplayProps 
{
    tweet: TweetDisplayInfo;
}

function relativeTimeString(dateStr: string) 
{
    const now = new Date();
    const d = new Date(dateStr);
    const diff = now.getTime() - d.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) 
        return `${days}d`;
    else if (hours > 0) 
        return `${hours}h`;
    else if (minutes > 0) 
        return `${minutes}m`;
    else 
        return 'just now';
}

export function TweetDisplay(props: TweetDisplayProps) 
{
    const tweet = props.tweet;
    const [liked, setLiked] = useState(tweet.liked);
    const [totalLikes, setTotalLikes] = useState(tweet.totalLikes);

    const likeHandler = async () =>
    {
        await (new ApiTweet()).like(tweet.id);
        setLiked(true);
        setTotalLikes(totalLikes + 1);
    }

    const unlikeHandler = async () =>
    {
        await (new ApiTweet()).unlike(tweet.id);
        setLiked(false);
        setTotalLikes(totalLikes - 1);
    }

    return (
        <Wrapper>
            <Picture src={tweet.user.pictureUrl ?? emptyAvatar}/>
            <Description>
                <header>
                    <UserName>{tweet.user.name}</UserName>
                    <UserTag>@{tweet.user.username}</UserTag> 
                    • 
                    <RelativeTime>{relativeTimeString(tweet.createdAt)}</RelativeTime>
                </header>

                <Content>{tweet.content}</Content>

                <footer>
                    <Icon>
                        <HiOutlineChatBubbleLeft/>
                        <span>{tweet.totalReplies}</span>
                    </Icon>
                    <Icon>
                        {liked ?
                            <IoIosHeart className="lighted" onClick={unlikeHandler}/> :
                            <IoMdHeartEmpty onClick={likeHandler}/>
                        }
                        <span>{totalLikes}</span>
                    </Icon>
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
    font-weight: bolder;
    margin-right: 1rem;
`;

const UserTag = styled.span`
    color: color-mix(in srgb, var(--color-3) 50%, transparent);
    margin-right: 0.5rem;
`;

const RelativeTime = styled.span`
    margin-left: 0.5rem;
`;

const Icon = styled.span`
    display: flex;
    align-items: center;
    gap: 0.3rem;
    margin-right: 1rem;

    & > svg {
        font-size: 1.3rem;
        cursor: pointer;
    }

    & > .lighted {
        color: var(--color-2);
    }
`;