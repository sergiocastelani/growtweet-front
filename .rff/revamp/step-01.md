# S01 - Dark theme tokens and Inter font re-skin the whole app

- **Plan:** [plan.md](plan.md)
- **Type:** Enabler
- **Requirements covered:** FR-01, FR-02, FR-03 (font + scale tokens), FR-04, FR-05 (icon library upgrade), FR-06 (global focus ring baseline), FR-15 (app background token)
- **Prerequisites:** none
- **Creates:**
  - Color tokens `--color-surface-0`, `--color-surface-1`, `--color-surface-2`, `--color-surface-hover`, `--color-border`, `--color-text`, `--color-text-secondary`, `--color-text-muted`, `--color-accent`, `--color-accent-hover`, `--color-accent-pressed`, `--color-accent-subtle`, `--color-on-accent`, `--color-focus-ring`, `--color-danger`, `--color-danger-subtle`, `--color-success`, `--color-info`, `--color-warning`, `--color-backdrop`
  - Legacy aliases `--color-1..3`, `--color-bg-1..5`, `--color-fg-1..5`, `--color-bg-disabled`, `--color-fg-disabled`, `--color-danger-1/2`, `--color-bg-danger-1/2`, `--color-fg-danger-1/2`, `--color-info-1`, `--color-bg-info-1`, `--color-fg-info-1` (remapped)
  - Typography tokens `--font-family-base`, `--font-size-xs/sm/md/lg/xl/2xl`, `--font-weight-regular/medium/semibold/bold`, `--line-height-tight/base`
  - Spacing `--space-1..7`, radius `--radius-sm/md/lg/pill`, elevation `--shadow-1/2`
  - Motion `--duration-fast/base/slow`, `--ease-out` + global reduced-motion rule
  - Layout `--mobile-nav-height`
  - Global `body` base styles and global `:focus-visible` ring
  - Inter font link in `index.html`
  - `react-icons@^5.7.0` dependency

## 1. Goal

Replace the navy/Roboto look with the dark neutral design-system foundation in the global stylesheet only. When done:

- Every page renders on near-black/charcoal surfaces with white text and orange accents, in Inter; `rgb(3, 0, 34)` and `Roboto` no longer exist in the app source (`src/`, `index.html`, `index.css`).
- Every existing component keeps working unchanged because all legacy token names still resolve, now onto the new palette (auth panels become dark cards).
- Any keyboard-focused element shows a 2px orange outline with a 2px offset.
- With `prefers-reduced-motion: reduce`, animations and transitions are effectively instant (e.g. the warm-up toast appears without sliding).
- `react-icons` is at 5.7.x, so the current Lucide names (`LuHouse`, `LuSquarePlus`, `LuCircleCheck`, `LuCircleAlert`, ...) are importable from `react-icons/lu`; no component import changes.

## 2. Context

- `src/app-style.css` (imported once in `src/App.tsx` via `import './app-style.css'`) holds a `:root` block that starts with an `@import` of Roboto (invalid inside a rule block, so it is ignored by browsers today), then the palette: `--color-1` navy `rgb(3, 0, 34)`, `--color-2` orange `rgb(230, 110, 41)`, `--color-3` white, disabled/danger/info colors, and `--color-bg-N`/`--color-fg-N` (N = 1..5) built from `--color-1..3`. A `body { font-family: "Roboto", sans-serif; }` rule follows. `body` has no `color` or `background` today.
- `index.css` (project root, linked from `index.html` with `<link rel="stylesheet" href="index.css">`) has the reset: `* { box-sizing: border-box; }` and `body { margin: 0; padding: 0; }`.
- `index.html` `<head>`: charset, icon, the `index.css` link, viewport, title. No font links.
- Current legacy-token usage in components (all must keep resolving; roles observed in the code):

  | Token | Used for today |
  |-------|----------------|
  | `--color-1`, `--color-2`, `--color-3` | base navy / orange / white; `--color-3` in `color-mix(... 30%/50%, transparent)` borders and muted text; `--color-2` liked/hover orange |
  | `--color-bg-1` | page background behind auth panels (login, new-account, edit-account pages) |
  | `--color-fg-1` | orange avatar ring (profile), accent text on auth panel |
  | `--color-bg-2` / `--color-fg-2` | main layout background/text; also the submit buttons (tweet form, login, new-account, edit-account) |
  | `--color-bg-3` / `--color-fg-3` | News box (orange background, navy text) |
  | `--color-bg-4` / `--color-fg-4` | orange pills (Tweet Now, Login), orange login-page area, nav hover tint |
  | `--color-bg-5` / `--color-fg-5` | auth panels and their inputs (white card, navy text/border) |
  | `--color-bg-disabled` / `--color-fg-disabled` | disabled submit buttons |
  | `--color-danger-1/2`, `--color-bg/fg-danger-1` | form error text; red Cancel button |
  | `--color-bg-info-1` / `--color-fg-info-1` | warm-up toast |

