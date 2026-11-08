import { styled } from "styled-components";
import { PageTitle } from "../components/ui/page-title";

export function ExplorePage()
{
    return (
        <>
            <PageTitle>Explore <small>(static demo page)</small></PageTitle>
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
            <Item>
                <header>Art - 1 hour ago</header>
                <p>Blum & Poe and Gagosian have been ordered to pay damages to the plaintiffs</p>
            </Item>
        </>
    )
}

const Item = styled.div`
    padding: var(--space-3) var(--space-4);
    margin: 0;
    border-bottom: 1px solid var(--color-border);
    transition: background-color var(--duration-fast) var(--ease-out);

    &:hover {
        background-color: var(--color-surface-hover);
    }

    & > header {
        margin: 0 0 var(--space-1) 0;
        padding: 0;
        font-size: var(--font-size-xs);
        line-height: var(--line-height-tight);
        color: var(--color-text-muted);
    }

    & > p {
        margin: 0;
        padding: 0;
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-semibold);
        line-height: var(--line-height-base);
        color: var(--color-text);
    }
`;
