import type { CommandReceipt } from '@/core/types/CommandReceipt';
import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/config/endpoints';
import type { CommandContext } from '@/core/types/CommandContext';
import type { SaveEmployeeDeleteRequest } from '@/features/personnel/public/types/requests/SaveEmployeeDeleteRequest';
import type { SaveEmployeeRequest } from '@/features/personnel/public/types/requests/SaveEmployeeRequest';
export const submitEmployee = async (
  data: SaveEmployeeRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {
  return apiClient.post<CommandReceipt>(ENDPOINTS.command('employees', 'employee'), {
    ...context,
    type: 'employee',
    data: data,
  });
};
export const submitEmployeeDelete = async (
  data: SaveEmployeeDeleteRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {
  return apiClient.post<CommandReceipt>(ENDPOINTS.command('employees', 'employeeDelete'), {
    ...context,
    type: 'employeeDelete',
    data: data,
  });
};
