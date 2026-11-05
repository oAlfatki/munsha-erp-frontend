import type { CommandContext } from '@/core/types/api/CommandContext';
import { submitEmployee, submitEmployeeDelete } from '@/features/employees/api/employees-api';
import {
  mapEmployeeDeleteInput,
  mapEmployeeInput,
} from '@/features/employees/mappers/employees-mapper';
export const saveEmployee = async (
  input: unknown,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof submitEmployee>>> =>
  submitEmployee(mapEmployeeInput(input), context);
export const saveEmployeeDelete = async (
  input: unknown,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof submitEmployeeDelete>>> =>
  submitEmployeeDelete(mapEmployeeDeleteInput(input), context);
