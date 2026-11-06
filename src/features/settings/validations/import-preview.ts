import { importMastersSchema } from '@/features/organization/public';
import type { ValidateImportPreviewContext } from '@/features/settings/types/read-models/ValidateImportPreviewContext';

export function validateImportPreview(state: ValidateImportPreviewContext, input: unknown) {

  const valueSchema = importMastersSchema.parse(input);
  const names = new Set<string>();
  for (const row of valueSchema.rows) {
    const name = (row.name || '').trim().toLowerCase();
    if (!name || names.has(name)) throw new Error('اسم فارغ أو مكرر داخل الملف');
    names.add(name);
    if (valueSchema.kind === 'product') {
      if (state.products.some((product) => product.name.toLowerCase() === name))
        throw new Error('الصنف موجود: ' + row.name);
      for (const key of ['purchase', 'retail', 'wholesale', 'min'])
        if (!Number.isFinite(Number(row[key] || 0)) || Number(row[key] || 0) < 0)
          throw new Error('قيمة رقمية غير صحيحة');
      if (
        row.barcode &&
        state.products.some((product) => product.units.some((u) => u.barcode === row.barcode))
      )
        throw new Error('الباركود مستخدم');
    } else {
      if (
        state.parties.some(
          (party) => party.kind === valueSchema.kind && party.name.toLowerCase() === name,
        )
      )
        throw new Error('الطرف موجود: ' + row.name);
      if (row.currency && !state.currencies.some((c) => c.code === row.currency))
        throw new Error('عملة غير معرّفة');
    }
  }
  return valueSchema;
}
