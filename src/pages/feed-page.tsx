import { styled } from "styled-components";
import { NavBar } from "../components/nav-bar";
import { TweetList } from "../components/tweet-list";
import { News } from "../components/news";

export function FeedPage()
{
    return (
        <Wrapper>
            <NavBar/>
            <CentralWidget>
                <Tittle>Home</Tittle>
                <TweetList 
                    tweets={[{id:1, userId:1, repliedId: null, picture: null, content: "Lorem impsum"}]}
                />
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
    padding: 0;
    width: 50%;
    max-width: 600px;
`;

const Tittle = styled.header`
    padding: 1rem;
    margin: 0;
    font-size: 1.2rem;
    font-weight: bold;
`
