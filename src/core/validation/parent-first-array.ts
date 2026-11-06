import { z } from 'zod';

/** Keep array-level messages ahead of item messages, matching the existing form contract. */

export function parentFirstArray<TSchema extends z.ZodArray>(arraySchema: TSchema) {

  return z.unknown().transform((value, context): z.output<TSchema> => {
    const result = arraySchema.safeParse(value);
    if (result.success) return result.data;
    const issues = [...result.error.issues].sort(
      (left, right) => Number(left.path.length > 0) - Number(right.path.length > 0),
    );
    for (const issue of issues) context.addIssue({ ...issue });
    return z.NEVER;
  });
}
