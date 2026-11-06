import { expect, it } from 'vitest';
import { styleFingerprint } from '../../scripts/inspect-styles.mjs';
import baseline from '../fixtures/style-cascade-baseline.json';

it('preserves the complete ordered CSS cascade when ownership files move', () => {
  expect(styleFingerprint()).toBe(baseline.sha256);
});
