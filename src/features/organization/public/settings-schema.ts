import { z } from 'zod';
export const backupSettingsSchema = z
  .object({
    mode: z.enum(['off', 'interval', 'daily', 'exit'], {
      errorMap: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }),
    }),
    hours: z.preprocess(
      (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
      z
        .number({
          required_error: 'القيمة المدخلة مطلوب',
          invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
        })
        .finite('أدخل قيمة صحيحة في القيمة المدخلة')
        .int('القيمة المدخلة يجب أن يكون عددًا صحيحًا')
        .min(1, 'القيمة المدخلة يجب ألا يقل عن 1')
        .max(168, 'القيمة المدخلة يجب ألا يزيد عن 168'),
    ),
    time: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .regex(new RegExp('^([01]\\d|2[0-3]):[0-5]\\d$'), 'صيغة القيمة المدخلة غير صحيحة'),
    folder: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1')
      .max(80, 'القيمة المدخلة يجب ألا يزيد عن 80'),
    retention: z.preprocess(
      (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
      z
        .number({
          required_error: 'القيمة المدخلة مطلوب',
          invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
        })
        .finite('أدخل قيمة صحيحة في القيمة المدخلة')
        .int('القيمة المدخلة يجب أن يكون عددًا صحيحًا')
        .min(5, 'القيمة المدخلة يجب ألا يقل عن 5')
        .max(100, 'القيمة المدخلة يجب ألا يزيد عن 100'),
    ),
  })
  .passthrough();
export const brandingSchema = z
  .object({
    name: z
      .string({ required_error: 'الاسم مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في الاسم' })
      .min(1, 'الاسم يجب ألا يقل عن 1')
      .max(180, 'الاسم يجب ألا يزيد عن 180'),
    tagline: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .max(160, 'القيمة المدخلة يجب ألا يزيد عن 160'),
    color: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .regex(new RegExp('^#[0-9a-fA-F]{6}$'), 'صيغة القيمة المدخلة غير صحيحة'),
    logo: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .max(160000, 'القيمة المدخلة يجب ألا يزيد عن 160000'),
  })
  .passthrough();
export const organizationSchema = z
  .object({
    name: z
      .string({ required_error: 'الاسم مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في الاسم' })
      .min(1, 'الاسم يجب ألا يقل عن 1')
      .max(180, 'الاسم يجب ألا يزيد عن 180'),
    address: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .max(200, 'القيمة المدخلة يجب ألا يزيد عن 200'),
    phone: z
      .string({
        required_error: 'رقم الهاتف مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في رقم الهاتف',
      })
      .max(40, 'رقم الهاتف يجب ألا يزيد عن 40'),
    multiBranch: z.boolean({
      required_error: 'القيمة المدخلة مطلوب',
      invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
    }),
    policyApproved: z.boolean({
      required_error: 'القيمة المدخلة مطلوب',
      invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
    }),
  })
  .passthrough();
export const branchSchema = z
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
    address: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .max(200, 'القيمة المدخلة يجب ألا يزيد عن 200'),
    active: z
      .boolean({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .optional(),
  })
  .passthrough();
export const generalSettingsSchema = z
  .object({
    profit: z.preprocess(
      (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
      z
        .number({
          required_error: 'القيمة المدخلة مطلوب',
          invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
        })
        .finite('أدخل قيمة صحيحة في القيمة المدخلة')
        .min(0, 'القيمة المدخلة يجب ألا يقل عن 0')
        .max(1000, 'القيمة المدخلة يجب ألا يزيد عن 1000'),
    ),
    discount: z.preprocess(
      (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
      z
        .number({ required_error: 'الخصم مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في الخصم' })
        .finite('أدخل قيمة صحيحة في الخصم')
        .min(0, 'الخصم يجب ألا يقل عن 0')
        .max(100, 'الخصم يجب ألا يزيد عن 100'),
    ),
    price: z.enum(['retail', 'wholesale'], {
      errorMap: () => ({ message: 'اختر قيمة صحيحة في السعر' }),
    }),
  })
  .passthrough();
export const setupCompleteSchema = z
  .object({
    responsible: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1')
      .max(100, 'القيمة المدخلة يجب ألا يزيد عن 100'),
    start: z
      .string({
        required_error: 'تاريخ البداية مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في تاريخ البداية',
      })
      .regex(new RegExp('^\\d{4}-\\d{2}-\\d{2}$'), 'صيغة تاريخ البداية غير صحيحة'),
  })
  .passthrough();
export const importMastersSchema = z
  .object({
    kind: z.enum(['customer', 'supplier', 'product'], {
      errorMap: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }),
    }),
    rows: z
      .array(
        z.record(
          z
            .string({
              required_error: 'القيمة المدخلة مطلوب',
              invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
            })
            .max(300, 'القيمة المدخلة يجب ألا يزيد عن 300'),
        ),
      )
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1')
      .max(200, 'القيمة المدخلة يجب ألا يزيد عن 200'),
  })
  .passthrough();

