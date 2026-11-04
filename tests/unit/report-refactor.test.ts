import { describe, it, expect } from 'vitest';
import baseline from '../fixtures/report-refactor-baseline.json';
import manifest from '../fixtures/report-module-map.json';
const modules = import.meta.glob('../../src/features/*/services/reports/*.ts', {
  eager: true,
}) as Record<string, Record<string, Function>>;
describe('Feature-owned reports preserve existing results', () => {
  for (const c of baseline.cases) {
    it(`${c.key} / ${c.branch} / ${c.filters.query || 'all'}`, () => {
      const entry = manifest[c.key as keyof typeof manifest];
      const module = modules['../../' + entry.file];
      // Compare the same JSON representation used to capture fixtures (JSON normalizes negative zero).
      expect(
        JSON.parse(JSON.stringify(module[entry.fname](baseline.state, c.branch, c.filters))),
      ).toEqual(c.expected);
    });
  }
});
