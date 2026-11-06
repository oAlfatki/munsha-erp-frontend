import { it, expect } from 'vitest';
import { inspectArchitecture } from '../../scripts/check-architecture.mjs';

it('enforces infrastructure boundaries, deliberate public contracts and acyclic runtime dependencies', () => {
  const result = inspectArchitecture();
  expect(result.errors).toEqual([]);
  expect(result.fileCycles).toEqual([]);
  expect(result.featureCycles).toEqual([]);
  expect(result.typeInclusiveFeatureCycles).toEqual([]);
}, 30000);
