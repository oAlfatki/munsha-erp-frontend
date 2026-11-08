# Munsha → Erpify incremental migration sequence

Source of truth: the complete Munsha frontend. First implement/test the approved Users Roles model in Munsha on `feature/users-roles`; then transfer that change into the existing Erpify frontend foundation. Keep the complete ERP in the source repository throughout.

The remaining features have real dependencies, so a visible page must not be copied in isolation from its owned contracts. These are cumulative branches: each branch starts at the previous verified branch and adds only its declared batch plus necessary shared/infrastructure integration. No default branch, upstream branch or existing backend is merged/rewritten automatically.

| Step | Proposed Erpify branch | Added features | Basis / reason |
| --- | --- | --- | --- |
| 0 | `feature/users-roles` | Update existing Users/Auth access infrastructure | Transfer verified source implementation; role definitions, hierarchy and per-user overrides |
| 1 | `feature/migrate-01-ledger-organization` | Ledger, Organization | Financial book and organization contracts underpin later features |
| 2 | `feature/migrate-02-parties-personnel-stock` | Parties, Personnel, Stock | Branch-scoped shared business read/validation ownership |
| 3 | `feature/migrate-03-master-data-trade` | Master Data, Trade | Reusable collection UI and confirmed common invoice behavior |
| 4 | `feature/migrate-04-accounting-customers-suppliers` | Accounting, Customers, Suppliers | First dependent business workflows after their contracts exist |
| 5 | `feature/migrate-05-employees-expenses` | Employees, Expenses | Uses financial, party, personnel and stock contracts already present |
| 6 | `feature/migrate-06-inventory` | Inventory | Large independent batch including its functional subdomains |
| 7 | `feature/migrate-07-sales-purchases` | Sales, Purchases | Separate workflows over existing Inventory and Trade contracts |
| 8 | `feature/migrate-08-financial-reports-settings` | Financial, Reports, Settings | Final projections and settings after their functional dependencies |

The exact composition is verified against imports and exports during each transfer. Do not silently add an undeclared feature to satisfy a broken import. Contract-only modules may expose explicit public compiler/library entry points before UI consumers arrive; such entries need explicit scope metadata and tests rather than fake runtime imports or disabling reachability checks.

Per branch: preserve Backend/client files, migrate only the declared frontend surface, register only available pages/navigation, preserve API paths and Query Keys, run TypeScript/lint/architecture/reachability/naming/format/contract tests/build, exercise the available browser journeys, review the diff, commit and push without force. Record the source commit, parent branch, newly included features, verification results and remaining backend requirements. Team reviews and merges branches in dependency order; rebasing/rewriting already published branches is not automatic.

This document is a sequence, not evidence that every step has been transferred. Completed commits and branch links must be reported separately.
