import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/config/endpoints';
import type { GetFinancialStatementsIncomeRequest } from '@/features/financial/types/requests/GetFinancialStatementsIncomeRequest';
import type { GetFinancialStatementsPositionRequest } from '@/features/financial/types/requests/GetFinancialStatementsPositionRequest';
import type { SearchReportsFinancialAccountMappingRequest } from '@/features/financial/types/requests/SearchReportsFinancialAccountMappingRequest';
import type { SearchReportsFinancialCashFlowRequest } from '@/features/financial/types/requests/SearchReportsFinancialCashFlowRequest';
import type { SearchReportsFinancialProfitByCustomerRequest } from '@/features/financial/types/requests/SearchReportsFinancialProfitByCustomerRequest';
import type { SearchReportsFinancialProfitByItemRequest } from '@/features/financial/types/requests/SearchReportsFinancialProfitByItemRequest';
import type { AccountMappingReport } from '@/features/financial/types/responses/AccountMappingReport';
import type { CashFlowReport } from '@/features/financial/types/responses/CashFlowReport';
import type { FinancialPositionResponse } from '@/features/financial/types/responses/FinancialPositionResponse';
import type { IncomeStatementResponse } from '@/features/financial/types/responses/IncomeStatementResponse';
import type { ProfitByCustomerReport } from '@/features/financial/types/responses/ProfitByCustomerReport';
import type { ProfitByItemReport } from '@/features/financial/types/responses/ProfitByItemReport';
/** Get profit by item report. Existing HTTP contract. */
export async function fetchReportsFinancialProfitByItem(
  params: SearchReportsFinancialProfitByItemRequest,
): Promise<ProfitByItemReport> {
  return await apiClient.get<ProfitByItemReport>(ENDPOINTS.fetchReportsFinancialProfitByItem,{params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      q: params.q,
      productId: params.productId,
    }});
}
/** Get profit by customer report. Existing HTTP contract. */
export async function fetchReportsFinancialProfitByCustomer(
  params: SearchReportsFinancialProfitByCustomerRequest,
): Promise<ProfitByCustomerReport> {
  return await apiClient.get<ProfitByCustomerReport>(ENDPOINTS.fetchReportsFinancialProfitByCustomer,{params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      q: params.q,
      partyId: params.partyId,
    }});
}
/** Get cash flow report. Existing HTTP contract. */
export async function fetchReportsFinancialCashFlow(
  params: SearchReportsFinancialCashFlowRequest,
): Promise<CashFlowReport> {
  return await apiClient.get<CashFlowReport>(ENDPOINTS.fetchReportsFinancialCashFlow,{params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      q: params.q,
    }});
}
/** Get account mapping report. Existing HTTP contract. */
export async function fetchReportsFinancialAccountMapping(
  params: SearchReportsFinancialAccountMappingRequest,
): Promise<AccountMappingReport> {
  return await apiClient.get<AccountMappingReport>(ENDPOINTS.fetchReportsFinancialAccountMapping,{params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      q: params.q,
      asOf: params.asOf,
      accountCode: params.accountCode,
    }});
}
/** Get the income statement. Existing HTTP contract. */
export async function fetchFinancialStatementsIncome(
  params: GetFinancialStatementsIncomeRequest,
): Promise<IncomeStatementResponse> {
  return await apiClient.get<IncomeStatementResponse>(ENDPOINTS.fetchFinancialStatementsIncome,{params: { bookId: params.bookId, branchId: params.branchId, from: params.from, to: params.to }});
}
/** Get the statement of financial position. Existing HTTP contract. */
export async function fetchFinancialStatementsPosition(
  params: GetFinancialStatementsPositionRequest,
): Promise<FinancialPositionResponse> {
  return await apiClient.get<FinancialPositionResponse>(ENDPOINTS.fetchFinancialStatementsPosition,{params: { bookId: params.bookId, branchId: params.branchId, asOf: params.asOf }});
}
