import type { ExtensionData } from "@/features/accounting/public/types/models/ExtensionData";
import type { Branch } from "@/features/settings/public/types/models/Branch";
export interface ValidateJournalContext {
branches: Branch[];
extras?: ExtensionData;
}
