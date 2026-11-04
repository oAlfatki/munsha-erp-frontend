import {
  employeeDeleteSchema,
  employeeSchema,
} from '@/features/employees/validation/employees-schema';
import type { SaveEmployeeDeleteRequest } from '@/features/personnel/public/types/requests/SaveEmployeeDeleteRequest';
import type { SaveEmployeeRequest } from '@/features/personnel/public/types/requests/SaveEmployeeRequest';
export const mapEmployeeInput = (input: unknown): SaveEmployeeRequest =>
  employeeSchema.parse(input) as SaveEmployeeRequest;
export const mapEmployeeDeleteInput = (input: unknown): SaveEmployeeDeleteRequest =>
  employeeDeleteSchema.parse(input) as SaveEmployeeDeleteRequest;
