import { fieldTypeError, finiteTypeError } from '@/core/validation/type-errors';
import { z } from 'zod';

export const expenseSchema = z
  .object({
    date: z
      .string({
        error: fieldTypeError('التاريخ مطلوب', 'أدخل قيمة صحيحة في التاريخ'),
      })
      .regex(new RegExp('^\\d{4}-\\d{2}-\\d{2}$'), 'صيغة التاريخ غير صحيحة'),
    branchId: z
      .string({
        error: fieldTypeError('الفرع مطلوب', 'أدخل قيمة صحيحة في الفرع'),
      })
      .min(1, 'الفرع يجب ألا يقل عن 1')
      .max(180, 'الفرع يجب ألا يزيد عن 180'),
    category: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1')
      .max(180, 'القيمة المدخلة يجب ألا يزيد عن 180'),
    description: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1')
      .max(180, 'القيمة المدخلة يجب ألا يزيد عن 180'),
    amount: z.preprocess(
      (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
      z
        .number({
          error: finiteTypeError(
            'المبلغ مطلوب',
            'أدخل قيمة صحيحة في المبلغ',
            'أدخل قيمة صحيحة في المبلغ',
          ),
        })
        .gt(0, 'المبلغ يجب أن يكون أكبر من 0'),
    ),
    currency: z
      .string({
        error: fieldTypeError('العملة مطلوب', 'أدخل قيمة صحيحة في العملة'),
      })
      .min(1, 'العملة يجب ألا يقل عن 1')
      .max(180, 'العملة يجب ألا يزيد عن 180'),
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
  })
  .loose();
export const expenseSaveSchema = z
  .object({
    id: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .optional(),
    date: z
      .string({
        error: fieldTypeError('التاريخ مطلوب', 'أدخل قيمة صحيحة في التاريخ'),
      })
      .regex(new RegExp('^\\d{4}-\\d{2}-\\d{2}$'), 'صيغة التاريخ غير صحيحة'),
    branchId: z
      .string({
        error: fieldTypeError('الفرع مطلوب', 'أدخل قيمة صحيحة في الفرع'),
      })
      .min(1, 'الفرع يجب ألا يقل عن 1')
      .max(300, 'الفرع يجب ألا يزيد عن 300'),
    typeId: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1')
      .max(300, 'القيمة المدخلة يجب ألا يزيد عن 300'),
    treatment: z.enum(['current', 'accrued', 'prepaid'], {
      error: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }),
    }),
    description: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1')
      .max(300, 'القيمة المدخلة يجب ألا يزيد عن 300'),
    amount: z.preprocess(
      (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
      z
        .number({
          error: finiteTypeError(
            'المبلغ مطلوب',
            'أدخل قيمة صحيحة في المبلغ',
            'أدخل قيمة صحيحة في المبلغ',
          ),
        })
        .gt(0, 'المبلغ يجب أن يكون أكبر من 0'),
    ),
    start: z
      .string({
        error: fieldTypeError('تاريخ البداية مطلوب', 'أدخل قيمة صحيحة في تاريخ البداية'),
      })
      .regex(new RegExp('^\\d{4}-\\d{2}-\\d{2}$'), 'صيغة تاريخ البداية غير صحيحة'),
    end: z
      .string({
        error: fieldTypeError('تاريخ النهاية مطلوب', 'أدخل قيمة صحيحة في تاريخ النهاية'),
      })
      .regex(new RegExp('^\\d{4}-\\d{2}-\\d{2}$'), 'صيغة تاريخ النهاية غير صحيحة'),
    paid: z
      .preprocess(
        (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
        z
          .number({
            error: finiteTypeError(
              'القيمة المدخلة مطلوب',
              'أدخل قيمة صحيحة في القيمة المدخلة',
              'أدخل قيمة صحيحة في القيمة المدخلة',
            ),
          })
          .min(0, 'القيمة المدخلة يجب ألا يقل عن 0'),
      )
      .optional(),
    currency: z
      .string({
        error: fieldTypeError('العملة مطلوب', 'أدخل قيمة صحيحة في العملة'),
      })
      .optional(),
    rate: z
      .preprocess(
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
      )
      .optional(),
    cashId: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .optional(),
  })
  .loose();
export const expensePaymentSchema = z
  .object({
    id: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1')
      .max(300, 'القيمة المدخلة يجب ألا يزيد عن 300'),
    date: z
      .string({
        error: fieldTypeError('التاريخ مطلوب', 'أدخل قيمة صحيحة في التاريخ'),
      })
      .regex(new RegExp('^\\d{4}-\\d{2}-\\d{2}$'), 'صيغة التاريخ غير صحيحة'),
    amount: z.preprocess(
      (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
      z
        .number({
          error: finiteTypeError(
            'المبلغ مطلوب',
            'أدخل قيمة صحيحة في المبلغ',
            'أدخل قيمة صحيحة في المبلغ',
          ),
        })
        .gt(0, 'المبلغ يجب أن يكون أكبر من 0'),
    ),
    period: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .regex(new RegExp('^\\d{4}-(0[1-9]|1[0-2])$'), 'صيغة القيمة المدخلة غير صحيحة')
      .optional(),
    cashId: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .optional(),
    currency: z
      .string({
        error: fieldTypeError('العملة مطلوب', 'أدخل قيمة صحيحة في العملة'),
      })
      .optional(),
    rate: z
      .preprocess(
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
      )
      .optional(),
    note: z
      .string({
        error: fieldTypeError('البيان مطلوب', 'أدخل قيمة صحيحة في البيان'),
      })
      .optional(),
  })
  .loose();
export const expenseConsumeSchema = z
  .object({
    id: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1')
      .max(300, 'القيمة المدخلة يجب ألا يزيد عن 300'),
    date: z
      .string({
        error: fieldTypeError('التاريخ مطلوب', 'أدخل قيمة صحيحة في التاريخ'),
      })
      .regex(new RegExp('^\\d{4}-\\d{2}-\\d{2}$'), 'صيغة التاريخ غير صحيحة'),
    amount: z.preprocess(
      (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
      z
        .number({
          error: finiteTypeError(
            'المبلغ مطلوب',
            'أدخل قيمة صحيحة في المبلغ',
            'أدخل قيمة صحيحة في المبلغ',
          ),
        })
        .gt(0, 'المبلغ يجب أن يكون أكبر من 0'),
    ),
    period: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .regex(new RegExp('^\\d{4}-(0[1-9]|1[0-2])$'), 'صيغة القيمة المدخلة غير صحيحة')
      .optional(),
    cashId: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .optional(),
    currency: z
      .string({
        error: fieldTypeError('العملة مطلوب', 'أدخل قيمة صحيحة في العملة'),
      })
      .optional(),
    rate: z
      .preprocess(
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
      )
      .optional(),
    note: z
      .string({
        error: fieldTypeError('البيان مطلوب', 'أدخل قيمة صحيحة في البيان'),
      })
      .optional(),
  })
  .loose();
