import { styled, css } from "styled-components";
import { CONTROL_TRANSITION, DISABLED_OPACITY, MIN_HIT_AREA, PRESSED_SCALE } from "./control-styles";

export type ButtonVariant = "primary" | "ghost";

export interface ButtonProps
{
    $variant?: ButtonVariant;   // default "primary"
    $fullWidth?: boolean;       // default false
}

const VARIANT_STYLES: Record<ButtonVariant, ReturnType<typeof css>> = {
    primary: css`
        background-color: var(--color-accent);
        color: var(--color-on-accent);

        &:hover:not(:disabled) {
            background-color: var(--color-accent-hover);
        }

        &:active:not(:disabled) {
            background-color: var(--color-accent-pressed);
        }
    `,
    ghost: css`
        background-color: transparent;
        border-color: var(--color-border);
        color: var(--color-text);

        &:hover:not(:disabled) {
            background-color: var(--color-surface-hover);
        }

        &:active:not(:disabled) {
            background-color: var(--color-surface-pressed);
        }
    `,
};

export const Button = styled.button<ButtonProps>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    min-height: ${MIN_HIT_AREA};
    padding: 0 var(--space-5);
    border: 1px solid transparent;
    border-radius: var(--radius-pill);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-tight);
    cursor: pointer;
    transition: ${CONTROL_TRANSITION};

    & svg {
        flex-shrink: 0;
    }

    ${(props) => VARIANT_STYLES[props.$variant ?? "primary"]}

    ${(props) => props.$fullWidth && css`
        width: 100%;
    `}

    &:active:not(:disabled) {
        transform: scale(${PRESSED_SCALE});
    }

    &:disabled {
        opacity: ${DISABLED_OPACITY};
        cursor: default;
    }
`;
