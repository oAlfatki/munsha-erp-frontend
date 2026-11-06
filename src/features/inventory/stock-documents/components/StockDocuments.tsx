import { fmt } from '@/core/utils/formatters';
import { StockDocumentHeader } from '@/features/inventory/stock-documents/components/StockDocumentHeader';
import { StockDocumentLines } from '@/features/inventory/stock-documents/components/StockDocumentLines';
import { useStockDocumentsController } from '@/features/inventory/stock-documents/hooks/useStockDocumentsController';
import type { StockDocumentsProps } from '@/features/inventory/stock-documents/types/props/StockDocumentsProps';
import { allAccounts } from '@/features/ledger/public';
import { stockDocumentReport } from '@/features/stock/public';
import { exportDocument, printReport } from '@/shared/services/report-actions';
import { Modal } from '@/shared/ui/dialogs/Modal';
import { Pill } from '@/shared/ui/display/Pill';
import { DocumentNavigator } from '@/shared/ui/documents/DocumentNavigator';
import { TotalsFooter } from '@/shared/ui/documents/TotalsFooter';
import { Form as ValidatedForm, validateForm } from '@/shared/ui/forms/ValidatedForm';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import { DataTable } from '@/shared/ui/tables/DataTable';
import { Download, List, Plus, Printer, Save, Search } from 'lucide-react';
import { toast } from 'sonner';

