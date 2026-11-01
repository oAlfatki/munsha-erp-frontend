# Munsha ERP Frontend

واجهة React 19 + TypeScript + Vite بنمط feature-based. هذه نسخة إعادة هيكلة مستقلة من الحزمة المرفوعة؛ لا تحتوي خادمًا حقيقيًا أو بيانات Demo في runtime.

## التشغيل

Node >=22.13.0. نفّذ `npm ci`، انسخ `.env.example` إلى `.env.local` وحدد عنوان API الحقيقي، ثم `npm run dev`. إعداد افتراضي: `VITE_API_MODE=aspnet` و`VITE_API_BASE_URL=http://localhost:5000/api/v1`. لا تُضمّن أسرارًا داخل VITE variables.

## التحقق

`npm run typecheck`، `npm run lint`، `npm run check:naming`، `npm run format:check`، `npm test`، `npm run build`.

شغّل `npm run preview -- --host 127.0.0.1 --port 5175` ثم `PLAYWRIGHT_BASE_URL=http://127.0.0.1:5175 PLAYWRIGHT_CHROMIUM_EXECUTABLE=/usr/bin/chromium npm run test:e2e`، أو ثبت Chromium عبر Playwright وحدد مساره المناسب. اختبارات E2E تعترض HTTP بمرجع في tests؛ ليست إثبات ربط بالباك إند.

اقرأ `docs/ARCHITECTURE.md`، `docs/VERIFICATION.md`، و`docs/architecture/feature-inventory.json`. العقود الأصلية في docs/openapi؛ وجودها لا يثبت تنفيذ Backend.
