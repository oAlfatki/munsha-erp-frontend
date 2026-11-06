# Backend integration decisions

## Auth

Confirm sign-in and `/auth/me` identity mapping, cookie flags/CORS, same-origin or CSRF protection for writes, refresh expiry, sign-out and session revocation with the real server. No credentials or tokens belong in browser persistence. Permission-catalog failures must not grant access. Confirm that the session heartbeat and refresh/cancellation generation handling match server expiry behavior.

## Users

Keep adopted pagination/filter fields, decimal permission masks, branch guards and operation codes. The current detail response may omit RowVersion: editing must remain blocked until the server provides a usable concurrency token. Do not reuse a create response token for a later detail load. Confirm duplicate-name errors, status changes, password resets, permission version conflicts, session revocation and audit export authorization against the actual backend.

## Dashboard

The existing `/dashboard` projection accepts `branchId` and optional `bookId`. This foundation sends the authenticated branch and omits the optional book filter; the server chooses its active book. Confirm that contract explicitly during integration. Stock alerts are dashboard read data, not an Inventory module or a client stock calculation. An API failure must render an error rather than an invented healthy summary.

## Scope

This branch has no Accounting, Ledger, Inventory, Stock, Sales, Purchases, Trade, Settings or Organization feature implementations. Auth and Users must not depend on those resources to mount. All future endpoints and grants require agreed contracts; do not revive legacy roles or assume that a historical OpenAPI document defines the new system.
