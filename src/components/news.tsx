import { Link } from "react-router-dom";
import { styled } from "styled-components";

export function News()
{
    return (
        <Wrapper>
            <Box>
                <header>What is happening now?</header>
                <Item>
                    <header>Sports - 45 min ago</header>
                    <p>Why Pete Carroll was one of the NFL's 'best ever' coaches</p>
                </Item>
                <Item>
                    <header>Brazil - 10 min ago</header>
                    <p>Laws, scandals, and taxes: the future of gambling in Brazil</p>
                </Item>
                <Item>
                    <header>Music - 30 min ago</header>
                    <p>Tom Walker: 'I lost my way with music'</p>
                </Item>
                <Item>
                    <header>Cinema - 15 min ago</header>
                    <p>Film of the Week: 'The Zone of Interest'</p>
                </Item>
                <Link to="/explore">Show more ...</Link>
            </Box>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    border-left: 1px solid color-mix(in srgb, var(--color-3) 30%, transparent);
`;

const Box = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    margin: 30px;
    background-color: color-mix(in srgb, var(--color-bg-3) 90%, white);
    color: var(--color-fg-3);
    border-radius: 0.5rem;
    max-width: 300px;

    & > header {
        font-weight: bold;
    }

    & > a {
        font-size: 0.6rem;
        margin: 0;
        padding: 0;
    }
`;

const Item = styled.div`
    & > header {
        font-size: 0.6rem;
        margin: 0;
        padding: 0;
    }

    & > p {
        margin: 0;
        padding: 0;
        font-size: 0.8rem;
        font-weight: bold;
    }
`;
