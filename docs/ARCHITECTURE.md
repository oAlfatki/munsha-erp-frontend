# Architecture and ownership

This is a feature-based React frontend evolving an existing ERP. Folder names do not create a new backend or prove product readiness. The current source, confirmed HTTP behavior, and approved workflow decisions are the basis of implementation; historical tests and the supplied OpenAPI file are evidence, not substitutes for those decisions.

## Dependency direction

- `app` composes providers, the central React Router, feature pages, dashboard shell, and global UI. Application hooks coordinate application-wide interactions; they do not own financial rules.
- `core` owns transport, session/access infrastructure, scoped cache coordination, generic serialization/PDF generation, global foundations, and infrastructure types. It must not import feature or application code.
- `shared` owns reusable UI, forms, presentation hooks, report actions, navigation, styles, and their props. It can depend on `core`, but not on `features` or `app`.
- `features` own product behavior. A feature imports another feature only through its `public/index.ts`; internal imports are direct to avoid barrel cycles.

Do not merge `shared` into `core`: a button, form field, or report-action component has a different reason to change from an Axios interceptor or session coordinator. Conversely, do not move feature-specific workflows into `shared` merely because they look similar.

## Feature layers

Use populated layers only: `pages`, `layouts`, `components`, `hooks`, `queries`, `api`, `services`, `mappers`, `validations`, and `types` as needed. Props live in the owning feature's `types/props`; reusable props and form descriptors live under `shared/types`. Wire DTOs keep backend primitive types; mappers normalize UI identities and scopes deliberately rather than forcing every identifier into one global type.

`api/endpoints.ts` belongs to its feature. Core provides only safe path-segment encoding and the existing generic command-path builder. No endpoint URL or Query Key was redesigned during this review. Backend work on one feature should primarily touch that feature's API, DTOs, mapper, validation, queries, and integration contracts.

Accounting owns account, journal, voucher, currency, asset, fiscal-period, contact, overview, and report workflows. Ledger owns reusable financial reads/projections and calculation contracts. Inventory owns product, warehouse, unit, group, balance, stock-document, closing-stock, and report UI. Stock owns shared stock contracts/reads/validation. Sales and Purchases retain separate controllers/editors; Trade owns confirmed invoice calculations and shared presentation/actions. These boundaries must remain acyclic, including type-only imports.

## Responsibilities inside a screen

A page composes a workflow. A controller hook owns its state, events, mutation coordination, and derived values. Components receive the data/callbacks they actually use. Pure service/model functions own reusable calculations; mappers own wire translation. A query owns fetching and the existing identity/branch/book cache scope.

System Settings now has independently typed panels. The Dashboard layout, invoice editors/returns, and backup screen have explicit state/controller boundaries. Shared invoice actions reuse presentation without introducing a generic invoice editor or merging business ownership.

Do not split a file solely because of a line-count threshold. A schema catalog or menu definition can be cohesive while long. Split when it mixes reasons to change or repeats confirmed behavior. Do not create empty folders, forwarding-only implementation files, or speculative abstractions.

## Validation and cache behavior

Feature schemas implement confirmed operation rules. Separate create/update schemas when their responsibilities differ; share fields and validation when the operation contract is actually the same. Read-only queries and identifier guards do not need artificial write schemas. The operation matrix in `review/INTEGRATION_MATRIX.md` identifies incomplete backend contracts rather than inventing constraints.

Zod 4 migration preserves JSON validation outcomes/messages through captured behavioral fixtures. Defaults use `prefault` to preserve the previous parse-through-default semantics. Array-level journal errors retain their previous visible order. Non-JSON number rejection is tested separately; type/range error aggregation is a validation-runtime detail documented in `tests/README.md`.

`readCachedQuery` replaces deprecated imperative Query calls while retaining cache-hit, invalidation, scope isolation, and fetch-on-miss behavior. It intentionally does not rewrite all queries to permanent `staleTime: 'static'`, which would alter registered query options.

## Styles and vendor source

One bootstrap, `app/styles.css`, imports foundational, application-shell, shared, and feature-owned CSS in explicit order. Moving rules must preserve order and values: `tests/contracts/style-cascade.test.ts` compares the fully expanded local cascade against the pre-review fingerprint. External library imports stay pinned through the lockfile. Typography overrides keep their original cascade position.

The vendored shadcn CSS is active source, not an unused package. Keep its MIT license and verify cascade/browser behavior before replacing it.

## Readability

Use `npm run format`, followed by `npm run format:check` and ESLint. The formatter combines Prettier layout with checked blank lines after imports, inside named function bodies, and around named function declarations. Inline callbacks remain compact. Semantic lint directives are preserved. The archived financial oracle is intentionally byte-frozen and is the only historical source excluded from reformatting.

Global providers, feature runtime code, and historical test fixtures have distinct responsibilities. Custom role entities now follow the approved hierarchical permission model and the new Roles contract. Never restore retired hardcoded role enums, runtime demo data, or a workspace-wide ERP engine merely to satisfy an old fixture.

## Retired surface and test authority

Static reachability includes imports, literal lazy route imports, type references and public exports. Ninety-two private files with no production path were retired, including parallel report implementations, unused API adapters/DTOs and unbound filter schemas. `check:reachability` prevents orphan implementation files from returning. Public exports can still represent an intentional public surface; reachability is not a claim that every export is used.

Tests no longer call the unused generic party adapter to simulate coverage: they exercise the real customer service. Report contracts now cover 126 branch/filter scenarios across all 21 live three-argument report builders, captured from the pre-review source. Unreachable report implementations and their expectations were removed together; surviving DTO field expectations were retained unchanged.

## Role-based user authorization

Users owns role records, role queries and forms, direct/role assignment, overrides and the hierarchical catalog adapter. Auth infrastructure consumes only server-resolved effective masks. Stable operation-code checks remain compatible; feature-specific checks can require the exact catalog feature. The new [contract proposal](access/ROLES_CONTRACT.md) distinguishes supported-server behavior from legacy direct-only compatibility and pending backend implementation.
