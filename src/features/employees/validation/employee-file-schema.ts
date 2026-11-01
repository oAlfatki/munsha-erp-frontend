import { z } from 'zod';
export const fileSchema = z
  .object({
    id: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1')
      .max(80, 'القيمة المدخلة يجب ألا يزيد عن 80'),
    name: z
      .string({ required_error: 'الاسم مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في الاسم' })
      .min(1, 'الاسم يجب ألا يقل عن 1')
      .max(160, 'الاسم يجب ألا يزيد عن 160'),
    type: z.enum(['application/pdf', 'image/png', 'image/jpeg'], {
      errorMap: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }),
    }),
    data: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .max(110000, 'القيمة المدخلة يجب ألا يزيد عن 110000')
      .regex(/^[A-Za-z0-9+/]+={0,2}$/, 'صيغة القيمة المدخلة غير صحيحة'),
  })
  .superRefine((v, ctx) => {
    const sig =
      v.type === 'application/pdf' ? 'JVBERi0' : v.type === 'image/png' ? 'iVBORw0KGgo' : '/9j/';
    if (!v.data.startsWith(sig))
      ctx.addIssue({ code: 'custom', message: 'محتوى الملف لا يطابق نوعه' });
  });
