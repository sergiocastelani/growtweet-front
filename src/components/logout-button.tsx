import { useState } from "react";
import { ApiAuth } from "../api/api-auth";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { SlLogout } from "react-icons/sl";

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
        <>
            <Logout 
                onClick={logoutHandler} 
                className={loading ? "disabled" : ""}
            >
                <SlLogout/>Logout
            </Logout>
        </>
    );
}

const Logout = styled.div`
    margin-top: 0.5rem;
    cursor: pointer;
    font-size: smaller;

    & svg {
        vertical-align: text-top;
        margin-right: 0.5rem;
    }

    &.disabled {
        cursor: default;
        color: color-mix(in srgb, var(--color-3) 30%, transparent);
    }
`
