import type { Entry } from '@/features/ledger/public/types/models/Entry';
import type { ExtensionData } from '@/features/ledger/public/types/models/ExtensionData';
export interface BuildAccountMappingReportContext {
  entries: Entry[];
  extras?: ExtensionData;
}
