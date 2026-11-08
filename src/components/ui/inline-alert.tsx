import { ReactNode } from "react";
import { IconType } from "react-icons";
import { LuCircleAlert, LuCircleCheck, LuInfo } from "react-icons/lu";
import { styled } from "styled-components";

export type InlineAlertVariant = "danger" | "success" | "info";

export interface InlineAlertProps
{
    variant?: InlineAlertVariant;   // default "danger"
    children: ReactNode;
    className?: string;             // allows styled(InlineAlert) for spacing in a consumer
}

/** Same strength as the theme's existing "subtle" tokens. */
const DERIVED_TINT_STRENGTH = "12%";
const tint = (color: string) => `color-mix(in srgb, ${color} ${DERIVED_TINT_STRENGTH}, transparent)`;

const VARIANT_STYLES: Record<InlineAlertVariant, { color: string; tint: string; Icon: IconType }> = {
    danger: { color: "var(--color-danger)", tint: "var(--color-danger-subtle)", Icon: LuCircleAlert },
    success: { color: "var(--color-success)", tint: tint("var(--color-success)"), Icon: LuCircleCheck },
    info: { color: "var(--color-info)", tint: tint("var(--color-info)"), Icon: LuInfo },
};

export function InlineAlert(props: InlineAlertProps)
{
    const style = VARIANT_STYLES[props.variant ?? "danger"];

    return (
        <Wrapper role="alert" className={props.className} $color={style.color} $tint={style.tint}>
            <style.Icon aria-hidden="true" />
            <Message>{props.children}</Message>
        </Wrapper>
    );
}

const Wrapper = styled.div<{ $color: string; $tint: string }>`
    display: flex;
    align-items: flex-start;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-4);
    border-left: 3px solid ${(props) => props.$color};
    border-radius: var(--radius-md);
    background-color: ${(props) => props.$tint};
    color: var(--color-text);
    font-size: var(--font-size-sm);
    line-height: var(--line-height-base);

    & > svg {
        flex-shrink: 0;
        font-size: var(--font-size-md);
        color: ${(props) => props.$color};
        margin-top: 2px;
    }
`;

const Message = styled.div`
    min-width: 0;
    overflow-wrap: anywhere;
`;
