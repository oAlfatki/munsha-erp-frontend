export interface UserSessionsPage {
  items: {
    id: string;
    deviceName?: string;
    browser?: string;
    isCurrent: boolean;
    lastActivityAtUtc?: string;
    createdAtUtc: string;
    expiresAtUtc: string;
  }[];
  page: number;
  pageSize: number;
  totalCount: number;
}
