import styled from "styled-components";
import { FaHashtag, FaHome, FaRegUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { UserAuthInfo } from "../api/dto/auth-dtos";
import { useNavigate } from "react-router-dom";

export function NavBarMobile()
{
//    const [showNewTweetForm, setShowNewTweetForm] = useState(false);
    const [userInfo, setUserInfo] = useState<UserAuthInfo | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("user");
        if(user)
            setUserInfo(JSON.parse(user));
    },[]);

    return (
        <Wrapper>
            <Item onClick={() => navigate('/')}><FaHome/></Item>
            <Item onClick={() => navigate('/explore')}><FaHashtag /></Item>
            
            {userInfo &&
                <Item onClick={() => navigate(`/profile/${userInfo?.id}`)}><FaRegUser/></Item>
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
