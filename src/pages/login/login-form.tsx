import styled from "styled-components";
import React from "react";
import { ApiAuth } from "../../api/api-auth";

export interface LoginFormProps 
{
    onSuccess?: () => void;
}

export function LoginForm(props: LoginFormProps)
{
    const [errorMessage, setErrorMessage] = React.useState<string | undefined>(undefined);

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) =>
    {
        event.preventDefault();
        setErrorMessage(undefined);

        const email = (event.target as HTMLFormElement).email.value;
        const password = (event.target as HTMLFormElement).password.value;

        (new ApiAuth()).login(email, password)
            .then(() => {
                props.onSuccess?.();
            })
            .catch((reason: any) => {
                setErrorMessage(reason.response?.data?.message ?? reason.message);
            });
    }

    return (
        <Wrapper onSubmit={submitHandler}>
            <Input type="text" name="email" placeholder="user email" autoFocus />

            <Input type="password" name="password" placeholder="Password" />

            {errorMessage ? <ErrorLabel>{errorMessage}</ErrorLabel> : ''}

            <Button type="submit">Login</Button>
        </Wrapper>
    );
}

const Wrapper = styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const ErrorLabel = styled.label`
    color: var(--color-danger-2);
    font-weight: bold;
`;

const Input = styled.input`
    border-radius: 5px;
    border: 1px solid var(--color-fg-5);
    background-color: var(--color-bg-5);
    color: var(--color-fg-5);
    height: 2rem;
    padding: 0.5rem;
`;

const Button = styled.button`
    border-radius: 5px;
    border: none;
    background-color: var(--color-bg-2);
    color: var(--color-fg-2);
    padding: 0.5rem;
    font-weight: bold;
`;