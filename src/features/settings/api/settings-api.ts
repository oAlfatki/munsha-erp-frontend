import type { CommandReceipt } from '@/core/types/CommandReceipt';
import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/config/endpoints';
import type { CommandContext } from '@/core/types/CommandContext';
import type { ImportMastersRequest } from '@/features/organization/public/types/requests/ImportMastersRequest';
import type { SaveBackupSettingsRequest } from '@/features/organization/public/types/requests/SaveBackupSettingsRequest';
import type { SaveBranchRequest } from '@/features/organization/public/types/requests/SaveBranchRequest';
import type { SaveBrandingRequest } from '@/features/organization/public/types/requests/SaveBrandingRequest';
import type { SaveGeneralSettingsRequest } from '@/features/organization/public/types/requests/SaveGeneralSettingsRequest';
import type { SaveOrganizationRequest } from '@/features/organization/public/types/requests/SaveOrganizationRequest';
import type { SavePreferencesRequest } from '@/features/organization/public/types/requests/SavePreferencesRequest';
import type { SaveSystemSettingsRequest } from '@/features/organization/public/types/requests/SaveSystemSettingsRequest';
import type { SetupCompleteRequest } from '@/features/organization/public/types/requests/SetupCompleteRequest';
export const submitBackupSettings = async (
  data: SaveBackupSettingsRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {
  return apiClient.post<CommandReceipt>(ENDPOINTS.command('settings', 'backupSettings'), {
    ...context,
    type: 'backupSettings',
    data: data,
  });
};
export const submitBranding = async (
  data: SaveBrandingRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {
  return apiClient.post<CommandReceipt>(ENDPOINTS.command('settings', 'branding'), {
    ...context,
    type: 'branding',
    data: data,
  });
};
export const submitOrganization = async (
  data: SaveOrganizationRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {
  return apiClient.post<CommandReceipt>(ENDPOINTS.command('settings', 'organization'), {
    ...context,
    type: 'organization',
    data: data,
  });
};
export const submitBranch = async (
  data: SaveBranchRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {
  return apiClient.post<CommandReceipt>(ENDPOINTS.command('settings', 'branch'), {
    ...context,
    type: 'branch',
    data: data,
  });
};
export const submitGeneralSettings = async (
  data: SaveGeneralSettingsRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {
  return apiClient.post<CommandReceipt>(ENDPOINTS.command('settings', 'generalSettings'), {
    ...context,
    type: 'generalSettings',
    data: data,
  });
};
export const submitSetupComplete = async (
  data: SetupCompleteRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {
  return apiClient.post<CommandReceipt>(ENDPOINTS.command('settings', 'setupComplete'), {
    ...context,
    type: 'setupComplete',
    data: data,
  });
};
export const submitImportMasters = async (
  data: ImportMastersRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {
  return apiClient.post<CommandReceipt>(ENDPOINTS.command('settings', 'importMasters'), {
    ...context,
    type: 'importMasters',
    data: data,
  });
};

export const submitPreferences = async (
  data: SavePreferencesRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {
  return apiClient.post<CommandReceipt>(ENDPOINTS.command('settings', 'preferences'), {
    ...context,
    type: 'preferences',
    data: data,
  });
};
export const submitSystemSettings = async (
  data: SaveSystemSettingsRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {
  return apiClient.post<CommandReceipt>(ENDPOINTS.command('settings', 'systemSettings'), {
    ...context,
    type: 'systemSettings',
    data: data,
  });
};
