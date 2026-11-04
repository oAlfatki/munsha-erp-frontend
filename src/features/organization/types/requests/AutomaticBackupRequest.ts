export interface AutomaticBackupRequest {
  event: 'timer' | 'exit';
  requestId: string;
}
