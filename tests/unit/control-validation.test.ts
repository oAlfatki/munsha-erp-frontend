import { it, expect } from 'vitest';
import { validateControl } from '@/shared/ui/forms/control-validation';

it('rejects whitespace in required controls', () =>
  expect(validateControl(' ', { required: true }, 'الاسم')).toBe('الاسم إجباري'));
it('allows empty optional numeric controls', () =>
  expect(validateControl('', { type: 'number', min: 0 }, 'المبلغ')).toBe(true));
it('rejects negative amounts at a numeric minimum', () =>
  expect(validateControl('-1', { type: 'number', min: 0 }, 'المبلغ')).not.toBe(true));
it('does not convert an empty required numeric value to zero', () =>
  expect(validateControl('', { type: 'number', required: true, min: 0 }, 'المبلغ')).not.toBe(true));
it('accepts decimal amounts without formatting the payload', () =>
  expect(validateControl('1200.50', { type: 'number', required: true, min: 0 }, 'المبلغ')).toBe(
    true,
  ));
it('validates email controls with Zod', () =>
  expect(validateControl('wrong', { type: 'email' }, 'البريد')).not.toBe(true));
