import styled from "styled-components"
import { LoginForm } from "./login-form";

export function LoginPage()
{
    return (
        <Wrapper>
            <MainPanel>
                <LeftPanel>
                    <h1>GrowTweet</h1>
                    <small>Insipirational activity from the course Full Stack Web Starter, from Growdev</small>
                    <p>
                        Introducing "GrowTweet", an innovative social media application designed to mimic the user-friendly interface and real-time communication features of Twitter. 
                        GrowTweet offers a seamless and dynamic platform for users to share their thoughts, updates, and engage in conversations with a global audience. 
                    </p>
                </LeftPanel>
                <RightPanel>
                    <h1>Enter the GrowTweet</h1>
                    <LoginForm/>
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
    background-color: #F0F0F0;
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
    background-color: blue;
    color: white;
    padding: 50px;
    border-radius: 20px 0 0 20px;
`;

const RightPanel = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    flex: 1;
    background-color: #FFFFFF;
    padding: 50px;
    border-radius: 0px 20px 20px 0;
`;