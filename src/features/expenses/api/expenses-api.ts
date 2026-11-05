import type { CommandReceipt } from '@/core/types/CommandReceipt';
import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/config/endpoints';
import type { CommandContext } from '@/core/types/CommandContext';
import type { SaveExpenseConsumeRequest } from '@/features/expenses/types/requests/SaveExpenseConsumeRequest';
import type { SaveExpensePaymentRequest } from '@/features/expenses/types/requests/SaveExpensePaymentRequest';
import type { SaveExpenseRequest } from '@/features/expenses/types/requests/SaveExpenseRequest';
import type { SaveExpenseSaveRequest } from '@/features/expenses/types/requests/SaveExpenseSaveRequest';
export const submitExpense = async (
  data: SaveExpenseRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {
  return apiClient.post<CommandReceipt>(ENDPOINTS.command('expenses', 'expense'), {
    ...context,
    type: 'expense',
    data: data,
  });
};
export const submitExpenseSave = async (
  data: SaveExpenseSaveRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {
  return apiClient.post<CommandReceipt>(ENDPOINTS.command('expenses', 'expenseSave'), {
    ...context,
    type: 'expenseSave',
    data: data,
  });
};
export const submitExpensePayment = async (
  data: SaveExpensePaymentRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {
  return apiClient.post<CommandReceipt>(ENDPOINTS.command('expenses', 'expensePayment'), {
    ...context,
    type: 'expensePayment',
    data: data,
  });
};
export const submitExpenseConsume = async (
  data: SaveExpenseConsumeRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {
  return apiClient.post<CommandReceipt>(ENDPOINTS.command('expenses', 'expenseConsume'), {
    ...context,
    type: 'expenseConsume',
    data: data,
  });
};
