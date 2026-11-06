export type SaveBackupSettingsRequest = {
  mode: 'off' | 'interval' | 'daily' | 'exit';
  hours: number;
  time: string;
  folder: string;
  retention: number;
};
