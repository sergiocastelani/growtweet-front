import { styled } from "styled-components";
import { TweetList } from "../../components/tweet/tweet-list";
import { useEffect, useState } from "react";
import { TweetDisplayInfo } from "../../api/dto/tweet-dtos";
import { ApiTweet } from "../../api/api-tweet";
import { useParams } from "react-router-dom";
import { UserDisplayInfo } from "../../api/dto/user-dtos";
import { ApiUser } from "../../api/api-user";
import { ProfileUserInfo } from "./profile-user-info";
import { PageTitle } from "../../components/ui/page-title";

export function ProfilePage()
{
    const [tweets, setTweets] = useState<TweetDisplayInfo[] | null>(null);
    const [userProfile, setUserProfile] = useState<UserDisplayInfo>();
    const { userId } = useParams();

    useEffect(() => {
        const userIdInt = parseInt(userId ?? '');
        if(isNaN(userIdInt))
            return;

        setTweets(null);
        
        (new ApiTweet()).fromUserId(userIdInt)
            .then((response) => {
                setTweets(response.data.data);
            });

        (new ApiUser()).byId(userIdInt)
            .then((response) => {
                setUserProfile(response.data.data);
            });
    }, [userId]);

    return (
        <>
            <PageTitle>Profile</PageTitle>
            <Header>
                <ProfileUserInfo userProfile={userProfile}/>
            </Header>
            <TweetList tweets={tweets ?? []} loading={tweets === null}/>
        </>
    )
}

const Header = styled.header`
    margin: 0;
    padding: var(--space-4);
`;
