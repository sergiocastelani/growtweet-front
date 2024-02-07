import { useForm } from "react-hook-form";
import { Modal } from "../modal";
import { styled } from "styled-components";
import { ApiTweet } from "../../api/api-tweet";
import { isAxiosError } from "axios";
import { useState } from "react";
import { PulseLoader } from "react-spinners";

export interface TweetNewFormProps
{
    replyId?: number;
    onCreated: () => void;
    onCancel: () => void;
}

export function TweetNewForm(props: TweetNewFormProps)
{
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (formData: any) => 
    {
        if (loading)
            return;

        try 
        {
            setLoading(true);

            if(props.replyId !== undefined)
                await (new ApiTweet()).reply(props.replyId, formData.content);
            else
                await (new ApiTweet()).create(formData.content);

            setLoading(false);
            props.onCreated();
        } 
        catch (error: any) 
        {
            setLoading(false);
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
            props.onCancel();
        }
    }

    const handleCancel = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    {
        if (loading)
            return;

        event.preventDefault();
        setLoading(true);
        props.onCancel();
        setLoading(false);
    }
    
    return (
        <Modal>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="content">
                    {props.replyId ? "Post your reply:" : "Post your new message:"}
                </label>
                <textarea autoFocus rows={5} {
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
                    <Cancel className="btn" onClick={handleCancel} disabled={loading}>Cancel</Cancel>
                    <Submit className="btn" disabled={loading}>
                        {loading || 'Submit'}
                        <PulseLoaderStyled loading={loading} size="0.5rem" color="white"/>
                    </Submit>
                </Footer>
            </Form>
        </Modal>
    );
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 85vw;
    max-width: 700px;
    font-size: 1rem;

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
    margin: 5px 0 0 0;
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
    background-color: var(--color-bg-2);
    color: var(--color-fg-2);

    &:not(:disabled):hover {
        background-color: color-mix(in srgb, var(--color-bg-2) 80%, white);
    }

    &[disabled] {
        background-color: var(--color-bg-disabled);
        color: var(--color-fg-disabled);
    }
`;

const PulseLoaderStyled = styled(PulseLoader)`
    margin-top: 2px;
`;
