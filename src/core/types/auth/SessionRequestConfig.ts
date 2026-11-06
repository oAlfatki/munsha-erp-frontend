import type { AxiosRequestConfig } from 'axios';

export interface SessionRequestConfig extends AxiosRequestConfig {
  skipSessionRefresh?: boolean;
  sessionGeneration?: number;
}
