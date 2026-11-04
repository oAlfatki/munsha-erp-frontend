import type { CommandContext } from '@/core/types/CommandContext';
import { submitMaster } from '@/features/master-data/api/master-api';
import { mapMasterInput } from '@/features/master-data/mappers/master-mapper';
export const saveMaster = async (
  input: unknown,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof submitMaster>>> =>
  submitMaster(mapMasterInput(input), context);
