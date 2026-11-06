import { fieldTypeError, finiteTypeError } from '@/core/validation/type-errors';
import { parentFirstArray } from '@/core/validation/parent-first-array';
import { z } from 'zod';

export const contactEntrySchema = z
  .object({
    contactId: z.string({
      error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
    }),
    date: z
      .string({
        error: fieldTypeError('التاريخ مطلوب', 'أدخل قيمة صحيحة في التاريخ'),
      })
      .regex(new RegExp('^\\d{4}-\\d{2}-\\d{2}$'), 'صيغة التاريخ غير صحيحة'),
    branchId: z.string({
      error: fieldTypeError('الفرع مطلوب', 'أدخل قيمة صحيحة في الفرع'),
    }),
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
    counterAccount: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .optional(),
    cashId: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .optional(),
    note: z
      .string({
        error: fieldTypeError('البيان مطلوب', 'أدخل قيمة صحيحة في البيان'),
      })
      .min(1, 'البيان يجب ألا يقل عن 1')
      .max(500, 'البيان يجب ألا يزيد عن 500'),
  })
  .loose();
export const contactVoucherSchema = z
  .object({
    contactId: z.string({
      error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
    }),
    date: z
      .string({
        error: fieldTypeError('التاريخ مطلوب', 'أدخل قيمة صحيحة في التاريخ'),
      })
      .regex(new RegExp('^\\d{4}-\\d{2}-\\d{2}$'), 'صيغة التاريخ غير صحيحة'),
    branchId: z.string({
      error: fieldTypeError('الفرع مطلوب', 'أدخل قيمة صحيحة في الفرع'),
    }),
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
    counterAccount: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .optional(),
    cashId: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .optional(),
    note: z
      .string({
        error: fieldTypeError('البيان مطلوب', 'أدخل قيمة صحيحة في البيان'),
      })
      .min(1, 'البيان يجب ألا يقل عن 1')
      .max(500, 'البيان يجب ألا يزيد عن 500'),
  })
  .loose();
export const periodSwitchSchema = z
  .object({
    id: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1'),
  })
  .loose();
