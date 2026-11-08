import { styled, keyframes } from "styled-components";
import { IconType } from "react-icons";
import { LuCircleAlert, LuCircleCheck, LuInfo } from "react-icons/lu";
import { ToastContent, ToastVariant } from "./toast-context";

export type ToastProps = ToastContent;

const VARIANT_ICON: Record<ToastVariant, IconType> = {
    info: LuInfo,
    success: LuCircleCheck,
    danger: LuCircleAlert,
};

const VARIANT_COLOR: Record<ToastVariant, string> = {
    info: "var(--color-info)",
    success: "var(--color-success)",
    danger: "var(--color-danger)",
};

const ICON_SIZE = 20; // px

export function Toast({ text, variant = "info" }: ToastProps)
{
    const Icon = VARIANT_ICON[variant];

    return (
        <Content $variant={variant} role={variant === "danger" ? "alert" : "status"}>
            <Icon size={ICON_SIZE} aria-hidden="true" />
            <p>{text}</p>
        </Content>
    );
}

const slideIn = keyframes`
    from { transform: translateY(calc(-100% - var(--space-4))); }
    to   { transform: translateY(0); }
`;

const Content = styled.div<{ $variant: ToastVariant }>`
    display: flex;
    align-items: flex-start;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-4);
    box-sizing: border-box;
    max-width: 100%;
    background-color: var(--color-surface-2);
    color: var(--color-text);
    border: 1px solid var(--color-border);
    border-left: 4px solid ${({ $variant }) => VARIANT_COLOR[$variant]};
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-2);
    animation: ${slideIn} var(--duration-slow) var(--ease-out);

    & > svg {
        flex-shrink: 0;
        color: ${({ $variant }) => VARIANT_COLOR[$variant]};
    }

    & > p {
        margin: 0;
        font-size: var(--font-size-sm);
        line-height: var(--line-height-base);
        overflow-wrap: anywhere;
    }
`;
