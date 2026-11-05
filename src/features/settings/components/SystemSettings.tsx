import { ROUTES } from '@/core/config/navigation-paths';
import { useSystemSettingsController } from '@/features/settings/hooks/useSystemSettingsController';

import { fmt } from '@/core/utils/formatters';
import { PREFIXES } from '@/features/accounting/public/numbering';
import { isArchived } from '@/features/ledger/public/annual-books';
import { cashOptions } from '@/features/ledger/public/cash';
import type { DocumentKind } from '@/features/ledger/public/types/models/DocumentKind';
import { branchDefaults } from '@/features/organization/public/system-settings';
import { SETTINGS_TABS } from '@/features/settings/constants/settings-tabs';
import type { GroupProps } from '@/features/settings/types/GroupProps';
import type { LockedProps } from '@/features/settings/types/LockedProps';
import type { SystemSettingsProps } from '@/features/settings/types/SystemSettingsProps';
import type { ToggleProps } from '@/features/settings/types/ToggleProps';
import { Modal } from '@/shared/ui/dialogs/Modal';
import { Pill } from '@/shared/ui/display/Pill';
import { AmountWords } from '@/shared/ui/documents/AmountWords';
import { Field } from '@/shared/ui/forms/Field';
import { Select } from '@/shared/ui/forms/Select';
import { Form as ValidatedForm } from '@/shared/ui/forms/ValidatedForm';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import { DataTable } from '@/shared/ui/tables/DataTable';
import { ArrowLeft, Database, Printer, Save, Undo2 } from 'lucide-react';
import { toast } from 'sonner';

function Toggle({ label, isChecked: isValue, onChange, note }: ToggleProps) {
  return (
    <label className="setting-toggle">
      <span>
        <strong>{label}</strong>
        {note && <small>{note}</small>}
      </span>
      <input type="checkbox" checked={isValue} onChange={(e) => onChange(e.target.checked)} />
    </label>
  );
}

function Locked({ label, value, reason }: LockedProps) {
  return (
    <div className="setting-locked">
      <span>
        <strong>{label}</strong>
        {reason && <small>{reason}</small>}
      </span>
      <Pill tone="gray">{value}</Pill>
    </div>
  );
}

