import { afterAll, beforeAll, expect, it, vi } from 'vitest';
import baseline from '../fixtures/active-report-baseline.json';

const modules = import.meta.glob('../../src/features/**/build-*.ts', { eager: true }) as Record<
  string,
  Record<string, (state: unknown, branch: string, filters: unknown) => unknown>
>;

beforeAll(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(baseline.date));
});
afterAll(() => vi.useRealTimers());

for (const sample of baseline.cases) {
  it(`${sample.file} / ${sample.name} / ${sample.branch} / ${JSON.stringify(sample.filters)}`, () => {
    const result = modules['../../' + sample.file][sample.name](
      structuredClone(baseline.state),
      sample.branch,
      structuredClone(sample.filters),
    );
    expect(JSON.parse(JSON.stringify(result))).toEqual(sample.expected);
  });
}