- No component uses `outline`, `:focus` or `transition`; the only animation is the toast slide (`animation: toast-slide-effect 0.5s`). The modal sets its own `background-color: white; color: black`, so a white `body` text color does not affect it.
- `package.json` has `"react-icons": "^5.0.1"`; `package-lock.json` resolves 5.0.1.
- Conventions: theme colors are CSS custom properties; no test suite; verification is `npm run lint`, `npm run build` and manual browser checks.

## 3. Structure

### 3.1 Files

| File | Change | Responsibility |
|------|--------|----------------|
| `package.json`, `package-lock.json` | modify (via `npm install react-icons@^5.7.0`) | Icon library version |
| `src/app-style.css` | modify (full rewrite of its content) | Design tokens, legacy aliases, global base styles, focus ring, reduced motion |
| `index.html` | modify | Load Inter from Google Fonts |
| `index.css` | modify (small addition) | Reset + font smoothing |

### 3.2 Dependencies

Run `npm install react-icons@^5.7.0`. Result: `package.json` → `"react-icons": "^5.7.0"`, `package-lock.json` resolves 5.7.x. No other dependency changes. No source import changes (every icon imported today, `FaHashtag`, `FaHome`, `FaRegUser`, `SlLogin`, `SlLogout`, `BsPlusSquare`, `VscEdit`, `HiOutlineChatBubbleLeft`, `IoIosHeart`, `IoMdHeartEmpty`, `LuArrowDownToLine`, `LuArrowUpToLine`, still exists in 5.7.0; `npm run build` proves it).

### 3.3 Global styles: `src/app-style.css`

Replace the whole file with the sections below, in this order. Remove the Roboto `@import` entirely (the font now comes from `index.html`). Values marked "suggested" may be tuned by the implementer as long as the role is respected and white text stays readable on every surface; values not marked are fixed by the plan.

**Section 1 — `:root` design tokens**

```css
:root {
    color-scheme: dark;

    /* Surfaces (suggested values) */
    --color-surface-0: #0f0f10;                     /* app background */
    --color-surface-1: #17171a;                     /* raised: cards, News, auth panels */
    --color-surface-2: #1f1f23;                     /* elevated: modal, toast, menus */
    --color-surface-hover: rgb(255 255 255 / 0.05); /* row/item hover tint, layered on any surface */
    --color-border: #2a2a2f;                        /* dividers, input borders */

    /* Text */
    --color-text: #fff;
    --color-text-secondary: #a1a1aa;  /* suggested */
    --color-text-muted: #71717a;      /* suggested; meta text (handles, times) */

    /* Accent (brand orange) */
    --color-accent: rgb(230, 110, 41);
    --color-accent-hover: rgb(240, 130, 66);        /* suggested: lighter */
    --color-accent-pressed: rgb(204, 93, 30);       /* suggested: darker */
    --color-accent-subtle: rgb(230 110 41 / 0.12);  /* tinted hovers, e.g. like */
    --color-on-accent: #fff;
    --color-focus-ring: var(--color-accent);

    /* Status (suggested values, tuned for a dark background) */
    --color-danger: rgb(239, 68, 68);
    --color-danger-subtle: rgb(239 68 68 / 0.12);
    --color-success: rgb(34, 197, 94);
    --color-info: rgb(59, 130, 246);
    --color-warning: rgb(245, 158, 11);
    --color-backdrop: rgb(0 0 0 / 0.6);

    /* Typography */
    --font-family-base: "Inter", system-ui, sans-serif;
    --font-size-xs: 13px;
    --font-size-sm: 15px;   /* tweet body */
    --font-size-md: 17px;
    --font-size-lg: 20px;
    --font-size-xl: 24px;
    --font-size-2xl: 32px;
    --font-weight-regular: 400;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;
    --line-height-tight: 1.25;
    --line-height-base: 1.5;

    /* Spacing */
    --space-1: 4px;
    --space-2: 8px;
    --space-3: 12px;
    --space-4: 16px;
    --space-5: 24px;
    --space-6: 32px;
    --space-7: 48px;

    /* Radius */
    --radius-sm: 6px;
    --radius-md: 10px;
    --radius-lg: 16px;
    --radius-pill: 9999px;

    /* Elevation (suggested values) */
    --shadow-1: 0 1px 2px rgb(0 0 0 / 0.4), 0 4px 12px rgb(0 0 0 / 0.25);  /* cards */
    --shadow-2: 0 2px 6px rgb(0 0 0 / 0.4), 0 12px 32px rgb(0 0 0 / 0.5);  /* modal, toast */

    /* Motion */
    --duration-fast: 150ms;
    --duration-base: 200ms;
    --duration-slow: 250ms;
    --ease-out: cubic-bezier(0.2, 0, 0, 1);  /* suggested */

    /* Layout: mobile bottom bar content height, EXCLUDING env(safe-area-inset-bottom).
       Full bar height = calc(var(--mobile-nav-height) + env(safe-area-inset-bottom)). */
    --mobile-nav-height: 56px;
}
```

