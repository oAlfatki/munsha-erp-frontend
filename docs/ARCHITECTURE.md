# Foundation architecture

The complete ERP was merged into `main` at `931af44`. `foundation/auth-users-dashboard` starts there and intentionally ships only the three requested features, plus the infrastructure and UI they actually consume.

## Dependencies

`app` composes providers, the router, menus and the authenticated shell. `core` owns transport, cookie-session coordination, identity/access infrastructure, theme and global foundations. `shared` contains reusable presentation and depends on `core` where necessary. Features own their HTTP contracts, schemas, controllers, pages and domain behavior. A feature consumes another feature through `public/index.ts` only. Core cannot import Shared, features or App; Shared cannot import features or App. Cycles are rejected.

Navigation definitions are owned by App. Shared navigation receives entries as props; its recursive menu helper contains no application menu singleton. The shell uses identity and permissions and does not depend on the old CompanyProvider, ApplicationProvider, accounting books, backup policy or stock search.

The Dashboard owns its existing read-only projection and retains branch and user cache scope. Its optional book filter is omitted, leaving the server responsible for the default active book. This branch offers no fiscal-period selector or inventory workflow.

## Layouts and reuse

A generic visual layout belongs in `shared/ui/layout`, while an application composition layout belongs in `app/layouts`. `core` is not a home for presentation components. Auth retains its feature-specific `AuthLayout` content and uses shared `GuestLayout` for the reusable two-column frame.

`Panel` shares section headings/body slots without owning data fetching. `Pagination` shares previous/next controls and page transitions in User Directory and Audit Report; those features retain filters, page sizes, permission checks and query ownership. Existing Button, Input, Field, Select, Modal and theme controls remain shared. Do not move a workflow into Shared merely because its markup resembles another screen.

## Behavior and tests

Auth and Users keep adopted endpoint paths, payloads, validation and permission semantics. Editing without RowVersion is still blocked. Tests for omitted ERP features are removed with those features; retained Auth/Users contracts and schema golden outcomes are preserved. New tests prove the narrower route surface, lack of unrelated ERP reads and shared-pagination behavior. The full ERP and its financial oracle remain in `main` history, not as dependencies of this branch.

CSS keeps its established import ordering for retained controls and layouts. Selectors specifically owned by omitted document/financial workflows are retired with a manifest. Further visual changes need browser validation.
