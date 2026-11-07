# S09 - News box as a dark raised card

- **Plan:** [plan.md](plan.md)
- **Type:** Slice
- **Requirements covered:** FR-18, FR-06 (link states), FR-03 (type scale, no 0.6rem text)
- **Prerequisites:** color tokens `--color-surface-1`, `--color-surface-hover`, `--color-border`, `--color-text`, `--color-text-muted`, `--color-accent`, `--color-accent-hover`, `--color-accent-pressed`; typography tokens `--font-size-xs`, `--font-size-sm`, `--font-size-md`, `--font-weight-medium`, `--font-weight-semibold`, `--font-weight-bold`, `--line-height-tight`, `--line-height-base`; spacing `--space-1..6`; radius `--radius-sm`, `--radius-md`, `--radius-lg`; elevation `--shadow-1`; motion `--duration-fast`, `--ease-out`; global `:focus-visible` ring and `body` base styles.
- **Creates:** none

## 1. Goal

Restyle the right-column News box so it matches the dark theme, without changing its content, markup order or link target. When done, on desktop (> 1024px):

- "What is happening now?" sits in a dark raised card (`--color-surface-1`, 1px `--color-border` outline, `--radius-lg`, `--shadow-1`) instead of today's orange box.
- The same 4 items appear in the same order: meta line ("Sports - 45 min ago") in `--font-size-xs` muted, headline in `--font-size-sm` semibold white. No text is smaller than 13px.
- Each item row gets a subtle `--color-surface-hover` background on hover, with a short transition.
- "Show more ..." is the orange accent of the card: `--color-accent` text, lighter on hover, darker when pressed, the global orange focus ring on keyboard focus (with rounded corners), and it still navigates to `/explore`.
- At 1024px or less the box stays hidden, exactly as today.

## 2. Context

- `src/components/news.tsx` exports `News()` and three styled-components at the bottom: `Wrapper` (hides everything at `width <= 1024px`), `Box` (orange card: `color-mix(in srgb, var(--color-bg-3) 90%, white)` background, `--color-fg-3` text, `border-radius: 0.5rem`, `max-width: 300px`, `margin: 30px`, `padding/gap: 10px`; `& > header` bold title; `& > a` at `0.6rem`) and `Item` (`& > header` meta at `0.6rem`, `& > p` headline at `0.8rem` bold).
- Markup: `Wrapper > Box > header` (title), four `Item > header + p`, then `<Link to="/explore">Show more ...</Link>`. The link has no hover/active styling today and inherits the default link color.
- `News` is rendered only by `src/pages/main-template-page.tsx` as the third column; that file is not touched here.
- The global `:focus-visible` rule already draws a 2px orange outline with 2px offset on the link; this step only refines its corner radius.
- Conventions: styled-components at the bottom of the file, colors/sizes/radius/shadow/motion only through tokens, no hard-coded colors. No test suite: verification is `npm run lint`, `npm run build` and manual browser checks. Reduced motion is handled globally, so no media query is needed here.

## 3. Structure

### 3.1 Files

| File | Change | Responsibility |
|------|--------|----------------|
| `src/components/news.tsx` | modify (styled-components only) | News card look: surface, typography, row hover, link states |

### 3.2 Component: `src/components/news.tsx`

**`News()` JSX: unchanged.** Same elements, same texts (verbatim, including "Show more ..."), same `Link to="/explore"`, same order. The imports stay `Link` from `react-router-dom` and `styled` from `styled-components`. No new imports, no new exports.

**`Wrapper`: unchanged** (keeps `border: none` and the `@media (width <= 1024px) { display: none; }` rule, which preserves the breakpoint behavior).

**`Box`: rewrite the rules** (the dark raised card):

```ts
const Box = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    padding: var(--space-3);
    margin: var(--space-6);
    max-width: 300px;               /* unchanged column width */
    background-color: var(--color-surface-1);
    color: var(--color-text);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-1);

    & > header {                    /* card title */
        padding: var(--space-1) var(--space-3) var(--space-2);
        font-size: var(--font-size-md);
        font-weight: var(--font-weight-bold);
        line-height: var(--line-height-tight);
    }

    & > a {                         /* "Show more ..." (the card's orange accent) */
        align-self: flex-start;
        margin-top: var(--space-1);
        padding: var(--space-1) var(--space-3);
        border-radius: var(--radius-sm);
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-medium);
        color: var(--color-accent);
        text-decoration: none;
        transition: color var(--duration-fast) var(--ease-out);

        &:hover {
            color: var(--color-accent-hover);
            text-decoration: underline;
        }

        &:active {
            color: var(--color-accent-pressed);
        }
    }
`;
```

Rule notes:
- Horizontal padding of the title, rows and link is the same `--space-3`, so their text lines up while the row hover tint spans the card's inner width.
- The link keeps the global `:focus-visible` outline; `border-radius: var(--radius-sm)` only rounds it. The outline is never removed.
- A link has no disabled state; hover, active and focus-visible cover FR-06 for this control.

**`Item`: rewrite the rules** (one news row with hover tint):

```ts
const Item = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-md);
    transition: background-color var(--duration-fast) var(--ease-out);

    &:hover {
        background-color: var(--color-surface-hover);
    }

    & > header {                    /* meta: "Sports - 45 min ago" */
        margin: 0;
        padding: 0;
        font-size: var(--font-size-xs);
        color: var(--color-text-muted);
    }

    & > p {                         /* headline */
        margin: 0;
        padding: 0;
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-semibold);
        line-height: var(--line-height-tight);
    }
