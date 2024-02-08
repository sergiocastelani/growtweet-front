import { styled } from "styled-components";
import { UserDisplayInfo } from "../../api/dto/user-dtos";
import emptyAvatar from '../../assets/empty_avatar.png';
import { ProfileUserInfoLoading } from "./profile-user-info-loading";
import { ApiAuth } from "../../api/api-auth";
import { LogoutButton } from "../../components/logout-button";
import { EditProfileButton } from "../../components/edit-profile-button";

export interface ProfileUserInfoProps
{
    userProfile?: UserDisplayInfo;
}

export function ProfileUserInfo(props: ProfileUserInfoProps)
{
    const {userProfile} = props;
    const loggedUser = ApiAuth.getLoggedUser();

    if (!userProfile)
        return <ProfileUserInfoLoading/>;

    return (
        <Wrapper>
            <PictureRow>
                {userProfile.pictureUrl ?
                    <Picture src={userProfile?.pictureUrl}/> :
                    <Picture src={emptyAvatar}/>
                }
                <ActionsColumn>
                    {loggedUser && loggedUser?.id == userProfile?.id &&
                        <>
                            <LogoutButton/>
                            <EditProfileButton/>
                        </>
                    }
                </ActionsColumn>
            </PictureRow>
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

const PictureRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
    gap: 1rem;
`;

const ActionsColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.7rem;
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
