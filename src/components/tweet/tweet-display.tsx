import { styled } from "styled-components";
import { TweetDisplayInfo } from "../../api/dto/tweet-dtos";
import emptyAvatar from '../../assets/empty_avatar.png'
import { HiOutlineChatBubbleLeft } from "react-icons/hi2";
import { IoIosHeart, IoMdHeartEmpty } from "react-icons/io";
import { ApiTweet } from "../../api/api-tweet";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TweetNewForm } from "./tweet-new-form";
import { ApiAuth } from "../../api/api-auth";
import { LuArrowDownToLine, LuArrowUpToLine } from "react-icons/lu";

export interface TweetDisplayProps 
{
    tweet: TweetDisplayInfo;
    canNavigateDown?: boolean;
    canNavigateUp?: boolean;
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
    const {
        tweet, 
        canNavigateDown = true, 
        canNavigateUp = true
    } = props;

    const [liked, setLiked] = useState(tweet.liked);
    const [totalLikes, setTotalLikes] = useState(tweet.totalLikes);
    const [replying, setReplying] = useState(false);

    const navigate = useNavigate();

    const likeHandler = async () =>
    {
        setLiked(true);
        setTotalLikes(totalLikes + 1);
        await (new ApiTweet()).like(tweet.id);
    }

    const unlikeHandler = async () =>
    {
        setLiked(false);
        setTotalLikes(totalLikes - 1);
        await (new ApiTweet()).unlike(tweet.id);
    }

    const startReply = async () => 
    {
        await new ApiAuth().check();
        setReplying(true);
    }

    const replyCanceled = () => 
    {
        setReplying(false);
    }

    const replyCreated = () => 
    {
        setReplying(false);
        window.location.reload();
    }

    const openReplies = (tweetId: number) => 
    {
        navigate(`/replies/${tweetId}`);
    }

    return (
        <Wrapper>
            {tweet.user.pictureUrl ?
                <Picture src={tweet.user.pictureUrl}/> :
                <Picture src={emptyAvatar}/>
            }
            <Description>
                <header>
                    <UserName>
                        {tweet.user.name}
                    </UserName>
                    <UserTag 
                        title="Open user profile"
                        onClick={()=>{ navigate(`/profile/${tweet.user.id}`) }
                    }>
                        @{tweet.user.username}
                    </UserTag> 
                    • 
                    <RelativeTime>
                        {relativeTimeString(tweet.createdAt)}
                    </RelativeTime>
                </header>

                <Content>
                    {tweet.content}
                </Content>

                <footer>
                    <Icon>
                        {liked ?
                            <IoIosHeart 
                                title="Unlike it"
                                className="lighted" 
                                onClick={unlikeHandler}
                            /> 
                        :
                            <IoMdHeartEmpty 
                                title="Like it"
                                onClick={likeHandler}
                            />
                        }
                        <span>{totalLikes}</span>
                    </Icon>

                    <Icon>
                        <HiOutlineChatBubbleLeft 
                            title="Reply"
                            onClick={startReply}
                        />
                        <span>{tweet.totalReplies}</span>
                    </Icon>

                    {canNavigateDown && tweet.totalReplies > 0 &&
                    <Icon>
                        <LuArrowDownToLine 
                            title="Show replies"
                            onClick={() => openReplies(tweet.id)}
                        />
                    </Icon>
                    }

                    {canNavigateUp && tweet.repliedId &&
                    <Icon>
                        <LuArrowUpToLine 
                            title="Show replied tweet"
                            onClick={() => openReplies(tweet.repliedId!)}
                        />
                    </Icon>
                    }
                </footer>

                {replying && 
                    <TweetNewForm 
                        replyId={tweet.id}
                        onCancel={replyCanceled}
                        onCreated={replyCreated}
                    />
                }
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
    cursor: pointer;
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