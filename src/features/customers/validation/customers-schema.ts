import { partySchema } from "@/features/parties/public/parties-schema";
import { z } from 'zod';
export const customersFilterSchema = z.object({
  query: z
    .string({
      required_error: 'القيمة المدخلة مطلوب',
      invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
    })
    .max(200, 'القيمة المدخلة يجب ألا يزيد عن 200'),
});
export const customerInputSchema = partySchema.omit({ kind: true });
