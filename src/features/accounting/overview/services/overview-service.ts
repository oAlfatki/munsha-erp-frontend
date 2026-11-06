import type { CommandContext } from '@/core/types/api/CommandContext';
import { submitOperation } from '@/features/accounting/overview/api/overview-api';
import { mapOperationInput } from '@/features/accounting/overview/mappers/overview-mapper';

export const saveOperation = async (
  input: unknown,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof submitOperation>>> =>
  submitOperation(mapOperationInput(input), context);
