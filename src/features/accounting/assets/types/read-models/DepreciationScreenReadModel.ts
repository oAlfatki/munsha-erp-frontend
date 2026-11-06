import type { ExtensionData } from '@/features/ledger/public';
import type { Branch } from '@/features/organization/public';

/** Screen/operation-specific projection; no global ERP data contract. */
export interface DepreciationScreenReadModel {
  branches: Branch[];
  extras?: ExtensionData;
}