function Group({ title, children }: GroupProps) {
  return (
    <section className="settings-form-group">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

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
    s,
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
  const inherited = (kind: 'sale' | 'purchase' | 'expense' | 'receipt' | 'payment') => (
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
  const num = (text: string, value: number, onChange: (v: number) => void, max?: number) => (
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
              <>
                <Group title="بيانات النشاط والهوية التجارية">
                  <div className="form-grid">
                    {[
                      ['name', 'اسم المنشأة القانوني *'],
                      ['tradeName', 'الاسم التجاري / اسم النظام *'],
                      ['activity', 'نوع النشاط التجاري'],
                      ['address', 'العنوان'],
                      ['phone', 'الهاتف'],
                      ['email', 'البريد الإلكتروني'],
                      ['taxNumber', 'الرقم الضريبي'],
                      ['registrationNumber', 'رقم السجل التجاري'],
                      ['tagline', 'الوصف المختصر للهوية'],
                    ].map(([key, title]) => (
                      <Field key={key} label={title}>
                        <Input
                          required={key === 'name' || key === 'tradeName'}
                          type={key === 'email' ? 'email' : 'text'}
                          value={company[key as keyof typeof company]}
                          onChange={(e) => setCompany({ ...company, [key]: e.target.value })}
                        />
                      </Field>
                    ))}
                    <Field label="اللون الرئيسي للهوية">
                      <Input
                        pattern="#[0-9a-fA-F]{6}"
                        value={company.color}
                        onChange={(e) => setCompany({ ...company, color: e.target.value })}
                      />
                    </Field>
                    <Field label="شعار المنشأة — PNG / JPEG / WebP حتى 100KB">
                      <Input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          if (
                            !['image/png', 'image/jpeg', 'image/webp'].includes(file.type) ||
                            file.size > 100000
                          ) {
                            toast.error('اختر صورة PNG أو JPEG أو WebP حتى 100KB');
                            return;
                          }
                          const reader = new FileReader();
                          reader.onload = () =>
                            setCompany({ ...company, logo: String(reader.result) });
                          reader.readAsDataURL(file);
                        }}
                      />
                    </Field>
                    {company.logo && (
                      <div>
                        <img src={company.logo} alt="شعار المنشأة" width={85} />
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => setCompany({ ...company, logo: '' })}
                        >
                          حذف الشعار
                        </Button>
                      </div>
                    )}
                  </div>
                </Group>
                <Group title="تأسيس المنشأة">
                  <Locked
                    label="العملة الأساسية"
                    value={s.organization.currency}
                    reason="عملة المحرك الحالية ثابتة، ولا تتغير بسعر صرف أو بعد وجود الحركات."
                  />
                  <Locked
                    label="تعدد الفروع"
                    value={
                      s.branches.filter((branch) => branch.active).length > 1
                        ? 'متعددة الفروع'
                        : 'فرع واحد'
                    }
                    reason="يعكس الفروع النشطة فعليًا؛ إدارته من دليل الفروع."
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(ROUTES.SETTINGS_BRANCHES)}
                  >
                    إدارة الفروع
                  </Button>
                </Group>
              </>
            )}
            {tab === 'accounting' && (
              <>
                <Group title="إعدادات الضرائب">
                  <Toggle
                    label="تفعيل الضريبة في الفواتير الجديدة"
                    isChecked={draft.accounting.taxEnabled}
                    onChange={(isV) => change('accounting', 'taxEnabled', isV)}
                    note="يطبق على فواتير المبيعات والمشتريات الجديدة بعد حفظ التغييرات."
                  />
                  {num(
                    'نسبة الضريبة الافتراضية %',
                    draft.accounting.taxRate,
                    (v) => change('accounting', 'taxRate', v),
                    100,
                  )}
                  <Locked
                    label="طريقة احتساب الضريبة"
                    value="تضاف إلى السعر بعد الخصومات"
                    reason="الأسعار المدخلة لا تشمل الضريبة. تدعم الفاتورة نسبة ضريبة واحدة، وضريبة المشتريات قابلة للاسترداد."
                  />
                  <DataTable
                    headers={['نوع الضريبة', 'الحساب المرتبط']}
                    rows={[
                      ['ضريبة المبيعات', '240 — ' + chart['240']?.name],
                      ['ضريبة المشتريات', '165 — ' + chart['165']?.name],
                    ]}
                  />
                  <p className="info-note">
                    تحتفظ الفواتير المحفوظة بنسبتها ومبالغها، وتُحسب ضريبة المرتجع من الفاتورة
                    الأصلية. تعطيل الضريبة لا يغير المستندات السابقة.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate(ROUTES.ACCOUNTING_TAX_REPORT)}
                    >
                      تقرير الضرائب
                    </Button>
                    <Button type="button" variant="link" onClick={() => go('company')}>
                      تعديل الرقم الضريبي للمنشأة
                    </Button>
                  </div>
                </Group>
                <Group title="السنة والسياسات المحاسبية">
                  <Locked
                    label="سياسة التكلفة"
                    value="جرد مستمر ومتوسط متحرك لكل مخزن"
                    reason="المجاني في المشتريات يدخل في الكمية وتظل الأسعار التجارية مستقلة عن التكلفة."
                  />
                  {!s.organization.policyApproved ? (
                    <Button
                      type="button"
                      disabled={isBusy || isArchived(s)}
                      variant="outline"
                      onClick={() =>
                        organizationMutation.execute({ ...s.organization, policyApproved: true })
                      }
                    >
                      اعتماد السياسة للسماح بالحفظ النهائي
                    </Button>
                  ) : (
                    <Locked label="اعتماد سياسة التكلفة" value="معتمدة" />
                  )}
                  <Locked label="السنة المالية الحالية" value={String(s.organization.year)} />
                  <Locked
                    label="بداية ونهاية السنة"
                    value={s.organization.year + '-01-01 ← ' + s.organization.year + '-12-31'}
                    reason="سنة ميلادية كاملة في هذه النسخة؛ الإنشاء والانتقال عبر إدارة الفترات."
                  />
                  <Locked
                    label="تقسيم الإقفال إلى فترات شهرية"
                    value="غير مفعّل"
                    reason="الحماية الحالية لإقفال السنة وأرشفتها؛ إقفال الأشهر يحتاج محرك فترات."
                  />
                  <Toggle
                    label="السماح بالعملات المتعددة للمستندات الجديدة"
                    isChecked={draft.accounting.multiCurrency}
                    onChange={(isV) => change('accounting', 'multiCurrency', isV)}
                    note="تظل المستندات السابقة وأسعار صرفها محفوظة."
                  />
                  <Toggle
                    label="السماح بالأرصدة النقدية السالبة"
                    isChecked={draft.accounting.allowNegativeCash}
                    onChange={(isV) => change('accounting', 'allowNegativeCash', isV)}
                    note="يطبق على رصيد الحساب النقدي لكل فرع. لا يمكن منعه مع وجود رصيد نقدي سالب."
                  />
                  <Locked
                    label="دقة وتقريب المبالغ"
                    value="منزلتان — لأقرب جزء من مئة"
                    reason="ثابت لحماية اتساق القيود والتكلفة والتقارير."
                  />
                  <Locked label="منع التعديل في السنوات المؤرشفة" value="مفعّل دائمًا" />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(ROUTES.SETTINGS_ANNUAL_BOOKS)}
                  >
                    إدارة السنة والترحيل
                  </Button>
                </Group>
                <Group title="ربط الحسابات الافتراضية">
                  <DataTable
                    headers={['الاستخدام', 'الحساب الحالي', 'الحالة']}
                    rows={Object.entries({
                      العملاء: '130',
                      الموردون: '210',
                      المبيعات: '400',
                      المخزون: '120',
                      'تكلفة البضاعة المباعة': '500',
                      'فروق الجرد': '540',
                      'الأرباح المرحلة': '310',
                    }).map(([title, code]) => [
                      title,
                      code + ' — ' + chart[code]?.name,
                      'حساب رقابي ثابت',
                    ])}
                  />
                  <Locked
                    label="المردودات والخصومات"
                    value="عكس الأصل / صافي الفاتورة"
                    reason="المحرك الحالي يعكس حسابات الأصل، ولا يملك ربطًا مستقلًا لحسابات المردودات."
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(ROUTES.ACCOUNTING_ACCOUNTS)}
                  >
                    فتح دليل الحسابات
                  </Button>
                </Group>
              </>
            )}
            {tab === 'branches' && (
              <>
                <Group title="الفرع ومصادر الافتراضيات">
                  <Locked
                    label="الفرع الافتراضي للمستخدم"
                    value="من محدد الفرع في الشريط العلوي"
                    reason="تفضيل مرتبط بهوية مستخدم فعلية غير مفعّل حاليًا."
                  />
                  {s.branches.filter((branch) => branch.active).length > 1 ? (
                    <Field label="اختيار الفرع">
                      <Select
                        value={branch}
                        onChange={(e) => {
                          if (isDirty && !window.confirm('الانتقال إلى فرع آخر دون حفظ؟')) return;
                          setBranch(e.target.value);
                          setBranchData(branchDefaults(s, e.target.value));
                        }}
                      >
                        {s.branches
                          .filter((branch) => branch.active)
                          .map((branch) => (
                            <option key={branch.id} value={branch.id}>
                              {branch.name}
                            </option>
                          ))}
                      </Select>
                    </Field>
                  ) : (
                    <p>{s.branches.find((b) => b.id === branch)?.name}</p>
                  )}
                  <div className="form-grid">
                    <Field label="المخزن الافتراضي للفرع">
                      <Select
                        value={branchData.warehouseId}
                        onChange={(e) =>
                          setBranchData({ ...branchData, warehouseId: e.target.value })
                        }
                      >
                        <option value="">بدون اختيار</option>
                        {s.warehouses
                          .filter((warehouse) => warehouse.branchId === branch && warehouse.active)
                          .map((warehouse) => (
                            <option key={warehouse.id} value={warehouse.id}>
                              {warehouse.name}
                            </option>
                          ))}
                      </Select>
                    </Field>
                    <Field label="مخزن المشتريات — فارغ يعني مخزن الفرع">
                      <Select
                        value={branchData.purchaseWarehouseId}
                        onChange={(e) =>
                          setBranchData({ ...branchData, purchaseWarehouseId: e.target.value })
                        }
                      >
                        <option value="">استخدام مخزن الفرع</option>
                        {s.warehouses
                          .filter((warehouse) => warehouse.branchId === branch && warehouse.active)
                          .map((warehouse) => (
                            <option key={warehouse.id} value={warehouse.id}>
                              {warehouse.name}
                            </option>
                          ))}
                      </Select>
                    </Field>
                    {(
                      [
                        ['cashId', 'الصندوق الأساسي للفرع'],
                        ['saleCashId', 'صندوق البيع النقدي'],
                        ['purchaseCashId', 'صندوق الشراء النقدي'],
                        ['expenseCashId', 'صندوق المصروفات'],
                        ['receiptCashId', 'صندوق سندات القبض'],
                        ['paymentCashId', 'صندوق سندات الصرف'],
                      ] as const
                    ).map(([key, title]) => (
                      <Field key={key} label={title}>
                        <Select
                          value={branchData[key]}
                          onChange={(e) => setBranchData({ ...branchData, [key]: e.target.value })}
                        >
                          {key !== 'cashId' && (
                            <option value="">وراثة صندوق الفرع بعملة العملية</option>
                          )}
                          {cashOptions(s, branch)
                            .filter(
                              (c) =>
                                c.active &&
                                (key === 'expenseCashId' || c.currency === s.organization.currency),
                            )
                            .map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.name} · {c.currency}
                              </option>
                            ))}
                        </Select>
                      </Field>
                    ))}
                    <Field label="نوع السعر الافتراضي للفرع">
                      <Select
                        value={branchData.priceType}
                        onChange={(e) =>
                          setBranchData({
                            ...branchData,
                            priceType: e.target.value as 'retail' | 'wholesale',
                          })
                        }
                      >
                        <option value="retail">تجزئة</option>
                        <option value="wholesale">جملة</option>
                      </Select>
                    </Field>
                    <Field label="رمز الفرع لترقيم المستندات — أحرف إنجليزية وأرقام">
                      <Input
                        pattern="[A-Z0-9]{1,8}"
                        maxLength={8}
                        value={branchData.code}
                        onChange={(e) =>
                          setBranchData({ ...branchData, code: e.target.value.toUpperCase() })
                        }
                      />
                    </Field>
                  </div>
                  <p className="info-note">
                    المخازن والصناديق تُعرّف في قوائمها. هنا يحدد الاستخدام الافتراضي فقط، ولا تعاد
                    كتابة المستندات السابقة. الفواتير وسندات الذمم النقدية تسجل بالعملة الأساسية،
                    والمصروفات بصندوق عملتها.
                  </p>
                </Group>
                <Group title="سياسات الفروع الثابتة">
                  <Locked label="استقلال الأرصدة والقيود لكل فرع" value="مفعّل دائمًا" />
                  <Locked
                    label="مشاركة بطاقات العملاء والموردين"
                    value="مشتركة للمنشأة"
                    reason="الأرصدة منفصلة لكل فرع، أما تعريف الطرف فمشترك. الفصل التعريفي غير مدعوم حاليًا."
                  />
                  <Locked label="التحصيل نيابة عن فرع آخر" value="غير مفعّل" />
                  <Locked
                    label="التحويل بين الفروع"
                    value={draft.inventory.allowCrossBranchTransfer ? 'مسموح' : 'ممنوع'}
                    reason="مصدره الوحيد في إعدادات المخزون."
                  />
                  <Button type="button" variant="link" onClick={() => go('inventory')}>
                    ضبط التحويلات
                  </Button>
                </Group>
              </>
            )}
            {tab === 'sales' && (
              <>
                <Group title="سياسة البيع">
                  <Field label="نوع السعر الافتراضي للمنشأة — قبل تخصيص الفرع والعميل">
                    <Select
                      value={draft.sales.defaultPrice}
                      onChange={(e) => change('sales', 'defaultPrice', e.target.value)}
                    >
                      <option value="retail">تجزئة</option>
                      <option value="wholesale">جملة</option>
                    </Select>
                  </Field>
                  <Toggle
                    label="السماح بالبيع الآجل"
                    isChecked={draft.sales.allowCredit}
                    onChange={(isV) => change('sales', 'allowCredit', isV)}
                  />
                  <Toggle
                    label="السماح بالبيع بأقل من التكلفة"
                    isChecked={draft.sales.allowBelowCost}
                    onChange={(isV) => change('sales', 'allowBelowCost', isV)}
                  />
                  <Toggle
                    label="السماح بخصم على مستوى الصنف"
                    isChecked={draft.sales.lineDiscount}
                    onChange={(isV) => change('sales', 'lineDiscount', isV)}
                  />
                  {num(
                    'أقصى خصم مبيعات % — مع تطبيق الحد الأقل من بطاقة الصنف',
                    draft.sales.maxDiscount,
                    (v) => change('sales', 'maxDiscount', v),
                    100,
                  )}
                  <Toggle
                    label="السماح بحذف مسودات فواتير المبيعات"
                    isChecked={draft.sales.allowDraftDelete}
                    onChange={(isV) => change('sales', 'allowDraftDelete', isV)}
                  />
                  {inherited('sale')}
                </Group>
                <Group title="ضوابط ثابتة أو غير متاحة">
                  <Locked label="العميل عند البيع الآجل" value="إلزامي" />
                  <Locked
                    label="البيع دون كمية متاحة / المخزون السالب"
                    value="ممنوع"
                    reason="سياسة واحدة ثابتة مرتبطة بتقييم المخزون؛ ليست مفتاحًا مستقلًا للبيع."
                  />
                  <Locked label="خصم إجمالي على الفاتورة" value="غير مفعّل" />
                  <Locked label="مرتجع المبيعات وربطه بالأصل" value="مدعوم وربط الأصل إلزامي" />
                  <Locked label="تعديل أو إلغاء نهائي مباشر" value="غير مسموح — التصحيح بمرتجع" />
                  <Locked
                    label="الطباعة تلقائيًا بعد الحفظ"
                    value="غير مفعّلة"
                    reason="الطباعة الحالية تبدأ من زر الطباعة ومعاينة المتصفح."
                  />
                </Group>
              </>
            )}
            {tab === 'purchases' && (
              <>
                <Group title="سياسة الشراء">
                  <Toggle
                    label="السماح بالشراء الآجل"
                    isChecked={draft.purchases.allowCredit}
                    onChange={(isV) => change('purchases', 'allowCredit', isV)}
                  />
                  <Toggle
                    label="تحديث سعر الشراء المرجعي للوحدة عند الحفظ النهائي"
                    isChecked={draft.purchases.updatePurchasePrice}
                    onChange={(isV) => change('purchases', 'updatePurchasePrice', isV)}
                    note="يحدث الوحدة المشتراة بسعرها الصافي بالأساسية؛ لا يغير تكلفة مخزون سابقة."
                  />
                  <Toggle
                    label="منع تكرار رقم فاتورة المورد لنفس المورد"
                    isChecked={draft.purchases.preventDuplicateSupplierNumber}
                    onChange={(isV) => change('purchases', 'preventDuplicateSupplierNumber', isV)}
                  />
                  <Toggle
                    label="السماح بحذف مسودات المشتريات"
                    isChecked={draft.purchases.allowDraftDelete}
                    onChange={(isV) => change('purchases', 'allowDraftDelete', isV)}
                  />
                  {inherited('purchase')}
                  <Locked
                    label="مخزن المشتريات الافتراضي"
                    value={
                      s.warehouses.find(
                        (warehouse) =>
                          warehouse.id ===
                          (branchDefaults(s, branchId).purchaseWarehouseId ||
                            branchDefaults(s, branchId).warehouseId),
                      )?.name || 'غير محدد'
                    }
                    reason="مصدره إعدادات الفرع."
                  />
                </Group>
                <Group title="قواعد الشراء المعتمدة">
                  <Locked label="الزيادة المجانية" value="مدعومة دائمًا في الشراء" />
                  <Locked label="مرتجع المشتريات وربطه بالأصل" value="مدعوم وربط الأصل إلزامي" />
                  <Locked
                    label="المورد النقدي الافتراضي"
                    value="اختياري داخل الفاتورة"
                    reason="المورد إلزامي عند الشراء الآجل؛ لا يُختار طرف تلقائي غير محدد."
                  />
                </Group>
              </>
            )}
            {tab === 'inventory' && (
              <>
                <Group title="التقييم والضوابط">
                  <Locked
                    label="طريقة تقييم تكلفة المخزون"
                    value="متوسط متحرك لكل مخزن"
                    reason="طريقة المحرك الحالية؛ لا تتغير إلى FIFO دون ترحيل تكلفة مدروس."
                  />
                  <Locked label="المخزون السالب" value="ممنوع دائمًا" />
                  <Locked label="دقة الكميات والوحدات" value="حتى 6 منازل — وحدات 1 / 2 / 3" />
                  <Toggle
                    label="السماح بالتحويل بين المخازن"
                    isChecked={draft.inventory.allowTransfer}
                    onChange={(isV) => change('inventory', 'allowTransfer', isV)}
                  />
                  <Toggle
                    label="السماح بالتحويل بين الفروع"
                    isChecked={draft.inventory.allowCrossBranchTransfer}
                    onChange={(isV) => change('inventory', 'allowCrossBranchTransfer', isV)}
                  />
                  <Toggle
                    label="السماح بتسويات المخزون"
                    isChecked={draft.inventory.allowAdjustment}
                    onChange={(isV) => change('inventory', 'allowAdjustment', isV)}
                  />
                  <Toggle
                    label="اشتراط سبب لتسوية المخزون"
                    isChecked={draft.inventory.requireAdjustmentReason}
                    onChange={(isV) => change('inventory', 'requireAdjustmentReason', isV)}
                  />
                  <Locked label="متابعة الصلاحية والتشغيلات" value="غير مفعّلة" />
                </Group>
                <Group title="افتراضيات الأصناف والعرض">
                  <Toggle
                    label="تفعيل تنبيهات انخفاض المخزون"
                    isChecked={draft.inventory.alert}
                    onChange={(isV) => change('inventory', 'alert', isV)}
                  />
                  <div className="form-grid">
                    {num('حد إعادة الطلب للصنف الجديد', draft.inventory.reorder, (v) =>
                      change('inventory', 'reorder', v),
                    )}
                    {num(
                      'اقتراح الربح للصنف الجديد %',
                      draft.inventory.profit,
                      (v) => change('inventory', 'profit', v),
                      1000,
                    )}
                    {num(
                      'حد الخصم الافتراضي للصنف الجديد %',
                      draft.inventory.discount,
                      (v) => change('inventory', 'discount', v),
                      100,
                    )}
                  </div>
                  <Toggle
                    label="عرض الأصناف ذات الرصيد الصفري افتراضيًا"
                    isChecked={draft.inventory.showZero}
                    onChange={(isV) => change('inventory', 'showZero', isV)}
                  />
                  <p className="info-note">
                    افتراضيات البطاقة لا تعدّل صنفًا محفوظًا. مخزن التشغيل الافتراضي مصدره إعدادات
                    الفرع.
                  </p>
                </Group>
              </>
            )}
            {tab === 'expenses' && (
              <>
                <Group title="المصروفات">
                  <Field label="عملة المصروف الافتراضية">
                    <Select
                      value={draft.expenses.currency}
                      onChange={(e) => change('expenses', 'currency', e.target.value)}
                    >
                      {s.currencies
                        .filter(
                          (c) =>
                            draft.accounting.multiCurrency || c.code === s.organization.currency,
                        )
                        .map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.code} — {c.name}
                          </option>
                        ))}
                    </Select>
                  </Field>
                  {inherited('expense')}
                  {num(
                    'حد قيمة المصروف المعتمد YER — صفر يعني دون حد إضافي',
                    draft.expenses.maxExpense,
                    (v) => change('expenses', 'maxExpense', v),
                  )}
                  <Locked label="بيان المصروف" value="إلزامي دائمًا" />
                  <Locked
                    label="اشتراط مرفق للمصروف / إلغاء مصروف نهائي"
                    value="غير مفعّل"
                    reason="محرك اعتماد إضافي ومرفقات المصروفات ليسا متاحين في هذه النسخة."
                  />
                </Group>
                <Group title="سندات القبض والصرف">
                  <Toggle
                    label="اشتراط البيان في سند القبض أو الصرف"
                    isChecked={draft.expenses.requireVoucherNote}
                    onChange={(isV) => change('expenses', 'requireVoucherNote', isV)}
                  />
                  {inherited('receipt')}
                  {inherited('payment')}
                  <Locked
                    label="عملات سندات الذمم"
                    value="عدة مبالغ وعملات في السند الواحد"
                    reason="لكل بند صندوق بعملته وسعر صرف محفوظ، وتسوى الذمة بالعملة الأساسية. إتاحة العملات الأجنبية من إعدادات المحاسبة والضرائب."
                  />
                  <Locked label="إلغاء سند نهائي / طباعته تلقائيًا" value="غير مفعّل" />
                </Group>
              </>
            )}
            {tab === 'documents' && (
              <>
                <Group title="نطاق الترقيم">
                  <Toggle
                    label="ترقيم مستقل لكل فرع"
                    isChecked={draft.documents.independentBranch}
                    onChange={(isV) =>
                      setDraft({
                        ...draft,
                        documents: {
                          ...draft.documents,
                          independentBranch: isV,
                          showBranch: isV || draft.documents.showBranch,
                        },
                      })
                    }
                  />
                  {draft.documents.independentBranch ? (
                    <Locked label="إظهار رمز الفرع" value="إلزامي للترقيم المستقل" />
                  ) : (
                    <Toggle
                      label="إظهار رمز الفرع في الرقم"
                      isChecked={draft.documents.showBranch}
                      onChange={(isV) => change('documents', 'showBranch', isV)}
                    />
                  )}
                  <Toggle
                    label="إظهار السنة في الرقم"
                    isChecked={draft.documents.showYear}
                    onChange={(isV) => change('documents', 'showYear', isV)}
                  />
                  <Toggle
                    label="بدء تسلسل جديد مع السنة المالية"
                    isChecked={draft.documents.resetYear}
                    onChange={(isV) => change('documents', 'resetYear', isV)}
                  />
                  <p className="info-note">
                    تطبق التغييرات على المستندات الجديدة بعد الحفظ. الأرقام السابقة لا تتغير. الرقم
                    التالي يديره الخادم بمعاملة تحفظ الإصدار وتمنع التكرار؛ لا يمكن إدخاله يدويًا.
                  </p>
                </Group>
                <Group title={'ترقيم المستندات · ' + branchName}>
                  <DataTable
                    headers={['نوع المستند', 'البادئة الثابتة', 'الرقم التالي — للقراءة']}
                    rows={(Object.keys(PREFIXES) as DocumentKind[]).map((kind) => [
                      {
                        sale: 'فاتورة مبيعات',
                        purchase: 'فاتورة مشتريات',
                        receipt: 'سند قبض عام',
                        payment: 'سند صرف عام',
                        opening: 'افتتاح',
                        transfer: 'تحويل مخزني',
                        adjustment: 'تسوية مخزون',
                      }[kind],
                      PREFIXES[kind],
                      'غير متاح من API الحالي',
                    ])}
                  />
                  <Locked
                    label="المرتجعات"
                    value="RET- + رقم الفاتورة الأصلية"
                    reason="مرجع مرتبط بالأصل، وليس تسلسلًا حرًا. سندات المصروفات والأطراف لها معرفات مرتبطة آمنة مستقلة."
                  />
                  <Locked
                    label="تغيير البادئات الأساسية"
                    value="مقفلة في هذه النسخة"
                    reason="للمحافظة على تمييز أنواع المستندات والتقارير القديمة."
                  />
                </Group>
              </>
            )}
            {tab === 'printing' && (
              <>
                <Group title="تنسيق الطباعة على هذا الجهاز">
                  <Field label="تنسيق محتوى الطباعة">
                    <Select
                      value={device.paper}
                      onChange={(e) =>
                        setDevice({ ...device, paper: e.target.value as 'A4' | 'thermal' })
                      }
                    >
                      <option value="A4">A4 — قياسي</option>
                      <option value="thermal">محتوى بعرض 80mm — حراري</option>
                    </Select>
                  </Field>
                  <Toggle
                    label="إظهار الشعار في الطباعة"
                    isChecked={device.logo}
                    onChange={(isV) => setDevice({ ...device, logo: isV })}
                  />
                  <Toggle
                    label="إظهار عنوان المنشأة في الطباعة"
                    isChecked={device.address}
                    onChange={(isV) => setDevice({ ...device, address: isV })}
                  />
                  <Toggle
                    label="إظهار التفقيط في الطباعة"
                    isChecked={device.words}
                    onChange={(isV) => setDevice({ ...device, words: isV })}
                  />
                  <Field label="رسالة أسفل الطباعة">
                    <Input
                      maxLength={200}
                      value={device.footer}
                      onChange={(e) => setDevice({ ...device, footer: e.target.value })}
                    />
                  </Field>
                  <Button type="button" variant="outline" onClick={() => setPreview(true)}>
                    <Printer size={16} />
                    معاينة إعدادات الطباعة
                  </Button>
                </Group>
                <Group title="الطابعة والحقول الثابتة">
                  <Locked
                    label="الطابعة وعدد النسخ"
                    value="من نافذة طباعة المتصفح"
                    reason="الموقع لا يحدد طابعة النظام أو مسارًا محليًا تلقائيًا."
                  />
                  <Locked label="القالب" value="القالب القياسي الحالي" />
                  <Locked
                    label="بيانات العميل والخصومات"
                    value="تظهر بحسب المستند"
                    reason="إخفاء حقول انتقائي حسب نوع المستند يحتاج قوالب طباعة مستقلة."
                  />
                  <Locked label="الضرائب" value="تظهر عند وجود ضريبة في المستند" />
                </Group>
              </>
            )}
            {tab === 'general' && (
              <>
                <Group title="واجهة الجهاز الحالي">
                  <Field label="عدد السجلات في صفحة الجدول">
                    <Select
                      value={device.pageSize}
                      onChange={(e) => setDevice({ ...device, pageSize: +e.target.value })}
                    >
                      {[10, 25, 50, 100].map((n) => (
                        <option key={n} value={n}>
                          {n} سجل
                        </option>
                      ))}
                    </Select>
                  </Field>
                  <Locked label="لغة النظام" value="العربية — RTL" />
                  <Locked
                    label="المظهر"
                    value="فاتح بالهوية التجارية"
                    reason="اللون والشعار من تبويب المنشأة؛ المظهر الداكن غير مفعّل."
                  />
                  <Locked label="تنسيق الأرقام" value="1,234.56" />
                  <Locked label="التواريخ" value="حفظ ISO، وعرض الإدخال وفق المتصفح" />
                </Group>
                <Group title="النسخ والبيانات دون تكرار">
                  <p>النسخ المباشر والاستعادة والجدولة ووجهة الحفظ في شاشة موحدة.</p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(ROUTES.SETTINGS_BACKUP)}
                  >
                    <Database size={16} />
                    النسخ ونقاط الاسترجاع
                  </Button>
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => navigate(ROUTES.SETTINGS_BACKUP_POLICY)}
                  >
                    إعدادات النسخ الاحتياطي
                  </Button>
                </Group>
              </>
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
                <Button disabled={isBusy || (!isLocal && isArchived(s))}>
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
          {device.logo && s.branding?.logo && <img src={s.branding.logo} alt="الشعار" width={65} />}
          <h2>{s.branding?.name || s.organization.name}</h2>
          {device.address && <p>{s.organization.address}</p>}
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
