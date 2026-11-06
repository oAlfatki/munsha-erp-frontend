import { ROUTES } from '@/core/config/navigation-paths';
import { AccountingSettingsPanel } from '@/features/settings/components/panels/AccountingSettingsPanel';
import { BranchesSettingsPanel } from '@/features/settings/components/panels/BranchesSettingsPanel';
import { CompanySettingsPanel } from '@/features/settings/components/panels/CompanySettingsPanel';
import { DocumentsSettingsPanel } from '@/features/settings/components/panels/DocumentsSettingsPanel';
import { ExpensesSettingsPanel } from '@/features/settings/components/panels/ExpensesSettingsPanel';
import { GeneralSettingsPanel } from '@/features/settings/components/panels/GeneralSettingsPanel';
import { InventorySettingsPanel } from '@/features/settings/components/panels/InventorySettingsPanel';
import { PrintingSettingsPanel } from '@/features/settings/components/panels/PrintingSettingsPanel';
import { PurchasesSettingsPanel } from '@/features/settings/components/panels/PurchasesSettingsPanel';
import { SalesSettingsPanel } from '@/features/settings/components/panels/SalesSettingsPanel';
import { useSystemSettingsController } from '@/features/settings/hooks/useSystemSettingsController';

import { fmt } from '@/core/utils/formatters';
import { isArchived } from '@/features/ledger/public';
import { SETTINGS_TABS } from '@/features/settings/constants/settings-tabs';
import type { SystemSettingsProps } from '@/features/settings/types/props/SystemSettingsProps';
import { Modal } from '@/shared/ui/dialogs/Modal';
import { Pill } from '@/shared/ui/display/Pill';
import { AmountWords } from '@/shared/ui/documents/AmountWords';
import { Field } from '@/shared/ui/forms/Field';
import { Form as ValidatedForm } from '@/shared/ui/forms/ValidatedForm';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import { DataTable } from '@/shared/ui/tables/DataTable';
import { ArrowLeft, Save, Undo2 } from 'lucide-react';

