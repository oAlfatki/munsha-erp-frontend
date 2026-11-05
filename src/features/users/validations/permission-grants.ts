import type { PermissionMask } from '@/features/users/type';
/** Conservative UI limit; the server still enforces its full delegation policy. */
export function assertGrantable(
  next: PermissionMask[],
  own: PermissionMask[],
  previous: PermissionMask[] = [],
) {
  const seen = new Set<string>();
  for (const item of next) {
    if (seen.has(item.moduleCode) || !/^(0|[1-9][0-9]*)$/.test(item.mask))
      throw Error('الصلاحيات المدخلة غير صحيحة.');
    seen.add(item.moduleCode);
    const mask = BigInt(item.mask);
    if (mask >= 1n << 64n) throw Error('قيمة الصلاحيات تتجاوز النطاق المسموح.');
    const existing = BigInt(previous.find((p) => p.moduleCode === item.moduleCode)?.mask || '0');
    const allowed = BigInt(own.find((p) => p.moduleCode === item.moduleCode)?.mask || '0');
    if ((mask & ~existing & ~allowed) !== 0n)
      throw Error('لا يمكنك منح صلاحيات غير مسموح لك بمنحها.');
  }
}
