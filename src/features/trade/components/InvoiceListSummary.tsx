import { fmt } from '@/core/utils/formatters';
import type { InvoiceListSummaryProps } from '@/features/trade/types/props/InvoiceListSummaryProps';

export function InvoiceListSummary({ list }: InvoiceListSummaryProps) {

  return (
    <div className="document-stats">
      <div>
        <span>صافي الحركات المعروضة · YER</span>
        <strong>
          {fmt(list.filter((d) => d.status === 'final').reduce((n, d) => n + d.total * d.rate, 0))}
        </strong>
      </div>
      <div>
        <span>عدد الفواتير</span>
        <strong>{list.length}</strong>
      </div>
      <div>
        <span>مسودات بلا أثر</span>
        <strong>{list.filter((d) => d.status === 'draft').length}</strong>
      </div>
    </div>
  );
}
