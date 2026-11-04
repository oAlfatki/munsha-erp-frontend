import type { SaveExpenseConsumeRequest } from '@/features/expenses/types/requests/SaveExpenseConsumeRequest';
import type { SaveExpensePaymentRequest } from '@/features/expenses/types/requests/SaveExpensePaymentRequest';
import type { SaveExpenseRequest } from '@/features/expenses/types/requests/SaveExpenseRequest';
import type { SaveExpenseSaveRequest } from '@/features/expenses/types/requests/SaveExpenseSaveRequest';
import {
expenseConsumeSchema,
expensePaymentSchema,
expenseSaveSchema,
expenseSchema,
} from '@/features/expenses/validation/expenses-schema';
export const mapExpenseInput = (input: unknown): SaveExpenseRequest =>
  expenseSchema.parse(input) as SaveExpenseRequest;
export const mapExpenseSaveInput = (input: unknown): SaveExpenseSaveRequest =>
  expenseSaveSchema.parse(input) as SaveExpenseSaveRequest;
export const mapExpensePaymentInput = (input: unknown): SaveExpensePaymentRequest =>
  expensePaymentSchema.parse(input) as SaveExpensePaymentRequest;
export const mapExpenseConsumeInput = (input: unknown): SaveExpenseConsumeRequest =>
  expenseConsumeSchema.parse(input) as SaveExpenseConsumeRequest;
