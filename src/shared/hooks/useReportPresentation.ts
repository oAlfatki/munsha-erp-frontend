import type { ReportDocument } from '@/core/types/reports/ReportDocument';
import { amountInWords } from '@/core/utils/amount-in-words';
import { fmt } from '@/core/utils/formatters';
import { money } from '@/core/utils/money';
import { exportDocument } from '@/shared/services/report-actions';
import type { ReportPresentationOptions } from '@/shared/types/reporting/ReportPresentationOptions';
import { useState } from 'react';

export function useReportPresentation({
  title,
  data,
  filterState,
  context,
  summaryColumns = [],
  rowDocument,
  getAmount,
  extraTotals,
}: ReportPresentationOptions) {

  const { initial, draft, setDraft, filters, setFilters, handleApplyFilters } = filterState;
  const [selected, setSelected] = useState<(string | number)[] | null>(null);
  const [isSummary, setSummary] = useState(false);
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
              [
                'المخزن',
                context.warehouseOptions.find((w) => w.id === filters.warehouse)?.name || '',
              ] as [string, string],
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
    context,
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
