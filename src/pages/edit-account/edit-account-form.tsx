import styled from "styled-components";
import { useForm } from "react-hook-form";
import { UserUpdateRequest } from "../../api/dto/user-dtos";
import { ApiUser } from "../../api/api-user";
import { isAxiosError } from "axios";
import { ApiAuth } from "../../api/api-auth";
import { PulseLoader } from "react-spinners";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { FieldError, FieldLabel, TextInput } from "../../components/ui/field";
import { InlineAlert } from "../../components/ui/inline-alert";

/** Shown when an update fails without a server message (user decision). */
const UPDATE_FAILED_MESSAGE = "Error: could not update account";

const LOADER_COLOR = "var(--color-on-accent)";

export interface EditAccountFormProps 
{
    onSuccess?: () => void;
}

export function EditAccountForm(props: EditAccountFormProps)
{
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);

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
            setApiError(null);

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
                    setApiError(`Error: ${error.response?.data?.message}`);
                    return;
                }
            }

            console.error(error);
            setApiError(UPDATE_FAILED_MESSAGE);
        }
        finally 
        {
            setLoading(false);
        }
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
                <FieldLabel htmlFor="username">User name:</FieldLabel>
                <TextInput id="username" autoFocus
                    aria-invalid={errors.username ? "true" : undefined} {
                    ...register("username", 
                    {
                        required: "User name can't be empty", 
                    })} 
                />
                {errors.username && 
                    <FieldError>{errors.username.message?.toString()}</FieldError>
                }
            </FieldGroup>

            <FieldGroup>
                <FieldLabel htmlFor="email">Email:</FieldLabel>
                <TextInput id="email"
                    aria-invalid={errors.email ? "true" : undefined} {
                    ...register("email", 
                    {
                        required: "Email can't be empty", 
                    })} 
                />
                {errors.email && 
                    <FieldError>{errors.email.message?.toString()}</FieldError>
                }
            </FieldGroup>

            <FieldGroup>
                <FieldLabel htmlFor="name">Full name:</FieldLabel>
                <TextInput id="name"
                    aria-invalid={errors.name ? "true" : undefined} {
                    ...register("name", 
                    {
                        required: "Full name can't be empty", 
                    })} 
                />
                {errors.name && 
                    <FieldError>{errors.name.message?.toString()}</FieldError>
                }
            </FieldGroup>

            <FieldGroup>
                <FieldLabel htmlFor="pictureUrl">Picture URL:</FieldLabel>
                <TextInput id="pictureUrl" { ...register("pictureUrl") } />
            </FieldGroup>

            <FieldGroup>
                <FieldLabel htmlFor="currentPassword">Current password:</FieldLabel>
                <TextInput id="currentPassword" type="password"
                    aria-invalid={errors.currentPassword ? "true" : undefined} {
                    ...register("currentPassword", 
                    {
                        required: "Current password can't be empty", 
                    })} 
                />
                {errors.currentPassword && 
                    <FieldError>{errors.currentPassword.message?.toString()}</FieldError>
                }
            </FieldGroup>

            <FieldGroup>
                <FieldLabel htmlFor="newPassword">New password (optional):</FieldLabel>
                <TextInput id="newPassword" type="password" { ...register("newPassword")} />
            </FieldGroup>

            <FieldGroup>
                <FieldLabel htmlFor="newPasswordConfirm">New password confirmation:</FieldLabel>
                <TextInput id="newPasswordConfirm" type="password"
                    aria-invalid={errors.newPasswordConfirm ? "true" : undefined} {
                    ...register(
                        "newPasswordConfirm", 
                        {
                            validate: (value) => value === getValues('newPassword') || "Password confirmation doesn't match" ,
                        }
                    )
                }/>
                {errors.newPasswordConfirm && 
                    <FieldError>{errors.newPasswordConfirm.message?.toString()}</FieldError>
                }
            </FieldGroup>

            {apiError && <InlineAlert>{apiError}</InlineAlert>}

            <Button type="submit" $fullWidth disabled={loading}>
                {!loading && "Update"}
                <PulseLoader loading={loading} size="0.5rem" color={LOADER_COLOR} />
            </Button>
        </Form>
    );
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
`;

const FieldGroup = styled.div`
    display: flex;
    flex-direction: column;

    & > ${FieldError} {
        margin-top: var(--space-1);
    }
`;

interface UserUpdateFormData extends UserUpdateRequest {
    newPasswordConfirm: string;
}