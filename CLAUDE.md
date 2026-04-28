# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development server (exposed on all network interfaces)
npm run dev

# Production build
npm run build

# Lint
npm run lint
```

No test script is configured.

## Architecture

React 19 + Vite 6 + Tailwind CSS v4 SPA. Routing via React Router v7.

**Entry point:** `src/main.jsx` → `src/App.jsx`

`App.jsx` defines all routes and wraps the app in `UserProvider`. The root `/` route redirects to `/dashboard` if a JWT token exists in `localStorage`, otherwise to `/login`.

**Routes:**

| Path | Page |
|---|---|
| `/login` | `pages/Auth/Login.jsx` |
| `/signUp` | `pages/Auth/SignUp.jsx` |
| `/dashboard` | `pages/Dashboard/Home.jsx` |
| `/income` | `pages/Dashboard/Income.jsx` |
| `/expense` | `pages/Dashboard/Expense.jsx` |

**Auth guard pattern:** Every protected page calls `useUserAuth()` at the top. This hook (`src/hooks/useUserAuth.jsx`) fetches `/api/v1/auth/getUser` on mount using the stored token; on 401 or failure it calls `clearUser()` and redirects to `/login`. `UserContext` (`src/context/UserContext.jsx`) holds the user object and `isLoading` state globally — `DashboardLayout` renders a spinner while `isLoading` is true and blocks render if `user` is null.

**API layer:**
- `src/utils/apiPaths.js` — all endpoint strings and URL builder functions in one place; `BASE_URL` points to the deployed Render backend
- `src/utils/axiosInstance.js` — pre-configured axios instance; request interceptor attaches `Authorization: Bearer <token>` from `localStorage`; response interceptor redirects to `/login` on 401

**Component organization:**
- `components/layouts/` — `DashboardLayout` (wraps Navbar + SideMenu + children), `AuthLayout`
- `components/Dashboard/` — widgets consumed by `Home.jsx` (RecentTransactions, FinanceOverview, Last30DaysExpenses, RecentIncome, etc.)
- `components/Income/` and `components/Expense/` — form, list, and overview components used by the Income and Expense pages
- `components/Charts/` — reusable Recharts wrappers (bar chart, pie chart, custom legend/tooltip)
- `components/Cards/` — InfoCard (summary stat cards), TransactionInfoCard, CharAvatar

**Side menu** is data-driven from `src/utils/data.js` (`SIDE_MENU_DATA`). The `logout` path is handled specially in `SideMenu` — it clears `localStorage` and navigates to `/login`.

**Number formatting** in `src/utils/helper.js` uses the Indian numbering system (groups of 2 after the first 3 digits). Use `addThousandsSeparator()` for all currency display.

**Charts:** Recharts components are wrapped in `components/Charts/`. Income data is sorted by date before charting (`prepareIncomeBarChartData` in `helper.js`). Expense data is passed by category (`prepareExpenseBarChartData`).

**Styling:** Tailwind CSS v4 is integrated as a Vite plugin (`@tailwindcss/vite`) — no `tailwind.config.js` needed. The `SideMenu` is hidden below 1080px (`max-[1080px]:hidden`).
