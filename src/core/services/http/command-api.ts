import { ENDPOINTS } from '@/core/config/endpoints';
import { CONFIG } from '@/core/config/env';
import { apiClient } from '@/core/api/apiClient';
import type { CommandContext } from '@/core/types/CommandContext';
import type { CommandReceipt } from '@/core/types/CommandReceipt';
export async function postCommand<TData>(
  feature: string,
  type: string,
  data: TData,
  context: CommandContext,
): Promise<CommandReceipt> {
  const payload = { ...context, type, data };
  if (CONFIG.apiMode !== 'aspnet')
    throw Error('الواجهة المفصولة تتطلب عقد ASP.NET API؛ وضع site القديم غير مدعوم');
  return apiClient.post<CommandReceipt>(ENDPOINTS.command(feature, type),payload);
}
