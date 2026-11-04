# نتائج التحقق — Navigation-driven / Feature-owned

الإصدار: مراجعة إعادة الهيكلة بتاريخ 2026-11-04، package version 1.0.0. هذه نتائج المصدر المتاح فقط؛ لا يوجد Backend/DB فعلي قابل للتحقق.

## الفحوصات المنفذة

| الأمر | النتيجة المثبتة | الدليل |
|---|---|---|
| `npm ci --ignore-scripts --prefer-offline --cache /workspace/.npm-munsha-cache` | exit 0؛ تثبيت 539 package. Scripts الخاصة بالحزم معطلة عمدًا أثناء التثبيت. | verification-logs/install.log |
| `npm ls --all` | exit 0؛ حُلّ تعارض optional Ajv peer بعزل Ajv 6 الخاص بـESLint داخل نطاقه، وأزيل legacy-peer-deps من npmrc دون إضافة dependency تشغيلية غير مستعملة. | verification-logs/dependency-tree.log |
| `npm run typecheck` | exit 0؛ strict TypeScript وفق tsconfig للمصدر وVite config. لا يُدّعى فحص TS static لجميع الاختبارات؛ تُنفذ الاختبارات بمشغلاتها. | verification-logs/typecheck.log |
| `npm run lint` | exit 0 | verification-logs/lint.log |
| `npm run check:naming` | exit 0؛ استثناء أسماء primitives الأصلية، route definitions وأسماء core API المقررة موثق داخل checker. | verification-logs/naming.log |
| `npm run format:check` | exit 0 | verification-logs/format.log |
| `npm run check:architecture` | exit 0؛ صفر runtime file/feature cycles، وصفر type-inclusive feature cycles، وصفر private cross-feature أو core/shared→feature/app imports. يفحص import/export والديناميكي الثابت وimport types. لا يشمل require أو imports مبنية في runtime، ولا توجد لها آلية dispatch مقصودة. | verification-logs/architecture.log + scripts/check-architecture.mjs |
| `npm test` | **576 passed، 19 files** | verification-logs/unit-integration.log |
| `npm run build` | exit 0؛ تحذير chunk أكبر من 500 kB باقٍ ولم يُخفَ. | verification-logs/build.log |
| `PLAYWRIGHT_CHROMIUM_EXECUTABLE=/usr/bin/chromium npm run test:e2e -- --reporter=line --output=/workspace/munsha-master-tools/e2e-final-ordered-css` | **14 passed** ضد production preview، ومنها فتح 108 وجهات navigation. | verification-logs/e2e-full.log |
| `npx vitest run tests/unit/transport-preservation.test.ts tests/unit/http.test.ts tests/unit/auth-transport.test.ts tests/unit/backups-transport.test.ts` | **48 passed** عند جعل 41 command API يحدد POST والرابط وbody صراحةً قبل حذف postCommand. ثم أُعيد كامل npm test والبناء بعد الحذف. | verification-logs/explicit-api-contracts.log |

الخادم للمتصفح: `npm run preview -- --host 0.0.0.0 --port 5173`. Chromium محلي. داخل CI يتم تثبيت Chromium وتشغيل نفس journeys. ملف workflow أُضيف؛ لم يُنفذ GitHub Actions عن بُعد بعد.

النتائج الثمانية المتسلسلة وexit codes وتوقيتها في `CHECK_RESULTS.json`. لا يُستنتج النجاح من مجرد وجود ملف log أو من ناتج أمر لاحق.

## أدلة المحافظة على السلوك

- 41 أمثلة method/URL/body مستقلة؛ القيم المتوقعة لم تُولد من النسخة الجديدة.
- 192 أمثلة نتائج تقارير محفوظة، مع ربط الدوال بمالكيها الحاليين.
- 40 حالات حماية وظائف الحساب/القراءة: 39 مقارنة AST تنفيذي بالأصل المجمد، وextras مقارنة إخراج وعدم تعديل المدخلات مع السماح بالـprojection الصغير.
- 108 مقارنات شاشات. حالتا إضافة/قائمة المستخدمين تستخدمان assertions مرتبطة بالهوية الفعلية بدل snapshot قديم أخفى المسؤول، والجلسات تحتفظ بزر إنهاء الجلسات الأخرى الموجود أصلًا. تفاصيل التغيير في TEST_MIGRATION.md.
- مقارنة 9 سياسات تحقق مفصولة مع validatePolicy الأصلي عبر حالات ومدخلات وسياسات مختلفة، مع المحافظة على رسائل الخطأ وعدم تعديل state.
- 27 اختبارات checksum لمراجع الحسابات القديمة تُنفذ ضمن suite؛ هذه المراجع test-only.
- Browser: login validation، session restore/reload، customer/supplier persistence، theme، 108 navigation destinations، 404، canonical paths/retired alias، معاينة RTL وPDF حقيقي على 390×844، user create/edit/reset/reload، 409 error دون نجاح زائف، منع non-admin قبل POST، اللغة والاتجاه بعد reload.
- ترتيب AST لقواعد وتصريحات CSS قبل وبعد الفصل طابق في مرحلة النقل. `STYLE_OWNERSHIP.json` يحدد المواضع الأصلية. الثيم والطباعة وRTL/PDF وتخطيط الإعدادات والمسافات الفعلية في نموذج المخزون تحققوا بالمتصفح؛ لا ندّعي pixel-perfect مقارنة لكل شاشة/ثيم/متصفح.

## إخفاقات عولجت أثناء التنفيذ

