import type { ExtensionData } from '@/features/ledger/public';

/** Screen/operation-specific projection; no global ERP data contract. */
export interface JournalScreenControllerReadModel {
  extras?: ExtensionData;
}
