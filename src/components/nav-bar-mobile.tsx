import styled from "styled-components";
import { FaHashtag, FaHome, FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { SlLogin } from "react-icons/sl";
import { ApiAuth } from "../api/api-auth";
import { useState } from "react";
import { TweetNewForm } from "./tweet/tweet-new-form";
import { BsPlusSquare } from "react-icons/bs";

export function NavBarMobile()
{
    const [showNewTweetForm, setShowNewTweetForm] = useState(false);
    const userInfo = ApiAuth.getLoggedUser();

    const navigate = useNavigate();

    return (
        <Wrapper>
            <Item onClick={() => navigate('/')}><FaHome/></Item>
            <Item onClick={() => navigate('/explore')}><FaHashtag /></Item>
            
            {userInfo &&
                <Item onClick={() => navigate(`/profile/${userInfo?.id}`)}><FaRegUser/></Item>
            }

            {userInfo &&
                <Item onClick={() => setShowNewTweetForm(true)}><BsPlusSquare/></Item>
            }

            {(userInfo == null) &&
                <Item onClick={() => navigate('/login')}><SlLogin/></Item>
            }

            {showNewTweetForm &&
                <TweetNewForm 
                    onCreated={() => window.location.reload()}
                    onCancel={() => setShowNewTweetForm(false)}
                />
            }
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 2rem;
    width: 100%;
    height: 3rem;
    padding: 1rem;
    margin: 0;
    border: 1px solid color-mix(in srgb, var(--color-3) 30%, transparent);
    border-width: 1px 0 0 0;

    @media (width > 600px) {
        display: none;
    }
`;

const Item = styled.div`
    cursor: pointer;

    &:hover {
        color: color-mix(in srgb, var(--color-bg-4) 80%, white);
    }
`;
