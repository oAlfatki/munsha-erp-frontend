import { fieldTypeError } from '@/core/validation/type-errors';
import { z } from 'zod';

export const loginSchema = z.object({
  username: z
    .string({ error: fieldTypeError('اسم المستخدم مطلوب', undefined) })
    .trim()
    .min(1, 'اسم المستخدم إجباري'),
  password: z
    .string({ error: fieldTypeError('كلمة المرور مطلوبة', undefined) })
    .min(1, 'كلمة المرور إجبارية'),
});
