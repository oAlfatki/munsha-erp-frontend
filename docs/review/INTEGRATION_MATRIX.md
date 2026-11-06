# Feature review and operation matrix

`source-inventory.json` lists every source file, function/callback span, imports, HTTP operation, schema declaration and remaining review finding. This table interprets that inventory; it does not invent missing backend contracts. Existing behavior and permission gates are preserved.

| Feature | Ownership reviewed | Operation validation / integration decision |
| --- | --- | --- |
| Auth | Dedicated layout, credentials/session mapper, login and account forms | Sign-in and password-change schemas; session response parsing. Verify real cookies, CSRF, refresh/revoke behavior with the server. |
| Users | DTO files, permission-catalog validation, list/detail/operations | Create/edit rules intentionally share the confirmed form schema with operation-specific checks. Password/reset and permission checks remain separate. Missing detail RowVersion blocks editing. Server filters/deletes must enforce authorization and bounds. |
| Accounting | Functional subdomains, command mappers/services, reports | Existing journal/voucher/contact/period schemas and policies retained. Confirm write routes, permission codes, numbering and atomic posting. Ledger remains independent. |
| Ledger | Financial read APIs, queries, projection types and rules | Read/filter DTOs remain transport contracts; financial command schemas stay owned here where shared. No new validators or limits inferred from outdated OpenAPI. |
| Inventory | Products, warehouses, units, groups, balances, stock documents, closing, reports | Controller/view separation and stock validation retained. Stock owns shared contracts. Confirm server scope and stock-document conflict/posting behavior. |
| Stock | Feature endpoint map, read APIs/queries and schemas | Product/stock/transfer/document rules retained, including numeric preprocessing. Bind write permissions before enabling commands. |
| Sales | Independent invoice/return/pricing/target/report workflows | Invoice and return form contracts reuse Trade rules. Controllers stay separate from Purchases. Confirm server numbering, discount/return limits and idempotency. |
| Purchases | Independent invoice/return/report workflows | Shared actions/presentation do not merge ownership. Confirm supplier references, returns, write permission bindings and posting. |
| Trade | Shared invoice calculations, schemas, lookups, grids and actions | Preserve common invoice/partial-return constraints. Reuse confirmed common behavior; do not introduce a universal invoice editor. |
| Customers | Customer UI over Parties contracts | Existing party form/schema and duplicate checks retained. Confirm server search/pagination and write authorization. |
| Suppliers | Supplier UI over Parties contracts | Shared party validation remains common; keep supplier-specific workflow ownership. Confirm server write/search contracts. |
| Parties | Shared party reads, projection types and policy | Preserve party wire fields and branch scope; do not duplicate account balances in UI modules. |
| Employees | Employee forms, records and report views | Existing employee/file schemas retained. Confirm server creation/update/delete and employee-file operations. |
| Personnel | Shared employee/payroll/advance/payment read contracts | Read/query ownership stays independent of employee UI. Confirm reporting scope and write bindings in consuming workflows. |
| Expenses | Expense forms, models, reports and APIs | Save/payment/consumption schemas and financial rules retained. Server must enforce funding, branch scope and atomic journal effects. |
| Settings | Independently typed panels, backup controller and import preview | Company/branch/system/import/backup schemas remain operation-owned. Shared HTML control validation supplements, not replaces, request schemas. |
| Organization | Company/branch/book/backup data contracts and policies | Configuration schemas preserve unknown-field behavior where already supported. Confirm deployment, backup/restore authorization and data lifecycle. |
| Master Data | Generic UI definitions, lookup/controller/validation | Shared collection schema retained. A generic screen is not authorization to accept arbitrary collections on the server. |
| Dashboard | Layout state separated from shell; overview queries/styles | Read-only projection. Search results and metrics need confirmed scoped server responses, not local demo state. |
| Financial | Statement/report projections and query ownership | Preserve existing report calculations and filters. Confirm server report definitions, ranges and authorization. |
| Reports | Report composition and presentation contracts | Feature owners retain calculations/columns. Shared report actions do not make report data trustworthy without server scope checks. |

Do not create nominal create/edit/search/delete schemas that do nothing. Split or share a schema according to the actual operation contract. A new backend contract or rule change requires updated, explicitly reviewed contract expectations; old fixtures are not the product specification.
