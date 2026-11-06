import { useSaveCustomer } from '@/features/customers/hooks/useSaveCustomer';
import { useCustomerEditorControllerQuery } from '@/features/customers/queries/useCustomerEditorControllerQuery';
import type { CustomerEditorProps } from '@/features/customers/types/props/CustomerEditorProps';
import { customerInputSchema } from '@/features/customers/validations/customers-schema';
import { systemSettings } from '@/features/organization/public';
import { usePartyForm } from '@/features/parties/public';
import { useValidatedForm } from '@/shared/hooks/useValidatedForm';

export function useCustomerEditorController({ party }: CustomerEditorProps) {

  const { state, branchId, busy: isBusy, navigate } = useCustomerEditorControllerQuery();
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
      (state
        ? (systemSettings(state).branches[branchId]?.priceType ??
          systemSettings(state).sales.defaultPrice)
        : 'retail'),
    limit: party?.limit || 0,
    active: party?.active ?? true,
  });
  const p = form.watch();

  const update = (k: keyof typeof p, v: (typeof p)[keyof typeof p]) =>
    form.setValue(k, v, { shouldValidate: true });

  return { s: state, isBusy, navigate, partyMutation, form, p, update };
}
