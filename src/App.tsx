import { RouterProvider } from "react-router-dom"
import './app-style.css'
import { appRouter } from "./app-router";

function App() {
    return (
        <RouterProvider router={appRouter} />
    )
}

export default App;
