import { z } from 'zod';
export const loginSchema = z.object({
  username: z
    .string({
      required_error: 'اسم المستخدم مطلوب',
      invalid_type_error: 'أدخل قيمة صحيحة في اسم المستخدم',
    })
    .trim()
    .min(1, 'اسم المستخدم إجباري')
    .max(60, 'اسم المستخدم يجب ألا يزيد عن 60'),
  password: z
    .string({
      required_error: 'كلمة المرور مطلوب',
      invalid_type_error: 'أدخل قيمة صحيحة في كلمة المرور',
    })
    .min(1, 'كلمة المرور إجبارية')
    .max(128, 'كلمة المرور يجب ألا يزيد عن 128'),
});
