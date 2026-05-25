# دليل النشر والتثبيت

## 📦 المتطلبات الأساسية

### النظام
- Node.js 22.13.0 أو أحدث
- npm أو pnpm
- MySQL 8.0+ أو TiDB

### الحسابات الخارجية
- حساب Manus للمصادقة
- حساب قاعدة بيانات
- (اختياري) حساب Stripe للدفع

---

## 🚀 التثبيت المحلي

### الخطوة 1: استنساخ المشروع

```bash
git clone https://github.com/your-repo/relaxfix-unified-platform.git
cd relaxfix-unified-platform
```

### الخطوة 2: تثبيت المكتبات

```bash
# استخدام pnpm (موصى به)
pnpm install

# أو استخدام npm
npm install
```

### الخطوة 3: إعداد قاعدة البيانات

```bash
# 1. إنشاء ملف .env.local
cp .env.example .env.local

# 2. تحديث متغيرات البيئة
# DATABASE_URL=mysql://user:password@localhost:3306/relaxfix

# 3. تشغيل الهجرات
pnpm drizzle-kit migrate
```

### الخطوة 4: تشغيل خادم التطوير

```bash
pnpm dev
```

الموقع سيكون متاحاً على `http://localhost:3000`

---

## 🌐 النشر على الإنتاج

### الخيار 1: النشر على Manus Platform (الموصى به)

```bash
# 1. إنشاء checkpoint
pnpm webdev:checkpoint "Production deployment"

# 2. النقر على زر Publish في لوحة التحكم
# المشروع سيكون متاحاً على:
# https://relaxfixup-jrbadqdh.manus.space
# https://www.relaxfixuae.com
```

### الخيار 2: النشر على Railway

```bash
# 1. تثبيت Railway CLI
npm i -g @railway/cli

# 2. تسجيل الدخول
railway login

# 3. ربط المشروع
railway link

# 4. إضافة متغيرات البيئة
railway variables set DATABASE_URL=...

# 5. النشر
railway up
```

### الخيار 3: النشر على Render

```bash
# 1. ربط مستودع GitHub
# https://dashboard.render.com

# 2. إنشاء خدمة جديدة
# اختر "Web Service"

# 3. إضافة متغيرات البيئة
# DATABASE_URL
# JWT_SECRET
# إلخ

# 4. النشر التلقائي عند الـ Push
```

### الخيار 4: النشر على Docker

```bash
# 1. بناء صورة Docker
docker build -t relaxfix-studio .

# 2. تشغيل الحاوية
docker run -e DATABASE_URL=... -p 3000:3000 relaxfix-studio

# 3. النشر على Docker Hub
docker push your-username/relaxfix-studio
```

---

## 🔧 متغيرات البيئة

### متغيرات الإنتاج الأساسية

```env
# قاعدة البيانات
DATABASE_URL=mysql://user:password@host:3306/relaxfix

# المصادقة
JWT_SECRET=your-super-secret-jwt-key-change-this
VITE_APP_ID=your-manus-oauth-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im

# APIs الداخلية
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=your-forge-api-key
VITE_FRONTEND_FORGE_API_KEY=your-frontend-api-key

# معلومات المالك
OWNER_NAME=Your Name
OWNER_OPEN_ID=your-open-id

# URL الموقع
VITE_FRONTEND_URL=https://www.relaxfixuae.com

# (اختياري) Stripe
STRIPE_SECRET_KEY=sk_live_...
VITE_STRIPE_PUBLIC_KEY=pk_live_...
```

---

## 🗄️ إدارة قاعدة البيانات

### النسخ الاحتياطية

```bash
# النسخ الاحتياطية اليدوية
mysqldump -u user -p relaxfix > backup-$(date +%Y%m%d).sql

# الاستعادة من نسخة احتياطية
mysql -u user -p relaxfix < backup-20260505.sql
```

### الهجرات

```bash
# إنشاء هجرة جديدة
pnpm drizzle-kit generate

# تطبيق الهجرات
pnpm drizzle-kit migrate

# التحقق من حالة الهجرات
pnpm drizzle-kit introspect
```

---

## 📊 المراقبة والسجلات

### عرض السجلات

```bash
# سجلات الخادم
tail -f .manus-logs/devserver.log

# سجلات المتصفح
tail -f .manus-logs/browserConsole.log

# سجلات الشبكة
tail -f .manus-logs/networkRequests.log
```

### الإحصائيات

- **لوحة التحكم:** https://your-domain/dashboard
- **التحليلات:** متاحة في Management UI
- **الأداء:** استخدم Chrome DevTools

---

## 🔒 الأمان

### قبل النشر

- [ ] تغيير `JWT_SECRET` إلى قيمة قوية
- [ ] تفعيل HTTPS على جميع الاتصالات
- [ ] تعطيل وضع التطوير
- [ ] إعداد جدار الحماية
- [ ] تفعيل المصادقة الثنائية
- [ ] إعداد النسخ الاحتياطية التلقائية

### بعد النشر

- [ ] مراقبة السجلات يومياً
- [ ] تحديث المكتبات بانتظام
- [ ] اختبار الأمان الدوري
- [ ] تدوير المفاتيح السرية شهرياً

---

## 🚨 استكشاف الأخطاء

### الخطأ: "Database connection failed"

```bash
# تحقق من اتصال قاعدة البيانات
mysql -u user -p -h host -e "SELECT 1"

# تحقق من متغير DATABASE_URL
echo $DATABASE_URL
```

### الخطأ: "OAuth authentication failed"

```bash
# تحقق من معرّفات OAuth
echo $VITE_APP_ID
echo $OAUTH_SERVER_URL

# تحقق من redirect URI في إعدادات Manus
```

### الخطأ: "Out of memory"

```bash
# زيادة حد الذاكرة
NODE_OPTIONS="--max-old-space-size=2048" pnpm dev

# أو في Docker
docker run -m 2g relaxfix-studio
```

---

## 📈 الأداء والتحسينات

### تحسينات التطوير

```bash
# بناء الإنتاج
pnpm build

# تحليل حجم الحزمة
pnpm analyze

# اختبار الأداء
pnpm test:performance
```

### تحسينات الخادم

- استخدم CDN للملفات الثابتة
- فعّل الضغط (gzip)
- استخدم caching مناسب
- حسّن استعلامات قاعدة البيانات

---

## 🔄 التحديثات والصيانة

### التحديث إلى إصدار جديد

```bash
# 1. سحب التحديثات
git pull origin main

# 2. تثبيت المكتبات الجديدة
pnpm install

# 3. تشغيل الهجرات إن وجدت
pnpm drizzle-kit migrate

# 4. إعادة بناء
pnpm build

# 5. إعادة تشغيل الخادم
pnpm restart
```

### الصيانة الدورية

- **أسبوعياً:** مراجعة السجلات والأخطاء
- **شهرياً:** تحديث المكتبات والمكونات
- **ربع سنوياً:** مراجعة الأمان والأداء
- **سنوياً:** مراجعة شاملة للمشروع

---

## 📞 الدعم الفني

للمساعدة في النشر والتثبيت:
- البريد الإلكتروني: support@relaxfixstudio.com
- WhatsApp: +971 50 XXX XXXX
- Telegram: @RelaxFixStudio

---

**آخر تحديث:** 2026-05-05
