import { extras } from '@/features/ledger/public';
import type { ValidatePartyContext } from '@/features/parties/types/read-models/ValidatePartyContext';
import { partySchema } from '@/features/parties/validations/parties-schema';
export function validateParty(data: ValidatePartyContext, input: unknown) {
  const p = partySchema.parse(input);
  if (!data.currencies.some((currency) => currency.code === p.currency))
    throw Error('عملة غير معرفة');
  if (
    p.groupId &&
    !extras(data).records.groups?.some(
      (group) =>
        group.id === p.groupId &&
        (group.active || data.parties.find((party) => party.id === p.id)?.groupId === p.groupId) &&
        group.kind === p.kind,
    )
  )
    throw Error('اختر مجموعة نشطة من نوع الطرف');
}
