import { ApiError } from '@/core/api/apiError';
import { sessionGeneration } from '@/core/api/session-transport';
import { authApi } from '@/features/auth/api/auth-api';
/** The contract has individual DELETE operations; this is deliberately non-atomic. */
export async function revokeOtherSessions() {
  const expected = sessionGeneration();
  const sessions = new Map<string, boolean>();
  let page = 1,
    total = 0;
  const check = () => {
    if (expected !== sessionGeneration())
      throw new ApiError({ detail: 'تغيرت الجلسة؛ أُوقفت العملية.' }, 401);
  };
  do {
    check();
    const result = await authApi.sessions(page);
    check();
    if (
      result.page !== page ||
      result.pageSize < 1 ||
      result.totalCount < 0 ||
      result.items.length > result.pageSize
    )
      throw Error('تعذر التحقق من قائمة الجلسات.');
    if (page > 1 && result.totalCount !== total)
      throw Error('تغيرت قائمة الجلسات؛ أعد تحميلها قبل المحاولة.');
    total = result.totalCount;
    for (const session of result.items) {
      if (sessions.has(session.id)) throw Error('قائمة الجلسات تحتوي قيماً مكررة.');
      sessions.set(session.id, session.isCurrent);
    }
    if (!result.items.length && sessions.size < total) throw Error('قائمة الجلسات غير مكتملة.');
    page++;
  } while (sessions.size < total);
  if (sessions.size !== total || ![...sessions.values()].some(Boolean))
    throw Error('تعذر تحديد الجلسة الحالية؛ لم تُنهَ أي جلسة.');
  let revokedCount = 0;
  for (const [id, isCurrent] of sessions) {
    if (isCurrent) continue;
    check();
    try {
      await authApi.revokeSession(id);
      revokedCount++;
    } catch {
      throw Error(
        `أُوقفت العملية بعد إنهاء ${revokedCount} جلسة؛ حدّث القائمة لمعرفة الجلسات المتبقية.`,
      );
    }
  }
  return { revokedCount };
}
