import { postCommand } from '@/core/services/http/command-api';
import type { CommandContext } from '@/core/types/CommandContext';
import type { SaveExpenseConsumeRequest } from '@/features/expenses/types/requests/SaveExpenseConsumeRequest';
import type { SaveExpensePaymentRequest } from '@/features/expenses/types/requests/SaveExpensePaymentRequest';
import type { SaveExpenseRequest } from '@/features/expenses/types/requests/SaveExpenseRequest';
import type { SaveExpenseSaveRequest } from '@/features/expenses/types/requests/SaveExpenseSaveRequest';
export const submitExpense = async (
  data: SaveExpenseRequest,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof postCommand>>> =>
  postCommand('expenses', 'expense', data, context);
export const submitExpenseSave = async (
  data: SaveExpenseSaveRequest,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof postCommand>>> =>
  postCommand('expenses', 'expenseSave', data, context);
export const submitExpensePayment = async (
  data: SaveExpensePaymentRequest,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof postCommand>>> =>
  postCommand('expenses', 'expensePayment', data, context);
export const submitExpenseConsume = async (
  data: SaveExpenseConsumeRequest,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof postCommand>>> =>
  postCommand('expenses', 'expenseConsume', data, context);
