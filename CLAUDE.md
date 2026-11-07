# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Frontend SPA for GrowTweet, a Twitter-like app (from Growdev's Full Stack Web Starter course). React 18 + TypeScript + Vite, styled-components, react-router-dom v6, axios. The backend is a separate project (`growtweet-back`).

## Commands

```bash
npm run dev       # Vite dev server, exposed on the network (--host)
npm run build     # tsc type-check, then vite build
npm run lint      # ESLint, fails on any warning (--max-warnings 0)
npm run preview   # serve the production build
```

There is no test suite.

## Environment

`VITE_API_BASE_URL` sets the backend URL: `.env.development` points to `http://localhost:3333`, `.env.production` to `https://growtweet-api.onrender.com`. The production API is on Render's free tier and cold-starts, which is why `App.tsx` pings `/auth/ping` on load and shows a "servers are warming up" toast after 4s, then reloads the page once the ping succeeds.

## Architecture

**API layer (`src/api/`)** — `ApiConnection` wraps a fresh axios instance per object, attaching the JWT from `localStorage['token']` as a raw `authorization` header (no `Bearer` prefix). Any 401 clears localStorage and hard-redirects to `/login`. Domain clients (`ApiAuth`, `ApiTweet`, `ApiUser`) extend it; instantiate them per call (`new ApiTweet().all()`), since the token is read in the constructor.

**Responses** are wrapped in `CommonResponse<T>` (`{ success, message, data }`), so payloads are at `response.data.data`. DTO types live in `src/api/dto/`.

**Auth state** is localStorage only, no React context: `ApiAuth.setLoggedUser(token)` decodes the JWT (`react-jwt`) and stores both `token` and the decoded `user`; components read the current user synchronously via `ApiAuth.getLoggedUser()`. Login and profile update both return a new token that goes through `setLoggedUser`. There are no route guards — unauthenticated access is handled by the API's 401.

**Routing (`src/app-router.tsx`)** — `MainTemplatePage` is the layout (desktop `NavBar` | central `<Outlet/>` | `News`, plus `NavBarMobile` at ≤600px) for feed, explore, profile and replies routes. Login, new-account and edit-profile render outside the layout.

**Styling** — styled-components defined at the bottom of each component file; theme colors are CSS custom properties in `src/app-style.css` (`--color-bg-N` / `--color-fg-N`, `--color-*-info/danger`). Responsive breakpoints use media queries at 1024px and 600px.

**Data loading** — pages fetch in `useEffect` and keep results in local state; loading skeletons use `react-content-loader` (e.g. `TweetDisplayLoading`). Forms use `react-hook-form`.
