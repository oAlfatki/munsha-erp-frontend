import type { SaveEmployeeDeleteRequest } from '@/features/employees/types/requests/SaveEmployeeDeleteRequest';
import type { SaveEmployeeRequest } from '@/features/employees/types/requests/SaveEmployeeRequest';
import {
  employeeDeleteSchema,
  employeeSchema,
} from '@/features/employees/validation/employees-schema';
export const mapEmployeeInput = (input: unknown): SaveEmployeeRequest =>
  employeeSchema.parse(input) as SaveEmployeeRequest;
export const mapEmployeeDeleteInput = (input: unknown): SaveEmployeeDeleteRequest =>
  employeeDeleteSchema.parse(input) as SaveEmployeeDeleteRequest;
