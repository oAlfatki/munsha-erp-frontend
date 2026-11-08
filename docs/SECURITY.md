# Security boundaries and review findings

## Frontend controls

- Session data uses the existing cookie-based HTTP boundary. Credentials/tokens are not written to localStorage; stored theme/device preferences are not an authentication authority.
- Axios coordinates session generations and refresh/cancellation. Unknown command permissions fail closed, including prototype property names such as `constructor` and `__proto__`. Permission catalogs and branch checks do not replace server authorization.
- Login return destinations reject external/protocol-relative URLs, encoded separators, backslashes, control characters, and a loop back to login.
- User identifiers are guarded before requests; invalid detail/edit URLs render the shared 404 page. RowVersion-dependent updates remain blocked when the backend has not supplied a safe token.
- Report values are escaped in HTML. Branding excludes active SVG in print HTML. Preview frames allow same-origin font access and print dialogs, but not scripts. PDF generation remains local to the browser.
- Existing upload guards remain: backup JSON is limited to 8 MB, master-data CSV to 200 KB, and branding images to 100 KB with allowed image formats. These limits were not changed during refactoring.
- `.env` variants are ignored except `.env.example`. Vite variables are public build-time values, never secret storage.

## Dependency controls

The reviewed upgrade set addresses reported Zod, Vite, and tooling advisories. The unsupported ESLint 9 release was replaced with ESLint 10. The tooling-only minimatch override replaces affected major versions 7–10 with the patched 11.0.1 release; it must be reconsidered when ESLint and typescript-eslint update their dependencies. The normal ESLint/source checks exercise this override; no security rule was disabled to make audit pass.

CI runs `npm audit --audit-level=moderate`. Dependency and installed-API deprecation findings are recorded in `review/dependencies.json` and the source inventory. Newer package versions are not automatically equivalent to security fixes: avoid an unsupported compiler/parser pairing or unverified major upgrades merely to remove an `npm outdated` entry.

## Backend and deployment requirements

The server must enforce authentication, branch/action authorization, CSRF or trusted-origin protection for cookie-authenticated writes, request validation, concurrency/version checks, idempotency, and atomic financial/inventory posting. Configure HTTPS, HttpOnly/Secure/SameSite cookies, allowed origins, security headers, and body/file-size limits for the actual deployment topology.

The frontend cannot manufacture these controls or prove them through intercepted HTTP tests. The current repository contains neither the production backend nor a verified deployment configuration. A dependency audit and source-pattern review are not a penetration-test certificate.

Keep backup files and exported reports under the deployment's data-handling policy; they may contain financial and personal data. Never add real customer records or credentials to fixtures.

## Role delegation and overrides

Role names never grant access. Server-resolved effective masks remain authoritative, and explicit user exclusions override inherited role bits. New role and assignment controls require real catalog grants; missing capability/permission data fails closed. UI delegation guards reject cross-branch roles, unknown bits, unsigned overflow and permission escalation. The backend must enforce the same constraints atomically, protect user/role versions and revoke or refresh affected session permission stamps. See the [Roles contract](access/ROLES_CONTRACT.md); browser fixtures do not establish backend security.
