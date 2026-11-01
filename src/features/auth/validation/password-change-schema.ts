import { z } from 'zod';
export const passwordChangeSchema = z
  .object({
    current: z.string().min(1, 'كلمة المرور الحالية مطلوبة'),
    password: z
      .string()
      .min(10, 'كلمة المرور الجديدة يجب ألا تقل عن 10 أحرف')
      .max(128, 'كلمة المرور تتجاوز 128 حرفًا'),
    confirm: z.string().min(1, 'تأكيد كلمة المرور مطلوب'),
  })
  .refine((input) => input.password === input.confirm, {
    path: ['confirm'],
    message: 'تأكيد كلمة المرور غير مطابق',
  });
