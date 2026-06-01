import express from 'express';
import path from 'path';
import axios from 'axios';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Supabase Setup
const supabaseUrl = process.env.SUPABASE_URL || 'https://aazhniddjvhuimlxxjfd.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Data for Services
const services = [
  { id: 1, cat: "ac", name_ar: "غسيل مكيف سبليت", name_en: "Split AC Washing", description_ar: "تنظيف عميق شامل", description_en: "Deep comprehensive cleaning" },
  { id: 2, cat: "ac", name_ar: "شحن فريون", name_en: "Gas Refill", description_ar: "فحص تسريب وتعبئة غاز", description_en: "Leak check and gas refill" },
  { id: 3, cat: "plumbing", name_ar: "إصلاح تسريب مياه", name_en: "Water Leak Repair", description_ar: "كشف وإصلاح التسريبات", description_en: "Detect and fix leaks" },
  { id: 4, cat: "electrical", name_ar: "إصلاح أعطال كهرباء", name_en: "Electrical Repair", description_ar: "صيانة شاملة للكهرباء", description_en: "Full electrical maintenance" }
];

// APIs
app.get('/api/services', (req, res) => res.json(services));

app.post('/api/order', async (req, res) => {
  const order = req.body || {};
  try {
    // Save to Supabase
    await supabase.from('orders').insert([{ ...order, status: 'new', created_at: new Date() }]);

    // Send to Telegram (best-effort)
    const message = `🚀 *طلب جديد وصل!*\n👤 *العميل:* ${order.name || ''}\n📞 *الهاتف:* ${order.phone || ''}\n📍 *المنطقة:* ${order.area || ''}\n🛠️ *الخدمة:* ${order.service || ''}`;

    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      try {
        await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'Markdown'
        });
      } catch (tgErr) {
        console.error('Telegram notify failed:', tgErr.message || tgErr);
      }
    } else {
      console.log('Telegram not configured, skipping notify');
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Order Error:", error);
    res.status(500).json({ error: "Failed" });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
