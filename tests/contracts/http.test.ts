import { describe, it, expect, afterEach, vi } from 'vitest';
import type { AxiosResponse } from 'axios';
import { apiClient as transport, axiosInstance as apiClient } from '@/core/api/apiClient';
import { ApiError } from '@/core/api/apiError';

const original = apiClient.defaults.adapter;
afterEach(() => {
  apiClient.defaults.adapter = original;
  vi.unstubAllGlobals();
});
describe('HTTP result and Problem Details boundary', () => {
  it('unwraps a successful Result before returning to services', async () => {
    vi.stubGlobal('document', { documentElement: { lang: 'ar' } });
    apiClient.defaults.adapter = async (config) => ({
      data: { isSuccess: true, data: { id: 'customer-1' }, meta: { requestId: 'request-1' } },
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    });
    await expect(transport.get('/contract-fixture')).resolves.toEqual({ id: 'customer-1' });
  });
  it('supports the current unwrapped compatibility response', async () => {
    vi.stubGlobal('document', { documentElement: { lang: 'ar' } });
    apiClient.defaults.adapter = async (config) => ({
      data: { revision: 4 },
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    });
    await expect(transport.get('/contract-fixture')).resolves.toEqual({ revision: 4 });
  });
  it('normalizes ASP.NET validation dictionaries into field errors', () => {
    const error = new ApiError(
      {
        title: 'Validation failed',
        status: 400,
        traceId: 'trace-1',
        errors: { Name: ['Required'], 'Lines.0.Qty': ['Must be positive'] },
      },
      400,
    );
    expect(error.status).toBe(400);
    expect(error.traceId).toBe('trace-1');
    expect(error.errors).toEqual([
      { pointer: '/Name', detail: 'Required' },
      { pointer: '/Lines/0/Qty', detail: 'Must be positive' },
    ]);
  });
  it('preserves RFC field-error arrays and stable codes', () => {
    const errors = [{ pointer: '/data/name', code: 'REQUIRED', detail: 'Required' }];
    const error = new ApiError(
      { detail: 'Invalid request', code: 'VALIDATION_ERROR', errors },
      422,
    );
    expect(error.errors).toEqual(errors);
    expect(error.code).toBe('VALIDATION_ERROR');
  });
  it('does not accept a failure returned as HTTP 200 as successful data', async () => {
    vi.stubGlobal('document', { documentElement: { lang: 'ar' } });
    apiClient.defaults.adapter = async (config) => ({
      data: { isSuccess: false, title: 'Failure' },
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    });
    await expect(transport.get('/contract-fixture')).rejects.toBeInstanceOf(ApiError);
  });
});