Rules for this section:
- Every color token must be a valid CSS color (literal, or `var()` / `color-mix()` of other color tokens) so it resolves to a concrete color when used as `color: var(<token>)` on any element.
- `color-scheme: dark` makes native scrollbars and unstyled form controls dark, matching the theme.
- Text contrast: `--color-text` and `--color-text-secondary` must read clearly on `--color-surface-0/1/2`; `--color-text-muted` is for secondary meta only.

**Section 2 — legacy aliases (same `:root` block or a second `:root` block right after; kept forever)**

Each legacy name becomes a pure `var()` reference to a new token. No legacy name keeps a literal value, so the old palette (navy, the old reds, the old blue, the gray disabled colors) disappears.

| Legacy token | New value | Rationale (keeps today's role) |
|--------------|-----------|-------------------------------|
| `--color-1` | `var(--color-surface-0)` | was navy base background |
| `--color-2` | `var(--color-accent)` | brand orange |
| `--color-3` | `var(--color-text)` | white |
| `--color-bg-1` | `var(--color-surface-0)` | page behind auth panels |
| `--color-fg-1` | `var(--color-accent)` | orange accent text / avatar ring |
| `--color-bg-2` | `var(--color-surface-0)` | main layout background |
| `--color-fg-2` | `var(--color-text)` | main layout text |
| `--color-bg-3` | `var(--color-accent)` | orange background (News) |
| `--color-fg-3` | `var(--color-surface-0)` | dark text on orange |
| `--color-bg-4` | `var(--color-accent)` | orange pills |
| `--color-fg-4` | `var(--color-on-accent)` | white on orange |
| `--color-bg-5` | `var(--color-surface-1)` | auth panels become dark cards (RFF open-question default) |
| `--color-fg-5` | `var(--color-text)` | white text on dark card |
| `--color-bg-disabled` | `var(--color-surface-2)` | disabled control background |
| `--color-fg-disabled` | `var(--color-text-muted)` | disabled control text |
| `--color-danger-1` | `var(--color-danger)` | error text |
| `--color-danger-2` | `var(--color-danger)` | error text |
| `--color-bg-danger-1` | `var(--color-danger)` | danger background |
| `--color-fg-danger-1` | `var(--color-text)` | text on danger |
| `--color-bg-danger-2` | `var(--color-danger)` | danger background |
| `--color-fg-danger-2` | `var(--color-text)` | text on danger |
| `--color-info-1` | `var(--color-info)` | info color |
| `--color-bg-info-1` | `var(--color-info)` | info background (toast) |
| `--color-fg-info-1` | `var(--color-text)` | text on info |

Precede the block with a one-line comment stating these names are kept for compatibility and new code should use the semantic tokens.

**Section 3 — global base styles**

```css
body {
    font-family: var(--font-family-base);
    font-size: var(--font-size-sm);
    line-height: var(--line-height-base);
    background-color: var(--color-surface-0);
    color: var(--color-text);
}

/* Native form controls do not inherit the font by default. */
button, input, textarea, select {
    font: inherit;
}
```

- The `body` rule replaces the old Roboto rule.
- The form-control rule uses element selectors only, so any styled-components class rule (higher specificity) still overrides it.

**Section 4 — focus ring**

```css
:focus-visible {
    outline: 2px solid var(--color-focus-ring);
    outline-offset: 2px;
}
```

Applies to every element. Components may refine `outline-offset` or `border-radius`, never remove the outline.

**Section 5 — reduced motion**

```css
@media (prefers-reduced-motion: reduce) {
    :root {
        --duration-fast: 0ms;
        --duration-base: 0ms;
        --duration-slow: 0ms;
    }

    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}
```

`0.01ms` (not `0`) keeps `animationend` / `transitionend` events firing, so any component logic tied to them still runs. The `!important` is the one justified use: it must beat per-component hard-coded durations such as the toast's `0.5s`.

### 3.4 Global styles: `index.html`

In `<head>`, before the existing `<link rel="stylesheet" href="index.css">`, add:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
```

Only weights 400/500/600/700, no italics (performance NFR). Everything else in `index.html` stays as is.

### 3.5 Global styles: `index.css`

Keep the reset as is. Add font smoothing to the existing `body` rule:

```css
body {
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
```

`index.css` stays a reset file: no colors or tokens go here.

## 4. Logic flows

None: the step is declarative CSS, HTML tags and a dependency bump.

## 5. Edge cases and errors

| Case | Expected behavior |
|------|-------------------|
| Google Fonts unreachable (offline, blocked) | `display=swap` and the fallback chain render text in `system-ui` / `sans-serif`; layout still works. |
| A component references a legacy token | Resolves through the alias table to a new-palette color; nothing renders transparent or with the initial value. |
| A component relied on default black text (`body` had no color) | Modal is safe (sets `color: black` on its dialog). Any other spot found white-on-white during the manual check is noted for the owner of that file, not fixed here (this step edits no component). |
| Submit buttons using `--color-bg-2` | Become `--color-surface-0` buttons with white text: still visible on the white modal and on the dark auth cards. Acceptable interim look; not changed here. |
| News box on `--color-bg-3` with `--color-fg-3` text | Orange card with dark text (same roles as today). |
| Unstyled tweet textarea inside the white modal | With `color-scheme: dark` it renders as a dark native field with light text; readable. Expected. |
| Reduced-motion user | Toast appears in place immediately; no visible slide. |
| Mouse click on a button | No focus ring (only `:focus-visible`, i.e. keyboard focus, shows it). |
| `react-icons` 5.7 drops an icon still imported | `npm run build` fails; stop and report (not expected: all current imports exist in 5.7.0). |

## 6. Tests

The project has no automated test suite and this step adds none (RFF decision 11).

### 6.1 Automated

| Check | Given / When / Then | Proves |
|-------|---------------------|--------|
| `npm run lint` | Given the changes, when linting, then 0 errors and 0 warnings. | Build criteria |
| `npm run build` | Given the upgraded `react-icons`, when running `tsc && vite build`, then it succeeds (all existing icon imports resolve). | FR-05 upgrade safe, build criteria |
| `npm ls react-icons` | Then it prints `react-icons@5.7.x`. | FR-05 (library) |

### 6.2 Manual

Run `npm run dev` with the backend available (or not, for the auth pages). Desktop width 1280px unless stated.

- Given `/`, `/explore`, `/login`, `/new-account` and `/edit-profile` (logged in for the last one), when each page loads, then backgrounds are near-black/charcoal, text is white, orange accents remain, and no navy is visible; the login/new-account/edit-profile panels are dark cards with white text. (FR-01, FR-02, FR-15)
- Given any page, when inspecting `body` in DevTools → Computed, then `font-family` is `Inter, system-ui, sans-serif`, the rendered font (Computed → "Rendered Fonts") is Inter, and the Network tab shows an Inter `woff2` loaded from `fonts.gstatic.com`. (FR-03)
- Given any page, when evaluating `getComputedStyle(document.body).backgroundColor` in the console, then it returns `rgb(15, 15, 16)` (or the chosen `--color-surface-0`), not `rgb(3, 0, 34)`. (FR-01)
- Given the console, when evaluating each new color token and each legacy alias with a probe (e.g. `const p = document.createElement('div'); document.body.append(p); p.style.color = 'var(--color-bg-5)'; getComputedStyle(p).color`), then each returns a concrete `rgb(...)`/`rgba(...)` value (never the inherited default because of an undefined variable). Check at least `--color-surface-0/1/2`, `--color-accent-subtle`, `--color-focus-ring`, `--color-1`, `--color-bg-5`, `--color-fg-3`, `--color-bg-disabled`, `--color-bg-info-1`. (FR-02, runtime readability)
- Given the feed (or `/login`), when pressing Tab repeatedly, then the focused link/button/input shows a 2px orange outline offset by 2px; when clicking a button with the mouse, then no outline appears. (FR-06)
- Given DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion: reduce" and either the backend stopped (the ping fails and the uncleared 4s timer still shows the toast) or `/auth/ping` throttled past 4s, when loading `/`, then the warm-up toast appears without sliding; with emulation off, it slides in as before. (FR-04)
- Given widths 1280, 800 and 375px, when comparing with the pre-revamp app, then the same components are in the same places (only colors and font changed). (Structure parity)
- Given the Network tab, when loading `/`, then the API requests are the same as before (one `GET /auth/ping`, the feed fetch); only the Google Fonts requests are new. (Backend parity)

### 6.3 Static checks

- `grep -rn "Roboto" src index.html index.css` → no output. (FR-03)
- `grep -rnE "rgb\(3, ?0, ?34\)" src index.html index.css` → no output. (FR-01)
- `grep -n "@import" src/app-style.css` → no output. (FR-03)
- `grep -n "fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" index.html` → one match. (FR-03, performance NFR)
- `grep -n "react-icons" package.json` → `"react-icons": "^5.7.0"`. (FR-05)
- `grep -n "prefers-reduced-motion" src/app-style.css` → one match. (FR-04)
- `grep -n ":focus-visible" src/app-style.css` → one match. (FR-06)
- `git diff --stat -- . ':(exclude).rff'` → only `package.json`, `package-lock.json`, `src/app-style.css`, `index.html`, `index.css` changed outside `.rff/` (no component touched).

## 7. Implementation order

1. `npm install react-icons@^5.7.0`; run `npm run build` to confirm all current icon imports still resolve.
2. Rewrite `src/app-style.css`: new tokens first, then the legacy alias block (the app now renders dark), then `body` and form-control base styles (Inter applies once the font is loaded), then `:focus-visible`, then the reduced-motion block.
3. Add the three Inter `<link>` tags to `index.html`.
4. Add font smoothing to `index.css`.
5. Run `npm run lint`, `npm run build`, the static checks and the manual checks.

## 8. Out of scope

- Does not edit any file under `src/components/`, `src/pages/`, `src/App.tsx`, `src/main.tsx`, `src/app-router.tsx` or `src/api/`; existing hard-coded colors in components (e.g. the modal's white dialog, `PulseLoader color="white"`, skeleton `#ffffff`) stay as they are.
- Does not change any icon import, markup, layout, breakpoint or copy.
- Adds no light theme, theme toggle or `prefers-color-scheme` handling (RFF non-goal).
- Adds no UI library and no runtime npm package other than the `react-icons` version bump.

## 9. Design notes

- **Remap, not migrate (FR-02):** legacy names become pure `var()` aliases of semantic tokens, so the whole app re-skins with zero component edits and the old palette has a single point of removal (DRY: every color has one literal definition, among the new tokens).
- **Alias mapping follows today's roles,** not the old literal colors: e.g. `--color-fg-3` maps to `--color-surface-0` (dark text on orange) and `--color-bg-5`/`--color-fg-5` to a dark card with white text (RFF open-question default).
- **Font loaded via `<link>` in `index.html`** instead of a top-of-file `@import`: it starts downloading in parallel with the JS bundle (with `preconnect`), rather than after the CSS that Vite injects from `App.tsx` is parsed.
- **`color-scheme: dark`** is added so native scrollbars and unstyled controls match the dark theme; the visible side effect (dark native textarea in the still-white modal) is readable and expected.
- **Form-control `font: inherit`** is the minimal way to make Inter "apply everywhere" (FR-03); element-level specificity keeps all component styles in control.
- **Reduced motion in one place (FR-04):** duration tokens go to `0ms` for components that use them, and a global `!important` rule covers hard-coded durations, so no component needs its own media query. Rejected: only zeroing the tokens (would miss the toast's literal `0.5s`).
- **`--color-focus-ring` aliases `--color-accent`** rather than duplicating the orange literal, so the brand color has one definition.
- Neutral, status, shadow and easing values are suggestions within the plan's latitude; the roles and names are fixed.
