# Test responsibilities

- `unit`: isolated calculations, escaping, formatting tools, and other small observable behaviors.
- `contracts`: existing HTTP/wire fields, validation messages and parsed values, financial policies/reports, and the ordered CSS cascade. These protect externally meaningful behavior during refactoring.
- `integration`: React providers, session transitions, scoped Query caches, resource loading, and server-rendered screen composition.
- `architecture`: dependency direction, feature exports, routes, ownership, and prohibited runtime dependencies.
- `e2e`: real Chromium journeys against production output, with HTTP interception at the boundary.
- `fixtures`: explicit expected results and bounded inputs, not production seed data.
- `reference`: a byte-checked historical financial oracle. It is never imported by production, is not the current auth/permission model, and must not determine new product requirements.
- `support`: test HTTP fixtures and controlled adapters.

`npm test` runs all non-browser suites. The `test:unit`, `test:contracts`, `test:integration`, and `test:architecture` scripts select one responsibility.

## Product changes versus test changes

A refactor changes implementation and imports while keeping observable outcomes intact. Do not regenerate expected financial, HTTP, or validation results merely because an implementation fails them.

An approved product/API change starts with a written behavior decision. Update only the affected expectations and explain the before/after behavior. An obsolete test is corrected against the current confirmed contract, not retained as an authority over the product.

The validation migration corpus was captured from commit `5ecc3cb` with Zod 3.25.76 in an isolated temporary tool installation. For JSON-serializable cases it compares accepted/rejected inputs, parsed values, Arabic messages, and issue paths/order exactly. Non-finite JavaScript numbers must retain rejection at the affected field or its containing union with localized messages; their numeric type/range error classification and aggregation may differ because Zod 4 rejects these non-JSON values earlier. These are explicit boundary tests, not relaxed comparisons for valid inputs. Redundant cases with the same input category and result were removed. No vulnerable legacy Zod dependency is installed in this repository.

The legacy reference engine was not rewritten or given new auth roles. Its three historical one-argument `z.record` calls require an explicit test-only ABI adapter when exercised with Zod 4; see `support/reference-compatibility.mjs`. Assertions and fixture data are not transformed.

A green fixture-based suite does not prove live backend integration, server authorization, CSRF protection, atomic posting, or database concurrency behavior.

## Current surface versus historical scaffolding

Production reachability is checked from the application entry, including type references, feature exports, and lazy route imports. Inactive private adapters and parallel report builders do not become product behavior merely because an old test imports them. Their retirement is recorded in `docs/review/retired-surface.json`.

The customer transport test now invokes the actual customer service. Active report snapshots were captured from pre-review commit `5ecc3cb` for all 21 live three-argument report builders across six branch/filter scopes (126 scenarios), with a fixed clock. Old inactive-report cases were removed; live outcomes and surviving DTO field expectations were not rebaselined against the new implementation.
