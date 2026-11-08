import { MouseEvent, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { keyframes, styled } from "styled-components";

export interface ModalProps
{
    children: ReactNode;
    /** Called on Esc or backdrop click. Omitted: those gestures do nothing. */
    onClose?: () => void;
    /** While true, Esc and backdrop click are ignored (e.g. during a submit). Default false. */
    closeDisabled?: boolean;
    /** id of the element that names the dialog (aria-labelledby). */
    labelledBy?: string;
}

const MODAL_Z_INDEX = 900;          // below the toast stack (1000), above all page content
const DIALOG_MAX_WIDTH = "600px";   // composer width on desktop
const BACKDROP_BLUR = "4px";
const ESCAPE_KEY = "Escape";

export function Modal({ children, onClose, closeDisabled = false, labelledBy }: ModalProps)
{
    const dialogRef = useRef<HTMLDivElement>(null);
    const pressStartedOnBackdropRef = useRef(false);
    // Captured during the first render, before autoFocus moves focus into the dialog.
    const [previouslyFocused] = useState<Element | null>(() => document.activeElement);

    const requestClose = useCallback(() =>
    {
        if (closeDisabled || !onClose)
            return;
        onClose();
    }, [onClose, closeDisabled]);

    useEffect(() =>
    {
        function handleKeyDown(event: KeyboardEvent)
        {
            if (event.key === ESCAPE_KEY && !event.isComposing)
                requestClose();
        }

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [requestClose]);

    useEffect(() =>
    {
        const savedOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () =>
        {
            document.body.style.overflow = savedOverflow;
        };
    }, []);

    useEffect(() =>
    {
        const dialog = dialogRef.current;
        if (dialog && !dialog.contains(document.activeElement))
            dialog.focus();

        return () =>
        {
            if (previouslyFocused instanceof HTMLElement && previouslyFocused.isConnected)
                previouslyFocused.focus();
        };
    }, [previouslyFocused]);

    function handleBackdropMouseDown(event: MouseEvent<HTMLDivElement>)
    {
        pressStartedOnBackdropRef.current = event.target === event.currentTarget;
    }

    function handleBackdropClick(event: MouseEvent<HTMLDivElement>)
    {
        if (event.target === event.currentTarget && pressStartedOnBackdropRef.current)
            requestClose();
    }

    return createPortal(
        <Backdrop onMouseDown={handleBackdropMouseDown} onClick={handleBackdropClick}>
            <Dialog
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={labelledBy}
                tabIndex={-1}
            >
                {children}
            </Dialog>
        </Backdrop>,
        document.body
    );
}

const fadeIn = keyframes`
    from { opacity: 0; }
    to   { opacity: 1; }
`;

const scaleIn = keyframes`
    from { opacity: 0; transform: scale(0.96); }
    to   { opacity: 1; transform: scale(1); }
`;

const Backdrop = styled.div`
    position: fixed;
    inset: 0;
    z-index: ${MODAL_Z_INDEX};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: var(--space-4);
    background-color: var(--color-backdrop);
    backdrop-filter: blur(${BACKDROP_BLUR});
    overscroll-behavior: contain;
    animation: ${fadeIn} var(--duration-base) var(--ease-out);
`;

const Dialog = styled.div`
    box-sizing: border-box;
    width: 100%;
    max-width: ${DIALOG_MAX_WIDTH};
    max-height: 100%;
    overflow-y: auto;
    overscroll-behavior: contain;
    padding: var(--space-5);
    background-color: var(--color-surface-2);
    color: var(--color-text);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-2);
    animation: ${scaleIn} var(--duration-base) var(--ease-out);

    @media (width <= 600px) {
        padding: var(--space-4);
    }
`;
