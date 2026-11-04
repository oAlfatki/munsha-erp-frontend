import type { CommandContext } from '@/core/types/CommandContext';
import {
  submitBackupSettings,
  submitBranch,
  submitBranding,
  submitGeneralSettings,
  submitImportMasters,
  submitOrganization,
  submitPreferences,
  submitSetupComplete,
  submitSystemSettings,
} from '@/features/settings/api/settings-api';
import {
  mapBackupSettingsInput,
  mapBranchInput,
  mapBrandingInput,
  mapGeneralSettingsInput,
  mapImportMastersInput,
  mapOrganizationInput,
  mapPreferencesInput,
  mapSetupCompleteInput,
  mapSystemSettingsInput,
} from '@/features/settings/mapper/settings-mapper';
export const saveBackupSettings = async (
  input: unknown,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof submitBackupSettings>>> =>
  submitBackupSettings(mapBackupSettingsInput(input), context);
export const saveBranding = async (
  input: unknown,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof submitBranding>>> =>
  submitBranding(mapBrandingInput(input), context);
export const saveOrganization = async (
  input: unknown,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof submitOrganization>>> =>
  submitOrganization(mapOrganizationInput(input), context);
export const saveBranch = async (
  input: unknown,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof submitBranch>>> =>
  submitBranch(mapBranchInput(input), context);
export const saveGeneralSettings = async (
  input: unknown,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof submitGeneralSettings>>> =>
  submitGeneralSettings(mapGeneralSettingsInput(input), context);
export const saveSetupComplete = async (
  input: unknown,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof submitSetupComplete>>> =>
  submitSetupComplete(mapSetupCompleteInput(input), context);
export const saveImportMasters = async (
  input: unknown,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof submitImportMasters>>> =>
  submitImportMasters(mapImportMastersInput(input), context);

export const savePreferences = async (
  input: unknown,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof submitPreferences>>> =>
  submitPreferences(mapPreferencesInput(input), context);
export const saveSystemSettings = async (
  input: unknown,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof submitSystemSettings>>> =>
  submitSystemSettings(mapSystemSettingsInput(input), context);
