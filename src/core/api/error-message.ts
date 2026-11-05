import { ApiError } from './apiError';
export function errorMessage(error: unknown) {
  if (error instanceof ApiError) {
    if (error.code === 'CONCURRENCY_CONFLICT')
      return 'عدّل مستخدم آخر هذه البيانات؛ أعد تحميلها قبل المحاولة مجددًا.';
    if (error.code === 'DUPLICATE_USERNAME') return 'اسم المستخدم مستخدم بالفعل.';
    if (error.status === 401) return 'انتهت صلاحية الجلسة؛ سجّل الدخول مجددًا.';
    if (error.status === 403) return 'لا تملك صلاحية تنفيذ هذه العملية.';
    if (error.status === 404) return 'البيانات المطلوبة غير موجودة.';
    if (error.status === 0) return 'تعذر الاتصال بالخادم؛ تحقق من الاتصال ثم أعد المحاولة.';
    if (error.status >= 500) return 'تعذر إتمام الطلب بسبب مشكلة في الخادم؛ حاول لاحقًا.';
    if (/[\u0600-\u06ff]/.test(error.message)) return error.message;
    return 'تعذر تنفيذ الطلب؛ راجع البيانات ثم أعد المحاولة.';
  }
  return error instanceof Error && /[\u0600-\u06ff]/.test(error.message)
    ? error.message
    : 'تعذر تنفيذ الطلب؛ حاول مجددًا.';
}
