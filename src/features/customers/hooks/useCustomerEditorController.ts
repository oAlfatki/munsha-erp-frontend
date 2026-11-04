import { useValidatedForm } from '@/core/hooks/useValidatedForm';
import { useSaveCustomer } from '@/features/customers/hooks/useSaveCustomer';
import { useCustomerEditorControllerQuery } from '@/features/customers/queries/useCustomerEditorControllerQuery';
import type { CustomerEditorProps } from '@/features/customers/types/CustomerEditorProps';
import { customerInputSchema } from '@/features/customers/validation/customers-schema';
import { systemSettings } from '@/features/organization/public/system-settings';
import { usePartyForm } from '@/features/parties/public/usePartyForm';
export function useCustomerEditorController({ party }: CustomerEditorProps) {
  const { state: s, branchId, busy: isBusy, navigate } = useCustomerEditorControllerQuery();
  const partyMutationRequest = useSaveCustomer();
  const partyForm = useValidatedForm(customerInputSchema, partyMutationRequest.execute);
  const partyMutation = { ...partyMutationRequest, execute: partyForm.submit };
  const form = usePartyForm({
    kind: 'customer',
    groupId: party?.groupId || '',
    name: party?.name || '',
    address: party?.address || '',
    phone: party?.phone || '',
    currency: party?.currency || 'YER',
    priceType:
      party?.priceType ||
      (s
        ? (systemSettings(s).branches[branchId]?.priceType ?? systemSettings(s).sales.defaultPrice)
        : 'retail'),
    limit: party?.limit || 0,
    active: party?.active ?? true,
  });
  const p = form.watch();
  const update = (k: keyof typeof p, v: (typeof p)[keyof typeof p]) =>
    form.setValue(k, v, { shouldValidate: true });
  return { s, isBusy, navigate, partyMutation, form, p, update };
}
