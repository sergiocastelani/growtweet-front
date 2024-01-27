import styled from "styled-components";
import logo from "../assets/logo.svg";
import { FaHashtag, FaHome, FaRegUser } from "react-icons/fa";
import { useState } from "react";
import { TweetNewForm } from "./tweet/tweet-new-form";

export function NavBar()
{
    const [showNewTweetForm, setShowNewTweetForm] = useState(false);

    return (
        <Wrapper>
            <Logo src={logo}/>
            <ItemList>
                <Item><FaHome/> Home</Item>
                <Item><FaHashtag /> Explore</Item>
                <Item><FaRegUser/> Profile</Item>
            </ItemList>
            <CreateTweetButton onClick={() => setShowNewTweetForm(true)}>
                + Tweet Now
            </CreateTweetButton>

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
    flex-direction: column;
    gap: 1rem;
    width: 10rem;
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
    & svg {
        vertical-align: text-top;
        margin-right: 0.5rem;
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