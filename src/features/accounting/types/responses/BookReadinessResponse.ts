export type BookReadinessResponse = {
  bookId: string;
  canActivate: boolean;
  checks: Array<{
    code: string;
    passed: boolean;
    message: string;
  }>;
  sourceVersion: number;
  stockDone: boolean;
  accountsDone: boolean;
};
