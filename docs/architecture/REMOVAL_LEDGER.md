# سجل الإزالة والنقل

المقارنة مع checkpoint `371f8c0` قبل تغيير المعمارية. يسجل الجدول كل ملف كان tracked ثم أزيل من مساره؛ إزالة المسار تشمل النقل والتقسيم، ولا تعني فقد الوظيفة. الملفات الجديدة كاملة في `CURRENT_SOURCE_TREE.txt` والخريطة لكل شاشة في CSV. لا تُعد سجلات inventory القديمة وصفًا للحالة الحالية.

Rollback: الفرع `checkpoint/feature-resource-baseline`؛ مراحل التنفيذ محفوظة على `architecture/navigation-driven`. لا يُعاد تشغيل مولدات الترحيل على النسخة الجديدة.

## حذف أنظمة البنية القديمة

أزيلت ErpReadModel وFeatureDataScope وuseFeatureResources وmergeResources وuseErpContext وموارد التجميع وReportViewer القديم. البدائل query options/read models مملوكة للشاشات، وReportViewer عام. مرجع الأدلة `REMOVED_LEGACY.json` و`DEAD_FILE_REMOVALS.json` و`TEST_MIGRATION.md`. لا توجد shims تحافظ على الأسماء القديمة في runtime.

## المسارات المتقاعدة

| المسار القديم | المسار الحالي |
|---|---|
| `/users/users` | `/users` |
| `/users/users-add` | `/users/new` |
| `/accounts~journal/new` | `/accounting/journal/new` |
| `/accounting/action/receipt` | `/accounting/vouchers/receipt/new` |
| `/accounting/action/payment` | `/accounting/vouchers/payment/new` |
| `/accounting/action/:actionId` | `/accounting/statement/:partyId` |

أُزيل hash dispatch ولم تُضف redirects توافقية. `/users/:id/edit` deep link لعملية تعديل قائمة بالفعل. نُقل تجميع مجموعات الأطراف تحت customers routes؛ بقي مالك البيانات parties.

## سجل الملفات

