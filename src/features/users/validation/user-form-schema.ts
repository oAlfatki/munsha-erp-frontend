import { z } from 'zod';
export const userFormSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().trim().min(1, 'اسم المستخدم الكامل إجباري'),
    username: z.string(),
    password: z.string(),
    role: z
      .string()
      .refine((role) => ['admin', 'staff', 'viewer'].includes(role), 'اختر صلاحية صحيحة'),
    active: z.boolean(),
  })
  .superRefine((input, ctx) => {
    if (!input.id && !input.username.trim())
      ctx.addIssue({ code: 'custom', path: ['username'], message: 'اسم الدخول إجباري' });
    if (!input.id && (input.password.length < 10 || input.password.length > 128))
      ctx.addIssue({
        code: 'custom',
        path: ['password'],
        message: 'كلمة المرور المؤقتة يجب أن تكون بين 10 و128 حرفًا',
      });
  });
export const resetPasswordSchema = z.object({
  id: z.string().min(1, 'اختر المستخدم'),
  password: z
    .string()
    .min(10, 'كلمة المرور المؤقتة يجب ألا تقل عن 10 أحرف')
    .max(128, 'كلمة المرور تتجاوز 128 حرفًا'),
});
