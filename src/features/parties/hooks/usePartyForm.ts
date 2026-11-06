import type { SavePartyRequest } from '@/features/parties/types/requests/SavePartyRequest';
import { partyFormSchema } from '@/features/parties/validations/party-form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
export function usePartyForm(defaultValues: SavePartyRequest) {
  return useForm<SavePartyRequest>({ defaultValues, resolver: zodResolver(partyFormSchema) });
}
