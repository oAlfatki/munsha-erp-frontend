import { z } from 'zod';
export const permissionsSchema = z
  .object({
    role: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1')
      .max(180, 'القيمة المدخلة يجب ألا يزيد عن 180'),
    permissions: z
      .array(
        z
          .string({
            required_error: 'القيمة المدخلة مطلوب',
            invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
          })
          .min(1, 'القيمة المدخلة يجب ألا يقل عن 1')
          .max(180, 'القيمة المدخلة يجب ألا يزيد عن 180'),
      )
      .max(100, 'القيمة المدخلة يجب ألا يزيد عن 100'),
  })
  .passthrough();
export const contactEntrySchema = z
  .object({
    contactId: z.string({
      required_error: 'القيمة المدخلة مطلوب',
      invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
    }),
    date: z
      .string({ required_error: 'التاريخ مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في التاريخ' })
      .regex(new RegExp('^\\d{4}-\\d{2}-\\d{2}$'), 'صيغة التاريخ غير صحيحة'),
    branchId: z.string({
      required_error: 'الفرع مطلوب',
      invalid_type_error: 'أدخل قيمة صحيحة في الفرع',
    }),
    amount: z.preprocess(
      (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
      z
        .number({ required_error: 'المبلغ مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في المبلغ' })
        .finite('أدخل قيمة صحيحة في المبلغ')
        .gt(0, 'المبلغ يجب أن يكون أكبر من 0'),
    ),
    counterAccount: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .optional(),
    cashId: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .optional(),
    note: z
      .string({ required_error: 'البيان مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في البيان' })
      .min(1, 'البيان يجب ألا يقل عن 1')
      .max(500, 'البيان يجب ألا يزيد عن 500'),
  })
  .passthrough();
export const contactVoucherSchema = z
  .object({
    contactId: z.string({
      required_error: 'القيمة المدخلة مطلوب',
      invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
    }),
    date: z
      .string({ required_error: 'التاريخ مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في التاريخ' })
      .regex(new RegExp('^\\d{4}-\\d{2}-\\d{2}$'), 'صيغة التاريخ غير صحيحة'),
    branchId: z.string({
      required_error: 'الفرع مطلوب',
      invalid_type_error: 'أدخل قيمة صحيحة في الفرع',
    }),
    amount: z.preprocess(
      (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
      z
        .number({ required_error: 'المبلغ مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في المبلغ' })
        .finite('أدخل قيمة صحيحة في المبلغ')
        .gt(0, 'المبلغ يجب أن يكون أكبر من 0'),
    ),
    counterAccount: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .optional(),
    cashId: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .optional(),
    note: z
      .string({ required_error: 'البيان مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في البيان' })
      .min(1, 'البيان يجب ألا يقل عن 1')
      .max(500, 'البيان يجب ألا يزيد عن 500'),
  })
  .passthrough();
export const periodSwitchSchema = z
  .object({
    id: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1'),
  })
  .passthrough();
export const periodCreateSchema = z
  .object({
    name: z
      .string({ required_error: 'الاسم مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في الاسم' })
      .min(1, 'الاسم يجب ألا يقل عن 1')
      .max(100, 'الاسم يجب ألا يزيد عن 100'),
    year: z.preprocess(
      (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
      z
        .number({
          required_error: 'القيمة المدخلة مطلوب',
          invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
        })
        .finite('أدخل قيمة صحيحة في القيمة المدخلة')
        .int('القيمة المدخلة يجب أن يكون عددًا صحيحًا')
        .min(2000, 'القيمة المدخلة يجب ألا يقل عن 2000')
        .max(2200, 'القيمة المدخلة يجب ألا يزيد عن 2200'),
    ),
  })
  .passthrough();
export const periodTransferSchema = z
  .object({
    id: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1'),
    kind: z
      .enum(['stock', 'accounts'], {
        errorMap: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }),
      })
      .optional(),
    date: z
      .string({ required_error: 'التاريخ مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في التاريخ' })
      .optional(),
    confirmed: z
      .boolean({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .optional(),
  })
  .passthrough();
export const periodActivateSchema = z
  .object({
    id: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1'),
    kind: z
      .enum(['stock', 'accounts'], {
        errorMap: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }),
      })
      .optional(),
    date: z
      .string({ required_error: 'التاريخ مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في التاريخ' })
      .optional(),
    confirmed: z
      .boolean({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .optional(),
  })
  .passthrough();
export const periodResetSchema = z
  .object({
    id: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1'),
    kind: z
      .enum(['stock', 'accounts'], {
        errorMap: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }),
      })
      .optional(),
    date: z
      .string({ required_error: 'التاريخ مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في التاريخ' })
      .optional(),
    confirmed: z
      .boolean({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .optional(),
  })
  .passthrough();
export const screenDraftSchema = z
  .object({
    screen: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1')
      .max(200, 'القيمة المدخلة يجب ألا يزيد عن 200'),
    values: z.record(
      z
        .string({
          required_error: 'القيمة المدخلة مطلوب',
          invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
        })
        .max(2000, 'القيمة المدخلة يجب ألا يزيد عن 2000'),
    ),
  })
  .passthrough();

export const manualJournalSchema = z
  .object({
    date: z
      .string({ required_error: 'التاريخ مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في التاريخ' })
      .regex(new RegExp('^\\d{4}-\\d{2}-\\d{2}$'), 'صيغة التاريخ غير صحيحة'),
    branchId: z
      .string({ required_error: 'الفرع مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في الفرع' })
      .min(1, 'الفرع يجب ألا يقل عن 1')
      .max(200, 'الفرع يجب ألا يزيد عن 200'),
    note: z
      .string({ required_error: 'البيان مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في البيان' })
      .min(1, 'البيان يجب ألا يقل عن 1')
      .max(200, 'البيان يجب ألا يزيد عن 200'),
    lines: z
      .array(
        z
          .object({
            account: z
              .string({
                required_error: 'الحساب مطلوب',
                invalid_type_error: 'أدخل قيمة صحيحة في الحساب',
              })
              .min(1, 'الحساب يجب ألا يقل عن 1')
              .max(200, 'الحساب يجب ألا يزيد عن 200'),
            debit: z.preprocess(
              (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
              z
                .number({
                  required_error: 'المدين مطلوب',
                  invalid_type_error: 'أدخل قيمة صحيحة في المدين',
                })
                .finite('أدخل قيمة صحيحة في المدين')
                .min(0, 'المدين يجب ألا يقل عن 0'),
            ),
            credit: z.preprocess(
              (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
              z
                .number({
                  required_error: 'الدائن مطلوب',
                  invalid_type_error: 'أدخل قيمة صحيحة في الدائن',
                })
                .finite('أدخل قيمة صحيحة في الدائن')
                .min(0, 'الدائن يجب ألا يقل عن 0'),
            ),
          })
          .passthrough(),
      )
      .min(2, 'سطور المستند يجب ألا يقل عن 2')
      .max(100, 'سطور المستند يجب ألا يزيد عن 100'),
  })
  .passthrough();
export const operationSchema = z
  .object({
    kind: z.enum(
      [
        'payroll',
        'salaryPayment',
        'advance',
        'count',
        'adjustment',
        'assetPurchase',
        'depreciation',
        'accruedExpense',
        'settleExpense',
        'prepaidExpense',
        'consumePrepaid',
      ],
      { errorMap: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }) },
    ),
    date: z
      .string({ required_error: 'التاريخ مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في التاريخ' })
      .regex(new RegExp('^\\d{4}-\\d{2}-\\d{2}$'), 'صيغة التاريخ غير صحيحة'),
    branchId: z
      .string({ required_error: 'الفرع مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في الفرع' })
      .min(1, 'الفرع يجب ألا يقل عن 1')
      .max(200, 'الفرع يجب ألا يزيد عن 200'),
    subject: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1')
      .max(200, 'القيمة المدخلة يجب ألا يزيد عن 200'),
    amount: z
      .preprocess(
        (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
        z
          .number({
            required_error: 'المبلغ مطلوب',
            invalid_type_error: 'أدخل قيمة صحيحة في المبلغ',
          })
          .finite('أدخل قيمة صحيحة في المبلغ')
          .min(0, 'المبلغ يجب ألا يقل عن 0'),
      )
      .optional(),
    note: z
      .string({ required_error: 'البيان مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في البيان' })
      .max(500, 'البيان يجب ألا يزيد عن 500'),
    source: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .optional(),
    period: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .regex(new RegExp('^\\d{4}-(0[1-9]|1[0-2])$'), 'صيغة القيمة المدخلة غير صحيحة')
      .optional(),
    qty: z
      .preprocess(
        (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
        z
          .number({
            required_error: 'الكمية مطلوب',
            invalid_type_error: 'أدخل قيمة صحيحة في الكمية',
          })
          .finite('أدخل قيمة صحيحة في الكمية')
          .min(0, 'الكمية يجب ألا يقل عن 0'),
      )
      .optional(),
    warehouseId: z
      .string({ required_error: 'المخزن مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في المخزن' })
      .optional(),
  })
  .passthrough();
export const voucherSchema = z
  .object({
    kind: z.enum(['receipt', 'payment'], {
      errorMap: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }),
    }),
    date: z
      .string({ required_error: 'التاريخ مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في التاريخ' })
      .regex(new RegExp('^\\d{4}-\\d{2}-\\d{2}$'), 'صيغة التاريخ غير صحيحة'),
    branchId: z
      .string({ required_error: 'الفرع مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في الفرع' })
      .min(1, 'الفرع يجب ألا يقل عن 1')
      .max(180, 'الفرع يجب ألا يزيد عن 180'),
    partyId: z
      .string({ required_error: 'الطرف مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في الطرف' })
      .min(1, 'الطرف يجب ألا يقل عن 1')
      .max(180, 'الطرف يجب ألا يزيد عن 180'),
    note: z
      .string({ required_error: 'البيان مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في البيان' })
      .max(400, 'البيان يجب ألا يزيد عن 400'),
    amount: z
      .preprocess(
        (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
        z
          .number({
            required_error: 'المبلغ مطلوب',
            invalid_type_error: 'أدخل قيمة صحيحة في المبلغ',
          })
          .finite('أدخل قيمة صحيحة في المبلغ')
          .gt(0, 'المبلغ يجب أن يكون أكبر من 0'),
      )
      .optional(),
    cashId: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .optional(),
    lines: z
      .array(
        z
          .object({
            amount: z.preprocess(
              (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
              z
                .number({
                  required_error: 'المبلغ مطلوب',
                  invalid_type_error: 'أدخل قيمة صحيحة في المبلغ',
                })
                .finite('أدخل قيمة صحيحة في المبلغ')
                .gt(0, 'المبلغ يجب أن يكون أكبر من 0'),
            ),
            currency: z
              .string({
                required_error: 'العملة مطلوب',
                invalid_type_error: 'أدخل قيمة صحيحة في العملة',
              })
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
            cashId: z
              .string({
                required_error: 'القيمة المدخلة مطلوب',
                invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
              })
              .min(1, 'القيمة المدخلة يجب ألا يقل عن 1')
              .max(180, 'القيمة المدخلة يجب ألا يزيد عن 180'),
          })
          .passthrough(),
      )
      .min(1, 'سطور المستند يجب ألا يقل عن 1')
      .max(30, 'سطور المستند يجب ألا يزيد عن 30')
      .optional(),
  })
  .passthrough();
