import { styled } from "styled-components";
import { NavBar } from "../components/nav-bar";
import { News } from "../components/news";
import { Outlet } from "react-router-dom";
import { NavBarMobile } from "../components/nav-bar-mobile";

export function MainTemplatePage()
{
    return (
        <VBox>
            <HBox>
                <NavBar/>
                <CentralWidget>
                    <Outlet/>
                </CentralWidget>
                <News/>
            </HBox>
            <NavBarMobile/>
        </VBox>
    )
}

const VBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: start;
    width: 100vw;
    max-width: 100vw;
    height: 100dvh;
    max-height: 100dvh;
    overflow: hidden;
    padding: 0;
    margin: 0;
    background-color: var(--color-bg-2);
    color: var(--color-fg-2);
`;

const HBox = styled.div`
    flex-grow: 1;
    display: flex;
    align-items: stretch;
    justify-content: center;
    max-height: 100%;
    padding: 0;
    margin: 0;

    @media (width <= 600px) {
        max-height: calc(100% - 3rem);
    }
`;

const CentralWidget = styled.div`
    padding: 0;
    margin: 0;
    width: 50%;
    max-width: 600px;
    border: 1px solid color-mix(in srgb, var(--color-3) 30%, transparent);
    border-width: 0 1px 0 1px;
    overflow-y: auto;
    overflow-x: hidden;

    @media (width <= 1024px) {
        flex-grow: 1;
        max-width: none;
    }

    @media (width <= 600px) {
        border: none;
    }
`;

