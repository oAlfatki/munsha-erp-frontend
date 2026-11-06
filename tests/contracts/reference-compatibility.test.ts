import { expect, it } from 'vitest';
import { createSeed } from '../reference/domain/engine';
import { applyExtended, extras } from '../reference/domain/extensions';

it('keeps the frozen reference record operations usable with the modern validation runtime', () => {
  const state = createSeed();
  expect(applyExtended(state, 'preferences', { theme: 'dark' })).toBe(true);
  expect(extras(state).preferences.theme).toBe('dark');
  expect(applyExtended(state, 'screenDraft', { screen: 'test', values: { code: 'A' } })).toBe(true);
  expect(extras(state).drafts.test).toEqual({ code: 'A' });
  expect(() => applyExtended(state, 'preferences', { theme: 42 })).toThrow();
});
