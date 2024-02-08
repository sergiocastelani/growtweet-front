import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { VscEdit } from "react-icons/vsc";

export function EditProfileButton() {
    const navigate = useNavigate();

    return (
        <>
            <Button 
                onClick={() => navigate('/edit-profile')}
            >
                <VscEdit/>Edit
            </Button>
        </>
    );
}

const Button = styled.div`
    margin-top: 0.5rem;
    cursor: pointer;
    font-size: smaller;

    & svg {
        vertical-align: text-top;
        margin-right: 0.5rem;
    }
`
