import { UserAuthInfo } from "../api/dto/auth-dtos";
import { styled } from "styled-components";
import emptyAvatar from '../assets/empty_avatar.png'
import { ApiAuth } from "../api/api-auth";
import { useState } from "react";
import { PulseLoader } from "react-spinners";

export interface LoggedUserInfoProps
{
    className?: string;
    userInfo: UserAuthInfo | null;
}

export function LoggedUserInfo( props: LoggedUserInfoProps)
{
    const { userInfo } = props;
    const [loading, setLoading]= useState(false);

    const logoutHandler = () => {
        if (loading)
            return;

        setLoading(true);

        (new ApiAuth()).logout()
            .finally(() => {
                window.location.reload();
                setLoading(false)
            });
    }

    if (! userInfo)
        return <></>;

    return (
        <Wrapper className={props.className}>
            <Picture src={userInfo.pictureUrl ?? emptyAvatar}/>
            <Description>
                <UserName>{userInfo.name}</UserName>
                <UserTag>@{userInfo.username}</UserTag>
                <PulseLoaderStyled loading={loading} size="0.5rem" color="white"/>
                {loading || <Logout onClick={logoutHandler}>Logout</Logout>}
            </Description>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    border-width: 0;
    margin: 0;
    padding: 0;
    gap: 0.5rem;
    font-size: 0.8rem;
`;

const Picture = styled.img`
    width: 2.7rem;
    height: 2.7rem;
    border-radius: 50%;
`;

const Description = styled.div`
    display: flex;
    flex-direction: column;
`;

const UserName = styled.span`
    font-weight: bold;
`;

const UserTag = styled.span`
    font-weight: 100;
    color: color-mix(in srgb, var(--color-fg-2) 30%, transparent);
`;

const Logout = styled.div`
    margin-top: 2rem;
    margin-left: -3rem;
    cursor: pointer;
    font-size: smaller;
`
const PulseLoaderStyled = styled(PulseLoader)`
    margin-top: 2rem;
    margin-left: -3rem;
`;
