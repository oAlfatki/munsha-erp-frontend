import type {
  ImportMastersRequest,
  SaveBackupSettingsRequest,
  SaveBranchRequest,
  SaveBrandingRequest,
  SaveGeneralSettingsRequest,
  SaveOrganizationRequest,
  SavePreferencesRequest,
  SaveSystemSettingsRequest,
  SetupCompleteRequest,
} from '@/features/organization/public';
import {
  backupSettingsSchema,
  branchSchema,
  brandingSchema,
  generalSettingsSchema,
  importMastersSchema,
  organizationSchema,
  preferencesSchema,
  setupCompleteSchema,
  systemSettingsSchema,
} from '@/features/organization/public';

export const mapBackupSettingsInput = (input: unknown): SaveBackupSettingsRequest =>
  backupSettingsSchema.parse(input);

export const mapBrandingInput = (input: unknown): SaveBrandingRequest =>
  brandingSchema.parse(input);

export const mapOrganizationInput = (input: unknown): SaveOrganizationRequest =>
  organizationSchema.parse(input);

export const mapBranchInput = (input: unknown): SaveBranchRequest => branchSchema.parse(input);

export const mapGeneralSettingsInput = (input: unknown): SaveGeneralSettingsRequest =>
  generalSettingsSchema.parse(input);

export const mapSetupCompleteInput = (input: unknown): SetupCompleteRequest =>
  setupCompleteSchema.parse(input);

export const mapImportMastersInput = (input: unknown): ImportMastersRequest =>
  importMastersSchema.parse(input);

export const mapPreferencesInput = (input: unknown): SavePreferencesRequest =>
  preferencesSchema.parse(input);

export const mapSystemSettingsInput = (input: unknown): SaveSystemSettingsRequest =>
  systemSettingsSchema.parse(input);
