import { z } from 'zod';
const percentSchema = z
    .number({
      required_error: 'القيمة المدخلة مطلوب',
      invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
    })
    .finite('أدخل قيمة صحيحة في القيمة المدخلة')
    .min(0, 'القيمة المدخلة يجب ألا يقل عن 0')
    .max(100, 'القيمة المدخلة يجب ألا يزيد عن 100'),
  boolSchema = z.boolean({
    required_error: 'القيمة المدخلة مطلوب',
    invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
  });
export const SETTINGS_SCHEMAS = {
  accounting: z.object({
    multiCurrency: boolSchema,
    allowNegativeCash: boolSchema,
    taxEnabled: boolSchema.default(false),
    taxRate: percentSchema.default(0),
  }),
  sales: z.object({
    defaultPrice: z.enum(['retail', 'wholesale'], {
      errorMap: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }),
    }),
    allowCredit: boolSchema,
    allowBelowCost: boolSchema,
    lineDiscount: boolSchema,
    maxDiscount: percentSchema,
    allowDraftDelete: boolSchema,
  }),
  purchases: z.object({
    allowCredit: boolSchema,
    updatePurchasePrice: boolSchema,
    preventDuplicateSupplierNumber: boolSchema,
    allowDraftDelete: boolSchema,
  }),
  inventory: z.object({
    allowTransfer: boolSchema,
    allowCrossBranchTransfer: boolSchema,
    allowAdjustment: boolSchema,
    requireAdjustmentReason: boolSchema,
    alert: boolSchema,
    reorder: z
      .number({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .finite('أدخل قيمة صحيحة في القيمة المدخلة')
      .nonnegative('القيمة المدخلة لا يمكن أن يكون سالبًا'),
    profit: z
      .number({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .finite('أدخل قيمة صحيحة في القيمة المدخلة')
      .min(0, 'القيمة المدخلة يجب ألا يقل عن 0')
      .max(1000, 'القيمة المدخلة يجب ألا يزيد عن 1000'),
    discount: percentSchema,
    showZero: boolSchema,
  }),
  expenses: z.object({
    currency: z.string({
      required_error: 'العملة مطلوب',
      invalid_type_error: 'أدخل قيمة صحيحة في العملة',
    }),
    requireVoucherNote: boolSchema,
    maxExpense: z
      .number({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .finite('أدخل قيمة صحيحة في القيمة المدخلة')
      .nonnegative('القيمة المدخلة لا يمكن أن يكون سالبًا'),
  }),
  documents: z.object({
    independentBranch: boolSchema,
    showBranch: boolSchema,
    showYear: boolSchema,
    resetYear: boolSchema,
  }),
  branches: z.object({
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
      .regex(/^[A-Z0-9]{1,8}$/, 'صيغة القيمة المدخلة غير صحيحة'),
  }),
  company: z.object({
    name: z
      .string({ required_error: 'الاسم مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في الاسم' })
      .trim()
      .min(1, 'الاسم يجب ألا يقل عن 1')
      .max(180, 'الاسم يجب ألا يزيد عن 180'),
    tradeName: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .trim()
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
      z
        .string({
          required_error: 'البريد الإلكتروني مطلوب',
          invalid_type_error: 'أدخل قيمة صحيحة في البريد الإلكتروني',
        })
        .email('أدخل بريدًا إلكترونيًا صحيحًا'),
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
      .regex(/^#[0-9a-fA-F]{6}$/, 'صيغة القيمة المدخلة غير صحيحة'),
    logo: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .max(160000, 'القيمة المدخلة يجب ألا يزيد عن 160000')
      .refine(
        (v) => !v || /^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(v),
        'صيغة القيمة المدخلة غير صحيحة',
      ),
  }),
};
