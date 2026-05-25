// server.js (الموجود في المجلد الجذر)
const express = require('express');
const app = express();

// استيراد الخدمات من المجلد الفرعي
const apiRoutes = require('./relaxfix-app/index.js');

app.use(express.json());

// ربط الواجهة بالخدمات
app.use('/api', apiRoutes);

app.listen(3000, () => {
    console.log("المنظومة الحية تعمل بنجاح في المجلد الجذر...");
});
