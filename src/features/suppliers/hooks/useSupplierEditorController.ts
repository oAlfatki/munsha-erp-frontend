import { systemSettings } from '@/features/organization/public';
import { usePartyForm } from '@/features/parties/public';
import { useSaveSupplier } from '@/features/suppliers/hooks/useSaveSupplier';
import { useSupplierEditorControllerQuery } from '@/features/suppliers/queries/useSupplierEditorControllerQuery';
import type { SupplierEditorProps } from '@/features/suppliers/types/props/SupplierEditorProps';
import { supplierInputSchema } from '@/features/suppliers/validations/suppliers-schema';
import { useValidatedForm } from '@/shared/hooks/useValidatedForm';

export function useSupplierEditorController({ party }: SupplierEditorProps) {

  const { state, branchId, busy: isBusy, navigate } = useSupplierEditorControllerQuery();
  const partyMutationRequest = useSaveSupplier();
  const partyForm = useValidatedForm(supplierInputSchema, partyMutationRequest.execute);
  const partyMutation = { ...partyMutationRequest, execute: partyForm.submit };
  const form = usePartyForm({
    kind: 'supplier',
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
