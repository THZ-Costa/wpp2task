# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Next.js dev server with Turbopack on http://localhost:3000
- `npm run build` — production build (Turbopack)
- `npm run start` — serve the production build
- `npm run lint` — ESLint (flat config extending `next/core-web-vitals` + `next/typescript`)

There is no test runner configured.

## Stack

- Next.js 15 (App Router, RSC) + React 19 + TypeScript strict
- Tailwind CSS v4 via `@tailwindcss/postcss` (no `tailwind.config`; tokens live in `src/app/globals.css`)
- shadcn/ui — style `radix-nova`, base color `neutral`, icons `lucide-react`. Component aliases configured in `components.json` (`@/components/ui`, `@/lib/utils`, `@/hooks`)
- TanStack Query v5, react-hook-form + zod, sonner (toasts), next-themes, recharts, date-fns
- Path alias: `@/*` → `./src/*`
- UI copy is Portuguese (pt-BR); keep new strings in Portuguese to match.

## Architecture

### App Router route groups (`src/app`)

Three parallel groups, each owning its own layout:

- `(auth)` — `/login`, `/register`, `/forgot-password`. No `AppShell`.
- `(dashboard)` — main tenant app (`/dashboard`, `/demands`, `/summaries`, `/topics`, `/group-activity`, `/whatsapp/numbers`, `/whatsapp/groups`, `/jira`, `/billing`). Wraps children in `AppShell` (sidebar + topbar).
- `(master)` — master/superadmin pages (`/admin`, `/admin/companies`, `/admin/revenue`). Also wraps in `AppShell`.

Root `/` redirects to `/dashboard` (`src/app/page.tsx`).

### Providers (root layout)

`src/app/layout.tsx` wraps everything in `ThemeProvider` (next-themes) → `QueryProvider` → `<Toaster />`. The QueryClient defaults are: `staleTime: 60_000`, `refetchOnWindowFocus: false`, `retry: 1` (`src/providers/query-provider.tsx`). Match these expectations when adding queries.

### Data layer — mock-first, Laravel-bound

Most `src/services/*.ts` currently return hardcoded mock data (e.g. `demand-service.ts`, `dashboard-service.ts`). Treat them as the contract that the real API will fulfill — when wiring a backend call, replace the mock body but keep the exported function signature so consumers/hooks don't change.

The real backend integration is Laravel + Sanctum:
- `src/lib/axios.ts` exports `api` configured with `baseURL: process.env.NEXT_PUBLIC_API_URL` and `withCredentials: true`.
- `src/services/auth-service.ts` calls `/sanctum/csrf-cookie` before `/login` and `/register` — preserve that order for any new state-changing auth call.

Hooks under `src/hooks/` (`use-auth`, `use-company`, `use-permissions`) currently read from `mockCurrentUser` / `getMockCompanies`. When swapping to real data, keep the hook surface stable.

### Auth & permissions

- Roles: `master | admin | approver | analyst` (`src/types/user.ts`).
- Permission map lives in `src/lib/permissions.ts`. Use `can(role, permission)` or the `usePermissions()` hook — do **not** check roles ad hoc in components. Add new capabilities to the `Permission` union and `rolePermissions` table together.
- `(master)` routes are gated by the `view_master_admin` permission (master only).

### Layout shell

`src/components/layout/app-shell.tsx` composes `AppSidebar` (fixed, `md:` and up) + `Topbar` + a centered `<main>` with `max-w-[1440px]`. Sidebar navigation is declared statically in `app-sidebar.tsx` under three groups: `Operação`, `Integrações`, `Master` — add new pages there.

### Domain model

`wpp2task` monitors WhatsApp groups, an AI extracts actionable items ("demandas") that approvers triage and optionally push to Jira. Core entities live under `src/types/`: `demand`, `summary`, `dashboard`, `whatsapp`, `billing`, `company`, `admin`, `auth`, `user`. A `Demand` flows: `pending_approval` → `approved`/`rejected` → `jira_created` (with `jiraIssueKey`).

## Conventions

- Use the `cn()` helper from `@/lib/utils` for className composition (clsx + tailwind-merge).
- Server Components by default; only add `"use client"` when you need state, effects, or browser APIs (all current hooks and providers are client components).
- shadcn primitives in `src/components/ui/` are generated — prefer composing them over editing. Domain components live in feature folders (`components/demands`, `components/dashboard`, etc.).
