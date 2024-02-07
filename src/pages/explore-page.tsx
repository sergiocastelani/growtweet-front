import { styled } from "styled-components";

export function ExplorePage()
{
    return (
        <>
            <Tittle>Explore <small>(static demo page)</small></Tittle>
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

const Tittle = styled.header`
    padding: 1rem;
    margin: 0;
    font-size: 1.2rem;
    font-weight: bold;
    border-color: color-mix(in srgb, var(--color-3) 30%, transparent);
    border-style: solid;
    border-width: 0 0 1px 0;

    small {
        font-size: 0.7rem;
        font-weight: normal;
    }
`
const Item = styled.div`
    margin: 1rem 0 1.5rem 1rem;

    & > header {
        font-size: 0.7rem;
        margin: 0 0 3px 0;
        padding: 0;
        color: color-mix(in srgb, var(--color-3) 50%, transparent);
    }

    & > p {
        margin: 0;
        padding: 0;
        font-size: 0.8rem;
        font-weight: bold;
    }
`;
