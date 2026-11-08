import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { styled } from "styled-components";
import { Toast } from "./toast";
import { ToastContent, ToastContext, ToastContextValue, ToastVariant } from "./toast-context";

export interface ToastProviderProps
{
    children: ReactNode;
    /** Toast shown at the top of the stack, without timer, for as long as it is passed. */
    pinnedToast?: ToastContent;
}

const DEFAULT_TOAST_DURATION_MS = 3000;
const PINNED_TOAST_KEY = "pinned";   // cannot collide with numeric ids of timed toasts
const TOAST_MAX_WIDTH = "480px";     // readable line length on desktop
const TOAST_Z_INDEX = 1000;          // above page content and dialogs

interface TimedToast
{
    id: number;           // unique per showToast call; React key and timer key
    text: string;
    variant: ToastVariant;
}

export function ToastProvider({ children, pinnedToast }: ToastProviderProps)
{
    const [timedToasts, setTimedToasts] = useState<TimedToast[]>([]);
    const nextIdRef = useRef<number>(0);
    const timersRef = useRef<Map<number, number>>(new Map());

    const dismissToast = useCallback((id: number) =>
    {
        timersRef.current.delete(id);
        setTimedToasts(toasts => toasts.filter(t => t.id !== id));
    }, []);

    const showToast = useCallback((text: string, variant: ToastVariant = "info", durationMs: number = DEFAULT_TOAST_DURATION_MS) =>
    {
        const duration = Number.isFinite(durationMs) && durationMs > 0 ? durationMs : DEFAULT_TOAST_DURATION_MS;
        const id = nextIdRef.current++;
        setTimedToasts(toasts => [...toasts, { id, text, variant }]);
        timersRef.current.set(id, window.setTimeout(() => dismissToast(id), duration));
    }, [dismissToast]);

    const value = useMemo<ToastContextValue>(() => ({ showToast }), [showToast]);

    useEffect(() =>
    {
        const timers = timersRef.current;
        return () =>
        {
            timers.forEach(t => window.clearTimeout(t));
            timers.clear();
        };
    }, []);

    return (
        <ToastContext.Provider value={value}>
            {children}
            {(pinnedToast || timedToasts.length > 0) &&
                <Viewport>
                    {pinnedToast && <Toast key={PINNED_TOAST_KEY} text={pinnedToast.text} variant={pinnedToast.variant} />}
                    {timedToasts.map(t => <Toast key={t.id} text={t.text} variant={t.variant} />)}
                </Viewport>}
        </ToastContext.Provider>
    );
}

const Viewport = styled.div`
    position: fixed;
    top: var(--space-4);
    left: 50%;
    transform: translateX(-50%);
    z-index: ${TOAST_Z_INDEX};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-2);
    width: max-content;
    max-width: min(${TOAST_MAX_WIDTH}, calc(100vw - var(--space-6)));
    pointer-events: none;
`;
