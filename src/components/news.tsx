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
    border: none;
    @media (width <= 1024px) {
        display: none;
    }
`;

const Box = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    padding: var(--space-3);
    margin: var(--space-6);
    max-width: 300px;
    background-color: var(--color-surface-1);
    color: var(--color-text);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-1);

    & > header {
        padding: var(--space-1) var(--space-3) var(--space-2);
        font-size: var(--font-size-md);
        font-weight: var(--font-weight-bold);
        line-height: var(--line-height-tight);
    }

    & > a {
        align-self: flex-start;
        margin-top: var(--space-1);
        padding: var(--space-1) var(--space-3);
        border-radius: var(--radius-sm);
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-medium);
        color: var(--color-accent);
        text-decoration: none;
        transition: color var(--duration-fast) var(--ease-out);

        &:hover {
            color: var(--color-accent-hover);
            text-decoration: underline;
        }

        &:active {
            color: var(--color-accent-pressed);
        }
    }
`;

const Item = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-md);
    transition: background-color var(--duration-fast) var(--ease-out);

    &:hover {
        background-color: var(--color-surface-hover);
    }

    & > header {
        margin: 0;
        padding: 0;
        font-size: var(--font-size-xs);
        color: var(--color-text-muted);
    }

    & > p {
        margin: 0;
        padding: 0;
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-semibold);
        line-height: var(--line-height-tight);
    }
`;
