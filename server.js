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
    const { data, error } = await supabase.from('orders').insert([{
      name: order.name,
      phone: order.phone,
      area: order.area,
      service: order.service,
      notes: order.notes || '',
      date: order.date || null,
      time: order.time || null,
      status: 'new',
      created_at: new Date().toISOString()
    }]);

    if (error) throw error;

    // Send to Telegram (best-effort)
    const message = `🚀 *طلب جديد وصل!*\n👤 *العميل:* ${order.name}\n📞 *الهاتف:* ${order.phone}\n📍 *المنطقة:* ${order.area}\n🛠️ *الخدمة:* ${order.service}\n📅 *التاريخ:* ${order.date || 'لم يحدد'}\n⏰ *الوقت:* ${order.time || 'لم يحدد'}\n\n💬 *الملاحظات:* ${order.notes || 'لا توجد'}`;

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

    res.status(200).json({ success: true, message: 'Order created successfully' });
  } catch (error) {
    console.error("Order Error:", error);
    res.status(500).json({ error: "Failed to create order", details: error.message });
  }
});

// Get all orders (for admin)
app.get('/api/admin/orders', async (req, res) => {
  try {
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    res.status(200).json(data || []);
  } catch (error) {
    console.error("Fetch Orders Error:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// Get user orders by phone
app.get('/api/user/orders', async (req, res) => {
  const { phone } = req.query;
  if (!phone) {
    return res.status(400).json({ error: "Phone number required" });
  }
  try {
    const { data, error } = await supabase.from('orders').select('*').eq('phone', phone).order('created_at', { ascending: false });
    if (error) throw error;
    res.status(200).json(data || []);
  } catch (error) {
    console.error("Fetch User Orders Error:", error);
    res.status(500).json({ error: "Failed to fetch user orders" });
  }
});

// Update order status (for admin)
app.patch('/api/admin/orders/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const { data, error } = await supabase.from('orders').update({ status }).eq('id', id);
    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Update Order Error:", error);
    res.status(500).json({ error: "Failed to update order" });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
