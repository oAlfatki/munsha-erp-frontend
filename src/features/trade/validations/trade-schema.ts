import { fieldTypeError, finiteTypeError } from '@/core/validation/type-errors';
import { z } from 'zod';

export const invoiceSchema = z
  .object({
    id: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .optional(),
    kind: z.enum(['sale', 'purchase'], {
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
    warehouseId: z
      .string({
        error: fieldTypeError('المخزن مطلوب', 'أدخل قيمة صحيحة في المخزن'),
      })
      .min(1, 'المخزن يجب ألا يقل عن 1')
      .max(180, 'المخزن يجب ألا يزيد عن 180'),
    partyId: z.string({
      error: fieldTypeError('الطرف مطلوب', 'أدخل قيمة صحيحة في الطرف'),
    }),
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
    payment: z.enum(['cash', 'credit', 'mixed'], {
      error: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }),
    }),
    invoiceDiscount: z
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
    taxRate: z
      .preprocess(
        (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
        z
          .number({
            error: finiteTypeError(
              'نسبة الضريبة مطلوب',
              'أدخل قيمة صحيحة في نسبة الضريبة',
              'أدخل قيمة صحيحة في نسبة الضريبة',
            ),
          })
          .min(0, 'نسبة الضريبة يجب ألا يقل عن 0')
          .max(100, 'نسبة الضريبة يجب ألا يزيد عن 100'),
      )
      .optional(),
    priceType: z.enum(['retail', 'wholesale'], {
      error: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }),
    }),
    status: z.enum(['draft', 'final'], {
      error: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }),
    }),
    note: z
      .string({
        error: fieldTypeError('البيان مطلوب', 'أدخل قيمة صحيحة في البيان'),
      })
      .max(1000, 'البيان يجب ألا يزيد عن 1000'),
    cashId: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .optional(),
    supplierNumber: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .max(100, 'القيمة المدخلة يجب ألا يزيد عن 100')
      .optional(),
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
            free: z.preprocess(
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
            discount: z.preprocess(
              (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
              z
                .number({
                  error: finiteTypeError(
                    'الخصم مطلوب',
                    'أدخل قيمة صحيحة في الخصم',
                    'أدخل قيمة صحيحة في الخصم',
                  ),
                })
                .min(0, 'الخصم يجب ألا يقل عن 0')
                .max(100, 'الخصم يجب ألا يزيد عن 100'),
            ),
          })
          .loose(),
      )
      .min(1, 'سطور المستند يجب ألا يقل عن 1')
      .max(100, 'سطور المستند يجب ألا يزيد عن 100'),
  })
  .loose();
export const deleteDraftSchema = z
  .object({
    id: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1')
      .max(180, 'القيمة المدخلة يجب ألا يزيد عن 180'),
  })
  .loose();
export const returnSchema = z
  .object({
    id: z
      .string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      })
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1')
      .max(180, 'القيمة المدخلة يجب ألا يزيد عن 180'),
    date: z
      .string({
        error: fieldTypeError('التاريخ مطلوب', 'أدخل قيمة صحيحة في التاريخ'),
      })
      .regex(new RegExp('^\\d{4}-\\d{2}-\\d{2}$'), 'صيغة التاريخ غير صحيحة'),
    note: z
      .string({
        error: fieldTypeError('البيان مطلوب', 'أدخل قيمة صحيحة في البيان'),
      })
      .max(1000, 'البيان يجب ألا يزيد عن 1000')
      .optional(),
  })
  .loose();
export const partialReturnSchema = z
  .object({
    id: z.string({
      error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
    }),
    date: z
      .string({
        error: fieldTypeError('التاريخ مطلوب', 'أدخل قيمة صحيحة في التاريخ'),
      })
      .regex(new RegExp('^\\d{4}-\\d{2}-\\d{2}$'), 'صيغة التاريخ غير صحيحة'),
    note: z
      .string({
        error: fieldTypeError('البيان مطلوب', 'أدخل قيمة صحيحة في البيان'),
      })
      .max(1000, 'البيان يجب ألا يزيد عن 1000')
      .optional(),
    invoiceDiscount: z
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
    lines: z
      .array(
        z
          .object({
            index: z.preprocess(
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
            discount: z
              .preprocess(
                (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
                z
                  .number({
                    error: finiteTypeError(
                      'الخصم مطلوب',
                      'أدخل قيمة صحيحة في الخصم',
                      'أدخل قيمة صحيحة في الخصم',
                    ),
                  })
                  .min(0, 'الخصم يجب ألا يقل عن 0')
                  .max(100, 'الخصم يجب ألا يزيد عن 100'),
              )
              .optional(),
          })
          .loose(),
      )
      .min(1, 'سطور المستند يجب ألا يقل عن 1')
      .max(100, 'سطور المستند يجب ألا يزيد عن 100'),
  })
  .loose();
