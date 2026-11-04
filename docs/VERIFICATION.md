> وثيقة تاريخية للنسخة قبل Navigation-driven refactor؛ لا تصف الوضع الحالي. المرجع الحالي: [architecture/VERIFICATION.md](architecture/VERIFICATION.md).

# نتائج التحقق النهائية — 2026-11-01

- npm ci --ignore-scripts --offline في نسخة منفصلة: 533 packages. يوجد تنبيه دعم ESLint 9.39.1.
- TypeScript / ESLint / Prettier / naming: نجحت. بعد حذف barrels غير المستعملة فحص naming يغطي 959 source files.
- Vitest: 564 passed، 15 test files. Typed production sources تُفحص بtsconfig؛ الاختبارات تُنفذ بالمشغلات.
- Chromium: 9 passed؛ 108 وجهات تنقل وlogin/session/customer/supplier/theme/404/legacy bookmarks وRTL print preview وتنزيل PDF فعلي بحجم هاتف.
- فحص إضافي ضد build المثبت من npm ci: 4 passed (جلسة/عميل/مورد/PDF)، بمجلد artifacts مستقل.
- Production build من npm ci منفصل: نجح؛ تنبيه main chunk فوق 500kB باقٍ.
- Static runtime cycles: لا دورات ضمن import declarations؛ لا يشمل type-only/dynamic lazy imports.
- الوصول: 958 TS/TSX بلا ملفات منفصلة غير قابلة للوصول تحت جذور entry/API/schema/tests/report contracts. إبقاء API contracts roots لا يعني أنها كلها مرتبطة بشاشات.
- الأصل: 890 ملفًا لم يتغير أي منها وفق SHA-256.

لا يوجد Backend/DB حقيقي. E2E وHTTP fixtures اختبارية فقط. لا اختبارات إنتاج/DB/migration أو جهاز طابعة فعلي أو باقي المتصفحات. إعدادات roles/branches والذرية/التزامن/الكلفة/الإقفال تحتاج تحقق الخادم النهائي. Raw logs في verification-logs.
