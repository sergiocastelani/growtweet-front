import { styled } from "styled-components";
import { NavBar } from "../components/nav-bar";
import { TweetList } from "../components/tweet-list";
import { News } from "../components/news";

export function FeedPage()
{
    return (
        <Wrapper>
            <NavBar/>
            <TweetList/>
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