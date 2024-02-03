import { styled } from "styled-components";
import { UserDisplayInfo } from "../../api/dto/user-dtos";
import emptyAvatar from '../../assets/empty_avatar.png';
import { ProfileUserInfoLoading } from "./profile-user-info-loading";

export interface ProfileUserInfoProps
{
    userProfile?: UserDisplayInfo;
}

export function ProfileUserInfo(props: ProfileUserInfoProps)
{
    const {userProfile} = props;

    if (!userProfile)
        return <ProfileUserInfoLoading/>;

    return (
        <Wrapper>
            {userProfile.pictureUrl ?
                <Picture src={userProfile?.pictureUrl}/> :
                <Picture src={emptyAvatar}/>
            }
            <UserName>{userProfile?.name}</UserName>
            <UserTag>@{userProfile?.username}</UserTag>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Picture = styled.img`
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    border: 4px solid var(--color-fg-1);
`;

const UserName = styled.span`
    font-weight: bold;
    margin-left: 0.5rem;
`;

const UserTag = styled.span`
    margin-left: 0.5rem;
    font-weight: 100;
    color: color-mix(in srgb, var(--color-fg-2) 50%, transparent);
`;
