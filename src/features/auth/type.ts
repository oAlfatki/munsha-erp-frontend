export interface LoginInput {
  username: string;
  password: string;
}
export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
  confirm: string;
}
export interface SessionSummary {
  id: string;
  createdAtUtc: string;
  lastActivityAtUtc?: string;
  expiresAtUtc: string;
  isCurrent: boolean;
  deviceName?: string | null;
  browser?: string | null;
  ipAddressMasked?: string | null;
  revokedAtUtc?: string | null;
}
export interface SessionsPage {
  items: SessionSummary[];
  page: number;
  pageSize: number;
  totalCount: number;
}
export interface StatusResponse {
  code: string;
  message: string;
}
