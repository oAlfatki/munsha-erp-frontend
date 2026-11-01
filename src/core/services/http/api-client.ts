import { ENDPOINTS } from '@/core/config/endpoints';
import { CONFIG } from '@/core/config/env';
import { ApiError } from '@/core/services/http/api-error';
import type { ProblemDetails } from '@/core/types/ProblemDetails';
import type { Result } from '@/core/types/Result';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
export const apiClient = axios.create({
  baseURL: CONFIG.apiBaseUrl,
  withCredentials: true,
  timeout: 30000,
  headers: { Accept: 'application/json, application/problem+json' },
});
let refreshFlight: Promise<unknown> | null = null;
apiClient.interceptors.request.use((request) => {
  request.headers.set('Accept-Language', document.documentElement.lang || 'ar');
  if (request.data instanceof FormData) request.headers.delete('Content-Type');
  return request;
});
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status || 0,
      request = error.config as (AxiosRequestConfig & { hasRetried?: boolean }) | undefined;
    const isPublicAuth = !!request?.url && /\/(login|refresh-token)$/.test(request.url);
    if (
      status === 401 &&
      CONFIG.apiMode === 'aspnet' &&
      CONFIG.sessionRefresh &&
      request &&
      !request.hasRetried &&
      !isPublicAuth
    ) {
      request.hasRetried = true;
      try {
        if (!refreshFlight)
          refreshFlight = apiClient.post(ENDPOINTS.authRefresh).finally(() => {
            refreshFlight = null;
          });
        await refreshFlight;
        return await apiClient.request(request);
      } catch {
        /* Normalize the original error below. */
      }
    }
    if (status === 401 && !isPublicAuth) window.dispatchEvent(new Event('auth:unauthorized'));
    const raw = error.response?.data as (ProblemDetails & { error?: string }) | undefined;
    return Promise.reject(
      new ApiError(
        {
          ...raw,
          detail:
            raw?.detail ||
            raw?.error ||
            raw?.title ||
            (status ? 'تعذر تنفيذ الطلب' : 'تعذر الاتصال بالخادم'),
        },
        status,
      ),
    );
  },
);
export async function apiRequest<TData>(options: AxiosRequestConfig): Promise<TData> {
  const { data, status } = await apiClient.request<TData | Result<TData> | ProblemDetails>(options);
  if (data && typeof data === 'object' && 'isSuccess' in data) {
    if ((data as { isSuccess: boolean }).isSuccess === false)
      throw new ApiError(data as ProblemDetails, status >= 400 ? status : 500);
    return (data as Result<TData>).data;
  }
  return data as TData;
}
