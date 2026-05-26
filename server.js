// server.js
import express from 'express';
import apiRoutes from './relaxfix-app/index.js';

const app = express();

app.use(express.json());

// صفحة رئيسية
app.get('/', (req, res) => {
  res.json({ message: 'RelaxFix API تعمل بنجاح ✅' });
});

// ربط الـ API
app.use('/api', apiRoutes);

app.listen(3000, () => {
  console.log('السيرفر يعمل على البورت 3000');
});
