import type { Branch } from "@/features/settings/public/types/models/Branch";
/** Screen/operation-specific projection; no global ERP data contract. */
export interface BranchDirectoryReadModel {
  branches: Branch[];
}
