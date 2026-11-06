# Project quality review — 6 November 2026

## Scope and evidence

The previous architecture PR (#2) was merged into `update/arabic-erp-v15-2026-11-05` at `5ecc3cb`. This follow-up starts from that actual development baseline, not the older `main` branch. It preserves the existing application rather than replacing it with a new ERP.

Every project file is indexed in `project-files.json`. Every source file has import, function-span, schema, HTTP-operation, dependency-deprecation and selected security-pattern metadata in `source-inventory.json`. Automated coverage of all files is distinct from manual review: critical transport, session/access, validation, reporting, navigation, forms, feature boundaries and large component paths received focused review. This is not a claim that every line has received an independent manual security audit.

Read the feature-by-feature operation decisions in [INTEGRATION_MATRIX.md](INTEGRATION_MATRIX.md), the boundary rules in [../ARCHITECTURE.md](../ARCHITECTURE.md), and the deployment limitations in [../SECURITY.md](../SECURITY.md).

## Assessment and changes

| Area | Assessment and completed work | Remaining consideration |
| --- | --- | --- |
| Architecture and folders | Feature ownership fits this ERP's size. `app` composes, `core` supplies infrastructure, and `shared` supplies reusable presentation. Enforced dependency direction now forbids `core` importing `shared`. | Keep backend implementation within feature API/DTO/mapper/query boundaries. A folder tree alone does not prove integration readiness. |
| Separation of concerns | Settings panels, dashboard layout, backup workflow and sales/purchase editor/return controllers have explicit responsibilities. Props moved to their actual owners. | Some cohesive controllers, schema catalogs and navigation definitions remain large; split only around a concrete responsibility. |
| Clean code and readability | Removed unused private implementations, unnecessary mapper assertions and overwritten initializations; clarified state bindings and helper names. Checked formatting includes blank lines after imports, inside named functions and between named declarations. | Avoid renaming valid wire fields or rewriting financial rules for style preferences. Inline callbacks intentionally remain compact. |
| SOLID | Focused components/hooks support single responsibility. Explicit props and public feature surfaces reduce coupling. Infrastructure dependency rules are checked. | SOLID is a design guide, not a score. React hooks need no artificial class hierarchy or injection framework. |
| Reuse | Common invoice/return actions are reused without merging Sales and Purchases. Repeated validation error wording and cache-read behavior have tested shared helpers. | Extract further behavior only after confirming identical semantics; visual similarity is insufficient. |
| Security | Unknown/prototype command names fail closed. Report frames prohibit scripts. Escaping/filename boundaries have regression cases; local secret files are ignored. Dependency audit fell from 13 findings to zero known findings. | Real server authorization, cookie/CSRF controls, concurrency, backup access and posting transactions still require integration/deployment verification. |
| Styles and layout | Shell, shared controls, authentication, feature panels and report CSS have clear homes; an expanded cascade fingerprint verifies unchanged selector/declaration order and values. Auth now has its own layout. | Further utility scoping and CSS deduplication are optional and require visual checks. The existing cascade is deliberately preserved. |
| Routes and endpoints | Central React Router remains. Feature endpoint maps replace the global endpoint catalog, retaining exact URLs and Query Keys. | Unconfirmed write routes and permission codes must come from reviewed server contracts. |
| Types and validation | DTOs, form values, props and infrastructure types have explicit owners. Zod 4 removes deprecated APIs while retaining captured JSON outcomes and messages. | Do not invent create/edit/delete/search constraints. Separate schemas where operation rules differ and share them where they truly agree. |
| Tests | Unit, contracts, integration, architecture and browser tests have distinct purposes. Active report behavior replaces expectations for unused report implementations. | Contract fixtures and mocked browser tests do not prove a live backend works. Update expectations only for reviewed product/contract changes. |
| Documentation and vendor | README is English. Historical duplicate inventories/reports and obsolete OpenAPI were retired; current operational docs replace them. Active vendored CSS and its MIT license remain explained. | The retained supplied OpenAPI is supporting evidence, not the sole product specification. Git history preserves retired documents. |

## Priority decisions

### Required before claiming production integration readiness

1. Confirm each feature's write endpoints, permission codes and payloads with the actual server. Unknown permission mappings remain blocked rather than guessed.
2. Supply and verify user-detail RowVersion before enabling concurrency-sensitive user edits.
3. Test real authentication, session expiry/refresh, branch isolation, CSRF/origin controls, server validation, authorization and atomic financial/stock posting against the deployment.
4. Resolve the supplied OpenAPI's legacy contradictions through agreed product and backend contracts. Do not restore removed roles or runtime demo data to fit old documentation.

### Recommended follow-up

- Add real-server contract tests feature by feature using the documented operation matrix.
- Track the tooling-only minimatch override and remove it when upstream packages ship patched dependencies.
- Review the newer supported dependency releases recorded in `dependencies.json` in small tested updates. Eighteen newer direct-package versions remain available; none of the 32 reviewed installed direct versions is marked deprecated. TypeScript 7 and Vitest 5 are intentional separate upgrade projects.
- Profile the production entry bundle and loading behavior before choosing additional lazy boundaries. The reviewed production entry is about 402 kB before gzip; this build emitted no chunk-size warning. These build sizes are not a runtime performance measurement.
- Make a product decision about Tax/CashFlow report query filtering: the baseline returned before the old filtering tail. The cleanup preserves that actual behavior; adding filtering would be a functional change.

### Optional improvements

- Further shared control/stylesheet extraction when independently verified repeated behavior justifies it.
- More component-level browser and accessibility coverage for panels and complex editor states.
- Split remaining long modules when a stable domain seam appears; do not impose an arbitrary file-size target.

## Preservation and verification

The financial reference source stays byte-frozen and test-only. DTO and HTTP tests preserve surviving transport expectations. There are 812 active schema cases: JSON cases retain parsed values, acceptance, message paths and message ordering. Non-JSON NaN/Infinity boundaries retain acceptance/rejection and meaningful error locations; Zod 4 can aggregate their errors differently. This limitation is explicit rather than hidden by regenerating expectations.

All 21 live three-argument report builders have pre-review snapshots across 126 fixed-clock branch/filter scenarios. The style cascade fingerprint is unchanged. Retired files and unused endpoint names have machine-readable manifests; no permission, business validation or Query Key was invented to make a test pass.

### Local results

| Check | Result |
| --- | --- |
| TypeScript, ESLint, naming and formatting | Passed |
| Architecture | 1,384 TypeScript source files; zero file cycles, feature cycles or boundary violations |
| Reachability | Zero orphan source files or unclassified dynamic imports |
| Installed deprecated API calls | Zero detected calls in the source scan |
| Non-browser suites | 30 files; 1,374 tests passed |
| Production build | Passed; entry JavaScript approximately 402 kB / 120 kB gzip |
| Chromium production journeys | All 18 passed, including all 108 navigation destinations |
| Installed dependency tree | `npm ls --all` passed |
| Known dependency vulnerabilities | `npm audit`: zero; no lockfile package has a deprecation marker |
| Diff and documentation links | `git diff --check` passed; no broken local Markdown links |

The inventory covers 1,422 source files and 3,739 functions/callbacks. Twelve size-related review notices remain; they are review prompts, not hidden check failures. Run the documented checks in the root README to reproduce the results. GitHub verification is recorded separately in the associated pull request. Audit results are a dated snapshot of known advisories, not proof that the system has no vulnerabilities.