export function StockDocuments({ kind }: StockDocumentsProps) {

  const model = useStockDocumentsController({ kind });
  if (!model) return null;
  const {
    setConfirm,
    title,
    isDirty,
    setListMode,
    isListMode,
    handleReset,
    handleExportCurrent,
    documentQuery,
    setDocumentQuery,
    setSearchOpen,
    isSearchOpen,
    docs,
    load,
    setPrintRequested,
    s: state,
    selected,
    handleBrowse,
    isReadOnly,
    lines,
    offset,
    inventory,
    isBusy,
    isFinalizedBranch,
    save,
    deleteStockDraftMutation,
    isConfirm,
    total,
  } = model;
  return (
    <ValidatedForm
      onSubmit={(e) => {
        e.preventDefault();
        setConfirm(true);
      }}
    >
      <PageHead
        title={title}
        description={
          kind === 'opening'
            ? 'كميات وتكاليف الأصناف عند بداية المدة للمخزن المختار.'
            : 'رأس المستند، البنود، ثم الإجماليات. الحفظ النهائي يثبت الأثر مرة واحدة.'
        }
        extra={
          <div className="report-toolbar">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (isDirty) {
                  toast.info('احفظ المسودة أو تراجع قبل فتح القائمة.');
                  return;
                }
                setListMode(!isListMode);
              }}
            >
              <List size={16} />
              {isListMode ? 'نموذج المستند' : 'قائمة المستندات'}
            </Button>
            <Button type="button" variant="outline" onClick={handleReset}>
              <Plus size={16} />
              جديد
            </Button>
            <Button type="button" variant="outline" onClick={() => printReport()}>
              <Printer size={16} />
              طباعة
            </Button>
            <Button type="button" variant="outline" onClick={handleExportCurrent}>
              <Download size={16} />
              تصدير
            </Button>
          </div>
        }
      />
      <div className="invoice-lookup no-print">
        <Input
          aria-label="بحث مستند مخزني برقم الفاتورة"
          placeholder="ابحث برقم الفاتورة / المستند…"
          value={documentQuery}
          onChange={(e) => setDocumentQuery(e.target.value)}
        />
        <Button type="button" variant="outline" onClick={() => setSearchOpen(true)}>
          <Search size={16} />
          بحث المستندات
        </Button>
      </div>
      <Modal
        isOpen={isSearchOpen}
        title="البحث عن مستند مخزني"
        onClose={() => setSearchOpen(false)}
        isWide
      >
        <DataTable
          headers={['الرقم', 'التاريخ', 'الحالة', 'تحميل']}
          rows={docs
            .filter((d) => d.reference.toLowerCase().includes(documentQuery.toLowerCase()))
            .map((d) => [
              d.reference,
              d.date,
              d.status === 'final' ? 'نهائي' : 'مسودة',
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  if (
                    isDirty &&
                    !window.confirm('تحميل المستند يستبدل البيانات غير المحفوظة. متابعة؟')
                  )
                    return;
                  load(d);
                  setSearchOpen(false);
                }}
              >
                تحميل في الشاشة
              </Button>,
            ])}
        />
      </Modal>
      {isListMode ? (
        <>
          <DataTable
            headers={[
              'الرقم',
              'التاريخ',
              'عدد الأصناف',
              'القيمة YER',
              'الحالة',
              'عرض',
              'طباعة',
              'تصدير',
            ]}
            rows={docs.map((d) => [
              d.reference,
              d.date,
              new Set(d.lines.map((l) => l.productId)).size,
              fmt(d.total),
              <Pill tone={d.status === 'final' ? 'green' : 'amber'}>
                {d.status === 'final' ? 'نهائي' : 'مسودة'}
              </Pill>,
              <Button type="button" variant="ghost" size="sm" onClick={() => load(d)}>
                عرض
              </Button>,
              <Button
                type="button"
                aria-label={'طباعة ' + d.reference}
                size="sm"
                variant="ghost"
                onClick={() => {
                  load(d);
                  setPrintRequested(true);
                }}
              >
                <Printer size={15} />
              </Button>,
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => exportDocument(stockDocumentReport(state, d))}
              >
                <Download size={15} />
              </Button>,
            ])}
          />
          <p className="info-note">
            المستندات الجديدة متعددة البنود هنا؛ التحويلات القديمة تظهر أيضًا في تقرير التحويلات. لا
            يعاد تطبيق أثر المستند عند عرضه.
          </p>
        </>
      ) : (
        <>
          <DocumentNavigator
            index={selected ? docs.findIndex((d) => d.id === selected.id) : -1}
            count={docs.length}
            onChange={handleBrowse}
            isDisabled={isDirty}
            onList={() => setListMode(true)}
          />
          <StockDocumentHeader model={model} kind={kind} />
          {<StockDocumentLines model={model} kind={kind} />}
          <TotalsFooter
            rows={[
              ['عدد الأصناف', lines.length],
              ['إجمالي قيمة المستند YER', inventory],
            ]}
            amount={inventory}
          />

          <div className="editor-actions no-print">
            {!isReadOnly && (
              <>
                <Button
                  type="submit"
                  disabled={isBusy || !lines.length || (kind === 'opening' && isFinalizedBranch)}
                >
                  <Save size={16} />
                  مراجعة وحفظ نهائي
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  disabled={isBusy}
                  onClick={(e) => {
                    const form = e.currentTarget.closest('form');
                    if (form && validateForm(form)) save('draft');
                  }}
                >
                  حفظ مسودة
                </Button>
              </>
            )}
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                selected ? load(selected) : handleReset();
              }}
            >
              تراجع
            </Button>
            {selected?.status === 'draft' && (
              <Button
                type="button"
                variant="destructive"
                disabled={isBusy}
                onClick={async () => {
                  if (await deleteStockDraftMutation.execute({ id: selected.id })) handleReset();
                }}
              >
                حذف المسودة
              </Button>
            )}
          </div>
        </>
      )}
      <Modal
        isOpen={isConfirm}
        title="اعتماد المستند النهائي"
        description="ينشئ أثر المستند المختار فقط، دون إضافة أرصدة حسابات أخرى. المستند النهائي للعرض فقط."
        onClose={() => setConfirm(false)}
      >
        <TotalsFooter
          rows={[
            ['عدد الأصناف', lines.length],
            ['القيمة YER', total],
            ...(kind === 'opening'
              ? [['الحساب المقابل', allAccounts(state)[offset]?.name || offset] as [string, string]]
              : []),
          ]}
          amount={total}
        />
        <div className="dialog-actions">
          <Button type="button" disabled={isBusy} onClick={() => save('final')}>
            تأكيد الحفظ النهائي
          </Button>
          <Button type="button" variant="outline" onClick={() => setConfirm(false)}>
            تراجع
          </Button>
        </div>
      </Modal>
    </ValidatedForm>
  );
}
