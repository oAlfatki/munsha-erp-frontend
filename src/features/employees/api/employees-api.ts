import { apiClient } from '@/core/api/apiClient';
import type { CommandContext } from '@/core/types/api/CommandContext';
import type { CommandReceipt } from '@/core/types/api/CommandReceipt';
import { ENDPOINTS } from '@/features/employees/api/endpoints';
import type { SaveEmployeeDeleteRequest, SaveEmployeeRequest } from '@/features/personnel/public';

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
