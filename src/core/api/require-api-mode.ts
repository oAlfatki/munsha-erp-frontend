import { CONFIG } from '@/core/config/env';
/** Preserve the existing command transport mode restriction without hiding HTTP verbs. */
export function requireCommandApi() {
  if (CONFIG.apiMode !== 'aspnet')
    throw Error('الواجهة المفصولة تتطلب عقد ASP.NET API؛ وضع site القديم غير مدعوم');
}
