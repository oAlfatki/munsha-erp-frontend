import { postCommand } from '@/core/services/http/command-api';
import type { CommandContext } from '@/core/types/CommandContext';
import type { SaveEmployeeDeleteRequest } from '@/features/employees/types/requests/SaveEmployeeDeleteRequest';
import type { SaveEmployeeRequest } from '@/features/employees/types/requests/SaveEmployeeRequest';
export const submitEmployee = async (
  data: SaveEmployeeRequest,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof postCommand>>> =>
  postCommand('employees', 'employee', data, context);
export const submitEmployeeDelete = async (
  data: SaveEmployeeDeleteRequest,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof postCommand>>> =>
  postCommand('employees', 'employeeDelete', data, context);
