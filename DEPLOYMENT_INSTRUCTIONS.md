# 🚀 تعليمات النشر على Render مع GitHub

## المرحلة 1: إنشاء حساب GitHub

### الخطوة 1: الذهاب إلى GitHub
1. اذهب إلى: https://github.com
2. اضغط "Sign up" (التسجيل)

### الخطوة 2: ملء البيانات
```
البريد الإلكتروني: أدخل بريدك
كلمة المرور: اختر كلمة قوية (مثل: RelaxFix@2026)
اسم المستخدم: relaxfix-uae (أو أي اسم تفضله)
```

### الخطوة 3: التحقق
- تحقق من بريدك الإلكتروني
- اضغط على رابط التحقق
- أكمل الخطوات الأخرى

### الخطوة 4: إنشاء Repository جديد
1. اضغط "+" في الزاوية العلوية اليمنى
2. اختر "New repository"
3. ملأ البيانات:
   ```
   Repository name: relaxfix-unified-platform
   Description: Relax Fix Studio - Unified Platform
   Public: ✓ (اختياري)
   Add README: ✓
   ```
4. اضغط "Create repository"

---

## المرحلة 2: رفع المشروع على GitHub

### الخطوة 1: تثبيت Git
```bash
# على Windows
https://git-scm.com/download/win

# على Mac
brew install git

# على Linux
sudo apt-get install git
```

### الخطوة 2: إعداد Git
```bash
git config --global user.name "اسمك"
git config --global user.email "بريدك@example.com"
```

### الخطوة 3: رفع المشروع
```bash
cd /home/ubuntu/relaxfix-unified-platform

# إضافة الملفات
git add .

# حفظ التغييرات
git commit -m "Initial commit - Relax Fix Studio"

# رفع على GitHub
git push origin main
```

---

## المرحلة 3: إنشاء حساب Render

### الخطوة 1: الذهاب إلى Render
1. اذهب إلى: https://render.com
2. اضغط "Get Started"

### الخطوة 2: التسجيل
```
اختر: Sign up with GitHub
سيطلب منك الموافقة على الوصول
وافق على جميع الأذونات
```

### الخطوة 3: إنشاء Web Service جديد
1. اضغط "New +" 
2. اختر "Web Service"
3. اختر Repository الخاص بك (relaxfix-unified-platform)
4. اضغط "Connect"

### الخطوة 4: تكوين الخدمة
```
Name: relaxfix-uae
Environment: Node
Build Command: pnpm install && pnpm build
Start Command: pnpm start
```

### الخطوة 5: متغيرات البيئة
أضف جميع المتغيرات من `.env`:
```
DATABASE_URL: [أدخل رابط قاعدة البيانات]
JWT_SECRET: [أدخل السر]
VITE_APP_ID: [أدخل معرف التطبيق]
... وغيرها
```

### الخطوة 6: النشر
1. اضغط "Create Web Service"
2. سيبدأ النشر تلقائياً
3. انتظر حتى ينتهي (5-10 دقائق)

---

## المرحلة 4: ربط الدومين

### الخطوة 1: في لوحة تحكم Render
1. اذهب إلى خدمتك (relaxfix-uae)
2. اضغط "Settings"
3. اختر "Custom Domain"

### الخطوة 2: أضف الدومين
```
Domain: www.relaxfixuae.com
```

### الخطوة 3: تحديث DNS
1. اذهب إلى مزود الدومين الخاص بك
2. أضف CNAME record:
   ```
   Name: www
   Value: relaxfix-uae.onrender.com
   ```
3. انتظر 24 ساعة للتحديث الكامل

---

## المرحلة 5: التحقق من النشر

### تحقق من:
1. ✅ الموقع يفتح على www.relaxfixuae.com
2. ✅ جميع الصفحات تعمل
3. ✅ لوحة التحكم تعمل
4. ✅ الرادار يعمل
5. ✅ المهن تظهر بشكل صحيح

---

## 🔧 استكشاف الأخطاء

### الخطأ: 502 Bad Gateway
**الحل:**
1. تحقق من Build logs في Render
2. تأكد من أن جميع المتغيرات موجودة
3. أعد تشغيل الخدمة

### الخطأ: Database Connection Error
**الحل:**
1. تحقق من DATABASE_URL
2. تأكد من أن قاعدة البيانات متاحة
3. أضف IP address إلى allowlist

### الخطأ: الدومين لا يعمل
**الحل:**
1. انتظر 24 ساعة للتحديث
2. تحقق من CNAME records
3. امسح cache المتصفح

---

## 📞 الدعم

إذا واجهت أي مشاكل:
1. تحقق من Build logs في Render
2. اقرأ الأخطاء بعناية
3. ابحث عن الحل في توثيق Render

---

**آخر تحديث:** 2026-05-13
**الحالة:** جاهز للنشر ✅
