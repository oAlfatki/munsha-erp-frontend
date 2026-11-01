import { ENDPOINTS } from '@/core/config/endpoints';
import { apiClient } from '@/core/api/apiClient';
import type { SearchReportsAccountingAccountStatementRequest } from '@/features/reports/types/requests/SearchReportsAccountingAccountStatementRequest';
import type { SearchReportsAccountingAssetsRequest } from '@/features/reports/types/requests/SearchReportsAccountingAssetsRequest';
import type { SearchReportsAccountingCashMovementsRequest } from '@/features/reports/types/requests/SearchReportsAccountingCashMovementsRequest';
import type { SearchReportsAccountingContactLedgerRequest } from '@/features/reports/types/requests/SearchReportsAccountingContactLedgerRequest';
import type { SearchReportsAccountingForeignCurrencyRequest } from '@/features/reports/types/requests/SearchReportsAccountingForeignCurrencyRequest';
import type { SearchReportsAccountingOpeningBalancesRequest } from '@/features/reports/types/requests/SearchReportsAccountingOpeningBalancesRequest';
import type { SearchReportsAccountingTaxRequest } from '@/features/reports/types/requests/SearchReportsAccountingTaxRequest';
import type { SearchReportsAccountingTrialBalanceRequest } from '@/features/reports/types/requests/SearchReportsAccountingTrialBalanceRequest';
import type { SearchReportsCustomersBalancesRequest } from '@/features/reports/types/requests/SearchReportsCustomersBalancesRequest';
import type { SearchReportsEmployeesAdvancesRequest } from '@/features/reports/types/requests/SearchReportsEmployeesAdvancesRequest';
import type { SearchReportsEmployeesPayrollRequest } from '@/features/reports/types/requests/SearchReportsEmployeesPayrollRequest';
import type { SearchReportsExpensesRecognizedRequest } from '@/features/reports/types/requests/SearchReportsExpensesRecognizedRequest';
import type { SearchReportsInventoryAdjustmentsRequest } from '@/features/reports/types/requests/SearchReportsInventoryAdjustmentsRequest';
import type { SearchReportsInventoryHistoricalCostRequest } from '@/features/reports/types/requests/SearchReportsInventoryHistoricalCostRequest';
import type { SearchReportsInventoryOpeningStockRequest } from '@/features/reports/types/requests/SearchReportsInventoryOpeningStockRequest';
import type { SearchReportsInventoryPricesRequest } from '@/features/reports/types/requests/SearchReportsInventoryPricesRequest';
import type { SearchReportsInventoryReorderRequest } from '@/features/reports/types/requests/SearchReportsInventoryReorderRequest';
import type { SearchReportsInventoryStagnantRequest } from '@/features/reports/types/requests/SearchReportsInventoryStagnantRequest';
import type { SearchReportsInventoryTransfersRequest } from '@/features/reports/types/requests/SearchReportsInventoryTransfersRequest';
import type { SearchReportsInventoryValuationRequest } from '@/features/reports/types/requests/SearchReportsInventoryValuationRequest';
import type { SearchReportsPurchasesReturnsRequest } from '@/features/reports/types/requests/SearchReportsPurchasesReturnsRequest';
import type { SearchReportsPurchasesSummaryRequest } from '@/features/reports/types/requests/SearchReportsPurchasesSummaryRequest';
import type { SearchReportsSalesChartRequest } from '@/features/reports/types/requests/SearchReportsSalesChartRequest';
import type { SearchReportsSalesReturnsRequest } from '@/features/reports/types/requests/SearchReportsSalesReturnsRequest';
import type { SearchReportsSalesSummaryRequest } from '@/features/reports/types/requests/SearchReportsSalesSummaryRequest';
import type { SearchReportsSalesTargetAchievementRequest } from '@/features/reports/types/requests/SearchReportsSalesTargetAchievementRequest';
import type { SearchReportsSuppliersBalancesRequest } from '@/features/reports/types/requests/SearchReportsSuppliersBalancesRequest';
import type { AccountStatementResponse } from '@/features/reports/types/responses/AccountStatementResponse';
import type { AdjustmentsReport } from '@/features/reports/types/responses/AdjustmentsReport';
import type { AdvancesReport } from '@/features/reports/types/responses/AdvancesReport';
import type { AssetsReport } from '@/features/reports/types/responses/AssetsReport';
import type { CashMovementsReport } from '@/features/reports/types/responses/CashMovementsReport';
import type { CustomerBalancesReport } from '@/features/reports/types/responses/CustomerBalancesReport';
import type { ForeignCurrencyReport } from '@/features/reports/types/responses/ForeignCurrencyReport';
import type { HistoricalCostReport } from '@/features/reports/types/responses/HistoricalCostReport';
import type { InventoryValuationReport } from '@/features/reports/types/responses/InventoryValuationReport';
import type { OpeningBalancesReport } from '@/features/reports/types/responses/OpeningBalancesReport';
import type { OpeningStockReport } from '@/features/reports/types/responses/OpeningStockReport';
import type { PayrollReport } from '@/features/reports/types/responses/PayrollReport';
import type { PricesReport } from '@/features/reports/types/responses/PricesReport';
import type { PurchaseReturnsReport } from '@/features/reports/types/responses/PurchaseReturnsReport';
import type { PurchasesSummaryReport } from '@/features/reports/types/responses/PurchasesSummaryReport';
import type { RecognizedExpensesReport } from '@/features/reports/types/responses/RecognizedExpensesReport';
import type { ReorderReport } from '@/features/reports/types/responses/ReorderReport';
import type { SalesChartReport } from '@/features/reports/types/responses/SalesChartReport';
import type { SalesReturnsReport } from '@/features/reports/types/responses/SalesReturnsReport';
import type { SalesSummaryReport } from '@/features/reports/types/responses/SalesSummaryReport';
import type { StagnantReport } from '@/features/reports/types/responses/StagnantReport';
import type { SupplierBalancesReport } from '@/features/reports/types/responses/SupplierBalancesReport';
import type { TargetAchievementReport } from '@/features/reports/types/responses/TargetAchievementReport';
import type { TaxReport } from '@/features/reports/types/responses/TaxReport';
import type { TransfersReport } from '@/features/reports/types/responses/TransfersReport';
import type { TrialBalanceReport } from '@/features/reports/types/responses/TrialBalanceReport';
/** Get inventory valuation report. Existing HTTP contract. */
export async function fetchReportsInventoryValuation(
  params: SearchReportsInventoryValuationRequest,
): Promise<InventoryValuationReport> {
  return await apiClient.get<InventoryValuationReport>(ENDPOINTS.fetchReportsInventoryValuation,{params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      q: params.q,
      asOf: params.asOf,
      warehouseId: params.warehouseId,
      productId: params.productId,
    }});
}
/** Get opening stock report. Existing HTTP contract. */
export async function fetchReportsInventoryOpeningStock(
  params: SearchReportsInventoryOpeningStockRequest,
): Promise<OpeningStockReport> {
  return await apiClient.get<OpeningStockReport>(ENDPOINTS.fetchReportsInventoryOpeningStock,{params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      q: params.q,
      asOf: params.asOf,
      warehouseId: params.warehouseId,
      productId: params.productId,
    }});
}
/** Get reorder report. Existing HTTP contract. */
export async function fetchReportsInventoryReorder(
  params: SearchReportsInventoryReorderRequest,
): Promise<ReorderReport> {
  return await apiClient.get<ReorderReport>(ENDPOINTS.fetchReportsInventoryReorder,{params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      q: params.q,
      asOf: params.asOf,
      warehouseId: params.warehouseId,
      productId: params.productId,
    }});
}
/** Get stagnant report. Existing HTTP contract. */
export async function fetchReportsInventoryStagnant(
  params: SearchReportsInventoryStagnantRequest,
): Promise<StagnantReport> {
  return await apiClient.get<StagnantReport>(ENDPOINTS.fetchReportsInventoryStagnant,{params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      q: params.q,
      warehouseId: params.warehouseId,
      productId: params.productId,
    }});
}
/** Get historical cost report. Existing HTTP contract. */
export async function fetchReportsInventoryHistoricalCost(
  params: SearchReportsInventoryHistoricalCostRequest,
): Promise<HistoricalCostReport> {
  return await apiClient.get<HistoricalCostReport>(ENDPOINTS.fetchReportsInventoryHistoricalCost,{params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      q: params.q,
      warehouseId: params.warehouseId,
      productId: params.productId,
    }});
}
/** Get transfers report. Existing HTTP contract. */
export async function fetchReportsInventoryTransfers(
  params: SearchReportsInventoryTransfersRequest,
): Promise<TransfersReport> {
  return await apiClient.get<TransfersReport>(ENDPOINTS.fetchReportsInventoryTransfers,{params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      q: params.q,
      warehouseId: params.warehouseId,
      productId: params.productId,
    }});
}
/** Get adjustments report. Existing HTTP contract. */
export async function fetchReportsInventoryAdjustments(
  params: SearchReportsInventoryAdjustmentsRequest,
): Promise<AdjustmentsReport> {
  return await apiClient.get<AdjustmentsReport>(ENDPOINTS.fetchReportsInventoryAdjustments,{params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      q: params.q,
      warehouseId: params.warehouseId,
      productId: params.productId,
    }});
}
/** Get prices report. Existing HTTP contract. */
export async function fetchReportsInventoryPrices(
  params: SearchReportsInventoryPricesRequest,
): Promise<PricesReport> {
  return await apiClient.get<PricesReport>(ENDPOINTS.fetchReportsInventoryPrices,{params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      q: params.q,
      productId: params.productId,
      category: params.category,
      priceType: params.priceType,
    }});
}
/** Get customer balances report. Existing HTTP contract. */
export async function fetchReportsCustomersBalances(
  params: SearchReportsCustomersBalancesRequest,
): Promise<CustomerBalancesReport> {
  return await apiClient.get<CustomerBalancesReport>(ENDPOINTS.fetchReportsCustomersBalances,{params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      q: params.q,
      asOf: params.asOf,
      partyId: params.partyId,
    }});
}
/** Get supplier balances report. Existing HTTP contract. */
export async function fetchReportsSuppliersBalances(
  params: SearchReportsSuppliersBalancesRequest,
): Promise<SupplierBalancesReport> {
  return await apiClient.get<SupplierBalancesReport>(ENDPOINTS.fetchReportsSuppliersBalances,{params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      q: params.q,
      asOf: params.asOf,
      partyId: params.partyId,
    }});
}
/** Get payroll report. Existing HTTP contract. */
export async function fetchReportsEmployeesPayroll(
  params: SearchReportsEmployeesPayrollRequest,
): Promise<PayrollReport> {
  return await apiClient.get<PayrollReport>(ENDPOINTS.fetchReportsEmployeesPayroll,{params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      q: params.q,
      employeeId: params.employeeId,
      period: params.period,
    }});
}
/** Get advances report. Existing HTTP contract. */
export async function fetchReportsEmployeesAdvances(
  params: SearchReportsEmployeesAdvancesRequest,
): Promise<AdvancesReport> {
  return await apiClient.get<AdvancesReport>(ENDPOINTS.fetchReportsEmployeesAdvances,{params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      q: params.q,
      employeeId: params.employeeId,
    }});
}
/** Get recognized expenses report. Existing HTTP contract. */
export async function fetchReportsExpensesRecognized(
  params: SearchReportsExpensesRecognizedRequest,
): Promise<RecognizedExpensesReport> {
  return await apiClient.get<RecognizedExpensesReport>(ENDPOINTS.fetchReportsExpensesRecognized,{params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      q: params.q,
    }});
}
/** Get sales summary report. Existing HTTP contract. */
export async function fetchReportsSalesSummary(
  params: SearchReportsSalesSummaryRequest,
): Promise<SalesSummaryReport> {
  return await apiClient.get<SalesSummaryReport>(ENDPOINTS.fetchReportsSalesSummary,{params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      q: params.q,
      partyId: params.partyId,
      currency: params.currency,
      productId: params.productId,
    }});
}
/** Get purchases summary report. Existing HTTP contract. */
export async function fetchReportsPurchasesSummary(
  params: SearchReportsPurchasesSummaryRequest,
): Promise<PurchasesSummaryReport> {
  return await apiClient.get<PurchasesSummaryReport>(ENDPOINTS.fetchReportsPurchasesSummary,{params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      q: params.q,
      partyId: params.partyId,
      currency: params.currency,
      productId: params.productId,
    }});
}
/** Get sales returns report. Existing HTTP contract. */
export async function fetchReportsSalesReturns(
  params: SearchReportsSalesReturnsRequest,
): Promise<SalesReturnsReport> {
  return await apiClient.get<SalesReturnsReport>(ENDPOINTS.fetchReportsSalesReturns,{params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      q: params.q,
      partyId: params.partyId,
      currency: params.currency,
    }});
}
/** Get purchase returns report. Existing HTTP contract. */
export async function fetchReportsPurchasesReturns(
  params: SearchReportsPurchasesReturnsRequest,
): Promise<PurchaseReturnsReport> {
  return await apiClient.get<PurchaseReturnsReport>(ENDPOINTS.fetchReportsPurchasesReturns,{params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      q: params.q,
      partyId: params.partyId,
      currency: params.currency,
    }});
}
/** Get sales chart report. Existing HTTP contract. */
export async function fetchReportsSalesChart(
  params: SearchReportsSalesChartRequest,
): Promise<SalesChartReport> {
  return await apiClient.get<SalesChartReport>(ENDPOINTS.fetchReportsSalesChart,{params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      q: params.q,
    }});
}
/** Get cash movements report. Existing HTTP contract. */
export async function fetchReportsAccountingCashMovements(
  params: SearchReportsAccountingCashMovementsRequest,
): Promise<CashMovementsReport> {
  return await apiClient.get<CashMovementsReport>(ENDPOINTS.fetchReportsAccountingCashMovements,{params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      q: params.q,
      cashId: params.cashId,
      currency: params.currency,
    }});
}
/** Get opening balances report. Existing HTTP contract. */
export async function fetchReportsAccountingOpeningBalances(
  params: SearchReportsAccountingOpeningBalancesRequest,
): Promise<OpeningBalancesReport> {
  return await apiClient.get<OpeningBalancesReport>(ENDPOINTS.fetchReportsAccountingOpeningBalances,{params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      q: params.q,
      asOf: params.asOf,
      accountCode: params.accountCode,
      partyId: params.partyId,
    }});
}
/** Get trial balance report. Existing HTTP contract. */
export async function fetchReportsAccountingTrialBalance(
  params: SearchReportsAccountingTrialBalanceRequest,
): Promise<TrialBalanceReport> {
  return await apiClient.get<TrialBalanceReport>(ENDPOINTS.fetchReportsAccountingTrialBalance,{params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      q: params.q,
      asOf: params.asOf,
      accountCode: params.accountCode,
    }});
}
/** Get tax report. Existing HTTP contract. */
export async function fetchReportsAccountingTax(
  params: SearchReportsAccountingTaxRequest,
): Promise<TaxReport> {
  return await apiClient.get<TaxReport>(ENDPOINTS.fetchReportsAccountingTax,{params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      q: params.q,
    }});
}
/** Get foreign currency report. Existing HTTP contract. */
export async function fetchReportsAccountingForeignCurrency(
  params: SearchReportsAccountingForeignCurrencyRequest,
): Promise<ForeignCurrencyReport> {
  return await apiClient.get<ForeignCurrencyReport>(ENDPOINTS.fetchReportsAccountingForeignCurrency,{params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      q: params.q,
      currency: params.currency,
    }});
}
/** Get assets report. Existing HTTP contract. */
export async function fetchReportsAccountingAssets(
  params: SearchReportsAccountingAssetsRequest,
): Promise<AssetsReport> {
  return await apiClient.get<AssetsReport>(ENDPOINTS.fetchReportsAccountingAssets,{params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      q: params.q,
      asOf: params.asOf,
    }});
}
/** Get target achievement report. Existing HTTP contract. */
export async function fetchReportsSalesTargetAchievement(
  params: SearchReportsSalesTargetAchievementRequest,
): Promise<TargetAchievementReport> {
  return await apiClient.get<TargetAchievementReport>(ENDPOINTS.fetchReportsSalesTargetAchievement,{params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      q: params.q,
      employeeId: params.employeeId,
      period: params.period,
    }});
}
/** Get an account or subsidiary statement. Existing HTTP contract. */
export async function fetchReportsAccountingAccountStatement(
  params: SearchReportsAccountingAccountStatementRequest,
): Promise<AccountStatementResponse> {
  return await apiClient.get<AccountStatementResponse>(ENDPOINTS.fetchReportsAccountingAccountStatement,{params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      q: params.q,
      accountCode: params.accountCode,
      partyId: params.partyId,
    }});
}
/** Get a miscellaneous debtor or creditor ledger. Existing HTTP contract. */
export async function fetchReportsAccountingContactLedger(
  params: SearchReportsAccountingContactLedgerRequest,
): Promise<AccountStatementResponse> {
  return await apiClient.get<AccountStatementResponse>(ENDPOINTS.fetchReportsAccountingContactLedger,{params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      q: params.q,
      accountCode: params.accountCode,
      contactId: params.contactId,
    }});
}
