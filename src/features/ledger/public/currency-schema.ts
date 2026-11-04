import { z } from 'zod';
export const currencySchema = z
  .object({
    name: z
      .string({ required_error: 'الاسم مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في الاسم' })
      .min(1, 'الاسم يجب ألا يقل عن 1')
      .max(200, 'الاسم يجب ألا يزيد عن 200'),
    code: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .regex(new RegExp('^[A-Z]{3}$'), 'صيغة القيمة المدخلة غير صحيحة'),
    date: z
      .string({ required_error: 'التاريخ مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في التاريخ' })
      .regex(new RegExp('^\\d{4}-\\d{2}-\\d{2}$'), 'صيغة التاريخ غير صحيحة'),
    rate: z.preprocess(
      (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
      z
        .number({
          required_error: 'سعر الصرف مطلوب',
          invalid_type_error: 'أدخل قيمة صحيحة في سعر الصرف',
        })
        .finite('أدخل قيمة صحيحة في سعر الصرف')
        .gt(0, 'سعر الصرف يجب أن يكون أكبر من 0'),
    ),
    source: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1')
      .max(200, 'القيمة المدخلة يجب ألا يزيد عن 200'),
  })
  .passthrough();
