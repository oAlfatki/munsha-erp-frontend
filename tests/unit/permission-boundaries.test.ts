import { expect, it } from 'vitest';
import { canRunCommand } from '@/core/auth/permissions';

it.each(['constructor', '__proto__', 'toString', 'hasOwnProperty', 'unknown-operation'])(
  'denies unbound command %s without inheriting a prototype entry',
  (command) => {
    expect(canRunCommand({ status: 'ready', grants: [] }, command, {}, '1')).toBe(false);
  },
);
