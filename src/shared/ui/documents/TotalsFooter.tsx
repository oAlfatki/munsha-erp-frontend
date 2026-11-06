import { fmt } from '@/core/utils/formatters';
import type { TotalsFooterProps } from '@/shared/types/props/TotalsFooterProps';
import { AmountWords } from '@/shared/ui/documents/AmountWords';

export function TotalsFooter({ rows, amount, currency = 'YER' }: TotalsFooterProps) {

  return (
    <div className="document-totals">
      <dl>
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{typeof value === 'number' ? fmt(value) : value}</dd>
          </div>
        ))}
      </dl>
      <AmountWords amount={amount} currency={currency} />
    </div>
  );
}
