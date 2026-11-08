import { styled, css } from "styled-components";
import { CONTROL_TRANSITION, DISABLED_OPACITY, MIN_HIT_AREA, PRESSED_SCALE } from "./control-styles";

export type IconButtonTone = "neutral" | "accent";

export interface IconButtonProps
{
    $tone?: IconButtonTone;   // default "neutral"
    $active?: boolean;        // default false; e.g. liked
}

const TONE_STYLES: Record<IconButtonTone, ReturnType<typeof css>> = {
    neutral: css`
        &:hover:not(:disabled) {
            background-color: var(--color-surface-hover);
            color: var(--color-text);
        }

        &:active:not(:disabled) {
            background-color: var(--color-surface-pressed);
            color: var(--color-text);
        }
    `,
    accent: css`
        &:hover:not(:disabled) {
            background-color: var(--color-accent-subtle);
            color: var(--color-accent);
        }

        &:active:not(:disabled) {
            background-color: var(--color-accent-subtle-pressed);
            color: var(--color-accent);
        }
    `,
};

export const IconButton = styled.button
    .attrs<IconButtonProps>((props) => ({ type: props.type ?? "button" }))<IconButtonProps>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-1);
    min-width: ${MIN_HIT_AREA};
    min-height: ${MIN_HIT_AREA};
    padding: 0 var(--space-2);
    border: none;
    border-radius: var(--radius-pill);
    background-color: transparent;
    color: var(--color-text-secondary);
    font-size: var(--font-size-xs);
    cursor: pointer;
    transition: ${CONTROL_TRANSITION};

    & svg {
        font-size: var(--font-size-lg);
        flex-shrink: 0;
    }

    ${(props) => TONE_STYLES[props.$tone ?? "neutral"]}

    ${(props) => props.$active && css`
        &, &:hover:not(:disabled), &:active:not(:disabled) {
            color: var(--color-accent);
        }
    `}

    &:active:not(:disabled) {
        transform: scale(${PRESSED_SCALE});
    }

    &:disabled {
        opacity: ${DISABLED_OPACITY};
        cursor: default;
    }
`;
