import { styled } from "styled-components";
import { TweetList } from "../../components/tweet/tweet-list";
import { useEffect, useState } from "react";
import { TweetDisplayInfo } from "../../api/dto/tweet-dtos";
import { ApiTweet } from "../../api/api-tweet";
import { useParams } from "react-router-dom";
import { UserDisplayInfo } from "../../api/dto/user-dtos";
import { ApiUser } from "../../api/api-user";
import { ProfileUserInfo } from "./profile-user-info";
import { SlLogout } from "react-icons/sl";
import { ApiAuth } from "../../api/api-auth";

export function ProfilePage()
{
    const [tweets, setTweets] = useState<TweetDisplayInfo[]>([]);
    const [userProfile, setUserProfile] = useState<UserDisplayInfo>();
    const { userId } = useParams();
    const [loggingOut, setLoggingOut]= useState(false);
    const loggedUser = ApiAuth.getLoggedUser();

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

    const logoutHandler = () => {
        if (loggingOut)
            return;

        setLoggingOut(true);

        (new ApiAuth()).logout()
            .finally(() => {
                window.location.reload();
                setLoggingOut(false)
            });
    }

    return (
        <>
            <Header>
                <Tittle>
                    Profile
                    {!loggingOut && loggedUser && loggedUser?.id == userProfile?.id &&
                        <Logout onClick={logoutHandler}>
                            <SlLogout/>Logout
                        </Logout>
                    }
                </Tittle>
                <ProfileUserInfo userProfile={userProfile}/>
            </Header>
            <TweetList tweets={tweets} loading={tweets.length === 0}/>
        </>
    )
}

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
const Logout = styled.div`
    display: inline;
    margin-left: 2rem;
    cursor: pointer;
    font-size: 0.8rem;

    & svg {
        vertical-align: text-top;
        margin-right: 0.5rem;
    }
`