الاختبارات القديمة كانت تستورد موارد ومزودات ومسارات أزيلت عمدًا؛ سُجل بديلها في TEST_MIGRATION.md دون إعادة توليد القيم المستقلة. أصلحت imports/DTO paths التي تغير مالكها، وأخطاء تحويل syntax أثناء نقل API، ومحددات أسماء حقول browser التي تتضمن النجمة رغم أن aria-label يحذفها. تشغيل suite بالتوازي مع browser/build تجاوز مهلة 5 ثوانٍ في فحص AST وتحميل شاشة أول مرة؛ أصبح لهما budget 30 ثانية دون حذف أي assertion. آخر التشغيل المتسلسل **نجح بالكامل**.

أُزيل legacy-peer-deps وأعيد تنظيم lockfile لعزل Ajv 6 التابع لأدوات lint. نجح npm ls --all دون إضافة حزمة تشغيلية غير مستعملة. لم يُنفذ npm audit في هذه المراجعة.

أُصلح ترتيب CSS imports بعد أن أظهر Vite أنه لا يقبل import متأخرًا رغم قبول اختبار PostCSS منفصل له. مدخل app/styles.css يركّب imports قياسية في أعلى الملف، مع حفظ ترتيب القواعد الأصلي. البناء الأخير لا يصدر تحذيرات ترتيب @import، واختبار المتصفح يتحقق من الأعمدة والمسافات المحسوبة فعلًا. راجع GLOBAL_STYLE_ORDER.json.

## الحدود والمخاطر القائمة

| ID | الحالة/الأثر | الدليل أو المتابعة |
|---|---|---|
| RETAINED-01 / High | عيب أصلي محفوظ: predicate داخل invoiceReport يقارن `invoice.id === invoice.id`، ولذلك قد يختار أول فاتورة كمرجع طباعة المرتجع بدل الفاتورة الأصلية. لم يُصحح ضمن إعادة الهيكلة حتى لا يُغيّر سلوك أعمال معتمد بصمت. | `src/features/trade/public/build-invoice-document.ts`، `invoiceReport`، السطر 14 وقت التقرير. يلزم إصلاح مستقل مع حالة مرتجع لا يرتبط بأول فاتورة وقيم متوقعة جديدة معتمدة. |
| BACKEND-01 / High | الذرية، double-entry، idempotency، concurrency، RBAC/branch isolation، cookies/CSRF/revocation وصحة persistence **Unverified** على Backend حقيقي. | fixtures لا تثبت قاعدة بيانات أو session server؛ يُشترط contract/integration testing على بيئة Backend قبل الإنتاج. |
| SCALE-01 / Medium | حسابات/تصدير قديمة تحتاج قراءة مجموعات كاملة. بقي readAllPages صريحًا مع checks؛ لا يوجد ادعاء backend aggregation أو اختبار أحمال. | `src/core/api/readAllPages.ts`؛ نقل التقارير إلى endpoints مثبتة خطوة تكامل لاحقة. |
| I18N-01 / Medium | i18next وlocale keys وRTL/LTR والتنقل الرئيسي متاحة، لكن جميع النصوص التجارية لم تترجم إلى English. | `src/core/i18n/i18n.ts`؛ العربية الحالية محفوظة. يلزم inventory/translation review لادعاء واجهة English كاملة. |
| BUILD-01 / Medium | main chunk يتجاوز 500 kB. | build.log؛ تحسين توزيع bundle يحتاج قياسًا منفصلًا، ولم يُرفع حد التحذير لإخفائه. |
| DEP-01 / Low | npm أصدر deprecation/support warning لـESLint 9.39.1. | install.log؛ أُبقيت النسخة المثبتة، والترقية مستقلة عن نقل العقود والحسابات. |
| COVERAGE-01 | لا اختبار متصفح لكل action/error/branch/currency combination، ولا hardware printer أو Safari/Firefox أو production deployment أو migration/DB mutation. | التغطية المحددة أعلاه فقط؛ لا نسب إنجاز أو تغطية مخترعة. |

لا يوجد مرجع إنتاج محلي أو Demo engine في src. OpenAPI وtyped clients قد يصفان وظائف غير موصولة؛ بقاؤهما لا يعني تنفيذ Backend. CSV يعرض source closure محافظة لا يعد كل endpoint داخل module استدعاءً فعليًا.

## GitHub والتسليم

المستودع المطلوب `oAlfatki/munsha-erp-frontend` كان Public عند التحقق. المستخدم اختار تحويله إلى Private. محاولة `gh api --method PATCH repos/oAlfatki/munsha-erp-frontend -F private=true` رُفضت بـHTTP 403: `Resource not accessible by integration`. **لم يُرفع أي source** للمستودع العام. صلاحية قراءة/كتابة المحتوى الظاهرة لا تعني صلاحية تطبيق الربط لتغيير إعداد الخصوصية. يصبح الرفع ممكنًا بعد تحويل المستودع إلى Private والتحقق منه.

النسخة المحلية محفوظة على فرع `architecture/navigation-driven`، مع `checkpoint/feature-resource-baseline` وخطوات Git قابلة للمراجعة. ZIP يستبعد node_modules وdist و.git و.env.local ونتائج browser الضخمة، ويحتوي المصدر والعقود والاختبارات وسجلات التحقق والوثائق المطلوبة.

سجلات stdout محفوظة بعد إزالة رموز ANSI والمسافات الطرفية لتسهيل قراءتها؛ لم تُغيّر النتائج أو التحذيرات أو exit codes.
