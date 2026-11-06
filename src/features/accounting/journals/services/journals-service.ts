import type { CommandContext } from '@/core/types/api/CommandContext';
import { submitManualJournal } from '@/features/accounting/journals/api/journals-api';
import { mapManualJournalInput } from '@/features/accounting/journals/mappers/journals-mapper';

export const saveManualJournal = async (
  input: unknown,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof submitManualJournal>>> =>
  submitManualJournal(mapManualJournalInput(input), context);
