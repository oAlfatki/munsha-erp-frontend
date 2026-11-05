export interface Identity {
  userId: string;
  username: string;
  displayName: string;
  fullName: string;
  email: string;
  branchId: string;
  sessionId?: string;
  permissions: { moduleCode: string; mask: string }[];
}
