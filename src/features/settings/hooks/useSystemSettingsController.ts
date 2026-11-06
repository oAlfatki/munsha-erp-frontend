import {
  DEFAULT_DEVICE_SETTINGS,
  readDeviceSettings,
  saveDeviceSettings,
} from '@/core/services/device-settings';
import { allAccounts, cashOptions } from '@/features/ledger/public';
import {
  branchDefaults,
  operationCashId,
  organizationSchema,
  systemSettings,
  systemSettingsSchema,
} from '@/features/organization/public';
import { SETTINGS_TABS } from '@/features/settings/constants/settings-tabs';
import { useOrganization } from '@/features/settings/hooks/useOrganization';
import { useSystemSettings } from '@/features/settings/hooks/useSystemSettings';
import { useSystemSettingsQuery } from '@/features/settings/queries/useSystemSettingsQuery';
import type { SettingsTab } from '@/features/settings/types/models/SettingsTab';
import type { SystemSettingsProps } from '@/features/settings/types/props/SystemSettingsProps';
import { useValidatedForm } from '@/shared/hooks/useValidatedForm';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

/** Screen state, commands and derived values; no route-based dispatch. */

export function useSystemSettingsController({ initialTab = 'company' }: SystemSettingsProps) {

  const { state, branchId, busy: isBusy, navigate } = useSystemSettingsQuery();
  const organizationMutationRequest = useOrganization(),
    organizationForm = useValidatedForm(organizationSchema, organizationMutationRequest.execute),
    organizationMutation = { ...organizationMutationRequest, execute: organizationForm.submit };
  const systemSettingsMutationRequest = useSystemSettings(),
    systemSettingsForm = useValidatedForm(
      systemSettingsSchema,
      systemSettingsMutationRequest.execute,
    ),
    systemSettingsMutation = {
      ...systemSettingsMutationRequest,
      execute: systemSettingsForm.submit,
    };
  const [tab, setTab] = useState<SettingsTab>(initialTab),
    [draft, setDraft] = useState(() => systemSettings(state!)),
    [branch, setBranch] = useState(branchId),
    [branchData, setBranchData] = useState(() => branchDefaults(state!, branchId)),
    [device, setDevice] = useState(DEFAULT_DEVICE_SETTINGS),
    [isPreview, setPreview] = useState(false);

  const companyValue = () => ({
    name: state!.organization.name,
    tradeName: state!.branding?.name || state!.organization.name,
    address: state!.organization.address,
    phone: state!.organization.phone,
    email: state!.organization.email || '',
    activity: state!.organization.activity || '',
    taxNumber: state!.organization.taxNumber || '',
    registrationNumber: state!.organization.registrationNumber || '',
    tagline: state!.branding?.tagline || '',
    color: state!.branding?.color || '#17685b',
    logo: state!.branding?.logo || '',
  });

  const [company, setCompany] = useState(companyValue);
  useEffect(() => {
    setDevice(readDeviceSettings());
  }, []);
  if (!state) return null;
  const isLocal = tab === 'printing' || tab === 'general',
    label = SETTINGS_TABS.find(([id]) => id === tab)![1],
    scope = isLocal
      ? 'الجهاز الحالي — تفضيلات هذا المتصفح'
      : tab === 'branches'
        ? 'فرع محدد'
        : 'المنشأة كاملة',
    chart = allAccounts(state),
    isDirty = isLocal
      ? JSON.stringify(device) !== JSON.stringify(readDeviceSettings())
      : tab === 'company'
        ? JSON.stringify(company) !== JSON.stringify(companyValue())
        : tab === 'branches'
          ? JSON.stringify(branchData) !== JSON.stringify(branchDefaults(state, branch))
          : JSON.stringify(draft[tab as keyof typeof draft]) !==
            JSON.stringify(systemSettings(state)[tab as keyof typeof draft]);

  const change = <
    TData extends 'accounting' | 'sales' | 'purchases' | 'inventory' | 'expenses' | 'documents',
  >(
    section: TData,
    key: keyof (typeof draft)[TData],
    value: unknown,
  ) => setDraft({ ...draft, [section]: { ...draft[section], [key]: value } });

  const go = (next: SettingsTab) => {

    if (isDirty && !window.confirm('توجد تغييرات غير محفوظة. الانتقال دون حفظ؟')) return;
    setTab(next);
    setDraft(systemSettings(state));
    setBranchData(branchDefaults(state, branch));
    setCompany(companyValue());
    setDevice(readDeviceSettings());
  };

  const handleReset = () => {

    setDraft(systemSettings(state));
    setBranchData(branchDefaults(state, branch));
    setCompany(companyValue());
    setDevice(readDeviceSettings());
  };

  const save = async () => {

    if (isLocal) {
      try {
        saveDeviceSettings(device);
        toast.success('حُفظت تفضيلات الجهاز');
        setDevice({ ...device });
      } catch {
        toast.error('تعذر حفظ تفضيلات هذا المتصفح');
      }
      return;
    }
    const values =
      tab === 'company'
        ? company
        : tab === 'branches'
          ? branchData
          : draft[
              tab as 'accounting' | 'sales' | 'purchases' | 'inventory' | 'expenses' | 'documents'
            ];
    await systemSettingsMutation.execute({
      section: tab,
      branchId: tab === 'branches' ? branch : undefined,
      values,
    });
  };

  const branchName = state.branches.find((branch) => branch.id === branchId)?.name || '',
    defaultNote = (kind: 'sale' | 'purchase' | 'expense' | 'receipt' | 'payment') => {

      const currency =
          kind === 'expense'
            ? systemSettings(state).expenses.currency
            : state.organization.currency,
        id = operationCashId(state, branchId, kind, currency);
      return (
        cashOptions(state, branchId).find((c) => c.id === id)?.name ||
        'يلزم اختيار صندوق بعملة العملية'
      );
    };

  return {
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
  };
}
