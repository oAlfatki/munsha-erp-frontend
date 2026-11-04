import type { ImportMastersRequest } from '@/features/settings/types/requests/ImportMastersRequest';
import type { SaveBackupSettingsRequest } from '@/features/settings/types/requests/SaveBackupSettingsRequest';
import type { SaveBranchRequest } from '@/features/settings/types/requests/SaveBranchRequest';
import type { SaveBrandingRequest } from '@/features/settings/types/requests/SaveBrandingRequest';
import type { SaveCurrencyRequest } from '@/features/settings/types/requests/SaveCurrencyRequest';
import type { SaveGeneralSettingsRequest } from '@/features/settings/types/requests/SaveGeneralSettingsRequest';
import type { SaveOrganizationRequest } from '@/features/settings/types/requests/SaveOrganizationRequest';
import type { SavePreferencesRequest } from '@/features/settings/types/requests/SavePreferencesRequest';
import type { SaveSystemSettingsRequest } from '@/features/settings/types/requests/SaveSystemSettingsRequest';
import type { SetupCompleteRequest } from '@/features/settings/types/requests/SetupCompleteRequest';
import {
backupSettingsSchema,
branchSchema,
brandingSchema,
currencySchema,
generalSettingsSchema,
importMastersSchema,
organizationSchema,
preferencesSchema,
setupCompleteSchema,
systemSettingsSchema,
} from "@/features/settings/public/settings-schema";
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
export const mapCurrencyInput = (input: unknown): SaveCurrencyRequest =>
  currencySchema.parse(input) as SaveCurrencyRequest;
export const mapPreferencesInput = (input: unknown): SavePreferencesRequest =>
  preferencesSchema.parse(input) as SavePreferencesRequest;
export const mapSystemSettingsInput = (input: unknown): SaveSystemSettingsRequest =>
  systemSettingsSchema.parse(input) as SaveSystemSettingsRequest;
