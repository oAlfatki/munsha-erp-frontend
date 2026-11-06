# Munsha ERP — Auth, Users and Dashboard Foundation

This branch contains the application shell and exactly three features: **Auth**, **Users** and **Dashboard**. The complete ERP is preserved on `main`; this branch is a deliberately smaller starting point for feature-by-feature backend integration.

## Run locally

Use Node.js 22.13 or newer:

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Configure `VITE_API_BASE_URL` with the real API root, including `/api/v1`. Vite variables are public browser configuration and must never contain secrets. The application uses real HTTP transport and cookie-based sessions. Mock identities and HTTP fixtures exist only under `tests`.

## Included scope

- Auth: sign-in, session restoration/refresh, sign-out, password change and personal sessions.
- Users: server-paginated listing/search, create/detail/edit guards, permission masks, status/password/session operations and audit views/reports according to the adopted server contracts.
- Dashboard: scoped, read-only summary from the existing `/dashboard` endpoint; quick actions link only to screens included in this branch.
- Infrastructure: central React Router, Axios/session coordination, TanStack Query, permissions, theme, RTL/Arabic fonts, forms, shared controls and the application shell.

Users and Auth do not load company, fiscal-book, stock or backup collections. Dashboard omits the optional `bookId` and uses the server's default active-book scope; no fiscal-book management is shipped here. Stock alerts remain a read-only part of the Dashboard response, without Inventory links or implementation.

Safe user editing remains blocked if the detail response supplies no usable `rowVersion`. Server authorization, cookie/CSRF settings and live backend behavior still require integration verification. No roles or default administrative permissions are manufactured.

## Code ownership

- `app`: application composition, providers, central router, menus and dashboard shell.
- `core`: transport, authentication/access infrastructure, theme and global foundations.
- `shared`: reusable visual layouts, controls, navigation, presentation helpers, styles and their props.
- `features/auth`, `features/users`, `features/dashboard`: feature-owned pages, queries, APIs, schemas and behavior.

`GuestLayout` is the shared visual guest-page frame. Auth's `AuthLayout` composes its branding and login content inside that frame. Reusable UI belongs in `shared`; putting it in `core` would reverse the infrastructure/UI dependency direction. Shared `Panel` and `Pagination` reuse confirmed presentation and page-navigation behavior.

## Checks

```sh
npm run typecheck
npm run lint
npm run check:architecture
npm run check:reachability
npm run check:naming
npm run check:deprecated
npm run format:check
npm test
npm run build
npm run audit:security
```

Use `npm run format` to apply Prettier and the checked blank-line policy. The `test:unit`, `test:contracts`, `test:integration` and `test:architecture` commands run distinct test responsibilities.

For browser checks:

```sh
npx playwright install chromium
npm run build
npm run preview -- --host 127.0.0.1 --port 5173
# In another terminal:
npm run test:e2e
```

`PLAYWRIGHT_BASE_URL` overrides the preview URL and `PLAYWRIGHT_CHROMIUM_EXECUTABLE` selects an installed Chromium. Browser HTTP fixtures cover only the three shipped features; there is no historical ERP engine in this branch.

Read the [architecture](docs/ARCHITECTURE.md), [integration decisions](docs/INTEGRATION.md), [security boundaries](docs/SECURITY.md), [next steps](docs/ROADMAP.md), [branch scope](docs/foundation/README.md), [test guidance](tests/README.md) and [vendor notes](vendor/README.md).