| الملف في checkpoint | الوجهة الحالية أو البديل | السبب |
|---|---|---|
| `docs/architecture/verification.md` | Owned screen queries/read-models and canonical pages; see migration matrix | حذف؛ راجع baseline وسجل النقل لتتبع البديل. |
| `src/App.tsx` | `src/app/App.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/core/components/shared/actions/ViewButton.tsx` | `src/shared/ui/actions/ViewButton.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/core/components/shared/dialogs/Modal.tsx` | `src/shared/ui/dialogs/Modal.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/core/components/shared/display/Pill.tsx` | `src/shared/ui/display/Pill.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/core/components/shared/documents/AmountWords.tsx` | `src/shared/ui/documents/AmountWords.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/core/components/shared/documents/DocumentNavigator.tsx` | `src/shared/ui/documents/DocumentNavigator.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/core/components/shared/documents/TotalsFooter.tsx` | `src/shared/ui/documents/TotalsFooter.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/core/components/shared/feedback/Empty.tsx` | `src/shared/ui/feedback/Empty.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/core/components/shared/feedback/LoadingState.tsx` | `src/shared/ui/feedback/LoadingState.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/core/components/shared/filters/SearchBox.tsx` | `src/shared/ui/filters/SearchBox.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/core/components/shared/forms/DynamicField.tsx` | `src/shared/ui/forms/DynamicField.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/core/components/shared/forms/Field.tsx` | `src/shared/ui/forms/Field.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/core/components/shared/forms/FieldNavigation.tsx` | `src/shared/ui/forms/FieldNavigation.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/core/components/shared/forms/Select.tsx` | `src/shared/ui/forms/Select.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/core/components/shared/forms/ValidatedForm.tsx` | `src/shared/ui/forms/ValidatedForm.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/core/components/shared/forms/control-validation.ts` | `src/shared/ui/forms/control-validation.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/core/components/shared/layout/PageHead.tsx` | `src/shared/ui/layout/PageHead.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/core/components/shared/reports/ReportActions.tsx` | `src/shared/ui/reports/ReportActions.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/core/components/shared/tables/DataTable.tsx` | `src/shared/ui/tables/DataTable.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/core/components/ui/button.tsx` | `src/shared/ui/primitives/button.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/core/components/ui/dialog.tsx` | `src/shared/ui/primitives/dialog.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/core/components/ui/input.tsx` | `src/shared/ui/primitives/input.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/core/hooks/useErpContext.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Delete only after consumer parity and no stale references |
| `src/core/hooks/useFeatureResources.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Delete only after consumer parity and no stale references |
| `src/core/layouts/DashboardLayout.tsx` | `src/app/layouts/DashboardLayout.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/core/lib/query-client.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Preserve current implementation; verify direct dependencies and baseline behavior |
| `src/core/providers/AppProviders.tsx` | `src/app/providers/AppProviders.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/core/providers/ApplicationProvider.tsx` | `src/core/state/ApplicationProvider.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/core/providers/CompanyProvider.tsx` | `src/app/providers/CompanyProvider.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/core/providers/FeatureDataScope.tsx` | Owned screen queries/read-models and canonical pages; see migration matrix | Delete only after consumer parity and no stale references |
| `src/core/query/resource-queries.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Preserve current implementation; verify direct dependencies and baseline behavior |
| `src/core/query/resources.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Delete only after consumer parity and no stale references |
| `src/core/router/AppRouter.tsx` | `src/app/router/AppRouter.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/core/router/PageScope.tsx` | `src/app/router/PageScope.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/core/router/ProtectedRoute.tsx` | `src/app/router/ProtectedRoute.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/core/router/Routes.tsx` | Owned screen queries/read-models and canonical pages; see migration matrix | Preserve current implementation; verify direct dependencies and baseline behavior |
| `src/core/services/company-resources.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Preserve current implementation; verify direct dependencies and baseline behavior |
| `src/core/services/http/api-client.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Preserve current implementation; verify direct dependencies and baseline behavior |
| `src/core/services/http/api-error.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Preserve current implementation; verify direct dependencies and baseline behavior |
| `src/core/services/http/command-api.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Preserve current implementation; verify direct dependencies and baseline behavior |
| `src/core/types/CompanyData.ts` | `src/app/types/CompanyData.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/core/types/CompanyMetadata.ts` | `src/app/types/CompanyMetadata.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/core/types/DataResource.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Preserve current implementation; verify direct dependencies and baseline behavior |
| `src/core/types/ErpReadModel.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Delete only after consumer parity and no stale references |
| `src/core/types/FeatureData.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Replace ERP-wide coupling with minimal owned contract, screen query and explicit UI scope |
| `src/core/types/FeatureDataScopeProps.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Delete only after consumer parity and no stale references |
| `src/core/types/PageDefinition.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Preserve current implementation; verify direct dependencies and baseline behavior |
| `src/core/types/ResourceResult.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Replace ERP-wide coupling with minimal owned contract, screen query and explicit UI scope |
| `src/features/accounting/api/read-api.ts` | `src/features/ledger/public/read-api.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/components/MasterDataScreen.tsx` | `src/features/master-data/public/MasterDataScreen.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/hooks/useAccountingData.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Replace ERP-wide coupling with minimal owned contract, screen query and explicit UI scope |
| `src/features/accounting/hooks/useMaster.ts` | `src/features/master-data/public/useMaster.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/hooks/useMasterScreenController.ts` | `src/features/master-data/hooks/useMasterScreenController.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/hooks/useOperation.ts` | `src/features/accounting/public/useOperation.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/hooks/usePeriodActivate.ts` | `src/features/accounting/public/usePeriodActivate.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/hooks/usePeriodCreate.ts` | `src/features/accounting/public/usePeriodCreate.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/hooks/usePeriodReset.ts` | `src/features/accounting/public/usePeriodReset.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/hooks/usePeriodSwitch.ts` | `src/features/accounting/public/usePeriodSwitch.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/hooks/usePeriodTransfer.ts` | `src/features/accounting/public/usePeriodTransfer.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/services/data-resources.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Delete only after consumer parity and no stale references |
| `src/features/accounting/services/models/annual-books.ts` | `src/features/ledger/public/annual-books.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/services/models/cash.ts` | `src/features/ledger/public/cash.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/services/models/extensions.ts` | `src/features/ledger/public/extensions.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/services/models/fiscal-range.ts` | `src/features/ledger/public/fiscal-range.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/services/models/numbering.ts` | `src/features/accounting/public/numbering.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/MasterScreenProps.ts` | `src/features/master-data/types/MasterScreenProps.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/models/AnnualBook.ts` | `src/features/ledger/types/models/AnnualBook.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/models/AnnualBooks.ts` | `src/features/ledger/public/types/models/AnnualBooks.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/models/AssetForm.ts` | `src/features/ledger/public/types/models/AssetForm.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/models/BookState.ts` | `src/features/ledger/types/models/BookState.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/models/DocumentKind.ts` | `src/features/ledger/public/types/models/DocumentKind.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/models/Entry.ts` | `src/features/ledger/public/types/models/Entry.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/models/ExtensionData.ts` | `src/features/ledger/public/types/models/ExtensionData.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/models/JournalLine.ts` | `src/features/ledger/types/models/JournalLine.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/models/MasterRecord.ts` | `src/features/ledger/public/types/models/MasterRecord.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/models/OperationRecord.ts` | `src/features/ledger/public/types/models/OperationRecord.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/models/VoucherDocument.ts` | `src/features/ledger/public/types/models/VoucherDocument.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/models/VoucherLine.ts` | `src/features/ledger/types/models/VoucherLine.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/requests/GetAccountingAccountsByCodeRequest.ts` | `src/features/ledger/types/requests/GetAccountingAccountsByCodeRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/requests/GetAccountingAssetAcquisitionsByIdRequest.ts` | `src/features/ledger/types/requests/GetAccountingAssetAcquisitionsByIdRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/requests/GetAccountingAssetsByIdRequest.ts` | `src/features/ledger/types/requests/GetAccountingAssetsByIdRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/requests/GetAccountingCashAccountsByIdRequest.ts` | `src/features/ledger/types/requests/GetAccountingCashAccountsByIdRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/requests/GetAccountingContactsByIdRequest.ts` | `src/features/ledger/types/requests/GetAccountingContactsByIdRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/requests/GetAccountingCurrenciesByCodeRequest.ts` | `src/features/ledger/types/requests/GetAccountingCurrenciesByCodeRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/requests/GetAccountingDepreciationByIdRequest.ts` | `src/features/ledger/types/requests/GetAccountingDepreciationByIdRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/requests/GetAccountingFinancialBooksByIdReadinessRequest.ts` | `src/features/ledger/types/requests/GetAccountingFinancialBooksByIdReadinessRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/requests/GetAccountingFinancialBooksByIdRequest.ts` | `src/features/ledger/types/requests/GetAccountingFinancialBooksByIdRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/requests/GetAccountingJournalsByIdRequest.ts` | `src/features/ledger/types/requests/GetAccountingJournalsByIdRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/requests/GetAccountingVouchersByIdRequest.ts` | `src/features/ledger/types/requests/GetAccountingVouchersByIdRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/requests/SaveContactEntryRequest.ts` | `src/features/ledger/public/types/requests/SaveContactEntryRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/requests/SaveContactVoucherRequest.ts` | `src/features/ledger/public/types/requests/SaveContactVoucherRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/requests/SaveManualJournalRequest.ts` | `src/features/ledger/public/types/requests/SaveManualJournalRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/requests/SaveMasterRequest.ts` | `src/features/ledger/public/types/requests/SaveMasterRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/requests/SaveOperationRequest.ts` | `src/features/ledger/public/types/requests/SaveOperationRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/requests/SavePeriodActivateRequest.ts` | `src/features/ledger/public/types/requests/SavePeriodActivateRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/requests/SavePeriodCreateRequest.ts` | `src/features/ledger/public/types/requests/SavePeriodCreateRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/requests/SavePeriodResetRequest.ts` | `src/features/ledger/public/types/requests/SavePeriodResetRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/requests/SavePeriodSwitchRequest.ts` | `src/features/ledger/public/types/requests/SavePeriodSwitchRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/requests/SavePeriodTransferRequest.ts` | `src/features/ledger/public/types/requests/SavePeriodTransferRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/requests/SavePermissionsRequest.ts` | `src/features/ledger/public/types/requests/SavePermissionsRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/requests/SaveScreenDraftRequest.ts` | `src/features/ledger/public/types/requests/SaveScreenDraftRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/requests/SaveVoucherRequest.ts` | `src/features/ledger/public/types/requests/SaveVoucherRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/requests/SearchAccountingAccountsRequest.ts` | `src/features/ledger/types/requests/SearchAccountingAccountsRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/requests/SearchAccountingAssetAcquisitionsRequest.ts` | `src/features/ledger/types/requests/SearchAccountingAssetAcquisitionsRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/requests/SearchAccountingAssetsRequest.ts` | `src/features/ledger/types/requests/SearchAccountingAssetsRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/requests/SearchAccountingCashAccountsRequest.ts` | `src/features/ledger/types/requests/SearchAccountingCashAccountsRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/requests/SearchAccountingContactsRequest.ts` | `src/features/ledger/types/requests/SearchAccountingContactsRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/requests/SearchAccountingCurrenciesRequest.ts` | `src/features/ledger/types/requests/SearchAccountingCurrenciesRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/requests/SearchAccountingDepreciationRequest.ts` | `src/features/ledger/types/requests/SearchAccountingDepreciationRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/requests/SearchAccountingExchangeRatesRequest.ts` | `src/features/ledger/types/requests/SearchAccountingExchangeRatesRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/requests/SearchAccountingFinancialBooksByIdClosingAccountsRequest.ts` | `src/features/ledger/types/requests/SearchAccountingFinancialBooksByIdClosingAccountsRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/requests/SearchAccountingFinancialBooksByIdClosingStockRequest.ts` | `src/features/ledger/public/types/requests/SearchAccountingFinancialBooksByIdClosingStockRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/requests/SearchAccountingFinancialBooksRequest.ts` | `src/features/ledger/types/requests/SearchAccountingFinancialBooksRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/requests/SearchAccountingJournalsRequest.ts` | `src/features/ledger/types/requests/SearchAccountingJournalsRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/requests/SearchAccountingVouchersRequest.ts` | `src/features/ledger/types/requests/SearchAccountingVouchersRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/responses/AccountListResponse.ts` | `src/features/ledger/types/responses/AccountListResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/responses/AccountResponse.ts` | `src/features/ledger/types/responses/AccountResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/responses/AssetListResponse.ts` | `src/features/ledger/types/responses/AssetListResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/responses/AssetResponse.ts` | `src/features/ledger/types/responses/AssetResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/responses/BookReadinessResponse.ts` | `src/features/ledger/types/responses/BookReadinessResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/responses/CashAccountListResponse.ts` | `src/features/ledger/types/responses/CashAccountListResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/responses/CashAccountResponse.ts` | `src/features/ledger/types/responses/CashAccountResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/responses/ContactListResponse.ts` | `src/features/ledger/types/responses/ContactListResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/responses/ContactResponse.ts` | `src/features/ledger/types/responses/ContactResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/responses/CurrencyListResponse.ts` | `src/features/ledger/types/responses/CurrencyListResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/responses/CurrencyResponse.ts` | `src/features/ledger/types/responses/CurrencyResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/responses/FinancialBookListResponse.ts` | `src/features/ledger/types/responses/FinancialBookListResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/responses/FinancialBookResponse.ts` | `src/features/ledger/types/responses/FinancialBookResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/responses/FxRateListResponse.ts` | `src/features/ledger/types/responses/FxRateListResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/responses/FxRateResponse.ts` | `src/features/ledger/types/responses/FxRateResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/responses/JournalEntryListResponse.ts` | `src/features/ledger/types/responses/JournalEntryListResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/responses/JournalEntryResponse.ts` | `src/features/ledger/types/responses/JournalEntryResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/responses/VoucherListResponse.ts` | `src/features/ledger/types/responses/VoucherListResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/types/responses/VoucherResponse.ts` | `src/features/ledger/types/responses/VoucherResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/utils/account-balances.ts` | `src/features/ledger/public/account-balances.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/validation/accounting-schema.ts` | `src/features/ledger/public/accounting-schema.ts`؛ `src/features/master-data/public/master-schema.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/accounting/validation/validate-period.ts` | `src/features/ledger/public/validate-period.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/auth/api/auth-client.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Preserve current implementation; verify direct dependencies and baseline behavior |
| `src/features/auth/components/AccountPanel.tsx` | `src/features/auth/public/AccountPanel.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/auth/hooks/useAuthAction.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Preserve current implementation; verify direct dependencies and baseline behavior |
| `src/features/auth/types/models/AuthUser.ts` | `src/features/auth/types/responses/AuthUser.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/auth/types/requests/SaveAuthActionRequest.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | No production bootstrap, declared API/schema surface, direct test import or independent computation/report fixture depends on it |
| `src/features/auth/types/responses/AuthActionResponse.ts` | `src/features/auth/public/types/responses/AuthActionResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/customers/api/read-api.ts` | `src/features/parties/api/customers-read-api.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/customers/components/CustomerDirectory.tsx` | Owned screen queries/read-models and canonical pages; see migration matrix | Preserve current implementation; verify direct dependencies and baseline behavior |
| `src/features/customers/hooks/useCustomersData.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Replace ERP-wide coupling with minimal owned contract, screen query and explicit UI scope |
| `src/features/customers/services/data-resources.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Delete only after consumer parity and no stale references |
| `src/features/customers/types/requests/GetCustomersByIdRequest.ts` | `src/features/parties/public/types/requests/GetCustomersByIdRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/customers/types/requests/SearchCustomersRequest.ts` | `src/features/parties/public/types/requests/SearchCustomersRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/employees/api/read-api.ts` | `src/features/personnel/public/read-api.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/employees/hooks/useEmployeesData.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Replace ERP-wide coupling with minimal owned contract, screen query and explicit UI scope |
| `src/features/employees/services/data-resources.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Delete only after consumer parity and no stale references |
| `src/features/employees/types/models/Employee.ts` | `src/features/personnel/public/types/models/Employee.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/employees/types/requests/GetEmployeesAdvancesByIdRequest.ts` | `src/features/personnel/types/requests/GetEmployeesAdvancesByIdRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/employees/types/requests/GetEmployeesByIdRequest.ts` | `src/features/personnel/types/requests/GetEmployeesByIdRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/employees/types/requests/GetEmployeesPayrollAccrualsByIdRequest.ts` | `src/features/personnel/types/requests/GetEmployeesPayrollAccrualsByIdRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/employees/types/requests/GetEmployeesSalaryPaymentsByIdRequest.ts` | `src/features/personnel/types/requests/GetEmployeesSalaryPaymentsByIdRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/employees/types/requests/SaveEmployeeDeleteRequest.ts` | `src/features/personnel/public/types/requests/SaveEmployeeDeleteRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/employees/types/requests/SaveEmployeeRequest.ts` | `src/features/personnel/public/types/requests/SaveEmployeeRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/employees/types/requests/SearchEmployeesAdvancesRequest.ts` | `src/features/personnel/types/requests/SearchEmployeesAdvancesRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/employees/types/requests/SearchEmployeesPayrollAccrualsRequest.ts` | `src/features/personnel/types/requests/SearchEmployeesPayrollAccrualsRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/employees/types/requests/SearchEmployeesRequest.ts` | `src/features/personnel/types/requests/SearchEmployeesRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/employees/types/requests/SearchEmployeesSalaryPaymentsRequest.ts` | `src/features/personnel/types/requests/SearchEmployeesSalaryPaymentsRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/employees/types/responses/EmployeeListResponse.ts` | `src/features/personnel/types/responses/EmployeeListResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/employees/types/responses/EmployeeResponse.ts` | `src/features/personnel/types/responses/EmployeeResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/employees/types/responses/OperationListResponse.ts` | `src/features/ledger/public/types/responses/OperationListResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/employees/types/responses/OperationResponse.ts` | `src/features/ledger/public/types/responses/OperationResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/expenses/api/read-api.ts` | `src/features/ledger/public/expense-read-api.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/expenses/hooks/useExpensesData.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Replace ERP-wide coupling with minimal owned contract, screen query and explicit UI scope |
| `src/features/expenses/mapper/expense-read-model.ts` | `src/features/ledger/public/expense-read-model.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/expenses/services/data-resources.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Delete only after consumer parity and no stale references |
| `src/features/expenses/types/models/Expense.ts` | `src/features/ledger/public/types/models/Expense.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/expenses/types/models/ExpenseDocument.ts` | `src/features/ledger/public/types/models/ExpenseDocument.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/expenses/types/models/ExpenseTreatment.ts` | `src/features/ledger/public/types/models/ExpenseTreatment.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/expenses/types/requests/GetExpensesDocumentsByIdRequest.ts` | `src/features/ledger/public/types/requests/GetExpensesDocumentsByIdRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/expenses/types/requests/GetExpensesTypesByIdRequest.ts` | `src/features/ledger/public/types/requests/GetExpensesTypesByIdRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/expenses/types/requests/SearchExpensesDocumentsByIdConsumptionsRequest.ts` | `src/features/ledger/public/types/requests/SearchExpensesDocumentsByIdConsumptionsRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/expenses/types/requests/SearchExpensesDocumentsByIdPaymentsRequest.ts` | `src/features/ledger/public/types/requests/SearchExpensesDocumentsByIdPaymentsRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/expenses/types/requests/SearchExpensesDocumentsRequest.ts` | `src/features/ledger/public/types/requests/SearchExpensesDocumentsRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/expenses/types/requests/SearchExpensesTypesRequest.ts` | `src/features/ledger/public/types/requests/SearchExpensesTypesRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/expenses/types/responses/ExpenseConsumptionsListResponse.ts` | `src/features/ledger/public/types/responses/ExpenseConsumptionsListResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/expenses/types/responses/ExpenseConsumptionsResponse.ts` | `src/features/ledger/public/types/responses/ExpenseConsumptionsResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/expenses/types/responses/ExpenseDocumentListResponse.ts` | `src/features/ledger/public/types/responses/ExpenseDocumentListResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/expenses/types/responses/ExpenseDocumentResponse.ts` | `src/features/ledger/public/types/responses/ExpenseDocumentResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/expenses/types/responses/ExpensePaymentsListResponse.ts` | `src/features/ledger/public/types/responses/ExpensePaymentsListResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/expenses/types/responses/ExpensePaymentsResponse.ts` | `src/features/ledger/public/types/responses/ExpensePaymentsResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/expenses/types/responses/ExpenseTypeListResponse.ts` | `src/features/ledger/public/types/responses/ExpenseTypeListResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/expenses/types/responses/ExpenseTypeResponse.ts` | `src/features/ledger/public/types/responses/ExpenseTypeResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/financial/hooks/useFinancialData.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Replace ERP-wide coupling with minimal owned contract, screen query and explicit UI scope |
| `src/features/inventory/api/inventory-api.ts` | `src/features/stock/api/inventory-api.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/api/read-api.ts` | `src/features/stock/public/read-api.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/components/Catalog.tsx` | `src/features/inventory/public/Catalog.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/hooks/useInventoryData.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Replace ERP-wide coupling with minimal owned contract, screen query and explicit UI scope |
| `src/features/inventory/hooks/usePriceList.ts` | `src/features/inventory/public/usePriceList.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/hooks/useStockDocument.ts` | `src/features/stock/public/useStockDocument.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/mapper/inventory-mapper.ts` | `src/features/stock/mapper/inventory-mapper.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/services/data-resources.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Delete only after consumer parity and no stale references |
| `src/features/inventory/services/inventory-service.ts` | `src/features/stock/public/inventory-service.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/services/models/price-list.ts` | `src/features/inventory/public/price-list.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/models/CostFilters.ts` | `src/features/stock/public/types/models/CostFilters.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/models/Movement.ts` | `src/features/stock/public/types/models/Movement.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/models/OpeningAccountLine.ts` | `src/features/stock/public/types/models/OpeningAccountLine.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/models/PriceFilters.ts` | `src/features/stock/public/types/models/PriceFilters.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/models/Product.ts` | `src/features/stock/public/types/models/Product.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/models/Stock.ts` | `src/features/stock/public/types/models/Stock.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/models/StockDocument.ts` | `src/features/stock/public/types/models/StockDocument.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/models/StockDocumentLine.ts` | `src/features/stock/public/types/models/StockDocumentLine.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/models/Unit.ts` | `src/features/stock/public/types/models/Unit.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/models/Warehouse.ts` | `src/features/stock/public/types/models/Warehouse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/requests/DeleteStockDraftRequest.ts` | `src/features/stock/types/requests/DeleteStockDraftRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/requests/GetInventoryItemGroupsByIdRequest.ts` | `src/features/stock/types/requests/GetInventoryItemGroupsByIdRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/requests/GetInventoryItemsByIdRequest.ts` | `src/features/stock/types/requests/GetInventoryItemsByIdRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/requests/GetInventoryItemsByIdUnitsRequest.ts` | `src/features/stock/types/requests/GetInventoryItemsByIdUnitsRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/requests/GetInventoryStockCountsByIdRequest.ts` | `src/features/stock/types/requests/GetInventoryStockCountsByIdRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/requests/GetInventoryStockDocumentsByIdRequest.ts` | `src/features/stock/types/requests/GetInventoryStockDocumentsByIdRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/requests/GetInventoryUnitCategoriesByIdRequest.ts` | `src/features/stock/types/requests/GetInventoryUnitCategoriesByIdRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/requests/GetInventoryUnitsByIdRequest.ts` | `src/features/stock/types/requests/GetInventoryUnitsByIdRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/requests/GetInventoryWarehousesByIdRequest.ts` | `src/features/stock/types/requests/GetInventoryWarehousesByIdRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/requests/SavePriceListRequest.ts` | `src/features/stock/types/requests/SavePriceListRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/requests/SaveProductRequest.ts` | `src/features/stock/types/requests/SaveProductRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/requests/SaveStockDocumentRequest.ts` | `src/features/stock/types/requests/SaveStockDocumentRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/requests/SaveTransferRequest.ts` | `src/features/stock/types/requests/SaveTransferRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/requests/SaveWarehouseRequest.ts` | `src/features/stock/types/requests/SaveWarehouseRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/requests/SearchInventoryBalancesRequest.ts` | `src/features/stock/types/requests/SearchInventoryBalancesRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/requests/SearchInventoryItemGroupsRequest.ts` | `src/features/stock/types/requests/SearchInventoryItemGroupsRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/requests/SearchInventoryItemsRequest.ts` | `src/features/stock/types/requests/SearchInventoryItemsRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/requests/SearchInventoryMovementsRequest.ts` | `src/features/stock/types/requests/SearchInventoryMovementsRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/requests/SearchInventoryStockCountsRequest.ts` | `src/features/stock/types/requests/SearchInventoryStockCountsRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/requests/SearchInventoryStockDocumentsRequest.ts` | `src/features/stock/types/requests/SearchInventoryStockDocumentsRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/requests/SearchInventoryUnitCategoriesRequest.ts` | `src/features/stock/types/requests/SearchInventoryUnitCategoriesRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/requests/SearchInventoryUnitsRequest.ts` | `src/features/stock/types/requests/SearchInventoryUnitsRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/requests/SearchInventoryWarehousesRequest.ts` | `src/features/stock/types/requests/SearchInventoryWarehousesRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/requests/SearchSearchItemsRequest.ts` | `src/features/stock/types/requests/SearchSearchItemsRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/responses/InventoryMovementListResponse.ts` | `src/features/stock/types/responses/InventoryMovementListResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/responses/InventoryMovementResponse.ts` | `src/features/stock/types/responses/InventoryMovementResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/responses/ItemGroupListResponse.ts` | `src/features/stock/types/responses/ItemGroupListResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/responses/ItemGroupResponse.ts` | `src/features/stock/types/responses/ItemGroupResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/responses/ItemListResponse.ts` | `src/features/stock/types/responses/ItemListResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/responses/ItemResponse.ts` | `src/features/stock/types/responses/ItemResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/responses/SearchHitListResponse.ts` | `src/features/stock/types/responses/SearchHitListResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/responses/SearchHitResponse.ts` | `src/features/stock/types/responses/SearchHitResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/responses/StockBalanceListResponse.ts` | `src/features/stock/types/responses/StockBalanceListResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/responses/StockBalanceResponse.ts` | `src/features/stock/types/responses/StockBalanceResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/responses/StockDocumentListResponse.ts` | `src/features/stock/types/responses/StockDocumentListResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/responses/StockDocumentResponse.ts` | `src/features/stock/types/responses/StockDocumentResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/responses/UnitCategoryListResponse.ts` | `src/features/stock/types/responses/UnitCategoryListResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/responses/UnitCategoryResponse.ts` | `src/features/stock/types/responses/UnitCategoryResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/responses/UnitListResponse.ts` | `src/features/stock/types/responses/UnitListResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/responses/UnitResponse.ts` | `src/features/stock/types/responses/UnitResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/responses/WarehouseListResponse.ts` | `src/features/stock/types/responses/WarehouseListResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/types/responses/WarehouseResponse.ts` | `src/features/stock/types/responses/WarehouseResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/validation/inventory-schema.ts` | `src/features/stock/public/inventory-schema.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/inventory/validation/validate-inventory-command.ts` | `src/features/stock/public/validate-inventory-command.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/parties/api/groups-api.ts` | `src/features/parties/public/groups-api.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/parties/hooks/usePartiesData.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Replace ERP-wide coupling with minimal owned contract, screen query and explicit UI scope |
| `src/features/parties/hooks/usePartyForm.ts` | `src/features/parties/public/usePartyForm.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/parties/pages/PartyGroupListPage.tsx` | `src/features/customers/pages/PartyGroupListPage.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/parties/services/data-resources.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Delete only after consumer parity and no stale references |
| `src/features/parties/types/models/Party.ts` | `src/features/parties/public/types/models/Party.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/parties/types/requests/SavePartyRequest.ts` | `src/features/parties/public/types/requests/SavePartyRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/parties/types/responses/PartyListResponse.ts` | `src/features/parties/public/types/responses/PartyListResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/parties/types/responses/PartyResponse.ts` | `src/features/parties/public/types/responses/PartyResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/parties/validation/parties-schema.ts` | `src/features/parties/public/parties-schema.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/parties/validation/validate-party.ts` | `src/features/parties/public/validate-party.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/purchases/api/read-api.ts` | `src/features/trade/api/purchases-read-api.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/purchases/components/PurchaseInvoices.tsx` | `src/features/purchases/public/PurchaseInvoices.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/purchases/hooks/usePurchasesData.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Replace ERP-wide coupling with minimal owned contract, screen query and explicit UI scope |
| `src/features/purchases/services/data-resources.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Delete only after consumer parity and no stale references |
| `src/features/purchases/types/requests/GetPurchasesInvoicesByIdRequest.ts` | `src/features/trade/public/types/requests/GetPurchasesInvoicesByIdRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/purchases/types/requests/GetPurchasesInvoicesByIdReturnAvailabilityRequest.ts` | `src/features/trade/public/types/requests/GetPurchasesInvoicesByIdReturnAvailabilityRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/purchases/types/requests/GetPurchasesReturnsByIdRequest.ts` | `src/features/trade/public/types/requests/GetPurchasesReturnsByIdRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/purchases/types/requests/SearchPurchasesInvoicesRequest.ts` | `src/features/trade/public/types/requests/SearchPurchasesInvoicesRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/purchases/types/requests/SearchPurchasesReturnsRequest.ts` | `src/features/trade/public/types/requests/SearchPurchasesReturnsRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/api/read-api.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Preserve current implementation; verify direct dependencies and baseline behavior |
| `src/features/reports/components/ReportViewer.tsx` | `src/shared/ui/reports/ReportViewer.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/hooks/useReportViewerController.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Replace ERP-wide coupling with minimal owned contract, screen query and explicit UI scope |
| `src/features/reports/services/models/report-documents.ts` | `src/features/accounting/services/reports/build-voucher-document.ts`؛ `src/features/stock/public/build-stock-document.ts`؛ `src/features/trade/public/build-invoice-document.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/ReportViewerProps.ts` | `src/shared/types/reporting/ReportViewerProps.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/requests/SearchReportsAccountingAccountStatementRequest.ts` | `src/features/ledger/public/types/requests/SearchReportsAccountingAccountStatementRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/requests/SearchReportsAccountingAssetsRequest.ts` | `src/features/ledger/public/types/requests/SearchReportsAccountingAssetsRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/requests/SearchReportsAccountingCashMovementsRequest.ts` | `src/features/ledger/public/types/requests/SearchReportsAccountingCashMovementsRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/requests/SearchReportsAccountingContactLedgerRequest.ts` | `src/features/ledger/public/types/requests/SearchReportsAccountingContactLedgerRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/requests/SearchReportsAccountingForeignCurrencyRequest.ts` | `src/features/ledger/public/types/requests/SearchReportsAccountingForeignCurrencyRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/requests/SearchReportsAccountingOpeningBalancesRequest.ts` | `src/features/ledger/public/types/requests/SearchReportsAccountingOpeningBalancesRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/requests/SearchReportsAccountingTaxRequest.ts` | `src/features/ledger/public/types/requests/SearchReportsAccountingTaxRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/requests/SearchReportsAccountingTrialBalanceRequest.ts` | `src/features/ledger/public/types/requests/SearchReportsAccountingTrialBalanceRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/requests/SearchReportsCustomersBalancesRequest.ts` | `src/features/customers/types/requests/SearchReportsCustomersBalancesRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/requests/SearchReportsEmployeesAdvancesRequest.ts` | `src/features/personnel/public/types/requests/SearchReportsEmployeesAdvancesRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/requests/SearchReportsEmployeesPayrollRequest.ts` | `src/features/personnel/public/types/requests/SearchReportsEmployeesPayrollRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/requests/SearchReportsExpensesRecognizedRequest.ts` | `src/features/expenses/types/requests/SearchReportsExpensesRecognizedRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/requests/SearchReportsInventoryAdjustmentsRequest.ts` | `src/features/stock/public/types/requests/SearchReportsInventoryAdjustmentsRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/requests/SearchReportsInventoryHistoricalCostRequest.ts` | `src/features/stock/public/types/requests/SearchReportsInventoryHistoricalCostRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/requests/SearchReportsInventoryOpeningStockRequest.ts` | `src/features/stock/public/types/requests/SearchReportsInventoryOpeningStockRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/requests/SearchReportsInventoryPricesRequest.ts` | `src/features/stock/public/types/requests/SearchReportsInventoryPricesRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/requests/SearchReportsInventoryReorderRequest.ts` | `src/features/stock/public/types/requests/SearchReportsInventoryReorderRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/requests/SearchReportsInventoryStagnantRequest.ts` | `src/features/stock/public/types/requests/SearchReportsInventoryStagnantRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/requests/SearchReportsInventoryTransfersRequest.ts` | `src/features/stock/public/types/requests/SearchReportsInventoryTransfersRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/requests/SearchReportsInventoryValuationRequest.ts` | `src/features/stock/public/types/requests/SearchReportsInventoryValuationRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/requests/SearchReportsPurchasesReturnsRequest.ts` | `src/features/purchases/types/requests/SearchReportsPurchasesReturnsRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/requests/SearchReportsPurchasesSummaryRequest.ts` | `src/features/purchases/types/requests/SearchReportsPurchasesSummaryRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/requests/SearchReportsSalesChartRequest.ts` | `src/features/sales/types/requests/SearchReportsSalesChartRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/requests/SearchReportsSalesReturnsRequest.ts` | `src/features/sales/types/requests/SearchReportsSalesReturnsRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/requests/SearchReportsSalesSummaryRequest.ts` | `src/features/sales/types/requests/SearchReportsSalesSummaryRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/requests/SearchReportsSalesTargetAchievementRequest.ts` | `src/features/sales/types/requests/SearchReportsSalesTargetAchievementRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/requests/SearchReportsSuppliersBalancesRequest.ts` | `src/features/suppliers/types/requests/SearchReportsSuppliersBalancesRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/AccountStatementResponse.ts` | `src/features/ledger/public/types/responses/AccountStatementResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/AdjustmentsReport.ts` | `src/features/stock/public/types/responses/AdjustmentsReport.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/AdjustmentsReportRow.ts` | `src/features/stock/types/responses/AdjustmentsReportRow.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/AdvancesReport.ts` | `src/features/personnel/public/types/responses/AdvancesReport.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/AdvancesReportRow.ts` | `src/features/personnel/types/responses/AdvancesReportRow.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/AssetsReport.ts` | `src/features/ledger/public/types/responses/AssetsReport.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/AssetsReportRow.ts` | `src/features/ledger/types/responses/AssetsReportRow.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/CashMovementsReport.ts` | `src/features/ledger/public/types/responses/CashMovementsReport.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/CashMovementsReportRow.ts` | `src/features/ledger/types/responses/CashMovementsReportRow.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/CustomerBalancesReport.ts` | `src/features/customers/types/responses/CustomerBalancesReport.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/CustomerBalancesReportRow.ts` | `src/features/customers/types/responses/CustomerBalancesReportRow.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/ForeignCurrencyReport.ts` | `src/features/ledger/public/types/responses/ForeignCurrencyReport.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/ForeignCurrencyReportRow.ts` | `src/features/ledger/types/responses/ForeignCurrencyReportRow.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/HistoricalCostReport.ts` | `src/features/stock/public/types/responses/HistoricalCostReport.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/HistoricalCostReportRow.ts` | `src/features/stock/types/responses/HistoricalCostReportRow.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/InventoryValuationReport.ts` | `src/features/stock/public/types/responses/InventoryValuationReport.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/InventoryValuationReportRow.ts` | `src/features/stock/types/responses/InventoryValuationReportRow.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/OpeningBalancesReport.ts` | `src/features/ledger/public/types/responses/OpeningBalancesReport.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/OpeningBalancesReportRow.ts` | `src/features/ledger/types/responses/OpeningBalancesReportRow.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/OpeningStockReport.ts` | `src/features/stock/public/types/responses/OpeningStockReport.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/OpeningStockReportRow.ts` | `src/features/stock/types/responses/OpeningStockReportRow.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/PayrollReport.ts` | `src/features/personnel/public/types/responses/PayrollReport.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/PayrollReportRow.ts` | `src/features/personnel/types/responses/PayrollReportRow.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/PricesReport.ts` | `src/features/stock/public/types/responses/PricesReport.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/PricesReportRow.ts` | `src/features/stock/types/responses/PricesReportRow.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/PurchaseReturnsReport.ts` | `src/features/purchases/types/responses/PurchaseReturnsReport.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/PurchaseReturnsReportRow.ts` | `src/features/purchases/types/responses/PurchaseReturnsReportRow.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/PurchasesSummaryReport.ts` | `src/features/purchases/types/responses/PurchasesSummaryReport.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/PurchasesSummaryReportRow.ts` | `src/features/purchases/types/responses/PurchasesSummaryReportRow.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/RecognizedExpensesReport.ts` | `src/features/expenses/types/responses/RecognizedExpensesReport.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/RecognizedExpensesReportRow.ts` | `src/features/expenses/types/responses/RecognizedExpensesReportRow.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/ReorderReport.ts` | `src/features/stock/public/types/responses/ReorderReport.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/ReorderReportRow.ts` | `src/features/stock/types/responses/ReorderReportRow.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/SalesChartReport.ts` | `src/features/sales/types/responses/SalesChartReport.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/SalesChartReportRow.ts` | `src/features/sales/types/responses/SalesChartReportRow.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/SalesReturnsReport.ts` | `src/features/sales/types/responses/SalesReturnsReport.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/SalesReturnsReportRow.ts` | `src/features/sales/types/responses/SalesReturnsReportRow.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/SalesSummaryReport.ts` | `src/features/sales/types/responses/SalesSummaryReport.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/SalesSummaryReportRow.ts` | `src/features/sales/types/responses/SalesSummaryReportRow.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/StagnantReport.ts` | `src/features/stock/public/types/responses/StagnantReport.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/StagnantReportRow.ts` | `src/features/stock/types/responses/StagnantReportRow.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/StatementRow.ts` | `src/features/ledger/types/responses/StatementRow.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/SupplierBalancesReport.ts` | `src/features/suppliers/types/responses/SupplierBalancesReport.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/SupplierBalancesReportRow.ts` | `src/features/suppliers/types/responses/SupplierBalancesReportRow.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/TargetAchievementReport.ts` | `src/features/sales/types/responses/TargetAchievementReport.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/TargetAchievementReportRow.ts` | `src/features/sales/types/responses/TargetAchievementReportRow.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/TaxReport.ts` | `src/features/ledger/public/types/responses/TaxReport.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/TaxReportRow.ts` | `src/features/ledger/types/responses/TaxReportRow.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/TransfersReport.ts` | `src/features/stock/public/types/responses/TransfersReport.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/TransfersReportRow.ts` | `src/features/stock/types/responses/TransfersReportRow.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/TrialBalanceReport.ts` | `src/features/ledger/public/types/responses/TrialBalanceReport.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/reports/types/responses/TrialBalanceReportRow.ts` | `src/features/ledger/types/responses/TrialBalanceReportRow.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/sales/api/read-api.ts` | `src/features/trade/public/sales-read-api.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/sales/components/SalesInvoices.tsx` | `src/features/sales/public/SalesInvoices.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/sales/hooks/useSalesData.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Replace ERP-wide coupling with minimal owned contract, screen query and explicit UI scope |
| `src/features/sales/services/data-resources.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Delete only after consumer parity and no stale references |
| `src/features/sales/types/requests/GetSalesInvoicesByIdRequest.ts` | `src/features/trade/public/types/requests/GetSalesInvoicesByIdRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/sales/types/requests/GetSalesInvoicesByIdReturnAvailabilityRequest.ts` | `src/features/trade/public/types/requests/GetSalesInvoicesByIdReturnAvailabilityRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/sales/types/requests/GetSalesReturnsByIdRequest.ts` | `src/features/trade/public/types/requests/GetSalesReturnsByIdRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/sales/types/requests/GetSalesTargetsByIdRequest.ts` | `src/features/trade/public/types/requests/GetSalesTargetsByIdRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/sales/types/requests/SearchSalesInvoicesRequest.ts` | `src/features/trade/public/types/requests/SearchSalesInvoicesRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/sales/types/requests/SearchSalesReturnsRequest.ts` | `src/features/trade/public/types/requests/SearchSalesReturnsRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/sales/types/requests/SearchSalesTargetsRequest.ts` | `src/features/trade/public/types/requests/SearchSalesTargetsRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/sales/types/responses/InvoiceListResponse.ts` | `src/features/trade/public/types/responses/InvoiceListResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/sales/types/responses/InvoiceResponse.ts` | `src/features/trade/public/types/responses/InvoiceResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/sales/types/responses/InvoiceReturnListResponse.ts` | `src/features/trade/public/types/responses/InvoiceReturnListResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/sales/types/responses/InvoiceReturnResponse.ts` | `src/features/trade/public/types/responses/InvoiceReturnResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/sales/types/responses/ReturnAvailabilityResponse.ts` | `src/features/trade/public/types/responses/ReturnAvailabilityResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/sales/types/responses/SalesTargetListResponse.ts` | `src/features/trade/public/types/responses/SalesTargetListResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/sales/types/responses/SalesTargetResponse.ts` | `src/features/trade/public/types/responses/SalesTargetResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/api/backups.ts` | `src/features/organization/public/backups.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/api/read-api.ts` | `src/features/organization/public/read-api.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/components/AnnualSettings.tsx` | `src/features/accounting/public/AnnualSettings.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/components/LookupField.tsx` | `src/features/master-data/public/LookupField.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/hooks/useCurrency.ts` | `src/features/accounting/public/useCurrency.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/hooks/useSettingsData.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Replace ERP-wide coupling with minimal owned contract, screen query and explicit UI scope |
| `src/features/settings/services/backup-files.ts` | `src/features/organization/public/backup-files.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/services/data-resources.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Delete only after consumer parity and no stale references |
| `src/features/settings/services/models/backup-policy.ts` | `src/features/organization/public/backup-policy.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/services/models/completion.ts` | `src/features/organization/public/completion.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/services/models/system-settings.ts` | `src/features/organization/public/system-settings.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/AnnualSettingsProps.ts` | `src/features/accounting/types/AnnualSettingsProps.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/DynamicFieldProps.ts` | `src/features/master-data/types/DynamicFieldProps.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/models/BackupFolder.ts` | `src/features/organization/types/models/BackupFolder.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/models/BackupPolicy.ts` | `src/features/organization/public/types/models/BackupPolicy.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/models/BackupRow.ts` | `src/features/organization/types/models/BackupRow.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/models/Branch.ts` | `src/features/organization/public/types/models/Branch.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/models/BranchDefaults.ts` | `src/features/organization/types/models/BranchDefaults.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/models/EmployeeFile.ts` | `src/features/organization/public/types/models/EmployeeFile.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/models/GeneralSettings.ts` | `src/features/organization/types/models/GeneralSettings.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/models/Row.ts` | `src/features/organization/public/types/models/Row.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/models/SystemSettings.ts` | `src/features/organization/types/models/SystemSettings.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/models/Tab.ts` | `src/features/organization/public/types/models/Tab.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/requests/GetBranchesByIdRequest.ts` | `src/features/organization/types/requests/GetBranchesByIdRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/requests/GetSettingsBackupPolicyRequest.ts` | `src/features/organization/types/requests/GetSettingsBackupPolicyRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/requests/GetSettingsBrandingRequest.ts` | `src/features/organization/types/requests/GetSettingsBrandingRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/requests/GetSettingsCompanyRequest.ts` | `src/features/organization/types/requests/GetSettingsCompanyRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/requests/GetSettingsImportTemplatesByKindRequest.ts` | `src/features/organization/types/requests/GetSettingsImportTemplatesByKindRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/requests/GetSettingsServiceStatusRequest.ts` | `src/features/organization/types/requests/GetSettingsServiceStatusRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/requests/GetSettingsSystemAccountingRequest.ts` | `src/features/organization/types/requests/GetSettingsSystemAccountingRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/requests/GetSettingsSystemBranchesRequest.ts` | `src/features/organization/types/requests/GetSettingsSystemBranchesRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/requests/GetSettingsSystemCompanyRequest.ts` | `src/features/organization/types/requests/GetSettingsSystemCompanyRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/requests/GetSettingsSystemDocumentsRequest.ts` | `src/features/organization/types/requests/GetSettingsSystemDocumentsRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/requests/GetSettingsSystemExpensesRequest.ts` | `src/features/organization/types/requests/GetSettingsSystemExpensesRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/requests/GetSettingsSystemInventoryRequest.ts` | `src/features/organization/types/requests/GetSettingsSystemInventoryRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/requests/GetSettingsSystemPurchasesRequest.ts` | `src/features/organization/types/requests/GetSettingsSystemPurchasesRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/requests/GetSettingsSystemRequest.ts` | `src/features/organization/types/requests/GetSettingsSystemRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/requests/GetSettingsSystemSalesRequest.ts` | `src/features/organization/types/requests/GetSettingsSystemSalesRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/requests/GetUiDraftsByKeyRequest.ts` | `src/features/organization/types/requests/GetUiDraftsByKeyRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/requests/ImportMastersRequest.ts` | `src/features/organization/public/types/requests/ImportMastersRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/requests/SaveBackupSettingsRequest.ts` | `src/features/organization/public/types/requests/SaveBackupSettingsRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/requests/SaveBranchRequest.ts` | `src/features/organization/public/types/requests/SaveBranchRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/requests/SaveBrandingRequest.ts` | `src/features/organization/public/types/requests/SaveBrandingRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/requests/SaveCurrencyRequest.ts` | `src/features/ledger/public/types/requests/SaveCurrencyRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/requests/SaveGeneralSettingsRequest.ts` | `src/features/organization/public/types/requests/SaveGeneralSettingsRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/requests/SaveOrganizationRequest.ts` | `src/features/organization/public/types/requests/SaveOrganizationRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/requests/SavePreferencesRequest.ts` | `src/features/organization/public/types/requests/SavePreferencesRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/requests/SaveSystemSettingsRequest.ts` | `src/features/organization/public/types/requests/SaveSystemSettingsRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/requests/SearchBranchesRequest.ts` | `src/features/organization/types/requests/SearchBranchesRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/requests/SearchLookupsByResourceRequest.ts` | `src/features/organization/types/requests/SearchLookupsByResourceRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/requests/SetupCompleteRequest.ts` | `src/features/organization/public/types/requests/SetupCompleteRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/responses/BackupPolicyResponse.ts` | `src/features/organization/types/responses/BackupPolicyResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/responses/BackupReply.ts` | `src/features/organization/types/responses/BackupReply.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/responses/BranchListResponse.ts` | `src/features/organization/types/responses/BranchListResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/responses/BranchResponse.ts` | `src/features/organization/types/responses/BranchResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/responses/BrandingResponse.ts` | `src/features/organization/types/responses/BrandingResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/responses/DraftResponse.ts` | `src/features/organization/types/responses/DraftResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/responses/ImportTemplateResponse.ts` | `src/features/organization/types/responses/ImportTemplateResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/responses/LookupOption.ts` | `src/features/organization/types/responses/LookupOption.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/responses/LookupOptionPage.ts` | `src/features/organization/types/responses/LookupOptionPage.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/responses/OrganizationResponse.ts` | `src/features/organization/types/responses/OrganizationResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/responses/ServiceStatusResponse.ts` | `src/features/organization/types/responses/ServiceStatusResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/responses/SystemSettingsAccountingResponse.ts` | `src/features/organization/types/responses/SystemSettingsAccountingResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/responses/SystemSettingsBranchesResponse.ts` | `src/features/organization/types/responses/SystemSettingsBranchesResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/responses/SystemSettingsCompanyResponse.ts` | `src/features/organization/types/responses/SystemSettingsCompanyResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/responses/SystemSettingsDocumentsResponse.ts` | `src/features/organization/types/responses/SystemSettingsDocumentsResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/responses/SystemSettingsExpensesResponse.ts` | `src/features/organization/types/responses/SystemSettingsExpensesResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/responses/SystemSettingsInventoryResponse.ts` | `src/features/organization/types/responses/SystemSettingsInventoryResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/responses/SystemSettingsPurchasesResponse.ts` | `src/features/organization/types/responses/SystemSettingsPurchasesResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/responses/SystemSettingsResponse.ts` | `src/features/organization/types/responses/SystemSettingsResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/types/responses/SystemSettingsSalesResponse.ts` | `src/features/organization/types/responses/SystemSettingsSalesResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/validation/backup-policy-schema.ts` | `src/features/organization/public/backup-policy-schema.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/validation/backup.ts` | `src/features/organization/public/backup.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/validation/settings-schema.ts` | `src/features/ledger/public/currency-schema.ts`؛ `src/features/organization/public/settings-schema.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/settings/validation/validate-policy.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | No production bootstrap, declared API/schema surface, direct test import or independent computation/report fixture depends on it |
| `src/features/suppliers/api/read-api.ts` | `src/features/parties/api/suppliers-read-api.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/suppliers/components/SupplierDirectory.tsx` | Owned screen queries/read-models and canonical pages; see migration matrix | Preserve current implementation; verify direct dependencies and baseline behavior |
| `src/features/suppliers/hooks/useSuppliersData.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Replace ERP-wide coupling with minimal owned contract, screen query and explicit UI scope |
| `src/features/suppliers/services/data-resources.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Delete only after consumer parity and no stale references |
| `src/features/suppliers/types/requests/GetSuppliersByIdRequest.ts` | `src/features/parties/public/types/requests/GetSuppliersByIdRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/suppliers/types/requests/SearchSuppliersRequest.ts` | `src/features/parties/public/types/requests/SearchSuppliersRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/trade/components/InvoiceDetails.tsx` | `src/features/trade/public/InvoiceDetails.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/trade/components/InvoiceLineGrid.tsx` | `src/features/trade/public/InvoiceLineGrid.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/trade/components/InvoiceLookup.tsx` | `src/features/trade/public/InvoiceLookup.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/trade/components/InvoiceTotals.tsx` | `src/features/trade/public/InvoiceTotals.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/trade/hooks/useInvoice.ts` | `src/features/trade/public/useInvoice.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/trade/hooks/usePartialReturn.ts` | `src/features/trade/public/usePartialReturn.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/trade/hooks/useTradeData.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Replace ERP-wide coupling with minimal owned contract, screen query and explicit UI scope |
| `src/features/trade/pages/InvoiceDetailsPage.tsx` | `src/app/pages/InvoiceDetailsPage.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/trade/services/models/invoice-discounts.ts` | `src/features/trade/public/invoice-discounts.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/trade/services/models/invoice-events.ts` | `src/features/trade/public/invoice-events.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/trade/services/models/partial-returns.ts` | `src/features/trade/public/partial-returns.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/trade/services/models/presentation.ts` | `src/features/trade/public/presentation.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/trade/services/models/trade-summary.ts` | `src/features/trade/public/trade-summary.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/trade/types/models/Invoice.ts` | `src/features/trade/public/types/models/Invoice.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/trade/types/models/InvoiceLine.ts` | `src/features/trade/public/types/models/InvoiceLine.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/trade/types/models/TradeFilters.ts` | `src/features/trade/public/types/models/TradeFilters.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/trade/types/requests/SaveInvoiceRequest.ts` | `src/features/trade/public/types/requests/SaveInvoiceRequest.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/trade/utils/line-total.ts` | `src/features/trade/public/line-total.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/trade/validation/trade-schema.ts` | `src/features/trade/public/trade-schema.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/users/components/Access.tsx` | Owned screen queries/read-models and canonical pages; see migration matrix | Preserve current implementation; verify direct dependencies and baseline behavior |
| `src/features/users/hooks/useAccessController.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Replace ERP-wide coupling with minimal owned contract, screen query and explicit UI scope |
| `src/features/users/hooks/useUserAction.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Preserve current implementation; verify direct dependencies and baseline behavior |
| `src/features/users/hooks/useUsersData.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Replace ERP-wide coupling with minimal owned contract, screen query and explicit UI scope |
| `src/features/users/pages/UserDirectoryPage.tsx` | Owned screen queries/read-models and canonical pages; see migration matrix | Replace ERP-wide coupling with minimal owned contract, screen query and explicit UI scope |
| `src/features/users/services/data-resources.ts` | Owned screen queries/read-models and canonical pages; see migration matrix | Delete only after consumer parity and no stale references |
| `src/features/users/types/models/Audit.ts` | `src/features/users/public/types/models/Audit.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/features/users/types/responses/AuditEventResponse.ts` | `src/features/users/public/types/responses/AuditEventResponse.ts` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/index.css` | `src/core/styles/index.css` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
| `src/main.tsx` | `src/app/main.tsx` | نقل/تقسيم إلى المالك الحالي؛ تفاصيل الرموز في سجلات النقل. |
