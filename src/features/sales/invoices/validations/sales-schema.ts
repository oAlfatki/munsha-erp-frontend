import { fieldTypeError, finiteTypeError } from '@/core/validation/type-errors';
import { invoiceSchema } from '@/features/trade/public';
import { z } from 'zod';

export const salesTargetSchema = z
  .object({
    branchId: z.string({
      error: fieldTypeError('الفرع مطلوب', 'أدخل قيمة صحيحة في الفرع'),
    }),
    period: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .regex(new RegExp('^\\d{4}-(0[1-9]|1[0-2])$'), 'صيغة القيمة المدخلة غير صحيحة'),
    employee: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .optional(),
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
    note: z
      .string({
        error: fieldTypeError('البيان مطلوب', 'أدخل قيمة صحيحة في البيان'),
      })
      .max(500, 'البيان يجب ألا يزيد عن 500'),
  })
  .loose();
export const salesInvoiceInputSchema = invoiceSchema.omit({ kind: true });
