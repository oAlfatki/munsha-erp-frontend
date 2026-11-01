import { z } from 'zod';
export const partySchema = z
  .object({
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
      .max(100, 'القيمة المدخلة يجب ألا يزيد عن 100')
      .optional(),
    name: z
      .string({ required_error: 'الاسم مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في الاسم' })
      .min(1, 'الاسم يجب ألا يقل عن 1')
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
      .min(1, 'العملة يجب ألا يقل عن 1')
      .max(180, 'العملة يجب ألا يزيد عن 180'),
    priceType: z.enum(['retail', 'wholesale'], {
      errorMap: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }),
    }),
    limit: z.preprocess(
      (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
      z
        .number({
          required_error: 'سقف الحساب مطلوب',
          invalid_type_error: 'أدخل قيمة صحيحة في سقف الحساب',
        })
        .finite('أدخل قيمة صحيحة في سقف الحساب')
        .min(0, 'سقف الحساب يجب ألا يقل عن 0'),
    ),
    active: z.boolean({
      required_error: 'القيمة المدخلة مطلوب',
      invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
    }),
  })
  .passthrough();
