import { postCommand } from '@/core/services/http/command-api';
import type { CommandContext } from '@/core/types/CommandContext';
import type { DeleteDraftRequest } from '@/features/trade/types/requests/DeleteDraftRequest';
import type { SaveInvoiceRequest } from '@/features/trade/types/requests/SaveInvoiceRequest';
import type { SavePartialReturnRequest } from '@/features/trade/types/requests/SavePartialReturnRequest';
import type { SaveReturnRequest } from '@/features/trade/types/requests/SaveReturnRequest';
export const submitInvoice = async (
  data: SaveInvoiceRequest,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof postCommand>>> =>
  postCommand('trade', 'invoice', data, context);
export const submitDeleteDraft = async (
  data: DeleteDraftRequest,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof postCommand>>> =>
  postCommand('trade', 'deleteDraft', data, context);
export const submitReturn = async (
  data: SaveReturnRequest,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof postCommand>>> =>
  postCommand('trade', 'return', data, context);
export const submitPartialReturn = async (
  data: SavePartialReturnRequest,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof postCommand>>> =>
  postCommand('trade', 'partialReturn', data, context);
