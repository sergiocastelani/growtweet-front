import styled from "styled-components"
import { LoginForm } from "./login-form";
import { useNavigate } from "react-router-dom";

export function LoginPage()
{
    const navigate = useNavigate();

    return (
        <Wrapper>
            <MainPanel>
                <LeftPanel>
                    <h2>Wellcome to</h2>
                    <h1>GrowTweet</h1>
                    <small>Inspirational activity for the course Full Stack Web Starter, from Growdev</small>
                    <p>
                        An innovative social media application designed to mimic the user-friendly interface and real-time communication features of Twitter. 
                        GrowTweet offers a seamless and dynamic platform for users to share their thoughts, updates, and engage in conversations with a global audience. 
                    </p>
                </LeftPanel>
                <RightPanel>
                    <h1>Come in...</h1>
                    <LoginForm onSuccess={()=> navigate('/')}/>
                </RightPanel>
            </MainPanel>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    height: 100vh;
    width: 100vw;
    background-color: var(--color-bg-1);
`;

const MainPanel = styled.div`
    display: flex;
    justify-content: center;
    align-items: stretch;
    height: 60%;
    min-height: 400px;
    width: 60%;
    min-width: 300px;
`;

const LeftPanel = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    flex: 1;
    background-color: var(--color-bg-5);
    color: var(--color-fg-5);
    padding: 50px;
    border-radius: 20px 0 0 20px;

    & h1 {
        font-size: 4rem;
        margin: 0;
    }

    & h2 {
        margin: 0;
    }

    & p {
        text-align: justify;
        margin-top: 2rem;
        line-height: 1.5rem;
    }
`;

const RightPanel = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    flex: 1;
    background-color: var(--color-bg-4);
    color: var(--color-fg-4);
    padding: 50px;
    border-radius: 0px 20px 20px 0;
`;

const Description = styled.p`
    text-align: justify;
`;