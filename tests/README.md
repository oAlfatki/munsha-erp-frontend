# Test responsibilities

- `unit`: isolated tooling/readability behavior.
- `contracts`: adopted Auth/Users HTTP payloads, identity mapping, permission boundaries, Dashboard request scope and retained validation outcomes.
- `integration`: session lifecycle, request cancellation, cache isolation and logout coordination.
- `architecture`: dependency direction, public entries, types, exactly three allowed feature folders, route/menu coverage and no orphan source.
- `e2e`: Chromium against production output with explicit Auth/Users/Dashboard HTTP fixtures, including user operations, pagination, theme, RTL, mobile login and unavailable-feature routes.
- `fixtures`: the unchanged Auth/Users subset of the pre-review validation corpus. Removed-feature expectations are not rebaselined into new behavior.

The complete ERP's financial tests and historical oracle remain on main. They are omitted here with their features rather than installed as hidden dependencies. The test backend has no accounting engine or broad ERP seed. An unknown endpoint fails instead of silently returning success.

A product scope change legitimately changes the route/test matrix. A refactor must still preserve the retained behavior; do not regenerate expected HTTP/financial/validation outputs to hide a failure. Live backend and deployment checks remain separate from intercepted browser tests.
