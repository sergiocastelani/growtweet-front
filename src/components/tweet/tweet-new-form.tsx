import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import { isAxiosError } from "axios";
import { PulseLoader } from "react-spinners";
import { ApiTweet } from "../../api/api-tweet";
import { Modal } from "../modal";
import { useToast } from "../toast-context";
import { Button } from "../ui/button";
import { FieldError, FieldLabel, TextArea } from "../ui/field";
import { InlineAlert } from "../ui/inline-alert";

export interface TweetNewFormProps
{
    replyId?: number;
    onCreated: () => void;
    onCancel: () => void;
}

interface TweetFormData
{
    content: string;
}

const MAX_TWEET_LENGTH = 250;
const COUNTER_WARNING_FROM = 230;
const UNKNOWN_ERROR_MESSAGE = "Unknow error occurred!!";   // verbatim, existing text

type CounterState = "normal" | "warning" | "danger";

const COUNTER_COLOR: Record<CounterState, string> = {
    normal: "var(--color-text-muted)",
    warning: "var(--color-warning)",
    danger: "var(--color-danger)",
};

function counterStateFor(length: number): CounterState
{
    if (length > MAX_TWEET_LENGTH)
        return "danger";
    if (length >= COUNTER_WARNING_FROM)
        return "warning";
    return "normal";
}

export function TweetNewForm(props: TweetNewFormProps)
{
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const { showToast } = useToast();
    const { register, handleSubmit, watch, formState: { errors } } = useForm<TweetFormData>();

    const fieldId = useId();
    const labelId = useId();
    const counterId = useId();
    const errorId = useId();

    const contentLength = (watch("content") ?? "").length;
    const counterState = counterStateFor(contentLength);

    const onSubmit = async (formData: TweetFormData) =>
    {
        if (loading)
            return;

        try
        {
            setApiError(null);
            setLoading(true);

            if(props.replyId !== undefined)
                await (new ApiTweet()).reply(props.replyId, formData.content);
            else
                await (new ApiTweet()).create(formData.content);

            setLoading(false);
            props.onCreated();
        }
        catch (error: unknown)
        {
            setLoading(false);
            if (isAxiosError(error)) {
                setApiError(`Error: ${error.response?.data?.message ?? error.message}`);
                return;
            }

            showToast(UNKNOWN_ERROR_MESSAGE, "danger");
            console.error(error);
        }
    }

    const requestCancel = () =>
    {
        if (loading)
            return;

        props.onCancel();
    }

    const clearApiError = () =>
    {
        setApiError(null);
    }

    return (
        <Modal onClose={requestCancel} closeDisabled={loading} labelledBy={labelId}>
            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                <PromptLabel id={labelId} htmlFor={fieldId}>
                    {props.replyId ? "Post your reply:" : "Post your new message:"}
                </PromptLabel>
                <TextArea
                    id={fieldId}
                    autoFocus
                    rows={5}
                    aria-invalid={errors.content ? "true" : undefined}
                    aria-describedby={errors.content ? `${counterId} ${errorId}` : counterId}
                    {...register("content",
                    {
                        required: "Message can't be empty",
                        maxLength: {
                            value: MAX_TWEET_LENGTH,
                            message: "Message can have a maximum of 250 characters"
                        },
                        onChange: clearApiError,
                    })}
                />
                {errors.content &&
                    <FieldError id={errorId}>{errors.content.message?.toString()}</FieldError>
                }
                {apiError && <InlineAlert>{apiError}</InlineAlert>}

                <Footer>
                    <Counter id={counterId} $state={counterState}>{contentLength} / {MAX_TWEET_LENGTH}</Counter>
                    <Button type="button" $variant="ghost" onClick={requestCancel} disabled={loading}>Cancel</Button>
                    <Button type="submit" disabled={loading}>
                        {loading || "Submit"}
                        <PulseLoader loading={loading} size="0.5rem" color="var(--color-on-accent)" />
                    </Button>
                </Footer>
            </Form>
        </Modal>
    );
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    width: 100%;
`;

const PromptLabel = styled(FieldLabel)`
    margin: 0;
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    line-height: var(--line-height-tight);
`;

const Footer = styled.footer`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--space-3);
    flex-wrap: wrap;
`;

const Counter = styled.span<{ $state: CounterState }>`
    margin-right: auto;
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
    font-variant-numeric: tabular-nums;
    color: ${({ $state }) => COUNTER_COLOR[$state]};
`;
