> وثيقة تاريخية للنسخة قبل Navigation-driven refactor؛ لا تصف الوضع الحالي. المرجع الحالي: [architecture/DATA_FLOW.md](architecture/DATA_FLOW.md).

# المعمارية الحالية — 2026-11-01

`main → App → AppProviders → AppRouter → ApplicationProvider → CompanyProvider → DashboardLayout → PageScope → Feature Page`

المسارات مسجلة مباشرة وبتحميل lazy في `src/core/router/Routes.tsx`. لا توجد routes أو store أو config داخل الميزات. تحتفظ المسارات القديمة بقيمها، بما فيها `/accounts~journal/new`، ويدعم AppRouter روابط hash السابقة.

`Page → useFeatureData → TanStack Query → services/data-resources → feature api → Axios → backend`

كل ميزة تحدد مواردها في Hook خاص. CompanyProvider يحمل خمسة موارد مشتركة فقط: الشركة، الهوية، الفروع، الدفاتر، سياسة النسخ. FeatureDataScope يعرض loading/error ويتيح نموذج قراءة مؤقتًا للشاشة؛ لا يحمّل بيانات بنفسه. useErpContext يجمع نطاق الشاشة وحالة التنقل؛ ليس WorkspaceProvider أو مخزنًا عامًا.

`UI form → RHF + zodResolver → feature mutation hook → preliminary business validation → meaningful service/mapper → feature api → centralized ENDPOINTS → Axios`

ApplicationProvider ينسّق قفل الأمر وrequestId وrevision، ثم invalidation للموارد المتأثرة. لا يُجري تطبيقًا ماليًا محليًا ولا يُرجع snapshot عام. طبقة Service تُحتفظ بها للتركيب والتحويل والتحقق؛ حُذفت wrappers القراءة التي لم تضف عملًا.

Core يحتوي UI primitives وshared/forms/dialogs/tables/actions/display/layout/feedback وreporting وHTTP وQuery mechanics. قواعد الأطراف والفواتير المشتركة تبقى parties وtrade. الأنواع المستقلة PascalCase في ملفات مطابقة؛ inputs تبدأ I وrequests/responses منفصلان.

## حدود مؤكدة

- لا Backend أو قاعدة بيانات متاحة للتحقق. اختبارات المتصفح تستخدم HTTP fixture في tests فقط.
- readComplete يجلب كل صفحات المجموعة المطلوبة للحسابات المحلية الموجودة، وليس pagination مرئيًا لكل جدول. رفض المجموعة الناقصة وتغير revision داخلها لا يثبت snapshot ذريًا بين عدة موارد.
- ErpReadModel نموذج توافق للحسابات الحالية، وليس endpoint أو cache شاملًا. بعض feature hooks ما زالت تقرأ مجموعات واسعة لتقاريرها.
- قواعد الصلاحيات والفرع والائتمان والمخزون والفترات تحتاج تحقق الخادم النهائي. إعادة فتح السنة كانت غير مكتملة وبقيت كذلك.
- تنزيل نسخة كاملة يستخدم endpoint النسخ الموجود /backups/create، مع إنشاء نقطة نسخ على الخادم؛ لا يُصدّر نطاق الشاشة الجزئي.
- نمط aspnet هو المسار النشط. نمط site القديم المعتمد على Workspace ليس دعمًا مكتملاً بعد إزالته.
- tests/reference مرجع أصلي ثابت للمقارنة فقط، ولا يستورد production منه.
