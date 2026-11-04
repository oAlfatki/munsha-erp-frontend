




import { useValidatedForm } from '@/core/hooks/useValidatedForm';
import { today } from '@/core/utils/formatters';
import { useMaster } from '@/features/accounting/hooks/useMaster';
import { useMasterScreenControllerQuery } from '@/features/accounting/queries/useMasterScreenControllerQuery';
import { extras } from "@/features/accounting/public/extensions";
import type { MasterScreenProps } from '@/features/accounting/types/MasterScreenProps';
import type { MasterRecord } from '@/features/accounting/types/models/MasterRecord';
import { masterSchema } from "@/features/accounting/public/accounting-schema";
import { useState } from 'react';

export function useMasterScreenController({ screen }: MasterScreenProps) {
  const { state: s, busy: isBusy, branchId, navigate } = useMasterScreenControllerQuery();
  const masterMutationRequest = useMaster(),
    masterForm = useValidatedForm(masterSchema, masterMutationRequest.execute),
    masterMutation = { ...masterMutationRequest, execute: masterForm.submit };
  const [query, setQuery] = useState(''),
    [edit, setEdit] = useState<Record<string, string> | null>(() =>
      screen.initiallyOpen
        ? Object.fromEntries(
            (screen.fields || []).map((field) => [
              field.key,
              field.type === 'branch' ? branchId : '',
            ]),
          )
        : null,
    ),
    [isActive, setActive] = useState(true);
  if (!s) return null;
  const list = (extras(s).records[screen.collection!] || []).filter(
    (r) => screen.collection !== 'cash' || r.branchId === branchId,
  );
  const open = (r?: MasterRecord) => {
    setEdit(
      r
        ? Object.fromEntries(Object.entries(r).map(([k, v]) => [k, String(v)]))
        : Object.fromEntries(
            (screen.fields || []).map((field) => [
              field.key,
              field.type === 'branch'
                ? branchId
                : field.type === 'date'
                  ? today()
                  : field.key === 'life'
                    ? '5'
                    : field.type === 'number'
                      ? '0'
                      : '',
            ]),
          ),
    );
    setActive(r?.active ?? true);
  };
  const fields = screen.fields || [];
  return {
    s,
    isBusy,
    navigate,
    masterMutation,
    query,
    setQuery,
    edit,
    setEdit,
    isActive,
    setActive,
    list,
    open,
    fields,
  };
}
