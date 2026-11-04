import type { Entry } from '@/features/ledger/public/types/models/Entry';
import type { ExtensionData } from '@/features/ledger/public/types/models/ExtensionData';
/** Screen/operation-specific projection; no global ERP data contract. */
export interface SupplierDirectoryControllerReadModel {
  extras?: ExtensionData;
  entries: Entry[];
}
