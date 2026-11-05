import type { SaveManualJournalRequest } from '@/features/ledger/public';
import { manualJournalSchema } from '@/features/ledger/public';
export const mapManualJournalInput = (input: unknown): SaveManualJournalRequest =>
  manualJournalSchema.parse(input) as SaveManualJournalRequest;
