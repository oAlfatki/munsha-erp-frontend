import type { ApiMode } from '@/core/types/ApiMode';

const ENV = import.meta.env;
const MODE = ENV.VITE_API_MODE || 'aspnet';
if (!['site', 'aspnet'].includes(MODE)) throw new Error('VITE_API_MODE must be site or aspnet');
export const CONFIG = {
  apiMode: MODE as ApiMode,
  apiBaseUrl: (ENV.VITE_API_BASE_URL || (MODE === 'aspnet' ? '/api/v1' : '/api')).replace(
    /\/$/,
    '',
  ),
  sessionRefresh: ENV.VITE_AUTH_REFRESH === 'true',
};
