import type { ReadPage } from '@/core/types/api/ReadPage';
import type { ReadParams } from '@/core/types/api/ReadParams';

/** Complete collection reads are explicit only for existing client calculations and all-row export. */

export async function readAllPages<T>(
  read: (params: ReadParams) => Promise<ReadPage<T>>,
  params: ReadParams,
  signal?: AbortSignal,
): Promise<ReadPage<T>> {

  let result: ReadPage<T> | undefined;
  const items: T[] = [];
  for (let page = 1; page <= 1000; page++) {
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
    const next = await read({ ...params, page, pageSize: 200 });
    if (
      !Array.isArray(next.items) ||
      !next.pagination ||
      !next.scope ||
      next.pagination.page !== page
    )
      throw Error('استجابة قائمة غير مكتملة من الخادم');
    if (
      (params.bookId && next.scope.bookId !== params.bookId) ||
      (params.branchId && next.scope.branchId !== params.branchId)
    )
      throw Error('نطاق البيانات المستلمة لا يطابق الطلب');
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
