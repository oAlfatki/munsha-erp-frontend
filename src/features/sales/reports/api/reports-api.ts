import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/config/endpoints';
import type { SearchReportsSalesChartRequest } from '@/features/sales/reports/types/requests/SearchReportsSalesChartRequest';
import type { SearchReportsSalesReturnsRequest } from '@/features/sales/reports/types/requests/SearchReportsSalesReturnsRequest';
import type { SearchReportsSalesSummaryRequest } from '@/features/sales/reports/types/requests/SearchReportsSalesSummaryRequest';
import type { SearchReportsSalesTargetAchievementRequest } from '@/features/sales/reports/types/requests/SearchReportsSalesTargetAchievementRequest';
import type { SalesChartReport } from '@/features/sales/reports/types/responses/SalesChartReport';
import type { SalesReturnsReport } from '@/features/sales/reports/types/responses/SalesReturnsReport';
import type { SalesSummaryReport } from '@/features/sales/reports/types/responses/SalesSummaryReport';
import type { TargetAchievementReport } from '@/features/sales/reports/types/responses/TargetAchievementReport';
export async function fetchReportsSalesSummary(
  params: SearchReportsSalesSummaryRequest,
): Promise<SalesSummaryReport> {
  return await apiClient.get<SalesSummaryReport>(ENDPOINTS.fetchReportsSalesSummary, {
    params: {
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
    },
  });
}
export async function fetchReportsSalesReturns(
  params: SearchReportsSalesReturnsRequest,
): Promise<SalesReturnsReport> {
  return await apiClient.get<SalesReturnsReport>(ENDPOINTS.fetchReportsSalesReturns, {
    params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      q: params.q,
      partyId: params.partyId,
      currency: params.currency,
    },
  });
}
export async function fetchReportsSalesChart(
  params: SearchReportsSalesChartRequest,
): Promise<SalesChartReport> {
  return await apiClient.get<SalesChartReport>(ENDPOINTS.fetchReportsSalesChart, {
    params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      q: params.q,
    },
  });
}
export async function fetchReportsSalesTargetAchievement(
  params: SearchReportsSalesTargetAchievementRequest,
): Promise<TargetAchievementReport> {
  return await apiClient.get<TargetAchievementReport>(
    ENDPOINTS.fetchReportsSalesTargetAchievement,
    {
      params: {
        page: params.page,
        pageSize: params.pageSize,
        bookId: params.bookId,
        branchId: params.branchId,
        from: params.from,
        to: params.to,
        q: params.q,
        employeeId: params.employeeId,
        period: params.period,
      },
    },
  );
}
