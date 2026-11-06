# Backend integration readiness

## Basis of decisions

Review the whole workflow: routes and visible operations, feature endpoint files, request/response DTOs, mappers, validation, permission gates, Query scopes, and browser/HTTP contracts. The supplied OpenAPI is not authoritative when it conflicts with the confirmed system. Do not silently invent a replacement API either: record a joint frontend/backend decision and update the affected contract tests.

## Required shared decisions

1. Confirm sign-in/session/refresh/logout payloads, cookie/CORS/CSRF behavior, permission module/action codes, and branch scope. No fixed frontend role model is used.
2. Confirm detail and mutation concurrency fields. User editing requires a trustworthy `rowVersion`; do not derive it from a timestamp or reuse a token from a different read.
3. Confirm write endpoints and permission bindings for each ERP command. The current unbound command policy denies those writes. Opening them requires verified mappings, not a blanket allow.
4. Define financial and stock mutation transactions, idempotency/request IDs, rounding, period/book scope, document numbering, and conflict responses at the server boundary. UI calculations are previews, not the accounting authority.
5. Confirm pagination, filtering/search, error/envelope conventions, report/backup/download formats, and file-size limits. Empty successful responses must not be substituted for failed requests.

## Working on one feature

Use `review/INTEGRATION_MATRIX.md` and the machine-readable source inventory to identify its operations and current schemas. Implement the server boundary in the owning `api`, then update DTOs/mappers, validation, queries and integration tests. Feature-owned endpoint maps reduce changes to global files. Central routes change only for an approved navigation change.

Keep branch/user/book identity in the existing Query Keys. Clearing or changing account scope must cancel/remove stale account data. Contract changes need a migration decision; a refactor must preserve current keys and wire fields.

## Current readiness

Auth and Users have adopted contracts and fixture-based coverage, including error handling, denied mutations, sessions, branch checks and safe-edit blocking. They still need live-server verification and the missing detail concurrency field.

The rest of ERP contains substantial UI, read projections, validation and calculations, but write-contract/permission adoption is incomplete. It is not accurate to label the entire ERP ready for backend connection or production simply because the frontend build and fixtures pass. Neither a former runtime engine nor legacy test identities should be reintroduced to fill that gap.

Superseded generated documents and old contract snapshots were removed from the active tree. Their history remains in Git. The current documentation describes the current frontend; the historical financial oracle is explicitly isolated under tests.
