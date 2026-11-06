import type { Branch } from '@/features/organization/public';
/** Screen/operation-specific projection; no global ERP data contract. */
export interface BranchDirectoryReadModel {
  branches: Branch[];
}
