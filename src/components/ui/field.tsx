import { styled, css } from "styled-components";
import { CONTROL_TRANSITION, DISABLED_OPACITY, MIN_HIT_AREA } from "./control-styles";

export const FieldLabel = styled.label`
    display: block;
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-secondary);
    margin-bottom: var(--space-1);
`;

/* Border precedence is invalid > focus > hover; the three selectors never match together. */
const fieldStyles = css`
    width: 100%;
    padding: var(--space-2) var(--space-3);
    background-color: var(--color-surface-0);
    color: var(--color-text);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
    line-height: var(--line-height-base);
    transition: ${CONTROL_TRANSITION};

    &::placeholder {
        color: var(--color-text-muted);
    }

    &:hover:not(:disabled):not(:focus):not([aria-invalid="true"]) {
        border-color: var(--color-text-muted);
    }

    &:focus:not([aria-invalid="true"]) {
        border-color: var(--color-accent);
    }

    &[aria-invalid="true"] {
        border-color: var(--color-danger);
    }

    &:disabled {
        opacity: ${DISABLED_OPACITY};
        cursor: default;
    }
`;

export const TextInput = styled.input`
    ${fieldStyles}
    min-height: ${MIN_HIT_AREA};
`;

export const TextArea = styled.textarea`
    ${fieldStyles}
    resize: vertical;
    display: block;
`;

export const FieldError = styled.p`
    margin: 0;
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
    color: var(--color-danger);
`;