export const preferencesSchema = z.record(
  z
    .string({
      required_error: 'القيمة المدخلة مطلوب',
      invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
    })
    .max(300, 'القيمة المدخلة يجب ألا يزيد عن 300'),
);
export const systemSettingsSchema = z.union([
  z
    .object({
      section: z.literal('accounting'),
      values: z
        .object({
          multiCurrency: z.boolean({
            required_error: 'القيمة المدخلة مطلوب',
            invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
          }),
          allowNegativeCash: z.boolean({
            required_error: 'القيمة المدخلة مطلوب',
            invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
          }),
          taxEnabled: z
            .boolean({
              required_error: 'القيمة المدخلة مطلوب',
              invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
            })
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
        })
        .passthrough(),
    })
    .passthrough(),
  z
    .object({
      section: z.literal('sales'),
      values: z
        .object({
          defaultPrice: z.enum(['retail', 'wholesale'], {
            errorMap: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }),
          }),
          allowCredit: z.boolean({
            required_error: 'القيمة المدخلة مطلوب',
            invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
          }),
          allowBelowCost: z.boolean({
            required_error: 'القيمة المدخلة مطلوب',
            invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
          }),
          lineDiscount: z.boolean({
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
          allowDraftDelete: z.boolean({
            required_error: 'القيمة المدخلة مطلوب',
            invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
          }),
        })
        .passthrough(),
    })
    .passthrough(),
  z
    .object({
      section: z.literal('purchases'),
      values: z
        .object({
          allowCredit: z.boolean({
            required_error: 'القيمة المدخلة مطلوب',
            invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
          }),
          updatePurchasePrice: z.boolean({
            required_error: 'القيمة المدخلة مطلوب',
            invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
          }),
          preventDuplicateSupplierNumber: z.boolean({
            required_error: 'القيمة المدخلة مطلوب',
            invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
          }),
          allowDraftDelete: z.boolean({
            required_error: 'القيمة المدخلة مطلوب',
            invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
          }),
        })
        .passthrough(),
    })
    .passthrough(),
  z
    .object({
      section: z.literal('inventory'),
      values: z
        .object({
          allowTransfer: z.boolean({
            required_error: 'القيمة المدخلة مطلوب',
            invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
          }),
          allowCrossBranchTransfer: z.boolean({
            required_error: 'القيمة المدخلة مطلوب',
            invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
          }),
          allowAdjustment: z.boolean({
            required_error: 'القيمة المدخلة مطلوب',
            invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
          }),
          requireAdjustmentReason: z.boolean({
            required_error: 'القيمة المدخلة مطلوب',
            invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
          }),
          alert: z.boolean({
            required_error: 'القيمة المدخلة مطلوب',
            invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
          }),
          reorder: z.preprocess(
            (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
            z
              .number({
                required_error: 'القيمة المدخلة مطلوب',
                invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
              })
              .finite('أدخل قيمة صحيحة في القيمة المدخلة')
              .min(0, 'القيمة المدخلة يجب ألا يقل عن 0'),
          ),
          profit: z.preprocess(
            (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
            z
              .number({
                required_error: 'القيمة المدخلة مطلوب',
                invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
              })
              .finite('أدخل قيمة صحيحة في القيمة المدخلة')
              .min(0, 'القيمة المدخلة يجب ألا يقل عن 0')
              .max(1000, 'القيمة المدخلة يجب ألا يزيد عن 1000'),
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
          showZero: z.boolean({
            required_error: 'القيمة المدخلة مطلوب',
            invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
          }),
        })
        .passthrough(),
    })
    .passthrough(),
  z
    .object({
      section: z.literal('expenses'),
      values: z
        .object({
          currency: z.string({
            required_error: 'العملة مطلوب',
            invalid_type_error: 'أدخل قيمة صحيحة في العملة',
          }),
          requireVoucherNote: z.boolean({
            required_error: 'القيمة المدخلة مطلوب',
            invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
          }),
          maxExpense: z.preprocess(
            (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
            z
              .number({
                required_error: 'القيمة المدخلة مطلوب',
                invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
              })
              .finite('أدخل قيمة صحيحة في القيمة المدخلة')
              .min(0, 'القيمة المدخلة يجب ألا يقل عن 0'),
          ),
        })
        .passthrough(),
    })
    .passthrough(),
  z
    .object({
      section: z.literal('documents'),
      values: z
        .object({
          independentBranch: z.boolean({
            required_error: 'القيمة المدخلة مطلوب',
            invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
          }),
          showBranch: z.boolean({
            required_error: 'القيمة المدخلة مطلوب',
            invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
          }),
          showYear: z.boolean({
            required_error: 'القيمة المدخلة مطلوب',
            invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
          }),
          resetYear: z.boolean({
            required_error: 'القيمة المدخلة مطلوب',
            invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
          }),
        })
        .passthrough(),
    })
    .passthrough(),
  z
    .object({
      section: z.literal('branches'),
      values: z
        .object({
          warehouseId: z.string({
            required_error: 'المخزن مطلوب',
            invalid_type_error: 'أدخل قيمة صحيحة في المخزن',
          }),
          purchaseWarehouseId: z.string({
            required_error: 'القيمة المدخلة مطلوب',
            invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
          }),
          cashId: z.string({
            required_error: 'القيمة المدخلة مطلوب',
            invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
          }),
          saleCashId: z.string({
            required_error: 'القيمة المدخلة مطلوب',
            invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
          }),
          purchaseCashId: z.string({
            required_error: 'القيمة المدخلة مطلوب',
            invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
          }),
          expenseCashId: z.string({
            required_error: 'القيمة المدخلة مطلوب',
            invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
          }),
          receiptCashId: z.string({
            required_error: 'القيمة المدخلة مطلوب',
            invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
          }),
          paymentCashId: z.string({
            required_error: 'القيمة المدخلة مطلوب',
            invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
          }),
          priceType: z.enum(['retail', 'wholesale'], {
            errorMap: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }),
          }),
          code: z
            .string({
              required_error: 'القيمة المدخلة مطلوب',
              invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
            })
            .regex(new RegExp('^[A-Z0-9]{1,8}$'), 'صيغة القيمة المدخلة غير صحيحة'),
        })
        .passthrough(),
      branchId: z
        .string({ required_error: 'الفرع مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في الفرع' })
        .min(1, 'الفرع يجب ألا يقل عن 1'),
    })
    .passthrough(),
  z
    .object({
      section: z.literal('company'),
      values: z
        .object({
          name: z
            .string({
              required_error: 'الاسم مطلوب',
              invalid_type_error: 'أدخل قيمة صحيحة في الاسم',
            })
            .min(1, 'الاسم يجب ألا يقل عن 1')
            .max(180, 'الاسم يجب ألا يزيد عن 180'),
          tradeName: z
            .string({
              required_error: 'القيمة المدخلة مطلوب',
              invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
            })
            .min(1, 'القيمة المدخلة يجب ألا يقل عن 1')
            .max(180, 'القيمة المدخلة يجب ألا يزيد عن 180'),
          address: z
            .string({
              required_error: 'القيمة المدخلة مطلوب',
              invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
            })
            .max(200, 'القيمة المدخلة يجب ألا يزيد عن 200'),
          phone: z
            .string({
              required_error: 'رقم الهاتف مطلوب',
              invalid_type_error: 'أدخل قيمة صحيحة في رقم الهاتف',
            })
            .max(40, 'رقم الهاتف يجب ألا يزيد عن 40'),
          email: z.union([
            z.string({
              required_error: 'البريد الإلكتروني مطلوب',
              invalid_type_error: 'أدخل قيمة صحيحة في البريد الإلكتروني',
            }),
            z.literal(''),
          ]),
          activity: z
            .string({
              required_error: 'القيمة المدخلة مطلوب',
              invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
            })
            .max(100, 'القيمة المدخلة يجب ألا يزيد عن 100'),
          taxNumber: z
            .string({
              required_error: 'القيمة المدخلة مطلوب',
              invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
            })
            .max(80, 'القيمة المدخلة يجب ألا يزيد عن 80'),
          registrationNumber: z
            .string({
              required_error: 'القيمة المدخلة مطلوب',
              invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
            })
            .max(80, 'القيمة المدخلة يجب ألا يزيد عن 80'),
          tagline: z
            .string({
              required_error: 'القيمة المدخلة مطلوب',
              invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
            })
            .max(160, 'القيمة المدخلة يجب ألا يزيد عن 160'),
          color: z
            .string({
              required_error: 'القيمة المدخلة مطلوب',
              invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
            })
            .regex(new RegExp('^#[0-9a-fA-F]{6}$'), 'صيغة القيمة المدخلة غير صحيحة'),
          logo: z
            .string({
              required_error: 'القيمة المدخلة مطلوب',
              invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
            })
            .max(160000, 'القيمة المدخلة يجب ألا يزيد عن 160000'),
        })
        .passthrough(),
    })
    .passthrough(),
]);
