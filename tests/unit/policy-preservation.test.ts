import { it, expect } from 'vitest';
import { createSeed } from '../reference/domain/engine';
import { systemSettings, validatePolicy } from '../reference/domain/system-settings';
import manifest from '../../docs/architecture/POLICY_SPECIALIZATION.json';
import examples from '../fixtures/command-examples.json';
const modules = import.meta.glob('../../src/features/organization/public/*-policy.ts', {
  eager: true,
}) as Record<string, Record<string, (state: ReturnType<typeof createSeed>, raw: unknown) => void>>;
function outcome(run: () => void) {
  try {
    run();
    return null;
  } catch (error) {
    return error instanceof Error ? error.message : String(error);
  }
}
for (const entry of manifest)
  it('preserves original policy decisions and messages: ' + entry.command, () => {
    const current = Object.values(modules).find(
      (module) => typeof module[entry.name] === 'function',
    )?.[entry.name];
    expect(current).toBeTypeOf('function');
    const seed = createSeed();
    const defaultSettings = systemSettings(seed);
    const restrictive = structuredClone(defaultSettings);
    restrictive.sales.allowCredit = false;
    restrictive.purchases.allowCredit = false;
    restrictive.sales.allowDraftDelete = false;
    restrictive.purchases.allowDraftDelete = false;
    restrictive.inventory.allowTransfer = false;
    restrictive.inventory.allowAdjustment = false;
    restrictive.inventory.allowCrossBranchTransfer = false;
    restrictive.inventory.requireAdjustmentReason = true;
    restrictive.accounting.multiCurrency = false;
    restrictive.expenses.requireVoucherNote = true;
    restrictive.expenses.maxExpense = 50;
    const broad = structuredClone(defaultSettings);
    broad.inventory.allowTransfer = true;
    broad.inventory.allowCrossBranchTransfer = true;
    broad.inventory.allowAdjustment = true;
    broad.expenses.requireVoucherNote = false;
    broad.accounting.multiCurrency = true;
    const originalInput = Object.values(examples).find((e) => e.type === entry.command)?.data;
    const cases = [
      undefined,
      null,
      'invalid',
      {},
      originalInput,
      ...['sale', 'purchase', 'transfer', 'adjustment'].flatMap((kind) =>
        ['final', 'draft'].flatMap((status) =>
          ['cash', 'credit', 'mixed'].map((payment) => ({
            kind,
            status,
            payment,
            currency: 'USD',
            amount: 100,
            rate: 2,
            note: '',
            id: seed.invoices[0]?.id,
            from: seed.warehouses[0]?.id,
            to: seed.warehouses.at(-1)?.id,
            warehouseId: seed.warehouses[0]?.id,
            toWarehouseId: seed.warehouses.at(-1)?.id,
          })),
        ),
      ),
    ];
    for (const settings of [defaultSettings, restrictive, broad])
      for (const input of cases) {
        const state = { ...structuredClone(seed), systemSettings: settings };
        const before = JSON.stringify(state);
        expect(
          outcome(() => current!(state, input)),
          entry.command + ' ' + JSON.stringify(input),
        ).toBe(outcome(() => validatePolicy(state, entry.command, input)));
        expect(JSON.stringify(state)).toBe(before);
      }
  });
