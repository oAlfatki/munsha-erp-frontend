import {
  employeeDeleteSchema,
  employeeSchema,
} from '@/features/employees/validations/employees-schema';
import type { SaveEmployeeDeleteRequest, SaveEmployeeRequest } from '@/features/personnel/public';
export const mapEmployeeInput = (input: unknown): SaveEmployeeRequest =>
  employeeSchema.parse(input) as SaveEmployeeRequest;
export const mapEmployeeDeleteInput = (input: unknown): SaveEmployeeDeleteRequest =>
  employeeDeleteSchema.parse(input) as SaveEmployeeDeleteRequest;
