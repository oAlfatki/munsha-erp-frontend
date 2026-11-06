import type {
  SavePeriodActivateRequest,
  SavePeriodCreateRequest,
  SavePeriodResetRequest,
  SavePeriodSwitchRequest,
  SavePeriodTransferRequest,
  SaveScreenDraftRequest,
} from '@/features/ledger/public';
import {
  periodActivateSchema,
  periodCreateSchema,
  periodResetSchema,
  periodSwitchSchema,
  periodTransferSchema,
  screenDraftSchema,
} from '@/features/ledger/public';
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