export function SystemSettings({ initialTab = 'company' }: SystemSettingsProps) {

  const model = useSystemSettingsController({ initialTab });
  if (!model) return null;
  const {
    branchName,
    defaultNote,
    go,
    tab,
    navigate,
    label,
    isLocal,
    scope,
    save,
    company,
    setCompany,
    s: state,
    draft,
    change,
    chart,
    isBusy,
    organizationMutation,
    branch,
    isDirty,
    setBranch,
    setBranchData,
    branchData,
    branchId,
    setDraft,
    device,
    setDevice,
    setPreview,
    handleReset,
    isPreview,
  } = model;

  const renderInheritedCash = (kind: 'sale' | 'purchase' | 'expense' | 'receipt' | 'payment') => (
    <div className="settings-inherited">
      <span>
        الصندوق الافتراضي · {branchName}: <strong>{defaultNote(kind)}</strong>
      </span>
      <Button type="button" variant="link" onClick={() => go('branches')}>
        تخصيص من إعدادات الفرع
        <ArrowLeft size={14} />
      </Button>
    </div>
  );

  const renderNumberField = (
    text: string,
    value: number,
    onChange: (v: number) => void,
    max?: number,
  ) => (
    <Field label={text}>
      <Input
        required
        type="number"
        min="0"
        max={max}
        step="any"
        value={value}
        onChange={(e) => onChange(+e.target.value)}
      />
    </Field>
  );

  return (
    <>
      <PageHead
        title="إعدادات النظام"
        description="مصدر واحد لسلوك النظام؛ التعريفات الرئيسية والخدمات التشغيلية في شاشاتها المستقلة."
      />
      <div className="system-settings-layout">
        <nav className="settings-section-nav" aria-label="أقسام إعدادات النظام">
          {SETTINGS_TABS.map(([id, name], i) => (
            <button key={id} className={tab === id ? 'active' : ''} onClick={() => go(id)}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              {name}
            </button>
          ))}
          <div className="settings-services">
            <strong>خدمات البيانات</strong>
            {[
              ['النسخ والاسترجاع', ROUTES.SETTINGS_BACKUP],
              ['الاتصال والترحيل', ROUTES.SETTINGS_ANNUAL_BOOKS],
            ].map(([title, path]) => (
              <button key={path} onClick={() => navigate(path)}>
                {title}
                <ArrowLeft size={13} />
              </button>
            ))}
          </div>
        </nav>
        <div className="settings-section-body panel">
          <div className="settings-section-heading">
            <div>
              <span className="eyebrow">ضبط سلوك النظام</span>
              <h2>{label}</h2>
            </div>
            <Pill tone={isLocal ? 'blue' : tab === 'branches' ? 'amber' : 'green'}>{scope}</Pill>
          </div>
          <ValidatedForm
            onSubmit={(e) => {
              e.preventDefault();
              save();
            }}
          >
            {tab === 'company' && (
              <CompanySettingsPanel
                navigate={navigate}
                company={company}
                setCompany={setCompany}
                s={state}
              />
            )}
            {tab === 'accounting' && (
              <AccountingSettingsPanel
                go={go}
                navigate={navigate}
                s={state}
                draft={draft}
                change={change}
                chart={chart}
                isBusy={isBusy}
                organizationMutation={organizationMutation}
                renderNumberField={renderNumberField}
              />
            )}
            {tab === 'branches' && (
              <BranchesSettingsPanel
                go={go}
                s={state}
                draft={draft}
                branch={branch}
                isDirty={isDirty}
                setBranch={setBranch}
                setBranchData={setBranchData}
                branchData={branchData}
              />
            )}
            {tab === 'sales' && (
              <SalesSettingsPanel
                draft={draft}
                change={change}
                renderNumberField={renderNumberField}
                renderInheritedCash={renderInheritedCash}
              />
            )}
            {tab === 'purchases' && (
              <PurchasesSettingsPanel
                s={state}
                draft={draft}
                change={change}
                branchId={branchId}
                renderInheritedCash={renderInheritedCash}
              />
            )}
            {tab === 'inventory' && (
              <InventorySettingsPanel
                draft={draft}
                change={change}
                renderNumberField={renderNumberField}
              />
            )}
            {tab === 'expenses' && (
              <ExpensesSettingsPanel
                s={state}
                draft={draft}
                change={change}
                renderNumberField={renderNumberField}
                renderInheritedCash={renderInheritedCash}
              />
            )}
            {tab === 'documents' && (
              <DocumentsSettingsPanel
                branchName={branchName}
                draft={draft}
                change={change}
                setDraft={setDraft}
              />
            )}
            {tab === 'printing' && (
              <PrintingSettingsPanel
                device={device}
                setDevice={setDevice}
                setPreview={setPreview}
              />
            )}
            {tab === 'general' && (
              <GeneralSettingsPanel navigate={navigate} device={device} setDevice={setDevice} />
            )}
            <div className="settings-savebar">
              <span>
                {isLocal ? 'يحفظ محليًا لهذا المتصفح فقط' : 'يحفظ سحابيًا بالنطاق الموضح'}
                {isDirty ? ' · تغييرات غير محفوظة' : ''}
              </span>
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={handleReset}>
                  <Undo2 size={16} />
                  تراجع
                </Button>
                <Button disabled={isBusy || (!isLocal && isArchived(state))}>
                  <Save size={16} />
                  حفظ التغييرات
                </Button>
              </div>
            </div>
          </ValidatedForm>
        </div>
      </div>
      <Modal
        isOpen={isPreview}
        isWide
        description="معاينة لتنسيق الجهاز الحالي باستخدام بيانات توضيحية."
        title="معاينة إعدادات الطباعة — بيانات توضيحية"
        onClose={() => setPreview(false)}
      >
        <div
          className={'settings-print-preview ' + (device.paper === 'thermal' ? 'thermal' : '')}
          style={{ maxWidth: device.paper === 'thermal' ? '80mm' : undefined }}
        >
          {device.logo && state.branding?.logo && (
            <img src={state.branding.logo} alt="الشعار" width={65} />
          )}
          <h2>{state.branding?.name || state.organization.name}</h2>
          {device.address && <p>{state.organization.address}</p>}
          <p>فاتورة مبيعات توضيحية · العميل النقدي</p>
          <DataTable
            headers={['الصنف', 'الكمية', 'السعر', 'الإجمالي']}
            rows={[['صنف توضيحي', 2, 100, 200]]}
          />
          <h3>الإجمالي {fmt(200)} YER</h3>
          {device.words && <AmountWords amount={200} />}
          <p>{device.footer}</p>
        </div>
        <p className="info-note">
          المعاينة تعرض تغييرات الجهاز الحالية قبل حفظها. مقاس الورق والطابعة وعدد النسخ النهائي
          تختارها من نافذة المتصفح.
        </p>
      </Modal>
    </>
  );
}
