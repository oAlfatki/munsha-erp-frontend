import { z } from 'zod';
export const expenseSchema = z
  .object({
    date: z
      .string({ required_error: 'التاريخ مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في التاريخ' })
      .regex(new RegExp('^\\d{4}-\\d{2}-\\d{2}$'), 'صيغة التاريخ غير صحيحة'),
    branchId: z
      .string({ required_error: 'الفرع مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في الفرع' })
      .min(1, 'الفرع يجب ألا يقل عن 1')
      .max(180, 'الفرع يجب ألا يزيد عن 180'),
    category: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1')
      .max(180, 'القيمة المدخلة يجب ألا يزيد عن 180'),
    description: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1')
      .max(180, 'القيمة المدخلة يجب ألا يزيد عن 180'),
    amount: z.preprocess(
      (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
      z
        .number({ required_error: 'المبلغ مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في المبلغ' })
        .finite('أدخل قيمة صحيحة في المبلغ')
        .gt(0, 'المبلغ يجب أن يكون أكبر من 0'),
    ),
    currency: z
      .string({ required_error: 'العملة مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في العملة' })
      .min(1, 'العملة يجب ألا يقل عن 1')
      .max(180, 'العملة يجب ألا يزيد عن 180'),
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
  })
  .passthrough();
export const expenseSaveSchema = z
  .object({
    id: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .optional(),
    date: z
      .string({ required_error: 'التاريخ مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في التاريخ' })
      .regex(new RegExp('^\\d{4}-\\d{2}-\\d{2}$'), 'صيغة التاريخ غير صحيحة'),
    branchId: z
      .string({ required_error: 'الفرع مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في الفرع' })
      .min(1, 'الفرع يجب ألا يقل عن 1')
      .max(300, 'الفرع يجب ألا يزيد عن 300'),
    typeId: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1')
      .max(300, 'القيمة المدخلة يجب ألا يزيد عن 300'),
    treatment: z.enum(['current', 'accrued', 'prepaid'], {
      errorMap: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }),
    }),
    description: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1')
      .max(300, 'القيمة المدخلة يجب ألا يزيد عن 300'),
    amount: z.preprocess(
      (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
      z
        .number({ required_error: 'المبلغ مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في المبلغ' })
        .finite('أدخل قيمة صحيحة في المبلغ')
        .gt(0, 'المبلغ يجب أن يكون أكبر من 0'),
    ),
    start: z
      .string({
        required_error: 'تاريخ البداية مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في تاريخ البداية',
      })
      .regex(new RegExp('^\\d{4}-\\d{2}-\\d{2}$'), 'صيغة تاريخ البداية غير صحيحة'),
    end: z
      .string({
        required_error: 'تاريخ النهاية مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في تاريخ النهاية',
      })
      .regex(new RegExp('^\\d{4}-\\d{2}-\\d{2}$'), 'صيغة تاريخ النهاية غير صحيحة'),
    paid: z
      .preprocess(
        (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
        z
          .number({
            required_error: 'القيمة المدخلة مطلوب',
            invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
          })
          .finite('أدخل قيمة صحيحة في القيمة المدخلة')
          .min(0, 'القيمة المدخلة يجب ألا يقل عن 0'),
      )
      .optional(),
    currency: z
      .string({ required_error: 'العملة مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في العملة' })
      .optional(),
    rate: z
      .preprocess(
        (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
        z
          .number({
            required_error: 'سعر الصرف مطلوب',
            invalid_type_error: 'أدخل قيمة صحيحة في سعر الصرف',
          })
          .finite('أدخل قيمة صحيحة في سعر الصرف')
          .gt(0, 'سعر الصرف يجب أن يكون أكبر من 0'),
      )
      .optional(),
    cashId: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .optional(),
  })
  .passthrough();
export const expensePaymentSchema = z
  .object({
    id: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1')
      .max(300, 'القيمة المدخلة يجب ألا يزيد عن 300'),
    date: z
      .string({ required_error: 'التاريخ مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في التاريخ' })
      .regex(new RegExp('^\\d{4}-\\d{2}-\\d{2}$'), 'صيغة التاريخ غير صحيحة'),
    amount: z.preprocess(
      (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
      z
        .number({ required_error: 'المبلغ مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في المبلغ' })
        .finite('أدخل قيمة صحيحة في المبلغ')
        .gt(0, 'المبلغ يجب أن يكون أكبر من 0'),
    ),
    period: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .regex(new RegExp('^\\d{4}-(0[1-9]|1[0-2])$'), 'صيغة القيمة المدخلة غير صحيحة')
      .optional(),
    cashId: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .optional(),
    currency: z
      .string({ required_error: 'العملة مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في العملة' })
      .optional(),
    rate: z
      .preprocess(
        (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
        z
          .number({
            required_error: 'سعر الصرف مطلوب',
            invalid_type_error: 'أدخل قيمة صحيحة في سعر الصرف',
          })
          .finite('أدخل قيمة صحيحة في سعر الصرف')
          .gt(0, 'سعر الصرف يجب أن يكون أكبر من 0'),
      )
      .optional(),
    note: z
      .string({ required_error: 'البيان مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في البيان' })
      .optional(),
  })
  .passthrough();
export const expenseConsumeSchema = z
  .object({
    id: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1')
      .max(300, 'القيمة المدخلة يجب ألا يزيد عن 300'),
    date: z
      .string({ required_error: 'التاريخ مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في التاريخ' })
      .regex(new RegExp('^\\d{4}-\\d{2}-\\d{2}$'), 'صيغة التاريخ غير صحيحة'),
    amount: z.preprocess(
      (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
      z
        .number({ required_error: 'المبلغ مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في المبلغ' })
        .finite('أدخل قيمة صحيحة في المبلغ')
        .gt(0, 'المبلغ يجب أن يكون أكبر من 0'),
    ),
    period: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .regex(new RegExp('^\\d{4}-(0[1-9]|1[0-2])$'), 'صيغة القيمة المدخلة غير صحيحة')
      .optional(),
    cashId: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .optional(),
    currency: z
      .string({ required_error: 'العملة مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في العملة' })
      .optional(),
    rate: z
      .preprocess(
        (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
        z
          .number({
            required_error: 'سعر الصرف مطلوب',
            invalid_type_error: 'أدخل قيمة صحيحة في سعر الصرف',
          })
          .finite('أدخل قيمة صحيحة في سعر الصرف')
          .gt(0, 'سعر الصرف يجب أن يكون أكبر من 0'),
      )
      .optional(),
    note: z
      .string({ required_error: 'البيان مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في البيان' })
      .optional(),
  })
  .passthrough();
