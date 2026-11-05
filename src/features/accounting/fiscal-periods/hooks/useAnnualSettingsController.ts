import { useValidatedForm } from '@/core/hooks/useValidatedForm';
import { usePeriodActivate } from '@/features/accounting/fiscal-periods/hooks/usePeriodActivate';
import { usePeriodCreate } from '@/features/accounting/fiscal-periods/hooks/usePeriodCreate';
import { usePeriodReset } from '@/features/accounting/fiscal-periods/hooks/usePeriodReset';
import { usePeriodSwitch } from '@/features/accounting/fiscal-periods/hooks/usePeriodSwitch';
import { useAnnualSettingsQuery } from '@/features/accounting/fiscal-periods/queries/useAnnualSettingsQuery';
import {
  bookCatalog,
  closingChecks,
  isArchived,
  periodActivateSchema,
  periodCreateSchema,
  periodResetSchema,
  periodSwitchSchema,
} from '@/features/ledger/public';
import { useState } from 'react';
export function useAnnualSettingsController() {
  const { state: s, busy: isBusy, revision, refresh, navigate } = useAnnualSettingsQuery();
  const periodActivateMutationRequest = usePeriodActivate();
  const periodActivateForm = useValidatedForm(
    periodActivateSchema,
    periodActivateMutationRequest.execute,
  );
  const periodActivateMutation = {
    ...periodActivateMutationRequest,
    execute: periodActivateForm.submit,
  };
  const periodCreateMutationRequest = usePeriodCreate();
  const periodCreateForm = useValidatedForm(
    periodCreateSchema,
    periodCreateMutationRequest.execute,
  );
  const periodCreateMutation = { ...periodCreateMutationRequest, execute: periodCreateForm.submit };
  const periodResetMutationRequest = usePeriodReset();
  const periodResetForm = useValidatedForm(periodResetSchema, periodResetMutationRequest.execute);
  const periodResetMutation = { ...periodResetMutationRequest, execute: periodResetForm.submit };
  const periodSwitchMutationRequest = usePeriodSwitch();
  const periodSwitchForm = useValidatedForm(
    periodSwitchSchema,
    periodSwitchMutationRequest.execute,
  );
  const periodSwitchMutation = { ...periodSwitchMutationRequest, execute: periodSwitchForm.submit };
  const actions: Record<string, (input: unknown) => Promise<boolean>> = {
    periodActivate: periodActivateMutation.execute,
    periodCreate: periodCreateMutation.execute,
    periodReset: periodResetMutation.execute,
    periodSwitch: periodSwitchMutation.execute,
  };
  const [name, setName] = useState('السنة المالية ' + (s!.organization.year + 1));
  const [confirmation, setConfirmation] = useState<{
    id: string;
    action: 'periodActivate' | 'periodReset' | 'periodSwitch';
  } | null>(null);
  if (!s) return null;
  const catalog = bookCatalog(s);
  const checks = closingChecks(s);
  const isBookArchived = isArchived(s);
  const active = catalog.books.find((b) => b.id === catalog.activeId)!;
  return {
    s,
    isBusy,
    revision,
    refresh,
    navigate,
    periodActivateMutationRequest,
    periodActivateForm,
    periodActivateMutation,
    periodCreateMutationRequest,
    periodCreateForm,
    periodCreateMutation,
    periodResetMutationRequest,
    periodResetForm,
    periodResetMutation,
    periodSwitchMutationRequest,
    periodSwitchForm,
    periodSwitchMutation,
    actions,
    name,
    setName,
    confirmation,
    setConfirmation,
    catalog,
    checks,
    isBookArchived,
    active,
  };
}
