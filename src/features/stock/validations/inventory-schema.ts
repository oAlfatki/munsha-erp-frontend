import { fieldTypeError, finiteTypeError } from '@/core/validation/type-errors';
import { z } from 'zod';

export const productSchema = z
  .object({
    id: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .optional(),
    name: z
      .string({
        error: fieldTypeError('الاسم مطلوب', 'أدخل قيمة صحيحة في الاسم'),
      })
      .min(1, 'الاسم يجب ألا يقل عن 1')
      .max(180, 'الاسم يجب ألا يزيد عن 180'),
    groupId: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .max(100, 'القيمة المدخلة يجب ألا يزيد عن 100')
      .optional(),
    category: z.union([z.literal(1), z.literal(2), z.literal(3)]),
    min: z.preprocess(
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
    ),
    alert: z.boolean({
      error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
    }),
    active: z.boolean({
      error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
    }),
    maxDiscount: z.preprocess(
      (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
      z
        .number({
          error: finiteTypeError(
            'القيمة المدخلة مطلوب',
            'أدخل قيمة صحيحة في القيمة المدخلة',
            'أدخل قيمة صحيحة في القيمة المدخلة',
          ),
        })
        .min(0, 'القيمة المدخلة يجب ألا يقل عن 0')
        .max(100, 'القيمة المدخلة يجب ألا يزيد عن 100'),
    ),
    units: z
      .array(
        z
          .object({
            name: z
              .string({
                error: fieldTypeError('الاسم مطلوب', 'أدخل قيمة صحيحة في الاسم'),
              })
              .min(1, 'الاسم يجب ألا يقل عن 1')
              .max(180, 'الاسم يجب ألا يزيد عن 180'),
            factor: z.preprocess(
              (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
              z
                .number({
                  error: finiteTypeError(
                    'معامل التحويل مطلوب',
                    'أدخل قيمة صحيحة في معامل التحويل',
                    'أدخل قيمة صحيحة في معامل التحويل',
                  ),
                })
                .gt(0, 'معامل التحويل يجب أن يكون أكبر من 0'),
            ),
            purchase: z.preprocess(
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
            ),
            retail: z.preprocess(
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
            ),
            wholesale: z.preprocess(
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
            ),
            barcode: z
              .string({
                error: fieldTypeError('الباركود مطلوب', 'أدخل قيمة صحيحة في الباركود'),
              })
              .max(80, 'الباركود يجب ألا يزيد عن 80'),
          })
          .loose(),
      )
      .min(1, 'الوحدات يجب ألا يقل عن 1')
      .max(3, 'الوحدات يجب ألا يزيد عن 3'),
  })
  .loose();
export const warehouseSchema = z
  .object({
    id: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .optional(),
    name: z
      .string({
        error: fieldTypeError('الاسم مطلوب', 'أدخل قيمة صحيحة في الاسم'),
      })
      .min(1, 'الاسم يجب ألا يقل عن 1')
      .max(180, 'الاسم يجب ألا يزيد عن 180'),
    branchId: z
      .string({
        error: fieldTypeError('الفرع مطلوب', 'أدخل قيمة صحيحة في الفرع'),
      })
      .min(1, 'الفرع يجب ألا يقل عن 1')
      .max(180, 'الفرع يجب ألا يزيد عن 180'),
    active: z
      .boolean({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .optional(),
  })
  .loose();
export const transferSchema = z
  .object({
    productId: z
      .string({
        error: fieldTypeError('الصنف مطلوب', 'أدخل قيمة صحيحة في الصنف'),
      })
      .min(1, 'الصنف يجب ألا يقل عن 1')
      .max(180, 'الصنف يجب ألا يزيد عن 180'),
    from: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1')
      .max(180, 'القيمة المدخلة يجب ألا يزيد عن 180'),
    to: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1')
      .max(180, 'القيمة المدخلة يجب ألا يزيد عن 180'),
    qty: z.preprocess(
      (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
      z
        .number({
          error: finiteTypeError(
            'الكمية مطلوب',
            'أدخل قيمة صحيحة في الكمية',
            'أدخل قيمة صحيحة في الكمية',
          ),
        })
        .gt(0, 'الكمية يجب أن يكون أكبر من 0'),
    ),
    date: z
      .string({
        error: fieldTypeError('التاريخ مطلوب', 'أدخل قيمة صحيحة في التاريخ'),
      })
      .regex(new RegExp('^\\d{4}-\\d{2}-\\d{2}$'), 'صيغة التاريخ غير صحيحة'),
  })
  .loose();
export const stockDocumentSchema = z
  .object({
    openingScope: z
      .enum(['accounts', 'stock'], {
        error: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }),
      })
      .optional(),
    openingOffsetAccount: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .optional(),
    id: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .optional(),
    kind: z.enum(['opening', 'transfer', 'adjustment'], {
      error: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }),
    }),
    status: z.enum(['draft', 'final'], {
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
    warehouseId: z.string({
      error: fieldTypeError('المخزن مطلوب', 'أدخل قيمة صحيحة في المخزن'),
    }),
    toWarehouseId: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .optional(),
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
    direction: z
      .enum(['shortage', 'excess'], {
        error: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }),
      })
      .optional(),
    note: z
      .string({
        error: fieldTypeError('البيان مطلوب', 'أدخل قيمة صحيحة في البيان'),
      })
      .max(1000, 'البيان يجب ألا يزيد عن 1000'),
    lines: z
      .array(
        z
          .object({
            productId: z
              .string({
                error: fieldTypeError('الصنف مطلوب', 'أدخل قيمة صحيحة في الصنف'),
              })
              .min(1, 'الصنف يجب ألا يقل عن 1')
              .max(180, 'الصنف يجب ألا يزيد عن 180'),
            unit: z.preprocess(
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
                .min(0, 'القيمة المدخلة يجب ألا يقل عن 0'),
            ),
            qty: z.preprocess(
              (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
              z
                .number({
                  error: finiteTypeError(
                    'الكمية مطلوب',
                    'أدخل قيمة صحيحة في الكمية',
                    'أدخل قيمة صحيحة في الكمية',
                  ),
                })
                .gt(0, 'الكمية يجب أن يكون أكبر من 0'),
            ),
            price: z.preprocess(
              (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
              z
                .number({
                  error: finiteTypeError(
                    'السعر مطلوب',
                    'أدخل قيمة صحيحة في السعر',
                    'أدخل قيمة صحيحة في السعر',
                  ),
                })
                .min(0, 'السعر يجب ألا يقل عن 0'),
            ),
            expectedQty: z
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
          })
          .loose(),
      )
      .max(100, 'سطور المستند يجب ألا يزيد عن 100'),
    accounts: z
      .array(
        z
          .object({
            account: z
              .string({
                error: fieldTypeError('الحساب مطلوب', 'أدخل قيمة صحيحة في الحساب'),
              })
              .min(1, 'الحساب يجب ألا يقل عن 1')
              .max(180, 'الحساب يجب ألا يزيد عن 180'),
            partyId: z
              .string({
                error: fieldTypeError('الطرف مطلوب', 'أدخل قيمة صحيحة في الطرف'),
              })
              .optional(),
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
            description: z
              .string({
                error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
              })
              .max(300, 'القيمة المدخلة يجب ألا يزيد عن 300'),
          })
          .loose(),
      )
      .max(100, 'القيمة المدخلة يجب ألا يزيد عن 100'),
  })
  .loose();
export const deleteStockDraftSchema = z
  .object({
    id: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1')
      .max(180, 'القيمة المدخلة يجب ألا يزيد عن 180'),
  })
  .loose();
export const priceListSchema = z
  .object({
    priceType: z.enum(['retail', 'wholesale'], {
      error: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }),
    }),
    rows: z
      .array(
        z
          .object({
            productId: z.string({
              error: fieldTypeError('الصنف مطلوب', 'أدخل قيمة صحيحة في الصنف'),
            }),
            unit: z.preprocess(
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
                .min(0, 'القيمة المدخلة يجب ألا يقل عن 0'),
            ),
            expectedPrice: z.preprocess(
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
            ),
            expectedFactor: z.preprocess(
              (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
              z
                .number({
                  error: finiteTypeError(
                    'القيمة المدخلة مطلوب',
                    'أدخل قيمة صحيحة في القيمة المدخلة',
                    'أدخل قيمة صحيحة في القيمة المدخلة',
                  ),
                })
                .gt(0, 'القيمة المدخلة يجب أن يكون أكبر من 0'),
            ),
            price: z.preprocess(
              (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
              z
                .number({
                  error: finiteTypeError(
                    'السعر مطلوب',
                    'أدخل قيمة صحيحة في السعر',
                    'أدخل قيمة صحيحة في السعر',
                  ),
                })
                .min(0, 'السعر يجب ألا يقل عن 0')
                .max(1000000000, 'السعر يجب ألا يزيد عن 1000000000'),
            ),
          })
          .loose(),
      )
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1')
      .max(300, 'القيمة المدخلة يجب ألا يزيد عن 300'),
  })
  .loose();
