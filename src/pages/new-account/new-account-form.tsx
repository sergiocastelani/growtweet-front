import { styled } from "styled-components";
import { useForm } from "react-hook-form";
import { UserRegistration } from "../../api/dto/user-dtos";
import { ApiUser } from "../../api/api-user";
import { isAxiosError } from "axios";
import { PulseLoader } from "react-spinners";
import { useState } from "react";
import { ApiAuth } from "../../api/api-auth";
import { Button } from "../../components/ui/button";
import { FieldError, FieldLabel, TextInput } from "../../components/ui/field";
import { InlineAlert } from "../../components/ui/inline-alert";

export interface NewAccountFormProps 
{
    onSuccess?: () => void;
}

export function NewAccountForm(props: NewAccountFormProps)
{
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState<string | undefined>(undefined);

    const { register, handleSubmit, formState: { errors } } = useForm<UserRegistration>();

    const onSubmit = async (formData: UserRegistration) => 
    {
        if (loading)
            return;

        try 
        {
            setApiError(undefined);
            setLoading(true);
            await (new ApiUser()).create(formData);
            ApiAuth.unlogUser();
            props.onSuccess?.();
        } 
        catch (error) 
        {
            if (isAxiosError(error) && error.response?.data?.message)
            {
                setApiError(`Error: ${error.response.data.message}`);
                return;
            }

            console.error(error);
        }
        finally 
        {
            setLoading(false);
        }
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <FieldLabel htmlFor="username">User name:</FieldLabel>
                <TextInput id="username" autoFocus
                    aria-invalid={errors.username ? "true" : undefined} {
                    ...register("username",
                    {
                        required: "User name can't be empty",
                    })}
                />
                {errors.username &&
                    <SpacedFieldError>{errors.username.message?.toString()}</SpacedFieldError>
                }
            </div>

            <div>
                <FieldLabel htmlFor="email">Email:</FieldLabel>
                <TextInput id="email"
                    aria-invalid={errors.email ? "true" : undefined} {
                    ...register("email",
                    {
                        required: "Email can't be empty",
                    })}
                />
                {errors.email &&
                    <SpacedFieldError>{errors.email.message?.toString()}</SpacedFieldError>
                }
            </div>

            <div>
                <FieldLabel htmlFor="name">Full name:</FieldLabel>
                <TextInput id="name"
                    aria-invalid={errors.name ? "true" : undefined} {
                    ...register("name",
                    {
                        required: "Full name can't be empty",
                    })}
                />
                {errors.name &&
                    <SpacedFieldError>{errors.name.message?.toString()}</SpacedFieldError>
                }
            </div>

            <div>
                <FieldLabel htmlFor="password">Password:</FieldLabel>
                <TextInput id="password" type="password"
                    aria-invalid={errors.password ? "true" : undefined} {
                    ...register("password",
                    {
                        required: "Password name can't be empty",
                    })}
                />
                {errors.password &&
                    <SpacedFieldError>{errors.password.message?.toString()}</SpacedFieldError>
                }
            </div>

            <div>
                <FieldLabel htmlFor="pictureUrl">Picture URL:</FieldLabel>
                <TextInput id="pictureUrl" { ...register("pictureUrl") } />
            </div>

            {apiError && <InlineAlert>{apiError}</InlineAlert>}

            <Button type="submit" $fullWidth disabled={loading}>
                {loading || 'Create'}
                <PulseLoader loading={loading} size="0.5rem" color="var(--color-on-accent)"/>
            </Button>
        </Form>
    );
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
`;

const SpacedFieldError = styled(FieldError)`
    margin-top: var(--space-1);
`;
