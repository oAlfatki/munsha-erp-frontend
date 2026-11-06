# Security boundaries

The frontend uses the adopted cookie-based session transport, session-generation cancellation and permission catalog. Access is checked by exact module, operation and branch. The backend remains responsible for authorization, request validation, concurrency and audit integrity.

Login destinations reject external/protocol-relative destinations and unsafe encoded separators. Identity mapping strips unknown secrets. Sign-out cancels scoped requests and clears cached session/user data. Server errors are localized without exposing 5xx internals. Environment variants are ignored except `.env.example`; all Vite variables are public.

Deployment must verify HTTPS, HttpOnly/Secure/SameSite cookies, trusted origins or CSRF protection, CORS and security headers. This frontend repository does not prove those settings. Browser fixtures are regression checks, not a server authorization audit.

Known dependency advisories are checked by `npm audit --audit-level=moderate` in CI. The patched tooling minimatch override remains until upstream dependency ranges are safe. The foundation removes client PDF dependencies because user audit reports are supplied by the server. Newer releases require compatibility review; a clean audit is not a security certificate.
