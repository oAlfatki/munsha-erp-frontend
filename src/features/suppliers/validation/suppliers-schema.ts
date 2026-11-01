import { partySchema } from '@/features/parties/validation/parties-schema';
import { z } from 'zod';
export const suppliersFilterSchema = z.object({
  query: z
    .string({
      required_error: 'القيمة المدخلة مطلوب',
      invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
    })
    .max(200, 'القيمة المدخلة يجب ألا يزيد عن 200'),
});
export const supplierInputSchema = partySchema.omit({ kind: true });
