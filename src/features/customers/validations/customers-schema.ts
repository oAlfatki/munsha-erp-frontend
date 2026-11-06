import { fieldTypeError } from '@/core/validation/type-errors';
import { partySchema } from '@/features/parties/public';
import { z } from 'zod';

export const customersFilterSchema = z.object({
  query: z
    .string({
      error: fieldTypeError('القيمة المدخلة مطلوب', 'أدخل قيمة صحيحة في القيمة المدخلة'),
    })
    .max(200, 'القيمة المدخلة يجب ألا يزيد عن 200'),
});
export const customerInputSchema = partySchema.omit({ kind: true });
