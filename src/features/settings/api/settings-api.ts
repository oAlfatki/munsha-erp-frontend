import { apiClient } from '@/core/api/apiClient';
import type { CommandContext } from '@/core/types/api/CommandContext';
import type { CommandReceipt } from '@/core/types/api/CommandReceipt';
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
import { ENDPOINTS } from '@/features/settings/api/endpoints';

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
