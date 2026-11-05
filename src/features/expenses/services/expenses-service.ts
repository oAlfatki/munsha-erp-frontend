import type { CommandContext } from '@/core/types/api/CommandContext';
import {
  submitExpense,
  submitExpenseConsume,
  submitExpensePayment,
  submitExpenseSave,
} from '@/features/expenses/api/expenses-api';
import {
  mapExpenseConsumeInput,
  mapExpenseInput,
  mapExpensePaymentInput,
  mapExpenseSaveInput,
} from '@/features/expenses/mappers/expenses-mapper';
export const saveExpense = async (
  input: unknown,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof submitExpense>>> =>
  submitExpense(mapExpenseInput(input), context);
export const saveExpenseSave = async (
  input: unknown,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof submitExpenseSave>>> =>
  submitExpenseSave(mapExpenseSaveInput(input), context);
export const saveExpensePayment = async (
  input: unknown,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof submitExpensePayment>>> =>
  submitExpensePayment(mapExpensePaymentInput(input), context);
export const saveExpenseConsume = async (
  input: unknown,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof submitExpenseConsume>>> =>
  submitExpenseConsume(mapExpenseConsumeInput(input), context);
