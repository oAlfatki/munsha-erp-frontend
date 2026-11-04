import { ApiError } from '@/core/api/apiError';
import { ENDPOINTS } from '@/core/config/endpoints';
import type { ProblemDetails } from '@/core/types/ProblemDetails';
import type { Result } from '@/core/types/Result';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { API_CONFIG } from './apiConfig';
export const axiosInstance = axios.create({
  ...API_CONFIG,
});
let refreshFlight: Promise<unknown> | null = null;
axiosInstance.interceptors.request.use((request) => {
  request.headers.set('Accept-Language', document.documentElement.lang || 'ar');
  if (request.data instanceof FormData) request.headers.delete('Content-Type');
  return request;
});
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status || 0,
      request = error.config as (AxiosRequestConfig & { hasRetried?: boolean }) | undefined;
    const isPublicAuth = !!request?.url && /\/(login|refresh-token)$/.test(request.url);
    if (
      status === 401 &&
      API_CONFIG.apiMode === 'aspnet' &&
      API_CONFIG.sessionRefresh &&
      request &&
      !request.hasRetried &&
      !isPublicAuth
    ) {
      request.hasRetried = true;
      try {
        if (!refreshFlight)
          refreshFlight = axiosInstance.post(ENDPOINTS.authRefresh).finally(() => {
            refreshFlight = null;
          });
        await refreshFlight;
        return await axiosInstance.request(request);
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
async function request<TData>(options: AxiosRequestConfig): Promise<TData> {
  const { data, status } = await axiosInstance.request<TData | Result<TData> | ProblemDetails>(options);
  if (data && typeof data === 'object' && 'isSuccess' in data) {
    if ((data as { isSuccess: boolean }).isSuccess === false)
      throw new ApiError(data as ProblemDetails, status >= 400 ? status : 500);
    return (data as Result<TData>).data;
  }
  return data as TData;
}

/** Feature endpoints choose verbs; one transport owns envelopes, cookies and errors. */
export const apiClient = {
 get: <TResponse=unknown>(url:string,config?:AxiosRequestConfig)=>request<TResponse>({...config,url,method:'GET'}),
 post: <TResponse=unknown,TBody=unknown>(url:string,data:TBody,config?:AxiosRequestConfig)=>request<TResponse>({...config,url,data,method:'POST'}),
 put: <TResponse=unknown,TBody=unknown>(url:string,data:TBody,config?:AxiosRequestConfig)=>request<TResponse>({...config,url,data,method:'PUT'}),
 patch: <TResponse=unknown,TBody=unknown>(url:string,data:TBody,config?:AxiosRequestConfig)=>request<TResponse>({...config,url,data,method:'PATCH'}),
 delete: <TResponse=unknown>(url:string,config?:AxiosRequestConfig)=>request<TResponse>({...config,url,method:'DELETE'}),
};
