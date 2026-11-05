import { z } from 'zod';
export const userFormSchema = z
  .object({
    id: z.number().int().positive().optional(),
    fullName: z
      .string()
      .trim()
      .min(1, 'الاسم الكامل إجباري')
      .max(200, 'الاسم الكامل يتجاوز 200 حرف'),
    username: z
      .string()
      .trim()
      .min(1, 'اسم المستخدم إجباري')
      .max(100, 'اسم المستخدم يتجاوز 100 حرف'),
    password: z.string(),
    branchId: z.number().int().positive('اختر الفرع'),
    permissions: z.array(
      z.object({ moduleCode: z.string().min(1), mask: z.string().regex(/^(0|[1-9][0-9]*)$/) }),
    ),
    rowVersion: z.string().optional(),
  })
  .superRefine((v, ctx) => {
    if (!v.id) {
      if (!v.password)
        ctx.addIssue({ code: 'custom', path: ['password'], message: 'كلمة المرور مطلوبة' });
      if (!v.permissions.some((p) => BigInt(p.mask) > 0n))
        ctx.addIssue({
          code: 'custom',
          path: ['permissions'],
          message: 'اختر صلاحية واحدة على الأقل',
        });
    } else if (!v.rowVersion)
      ctx.addIssue({
        code: 'custom',
        path: ['rowVersion'],
        message: 'رمز نسخة البيانات غير متوفر من الخادم؛ لا يمكن الحفظ الآمن.',
      });
  });
export const resetPasswordSchema = z.object({
  id: z.number().int().positive(),
  newPassword: z.string().min(1, 'كلمة المرور الجديدة مطلوبة'),
});
