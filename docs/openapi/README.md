# API design evidence

`munsha-v1.5.design.openapi.json` is the supplied design document, preserved for traceability. It contains both newer Auth/Users definitions and inconsistent legacy definitions. It is not a generated representation of the running backend and is not the sole specification for the product.

The current routes, UI workflows, feature-owned endpoint files, DTOs, permission checks, and integration tests must be reviewed together. Record unresolved differences in `docs/INTEGRATION.md`. Do not derive roles, grant missing permissions, invent concurrency tokens, or change financial behavior to satisfy this file.

Superseded OpenAPI snapshots and generated architecture logs remain available in Git history rather than in the active documentation tree.
