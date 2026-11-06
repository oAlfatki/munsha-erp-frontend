import { describe, it, expect } from 'vitest';
import examples from '../fixtures/command-examples.json';
import * as inventory from '@/features/stock/validations/inventory-schema';
import * as parties from '@/features/parties/validations/parties-schema';
import * as employees from '@/features/employees/validations/employees-schema';
import * as trade from '@/features/trade/validations/trade-schema';
import * as expenses from '@/features/expenses/validations/expenses-schema';
import * as settings from '@/features/organization/validations/settings-schema';
import * as accounting from '@/features/ledger/validations/accounting-schema';
import { currencySchema } from '@/features/ledger/validations/currency-schema';
import { masterSchema } from '@/features/master-data/validations/master-schema';
import * as sales from '@/features/sales/invoices/validations/sales-schema';
import { mapCustomerInput } from '@/features/customers/mappers/customers-mapper';
import { mapInvoiceInput } from '@/features/trade/mappers/trade-mapper';
import type { SavePartyRequest } from '@/features/parties/types/requests/SavePartyRequest';
import type { SaveInvoiceRequest } from '@/features/trade/types/requests/SaveInvoiceRequest';

const party = examples.party.data as SavePartyRequest;
const invoice = examples.invoice.data as SaveInvoiceRequest;
const schemas = {
  product: inventory.productSchema,
  warehouse: inventory.warehouseSchema,
  transfer: inventory.transferSchema,
  stockDocument: inventory.stockDocumentSchema,
  deleteStockDraft: inventory.deleteStockDraftSchema,
  priceList: inventory.priceListSchema,
  party: parties.partySchema,
  employee: employees.employeeSchema,
  employeeDelete: employees.employeeDeleteSchema,
  invoice: trade.invoiceSchema,
  deleteDraft: trade.deleteDraftSchema,
  return: trade.returnSchema,
  partialReturn: trade.partialReturnSchema,
  expense: expenses.expenseSchema,
  expenseSave: expenses.expenseSaveSchema,
  expensePayment: expenses.expensePaymentSchema,
  expenseConsume: expenses.expenseConsumeSchema,
  backupSettings: settings.backupSettingsSchema,
  branding: settings.brandingSchema,
  organization: settings.organizationSchema,
  branch: settings.branchSchema,
  generalSettings: settings.generalSettingsSchema,
  setupComplete: settings.setupCompleteSchema,
  importMasters: settings.importMastersSchema,
  currency: currencySchema,
  preferences: settings.preferencesSchema,
  systemSettings: settings.systemSettingsSchema,
  contactEntry: accounting.contactEntrySchema,
  contactVoucher: accounting.contactVoucherSchema,
  periodSwitch: accounting.periodSwitchSchema,
  periodCreate: accounting.periodCreateSchema,
  periodTransfer: accounting.periodTransferSchema,
  periodActivate: accounting.periodActivateSchema,
  periodReset: accounting.periodResetSchema,
  screenDraft: accounting.screenDraftSchema,
  master: masterSchema,
  manualJournal: accounting.manualJournalSchema,
  operation: accounting.operationSchema,
  voucher: accounting.voucherSchema,
  salesTarget: sales.salesTargetSchema,
};

describe('typed command boundaries', () => {
  for (const [name, example] of Object.entries(examples)) {
    it('validates documented request ' + name, () => {
      expect(schemas[example.type as keyof typeof schemas].safeParse(example.data).success).toBe(
        true,
      );
    });
  }
  it('converts a numeric screen input into a numeric backend request without mutating input', () => {
    const input = { ...party, limit: '1200.50' };
    const result = mapCustomerInput(input);
    expect(result.limit).toBe(1200.5);
    expect(input.limit).toBe('1200.50');
  });
  it('rejects invalid amounts and does not silently accept empty numeric inputs', () => {
    expect(() => mapCustomerInput({ ...party, limit: '' })).toThrow();
    expect(() => mapCustomerInput({ ...party, limit: -1 })).toThrow();
  });
  it('normalizes invoice line numbers at the mapper boundary', () => {
    const input = {
      ...invoice,
      lines: examples.invoice.data.lines.map((l) => ({ ...l, qty: String(l.qty) })),
    };
    expect(mapInvoiceInput(input).lines[0].qty).toBe(examples.invoice.data.lines[0].qty);
  });
});
