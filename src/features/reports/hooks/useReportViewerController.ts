import { useErpContext } from '@/core/hooks/useErpContext';
import { exportDocument } from '@/core/reporting/service';
import type { Filters } from '@/core/types/Filters';
import type { ReportDocument } from '@/core/types/ReportDocument';
import { amountInWords } from '@/core/utils/amount-in-words';
import { fmt } from '@/core/utils/formatters';
import { money } from '@/core/utils/money';
import { fiscalRange } from '@/features/accounting/services/models/fiscal-range';
import type { ReportViewerProps } from '@/features/reports/types/ReportViewerProps';
import { useState } from 'react';
import { toast } from 'sonner';
export function useReportViewerController({
  title,
  buildData,
  summaryColumns = [],
  rowDocument,
  getAmount,
  extraTotals,
}: ReportViewerProps) {
  const { state: s, branchId } = useErpContext();
  const initial: Filters = { ...fiscalRange(s!), warehouse: '', query: '', voucherKind: '' };
  const [draft, setDraft] = useState(initial);
  const [filters, setFilters] = useState(initial);
  const [selected, setSelected] = useState<(string | number)[] | null>(null);
  const [isSummary, setSummary] = useState(false);
  if (!s) return null;
  const handleApplyFilters = () => {
    if (draft.from && draft.to && draft.from > draft.to) {
      toast.error('بداية المدى بعد نهايته');
      return;
    }
    setFilters({ ...draft });
  };
  const data = buildData(s, branchId, filters);
  const summaryCols = summaryColumns;
  const report = (rows = data.rows): ReportDocument => {
    const totals: [string, string][] = [
      ['عدد النتائج', String(rows.length)],
      ...summaryCols.map(
        (i) =>
          [data.headers[i], fmt(money(rows.reduce((n, r) => n + Number(r[i] || 0), 0)))] as [
            string,
            string,
          ],
      ),
    ];
    const net = getAmount
      ? getAmount(rows)
      : rows === data.rows
        ? data.total
        : summaryCols.length
          ? money(rows.reduce((n, r) => n + Number(r[summaryCols.at(-1)!] || 0), 0))
          : undefined;
    if (extraTotals) totals.push(...extraTotals(rows));
    return {
      title: title,
      metadata: [
        ['الفترة', (filters.from || 'بداية السجلات') + ' — ' + filters.to],
        ['العملة', 'YER'],
        ...(filters.query ? [['البحث', filters.query] as [string, string]] : []),
        ...(filters.warehouse
          ? [
              ['المخزن', s.warehouses.find((w) => w.id === filters.warehouse)?.name || ''] as [
                string,
                string,
              ],
            ]
          : []),
      ],
      tables: [
        {
          headers:
            isSummary && rows === data.rows
              ? ['العملة', ...summaryCols.map((i) => data.headers[i])]
              : data.headers,
          rows:
            isSummary && rows === data.rows
              ? [
                  [
                    'YER',
                    ...summaryCols.map((i) =>
                      money(rows.reduce((n, r) => n + Number(r[i] || 0), 0)),
                    ),
                  ],
                ]
              : rows,
        },
      ],
      totals,
      words: net !== undefined ? [amountInWords(Math.abs(net), 'YER')] : [],
      notes: data.note ? [data.note] : [],
    };
  };
  const exportRows = (rows: (string | number)[][]) =>
    exportDocument((rows.length === 1 ? rowDocument?.(rows[0]) : undefined) || report(rows));
  return {
    s,
    branchId,
    initial,
    draft,
    setDraft,
    filters,
    setFilters,
    selected,
    setSelected,
    isSummary,
    setSummary,
    handleApplyFilters,
    data,
    summaryCols,
    report,
    exportRows,
  };
}
