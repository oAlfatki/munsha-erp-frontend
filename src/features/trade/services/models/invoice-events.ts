import type {InvoiceEventsContext} from '@/features/trade/types/read-models/InvoiceEventsContext';
// Frontend read models and display helpers. Authoritative mutations live in server/core.
import type { ErpReadModel } from '@/core/types/ErpReadModel';
import type { Invoice } from '@/features/trade/types/models/Invoice';
export function invoiceEvents(
  workspace: InvoiceEventsContext,
  kind: Invoice['kind'],
  branchId: string,
  filter = 'all',
) {
  return workspace.invoices
    .filter((invoice) => invoice.kind === kind && invoice.branchId === branchId)
    .flatMap((invoice) => {
      const original = { ...invoice, sourceId: invoice.id, isReturn: false };
      const ret = invoice.reversedBy
        ? workspace.entries.find(
            (entry) => entry.reference === invoice.reversedBy && entry.branchId === branchId,
          )
        : undefined;
      const partial = (workspace.invoiceReturns || [])
        .filter((r) => r.sourceId === invoice.id)
        .map((r) => ({
          ...r,
          id: invoice.id,
          total: -r.total,
          sourceId: invoice.id,
          isReturn: true,
        }));
      return [
        ...(filter !== 'returns' ? [original] : []),
        ...(filter !== 'originals' && ret
          ? [
              {
                ...invoice,
                number: ret.reference,
                date: ret.date,
                total: -invoice.total,
                sourceId: invoice.id,
                isReturn: true,
              },
            ]
          : []),
        ...(filter !== 'originals' ? partial : []),
      ];
    })
    .sort((a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt));
}
