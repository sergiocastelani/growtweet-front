const CUSTOM_PROPERTY_PREFIX = "--";
const UNDEFINED_TOKEN_FALLBACK = "transparent";

/** Resolved colors per token; tokens never change after load (no theme toggle). */
const resolvedColors = new Map<string, string>();

/**
 * Returns the resolved (computed) color of a CSS custom property,
 * e.g. readThemeColor("--color-surface-1") returns the surface color in rgb notation.
 * For libraries that cannot take var(--…) (react-content-loader SVG attributes).
 * @throws Error if `token` does not start with "--".
 */
export function readThemeColor(token: string): string
{
    if (!token.startsWith(CUSTOM_PROPERTY_PREFIX))
        throw new Error(`readThemeColor: "${token}" is not a CSS custom property name`);

    const cached = resolvedColors.get(token);
    if (cached !== undefined)
        return cached;

    const probe = document.createElement("span");
    probe.style.display = "none";
    probe.style.color = `var(${token}, ${UNDEFINED_TOKEN_FALLBACK})`;
    document.body.appendChild(probe);
    try
    {
        const color = getComputedStyle(probe).color;
        resolvedColors.set(token, color);
        return color;
    }
    finally
    {
        probe.remove();
    }
}
