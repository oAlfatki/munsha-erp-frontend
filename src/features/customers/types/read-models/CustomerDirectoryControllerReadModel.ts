import type { Entry } from "@/features/accounting/public/types/models/Entry";
import type { ExtensionData } from "@/features/accounting/public/types/models/ExtensionData";
/** Screen/operation-specific projection; no global ERP data contract. */
export interface CustomerDirectoryControllerReadModel {
  extras?: ExtensionData;
  entries: Entry[];
}
