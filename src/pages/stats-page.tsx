import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { ApiVisit } from "../api/api-visit";
import { DailyVisit } from "../api/dto/visit-dtos";
import { CenteredPage } from "../components/ui/panel";

const DAYS = 30;
const LOADING_TEXT = "Loading...";
const ERROR_TEXT = "Could not load visitor count.";

type StatsState =
    | { status: "loading" }
    | { status: "loaded"; days: DailyVisit[] }
    | { status: "error" };

export function StatsPage()
{
    const [state, setState] = useState<StatsState>({ status: "loading" });

    useEffect(() =>
    {
        let active = true;

        Promise.resolve()
            .then(() => new ApiVisit().list(DAYS))
            .then((days) => { if (active) setState({ status: "loaded", days }); })
            .catch(() => { if (active) setState({ status: "error" }); });

        return () => { active = false; };
    }, []);

    if (state.status !== "loaded")
    {
        return (
            <CenteredPage>
                <StatsText role="status">{state.status === "loading" ? LOADING_TEXT : ERROR_TEXT}</StatsText>
            </CenteredPage>
        );
    }

    const sum = state.days.reduce((acc, day) => acc + day.count, 0);

    return (
        <CenteredPage>
            <Stats>
                <StatsText role="status">
                    {`${String(sum)} visitors in the last ${String(state.days.length)} registered days`}
                </StatsText>
                {state.days.length > 0 &&
                    <DaysTable>
                        <thead>
                            <tr><th>Date</th><th>Visitors</th></tr>
                        </thead>
                        <tbody>
                            {state.days.map((day) =>
                                <tr key={day.date}><td>{day.date}</td><td>{String(day.count)}</td></tr>
                            )}
                        </tbody>
                        <tfoot>
                            <tr><th scope="row">Total</th><td>{String(sum)}</td></tr>
                        </tfoot>
                    </DaysTable>
                }
            </Stats>
        </CenteredPage>
    );
}

const Stats = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-5);
    width: 100%;
    max-width: 360px;
`;

const StatsText = styled.p`
    margin: 0;
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-tight);
    color: var(--color-text);
    text-align: center;
`;

const DaysTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-size: var(--font-size-sm);
    color: var(--color-text);
    font-variant-numeric: tabular-nums;

    th, td {
        padding: var(--space-2) var(--space-3);
        border-bottom: 1px solid var(--color-border);
        text-align: left;
    }

    th:last-child, td:last-child {
        text-align: right;
    }

    thead th {
        color: var(--color-text-secondary);
        font-weight: var(--font-weight-semibold);
    }

    tfoot th, tfoot td {
        font-weight: var(--font-weight-semibold);
        border-bottom: none;
    }
`;
