import { useNavigate } from "react-router-dom";
import { LuPencil } from "react-icons/lu";
import { Button } from "./ui/button";

export function EditProfileButton()
{
    const navigate = useNavigate();

    return (
        <Button
            type="button"
            $variant="ghost"
            onClick={() => navigate('/edit-profile')}
        >
            <LuPencil aria-hidden="true"/>Edit
        </Button>
    );
}
