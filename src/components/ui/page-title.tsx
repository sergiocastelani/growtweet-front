import { styled } from "styled-components";

export const PageTitle = styled.h1`
    position: sticky;
    top: 0;
    z-index: 1;
    margin: 0;
    padding: var(--space-4);
    background-color: var(--color-surface-0);
    border-bottom: 1px solid var(--color-border);
    color: var(--color-text);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-tight);

    & small {
        display: block;
        margin-top: var(--space-1);
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-regular);
        color: var(--color-text-muted);
    }
`;
