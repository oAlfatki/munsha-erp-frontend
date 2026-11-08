import { expect, it } from 'vitest';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { inspectStyles } from '../../scripts/inspect-styles.mjs';
import baseline from '../fixtures/style-cascade-baseline.json';

it('preserves the existing ordered cascade and appends only the approved access-control stylesheet', () => {
  const styles = inspectStyles(resolve('src/app/styles.css'));
  const accessStyles = inspectStyles(resolve('src/features/users/styles/access-control.css'));
  expect(accessStyles.length).toBeGreaterThan(0);
  expect(styles.slice(-accessStyles.length)).toEqual(accessStyles);
  expect(
    createHash('sha256')
      .update(JSON.stringify(styles.slice(0, -accessStyles.length)))
      .digest('hex'),
  ).toBe(baseline.sha256);
});
