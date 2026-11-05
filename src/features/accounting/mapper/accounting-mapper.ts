import {
  contactEntrySchema,
  contactVoucherSchema,
  manualJournalSchema,
  operationSchema,
  periodActivateSchema,
  periodCreateSchema,
  periodResetSchema,
  periodSwitchSchema,
  periodTransferSchema,
  screenDraftSchema,
  voucherSchema,
} from '@/features/ledger/public/accounting-schema';
import type { SaveContactEntryRequest } from '@/features/ledger/public/types/requests/SaveContactEntryRequest';
import type { SaveContactVoucherRequest } from '@/features/ledger/public/types/requests/SaveContactVoucherRequest';
import type { SaveManualJournalRequest } from '@/features/ledger/public/types/requests/SaveManualJournalRequest';
import type { SaveOperationRequest } from '@/features/ledger/public/types/requests/SaveOperationRequest';
import type { SavePeriodActivateRequest } from '@/features/ledger/public/types/requests/SavePeriodActivateRequest';
import type { SavePeriodCreateRequest } from '@/features/ledger/public/types/requests/SavePeriodCreateRequest';
import type { SavePeriodResetRequest } from '@/features/ledger/public/types/requests/SavePeriodResetRequest';
import type { SavePeriodSwitchRequest } from '@/features/ledger/public/types/requests/SavePeriodSwitchRequest';
import type { SavePeriodTransferRequest } from '@/features/ledger/public/types/requests/SavePeriodTransferRequest';
import type { SaveScreenDraftRequest } from '@/features/ledger/public/types/requests/SaveScreenDraftRequest';
import type { SaveVoucherRequest } from '@/features/ledger/public/types/requests/SaveVoucherRequest';
export const mapContactEntryInput = (input: unknown): SaveContactEntryRequest =>
  contactEntrySchema.parse(input) as SaveContactEntryRequest;
export const mapContactVoucherInput = (input: unknown): SaveContactVoucherRequest =>
  contactVoucherSchema.parse(input) as SaveContactVoucherRequest;
export const mapPeriodSwitchInput = (input: unknown): SavePeriodSwitchRequest =>
  periodSwitchSchema.parse(input) as SavePeriodSwitchRequest;
export const mapPeriodCreateInput = (input: unknown): SavePeriodCreateRequest =>
  periodCreateSchema.parse(input) as SavePeriodCreateRequest;
export const mapPeriodTransferInput = (input: unknown): SavePeriodTransferRequest =>
  periodTransferSchema.parse(input) as SavePeriodTransferRequest;
export const mapPeriodActivateInput = (input: unknown): SavePeriodActivateRequest =>
  periodActivateSchema.parse(input) as SavePeriodActivateRequest;
export const mapPeriodResetInput = (input: unknown): SavePeriodResetRequest =>
  periodResetSchema.parse(input) as SavePeriodResetRequest;
export const mapScreenDraftInput = (input: unknown): SaveScreenDraftRequest =>
  screenDraftSchema.parse(input) as SaveScreenDraftRequest;

export const mapManualJournalInput = (input: unknown): SaveManualJournalRequest =>
  manualJournalSchema.parse(input) as SaveManualJournalRequest;
export const mapOperationInput = (input: unknown): SaveOperationRequest =>
  operationSchema.parse(input) as SaveOperationRequest;
export const mapVoucherInput = (input: unknown): SaveVoucherRequest =>
  voucherSchema.parse(input) as SaveVoucherRequest;
