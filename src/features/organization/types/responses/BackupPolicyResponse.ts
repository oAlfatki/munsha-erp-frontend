export type BackupPolicyResponse = {
  mode: 'off' | 'interval' | 'daily' | 'exit';
  hours: number;
  time: string;
  folder: string;
  retention: number;
  [key: string]: unknown;
};
