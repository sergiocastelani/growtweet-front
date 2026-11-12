import { ApiVisit } from "./api/api-visit";

const LAST_VISIT_KEY = "lastVisitAt";
const VISIT_WINDOW_MS = 30 * 60 * 1000;
const UNTRACKED_PATH = "/stats";

/** True while this tab has a POST /visits pending. Module state = one flag per tab. */
let requestPending = false;

/**
 * Handles one page view. Sends POST /visits when the path is tracked, no request is
 * pending in this tab and the 30-minute window has expired. Never throws.
 */
export function trackPageView(pathname: string): void
{
    if (isUntrackedPath(pathname))
        return;

    if (requestPending)
        return;

    const viewedAt = Date.now();

    let lastVisitAt: number | null;
    try
    {
        lastVisitAt = readLastVisitAt();
    }
    catch (error)
    {
        console.error("Visit tracker: could not read lastVisitAt from localStorage", error);
        return;
    }

    if (!isWindowExpired(lastVisitAt, viewedAt))
        return;

    void registerVisit(viewedAt);
}

/** `/stats`, `/stats/`, `/STATS` (react-router matches paths case-insensitively and ignores a trailing slash). */
function isUntrackedPath(pathname: string): boolean
{
    return pathname.replace(/\/+$/, "").toLowerCase() === UNTRACKED_PATH;
}

/** Reads lastVisitAt; null when missing or not a finite number. May throw when storage is blocked. */
function readLastVisitAt(): number | null
{
    const raw = localStorage.getItem(LAST_VISIT_KEY);
    if (raw === null)
        return null;

    const value = Number(raw);
    return Number.isFinite(value) ? value : null;
}

/** True when there is no stored visit, the stored one is 30+ minutes old, or it lies in the future. */
function isWindowExpired(lastVisitAt: number | null, now: number): boolean
{
    return lastVisitAt === null || now < lastVisitAt || now - lastVisitAt >= VISIT_WINDOW_MS;
}

/** Sends the POST and saves viewedAt after a 2xx. Logs and swallows every error. Owns the in-flight flag. */
async function registerVisit(viewedAt: number): Promise<void>
{
    requestPending = true;
    try
    {
        await new ApiVisit().register();
        localStorage.setItem(LAST_VISIT_KEY, String(viewedAt));
    }
    catch (error)
    {
        /* retry on the next page view */
        console.error("Visit tracker: could not register visit", error);
    }
    finally
    {
        requestPending = false;
    }
}
