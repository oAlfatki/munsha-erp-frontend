import { z } from 'zod';

export const permissionMaskSchema = z.object({
  moduleCode: z.string().min(1),
  mask: z
    .string()
    .refine(
      (value) => /^(0|[1-9][0-9]*)$/.test(value) && BigInt(value) < 1n << 64n,
      'قيمة الصلاحيات غير صحيحة أو تتجاوز النطاق المسموح',
    ),
});
export const permissionMasksSchema = z.array(permissionMaskSchema).superRefine((items, context) => {
  const seen = new Set<string>();
  for (const item of items) {
    if (seen.has(item.moduleCode))
      context.addIssue({ code: 'custom', message: 'تعريف أقسام الصلاحيات مكرر.' });
    seen.add(item.moduleCode);
  }
});
