# Munsha ERP Frontend

An Arabic, right-to-left ERP frontend built with React, TypeScript, Vite, Axios, TanStack Query, React Hook Form, and Zod. Production uses a real HTTP API. There is no demo login or browser-side ERP engine.

## Development

Use Node.js 22.13 or newer. Install the versions pinned by the lockfile:

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Set `VITE_API_BASE_URL` to the real API root, including `/api/v1`. Every `VITE_` variable is public in the browser bundle; never put credentials or secrets there. Cookie-based cross-origin sessions require appropriate API CORS and cookie settings.

## Integration status

This repository is a frontend, not a complete deployed ERP. Auth and Users implement the adopted sign-in, session, permission-catalog, and user-management contracts. Their browser tests use HTTP fixtures, not a live backend.

Other ERP features still contain command endpoints whose permission bindings have not been confirmed. Unknown command permissions fail closed. Do not grant invented roles or enable writes merely to make a screen appear functional. Safe user editing also requires the backend to supply a usable `rowVersion` in its detail response.

See [integration readiness](docs/INTEGRATION.md) for the decisions required before connecting each feature. The supplied OpenAPI document is design evidence; it does not override confirmed behavior or prove server implementation.

## Structure

- `src/app`: application composition, providers, central routes, and dashboard layout.
- `src/core`: transport, session/access infrastructure, cache coordination, reporting serialization, and global foundations.
- `src/shared`: reusable presentation components, navigation, forms, hooks, styles, and their props.
- `src/features`: feature-owned UI, state, queries, API endpoints, mappers, validations, and types. Large features use functional subdomains.
- `tests`: unit, contract, integration, architecture, and browser suites, plus fixtures and an isolated historical financial oracle.
- `vendor`: an actively imported, MIT-licensed CSS snapshot; see [vendor notes](vendor/README.md).

The dependency direction and ownership rules are documented in [architecture](docs/ARCHITECTURE.md). Keep `core` and `shared` separate: transport and infrastructure have different responsibilities from reusable UI.

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

`npm run format` applies Prettier plus the checked readability spacing policy: a blank line after imports, at the beginning of named function bodies, and between named function declarations. Inline callbacks remain compact. Use this command rather than running Prettier alone.

For browser tests:

```sh
npx playwright install chromium
npm run build
npm run preview -- --host 127.0.0.1 --port 5173
# In another terminal:
npm run test:e2e
```

`PLAYWRIGHT_BASE_URL` selects another preview URL; `PLAYWRIGHT_CHROMIUM_EXECUTABLE` selects an existing Chromium installation. Browser tests cover login, permissions, user workflows, Arabic/RTL rendering, all 108 navigation destinations, document preview/export, and layout preservation.

## Working on one feature

Start with its `pages`, follow its hooks and queries, then inspect its `api/endpoints.ts`, request/response types, and validations. Import another feature only through its `public/index.ts`. Keep backend paths and wire formats stable unless an API change is explicitly approved.

Separate product changes from test maintenance: first define the intended behavior and why it changes, then update contract expectations deliberately. A refactor must preserve existing behavioral fixtures. See [test guidance](tests/README.md), [security boundaries](docs/SECURITY.md), and the [project review](docs/review/README.md).
