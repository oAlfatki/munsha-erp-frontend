import { z } from 'zod';

export const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(1, 'كلمة المرور الحالية مطلوبة'),
    newPassword: z.string().min(1, 'كلمة المرور الجديدة مطلوبة'),
    confirm: z.string().min(1, 'تأكيد كلمة المرور مطلوب'),
  })
  .refine((v) => v.newPassword === v.confirm, {
    path: ['confirm'],
    message: 'تأكيد كلمة المرور غير مطابق',
  });
