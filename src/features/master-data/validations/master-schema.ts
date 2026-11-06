import { fieldTypeError } from '@/core/validation/type-errors';
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
      { error: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }) },
    ),
    record: z
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
          .max(200, 'الاسم يجب ألا يزيد عن 200'),
        active: z.boolean({
          error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
        }),
      })
      .loose(),
  })
  .loose();
