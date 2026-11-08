import { z } from 'zod';

const bitValueSchema = z.string().refine((value) => {
  if (!/^[1-9][0-9]*$/.test(value)) return false;
  const bit = BigInt(value);
  return bit < 1n << 64n && (bit & (bit - 1n)) === 0n;
}, 'تعريف الصلاحيات غير صالح.');
const actionSchema = z.object({
  code: z.string().min(1),
  bitValue: bitValueSchema,
  nameAr: z.string(),
  nameEn: z.string(),
  descriptionAr: z.string().optional(),
});
const featureSchema = z.object({
  featureCode: z.string().min(1),
  nameAr: z.string(),
  nameEn: z.string(),
  actions: z.array(actionSchema),
});
const hierarchicalModuleSchema = z
  .object({
    moduleCode: z.string().min(1),
    nameAr: z.string(),
    nameEn: z.string(),
    features: z.array(featureSchema),
    definitions: z.never().optional(),
  })
  .transform((module) => ({
    ...module,
    definitions: module.features.flatMap((feature) =>
      feature.actions.map((action) => ({ ...action, featureCode: feature.featureCode })),
    ),
  }));
const legacyModuleSchema = z
  .object({
    moduleCode: z.string().min(1),
    nameAr: z.string(),
    nameEn: z.string(),
    definitions: z.array(actionSchema),
    features: z.never().optional(),
  })
  .transform((module) => ({
    ...module,
    features: [
      {
        featureCode: 'general',
        nameAr: 'عمليات القسم',
        nameEn: 'General',
        actions: module.definitions,
      },
    ],
    definitions: module.definitions.map((action) => ({ ...action, featureCode: 'general' })),
  }));
export const permissionCatalogSchema = z
  .object({
    capabilities: z
      .object({ roles: z.boolean() })
      .optional()
      .transform((value) => value || { roles: false }),
    modules: z.array(z.union([hierarchicalModuleSchema, legacyModuleSchema])),
  })
  .superRefine((catalog, context) => {
    const modules = new Set<string>();
    const codes = new Set<string>();
    for (const module of catalog.modules) {
      if (modules.has(module.moduleCode))
        context.addIssue({ code: 'custom', message: 'تعريف أقسام الصلاحيات مكرر.' });
      modules.add(module.moduleCode);
      const features = new Set<string>();
      const bits = new Set<string>();
      for (const feature of module.features) {
        if (features.has(feature.featureCode))
          context.addIssue({ code: 'custom', message: 'تعريف ميزات الصلاحيات مكرر.' });
        features.add(feature.featureCode);
      }
      for (const definition of module.definitions) {
        if (bits.has(definition.bitValue) || codes.has(definition.code))
          context.addIssue({ code: 'custom', message: 'تعريف الصلاحيات غير صالح.' });
        bits.add(definition.bitValue);
        codes.add(definition.code);
      }
    }
  });
