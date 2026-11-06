import { fieldTypeError, finiteTypeError } from '@/core/validation/type-errors';
import { z } from 'zod';

export const partySchema = z
  .object({
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
      .max(100, 'القيمة المدخلة يجب ألا يزيد عن 100')
      .optional(),
    name: z
      .string({
        error: fieldTypeError('الاسم مطلوب', 'أدخل قيمة صحيحة في الاسم'),
      })
      .min(1, 'الاسم يجب ألا يقل عن 1')
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
      .min(1, 'العملة يجب ألا يقل عن 1')
      .max(180, 'العملة يجب ألا يزيد عن 180'),
    priceType: z.enum(['retail', 'wholesale'], {
      error: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }),
    }),
    limit: z.preprocess(
      (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
      z
        .number({
          error: finiteTypeError(
            'سقف الحساب مطلوب',
            'أدخل قيمة صحيحة في سقف الحساب',
            'أدخل قيمة صحيحة في سقف الحساب',
          ),
        })
        .min(0, 'سقف الحساب يجب ألا يقل عن 0'),
    ),
    active: z.boolean({
      error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
    }),
  })
  .loose();
