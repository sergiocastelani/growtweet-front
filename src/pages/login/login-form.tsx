import styled from "styled-components";
import { ApiConnection } from "../../api/api-connection";
import React from "react";

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

        new ApiConnection().post('/auth/login', {email, password})
            .then((response) => {
                console.log(response);
                localStorage.setItem(ApiConnection.AUTH_TOKEN_NAME, response.data?.data?.token);
                props.onSuccess?.();
            })
            .catch((reason: any) => {
                setErrorMessage(reason.response?.data?.message ?? reason.message);
            });
    }

    return (
        <Wrapper onSubmit={submitHandler}>
            <input type="text" name="email" placeholder="user email" />

            <input type="password" name="password" placeholder="Password" />

            {errorMessage ? <ErrorLabel>{errorMessage}</ErrorLabel> : ''}

            <button type="submit">Login</button>
        </Wrapper>
    );
}

const Wrapper = styled.form`
    display: flex;
    flex-direction: column;
`;

const ErrorLabel = styled.label`
    color: red;
`;