import { ROUTES } from "@/core/config/navigation-paths";





import { useValidatedForm } from "@/core/hooks/useValidatedForm";
import { usePeriodActivate } from "@/features/accounting/public/usePeriodActivate";
import { usePeriodCreate } from "@/features/accounting/public/usePeriodCreate";
import { usePeriodReset } from "@/features/accounting/public/usePeriodReset";
import { usePeriodSwitch } from "@/features/accounting/public/usePeriodSwitch";
import {
bookCatalog,
closingChecks,
isArchived,
} from "@/features/accounting/public/annual-books";
import {
periodActivateSchema,
periodCreateSchema,
periodResetSchema,
periodSwitchSchema,
} from "@/features/accounting/public/accounting-schema";
import { useAnnualSettingsQuery } from "@/features/settings/queries/useAnnualSettingsQuery";
import type { AnnualSettingsProps } from "@/features/settings/types/AnnualSettingsProps";
import { Modal } from "@/shared/ui/dialogs/Modal";
import { Pill } from "@/shared/ui/display/Pill";
import { Field } from "@/shared/ui/forms/Field";
import { Form as ValidatedForm } from "@/shared/ui/forms/ValidatedForm";
import { PageHead } from "@/shared/ui/layout/PageHead";
import { Button } from "@/shared/ui/primitives/button";
import { Input } from "@/shared/ui/primitives/input";
import { DataTable } from "@/shared/ui/tables/DataTable";
import { ArrowLeft,Database,RefreshCw,ShieldCheck,Wifi } from 'lucide-react';
import { useState } from 'react';
export function AnnualSettings({ isConnection: isConnection = false }: AnnualSettingsProps) {
  const { state: s, busy: isBusy, revision, refresh, navigate } = useAnnualSettingsQuery();
  const periodActivateMutationRequest = usePeriodActivate();
  const periodActivateForm = useValidatedForm(
    periodActivateSchema,
    periodActivateMutationRequest.execute,
  );
  const periodActivateMutation = {
    ...periodActivateMutationRequest,
    execute: periodActivateForm.submit,
  };
  const periodCreateMutationRequest = usePeriodCreate();
  const periodCreateForm = useValidatedForm(
    periodCreateSchema,
    periodCreateMutationRequest.execute,
  );
  const periodCreateMutation = { ...periodCreateMutationRequest, execute: periodCreateForm.submit };
  const periodResetMutationRequest = usePeriodReset();
  const periodResetForm = useValidatedForm(periodResetSchema, periodResetMutationRequest.execute);
  const periodResetMutation = { ...periodResetMutationRequest, execute: periodResetForm.submit };
  const periodSwitchMutationRequest = usePeriodSwitch();
  const periodSwitchForm = useValidatedForm(
    periodSwitchSchema,
    periodSwitchMutationRequest.execute,
  );
  const periodSwitchMutation = { ...periodSwitchMutationRequest, execute: periodSwitchForm.submit };
  const actions: Record<string, (input: unknown) => Promise<boolean>> = {
    periodActivate: periodActivateMutation.execute,
    periodCreate: periodCreateMutation.execute,
    periodReset: periodResetMutation.execute,
    periodSwitch: periodSwitchMutation.execute,
  };
  const [name, setName] = useState('السنة المالية ' + (s!.organization.year + 1));
  const [confirmation, setConfirmation] = useState<{
    id: string;
    action: 'periodActivate' | 'periodReset' | 'periodSwitch';
  } | null>(null);
  if (!s) return null;
  const catalog = bookCatalog(s);
  const checks = closingChecks(s);
  const isBookArchived = isArchived(s);
  const active = catalog.books.find((b) => b.id === catalog.activeId)!;
  return (
    <>
      <PageHead
        title={
          isConnection ? 'الاتصال بقاعدة البيانات والفترات' : 'إنشاء الفترة المالية وترحيل الأرصدة'
        }
        description="مساحات سنوية منفصلة منطقيًا داخل قاعدة D1 الحالية، مع أرشفة السنة السابقة."
        extra={
          <Button variant="outline" onClick={refresh}>
            <RefreshCw size={16} />
            تحديث الحالة
          </Button>
        }
      />
      <div className="document-stats">
        <div>
          <span>الفترة المعروضة</span>
          <strong>{active.name}</strong>
        </div>
        <div>
          <span>السنة المالية</span>
          <strong>{s.organization.year}</strong>
        </div>
        <div>
          <span>الحالة</span>
          <strong>{isBookArchived ? 'مؤرشفة للعرض' : 'مفتوحة'}</strong>
        </div>
        <div>
          <span>إصدار الحفظ السحابي</span>
          <strong>{revision}</strong>
        </div>
      </div>
      {isConnection && (
        <div className="panel form-panel">
          <h2>
            <Wifi size={18} /> الاتصال السحابي
          </h2>
          <p>
            Cloudflare D1 · الحفظ متصل بالخادم · قاعدة فعلية واحدة. لا يطلب النظام بيانات اتصال أو
            كلمات مرور من المتصفح.
          </p>
          <p>دمجنا حالة الاتصال والمزامنة هنا؛ العمل دون اتصال غير مفعّل.</p>
        </div>
      )}
      <div className="info-note">
        الخطوات: أنشئ السنة التالية ← اعرض واحفظ مخزون آخر المدة ← اعرض واحفظ أرصدة جميع الحسابات ←
        فعّل الفترة الجديدة. بعد التفعيل تُؤرشف السنة السابقة للعرض فقط. تغيير الفترة المعروضة يخص
        مساحة العمل المشتركة؛ تُرفض طلبات الحفظ القديمة تلقائيًا.
      </div>
      {!isBookArchived && (
        <ValidatedForm
          className="panel form-panel"
          onSubmit={async (e) => {
            e.preventDefault();
            await periodCreateMutation.execute({ name, year: s.organization.year + 1 });
          }}
        >
          <h2>إنشاء السنة {s.organization.year + 1}</h2>
          <div className="form-grid">
            <Field label="اسم الفترة الجديدة">
              <Input
                required
                maxLength={100}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field>
            <Field label="قاعدة الاستضافة">
              <div className="input-readonly">D1 الحالية — مساحة سنوية جديدة</div>
            </Field>
          </div>
          <Button
            disabled={isBusy || catalog.books.some((b) => b.year === s.organization.year + 1)}
          >
            <Database size={16} />
            إنشاء الفترة الجديدة
          </Button>
        </ValidatedForm>
      )}
      <h2 className="section-heading">الفترات المالية</h2>
      <DataTable
        headers={['الفترة', 'السنة', 'الحالة', 'أرصدة المخزون', 'أرصدة الحسابات', 'العمليات']}
        rows={catalog.books.map((b) => [
          b.name,
          b.year,
          <Pill
            tone={b.status === 'closed' ? 'gray' : b.status === 'preparing' ? 'amber' : 'green'}
          >
            {b.status === 'closed' ? 'مؤرشفة' : b.status === 'preparing' ? 'قيد التجهيز' : 'مفتوحة'}
          </Pill>,
          b.sourceId ? (b.stockDone ? 'مرحّلة' : 'بانتظار الترحيل') : '—',
          b.sourceId ? (b.accountsDone ? 'مرحّلة' : 'بانتظار الترحيل') : '—',
          <div className="flex flex-wrap gap-2">
            {b.id === catalog.activeId ? (
              <Pill>معروضة الآن</Pill>
            ) : b.status !== 'preparing' ? (
              <Button
                size="sm"
                variant="outline"
                disabled={isBusy}
                onClick={() => setConfirmation({ id: b.id, action: 'periodSwitch' })}
              >
                فتح {b.status === 'closed' ? 'للعرض' : 'الفترة الحالية'}
              </Button>
            ) : (
              b.sourceId === catalog.activeId && (
                <>
                  <Button
                    size="sm"
                    disabled={isBusy || !b.stockDone || !b.accountsDone}
                    onClick={() => setConfirmation({ id: b.id, action: 'periodActivate' })}
                  >
                    تفعيل السنة الجديدة
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={isBusy}
                    onClick={() => setConfirmation({ id: b.id, action: 'periodReset' })}
                  >
                    إعادة تهيئة الترحيل
                  </Button>
                </>
              )
            )}
          </div>,
        ])}
      />
      {!isBookArchived && (
        <>
          <div className="flex flex-wrap gap-2 mt-5">
            <Button onClick={() => navigate(ROUTES.INVENTORY_END_STOCK)}>
              مخزون آخر المدة
              <ArrowLeft size={16} />
            </Button>
            <Button variant="outline" onClick={() => navigate(ROUTES.ACCOUNTING_END_BALANCES)}>
              أرصدة جميع الحسابات
              <ArrowLeft size={16} />
            </Button>
          </div>
          <section className="panel form-panel mt-5">
            <h2>
              <ShieldCheck size={20} /> فحص جاهزية الترحيل
            </h2>
            {checks.length ? (
              checks.map((e) => <p key={e}>• {e}</p>)
            ) : (
              <p>القيود متزنة، وقيم المخزون مطابقة للحسابات الرقابية، ولا توجد مسودات معلقة.</p>
            )}
            <p>
              تُرحّل الذمم بحسب الطرف والفرع، وتبقى جداول الأصول والإهلاك والرواتب والمصروفات مرتبطة
              بأرصدتها. تُصفّر الإيرادات والمصروفات وتُدرج النتيجة في الحساب 310، دون تغيير رأس
              المال تلقائيًا.
            </p>
          </section>
        </>
      )}
      <Modal
        isOpen={!!confirmation}
        title={
          confirmation?.action === 'periodActivate'
            ? 'تفعيل السنة الجديدة'
            : confirmation?.action === 'periodReset'
              ? 'إعادة تهيئة الأرصدة المرحلة'
              : 'فتح فترة مالية'
        }
        onClose={() => setConfirmation(null)}
        description={
          confirmation?.action === 'periodActivate'
            ? 'سيُقفل التعديل على السنة السابقة، وتصبح السنة الجديدة هي المفتوحة.'
            : confirmation?.action === 'periodReset'
              ? 'تُمسح نسختا الترحيل في الفترة قيد التجهيز فقط؛ تبقى حركات السنة المصدر محفوظة.'
              : 'سيُغيّر العرض للسنة المحددة لجميع جلسات مساحة العمل.'
        }
      >
        <div className="dialog-actions">
          <Button
            disabled={isBusy}
            onClick={async () => {
              if (
                confirmation &&
                (await actions[confirmation.action]({ id: confirmation.id, confirmed: true }))
              ) {
                setConfirmation(null);
              }
            }}
          >
            تأكيد
          </Button>
          <Button variant="ghost" onClick={() => setConfirmation(null)}>
            تراجع
          </Button>
        </div>
      </Modal>
    </>
  );
}
