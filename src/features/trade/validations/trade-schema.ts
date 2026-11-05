import { z } from 'zod';
export const invoiceSchema = z
  .object({
    id: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .optional(),
    kind: z.enum(['sale', 'purchase'], {
      errorMap: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }),
    }),
    date: z
      .string({ required_error: 'التاريخ مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في التاريخ' })
      .regex(new RegExp('^\\d{4}-\\d{2}-\\d{2}$'), 'صيغة التاريخ غير صحيحة'),
    branchId: z
      .string({ required_error: 'الفرع مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في الفرع' })
      .min(1, 'الفرع يجب ألا يقل عن 1')
      .max(180, 'الفرع يجب ألا يزيد عن 180'),
    warehouseId: z
      .string({ required_error: 'المخزن مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في المخزن' })
      .min(1, 'المخزن يجب ألا يقل عن 1')
      .max(180, 'المخزن يجب ألا يزيد عن 180'),
    partyId: z.string({
      required_error: 'الطرف مطلوب',
      invalid_type_error: 'أدخل قيمة صحيحة في الطرف',
    }),
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
    payment: z.enum(['cash', 'credit', 'mixed'], {
      errorMap: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }),
    }),
    invoiceDiscount: z
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
    taxRate: z
      .preprocess(
        (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
        z
          .number({
            required_error: 'نسبة الضريبة مطلوب',
            invalid_type_error: 'أدخل قيمة صحيحة في نسبة الضريبة',
          })
          .finite('أدخل قيمة صحيحة في نسبة الضريبة')
          .min(0, 'نسبة الضريبة يجب ألا يقل عن 0')
          .max(100, 'نسبة الضريبة يجب ألا يزيد عن 100'),
      )
      .optional(),
    priceType: z.enum(['retail', 'wholesale'], {
      errorMap: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }),
    }),
    status: z.enum(['draft', 'final'], {
      errorMap: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }),
    }),
    note: z
      .string({ required_error: 'البيان مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في البيان' })
      .max(1000, 'البيان يجب ألا يزيد عن 1000'),
    cashId: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .optional(),
    supplierNumber: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .max(100, 'القيمة المدخلة يجب ألا يزيد عن 100')
      .optional(),
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
            free: z.preprocess(
              (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
              z
                .number({
                  required_error: 'القيمة المدخلة مطلوب',
                  invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
                })
                .finite('أدخل قيمة صحيحة في القيمة المدخلة')
                .min(0, 'القيمة المدخلة يجب ألا يقل عن 0'),
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
            discount: z.preprocess(
              (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
              z
                .number({
                  required_error: 'الخصم مطلوب',
                  invalid_type_error: 'أدخل قيمة صحيحة في الخصم',
                })
                .finite('أدخل قيمة صحيحة في الخصم')
                .min(0, 'الخصم يجب ألا يقل عن 0')
                .max(100, 'الخصم يجب ألا يزيد عن 100'),
            ),
          })
          .passthrough(),
      )
      .min(1, 'سطور المستند يجب ألا يقل عن 1')
      .max(100, 'سطور المستند يجب ألا يزيد عن 100'),
  })
  .passthrough();
export const deleteDraftSchema = z
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
export const returnSchema = z
  .object({
    id: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1')
      .max(180, 'القيمة المدخلة يجب ألا يزيد عن 180'),
    date: z
      .string({ required_error: 'التاريخ مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في التاريخ' })
      .regex(new RegExp('^\\d{4}-\\d{2}-\\d{2}$'), 'صيغة التاريخ غير صحيحة'),
    note: z
      .string({ required_error: 'البيان مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في البيان' })
      .max(1000, 'البيان يجب ألا يزيد عن 1000')
      .optional(),
  })
  .passthrough();
export const partialReturnSchema = z
  .object({
    id: z.string({
      required_error: 'القيمة المدخلة مطلوب',
      invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
    }),
    date: z
      .string({ required_error: 'التاريخ مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في التاريخ' })
      .regex(new RegExp('^\\d{4}-\\d{2}-\\d{2}$'), 'صيغة التاريخ غير صحيحة'),
    note: z
      .string({ required_error: 'البيان مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في البيان' })
      .max(1000, 'البيان يجب ألا يزيد عن 1000')
      .optional(),
    invoiceDiscount: z
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
    lines: z
      .array(
        z
          .object({
            index: z.preprocess(
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
            discount: z
              .preprocess(
                (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
                z
                  .number({
                    required_error: 'الخصم مطلوب',
                    invalid_type_error: 'أدخل قيمة صحيحة في الخصم',
                  })
                  .finite('أدخل قيمة صحيحة في الخصم')
                  .min(0, 'الخصم يجب ألا يقل عن 0')
                  .max(100, 'الخصم يجب ألا يزيد عن 100'),
              )
              .optional(),
          })
          .passthrough(),
      )
      .min(1, 'سطور المستند يجب ألا يقل عن 1')
      .max(100, 'سطور المستند يجب ألا يزيد عن 100'),
  })
  .passthrough();
