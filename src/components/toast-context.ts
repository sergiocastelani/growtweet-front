import { createContext, useContext } from "react";

export type ToastVariant = "info" | "success" | "danger";

export interface ToastContent
{
    text: string;
    variant?: ToastVariant;
}

export interface ToastContextValue
{
    showToast(text: string, variant?: ToastVariant, durationMs?: number): void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue
{
    const value = useContext(ToastContext);
    if (value === null)
        throw new Error("useToast must be used inside a ToastProvider");
    return value;
}
