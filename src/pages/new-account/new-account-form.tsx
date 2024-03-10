import styled from "styled-components";
import { useForm } from "react-hook-form";
import { UserRegistration } from "../../api/dto/user-dtos";
import { ApiUser } from "../../api/api-user";
import { isAxiosError } from "axios";
import { PulseLoader } from "react-spinners";
import { useState } from "react";
import { ApiAuth } from "../../api/api-auth";

export interface NewAccountFormProps 
{
    onSuccess?: () => void;
}

export function NewAccountForm(props: NewAccountFormProps)
{
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<UserRegistration>();

    const onSubmit = async (formData: UserRegistration) => 
    {
        if (loading)
            return;

        try 
        {
            setLoading(true);
            await (new ApiUser()).create(formData);
            ApiAuth.unlogUser();
            props.onSuccess?.();
        } 
        catch (error) 
        {
            if (isAxiosError(error))
            {
                if (error.response?.data?.message)
                {
                    alert(`Error: ${error.response?.data?.message}`);
                    return;
                }
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
            <label htmlFor="username">User name:</label>
            <Input autoFocus {
                ...register("username", 
                {
                    required: "User name can't be empty", 
                })} 
            />
            {errors.username && 
                <ErrorMessage>{errors.username.message?.toString()}</ErrorMessage>
            }

            <label htmlFor="email">Email:</label>
            <Input {
                ...register("email", 
                {
                    required: "Email can't be empty", 
                })} 
            />
            {errors.email && 
                <ErrorMessage>{errors.email.message?.toString()}</ErrorMessage>
            }

            <label htmlFor="name">Full name:</label>
            <Input {
                ...register("name", 
                {
                    required: "Full name can't be empty", 
                })} 
            />
            {errors.name && 
                <ErrorMessage>{errors.name.message?.toString()}</ErrorMessage>
            }

            <label htmlFor="password">Password:</label>
            <Input type="password" {
                ...register("password", 
                {
                    required: "Password name can't be empty", 
                })} 
            />
            {errors.password && 
                <ErrorMessage>{errors.password.message?.toString()}</ErrorMessage>
            }

            <label htmlFor="pictureUrl">Picture URL:</label>
            <Input { ...register("pictureUrl") } />

            <Button type="submit" disabled={loading}>
                {loading || 'Create'}
                <PulseLoaderStyled loading={loading} size="0.5rem" color="white"/>
            </Button>
        </Form>
    );
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const ErrorMessage = styled.p`
    color: var(--color-danger-1);
    margin: 0;
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

    &[disabled] {
        background-color: var(--color-bg-disabled);
    }
`;

const PulseLoaderStyled = styled(PulseLoader)`
    margin-top: 2px;
`;
