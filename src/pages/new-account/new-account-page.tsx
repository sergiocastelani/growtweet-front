import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { CenteredPage, Panel } from "../../components/ui/panel";
import { NewAccountForm } from "./new-account-form";

export function NewAccountPage()
{
    const navigate = useNavigate();

    return (
        <CenteredPage>
            <AccountPanel>
                <Title>Create your account</Title>
                <NewAccountForm onSuccess={()=> navigate('/login')}/>
            </AccountPanel>
        </CenteredPage>
    )
}

const AccountPanel = styled(Panel)`
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
    width: 100%;
    max-width: 500px;
`;

const Title = styled.h1`
    margin: 0;
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-tight);
    color: var(--color-text);
`;
