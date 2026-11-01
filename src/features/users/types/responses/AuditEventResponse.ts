export type AuditEventResponse = {
  id: string;
  date: string;
  action: string;
  reference: string;
  [key: string]: unknown;
};
