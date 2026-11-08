import { styled } from "styled-components";

export const CenteredPage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100dvh;
    width: 100%;
    margin: 0;
    padding: var(--space-5);
    background-color: var(--color-surface-0);
    color: var(--color-text);

    @media (width <= 600px) {
        padding: var(--space-4);
    }
`;

export const Panel = styled.div`
    background-color: var(--color-surface-1);
    color: var(--color-text);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-1);
    padding: var(--space-6);

    @media (width <= 600px) {
        padding: var(--space-5);
    }
`;
