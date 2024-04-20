import './app-style.css'
import { RouterProvider } from "react-router-dom"
import { appRouter } from "./app-router";
import { Toast } from "./components/toast";
import { useEffect, useRef, useState } from "react";
import { ApiAuth } from './api/api-auth';

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
        <>
            {showWarmupMessage && <Toast text="Servers are warming up. This page will reload automatically when ready."/>}
            <RouterProvider router={appRouter} />
        </>
    )
}

export default App;
