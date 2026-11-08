# Design Contract: Modernize Site Appearance

- **Plan:** [plan.md](plan.md)
- **Updated:** 2026-11-07

## 1. Step status
| Step | Title | Status | File |
|------|-------|--------|------|
| S01 | Dark theme tokens and Inter font re-skin the whole app | approved | [step-01.md](step-01.md) |
| S02 | Shared UI primitives (buttons, icon button, fields, alert, panel, page title) | approved | [step-02.md](step-02.md) |
| S03 | Toast variants and an app-level toast service | approved | [step-03.md](step-03.md) |
| S09 | News box as a dark raised card | approved | [step-09.md](step-09.md) |
| S04 | Themed new-tweet/reply dialog with Esc/backdrop close, counter and inline errors | approved | [step-04.md](step-04.md) |
| S05 | Desktop NavBar with active route, primary pill and compact user chip | pending | - |
| S06 | Mobile bottom bar with Lucide icons, active state and safe-area padding | pending | - |
| S07 | Main layout, central-column titles, Explore page and replies inline error | pending | - |
| S08 | Tweet row restyle with accessible icon actions and themed skeleton | pending | - |
| S10 | Profile header restyle with ghost Edit button and themed skeleton | pending | - |
| S11 | Login page as a themed split panel | pending | - |
| S12 | New-account page restyle with inline API errors | pending | - |
| S13 | Edit-profile page restyle with inline errors and "Account updated!" toast | pending | - |

Status: pending | draft | approved

Order of work follows the plan's execution stages (stage 1: S01; stage 2: S02, S03, S09; stage 3: S04-S08, S10-S13).

## 2. Shared items
Names that cross steps, as the plan assigns them. Details are filled in from each approved step file.

| Item | Kind | Created by | Used / extended by | Notes |
|------|------|-----------|--------------------|-------|
| Color tokens (`--color-surface-0/1/2`, `--color-surface-hover`, `--color-border`, `--color-text`, `--color-text-secondary`, `--color-text-muted`, `--color-accent`, `--color-accent-hover`, `--color-accent-pressed`, `--color-accent-subtle`, `--color-on-accent`, `--color-focus-ring`, `--color-danger`, `--color-danger-subtle`, `--color-success`, `--color-info`, `--color-warning`, `--color-backdrop`) | CSS variables | S01 | all other steps | Stable names and roles |
| Legacy color aliases (`--color-1..3`, `--color-bg/fg-1..5`, `--color-bg/fg-disabled`, `--color-danger-1/2`, `--color-bg/fg-danger-1/2`, `--color-info-1`, `--color-bg/fg-info-1`) | CSS variables | S01 | any not-yet-migrated file | Remapped onto new palette; never removed |
| Typography tokens (`--font-family-base`, `--font-size-xs..2xl`, `--font-weight-regular/medium/semibold/bold`, `--line-height-tight/base`) | CSS variables | S01 | all other steps | Scale 13/15/17/20/24/32px |
| Spacing, radius, shadow tokens (`--space-1..7`, `--radius-sm/md/lg/pill`, `--shadow-1/2`) | CSS variables | S01 | all other steps | |
| Motion tokens (`--duration-fast/base/slow`, `--ease-out`) + global reduced-motion rule | CSS variables / global rule | S01 | S02, S03, S04, area slices | Reduced motion handled globally |
| `--mobile-nav-height` | CSS variable | S01 | S06, S07 | Bar content height excl. safe area; full bar = `calc(var(--mobile-nav-height) + env(safe-area-inset-bottom))` |
| Global `:focus-visible` ring and `body` base styles | global CSS | S01 | all | Components may refine, not remove |
| Inter font link | `index.html` tags | S01 | all | |
| `react-icons@^5.7.0` | npm dependency | S01 | S02, S03, S04, S05, S06, S08, S10 | Current Lucide names importable from `react-icons/lu` |
| `readThemeColor(token)` | function (`src/components/ui/theme-color.ts`) | S02 | S08, S10 | |
| `Button` (`$variant`, `$fullWidth`) | styled component (`src/components/ui/button.tsx`) | S02 | S04, S05, S10, S11, S12, S13 | |
| `IconButton` (`$tone`, `$active`) | styled component (`src/components/ui/icon-button.tsx`) | S02 | S06, S08 | `type="button"` default; `aria-label` optional prop, consumers pass it by convention |
| `FieldLabel`, `TextInput`, `TextArea`, `FieldError` | styled components (`src/components/ui/field.tsx`) | S02 | S04, S11, S12, S13 | |
| `InlineAlert` (`variant`) | component (`src/components/ui/inline-alert.tsx`) | S02 | S04, S07, S11, S12, S13 | |
| `CenteredPage`, `Panel` | styled components (`src/components/ui/panel.tsx`) | S02 | S11, S12, S13 | `Panel` sets no width (size via `styled(Panel)`); 1px `--color-border` outline + `--shadow-1` |
| `PageTitle` | styled component (`src/components/ui/page-title.tsx`) | S02 | S07, S10 | |
| `Toast` (`text`, `variant`) | component (`src/components/toast.tsx`) | S03 | S03 | Plain card (no positioning); `ToastProps = ToastContent` |
| `ToastContent` (`text`, `variant?`) | type (`src/components/toast-context.ts`) | S03 | S03 | |
| `ToastVariant` | type (`src/components/toast-context.ts`) | S03 | S13 | |
| `ToastProvider` (`pinnedToast?`) | component (`src/components/toast-provider.tsx`) | S03 | S03 (`App.tsx`); S04 (stacking) | Renders a fixed top-center stack at `z-index: 1000` with `pointer-events: none`, above dialogs; optional pinned (non-dismissing) toast first |
| `useToast()` / `showToast(text, variant?, durationMs?)` | hook (`src/components/toast-context.ts`) | S03 | S04, S13 | Stacked toasts, each auto-dismisses on its own timer (default 3000ms); survives route changes; throws outside the provider |
| `Modal` (`onClose`, `closeDisabled`, `labelledBy`) | component (`src/components/modal.tsx`) | S04 | S04 | Portaled to `document.body`, z-index below the toast stack; Esc/backdrop close unless `closeDisabled`; body scroll lock; focus in on open, back to opener on close |
| `TweetNewForm` (`replyId?`, `onCreated`, `onCancel`) | component (existing) | S04 (restyle) | S05, S06, S08 | Props unchanged |
| `LogoutButton` | component (existing, `src/components/logout-button.tsx`) | S05 (restyle) | S10 | No props |

