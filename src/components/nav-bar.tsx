import styled from "styled-components";
import logo from "../assets/logo.svg";
import { FaHashtag, FaHome, FaRegUser } from "react-icons/fa";

export function NavBar()
{
    return (
        <Wrapper>
            <Logo src={logo}/>
            <ItemList>
                <Item><FaHome/> Home</Item>
                <Item><FaHashtag /> Explore</Item>
                <Item><FaRegUser/> Profile</Item>
            </ItemList>
            <Button>Tweet</Button>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 10rem;
    padding: 1rem 1rem 0 0;
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

const Button = styled.button`
    width: 100%;
    font-weight: bold;
    font-size: 1rem;
    padding: 0.5rem;
    border-radius: 1rem;
    border: none;
    background-color: var(--color-bg-3);
    color: var(--color-fg-3);

    &:hover {
        background-color: color-mix(in srgb, var(--color-bg-3) 80%, white);
    }
`;