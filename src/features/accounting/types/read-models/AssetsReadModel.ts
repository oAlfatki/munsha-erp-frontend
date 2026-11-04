import type { ExtensionData } from '@/features/ledger/public/types/models/ExtensionData';
import type { Branch } from '@/features/organization/public/types/models/Branch';
/** Screen/operation-specific projection; no global ERP data contract. */
export interface AssetsReadModel {
  branches: Branch[];
  extras?: ExtensionData;
}
