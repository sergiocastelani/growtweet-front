import styled from "styled-components";
import logo from "../assets/logo.svg";
import { FaHashtag, FaHome, FaRegUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { TweetNewForm } from "./tweet/tweet-new-form";
import { LoggedUserInfo } from "./logged-user-info";
import { UserAuthInfo } from "../api/dto/auth-dtos";
import { useNavigate } from "react-router-dom";

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
            <Logo src={logo}/>
            <ItemList>
                <Item onClick={() => navigate('/')}><FaHome/> Home</Item>
                <Item onClick={() => navigate('/explore')}><FaHashtag /> Explore</Item>
                
                {userInfo &&
                    <Item onClick={() => navigate(`/profile/${userInfo?.id}`)}><FaRegUser/> My Profile</Item>
                }
            </ItemList>

            {userInfo &&
                <>
                    <CreateTweetButton onClick={() => setShowNewTweetForm(true)}>
                        + Tweet Now
                    </CreateTweetButton>
                    {showNewTweetForm &&
                        <TweetNewForm 
                            onCreated={() => window.location.reload()}
                            onCancel={() => setShowNewTweetForm(false)}
                        />
                    }
                </>
            }

            {(userInfo === null) &&
                <LoginButton onClick={loginButtonHandler}>
                    Login
                </LoginButton>
            }

            <LoggedUserInfoStyled userInfo={userInfo}/>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 13rem;
    padding: 1rem 1rem 0 10px;
    border-right: 1px solid color-mix(in srgb, var(--color-3) 30%, transparent);
`;

const Logo = styled.img`
    width: 80%;
`;

const ItemList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1rem 0;
`;

const Item = styled.div`
    cursor: pointer;

    & svg {
        vertical-align: text-top;
        margin-right: 0.5rem;
    }

    &:hover {
        color: color-mix(in srgb, var(--color-bg-4) 80%, white);
    }
`;

const CreateTweetButton = styled.button`
    width: 100%;
    font-weight: bold;
    font-size: 1rem;
    padding: 0.5rem;
    border-radius: 1rem;
    border: none;
    background-color: var(--color-bg-4);
    color: var(--color-fg-4);

    &:hover {
        background-color: color-mix(in srgb, var(--color-bg-4) 80%, white);
    }
`;

const LoginButton = styled.button`
    width: 100%;
    font-weight: bold;
    font-size: 1rem;
    padding: 0.5rem;
    border-radius: 1rem;
    border: none;
    background-color: var(--color-bg-4);
    color: var(--color-fg-4);

    &:hover {
        background-color: color-mix(in srgb, var(--color-bg-4) 80%, white);
    }
`;

const LoggedUserInfoStyled = styled(LoggedUserInfo)`
    position: absolute;
    bottom: 1rem;
`;