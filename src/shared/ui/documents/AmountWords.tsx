import type { AmountWordsProps } from '@/core/types/props/AmountWordsProps';
import { amountInWords } from '@/core/utils/amount-in-words';

export function AmountWords({ amount, currency = 'YER' }: AmountWordsProps) {
  return (
    <div className="amount-words" aria-label="المبلغ كتابة">
      <span>المبلغ كتابة</span>
      <strong>{amountInWords(amount, currency)}</strong>
    </div>
  );
}
