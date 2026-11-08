import { UserAuthInfo } from "../api/dto/auth-dtos";
import { styled } from "styled-components";
import emptyAvatar from '../assets/empty_avatar.png'
import { LogoutButton } from "./logout-button";

export interface LoggedUserInfoProps
{
    className?: string;
    userInfo: UserAuthInfo | null;
}

export function LoggedUserInfo( props: LoggedUserInfoProps)
{
    const { userInfo } = props;

    if (! userInfo)
        return <></>;

    return (
        <Wrapper className={props.className}>
            <Picture src={userInfo.pictureUrl ?? emptyAvatar} alt={`${userInfo.name} avatar`}/>
            <Description>
                <UserName>{userInfo.name}</UserName>
                <UserTag>@{userInfo.username}</UserTag>
                <LogoutButton/>
            </Description>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-2) var(--space-3);
    margin: 0;
    border: none;
    color: var(--color-text);
    font-size: var(--font-size-sm);
    min-width: 0;
`;

const Picture = styled.img`
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    border-radius: 50%;
    object-fit: cover;
`;

const Description = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 0;

    & > button {
        margin-left: calc(-1 * var(--space-2));
    }
`;

const UserName = styled.span`
    max-width: 100%;
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-tight);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const UserTag = styled.span`
    max-width: 100%;
    font-size: var(--font-size-xs);
    line-height: var(--line-height-tight);
    color: var(--color-text-muted);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;
