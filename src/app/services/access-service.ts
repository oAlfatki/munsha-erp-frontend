import type { AccessSnapshot } from '@/core/types/access/AccessSnapshot';
import type { Identity } from '@/core/types/auth/Identity';
import { fetchPermissionCatalog } from '@/features/users/public';

export async function readAccess(user: Identity, signal?: AbortSignal): Promise<AccessSnapshot> {

  const catalog = await fetchPermissionCatalog(signal);
  const grants: AccessSnapshot['grants'] = [];
  const codes = new Set<string>();
  const modules = new Set<string>();
  for (const module of catalog.modules) {
    if (modules.has(module.moduleCode)) throw Error('تعريف أقسام الصلاحيات مكرر.');
    modules.add(module.moduleCode);
    const masks = user.permissions.filter((p) => p.moduleCode === module.moduleCode);
    if (masks.length > 1) throw Error('صلاحيات الحساب غير متسقة.');
    const mask = BigInt(masks[0]?.mask || '0');
    const bits = new Set<string>();
    for (const definition of module.definitions) {
      const bit = BigInt(definition.bitValue);
      if (
        bit === 0n ||
        (bit & (bit - 1n)) !== 0n ||
        bits.has(definition.bitValue) ||
        codes.has(definition.code)
      )
        throw Error('تعريف الصلاحيات غير صالح.');
      bits.add(definition.bitValue);
      codes.add(definition.code);
      if ((mask & bit) === bit)
        grants.push({
          module: module.moduleCode,
          action: definition.code,
          branchIds: [user.branchId],
        });
    }
  }
  return { status: 'ready', grants };
}
