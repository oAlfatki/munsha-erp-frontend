import type { Entry } from '@/features/ledger/public/types/models/Entry';
/** Screen/operation-specific projection; no global ERP data contract. */
export interface FinancialProjectionReadModel {
  entries: Entry[];
}
