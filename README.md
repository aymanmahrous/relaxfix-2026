# 🔧 Relax Fix Pro v3.0
### منصة خدمات الصيانة المنزلية - أبوظبي

---

## ✨ المميزات

| الميزة | الوصف |
|--------|-------|
| 🛠️ **32 خدمة** | صيانة، ديكورات، عزل، نظافة، دعاية |
| 📱 **واتساب مباشر** | طلب الخدمة عبر واتساب |
| 📡 **تيليجرام** | إشعارات فورية لكل طلب |
| 📊 **لوحة تحكم** | إدارة الطلبات والإحصائيات |
| 🎨 **استوديو إعلانات** | تصميم إعلانات جاهزة |
| 📡 **رادار الفرص** | مسح ذكي لاكتشاف العملاء |
| 💎 **3 باقات اشتراك** | أساسية، مميزة، ذهبية |
| 🔥 **عروض حصرية** | خصومات وأكواد ترويجية |
| ⚡ **سريع جداً** | Compression + Caching + Helmet |
| 📱 **PWA** | يعمل كتطبيق على الهاتف |

---

## 🏗️ البنية

```
relaxfix-pro/
├── server.js              ← الخادم الكامل (Express + 10 APIs)
├── package.json           ← التبعيات
├── data.json              ← 32 خدمة + باقات + عروض + مناطق
├── render.yaml            ← إعدادات النشر على Render
├── supabase-setup.sql     ← إنشاء جداول قاعدة البيانات
├── .env.example           ← نموذج المتغيرات
└── public/
    ├── index.html         ← الموقع الرئيسي (مبهر!)
    ├── admin.html         ← لوحة التحكم
    ├── ad-design.html     ← استوديو تصميم الإعلانات
    └── manifest.json      ← PWA manifest
```

---

## 🚀 التشغيل المحلي

```bash
# 1. تثبيت التبعيات
npm install

# 2. تشغيل الخادم
npm start

# 3. افتح المتصفح
# الموقع: http://localhost:3000
# لوحة التحكم: http://localhost:3000/admin
# تصميم إعلان: http://localhost:3000/ad-design
```

---

## 🌐 النشر على Render

### 1. إعداد Supabase
- اذهب إلى https://supabase.com وأنشئ مشروعاً
- افتح SQL Editor والصق محتوى `supabase-setup.sql`
- انسخ `URL` و `service_role key`

### 2. رفع على GitHub
```bash
git init
git add .
git commit -m "Relax Fix Pro v3.0"
git remote add origin https://github.com/YOUR_USER/relaxfix-pro.git
git push -u origin main
```

### 3. نشر على Render
1. اذهب إلى https://render.com
2. New → **Web Service**
3. اختر المستودع
4. الإعدادات:
   - Build Command: `npm install`
   - Start Command: `npm start`
5. أضف Environment Variables (من .env.example)
6. اضغط **Deploy** ✅

---

## 📡 الـ APIs

| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/services` | جلب الخدمات (مع فلترة ?cat=) |
| GET | `/api/categories` | جلب الأقسام |
| GET | `/api/plans` | جلب الباقات |
| GET | `/api/offers` | جلب العروض |
| GET | `/api/areas` | جلب المناطق |
| GET | `/api/scanner` | مسح رادار الفرص |
| GET | `/api/stats` | إحصائيات لوحة التحكم |
| GET | `/api/orders?pass=` | جلب الطلبات (admin) |
| POST | `/api/order` | إنشاء طلب جديد |
| POST | `/api/contact` | إرسال رسالة |
| POST | `/api/subscribe` | اشتراك في باقة |
| POST | `/api/offers/claim` | طلب عرض |

---

## ⚙️ المتغيرات المطلوبة

| المتغير | الوصف |
|---------|-------|
| `SUPABASE_URL` | رابط مشروع Supabase |
| `SUPABASE_KEY` | service_role key |
| `TELEGRAM_BOT_TOKEN` | توكن البوت للإشعارات |
| `TELEGRAM_CHAT_ID` | chat_id لاستقبال الطلبات |
| `ADMIN_PASSWORD_HASH` | كلمة سر لوحة الإدارة |
| `WHATSAPP_ADMIN` | رقم واتساب (افتراضي: 971588259848) |

---

## 📱 كلمة سر لوحة التحكم الافتراضية

```
admin123
```

---

© 2026 Relax Fix Pro. جميع الحقوق محفوظة.
