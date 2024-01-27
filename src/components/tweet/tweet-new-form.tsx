import { useForm } from "react-hook-form";
import { Modal } from "../modal";
import { styled } from "styled-components";
import { ReactEventHandler } from "react";
import { ApiTweet } from "../../api/api-tweet";
import { isAxiosError } from "axios";

export interface TweetNewFormProps
{
    onClose: () => void;
}

export function TweetNewForm(props: TweetNewFormProps)
{
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (formData: any) => 
    {
        try 
        {
            await (new ApiTweet()).create(formData.content);
            props.onClose();
        } 
        catch (error: any) 
        {
            if(error.response?.data?.message) {
                alert(`Error: ${error.response?.data?.message}`);
                return;
            }

            if (isAxiosError(error)) {
                alert(`Error: ${error.message}`);
                return;
            }

            alert("Unknow error occurred!!");
            console.error(error);
        }
    }

    const handleCancel = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    {
        event.preventDefault();
        props.onClose();
    }
    
    return (
        <Modal>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="content">Your Message:</label>
                <textarea autoFocus {
                    ...register("content", 
                    {
                        required: "Message can't be empty", 
                        maxLength: {
                            value: 250, 
                            message: "Message can have a maximum of 250 characters"
                        }
                    })} 
                />
                {errors.content && 
                    <ErrorMessage>{errors.content.message?.toString()}</ErrorMessage>
                }
            
                <Footer>
                    <Cancel className="btn" onClick={handleCancel}>Cancel</Cancel>
                    <Submit className="btn">Submit</Submit>
                </Footer>
            </Form>
        </Modal>
    );
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 600px;

    & > label {
        margin-bottom: 0.5rem;
    }

    .btn {
        width: 8rem;
        font-weight: bold;
        font-size: 1rem;
        padding: 0.5rem;
        border-radius: 0.5rem;
        border: none;
    }
`;

const ErrorMessage = styled.p`
    color: var(--color-danger-1);
    margin: 0;
`;

const Footer = styled.footer`
    display: flex;
    justify-content: end;
    gap: 1rem;
    padding: 0.5rem 0 0 0;
`;

const Cancel = styled.button`
    background-color: var(--color-bg-danger-1);
    color: var(--color-fg-danger-1);

    &:hover {
        background-color: color-mix(in srgb, var(--color-bg-danger-1) 80%, white);
    }
`;

const Submit = styled.button`
    background-color: var(--color-bg-4);
    color: var(--color-fg-4);

    &:hover {
        background-color: color-mix(in srgb, var(--color-bg-4) 80%, white);
    }
`;