import type { Branch } from '@/features/organization/public/types/models/Branch';
/** Screen/operation-specific projection; no global ERP data contract. */
export interface BranchDirectoryReadModel {
  branches: Branch[];
}
