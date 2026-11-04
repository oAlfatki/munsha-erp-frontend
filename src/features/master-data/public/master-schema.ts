import { z } from 'zod';
export const masterSchema = z
  .object({
    collection: z.enum(
      [
        'units',
        'categories',
        'groups',
        'productGroups',
        'expenseTypes',
        'accounts',
        'cash',
        'assets',
        'contacts',
        'users',
      ],
      { errorMap: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }) },
    ),
    record: z
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
          .max(200, 'الاسم يجب ألا يزيد عن 200'),
        active: z.boolean({
          required_error: 'القيمة المدخلة مطلوب',
          invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
        }),
      })
      .passthrough(),
  })
  .passthrough();
