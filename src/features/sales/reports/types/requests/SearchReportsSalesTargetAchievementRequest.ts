export interface SearchReportsSalesTargetAchievementRequest {
  page?: number;
  pageSize?: number;
  bookId?: string;
  branchId: string;
  from?: string;
  to?: string;
  q?: string;
  employeeId?: string;
  period?: string;
}
