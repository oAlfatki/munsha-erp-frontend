# Auth / Users / Dashboard branch scope

Base: `main` merge commit `931af44` (PR #3). Branch: `foundation/auth-users-dashboard`.

The complete system remains in main. This branch intentionally removes other feature implementations, routes, obsolete test oracles, broad integration snapshots and client PDF generation. Users/Auth contracts remain; Dashboard keeps the existing read projection and links only to included screens. The scoped application no longer loads CompanyProvider, fiscal books, backups or inventory search merely to mount the authenticated shell.

Shared reuse includes the guest-page frame, Panel, Pagination and the existing primitive/form/dialog/navigation controls. Feature-specific content and validation stay with their owners. UI layouts are in Shared or App according to responsibility, keeping infrastructure Core independent of UI.

`retired-source.json` records additional source files made unreachable by this scope reduction. The excluded feature directories are preserved in main. `retired-style-selectors.json` records document/financial CSS selectors removed from retained general styles. Generated source/project inventories are a file/function index, not an independent manual security audit of every line.

Verification results and the branch commit are recorded in the pull request. See the [roadmap](../ROADMAP.md) for the order of live backend integration and the acceptance criteria.

## Local verification

- TypeScript, ESLint, naming, formatting, deprecation and dependency checks passed.
- Architecture: 146 TypeScript source files, zero cycles and zero boundary violations.
- Reachability: zero orphan source files or unclassified dynamic imports.
- Twelve non-browser suites: 97 tests passed, including the retained 27 validation baseline cases.
- Chromium: all 14 journeys passed against production output.
- Production build passed; entry JavaScript approximately 387 kB / 123 kB gzip.
- `npm ls --all` passed and `npm audit` reported zero known vulnerabilities.

These totals describe the scoped branch. The full ERP's test count remains associated with main; removing a feature deliberately removes its tests here. No retained Auth/Users expected results were regenerated to accept a failing implementation.
