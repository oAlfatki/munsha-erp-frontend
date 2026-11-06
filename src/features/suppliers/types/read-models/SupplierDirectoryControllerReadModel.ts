import type { Entry, ExtensionData } from '@/features/ledger/public';

/** Screen/operation-specific projection; no global ERP data contract. */
export interface SupplierDirectoryControllerReadModel {
  extras?: ExtensionData;
  entries: Entry[];
}
