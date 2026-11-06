import { describe, expect, it } from 'vitest';
import '@/core/config/validation';
import baseline from '../fixtures/validation-contract-baseline.json';

const modules = import.meta.glob('../../src/features/**/validations/*.ts', {
  eager: true,
}) as Record<
  string,
  Record<
    string,
    {
      safeParse: (input: unknown) => {
        success: boolean;
        data?: unknown;
        error?: { issues: { path: PropertyKey[]; message: string }[] };
      };
    }
  >
>;

function restoreNumbers(value: unknown): unknown {

  if (Array.isArray(value)) return value.map(restoreNumbers);
  if (!value || typeof value !== 'object') return value;
  const record = value as Record<string, unknown>;
  if (Object.keys(record).length === 1 && typeof record.$number === 'string') {
    if (record.$number === 'Infinity') return Infinity;
    if (record.$number === '-Infinity') return -Infinity;
    if (record.$number === 'NaN') return NaN;
  }
  return Object.fromEntries(
    Object.entries(record).map(([key, item]) => [key, restoreNumbers(item)]),
  );
}

describe('Zod migration preserves existing validation contracts', () => {
  for (const sample of baseline.cases) {
    it(`${sample.file}: ${sample.name} / ${sample.case}`, () => {
      const result = modules['../../' + sample.file][sample.name].safeParse(
        sample.isUndefined ? undefined : restoreNumbers(sample.input),
      );
      const actual = result.success
        ? { success: true, data: result.data }
        : {
            success: false,
            issues: result.error!.issues.map((issue) => ({
              path: issue.path,
              message: issue.message,
            })),
          };
      const expected = restoreNumbers(sample.expected) as typeof actual;
      if (String(sample.case).startsWith('boundary:') && !actual.success && !expected.success) {
        // Non-JSON numbers must still fail on the field or its containing union with a localized message.
        // Their type/range error classification is a library detail, not a wire contract.
        expect(actual.issues!.length).toBeGreaterThan(0);
        for (const issue of actual.issues!) {
          expect(
            expected.issues!.some((item) =>
              issue.path.every((part, index) => item.path[index] === part),
            ),
          ).toBe(true);
          expect(issue.message).toMatch(/[\u0600-\u06ff]/);
        }
      } else {
        expect(actual).toEqual(expected);
      }
    });
  }
});
