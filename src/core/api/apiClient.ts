import { ApiError } from '@/core/api/apiError';
import {
  expireSession,
  hasSessionRefresh,
  refreshSession,
  sessionGeneration,
} from '@/core/api/session-transport';
import type { ProblemDetails } from '@/core/types/api/ProblemDetails';
import type { Result } from '@/core/types/api/Result';
import type { SessionRequestConfig } from '@/core/types/auth/SessionRequestConfig';
import axios from 'axios';
import { API_CONFIG } from './apiConfig';
export const axiosInstance = axios.create({
  ...API_CONFIG,
});
axiosInstance.interceptors.request.use((request) => {
  request.headers.set('Accept-Language', 'ar');
  if (typeof FormData !== 'undefined' && request.data instanceof FormData)
    request.headers.delete('Content-Type');
  (request as typeof request & { sessionGeneration?: number }).sessionGeneration ??=
    sessionGeneration();
  return request;
});
axiosInstance.interceptors.response.use(
  (response) => {
    const expected = (response.config as SessionRequestConfig).sessionGeneration;
    if (expected !== undefined && expected !== sessionGeneration())
      throw new axios.CanceledError('أُلغي الطلب لتغير الجلسة.');
    return response;
  },
  async (error) => {
    if (axios.isCancel(error)) return Promise.reject(error);
    const status = error.response?.status || 0;
    const request = error.config as
      | (SessionRequestConfig & {
          hasRetried?: boolean;
          skipSessionRefresh?: boolean;
          sessionGeneration?: number;
        })
      | undefined;
    const expected = request?.sessionGeneration ?? sessionGeneration();
    const isLogin = request?.url === '/auth/sign-in';
    if (
      status === 401 &&
      !isLogin &&
      expected === sessionGeneration() &&
      request &&
      !request.hasRetried &&
      !request.skipSessionRefresh &&
      hasSessionRefresh()
    ) {
      request.hasRetried = true;
      try {
        await refreshSession();
        if (expected !== sessionGeneration())
          throw new ApiError({ detail: 'انتهت الجلسة أثناء تنفيذ الطلب' }, 401);
        return await axiosInstance.request(request);
      } catch (refreshError) {
        if (refreshError instanceof ApiError && refreshError.status === 401)
          expireSession(expected);
        return Promise.reject(refreshError);
      }
    }
    if (status === 401 && !isLogin) expireSession(expected);
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
async function request<TData>(options: SessionRequestConfig): Promise<TData> {
  const { data, status } = await axiosInstance.request<TData | Result<TData> | ProblemDetails>(
    options,
  );
  if (data && typeof data === 'object' && 'isSuccess' in data) {
    if ((data as { isSuccess: boolean }).isSuccess === false)
      throw new ApiError(data as ProblemDetails, status >= 400 ? status : 500);
    return (data as Result<TData>).data;
  }
  return data as TData;
}

/** Feature endpoints choose verbs; one transport owns envelopes, cookies and errors. */
export const apiClient = {
  get: <TResponse = unknown>(url: string, config?: SessionRequestConfig) =>
    request<TResponse>({ ...config, url, method: 'GET' }),
  post: <TResponse = unknown, TBody = unknown>(
    url: string,
    data: TBody,
    config?: SessionRequestConfig,
  ) => request<TResponse>({ ...config, url, data, method: 'POST' }),
  put: <TResponse = unknown, TBody = unknown>(
    url: string,
    data: TBody,
    config?: SessionRequestConfig,
  ) => request<TResponse>({ ...config, url, data, method: 'PUT' }),
  patch: <TResponse = unknown, TBody = unknown>(
    url: string,
    data: TBody,
    config?: SessionRequestConfig,
  ) => request<TResponse>({ ...config, url, data, method: 'PATCH' }),
  delete: <TResponse = unknown>(url: string, config?: SessionRequestConfig) =>
    request<TResponse>({ ...config, url, method: 'DELETE' }),
};
