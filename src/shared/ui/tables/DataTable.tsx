import { readDeviceSettings } from '@/core/services/device-settings';
import type { DataTableProps } from '@/shared/types/props/DataTableProps';
import { Empty } from '@/shared/ui/feedback/Empty';
import { Button } from '@/shared/ui/primitives/button';
import { useEffect, useState } from 'react';

export function DataTable({ headers, rows, empty, foot }: DataTableProps) {

  const [size, setSize] = useState(25),
    [page, setPage] = useState(1);
  useEffect(() => {
    const sync = () => setSize(readDeviceSettings().pageSize);

    sync();
    window.addEventListener('erp-device-settings', sync);
    return () => window.removeEventListener('erp-device-settings', sync);
  }, []);
  const pages = Math.max(1, Math.ceil(rows.length / size)),
    current = Math.min(page, pages);
  const shown = rows.slice((current - 1) * size, current * size);
  return (
    <div className="table-card">
      <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th key={i}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shown.map((r, i) => (
              <tr key={i}>
                {r.map((c, j) => (
                  <td key={j}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
          <tbody className="print-all-rows">
            {rows.map((r, i) => (
              <tr key={i}>
                {r.map((c, j) => (
                  <td key={j}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!rows.length && (empty || <Empty />)}
      <div className="table-footer">
        <span>{foot || `${rows.length} سجل • ${shown.length} معروض في الصفحة`}</span>
        <span className="flex items-center gap-2">
          <Button
            type="button"
            size="sm"
            variant="ghost"
            disabled={current <= 1}
            onClick={() => setPage(current - 1)}
          >
            السابق
          </Button>
          الصفحة <b>{current}</b> من {pages}
          <Button
            type="button"
            size="sm"
            variant="ghost"
            disabled={current >= pages}
            onClick={() => setPage(current + 1)}
          >
            اللاحق
          </Button>
        </span>
      </div>
    </div>
  );
}
