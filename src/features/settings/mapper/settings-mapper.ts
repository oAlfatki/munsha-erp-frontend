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
} from '@/features/organization/public/settings-schema';
import type { ImportMastersRequest } from '@/features/organization/public/types/requests/ImportMastersRequest';
import type { SaveBackupSettingsRequest } from '@/features/organization/public/types/requests/SaveBackupSettingsRequest';
import type { SaveBranchRequest } from '@/features/organization/public/types/requests/SaveBranchRequest';
import type { SaveBrandingRequest } from '@/features/organization/public/types/requests/SaveBrandingRequest';
import type { SaveGeneralSettingsRequest } from '@/features/organization/public/types/requests/SaveGeneralSettingsRequest';
import type { SaveOrganizationRequest } from '@/features/organization/public/types/requests/SaveOrganizationRequest';
import type { SavePreferencesRequest } from '@/features/organization/public/types/requests/SavePreferencesRequest';
import type { SaveSystemSettingsRequest } from '@/features/organization/public/types/requests/SaveSystemSettingsRequest';
import type { SetupCompleteRequest } from '@/features/organization/public/types/requests/SetupCompleteRequest';
export const mapBackupSettingsInput = (input: unknown): SaveBackupSettingsRequest =>
  backupSettingsSchema.parse(input) as SaveBackupSettingsRequest;
export const mapBrandingInput = (input: unknown): SaveBrandingRequest =>
  brandingSchema.parse(input) as SaveBrandingRequest;
export const mapOrganizationInput = (input: unknown): SaveOrganizationRequest =>
  organizationSchema.parse(input) as SaveOrganizationRequest;
export const mapBranchInput = (input: unknown): SaveBranchRequest =>
  branchSchema.parse(input) as SaveBranchRequest;
export const mapGeneralSettingsInput = (input: unknown): SaveGeneralSettingsRequest =>
  generalSettingsSchema.parse(input) as SaveGeneralSettingsRequest;
export const mapSetupCompleteInput = (input: unknown): SetupCompleteRequest =>
  setupCompleteSchema.parse(input) as SetupCompleteRequest;
export const mapImportMastersInput = (input: unknown): ImportMastersRequest =>
  importMastersSchema.parse(input) as ImportMastersRequest;

export const mapPreferencesInput = (input: unknown): SavePreferencesRequest =>
  preferencesSchema.parse(input) as SavePreferencesRequest;
export const mapSystemSettingsInput = (input: unknown): SaveSystemSettingsRequest =>
  systemSettingsSchema.parse(input) as SaveSystemSettingsRequest;
