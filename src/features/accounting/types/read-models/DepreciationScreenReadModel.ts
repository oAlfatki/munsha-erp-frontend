import type { ExtensionData } from "@/features/accounting/public/types/models/ExtensionData";
import type { Branch } from "@/features/settings/public/types/models/Branch";
/** Screen/operation-specific projection; no global ERP data contract. */
export interface DepreciationScreenReadModel {
  branches: Branch[];
  extras?: ExtensionData;
}
