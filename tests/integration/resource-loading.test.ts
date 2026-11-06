import { describe, it, expect } from 'vitest';
import { readAllPages } from '@/core/api/readAllPages';
import { customersQuery } from '@/features/parties/queries/customers-query';
import { affectedOwners } from '@/core/query/invalidation';
import type { ReadPage } from '@/core/types/api/ReadPage';

const scope = { bookId: 'main', branchId: '', baseCurrency: 'YER', revision: 7 };

function page(n: number, items: number[], total = 3): ReadPage<number> {

  return {
    items,
    scope,
    pagination: { page: n, pageSize: 200, totalItems: total, totalPages: 2, hasNextPage: n === 1 },
  };
}

describe('explicit complete reads used by existing ledger calculations', () => {
  it('loads every page and keeps book scope', async () => {
    const calls: unknown[] = [];
    const result = await readAllPages(
      async (params) => {
        calls.push(params);
        return params.page === 1 ? page(1, [1, 2]) : page(2, [3]);
      },
      { bookId: 'main' },
    );
    expect(result.items).toEqual([1, 2, 3]);
    expect(calls).toEqual([
      { bookId: 'main', page: 1, pageSize: 200 },
      { bookId: 'main', page: 2, pageSize: 200 },
    ]);
  });
  it('rejects a different book in the first response', async () => {
    await expect(
      readAllPages(async () => page(1, [1, 2, 3]), { bookId: 'another' }),
    ).rejects.toThrow('نطاق');
  });
  it('rejects a truncated collection', async () => {
    await expect(
      readAllPages(
        async () => ({
          ...page(1, [1]),
          pagination: { ...page(1, [1]).pagination, hasNextPage: false },
        }),
        {},
      ),
    ).rejects.toThrow('إجمالي');
  });
  it.each(['revision', 'bookId', 'branchId', 'baseCurrency'] as const)(
    'rejects changed %s between pages',
    async (field) => {
      await expect(
        readAllPages(
          async (params) => ({
            ...page(params.page!, params.page === 1 ? [1, 2] : [3]),
            scope: {
              ...scope,
              [field]: params.page === 1 ? scope[field] : field === 'revision' ? 8 : 'changed',
            },
          }),
          {},
        ),
      ).rejects.toThrow('تغيرت');
    },
  );
  it('rejects a page with the wrong index', async () => {
    await expect(readAllPages(async () => page(2, [1, 2, 3]), {})).rejects.toThrow('غير مكتملة');
  });
  it('stops before issuing HTTP when cancelled', async () => {
    const controller = new AbortController();
    controller.abort();
    let calls = 0;
    await expect(
      readAllPages(
        async () => {
          calls++;
          return page(1, []);
        },
        {},
        controller.signal,
      ),
    ).rejects.toMatchObject({ name: 'AbortError' });
    expect(calls).toBe(0);
  });
  it('separates users, books and locales, while preserving authorized-book calculation scope', () => {
    const scope = { userId: 'a', userKind: 'local', bookId: 'main', branchId: 'b1', locale: 'ar' };
    for (const change of [{ userId: 'b' }, { bookId: 'archive' }, { locale: 'en' }])
      expect(customersQuery(scope).queryKey).not.toEqual(
        customersQuery({ ...scope, ...change }).queryKey,
      );
    expect(customersQuery(scope).queryKey).toEqual(
      customersQuery({ ...scope, branchId: 'b2' }).queryKey,
    );
  });
  it('invalidates ledger and stock effects of an invoice', () => {
    expect(affectedOwners('invoice')).toEqual(
      expect.arrayContaining([
        'accounting',
        'inventory',
        'customers',
        'suppliers',
        'sales',
        'purchases',
        'dashboard',
      ]),
    );
    expect(affectedOwners('periodSwitch')).toBeNull();
  });
});
