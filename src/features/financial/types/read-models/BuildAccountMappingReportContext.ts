import type { Entry } from "@/features/accounting/public/types/models/Entry";
import type { ExtensionData } from "@/features/accounting/public/types/models/ExtensionData";
export interface BuildAccountMappingReportContext {
entries: Entry[];
extras?: ExtensionData;
}
