import type { MasterRecord } from '@/features/ledger/types/models/MasterRecord';
import type { OperationRecord } from '@/features/ledger/types/models/OperationRecord';
export interface ExtensionData {
  records: Record<string, MasterRecord[]>;
  operations: OperationRecord[];
  drafts: Record<string, Record<string, string>>;
  preferences: Record<string, string>;
}
