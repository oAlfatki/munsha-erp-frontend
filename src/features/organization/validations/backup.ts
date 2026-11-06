import { fieldTypeError } from '@/core/validation/type-errors';
import { z } from 'zod';

export const backupStateSchema = z
  .object({
    organization: z
      .object({
        name: z.string({
          error: fieldTypeError('الاسم مطلوب', 'أدخل قيمة صحيحة في الاسم'),
        }),
        year: z
          .number({
            error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
          })
          .int('القيمة المدخلة يجب أن يكون عددًا صحيحًا'),
        currency: z.string({
          error: fieldTypeError('العملة مطلوب', 'أدخل قيمة صحيحة في العملة'),
        }),
      })
      .loose(),
    branches: z.array(
      z
        .object({
          id: z.string({
            error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
          }),
          name: z.string({
            error: fieldTypeError('الاسم مطلوب', 'أدخل قيمة صحيحة في الاسم'),
          }),
          active: z.boolean({
            error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
          }),
        })
        .loose(),
    ),
    warehouses: z.array(z.unknown()),
    products: z.array(z.unknown()),
    parties: z.array(z.unknown()),
    employees: z.array(z.unknown()),
    stocks: z.array(z.unknown()),
    invoices: z.array(z.unknown()),
    entries: z.array(z.unknown()),
    movements: z.array(z.unknown()),
    expenses: z.array(z.unknown()),
    currencies: z.array(z.unknown()),
    processed: z.array(
      z.string({
        error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
      }),
    ),
    audit: z.array(z.unknown()),
  })
  .loose();

export function validateBackupState(value: unknown) {

  const text = JSON.stringify(value);
  if (new TextEncoder().encode(text).length > 1500000) throw new Error('النسخة تتجاوز حد 1.5MB');

  const safe = (v: unknown, depth = 0): void => {

    if (depth > 35) throw new Error('تداخل غير صالح في النسخة');
    if (v && typeof v === 'object')
      for (const [key, child] of Object.entries(v)) {
        if (['__proto__', 'constructor', 'prototype'].includes(key))
          throw new Error('مفتاح غير مسموح');
        safe(child, depth + 1);
      }
  };

  safe(value);
  return backupStateSchema.parse(value);
}
