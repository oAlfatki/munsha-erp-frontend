import { z } from 'zod';
export const partyFormSchema = z.object({
  id: z
    .string({
      required_error: 'القيمة المدخلة مطلوب',
      invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
    })
    .optional(),
  kind: z.enum(['customer', 'supplier'], {
    errorMap: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }),
  }),
  groupId: z
    .string({
      required_error: 'القيمة المدخلة مطلوب',
      invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
    })
    .optional(),
  name: z
    .string({ required_error: 'الاسم مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في الاسم' })
    .trim()
    .min(1, 'اسم الطرف إجباري')
    .max(180, 'الاسم يجب ألا يزيد عن 180'),
  address: z
    .string({
      required_error: 'القيمة المدخلة مطلوب',
      invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
    })
    .max(200, 'القيمة المدخلة يجب ألا يزيد عن 200'),
  phone: z
    .string({
      required_error: 'رقم الهاتف مطلوب',
      invalid_type_error: 'أدخل قيمة صحيحة في رقم الهاتف',
    })
    .max(40, 'رقم الهاتف يجب ألا يزيد عن 40'),
  currency: z
    .string({ required_error: 'العملة مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في العملة' })
    .min(1, 'اختر العملة'),
  priceType: z.enum(['retail', 'wholesale'], {
    errorMap: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }),
  }),
  limit: z
    .number({
      required_error: 'سقف الحساب مطلوب',
      invalid_type_error: 'أدخل قيمة صحيحة في سقف الحساب',
    })
    .finite('أدخل قيمة صحيحة في سقف الحساب')
    .nonnegative('سقف الحساب لا يكون سالبًا'),
  active: z.boolean({
    required_error: 'القيمة المدخلة مطلوب',
    invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
  }),
});
