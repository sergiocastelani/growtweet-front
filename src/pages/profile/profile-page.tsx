import { styled } from "styled-components";
import { NavBar } from "../../components/nav-bar";
import { TweetList } from "../../components/tweet/tweet-list";
import { News } from "../../components/news";
import { useEffect, useState } from "react";
import { TweetDisplayInfo } from "../../api/dto/tweet-dtos";
import { ApiTweet } from "../../api/api-tweet";
import { useParams } from "react-router-dom";
import { UserDisplayInfo } from "../../api/dto/user-dtos";
import { ApiUser } from "../../api/api-user";
import { ProfileUserInfo } from "./profile-user-info";

export function ProfilePage()
{
    const [tweets, setTweets] = useState<TweetDisplayInfo[]>([]);
    const [userProfile, setUserProfile] = useState<UserDisplayInfo>();
    const { userId } = useParams();

    useEffect(() => {
        const userIdInt = parseInt(userId ?? '');
        if(isNaN(userIdInt))
            return;

        (new ApiTweet()).fromUserId(userIdInt)
            .then((response) => {
                setTweets(response.data.data);
            });

        (new ApiUser()).byId(userIdInt)
            .then((response) => {
                setUserProfile(response.data.data);
            });
    }, []);

    return (
        <Wrapper>
            <NavBar/>
            <CentralWidget>
                <Header>
                    <Tittle>Profile</Tittle>
                    <ProfileUserInfo userProfile={userProfile}/>
                </Header>
                <TweetList tweets={tweets} loading={tweets.length === 0}/>
            </CentralWidget>
            <News/>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    align-items: stretch;
    justify-content: center;
    height: 100vh;
    padding: 0;
    margin: 0;
    background-color: var(--color-bg-2);
    color: var(--color-fg-2);
`;

const CentralWidget = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0;
    width: 50%;
    max-width: 600px;
`;

const Header = styled.header`
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    padding: 1rem;
    margin: 0;
    font-size: 1rem;
    font-weight: bold;
`
const Tittle = styled.header`
    margin: 0 0 1rem 0;
    font-size: 1.2rem;
    font-weight: bold;
`
