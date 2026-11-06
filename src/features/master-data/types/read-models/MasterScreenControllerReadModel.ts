import type { ExtensionData } from '@/features/ledger/public';
import type { Branch } from '@/features/organization/public';
/** Screen/operation-specific projection; no global ERP data contract. */
export interface MasterScreenControllerReadModel {
  extras?: ExtensionData;
  branches: Branch[];
}
