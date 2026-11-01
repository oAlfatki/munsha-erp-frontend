import { postCommand } from '@/core/services/http/command-api';
import type { CommandContext } from '@/core/types/CommandContext';
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
export const submitBackupSettings = async (
  data: SaveBackupSettingsRequest,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof postCommand>>> =>
  postCommand('settings', 'backupSettings', data, context);
export const submitBranding = async (
  data: SaveBrandingRequest,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof postCommand>>> =>
  postCommand('settings', 'branding', data, context);
export const submitOrganization = async (
  data: SaveOrganizationRequest,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof postCommand>>> =>
  postCommand('settings', 'organization', data, context);
export const submitBranch = async (
  data: SaveBranchRequest,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof postCommand>>> =>
  postCommand('settings', 'branch', data, context);
export const submitGeneralSettings = async (
  data: SaveGeneralSettingsRequest,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof postCommand>>> =>
  postCommand('settings', 'generalSettings', data, context);
export const submitSetupComplete = async (
  data: SetupCompleteRequest,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof postCommand>>> =>
  postCommand('settings', 'setupComplete', data, context);
export const submitImportMasters = async (
  data: ImportMastersRequest,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof postCommand>>> =>
  postCommand('settings', 'importMasters', data, context);
export const submitCurrency = async (
  data: SaveCurrencyRequest,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof postCommand>>> =>
  postCommand('settings', 'currency', data, context);
export const submitPreferences = async (
  data: SavePreferencesRequest,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof postCommand>>> =>
  postCommand('settings', 'preferences', data, context);
export const submitSystemSettings = async (
  data: SaveSystemSettingsRequest,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof postCommand>>> =>
  postCommand('settings', 'systemSettings', data, context);
