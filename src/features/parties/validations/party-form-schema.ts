import { fieldTypeError, finiteTypeError } from '@/core/validation/type-errors';
import { z } from 'zod';

export const partyFormSchema = z.object({
  id: z
    .string({
      error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
    })
    .optional(),
  kind: z.enum(['customer', 'supplier'], {
    error: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }),
  }),
  groupId: z
    .string({
      error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
    })
    .optional(),
  name: z
    .string({
      error: fieldTypeError('الاسم مطلوب', 'أدخل قيمة صحيحة في الاسم'),
    })
    .trim()
    .min(1, 'اسم الطرف إجباري')
    .max(180, 'الاسم يجب ألا يزيد عن 180'),
  address: z
    .string({
      error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
    })
    .max(200, 'القيمة المدخلة يجب ألا يزيد عن 200'),
  phone: z
    .string({
      error: fieldTypeError('رقم الهاتف مطلوب', 'أدخل قيمة صحيحة في رقم الهاتف'),
    })
    .max(40, 'رقم الهاتف يجب ألا يزيد عن 40'),
  currency: z
    .string({
      error: fieldTypeError('العملة مطلوب', 'أدخل قيمة صحيحة في العملة'),
    })
    .min(1, 'اختر العملة'),
  priceType: z.enum(['retail', 'wholesale'], {
    error: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }),
  }),
  limit: z
    .number({
      error: finiteTypeError(
        'سقف الحساب مطلوب',
        'أدخل قيمة صحيحة في سقف الحساب',
        'أدخل قيمة صحيحة في سقف الحساب',
      ),
    })
    .nonnegative('سقف الحساب لا يكون سالبًا'),
  active: z.boolean({
    error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
  }),
});
