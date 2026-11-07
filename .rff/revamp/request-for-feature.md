# Feature Request: Modernize Site Appearance

- **Date:** 2026-11-07
- **Source:** current session (`/rff-create` interview, branch `revamp`)
- **Status:** Ready for implementation (one non-blocking open question, with a default)

## 1. Summary

Restyle the whole GrowTweet frontend so it looks like a modern, professional product, without changing its structure. Every page keeps the same components, positions and arrangement: the 3-column layout (NavBar | feed | News), the mobile bottom bar and the same routes. What changes is the visual language: a dark neutral theme with orange as the accent and white text, Inter typography, one consistent icon set, polished states and motion, and better accessibility. Local UI behavior may improve. Every interaction with the backend (which requests are made, in what order, with what payload, and the reloads or redirects that follow) must stay exactly the same.

## 2. Problem and goals

**Problem.** The current UI looks amateurish: a saturated navy background, flat 30%-white borders, icons from six different sets, plain white modals, browser `alert()` popups, no hover, focus or active states, and clickable `div`s that keyboards and screen readers can't use.

**Goals / success criteria**
- The UI uses one coherent design system: color tokens, a type scale, spacing, radius, elevation and motion, applied to every component.
- Orange (`rgb(230, 110, 41)`, today's `--color-2`) and white (`#fff`) are still the brand colors. Every other color may be replaced.
- The page structure is unchanged: a side-by-side before/after shows the same components in the same places at all three breakpoints.
- Backend interaction parity: the same API requests (endpoint, method, order, payload) and the same follow-up navigation and reloads for every flow (see §10).
- `npm run lint` (0 warnings) and `npm run build` pass.

**Non-goals**
- Light theme, a theme toggle, or following the OS color scheme.
- Redesigning the logo (`src/assets/logo.svg`) or the default avatar (`src/assets/empty_avatar.png`). Only their sizing and framing may change.
- Adopting a UI component library (Radix, MUI, Chakra, Tailwind, ...).
- Any change to the API layer (`src/api/`), DTOs, auth or token handling, or routes.
- New features or new content (for example real news data). The News box keeps its static content.
- Adding a logout confirmation.

## 3. Users and use cases

- As a **visitor**, I want the login and sign-up screens to look trustworthy and polished, so that I'm comfortable creating an account.
- As a **logged-in user**, I want a clean, readable feed with clear like, reply and navigation affordances, so that reading and interacting feels effortless.
- As a **keyboard or screen-reader user**, I want every clickable control to be a real, labelled, focusable element, so that I can use the app without a mouse.
- As a **mobile user**, I want the bottom bar and dialogs to be comfortable to tap and to show where I am.

## 4. Functional requirements

**Design system**
- **FR-01** Replace the tokens in `src/app-style.css` with a dark neutral palette. Navy `rgb(3,0,34)` is removed. Define tokens for: app background, raised surfaces (at least 2 levels, e.g. cards, modal, hover row), border/divider, primary text (white), secondary and muted text, accent (orange) plus its hover and pressed variants, focus ring, danger, success and info. The specific neutral values are up to the implementer (suggestion: near-black/charcoal, e.g. `#0f0f10` / `#17171a` / `#1f1f23`, borders around `#2a2a2f`).
- **FR-02** Keep the existing semantic token names that components already use (`--color-bg-N`/`--color-fg-N`, `--color-*-danger/info`, `--color-*-disabled`) by remapping them, or migrate every usage to new names. Either way, no component may be left referencing a removed token.
- **FR-03** Change the font from Roboto to **Inter** (Google Fonts, weights 400/500/600/700). Move the font `@import` out of the `:root` block (it is invalid there today) to the top of the stylesheet or into `index.html` as `<link>` tags. Define a type scale (e.g. 13/15/17/20/24/32px) and apply it everywhere. Tweet body text should be about 15px, not today's 0.8rem.
- **FR-04** Define and apply shared spacing, border-radius, shadow/elevation and transition-duration tokens. Motion must respect `prefers-reduced-motion: reduce`.

**Icons**
- **FR-05** Use **Lucide** (`react-icons/lu`) for every icon in the app: home, explore/hashtag, profile, new tweet, login, logout, edit, like (outline / filled when liked), reply, show replies, show replied tweet. Remove all imports from `react-icons/fa`, `io`, `hi2`, `sl`, `bs` and `vsc`.

**Components and states**
- **FR-06** Every interactive element has hover, active/pressed, disabled and `:focus-visible` states. The focus ring is visible on the dark background (e.g. a 2px orange outline with offset).
- **FR-07** Button hierarchy: primary actions (Tweet Now, Submit, Login, Create account, Save) are solid orange pills with white text. Secondary actions (Cancel, Edit) are ghost/outline. Red is used only for errors and destructive meaning, so the tweet form's Cancel is **no longer red**.
- **FR-08** Navigation items in the desktop `NavBar` and in `NavBarMobile` highlight the **active route** (orange icon and label, bolder weight), using `NavLink` or equivalent. The targets stay the same: `/`, `/explore`, `/profile/:id`, `/login`.
- **FR-09** Clickable `div`/`span`/`svg` elements become semantic elements: nav items, `@username`, like, reply, show-replies, show-replied, logout, edit-profile, and the "+ Tweet Now" and login buttons. Use `<button type="button">` for actions and `<Link>`/`<NavLink>` for navigation, each with an `aria-label` (or visible text) and a hit area of at least 40×40px on touch layouts. Click handlers and navigation targets stay the same.
- **FR-10** **Modal polish** (`src/components/modal.tsx`): a dark themed dialog (raised surface, rounded corners, shadow) over a dimmed or blurred backdrop, with a fade/scale-in animation. Use `position: fixed` so it covers the viewport even when the page is scrolled. Lock body scroll while it is open. Pressing **Esc** or clicking the backdrop triggers the same handler as Cancel (`onCancel`), and is ignored while a submit is in progress. Use `role="dialog"` and `aria-modal="true"`, and move focus into the dialog on open (the textarea already has `autoFocus`).
- **FR-11** **Tweet form character counter** (`tweet-new-form.tsx`): a live `n / 250` counter that changes to a warning color near the limit (e.g. ≥ 230) and to danger when over. The existing react-hook-form validation (required, max 250) and its messages stay.
- **FR-12** **Replace every `alert()` with in-UI feedback**, keeping the same message text:
  - `tweet-new-form.tsx`: API errors show as an inline error banner inside the modal, which stays open. Behavior on success is unchanged.
  - `new-account-form.tsx` and `edit-account-form.tsx`: API errors show inline, styled like the existing `errorMessage` pattern in `login-form.tsx`.
  - `edit-account-page.tsx`: "Account updated!" shows as a **success toast**. The page still calls `navigate(-1)` after a successful update. The toast must stay visible after navigation (e.g. render it at app level, or wait about 1.5s before navigating).
  - `replies-page.tsx`: the fetch error shows as an inline error state in the central column (or a danger toast), with the same text.
- **FR-13** Restyle `Toast` with variants (info, success, danger): a raised surface, an accent left border or icon, and the same slide-in. The warm-up toast in `App.tsx` keeps its text, its 4s timing and its reload behavior.
- **FR-14** Restyle the loading skeletons (`TweetDisplayLoading`, `ProfileUserInfoLoading`) to use the theme's surface colors so they blend with the dark UI.

**Per-area visual requirements** (structure unchanged)
- **FR-15** `MainTemplatePage`: app background token. The central column uses subtle divider borders. Breakpoints stay at 1024px and 600px.
- **FR-16** `NavBar`: logo, nav list, primary "Tweet Now" pill and login button in the same order. Nav items are rounded rows with hover backgrounds. `LoggedUserInfo` stays pinned at the bottom as a compact user chip (avatar, name, muted @handle, logout).
- **FR-17** `TweetDisplay`: same layout (avatar | header, content, action footer). Clear hierarchy: bold name, muted @handle and relative time, comfortable line-height for content. Action buttons are icon buttons with circular hover tints (like turns orange). The row gets a subtle hover background. Dividers use the border token.
- **FR-18** `News`: same 4 static items and "Show more ..." link, now a dark raised card with an orange accent (title or link). Rows get hover tints and readable font sizes (no 0.6rem text).
- **FR-19** `ProfileUserInfo` and the profile page: same elements and order, restyled with the theme (avatar framing, name, handle, edit button as ghost).
- **FR-20** Login, new-account and edit-profile pages: still a centered panel outside the main layout, with restyled inputs (dark field, clear label, orange focus ring, inline error text), a primary button, and a loading state (`PulseLoader` recolored to fit).
- **FR-21** `NavBarMobile`: same items in the same order, Lucide icons, active highlight, evenly spaced, height suited to tapping, a top divider, and safe-area padding (`env(safe-area-inset-bottom)`).

## 5. Behavior and flows

Backend-facing flows **must be identical** to today. Only presentation and the local behaviors listed here may differ.

| Flow | Must stay the same | Local changes allowed |
|---|---|---|
| App start / warm-up | `/auth/ping`, 4s toast, reload on success | Toast styling |
| Login | `ApiAuth` login call, `setLoggedUser`, then the existing redirect | Input/button styling, inline errors (already inline) |
| Sign-up | Same call and payload, then the existing redirect | `alert()` → inline error |
| Feed / Explore / Profile / Replies load | Same fetches in `useEffect` | Skeleton styling; replies error `alert()` → inline/toast |
| New tweet / reply | `ApiAuth.check()` before reply, `create`/`reply` call, `window.location.reload()` on success | Modal look, Esc/backdrop cancel, counter, inline errors |
| Like / unlike | Optimistic update + `like`/`unlike` call | Icon button styling |
| Edit profile | Same update call, `setLoggedUser` with new token, `navigate(-1)` | `alert()` → success toast |
| Logout | `logout()` then `navigate(0)` | Styling only, no confirmation |
| 401 anywhere | Clear storage + hard redirect to `/login` | none |

**Edge and error states**
- Modal: while a submit is in progress, Esc, backdrop click and Cancel are all ignored (today Cancel is already guarded by `loading`).
- Tweet form API error: the modal stays open, the error banner is shown, and the user can retry or cancel. This replaces the `alert()` path. Note that today's "unknown error" path also calls `onCancel()`, which closes the modal. Keep that call so the behavior is unchanged.
- Logged-out user on the main layout: the login button and login icon still show where they do today.
- Empty feed: no new empty state is required (assumption). Keep whatever renders today, restyled.

## 6. UI / UX

- **Theme:** dark neutral surfaces, white primary text, muted gray secondary text, orange for accents, the active state, primary buttons, focus and liked hearts.
- **Typography:** Inter, with a clear scale and weights 400 to 700.
- **Layout:** unchanged. Desktop >1024px shows all 3 columns. Tablet 601 to 1024px hides News and lets the central column grow. Mobile ≤600px hides the NavBar and shows the bottom bar.
- **Motion:** 150 to 250ms ease-out transitions on hover and focus. Modal fade/scale and toast slide. All of it is disabled under `prefers-reduced-motion`.
- **Accessibility:** semantic controls (FR-09), visible focus (FR-06), `aria-label`s on icon-only buttons, `role="dialog"` modal, alt text on avatars and the logo. Keep text and background contrast readable. A formal WCAG audit is not required.

## 7. Data model

None. No stored data, DTOs or localStorage keys change.

## 8. Integration and technical notes

- **Files likely touched:** `src/app-style.css`, `index.html` / `index.css` (font), every file under `src/components/` and `src/pages/` (styled-components at the bottom of each file), `src/App.tsx` (toast variants, and maybe an app-level toast for FR-12).
- **Must not change:** `src/api/**`, `src/app-router.tsx` route definitions, `src/main.tsx` bootstrap logic.
- **Patterns to keep:** styled-components defined at the bottom of each component file, theme via CSS custom properties, react-hook-form for forms, `react-content-loader` for skeletons, `react-spinners` for button loaders.
- **Dependencies:** no new runtime npm packages are expected (Lucide ships with the installed `react-icons@5`). Inter comes from Google Fonts. Do not add a UI kit.
- **Shared primitives (suggestion):** to avoid duplicating identical button styles (today `CreateTweetButton` and `LoginButton` are copies), you may add small shared styled primitives (e.g. `src/components/ui/button.tsx`, `icon-button.tsx`, `input.tsx`). This is optional.
- **Bug fixed along the way:** the Modal uses `position: absolute; 100vw/100vh`, which misplaces it when the page is scrolled. FR-10 switches it to `fixed`.
- **Toast after navigation (FR-12):** `navigate(-1)` unmounts the edit page, so a toast rendered inside that page would disappear. Either lift the toast to app level (a small context or event in `App.tsx`) or delay the navigation. The app-level option is preferred because it can be reused.

## 9. Non-functional requirements

- **Performance:** no meaningful bundle growth. Load Inter with `display=swap` and only the weights you need.
- **Compatibility:** modern evergreen browsers. `color-mix()` is already in use, so it may keep being used.
- **Security:** no change.
- **i18n:** none. UI strings stay in English, and existing messages are kept verbatim.

## 10. Acceptance criteria

**Visual / structural**
- [ ] Given any page, when compared with the pre-revamp version at desktop (>1024px), tablet (601 to 1024px) and mobile (≤600px), then the same components appear in the same positions and order.
- [ ] Given the app, when inspected, then no navy `rgb(3,0,34)` remains, orange `rgb(230,110,41)` and white are the brand colors, and Inter is the active font.
- [ ] Given the source, when searched, then all icons come from `react-icons/lu`.
- [ ] Given the desktop NavBar or mobile bar, when on `/`, `/explore` or my profile, then the matching item is highlighted.
- [ ] Given keyboard-only navigation, when tabbing through the feed, then nav items, @usernames, like, reply, show-replies and logout are reachable, show a visible focus ring, and activate with Enter/Space.

**Behavior**
- [ ] Given the new-tweet modal is open, when I press Esc or click the backdrop, then it closes exactly as Cancel does. While submitting, it does not close.
- [ ] Given I type in the tweet form, then a live `n / 250` counter updates and changes color near or over the limit. Submitting 251+ chars still shows "Message can have a maximum of 250 characters".
- [ ] Given a tweet/reply, sign-up or profile-update API error, then the message appears inline in the UI and no browser `alert()` is shown.
- [ ] Given a successful profile update, then an "Account updated!" success toast is visible and the app navigates back (`navigate(-1)`).
- [ ] Given `grep -rn "alert(" src`, then there are no matches.

**Backend parity** (Network tab, before vs after)
- [ ] For each flow (app start ping, login, sign-up, feed, explore, profile, replies, new tweet, reply, like, unlike, edit profile, logout), the requests match in endpoint, method, order and payload, and the follow-up navigation or reload (`window.location.reload()`, `navigate(0)`, `navigate(-1)`, redirects) is the same.

**Build**
- [ ] `npm run lint` passes with 0 warnings.
- [ ] `npm run build` succeeds.

## 11. Decisions log

| # | Question | Decision | Rationale |
|---|----------|----------|-----------|
| 1 | Base theme | Dark, neutral (navy → near-black/charcoal) | Closest to the current identity; orange and white stay prominent |
| 2 | Dependencies | Minimal: keep styled-components, no UI kit, a web font is OK | Fits existing patterns, small footprint |
| 3 | Font | Inter (replaces Roboto) | Modern UI font, legible at small sizes |
| 4 | Logo / default avatar | Keep both as they are | Brand assets out of scope |
| 5 | Local behavior scope | Hover/focus/transitions, `alert()` → in-UI errors, modal polish, char counter | All improve UX with no backend effect |
| 6 | Semantic elements | Yes: buttons/links with aria-labels, bigger hit areas | Accessibility and professional quality |
| 7 | Icons | Unify on Lucide (`react-icons/lu`) | One consistent set, already installed |
| 8 | News box | Keep the static content, restyle as a dark card | Structure stays, look matches the theme |
| 9 | Active nav highlight | Yes, desktop and mobile | Client-side only, improves orientation |
| 10 | Button hierarchy | Orange primary pill, ghost secondary; red only for errors/destructive | Standard modern hierarchy; red Cancel was misleading |
| 11 | Verification | Lint + build, manual check at 3 widths, network-flow parity | No test suite exists |
| 12 | Logout confirmation | None (unchanged) | Not requested; would add a flow step |
| 13 | "Account updated!" alert | Becomes a success toast, `navigate(-1)` kept | Removes `alert()` without changing the flow |
| 14 | Spec location | `.rff/revamp/request-for-feature.md` | User choice |

## 12. Open questions

- **Auth / edit-profile panel color.** Today the login, new-account and edit-profile pages show a **white** card on the dark background. **Recommended default:** make them a dark raised card (white text, orange primary button), consistent with the themed modal (decision 5) and the overall dark theme. The alternative is to keep a white card with dark text as a deliberate contrast. Either way, white and orange both stay in the palette.

## 13. Future ideas

- Light theme and a theme toggle, or following `prefers-color-scheme`.
- Real data for the News box.
- Empty states for the feed and profile with no tweets.
- Replace `window.location.reload()` after tweeting with a local list refresh. This would change the backend interaction flow, so it is out of scope now.
