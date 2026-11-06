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
