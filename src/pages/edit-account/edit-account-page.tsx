import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { EditAccountForm } from "./edit-account-form";
import { CenteredPage, Panel } from "../../components/ui/panel";
import { useToast } from "../../components/toast-context";

const ACCOUNT_UPDATED_MESSAGE = "Account updated!";

export function EditAccountPage()
{
    const navigate = useNavigate();
    const { showToast } = useToast();

    const handleSuccess = () =>
    {
        showToast(ACCOUNT_UPDATED_MESSAGE, "success");
        navigate(-1);
    };

    return (
        <CenteredPage>
            <EditPanel>
                <Title>Edit your account</Title>
                <EditAccountForm onSuccess={handleSuccess} />
            </EditPanel>
        </CenteredPage>
    );
}

const EditPanel = styled(Panel)`
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
