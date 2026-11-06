import { useValidatedForm } from '@/core/hooks/useValidatedForm';
import { today } from '@/core/utils/formatters';
import type { MasterRecord } from '@/features/ledger/public';
import { extras } from '@/features/ledger/public';
import { useMaster } from '@/features/master-data/hooks/useMaster';
import { useMasterScreenControllerQuery } from '@/features/master-data/queries/useMasterScreenControllerQuery';
import type { MasterScreenProps } from '@/features/master-data/types/props/MasterScreenProps';
import { masterSchema } from '@/features/master-data/validations/master-schema';
import { useState } from 'react';

export function useMasterScreenController({ screen }: MasterScreenProps) {
  const {
    state: s,
    busy: isBusy,
    branchId,
    navigate,
  } = useMasterScreenControllerQuery(screen.collection);
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
