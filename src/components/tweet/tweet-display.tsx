import { styled } from "styled-components";
import { TweetDisplayInfo } from "../../api/dto/tweet-dtos";
import emptyAvatar from '../../assets/empty_avatar.png'
import { ApiTweet } from "../../api/api-tweet";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TweetNewForm } from "./tweet-new-form";
import { ApiAuth } from "../../api/api-auth";
import { LuArrowDownToLine, LuArrowUpToLine, LuHeart, LuMessageCircle } from "react-icons/lu";
import { IconButton } from "../ui/icon-button";

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

/** Accessible name of an icon button that also shows a count, e.g. "Like it (3)". */
function labelWithCount(label: string, count: number): string
{
    return `${label} (${count})`;
}

const LABEL_LIKE = "Like it";
const LABEL_UNLIKE = "Unlike it";
const LABEL_REPLY = "Reply";
const LABEL_SHOW_REPLIES = "Show replies";
const LABEL_SHOW_REPLIED = "Show replied tweet";
const LABEL_OPEN_PROFILE = "Open user profile";

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

    const likeLabel = liked ? LABEL_UNLIKE : LABEL_LIKE;

    return (
        <Wrapper>
            <Picture
                src={tweet.user.pictureUrl || emptyAvatar}
                alt={`${tweet.user.name} avatar`}
            />
            <Description>
                <Header>
                    <UserName>
                        {tweet.user.name}
                    </UserName>
                    <UserTag to={`/profile/${tweet.user.id}`} title={LABEL_OPEN_PROFILE}>
                        @{tweet.user.username}
                    </UserTag>
                    <Meta aria-hidden="true">•</Meta>
                    <Meta as="time" dateTime={tweet.createdAt}>
                        {relativeTimeString(tweet.createdAt)}
                    </Meta>
                </Header>

                <Content>
                    {tweet.content}
                </Content>

                <Actions>
                    <IconButton
                        $tone="accent"
                        $active={liked}
                        title={likeLabel}
                        aria-label={labelWithCount(likeLabel, totalLikes)}
                        onClick={liked ? unlikeHandler : likeHandler}
                    >
                        <LuHeart fill={liked ? "currentColor" : "none"} aria-hidden="true"/>
                        <span>{totalLikes}</span>
                    </IconButton>

                    <IconButton
                        title={LABEL_REPLY}
                        aria-label={labelWithCount(LABEL_REPLY, tweet.totalReplies)}
                        onClick={startReply}
                    >
                        <LuMessageCircle aria-hidden="true"/>
                        <span>{tweet.totalReplies}</span>
                    </IconButton>

                    {canNavigateDown && tweet.totalReplies > 0 &&
                    <IconButton
                        title={LABEL_SHOW_REPLIES}
                        aria-label={LABEL_SHOW_REPLIES}
                        onClick={() => openReplies(tweet.id)}
                    >
                        <LuArrowDownToLine aria-hidden="true"/>
                    </IconButton>
                    }

                    {canNavigateUp && tweet.repliedId &&
                    <IconButton
                        title={LABEL_SHOW_REPLIED}
                        aria-label={LABEL_SHOW_REPLIED}
                        onClick={() => openReplies(tweet.repliedId!)}
                    >
                        <LuArrowUpToLine aria-hidden="true"/>
                    </IconButton>
                    }
                </Actions>

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

const Wrapper = styled.article`
    display: flex;
    gap: var(--space-3);
    margin: 0;
    padding: var(--space-3) var(--space-4);
    border-top: 1px solid var(--color-border);
    font-size: var(--font-size-sm);
    line-height: var(--line-height-base);
    color: var(--color-text);
    transition: background-color var(--duration-fast) var(--ease-out);

    &:hover {
        background-color: var(--color-surface-hover);
    }
`;

const Picture = styled.img`
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    border-radius: 50%;
    object-fit: cover;
`;

const Description = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
`;

const Header = styled.header`
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    column-gap: var(--space-1);
    line-height: var(--line-height-tight);
`;

const UserName = styled.span`
    font-weight: var(--font-weight-bold);
    color: var(--color-text);
    overflow-wrap: anywhere;
    margin-right: var(--space-1);
`;

const UserTag = styled(Link)`
    color: var(--color-text-muted);
    text-decoration: none;
    border-radius: var(--radius-sm);
    overflow-wrap: anywhere;
    transition: color var(--duration-fast) var(--ease-out);

    &:hover {
        color: var(--color-text-secondary);
        text-decoration: underline;
    }

    &:active {
        color: var(--color-text);
    }

    @media (width <= 600px) {
        padding: var(--space-3) var(--space-1);
        margin: calc(-1 * var(--space-3)) calc(-1 * var(--space-1));
    }
`;

const Meta = styled.span`
    color: var(--color-text-muted);
`;

const Content = styled.p`
    margin: var(--space-1) 0 0 0;
    font-size: var(--font-size-sm);
    line-height: var(--line-height-base);
    overflow-wrap: anywhere;
`;

const Actions = styled.footer`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-4);
    margin: var(--space-1) 0 0 calc(-1 * var(--space-2));
`;
