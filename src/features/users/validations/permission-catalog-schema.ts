import { z } from 'zod';

const decimalSchema = z
  .string()
  .regex(/^(0|[1-9][0-9]*)$/)
  .refine((v) => BigInt(v) < 1n << 64n);
export const permissionCatalogSchema = z.object({
  modules: z.array(
    z.object({
      moduleCode: z.string().min(1),
      nameAr: z.string(),
      nameEn: z.string(),
      definitions: z.array(
        z.object({
          code: z.string().min(1),
          bitValue: decimalSchema,
          nameAr: z.string(),
          nameEn: z.string(),
          descriptionAr: z.string().optional(),
        }),
      ),
    }),
  ),
});
