import type { DataResource } from '@/core/types/DataResource';
import type { ErpReadModel } from '@/core/types/ErpReadModel';
import type { ReadPage } from '@/core/types/ReadPage';
import type { ReadParams } from '@/core/types/ReadParams';
import type { ReadScope } from '@/core/types/ReadScope';
import type { ResourceResult } from '@/core/types/ResourceResult';

/** Explicit complete collection reads for the existing client-side accounting/report calculators.
 * A truncated page is never treated as a complete ledger. Each resource has its own query/cache.
 */
export async function readComplete<T>(
  read: (params: ReadParams) => Promise<ReadPage<T>>,
  params: ReadParams,
): Promise<ReadPage<T>> {
  let result: ReadPage<T> | undefined;
  const items: T[] = [];
  for (let page = 1; page <= 1000; page++) {
    const next = await read({ ...params, page, pageSize: 200 });
    if (
      !Array.isArray(next.items) ||
      !next.pagination ||
      !next.scope ||
      next.pagination.page !== page
    )
      throw Error('استجابة قائمة غير مكتملة من الخادم');
    if (
      result &&
      (next.scope.revision !== result.scope.revision ||
        next.scope.bookId !== result.scope.bookId ||
        next.scope.branchId !== result.scope.branchId ||
        next.scope.baseCurrency !== result.scope.baseCurrency ||
        next.pagination.totalItems !== result.pagination.totalItems)
    )
      throw Error('تغيرت البيانات أثناء تحميل الصفحات؛ حدّث القائمة وأعد المحاولة');
    result = next;
    items.push(...next.items);
    if (!next.pagination.hasNextPage) {
      if (items.length !== next.pagination.totalItems)
        throw Error('عدد السجلات المستلمة لا يطابق إجمالي الخادم');
      return { ...next, items };
    }
  }
  throw Error('حجم البيانات يتجاوز حد التحميل الآمن؛ استخدم نطاقًا أضيق');
}
export function collection<T>(
  owner: string,
  id: string,
  read: (params: ReadParams) => Promise<ReadPage<T>>,
  map: (items: T[], scope: ReadScope) => Partial<ErpReadModel>,
): DataResource {
  return {
    owner,
    id,
    read: async (params) => {
      const page = await readComplete(read, { ...params, branchId: undefined });
      return { patch: map(page.items, page.scope), scope: page.scope };
    },
  };
}
export function singleton<T>(
  owner: string,
  id: string,
  read: (params: ReadParams) => Promise<T>,
  map: (value: T) => Partial<ErpReadModel>,
): DataResource {
  return { owner, id, read: async (params) => ({ patch: map(await read(params)) }) };
}
export function records(name: string, items: unknown[]): Pick<ErpReadModel, 'extras'> {
  return {
    extras: {
      records: { [name]: items as NonNullable<ErpReadModel['extras']>['records'][string] },
      operations: [],
      drafts: {},
      preferences: {},
    },
  };
}
export function operations(items: unknown[]): Pick<ErpReadModel, 'extras'> {
  return {
    extras: {
      records: {},
      operations: items as NonNullable<ErpReadModel['extras']>['operations'],
      drafts: {},
      preferences: {},
    },
  };
}
export function mergeResources(results: ResourceResult[]): ErpReadModel | null {
  const state: Partial<ErpReadModel> = {
    branches: [],
    warehouses: [],
    products: [],
    parties: [],
    employees: [],
    stocks: [],
    invoices: [],
    invoiceReturns: [],
    entries: [],
    movements: [],
    expenses: [],
    audit: [],
    processed: [],
    currencies: [],
    roles: {},
    vouchers: [],
    expenseDocuments: [],
    stockDocuments: [],
    extras: { records: {}, operations: [], drafts: {}, preferences: {} },
  };
  for (const { patch } of results) {
    for (const [key, value] of Object.entries(patch)) {
      if (key === 'extras') {
        const extras = value as ErpReadModel['extras'];
        state.extras = {
          records: Object.fromEntries(
            [
              ...new Set([
                ...Object.keys(state.extras!.records),
                ...Object.keys(extras?.records || {}),
              ]),
            ].map((name) => [
              name,
              [...(state.extras!.records[name] || []), ...(extras?.records[name] || [])],
            ]),
          ),
          operations: [...state.extras!.operations, ...(extras?.operations || [])],
          drafts: { ...state.extras!.drafts, ...extras?.drafts },
          preferences: { ...state.extras!.preferences, ...extras?.preferences },
        };
      } else if (['parties', 'invoices', 'invoiceReturns'].includes(key)) {
        const old = state[key as 'parties'] || [];
        Object.assign(state, { [key]: [...old, ...(value as unknown[])] });
      } else Object.assign(state, { [key]: value });
    }
  }
  return state.organization ? (state as ErpReadModel) : null;
}
