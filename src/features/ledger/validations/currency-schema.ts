import { fieldTypeError, finiteTypeError } from '@/core/validation/type-errors';
import { z } from 'zod';

export const currencySchema = z
  .object({
    name: z
      .string({
        error: fieldTypeError('الاسم مطلوب', 'أدخل قيمة صحيحة في الاسم'),
      })
      .min(1, 'الاسم يجب ألا يقل عن 1')
      .max(200, 'الاسم يجب ألا يزيد عن 200'),
    code: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .regex(new RegExp('^[A-Z]{3}$'), 'صيغة القيمة المدخلة غير صحيحة'),
    date: z
      .string({
        error: fieldTypeError('التاريخ مطلوب', 'أدخل قيمة صحيحة في التاريخ'),
      })
      .regex(new RegExp('^\\d{4}-\\d{2}-\\d{2}$'), 'صيغة التاريخ غير صحيحة'),
    rate: z.preprocess(
      (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
      z
        .number({
          error: finiteTypeError(
            'سعر الصرف مطلوب',
            'أدخل قيمة صحيحة في سعر الصرف',
            'أدخل قيمة صحيحة في سعر الصرف',
          ),
        })
        .gt(0, 'سعر الصرف يجب أن يكون أكبر من 0'),
    ),
    source: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1')
      .max(200, 'القيمة المدخلة يجب ألا يزيد عن 200'),
  })
  .loose();
