import { CONFIG } from '@/core/config/env';
export const API_CONFIG={baseURL:CONFIG.apiBaseUrl,timeout:30000,withCredentials:true,headers:{Accept:'application/json, application/problem+json'},apiMode:CONFIG.apiMode,sessionRefresh:CONFIG.sessionRefresh};
