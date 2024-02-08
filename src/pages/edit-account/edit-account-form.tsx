import styled from "styled-components";
import { useForm } from "react-hook-form";
import { UserUpdateRequest } from "../../api/dto/user-dtos";
import { ApiUser } from "../../api/api-user";
import { isAxiosError } from "axios";
import { ApiAuth } from "../../api/api-auth";
import { PulseLoader } from "react-spinners";
import { useState } from "react";

export interface EditAccountFormProps 
{
    onSuccess?: () => void;
}

export function EditAccountForm(props: EditAccountFormProps)
{
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, getValues, formState: { errors } } = useForm<UserUpdateFormData>({
        defaultValues: async () => {
            const user = ApiAuth.getLoggedUser();
            return {
                username: user?.username ?? "",
                email: user?.email ?? "",
                name: user?.name ?? "",
                currentPassword: "",
                newPassword: "",
                newPasswordConfirm: "",
                pictureUrl: user?.pictureUrl ?? "",
            };
        }
    });

    const onSubmit = async (formData: UserUpdateFormData) => 
    {
        if (loading)
            return;

        try 
        {
            setLoading(true);

            if (formData.newPassword !== undefined && formData.newPassword.length === 0)
                formData.newPassword = undefined;

            await (new ApiUser()).update(formData);

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

            <label htmlFor="pictureUrl">Picture URL:</label>
            <Input { ...register("pictureUrl") } />

            <label htmlFor="currentPassword">Current password:</label>
            <Input type="password" {
                ...register("currentPassword", 
                {
                    required: "Current password can't be empty", 
                })} 
            />
            {errors.currentPassword && 
                <ErrorMessage>{errors.currentPassword.message?.toString()}</ErrorMessage>
            }

            <label htmlFor="newPassword">New password (optional):</label>
            <Input type="password" { ...register("newPassword")} />

            <label htmlFor="newPasswordConfirm">New password confirmation:</label>
            <Input type="password" {
                ...register(
                    "newPasswordConfirm", 
                    {
                        validate: (value) => value === getValues('newPassword') || "Password confirmation doesn't match" ,
                    }
                )
            }/>
            {errors.newPasswordConfirm && 
                <ErrorMessage>{errors.newPasswordConfirm.message?.toString()}</ErrorMessage>
            }

            <Button type="submit" disabled={loading}>
                {loading || 'Update'}
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

interface UserUpdateFormData extends UserUpdateRequest {
    newPasswordConfirm: string;
}