import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { ApiVisit } from "../api/api-visit";
import { CenteredPage } from "../components/ui/panel";

const LOADING_TEXT = "Loading...";
const ERROR_TEXT = "Could not load visitor count.";

type StatsState =
    | { status: "loading" }
    | { status: "loaded"; total: number }
    | { status: "error" };

export function StatsPage()
{
    const [state, setState] = useState<StatsState>({ status: "loading" });

    useEffect(() =>
    {
        let active = true;

        Promise.resolve()
            .then(() => new ApiVisit().total())
            .then((total) => { if (active) setState({ status: "loaded", total }); })
            .catch(() => { if (active) setState({ status: "error" }); });

        return () => { active = false; };
    }, []);

    return (
        <CenteredPage>
            <StatsText role="status">{statsText(state)}</StatsText>
        </CenteredPage>
    );
}

/** `<n> total visitors` with a plain integer, or the loading / error text. */
function statsText(state: StatsState) : string
{
    switch (state.status)
    {
        case "loading":
            return LOADING_TEXT;
        case "error":
            return ERROR_TEXT;
        case "loaded":
            return `${String(state.total)} total visitors`;
    }
}

const StatsText = styled.p`
    margin: 0;
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-tight);
    color: var(--color-text);
    text-align: center;
`;
