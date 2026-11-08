import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { LuLogOut } from "react-icons/lu";
import { ApiAuth } from "../api/api-auth";
import { Button } from "./ui/button";

export function LogoutButton() {
    const [loading, setLoading]= useState(false);
    const navigate = useNavigate();

    const logoutHandler = () => {
        if (loading)
            return;

        setLoading(true);

        (new ApiAuth()).logout()
            .finally(() => {
                navigate(0);
                setLoading(false)
            });
    }

    return (
        <Logout type="button" onClick={logoutHandler} disabled={loading}>
            <LuLogOut aria-hidden="true"/> Logout
        </Logout>
    );
}

const Logout = styled(Button).attrs({ $variant: "ghost" as const })`
    border-color: transparent;
    padding: 0 var(--space-2);
    gap: var(--space-2);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-secondary);

    & svg {
        font-size: var(--font-size-sm);
    }

    &:hover:not(:disabled) {
        color: var(--color-text);
    }
`;
