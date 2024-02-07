import { styled } from "styled-components";
import { NavBar } from "../components/nav-bar";
import { News } from "../components/news";
import { Outlet } from "react-router-dom";

export function MainTemplatePage()
{
    return (
        <Wrapper>
            <NavBar/>
            <CentralWidget>
                <Outlet/>
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
