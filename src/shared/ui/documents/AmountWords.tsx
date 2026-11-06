import { amountInWords } from '@/core/utils/amount-in-words';
import type { AmountWordsProps } from '@/shared/types/props/AmountWordsProps';

export function AmountWords({ amount, currency = 'YER' }: AmountWordsProps) {

  return (
    <div className="amount-words" aria-label="المبلغ كتابة">
      <span>المبلغ كتابة</span>
      <strong>{amountInWords(amount, currency)}</strong>
    </div>
  );
}
