import { Modal } from '@/shared/ui/dialogs/Modal';
import { SearchBox } from '@/shared/ui/filters/SearchBox';
import { DataTable } from '@/shared/ui/tables/DataTable';
import { Button } from '@/shared/ui/primitives/button';
import { useErpContext } from '@/core/hooks/useErpContext';
import { fmt } from '@/core/utils/formatters';
import type { InvoiceLookupProps } from '@/features/trade/types/InvoiceLookupProps';
import { Search } from 'lucide-react';
import { useState } from 'react';

export function InvoiceLookup({ kind, onSelect }: InvoiceLookupProps) {
  const { state: s, branchId } = useErpContext();
  const [searchQuery, setQ] = useState(''),
    [isOpen, setOpen] = useState(false);
  if (!s) return null;
  const rows = s.invoices
    .filter(
      (invoice) =>
        invoice.kind === kind &&
        invoice.branchId === branchId &&
        (
          invoice.number +
          ' ' +
          invoice.date +
          ' ' +
          (s.parties.find((party) => party.id === invoice.partyId)?.name || 'نقدي') +
          ' ' +
          invoice.note
        )
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
    )
    .slice()
    .reverse();
  return (
    <>
      <div className="invoice-lookup no-print">
        <SearchBox
          value={searchQuery}
          onChange={setQ}
          placeholder="بحث عن فاتورة محفوظة برقمها أو الطرف أو التاريخ…"
        />
        <Button variant="outline" onClick={() => setOpen(true)}>
          <Search size={16} />
          بحث الفواتير
        </Button>
      </div>
      <Modal
        isOpen={isOpen}
        isWide
        title="البحث عن فاتورة"
        description="اختيار الفاتورة يحمّل بياناتها في شاشة الفاتورة نفسها."
        onClose={() => setOpen(false)}
      >
        <SearchBox
          value={searchQuery}
          onChange={setQ}
          placeholder="رقم الفاتورة أو اسم الطرف أو التاريخ…"
        />
        <DataTable
          headers={['رقم الفاتورة', 'التاريخ', 'الطرف', 'الإجمالي', 'الحالة', 'تحميل']}
          rows={rows.map((invoice) => [
            invoice.number,
            invoice.date,
            s.parties.find((party) => party.id === invoice.partyId)?.name || 'نقدي',
            fmt(invoice.total) + ' ' + invoice.currency,
            invoice.status === 'draft' ? 'مسودة' : 'نهائية',
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                onSelect(invoice);
                setOpen(false);
              }}
            >
              تحميل في الشاشة
            </Button>,
          ])}
        />
      </Modal>
    </>
  );
}