## 3. Decisions
Decisions approved during a step's review, each about that step's own work only.
- (S01) Keep `color-scheme: dark` on `:root` and `font: inherit` on form controls (additions beyond the plan's list, approved by the user).
- (S01) Legacy aliases are pure `var()` references that keep each token's current role (mapping table in step-01.md); neutral/status values are the ones suggested in step-01.md.
- (S01) Reduced motion: duration tokens become `0ms` and a global `!important` rule sets animation/transition durations to `0.01ms`.
- (S02) Private helper `src/components/ui/control-styles.ts` (hit area, disabled opacity, pressed scale, transition) is kept; internal to `ui/`.
- (S02) `IconButton`'s `aria-label` stays an optional native attribute (not a required prop).
- (S02) `Panel` gets a subtle 1px `--color-border` outline in addition to `--shadow-1`.
- (S02) Field border precedence: invalid > focus > hover; `IconButton` `$active` stays orange on hover/press and when disabled (faded).
- (S03) Toasts stack at the top center; each timed toast dismisses on its own timer; new toasts go at the bottom.
- (S03) The warm-up toast joins the same stack as a pinned toast (`ToastProvider` `pinnedToast` prop from `App.tsx`), never auto-dismisses; ping/timer/reload logic unchanged.
- (S03) Slide-in uses `--duration-slow` (250ms) and a full slide-down; a new lower toast briefly passes over the one above while sliding (accepted).
- (S09) Orange accent on the "Show more ..." link only; the News title stays white. Card styles are local to `news.tsx`.
- (S04) Unknown (non-axios) error: dialog stays open and shows a danger toast `Unknow error occurred!!` (no `onCancel()`); API errors use the inline banner.
- (S04) No focus trap; focus returns to the opener when the dialog closes.
- (S04) Dialog max width 600px; dialog is portaled to `document.body` and sits below the toast stack.
- (S04) The inline API error banner clears as soon as the user edits the text (and when a submit starts).
