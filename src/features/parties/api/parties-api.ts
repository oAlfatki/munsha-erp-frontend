import { postCommand } from '@/core/services/http/command-api';
import type { CommandContext } from '@/core/types/CommandContext';
import type { SavePartyRequest } from "@/features/parties/public/types/requests/SavePartyRequest";
export const submitParty = async (
  data: SavePartyRequest,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof postCommand>>> =>
  postCommand('parties', 'party', data, context);