export const periodCreateSchema = z
  .object({
    name: z
      .string({
        error: fieldTypeError('الاسم مطلوب', 'أدخل قيمة صحيحة في الاسم'),
      })
      .min(1, 'الاسم يجب ألا يقل عن 1')
      .max(100, 'الاسم يجب ألا يزيد عن 100'),
    year: z.preprocess(
      (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
      z
        .number({
          error: finiteTypeError(
            'القيمة المدخلة مطلوب',
            'أدخل قيمة صحيحة في القيمة المدخلة',
            'أدخل قيمة صحيحة في القيمة المدخلة',
          ),
        })
        .int('القيمة المدخلة يجب أن يكون عددًا صحيحًا')
        .min(2000, 'القيمة المدخلة يجب ألا يقل عن 2000')
        .max(2200, 'القيمة المدخلة يجب ألا يزيد عن 2200'),
    ),
  })
  .loose();
export const periodTransferSchema = z
  .object({
    id: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1'),
    kind: z
      .enum(['stock', 'accounts'], {
        error: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }),
      })
      .optional(),
    date: z
      .string({
        error: fieldTypeError('التاريخ مطلوب', 'أدخل قيمة صحيحة في التاريخ'),
      })
      .optional(),
    confirmed: z
      .boolean({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .optional(),
  })
  .loose();
export const periodActivateSchema = z
  .object({
    id: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1'),
    kind: z
      .enum(['stock', 'accounts'], {
        error: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }),
      })
      .optional(),
    date: z
      .string({
        error: fieldTypeError('التاريخ مطلوب', 'أدخل قيمة صحيحة في التاريخ'),
      })
      .optional(),
    confirmed: z
      .boolean({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .optional(),
  })
  .loose();
export const periodResetSchema = z
  .object({
    id: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1'),
    kind: z
      .enum(['stock', 'accounts'], {
        error: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }),
      })
      .optional(),
    date: z
      .string({
        error: fieldTypeError('التاريخ مطلوب', 'أدخل قيمة صحيحة في التاريخ'),
      })
      .optional(),
    confirmed: z
      .boolean({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .optional(),
  })
  .loose();
export const screenDraftSchema = z
  .object({
    screen: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1')
      .max(200, 'القيمة المدخلة يجب ألا يزيد عن 200'),
    values: z.record(
      z.string(),
      z
        .string({
          error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
        })
        .max(2000, 'القيمة المدخلة يجب ألا يزيد عن 2000'),
    ),
  })
  .loose();

export const manualJournalSchema = z
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
      .max(200, 'الفرع يجب ألا يزيد عن 200'),
    note: z
      .string({
        error: fieldTypeError('البيان مطلوب', 'أدخل قيمة صحيحة في البيان'),
      })
      .min(1, 'البيان يجب ألا يقل عن 1')
      .max(200, 'البيان يجب ألا يزيد عن 200'),
    lines: parentFirstArray(
      z
        .array(
          z
            .object({
              account: z
                .string({
                  error: fieldTypeError('الحساب مطلوب', 'أدخل قيمة صحيحة في الحساب'),
                })
                .min(1, 'الحساب يجب ألا يقل عن 1')
                .max(200, 'الحساب يجب ألا يزيد عن 200'),
              debit: z.preprocess(
                (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
                z
                  .number({
                    error: finiteTypeError(
                      'المدين مطلوب',
                      'أدخل قيمة صحيحة في المدين',
                      'أدخل قيمة صحيحة في المدين',
                    ),
                  })
                  .min(0, 'المدين يجب ألا يقل عن 0'),
              ),
              credit: z.preprocess(
                (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
                z
                  .number({
                    error: finiteTypeError(
                      'الدائن مطلوب',
                      'أدخل قيمة صحيحة في الدائن',
                      'أدخل قيمة صحيحة في الدائن',
                    ),
                  })
                  .min(0, 'الدائن يجب ألا يقل عن 0'),
              ),
            })
            .loose(),
        )
        .min(2, 'سطور المستند يجب ألا يقل عن 2')
        .max(100, 'سطور المستند يجب ألا يزيد عن 100'),
    ),
  })
  .loose();
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
      { error: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }) },
    ),
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
      .max(200, 'الفرع يجب ألا يزيد عن 200'),
    subject: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1')
      .max(200, 'القيمة المدخلة يجب ألا يزيد عن 200'),
    amount: z
      .preprocess(
        (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
        z
          .number({
            error: finiteTypeError(
              'المبلغ مطلوب',
              'أدخل قيمة صحيحة في المبلغ',
              'أدخل قيمة صحيحة في المبلغ',
            ),
          })
          .min(0, 'المبلغ يجب ألا يقل عن 0'),
      )
      .optional(),
    note: z
      .string({
        error: fieldTypeError('البيان مطلوب', 'أدخل قيمة صحيحة في البيان'),
      })
      .max(500, 'البيان يجب ألا يزيد عن 500'),
    source: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .optional(),
    period: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .regex(new RegExp('^\\d{4}-(0[1-9]|1[0-2])$'), 'صيغة القيمة المدخلة غير صحيحة')
      .optional(),
    qty: z
      .preprocess(
        (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
        z
          .number({
            error: finiteTypeError(
              'الكمية مطلوب',
              'أدخل قيمة صحيحة في الكمية',
              'أدخل قيمة صحيحة في الكمية',
            ),
          })
          .min(0, 'الكمية يجب ألا يقل عن 0'),
      )
      .optional(),
    warehouseId: z
      .string({
        error: fieldTypeError('المخزن مطلوب', 'أدخل قيمة صحيحة في المخزن'),
      })
      .optional(),
  })
  .loose();
export const voucherSchema = z
  .object({
    kind: z.enum(['receipt', 'payment'], {
      error: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }),
    }),
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
    partyId: z
      .string({
        error: fieldTypeError('الطرف مطلوب', 'أدخل قيمة صحيحة في الطرف'),
      })
      .min(1, 'الطرف يجب ألا يقل عن 1')
      .max(180, 'الطرف يجب ألا يزيد عن 180'),
    note: z
      .string({
        error: fieldTypeError('البيان مطلوب', 'أدخل قيمة صحيحة في البيان'),
      })
      .max(400, 'البيان يجب ألا يزيد عن 400'),
    amount: z
      .preprocess(
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
      )
      .optional(),
    cashId: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
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
            cashId: z
              .string({
                error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
              })
              .min(1, 'القيمة المدخلة يجب ألا يقل عن 1')
              .max(180, 'القيمة المدخلة يجب ألا يزيد عن 180'),
          })
          .loose(),
      )
      .min(1, 'سطور المستند يجب ألا يقل عن 1')
      .max(30, 'سطور المستند يجب ألا يزيد عن 30')
      .optional(),
  })
  .loose();
