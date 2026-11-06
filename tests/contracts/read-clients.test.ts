import { afterEach, it, expect, vi } from 'vitest';
import { axiosInstance as apiClient } from '@/core/api/apiClient';
import {
  fetchCustomers as readCustomers,
  fetchCustomersById as readCustomersById,
} from '@/features/parties/api/customers-read-api';

const original = apiClient.defaults.adapter;
afterEach(() => {
  apiClient.defaults.adapter = original;
  vi.unstubAllGlobals();
});
it('reads filtered customer DTOs from serialized HTTP without mutating the server fixture', async () => {
  vi.stubGlobal('document', { documentElement: { lang: 'en' } });
  const data = {
    items: [
      { id: 'c1', kind: 'customer', name: 'Customer', phone: '', currency: 'YER', active: true },
    ],
    pagination: { page: 1, pageSize: 50, totalItems: 1, totalPages: 1, hasNextPage: false },
    scope: { bookId: 'book-2026', branchId: 'b1', baseCurrency: 'YER', revision: 7 },
  };
  apiClient.defaults.adapter = async (config) => {
    expect(config.method).toBe('get');
    expect(config.url).toBe('/customers');
    expect(config.params.q).toBe('Customer');
    return {
      data: JSON.stringify({
        isSuccess: true,
        data,
        meta: { apiVersion: '1.0', requestId: 'test' },
      }),
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    };
  };
  const response = await readCustomers({ q: 'Customer', active: true });
  expect(response.items[0].name).toBe('Customer');
  response.items[0].name = 'Edited';
  expect(data.items[0].name).toBe('Customer');
});
it('encodes detail identifiers as a single path segment', async () => {
  vi.stubGlobal('document', { documentElement: { lang: 'en' } });
  apiClient.defaults.adapter = async (config) => {
    expect(config.url).toBe('/customers/c%2F1');
    expect(config.params).not.toHaveProperty('id');
    return {
      data: { isSuccess: true, data: { id: 'c/1' }, meta: {} },
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    };
  };
  await expect(readCustomersById({ id: 'c/1' })).resolves.toMatchObject({ id: 'c/1' });
});
