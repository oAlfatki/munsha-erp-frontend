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
  periodSwitchSchema.parse(input);

export const mapPeriodCreateInput = (input: unknown): SavePeriodCreateRequest =>
  periodCreateSchema.parse(input);

export const mapPeriodTransferInput = (input: unknown): SavePeriodTransferRequest =>
  periodTransferSchema.parse(input);

export const mapPeriodActivateInput = (input: unknown): SavePeriodActivateRequest =>
  periodActivateSchema.parse(input);

export const mapPeriodResetInput = (input: unknown): SavePeriodResetRequest =>
  periodResetSchema.parse(input);

export const mapScreenDraftInput = (input: unknown): SaveScreenDraftRequest =>
  screenDraftSchema.parse(input);
