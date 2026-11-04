import type { SaveContactEntryRequest } from '@/features/accounting/types/requests/SaveContactEntryRequest';
import type { SaveContactVoucherRequest } from '@/features/accounting/types/requests/SaveContactVoucherRequest';
import type { SaveManualJournalRequest } from '@/features/accounting/types/requests/SaveManualJournalRequest';
import type { SaveMasterRequest } from '@/features/accounting/types/requests/SaveMasterRequest';
import type { SaveOperationRequest } from '@/features/accounting/types/requests/SaveOperationRequest';
import type { SavePeriodActivateRequest } from '@/features/accounting/types/requests/SavePeriodActivateRequest';
import type { SavePeriodCreateRequest } from '@/features/accounting/types/requests/SavePeriodCreateRequest';
import type { SavePeriodResetRequest } from '@/features/accounting/types/requests/SavePeriodResetRequest';
import type { SavePeriodSwitchRequest } from '@/features/accounting/types/requests/SavePeriodSwitchRequest';
import type { SavePeriodTransferRequest } from '@/features/accounting/types/requests/SavePeriodTransferRequest';
import type { SavePermissionsRequest } from '@/features/accounting/types/requests/SavePermissionsRequest';
import type { SaveScreenDraftRequest } from '@/features/accounting/types/requests/SaveScreenDraftRequest';
import type { SaveVoucherRequest } from '@/features/accounting/types/requests/SaveVoucherRequest';
import {
contactEntrySchema,
contactVoucherSchema,
manualJournalSchema,
masterSchema,
operationSchema,
periodActivateSchema,
periodCreateSchema,
periodResetSchema,
periodSwitchSchema,
periodTransferSchema,
permissionsSchema,
screenDraftSchema,
voucherSchema,
} from "@/features/accounting/public/accounting-schema";
export const mapPermissionsInput = (input: unknown): SavePermissionsRequest =>
  permissionsSchema.parse(input) as SavePermissionsRequest;
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
export const mapMasterInput = (input: unknown): SaveMasterRequest =>
  masterSchema.parse(input) as SaveMasterRequest;
export const mapManualJournalInput = (input: unknown): SaveManualJournalRequest =>
  manualJournalSchema.parse(input) as SaveManualJournalRequest;
export const mapOperationInput = (input: unknown): SaveOperationRequest =>
  operationSchema.parse(input) as SaveOperationRequest;
export const mapVoucherInput = (input: unknown): SaveVoucherRequest =>
  voucherSchema.parse(input) as SaveVoucherRequest;
