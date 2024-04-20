import { styled } from "styled-components";

export interface ToastProps
{
    text: string;
}

export function Toast(props: ToastProps)
{
    return (
        <Content>
            <p>{props.text}</p>
        </Content>
    );
}

const Content = styled.div`
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translate(-50%, 0);
    background-color: color-mix(in srgb, var(--color-bg-info-1), transparent 7%);
    color: var(--color-fg-info-1);
    border-radius: 5px;
    padding: 0.5rem;
    margin: 0;
    animation: toast-slide-effect 0.5s;
    animation-timing-function: ease-out;

    & > p {
        padding: 0;
        margin: 0.5rem;
    }

    @keyframes toast-slide-effect {
        from {transform: translate(-50%, -110%)}
        to {transform: translate(-50%, 0)}
    }

`;
