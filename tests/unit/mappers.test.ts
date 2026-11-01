import { describe, it, expect } from "vitest";
import examples from "../fixtures/command-examples.json";
import * as inventory from '@/features/inventory/validation/inventory-schema';
import * as parties from '@/features/parties/validation/parties-schema';
import * as employees from '@/features/employees/validation/employees-schema';
import * as trade from '@/features/trade/validation/trade-schema';
import * as expenses from '@/features/expenses/validation/expenses-schema';
import * as settings from '@/features/settings/validation/settings-schema';
import * as accounting from '@/features/accounting/validation/accounting-schema';
import * as sales from '@/features/sales/validation/sales-schema';
import { mapPartyInput } from "@/features/parties/mapper/parties-mapper";
import { mapInvoiceInput } from "@/features/trade/mapper/trade-mapper";
import type { SavePartyRequest } from "@/features/parties/types/requests/SavePartyRequest";
import type { SaveInvoiceRequest } from "@/features/trade/types/requests/SaveInvoiceRequest";
const party=examples.party.data as SavePartyRequest;const invoice=examples.invoice.data as SaveInvoiceRequest;
const schemas={product:inventory.productSchema,warehouse:inventory.warehouseSchema,transfer:inventory.transferSchema,stockDocument:inventory.stockDocumentSchema,deleteStockDraft:inventory.deleteStockDraftSchema,priceList:inventory.priceListSchema,party:parties.partySchema,employee:employees.employeeSchema,employeeDelete:employees.employeeDeleteSchema,invoice:trade.invoiceSchema,deleteDraft:trade.deleteDraftSchema,return:trade.returnSchema,partialReturn:trade.partialReturnSchema,expense:expenses.expenseSchema,expenseSave:expenses.expenseSaveSchema,expensePayment:expenses.expensePaymentSchema,expenseConsume:expenses.expenseConsumeSchema,backupSettings:settings.backupSettingsSchema,branding:settings.brandingSchema,organization:settings.organizationSchema,branch:settings.branchSchema,generalSettings:settings.generalSettingsSchema,setupComplete:settings.setupCompleteSchema,importMasters:settings.importMastersSchema,currency:settings.currencySchema,preferences:settings.preferencesSchema,systemSettings:settings.systemSettingsSchema,permissions:accounting.permissionsSchema,contactEntry:accounting.contactEntrySchema,contactVoucher:accounting.contactVoucherSchema,periodSwitch:accounting.periodSwitchSchema,periodCreate:accounting.periodCreateSchema,periodTransfer:accounting.periodTransferSchema,periodActivate:accounting.periodActivateSchema,periodReset:accounting.periodResetSchema,screenDraft:accounting.screenDraftSchema,master:accounting.masterSchema,manualJournal:accounting.manualJournalSchema,operation:accounting.operationSchema,voucher:accounting.voucherSchema,salesTarget:sales.salesTargetSchema};

describe('typed command boundaries',()=>{
 for(const [name,example] of Object.entries(examples)){it('validates documented request '+name,()=>{expect(schemas[example.type as keyof typeof schemas].safeParse(example.data).success).toBe(true);});}
 it('converts a numeric screen input into a numeric backend request without mutating input',()=>{const input={...party,limit:'1200.50'};const result=mapPartyInput(input);expect(result.limit).toBe(1200.5);expect(input.limit).toBe('1200.50');});
 it('rejects invalid amounts and does not silently accept empty numeric inputs',()=>{expect(()=>mapPartyInput({...party,limit:''})).toThrow();expect(()=>mapPartyInput({...party,limit:-1})).toThrow();});
 it('normalizes invoice line numbers at the mapper boundary',()=>{const input={...invoice,lines:examples.invoice.data.lines.map(l=>({...l,qty:String(l.qty)}))};expect(mapInvoiceInput(input).lines[0].qty).toBe(examples.invoice.data.lines[0].qty);});
});
