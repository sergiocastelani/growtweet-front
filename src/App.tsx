import './app-style.css'
import { RouterProvider } from "react-router-dom"
import { appRouter } from "./app-router";
import { ToastProvider } from "./components/toast-provider";
import { ToastContent } from "./components/toast-context";
import { useEffect, useRef, useState } from "react";
import { ApiAuth } from './api/api-auth';

const WARMUP_TOAST: ToastContent = {
    text: "Servers are warming up. This page will reload automatically when ready.",
    variant: "info",
};

function App() {
    const [showWarmupMessage, setShowWarmupMessage] = useState(false);
    const showWarmupMessageRef = useRef<boolean>()
    showWarmupMessageRef.current = showWarmupMessage;

    const [warmupToastTimeout, setWarmupToastTimeout] = useState(0);
    const warmupToastTimeoutRef = useRef<number>()
    warmupToastTimeoutRef.current = warmupToastTimeout;

    useEffect(() => {
        new ApiAuth()
            .ping()
            .then(() => {
                clearTimeout(warmupToastTimeoutRef.current);
                if (showWarmupMessageRef.current)
                    window.history.go(0);
            })
            .finally(() => {
                setShowWarmupMessage(false);
            });

        setWarmupToastTimeout(setTimeout(() => {
            setShowWarmupMessage(true);
        }, 4000));
    }, []);

    return (
        <ToastProvider pinnedToast={showWarmupMessage ? WARMUP_TOAST : undefined}>
            <RouterProvider router={appRouter} />
        </ToastProvider>
    )
}

export default App;
