// server.js الرئيسي
const express = require('express');
const app = express();
const path = require('path');

// تقديم ملفات الواجهة من المجلد الموحد
app.use(express.static(path.join(__dirname, 'relaxfix-2026/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'relaxfix-2026/dist/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`RelaxFix 2026 is running on port ${PORT}`));
