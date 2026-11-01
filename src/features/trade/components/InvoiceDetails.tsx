import { Modal } from '@/core/components/shared/dialogs/Modal';
import { DocumentNavigator } from '@/core/components/shared/documents/DocumentNavigator';
import { DataTable } from '@/core/components/shared/tables/DataTable';
import { Button } from '@/core/components/ui/button';
import { useErpContext } from '@/core/hooks/useErpContext';
import { useValidatedForm } from '@/core/hooks/useValidatedForm';
import { printReport } from '@/core/reporting/service';
import { fmt, today } from '@/core/utils/formatters';
import { invoiceReport } from '@/features/reports/services/models/report-documents';
import { InvoiceTotals } from '@/features/trade/components/InvoiceTotals';
import { useDeleteDraft } from '@/features/trade/hooks/useDeleteDraft';
import { useReturn } from '@/features/trade/hooks/useReturn';
import type { InvoiceDetailsProps } from '@/features/trade/types/InvoiceDetailsProps';
import { lineTotal } from '@/features/trade/utils/line-total';
import { deleteDraftSchema, returnSchema } from '@/features/trade/validation/trade-schema';
import { Printer } from 'lucide-react';

export function InvoiceDetails({
  current,
  browse,
  view,
  setDetail,
  setEditor,
  isConfirm: isConfirm,
  setConfirm,
  csv,
}: InvoiceDetailsProps) {
  const { state: s, navigate, busy: isBusy } = useErpContext();
  const deleteDraftMutationRequest = useDeleteDraft(),
    deleteDraftForm = useValidatedForm(deleteDraftSchema, deleteDraftMutationRequest.execute),
    deleteDraftMutation = { ...deleteDraftMutationRequest, execute: deleteDraftForm.submit };
  const returnMutationRequest = useReturn(),
    returnForm = useValidatedForm(returnSchema, returnMutationRequest.execute),
    returnMutation = { ...returnMutationRequest, execute: returnForm.submit };
  if (!s) return null;
  return (
    <Modal
      isOpen
      title={
        (current.number === current.reversedBy ? 'مرتجع فاتورة ' : 'الفاتورة ') + current.number
      }
      description={
        current.status === 'final'
          ? 'مستند نهائي؛ التعديل والحذف غير متاحين.'
          : 'مسودة محفوظة بلا أثر محاسبي أو مخزني.'
      }
      onClose={() => {
        setDetail(null);
        if (view.startsWith('/documents/'))
          navigate(current.kind === 'sale' ? '/sales' : '/purchases');
      }}
      isWide
    >
      <DocumentNavigator
        index={browse.findIndex((invoice) => invoice.id === current.id)}
        count={browse.length}
        onChange={(i) => {
          setDetail(browse[i].id);
          setConfirm(false);
        }}
        onList={() => setDetail(null)}
      />
      <div className="invoice-print-header">
        <h2>{s.organization.name}</h2>
        <p>{s.organization.address}</p>
        <h3>
          {current.kind === 'sale' ? 'فاتورة مبيعات' : 'فاتورة مشتريات'} · {current.number}
        </h3>
      </div>
      <div className="detail-meta">
        <span>
          التاريخ <b>{current.date}</b>
        </span>
        <span>
          الطرف <b>{s.parties.find((party) => party.id === current.partyId)?.name || 'نقدي'}</b>
        </span>
        <span>
          العملة <b>{current.currency}</b>
        </span>
        <span>
          المخزن{' '}
          <b>{s.warehouses.find((warehouse) => warehouse.id === current.warehouseId)?.name}</b>
        </span>
        <span>
          سعر الصرف <b>{fmt(current.rate)}</b>
        </span>
        <span>
          هاتف الطرف <b>{s.parties.find((party) => party.id === current.partyId)?.phone || '—'}</b>
        </span>
        <span>
          الدفع{' '}
          <b>
            {current.payment === 'cash'
              ? 'نقدي كامل'
              : current.payment === 'mixed'
                ? 'جزء نقدي وجزء آجل'
                : 'آجل كامل'}
          </b>
        </span>
      </div>
      <DataTable
        headers={[
          'الصنف',
          'الوحدة',
          'الكمية',
          ...(current.kind === 'purchase' ? ['مجاني'] : []),
          'السعر',
          'الخصم %',
          'الصافي',
        ]}
        rows={current.lines.map((invoiceLine) => {
          const p = s.products.find((product) => product.id === invoiceLine.productId);
          return [
            p?.name,
            p?.units[invoiceLine.unit]?.name,
            invoiceLine.qty,
            ...(current.kind === 'purchase' ? [invoiceLine.free] : []),
            fmt(invoiceLine.price),
            invoiceLine.discount,
            fmt(lineTotal(invoiceLine)),
          ];
        })}
      />
      <InvoiceTotals
        lines={current.lines}
        payment={current.payment}
        paid={current.paid}
        taxRate={current.taxRate}
        currency={current.currency}
      />
      {current.note && <p className="info-note">ملاحظات: {current.note}</p>}
      {current.reversedBy && <p className="info-note">مرتجع كامل مرتبط: {current.reversedBy}</p>}
      <div className="dialog-actions no-print">
        <Button variant="outline" onClick={() => printReport(invoiceReport(s, current))}>
          <Printer />
          طباعة
        </Button>
        <Button variant="outline" onClick={() => csv([current])}>
          تصدير
        </Button>
        {current.status === 'draft' && (
          <>
            <Button
              onClick={() => {
                setEditor(current);
                setDetail(null);
              }}
            >
              تعديل وإكمال
            </Button>
            <Button
              variant="destructive"
              disabled={isBusy}
              onClick={async () => {
                if (await deleteDraftMutation.execute({ id: current.id })) setDetail(null);
              }}
            >
              حذف المسودة
            </Button>
          </>
        )}
        {current.status === 'final' && !current.reversedBy && (
          <Button variant="outline" onClick={() => setConfirm(true)}>
            مرتجع كامل
          </Button>
        )}
      </div>
      {isConfirm && (
        <div className="confirm-box">
          <strong>تأكيد مرتجع الفاتورة بالكامل؟</strong>
          <p>ينشئ مستندًا مرتبطًا ويعكس حركة المخزون والقيد. لا يعدّل الفاتورة الأصلية.</p>
          <div className="flex gap-2">
            <Button
              disabled={isBusy}
              onClick={async () => {
                if (await returnMutation.execute({ id: current.id, date: today() })) {
                  setConfirm(false);
                  setDetail(null);
                }
              }}
            >
              تأكيد المرتجع الكامل
            </Button>
            <Button variant="outline" onClick={() => setConfirm(false)}>
              تراجع
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
