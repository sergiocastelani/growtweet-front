import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LuHash, LuHouse, LuUser } from "react-icons/lu";
import logo from "../assets/logo.svg";
import { TweetNewForm } from "./tweet/tweet-new-form";
import { LoggedUserInfo } from "./logged-user-info";
import { UserAuthInfo } from "../api/dto/auth-dtos";
import { Button } from "./ui/button";

/** Nav rows keep at least the 40px hit area used by every control. */
const NAV_ITEM_MIN_HEIGHT = "40px";
/** Same subtle press feedback as the shared buttons. */
const NAV_ITEM_PRESSED_SCALE = 0.97;

export function NavBar()
{
    const [showNewTweetForm, setShowNewTweetForm] = useState(false);
    const [userInfo, setUserInfo] = useState<UserAuthInfo | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("user");
        if(user)
            setUserInfo(JSON.parse(user));
    },[]);

    function loginButtonHandler()
    {
        navigate('/login');
    }

    return (
        <Wrapper>
            <Logo src={logo} alt="GrowTweet"/>
            <ItemList aria-label="Main navigation">
                <Item to="/" end><LuHouse aria-hidden="true"/> Home</Item>
                <Item to="/explore"><LuHash aria-hidden="true"/> Explore</Item>

                {userInfo &&
                    <Item to={`/profile/${userInfo.id}`}><LuUser aria-hidden="true"/> My Profile</Item>
                }
            </ItemList>

            {userInfo &&
                <>
                    <Button type="button" $fullWidth onClick={() => setShowNewTweetForm(true)}>
                        + Tweet Now
                    </Button>
                    {showNewTweetForm &&
                        <TweetNewForm 
                            onCreated={() => window.location.reload()}
                            onCancel={() => setShowNewTweetForm(false)}
                        />
                    }
                </>
            }

            {(userInfo === null) &&
                <Button type="button" $fullWidth onClick={loginButtonHandler}>
                    Login
                </Button>
            }

            <UserChip userInfo={userInfo}/>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    width: 13rem;
    padding: var(--space-4) var(--space-4) var(--space-4) var(--space-3);
    min-height: 0;
    overflow-y: auto;

    @media (width <= 600px) {
        display: none;
    }
`;

const Logo = styled.img`
    width: 80%;
    margin-left: var(--space-3);
`;

const ItemList = styled.nav`
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    margin: var(--space-4) 0;
`;

const Item = styled(NavLink)`
    display: flex;
    align-items: center;
    gap: var(--space-3);
    min-height: ${NAV_ITEM_MIN_HEIGHT};
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-pill);
    color: var(--color-text);
    text-decoration: none;
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-tight);
    transition:
        background-color var(--duration-fast) var(--ease-out),
        color var(--duration-fast) var(--ease-out),
        transform var(--duration-fast) var(--ease-out);

    & svg {
        flex-shrink: 0;
        font-size: var(--font-size-lg);
    }

    &:hover {
        background-color: var(--color-surface-hover);
    }

    &:active {
        transform: scale(${NAV_ITEM_PRESSED_SCALE});
    }

    &[aria-current="page"] {
        color: var(--color-accent);
        font-weight: var(--font-weight-bold);
    }
`;

const UserChip = styled(LoggedUserInfo)`
    margin-top: auto;
`;
