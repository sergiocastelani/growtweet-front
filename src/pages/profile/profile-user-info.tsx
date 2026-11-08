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
                <Picture
                    src={userProfile.pictureUrl || emptyAvatar}
                    alt={`${userProfile.name} avatar`}
                />
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

const AVATAR_SIZE = "96px";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
`;

const PictureRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--space-4);
    margin-bottom: var(--space-3);
`;

const ActionsColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: var(--space-2);
`;

const Picture = styled.img`
    width: ${AVATAR_SIZE};
    height: ${AVATAR_SIZE};
    flex-shrink: 0;
    object-fit: cover;
    border-radius: 50%;
    background-color: var(--color-surface-2);
    box-shadow: 0 0 0 2px var(--color-surface-0), 0 0 0 4px var(--color-accent);
`;

const UserName = styled.span`
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-tight);
    color: var(--color-text);
    overflow-wrap: anywhere;
`;

const UserTag = styled.span`
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
    overflow-wrap: anywhere;
`;
