import styled from "styled-components";
import { useForm } from "react-hook-form";
import { UserRegistration } from "../../api/dto/user-dtos";
import { ApiUser } from "../../api/api-user";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";

export interface NewAccountFormProps 
{
    onSuccess?: () => void;
}

export function NewAccountForm(props: NewAccountFormProps)
{
    const { register, handleSubmit, formState: { errors } } = useForm<UserRegistration>();

    const navigate = useNavigate();

    const onSubmit = async (formData: UserRegistration) => 
    {
        try 
        {
            await (new ApiUser()).create(formData);
            navigate('/');
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

            <Button type="submit">Create</Button>
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
`;