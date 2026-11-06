# Next steps and acceptance criteria

## 1. Establish the foundation

Keep the complete ERP on `main` and develop this three-feature branch independently. Verify the central shell, guest layout, shared controls, routes, Arabic/RTL, theme and dependency checks. No link may lead to an excluded feature. Auth/Users must mount without fiscal-book, company, backup or inventory reads. This branch is not automatically merged back into main because its reduced scope is deliberate.

## 2. Complete Auth integration

Agree on the actual server contract, then test sign-in, `/auth/me`, permission-catalog failures, refresh/expiry, sign-out, password change and session revocation against the live backend. Verify cookies/CORS/CSRF and session/cache isolation. Acceptance: the protected shell restores a real authorized session, rejects unauthorized access and cleans up on expiry/logout.

## 3. Complete Users integration

Resolve the missing detail RowVersion before enabling safe updates. Verify listing/search/pagination, creation, conflict responses, status/password operations, branch restrictions, grantable masks, permission concurrency, session management and audit exports. Acceptance: allowed operations work and unauthorized/conflicting operations are rejected by both UI and server.

## 4. Complete Dashboard integration

Verify `/dashboard` branch scoping and server-default active-book behavior, then its loading/error/empty/stock-alert responses. Quick actions must reflect the user's real permissions and this branch's available routes. Add server-defined metrics only after their DTOs and meanings are agreed.

## 5. Expand one feature at a time

Choose the next business feature explicitly after the foundation passes real integration checks. Bring its owned API/DTOs, schemas, queries, UI and tests across from main in a focused change. Do not import a full application context or every financial/stock collection merely to mount one screen. Reuse shared UI only when behavior agrees; keep financial and stock ownership separate.

## Optional maintenance

Profile entry/lazy chunks and accessibility; add component coverage where complex interactions justify it. Review supported newer package versions incrementally, and retire the tooling override when upstream updates permit. Split long modules around stable responsibilities rather than line-count targets. Keep product decisions separate from test-expectation maintenance.
