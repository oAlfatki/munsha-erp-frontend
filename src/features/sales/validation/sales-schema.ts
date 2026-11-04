import { invoiceSchema } from "@/features/trade/public/trade-schema";
import { z } from 'zod';
export const salesTargetSchema = z
  .object({
    branchId: z.string({
      required_error: 'الفرع مطلوب',
      invalid_type_error: 'أدخل قيمة صحيحة في الفرع',
    }),
    period: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .regex(new RegExp('^\\d{4}-(0[1-9]|1[0-2])$'), 'صيغة القيمة المدخلة غير صحيحة'),
    employee: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .optional(),
    amount: z.preprocess(
      (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
      z
        .number({ required_error: 'المبلغ مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في المبلغ' })
        .finite('أدخل قيمة صحيحة في المبلغ')
        .gt(0, 'المبلغ يجب أن يكون أكبر من 0'),
    ),
    note: z
      .string({ required_error: 'البيان مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في البيان' })
      .max(500, 'البيان يجب ألا يزيد عن 500'),
  })
  .passthrough();
export const salesInvoiceInputSchema = invoiceSchema.omit({ kind: true });
