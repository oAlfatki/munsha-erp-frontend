import { z } from 'zod';
export const productSchema = z
  .object({
    id: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .optional(),
    name: z
      .string({ required_error: 'الاسم مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في الاسم' })
      .min(1, 'الاسم يجب ألا يقل عن 1')
      .max(180, 'الاسم يجب ألا يزيد عن 180'),
    groupId: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .max(100, 'القيمة المدخلة يجب ألا يزيد عن 100')
      .optional(),
    category: z.union([z.literal(1), z.literal(2), z.literal(3)]),
    min: z.preprocess(
      (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
      z
        .number({
          required_error: 'القيمة المدخلة مطلوب',
          invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
        })
        .finite('أدخل قيمة صحيحة في القيمة المدخلة')
        .min(0, 'القيمة المدخلة يجب ألا يقل عن 0'),
    ),
    alert: z.boolean({
      required_error: 'القيمة المدخلة مطلوب',
      invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
    }),
    active: z.boolean({
      required_error: 'القيمة المدخلة مطلوب',
      invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
    }),
    maxDiscount: z.preprocess(
      (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
      z
        .number({
          required_error: 'القيمة المدخلة مطلوب',
          invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
        })
        .finite('أدخل قيمة صحيحة في القيمة المدخلة')
        .min(0, 'القيمة المدخلة يجب ألا يقل عن 0')
        .max(100, 'القيمة المدخلة يجب ألا يزيد عن 100'),
    ),
    units: z
      .array(
        z
          .object({
            name: z
              .string({
                required_error: 'الاسم مطلوب',
                invalid_type_error: 'أدخل قيمة صحيحة في الاسم',
              })
              .min(1, 'الاسم يجب ألا يقل عن 1')
              .max(180, 'الاسم يجب ألا يزيد عن 180'),
            factor: z.preprocess(
              (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
              z
                .number({
                  required_error: 'معامل التحويل مطلوب',
                  invalid_type_error: 'أدخل قيمة صحيحة في معامل التحويل',
                })
                .finite('أدخل قيمة صحيحة في معامل التحويل')
                .gt(0, 'معامل التحويل يجب أن يكون أكبر من 0'),
            ),
            purchase: z.preprocess(
              (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
              z
                .number({
                  required_error: 'القيمة المدخلة مطلوب',
                  invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
                })
                .finite('أدخل قيمة صحيحة في القيمة المدخلة')
                .min(0, 'القيمة المدخلة يجب ألا يقل عن 0'),
            ),
            retail: z.preprocess(
              (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
              z
                .number({
                  required_error: 'القيمة المدخلة مطلوب',
                  invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
                })
                .finite('أدخل قيمة صحيحة في القيمة المدخلة')
                .min(0, 'القيمة المدخلة يجب ألا يقل عن 0'),
            ),
            wholesale: z.preprocess(
              (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
              z
                .number({
                  required_error: 'القيمة المدخلة مطلوب',
                  invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
                })
                .finite('أدخل قيمة صحيحة في القيمة المدخلة')
                .min(0, 'القيمة المدخلة يجب ألا يقل عن 0'),
            ),
            barcode: z
              .string({
                required_error: 'الباركود مطلوب',
                invalid_type_error: 'أدخل قيمة صحيحة في الباركود',
              })
              .max(80, 'الباركود يجب ألا يزيد عن 80'),
          })
          .passthrough(),
      )
      .min(1, 'الوحدات يجب ألا يقل عن 1')
      .max(3, 'الوحدات يجب ألا يزيد عن 3'),
  })
  .passthrough();
export const warehouseSchema = z
  .object({
    id: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .optional(),
    name: z
      .string({ required_error: 'الاسم مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في الاسم' })
      .min(1, 'الاسم يجب ألا يقل عن 1')
      .max(180, 'الاسم يجب ألا يزيد عن 180'),
    branchId: z
      .string({ required_error: 'الفرع مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في الفرع' })
      .min(1, 'الفرع يجب ألا يقل عن 1')
      .max(180, 'الفرع يجب ألا يزيد عن 180'),
    active: z
      .boolean({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .optional(),
  })
  .passthrough();
export const transferSchema = z
  .object({
    productId: z
      .string({ required_error: 'الصنف مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في الصنف' })
      .min(1, 'الصنف يجب ألا يقل عن 1')
      .max(180, 'الصنف يجب ألا يزيد عن 180'),
    from: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1')
      .max(180, 'القيمة المدخلة يجب ألا يزيد عن 180'),
    to: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1')
      .max(180, 'القيمة المدخلة يجب ألا يزيد عن 180'),
    qty: z.preprocess(
      (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
      z
        .number({ required_error: 'الكمية مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في الكمية' })
        .finite('أدخل قيمة صحيحة في الكمية')
        .gt(0, 'الكمية يجب أن يكون أكبر من 0'),
    ),
    date: z
      .string({ required_error: 'التاريخ مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في التاريخ' })
      .regex(new RegExp('^\\d{4}-\\d{2}-\\d{2}$'), 'صيغة التاريخ غير صحيحة'),
  })
  .passthrough();
export const stockDocumentSchema = z
  .object({
    openingScope: z
      .enum(['accounts', 'stock'], {
        errorMap: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }),
      })
      .optional(),
    openingOffsetAccount: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .optional(),
    id: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .optional(),
    kind: z.enum(['opening', 'transfer', 'adjustment'], {
      errorMap: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }),
    }),
    status: z.enum(['draft', 'final'], {
      errorMap: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }),
    }),
    date: z
      .string({ required_error: 'التاريخ مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في التاريخ' })
      .regex(new RegExp('^\\d{4}-\\d{2}-\\d{2}$'), 'صيغة التاريخ غير صحيحة'),
    branchId: z
      .string({ required_error: 'الفرع مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في الفرع' })
      .min(1, 'الفرع يجب ألا يقل عن 1')
      .max(180, 'الفرع يجب ألا يزيد عن 180'),
    warehouseId: z.string({
      required_error: 'المخزن مطلوب',
      invalid_type_error: 'أدخل قيمة صحيحة في المخزن',
    }),
    toWarehouseId: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .optional(),
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
    direction: z
      .enum(['shortage', 'excess'], {
        errorMap: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }),
      })
      .optional(),
    note: z
      .string({ required_error: 'البيان مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في البيان' })
      .max(1000, 'البيان يجب ألا يزيد عن 1000'),
    lines: z
      .array(
        z
          .object({
            productId: z
              .string({
                required_error: 'الصنف مطلوب',
                invalid_type_error: 'أدخل قيمة صحيحة في الصنف',
              })
              .min(1, 'الصنف يجب ألا يقل عن 1')
              .max(180, 'الصنف يجب ألا يزيد عن 180'),
            unit: z.preprocess(
              (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
              z
                .number({
                  required_error: 'القيمة المدخلة مطلوب',
                  invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
                })
                .finite('أدخل قيمة صحيحة في القيمة المدخلة')
                .int('القيمة المدخلة يجب أن يكون عددًا صحيحًا')
                .min(0, 'القيمة المدخلة يجب ألا يقل عن 0'),
            ),
            qty: z.preprocess(
              (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
              z
                .number({
                  required_error: 'الكمية مطلوب',
                  invalid_type_error: 'أدخل قيمة صحيحة في الكمية',
                })
                .finite('أدخل قيمة صحيحة في الكمية')
                .gt(0, 'الكمية يجب أن يكون أكبر من 0'),
            ),
            price: z.preprocess(
              (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
              z
                .number({
                  required_error: 'السعر مطلوب',
                  invalid_type_error: 'أدخل قيمة صحيحة في السعر',
                })
                .finite('أدخل قيمة صحيحة في السعر')
                .min(0, 'السعر يجب ألا يقل عن 0'),
            ),
            expectedQty: z
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
          })
          .passthrough(),
      )
      .max(100, 'سطور المستند يجب ألا يزيد عن 100'),
    accounts: z
      .array(
        z
          .object({
            account: z
              .string({
                required_error: 'الحساب مطلوب',
                invalid_type_error: 'أدخل قيمة صحيحة في الحساب',
              })
              .min(1, 'الحساب يجب ألا يقل عن 1')
              .max(180, 'الحساب يجب ألا يزيد عن 180'),
            partyId: z
              .string({
                required_error: 'الطرف مطلوب',
                invalid_type_error: 'أدخل قيمة صحيحة في الطرف',
              })
              .optional(),
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
            description: z
              .string({
                required_error: 'القيمة المدخلة مطلوب',
                invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
              })
              .max(300, 'القيمة المدخلة يجب ألا يزيد عن 300'),
          })
          .passthrough(),
      )
      .max(100, 'القيمة المدخلة يجب ألا يزيد عن 100'),
  })
  .passthrough();
export const deleteStockDraftSchema = z
  .object({
    id: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1')
      .max(180, 'القيمة المدخلة يجب ألا يزيد عن 180'),
  })
  .passthrough();
export const priceListSchema = z
  .object({
    priceType: z.enum(['retail', 'wholesale'], {
      errorMap: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }),
    }),
    rows: z
      .array(
        z
          .object({
            productId: z.string({
              required_error: 'الصنف مطلوب',
              invalid_type_error: 'أدخل قيمة صحيحة في الصنف',
            }),
            unit: z.preprocess(
              (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
              z
                .number({
                  required_error: 'القيمة المدخلة مطلوب',
                  invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
                })
                .finite('أدخل قيمة صحيحة في القيمة المدخلة')
                .int('القيمة المدخلة يجب أن يكون عددًا صحيحًا')
                .min(0, 'القيمة المدخلة يجب ألا يقل عن 0'),
            ),
            expectedPrice: z.preprocess(
              (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
              z
                .number({
                  required_error: 'القيمة المدخلة مطلوب',
                  invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
                })
                .finite('أدخل قيمة صحيحة في القيمة المدخلة')
                .min(0, 'القيمة المدخلة يجب ألا يقل عن 0'),
            ),
            expectedFactor: z.preprocess(
              (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
              z
                .number({
                  required_error: 'القيمة المدخلة مطلوب',
                  invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
                })
                .finite('أدخل قيمة صحيحة في القيمة المدخلة')
                .gt(0, 'القيمة المدخلة يجب أن يكون أكبر من 0'),
            ),
            price: z.preprocess(
              (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
              z
                .number({
                  required_error: 'السعر مطلوب',
                  invalid_type_error: 'أدخل قيمة صحيحة في السعر',
                })
                .finite('أدخل قيمة صحيحة في السعر')
                .min(0, 'السعر يجب ألا يقل عن 0')
                .max(1000000000, 'السعر يجب ألا يزيد عن 1000000000'),
            ),
          })
          .passthrough(),
      )
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1')
      .max(300, 'القيمة المدخلة يجب ألا يزيد عن 300'),
  })
  .passthrough();
