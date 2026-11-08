import { styled } from "styled-components";
import React from "react";
import { ApiAuth } from "../../api/api-auth";
import { PulseLoader } from "react-spinners";
import { isAxiosError } from "axios";
import { Button } from "../../components/ui/button";
import { FieldLabel, TextInput } from "../../components/ui/field";
import { InlineAlert } from "../../components/ui/inline-alert";

/** Loader dot size inside the Login button (unchanged value). */
const LOADER_DOT_SIZE = "0.5rem";

export interface LoginFormProps 
{
    onSuccess?: () => void;
}

export function LoginForm(props: LoginFormProps)
{
    const [errorMessage, setErrorMessage] = React.useState<string | undefined>(undefined);
    const [loading, setLoading] = React.useState(false);

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) =>
    {
        event.preventDefault();
        setErrorMessage(undefined);
        setLoading(true);

        const email = (event.target as HTMLFormElement).email.value;
        const password = (event.target as HTMLFormElement).password.value;

        (new ApiAuth()).login(email, password)
            .then(() => {
                props.onSuccess?.();
            })
            .catch((reason: unknown) => {
                if (isAxiosError(reason))
                    setErrorMessage(reason.response?.data?.message ?? reason.message);
                else
                    setErrorMessage(reason instanceof Error ? reason.message : String(reason));
            })
            .finally(() => setLoading(false));

    }

    return (
        <Form onSubmit={submitHandler}>
            <div>
                <FieldLabel htmlFor="login-email">Email</FieldLabel>
                <TextInput id="login-email" type="text" name="email" placeholder="user email"
                           autoComplete="username" autoFocus />
            </div>

            <div>
                <FieldLabel htmlFor="login-password">Password</FieldLabel>
                <TextInput id="login-password" type="password" name="password" placeholder="Password"
                           autoComplete="current-password" />
            </div>

            {errorMessage && <InlineAlert>{errorMessage}</InlineAlert>}

            <Button type="submit" $fullWidth disabled={loading}>
                {loading || 'Login'}
                <PulseLoader loading={loading} size={LOADER_DOT_SIZE} color="var(--color-on-accent)" />
            </Button>
        </Form>
    );
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
`;