`;
```

Nothing else in the file changes. The old `0.6rem`, `0.8rem`, `0.5rem`, `10px`, `30px`, `color-mix(... white)`, `--color-bg-3` and `--color-fg-3` values disappear from this file.

## 4. Logic flows

None: the step changes static styles only; there is no state, effect or handler.

## 5. Edge cases and errors

| Case | Expected behavior |
|------|-------------------|
| Viewport ≤ 1024px | `Wrapper` hides the box (`display: none`), as today. |
| Viewport just above 1024px with a narrow third column | Card shrinks under `max-width: 300px`; headlines wrap within the row; no horizontal overflow. |
| Long headline (e.g. "Laws, scandals, and taxes: ...") | Wraps over several lines with `--line-height-tight`; row hover tint grows with it. |
| Keyboard focus on "Show more ..." | Orange 2px outline (global rule) with rounded corners; Enter navigates to `/explore`. |
| Mouse click on "Show more ..." | No focus ring (`:focus-visible` only); pressed color while held; navigates to `/explore`. |
| Hovering a row | Subtle tint only; rows are not interactive (no pointer cursor, no focus). |
| `prefers-reduced-motion: reduce` | Hover/color changes are instant (global rule); nothing else differs. |
| Inter not loaded | Fallback font renders; sizes and layout stay the same. |

## 6. Tests

The project has no automated test suite and this step adds none.

### 6.1 Automated

| Check | Given / When / Then | Proves |
|-------|---------------------|--------|
| `npm run lint` | Given the change, when linting, then 0 errors and 0 warnings. | Build criteria |
| `npm run build` | Given the change, when running `tsc && vite build`, then it succeeds. | Build criteria |

### 6.2 Manual

Run `npm run dev`, logged in or not (News is in the layout for both), on `/`.

- Given width 1280px, when the page loads, then the right column shows a dark card (surface slightly lighter than the page, thin border, soft shadow, rounded corners) with the title "What is happening now?", the same 4 items in the same order with the same texts, and "Show more ..." in orange; no orange card background remains. (FR-18)
- Given width 1280px, when inspecting each text node in DevTools → Computed, then title is 17px, meta lines 13px and muted, headlines 15px at weight 600, link 15px; no `font-size` below 13px. (FR-03, FR-18)
- Given width 1280px, when hovering each item row, then a subtle lighter background appears behind that row only and fades in quickly. (FR-18)
- Given width 1280px, when hovering "Show more ...", then it turns lighter orange and underlined; when pressing and holding, then it turns darker orange. (FR-06)
- Given width 1280px, when pressing Tab until "Show more ..." is focused, then a 2px orange outline with rounded corners appears around it; when pressing Enter, then the app navigates to `/explore`. (FR-06, parity)
- Given widths 1024px and 800px, when the page loads, then the News card is not shown, same as before. (Layout parity)
- Given the Network tab, when loading `/` and clicking "Show more ...", then the News box fires no request and navigation to `/explore` is client-side. (Backend parity)

### 6.3 Static checks

- `grep -nE "0\.6rem|0\.8rem" src/components/news.tsx` → no output. (FR-03)
- `grep -nE "color-mix|white|--color-bg-|--color-fg-|#[0-9a-fA-F]{3,6}|rgb\(" src/components/news.tsx` → no output (only new semantic tokens). (FR-18, token convention)
- `grep -n 'to="/explore"' src/components/news.tsx` → one match. (Link target unchanged)
- `grep -c "<Item>" src/components/news.tsx` → `4`. (Content unchanged)
- `git diff --stat -- src` → only `src/components/news.tsx` changed.

## 7. Implementation order

1. Rewrite `Box` (card surface, title, link states); check the card at 1280px.
2. Rewrite `Item` (row padding, hover tint, meta and headline typography).
3. Run `npm run lint`, `npm run build`, the static checks and the manual checks.

## 8. Out of scope

- Does not change the News texts, the number or order of items, the markup structure, or the `/explore` link target (no real news data: RFF non-goal).
- Does not change the `<= 1024px` hide rule or the page layout; does not touch `src/pages/main-template-page.tsx` or any other file.
- Adds no global CSS, no new tokens, no new shared components and no icons.

## 9. Design notes

- **Accent on the link, not the card background:** the RFF allows the orange accent on the title or link; putting it on "Show more ...", the only interactive element, keeps the card calm and makes the actionable item the one that stands out.
- **Semantic tokens only:** the file stops using `--color-bg-3`/`--color-fg-3` and the `color-mix(... white)` literal, so the card follows the palette from one source of truth.
- **Shared horizontal padding (`--space-3`)** for title, rows and link aligns all text while letting the row hover tint fill the card's inner width; rejected: negative margins on rows, which are harder to read.
- **Markup kept as is (styles only):** the plan limits this step to styles; rows stay non-interactive, so the hover tint is purely visual and no extra focus targets are introduced.
- **`max-width: 300px` kept as a literal:** it is the existing column width, not a design token; changing it would alter the layout.
- **Card rules are written locally in `Box`:** they are small and specific to the narrow News column.
