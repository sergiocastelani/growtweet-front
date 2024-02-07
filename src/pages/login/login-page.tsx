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
                    <CreateAccountButton onClick={() => navigate('/new-account')}>
                        Create your new account
                    </CreateAccountButton>
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
    min-width: 250px;

    @media (width <= 768px) {
        width: 80%;
        flex-direction: column;
    }
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

    @media (width <= 768px) {
        padding: 20px;
        border-radius: 10px 10px 0 0;

        & h1 {
            font-size: 2rem;
        }

        & h2 {
            font-size: 1rem;
        }

        & p {
            margin-top: 1rem;
            line-height: 1.2rem;
            font-size: 0.9rem;
        }
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

    @media (width <= 768px) {
        padding: 20px;
        border-radius: 0 0 10px 10px;
    }
`;

const CreateAccountButton = styled.div`
    margin-top: 2rem;
    font-size: 0.8rem;
    cursor: pointer;
    text-decoration: underline;
    align-self: end;
`;
