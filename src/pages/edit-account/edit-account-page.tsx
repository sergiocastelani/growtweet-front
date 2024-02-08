import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import { EditAccountForm } from "./edit-account-form";

export function EditAccountPage()
{
    const navigate = useNavigate();

    return (
        <Wrapper>
            <MainPanel>
                <h1>Edit your account</h1>
                <EditAccountForm 
                    onSuccess={()=> {
                        alert("Account updated!");
                        navigate(-1);
                    }}
                />
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
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    background-color: var(--color-bg-5);
    color: var(--color-fg-5);
    padding: 50px;
    border-radius: 10px;
    width: 60%;
    min-width: 300px;
    max-width: 500px;
`;
