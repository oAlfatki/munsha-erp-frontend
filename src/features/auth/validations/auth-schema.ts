import { z } from 'zod';
export const loginSchema = z.object({
  username: z.string({ required_error: 'اسم المستخدم مطلوب' }).trim().min(1, 'اسم المستخدم إجباري'),
  password: z.string({ required_error: 'كلمة المرور مطلوبة' }).min(1, 'كلمة المرور إجبارية'),
});
