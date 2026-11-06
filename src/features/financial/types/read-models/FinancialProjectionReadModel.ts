import type { Entry } from '@/features/ledger/public';
/** Screen/operation-specific projection; no global ERP data contract. */
export interface FinancialProjectionReadModel {
  entries: Entry[];
}
