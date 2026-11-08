# Implementation Log

- **Updated:** 2026-11-08

| Step | File | Status | Rounds | Checkpoint | Notes |
|------|------|--------|--------|-----------|-------|
| S01 | [step-01.md](step-01.md) | done | 1 | a3b8ad0 | Notes for later owners: S09 "Show more" link color under color-scheme dark; S11 focus ring invisible on orange login area |
| S02 | [step-02.md](step-02.md) | done | 1 | 1d20aad | 2 needs-human checks pending (see below) |
| S03 | [step-03.md](step-03.md) | done | 1 | d723858 | Reviewer verified reduced motion via headless Chrome --force-prefers-reduced-motion |
| S09 | [step-09.md](step-09.md) | done | 1 | dc8dead | Reviewer verified link pressed state in Chrome |
| S04 | [step-04.md](step-04.md) | done | 1 | 8abf2cd | Local DB sequences advanced; test user id 12 created by agents |
| S05 | [step-05.md](step-05.md) | done | 1 | 3455812 | Note for S10: profile-header Logout icon sits 8px right of Edit icon (Logout now padded) |
| S06 | [step-06.md](step-06.md) | done | 1 | dfeaee0 | 1 needs-human check pending. Note for S07: HBox still reserves 3rem (48px) but bar is now 56px; bottom 8px clipped on long pages |
| S07 | [step-07.md](step-07.md) | done | 1 | d19da39 | Mobile HBox reservation now matches bar height (fixes S06 8px clip note); test replies 243, 244 created by user 12 |
| S08 | [step-08.md](step-08.md) | done | 1 | 41f89f4 | Reviewer verified @handle pressed state via CDP (no needs-human left); test reply "S08 reply parity" created on 244 |
| S10 | [step-10.md](step-10.md) | done | 1 | 1ca18f8 | 1 needs-human check pending. Test user 13 (s10tester54530) created; implementer accidentally logged out the user's localhost:5173 Chrome session |
| S11 | [step-11.md](step-11.md) | done | 1 | d6c8979 | Reviewer verified pressed state via CDP (no needs-human left); test user 14 (s11tester9210) created |
| S12 | [step-12.md](step-12.md) | done | 2 | PENDING | Round 1 fail: whitespace churn only. Test users 15, 16, s12down (via a pre-existing server on 5233, backend unverified), s12r2dup, s12rev34725(b), s12rr43392(b) created |
| S13 | [step-13.md](step-13.md) | in-progress | 0 | - | - |

Status: pending | in-progress | done | skipped | blocked

## Deviations
Deviations from a step file's implementation suggestions, as reported by its implementer and accepted by its reviewer.

- (S01) none; reviewer verified the Inter woff2 request via CDP, so no needs-human check remained.
- (S02) Temporary scratch render hosted in ExplorePage (via a temp scratch-ui.tsx) instead of FeedPage, to avoid 401 redirects; restored byte-identical. Dev server started with `npx vite --port 5199`.
- (S03) Code: none. Test setup only: dev server on a custom port behind a local delay proxy for /auth/ping; temporary test buttons in explore-page.tsx restored byte-identical; 375px tested in an iframe.
- (S09) Inline `/* */` comments from the step's code skeleton left out; CSS identical.
- (S04) none (private helper naming only).
- (S05) `UserTag` also gets `line-height: var(--line-height-tight)`, like `UserName`.
- (S06) Comment on `BAR_ITEM_SIZE` reworded so the `mobile-nav-height` static check has one match; no code difference.
- (S07) tweetId change resets loadStatus/tweets during render (shownTweetId "adjust state on prop change" pattern) instead of inside useEffect, so stale rows never commit; skeleton comment says "former browser alert" to keep the alert( grep clean.
- (S08) none.
- (S10) none.
- (S11) Side-by-side card is `width: max(60%, 600px)` (not 60%) so nothing clips at 769-1040px; `min-width: 0` on FormPanel as a safety net.
- (S12) none.

## Checks confirmed by the user

## Checks pending human confirmation
- (S02) Pressed state: holding the mouse on a primary Button darkens and slightly shrinks it (CSS rules verified present). — pass
- (S02) DevTools Rendering > prefers-reduced-motion: reduce, hovering a Button changes color instantly (global rule verified loaded). — pass
- (S06) iPhone safe area: on an iPhone with a home indicator, open the app at mobile width; the bottom bar grows by the safe-area inset and its items stay centered in the top 56px, above the home indicator (note: without viewport-fit=cover iOS reports an inset of 0) — pass
- (S10) Edit pressed state: on your own profile, hold the mouse down on the Edit button; it darkens (surface-pressed) and shrinks slightly (scale 0.97). Rules verified present on the class. — pass
