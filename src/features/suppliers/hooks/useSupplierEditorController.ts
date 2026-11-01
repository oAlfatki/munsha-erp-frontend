import { useErpContext } from '@/core/hooks/useErpContext';
import { useValidatedForm } from '@/core/hooks/useValidatedForm';
import { usePartyForm } from '@/features/parties/hooks/usePartyForm';
import { branchDefaults } from '@/features/settings/services/models/system-settings';
import { useSaveSupplier } from '@/features/suppliers/hooks/useSaveSupplier';
import type { SupplierEditorProps } from '@/features/suppliers/types/SupplierEditorProps';
import { supplierInputSchema } from '@/features/suppliers/validation/suppliers-schema';
export function useSupplierEditorController({ party }: SupplierEditorProps) {
  const { state: s, branchId, busy: isBusy, navigate } = useErpContext();
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
    priceType: party?.priceType || (s ? branchDefaults(s, branchId).priceType : 'retail'),
    limit: party?.limit || 0,
    active: party?.active ?? true,
  });
  const p = form.watch();
  const update = (k: keyof typeof p, v: (typeof p)[keyof typeof p]) =>
    form.setValue(k, v, { shouldValidate: true });
  return { s, isBusy, navigate, partyMutation, form, p, update };
}
