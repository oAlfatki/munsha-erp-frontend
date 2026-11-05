import type { Entry, ExtensionData } from '@/features/ledger/public';
export interface BuildAccountMappingReportContext {
  entries: Entry[];
  extras?: ExtensionData;
}
