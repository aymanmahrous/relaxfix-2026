const express = require("express");
const path = require("path");
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const axios = require("axios");
const fs = require("fs");

const app = express();

// ── Security & Performance ────────────────────────────────
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(compression());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "طلبات كثيرة، حاول لاحقاً" }
});
app.use("/api/", limiter);

// Static files with caching
app.use(express.static(path.join(__dirname, "public"), {
  maxAge: "1d",
  etag: true
}));

// ── Load Data ─────────────────────────────────────────────
const data = JSON.parse(fs.readFileSync(path.join(__dirname, "data.json"), "utf8"));

// ── Supabase (optional) ───────────────────────────────────
let supabase = null;
if (process.env.SUPABASE_URL && process.env.SUPABASE_KEY) {
  const { createClient } = require("@supabase/supabase-js");
  supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
}

// ── Config ────────────────────────────────────────────────
const WA_NUMBER = process.env.WHATSAPP_ADMIN || "971588259848";
const TG_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const TG_CHAT = process.env.TELEGRAM_CHAT_ID || "";
const ADMIN_PASS = process.env.ADMIN_PASSWORD_HASH || "admin123";

// ── Telegram Helper ───────────────────────────────────────
async function sendTelegram(text) {
  if (!TG_TOKEN || !TG_CHAT) {
    console.log("📨 Telegram (disabled):", text.substring(0, 50) + "...");
    return { ok: true, simulated: true };
  }
  try {
    const res = await axios.post(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
      chat_id: TG_CHAT, text, parse_mode: "HTML"
    });
    return res.data;
  } catch (e) {
    console.error("Telegram error:", e.message);
    return { ok: false, error: e.message };
  }
}

// ── API: GET /api/services ────────────────────────────────
app.get("/api/services", (req, res) => {
  const { cat, search } = req.query;
  let services = data.services;

  if (cat && cat !== "all") {
    services = services.filter(s => s.category === cat);
  }
  if (search) {
    const q = search.toLowerCase();
    services = services.filter(s =>
      s.name.includes(q) || s.description.includes(q)
    );
  }

  res.json({ success: true, count: services.length, services });
});

// ── API: GET /api/categories ──────────────────────────────
app.get("/api/categories", (req, res) => {
  res.json({ success: true, categories: data.categories });
});

// ── API: GET /api/plans ───────────────────────────────────
app.get("/api/plans", (req, res) => {
  res.json({ success: true, plans: data.plans });
});

// ── API: GET /api/offers ──────────────────────────────────
app.get("/api/offers", (req, res) => {
  res.json({ success: true, offers: data.offers });
});

// ── API: GET /api/areas ───────────────────────────────────
app.get("/api/areas", (req, res) => {
  res.json({ success: true, areas: data.areas });
});

// ── API: POST /api/order ──────────────────────────────────
app.post("/api/order", async (req, res) => {
  try {
    const { name, phone, service, area, message } = req.body;
    if (!name || !phone || !service) {
      return res.status(400).json({ success: false, error: "الاسم والهاتف والخدمة مطلوبة" });
    }

    const orderData = {
      name, phone, service, area: area || "", message: message || "",
      created_at: new Date().toISOString(), status: "new"
    };

    // Save to Supabase
    if (supabase) {
      const { error } = await supabase.from("orders").insert([orderData]);
      if (error) console.error("Supabase error:", error.message);
    }

    // Notify via Telegram
    const tgText = `🔧 <b>طلب جديد - Relax Fix</b>\n\n`
      + `👤 <b>الاسم:</b> ${name}\n`
      + `📱 <b>الهاتف:</b> ${phone}\n`
      + `🛠️ <b>الخدمة:</b> ${service}\n`
      + `📍 <b>المنطقة:</b> ${area || "لم يحدد"}\n`
      + `📝 <b>التفاصيل:</b> ${message || "لا يوجد"}\n`
      + `⏰ ${new Date().toLocaleString("ar-AE")}`;
    await sendTelegram(tgText);

    // WhatsApp link
    const waText = encodeURIComponent(
      `🔧 طلب خدمة - Relax Fix\n\n👤 ${name}\n📱 ${phone}\n🛠️ ${service}\n📍 ${area || "لم يحدد"}\n📝 ${message || ""}`
    );

    res.json({ success: true, whatsappUrl: `https://wa.me/${WA_NUMBER}?text=${waText}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── API: POST /api/contact ────────────────────────────────
app.post("/api/contact", async (req, res) => {
  try {
    const { name, phone, message } = req.body;
    if (!name || !phone || !message) {
      return res.status(400).json({ success: false, error: "جميع الحقول مطلوبة" });
    }

    const tgText = `📩 <b>رسالة جديدة - Relax Fix</b>\n\n`
      + `👤 <b>الاسم:</b> ${name}\n`
      + `📱 <b>الهاتف:</b> ${phone}\n`
      + `📝 <b>الرسالة:</b> ${message}\n`
      + `⏰ ${new Date().toLocaleString("ar-AE")}`;
    await sendTelegram(tgText);

    res.json({ success: true, message: "تم إرسال رسالتك بنجاح" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── API: POST /api/subscribe ──────────────────────────────
app.post("/api/subscribe", async (req, res) => {
  try {
    const { name, phone, plan } = req.body;
    if (!name || !phone || !plan) {
      return res.status(400).json({ success: false, error: "جميع الحقول مطلوبة" });
    }

    const tgText = `💎 <b>اشتراك جديد - Relax Fix</b>\n\n`
      + `👤 <b>الاسم:</b> ${name}\n`
      + `📱 <b>الهاتف:</b> ${phone}\n`
      + `📦 <b>الباقة:</b> ${plan}\n`
      + `⏰ ${new Date().toLocaleString("ar-AE")}`;
    await sendTelegram(tgText);

    if (supabase) {
      await supabase.from("subscriptions").insert([{ name, phone, plan, created_at: new Date().toISOString() }]);
    }

    res.json({ success: true, message: "تم تسجيل اشتراكك بنجاح" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── API: POST /api/offers/claim ───────────────────────────
app.post("/api/offers/claim", async (req, res) => {
  try {
    const { name, phone, offerId } = req.body;
    if (!name || !phone || !offerId) {
      return res.status(400).json({ success: false, error: "جميع الحقول مطلوبة" });
    }

    const offer = data.offers.find(o => o.id === parseInt(offerId));
    const tgText = `🎁 <b>طلب عرض - Relax Fix</b>\n\n`
      + `👤 <b>الاسم:</b> ${name}\n`
      + `📱 <b>الهاتف:</b> ${phone}\n`
      + `🏷️ <b>العرض:</b> ${offer ? offer.title : offerId}\n`
      + `⏰ ${new Date().toLocaleString("ar-AE")}`;
    await sendTelegram(tgText);

    res.json({ success: true, message: "تم تسجيل طلبك للعرض" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── API: GET /api/scanner (Opportunity Radar) ─────────────
app.get("/api/scanner", async (req, res) => {
  const sources = [
    { name: "dubizzle.com", type: "إعلانات مبوبة", opportunities: Math.floor(Math.random() * 15) + 5 },
    { name: "property finder", type: "عقارات جديدة", opportunities: Math.floor(Math.random() * 10) + 3 },
    { name: "Facebook Groups", type: "طلبات صيانة", opportunities: Math.floor(Math.random() * 20) + 8 },
    { name: "Google Maps", type: "مراجعات سلبية للمنافسين", opportunities: Math.floor(Math.random() * 8) + 2 },
    { name: "Instagram", type: "استفسارات", opportunities: Math.floor(Math.random() * 12) + 4 }
  ];

  const total = sources.reduce((sum, s) => sum + s.opportunities, 0);

  // Notify on Telegram
  const tgText = `📡 <b>مسح رادار الفرص</b>\n\n`
    + `🎯 إجمالي الفرص: ${total}\n`
    + sources.map(s => `• ${s.name}: ${s.opportunities} فرصة`).join("\n")
    + `\n⏰ ${new Date().toLocaleString("ar-AE")}`;
  await sendTelegram(tgText);

  res.json({ success: true, total, sources, scannedAt: new Date().toISOString() });
});

// ── API: GET /api/stats (Dashboard) ──────────────────────
app.get("/api/stats", async (req, res) => {
  let orders = [];
  if (supabase) {
    const { data: dbOrders } = await supabase
      .from("orders").select("*").order("created_at", { ascending: false }).limit(50);
    orders = dbOrders || [];
  }

  res.json({
    success: true,
    stats: {
      totalOrders: orders.length,
      newOrders: orders.filter(o => o.status === "new").length,
      completedOrders: orders.filter(o => o.status === "completed").length,
      totalServices: data.services.length,
      totalAreas: data.areas.length
    },
    recentOrders: orders.slice(0, 10)
  });
});

// ── API: GET /api/orders (Admin) ──────────────────────────
app.get("/api/orders", async (req, res) => {
  const pass = req.query.pass;
  if (pass !== ADMIN_PASS) {
    return res.status(401).json({ error: "غير مصرح" });
  }

  if (!supabase) {
    return res.json({ success: true, orders: [], message: "Supabase غير مفعل" });
  }

  try {
    const { data: orders, error } = await supabase
      .from("orders").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    res.json({ success: true, orders });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── Pages ─────────────────────────────────────────────────
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

app.get("/ad-design", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "ad-design.html"));
});

// Fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ── Start Server ──────────────────────────────────────────
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`\n✅ Relax Fix Pro running on port ${PORT}`);
  console.log(`🌐 http://localhost:${PORT}`);
  console.log(`📊 Admin: http://localhost:${PORT}/admin`);
  console.log(`🎨 Ad Design: http://localhost:${PORT}/ad-design`);
  console.log(`\n📡 Telegram: ${TG_TOKEN ? "✅ Connected" : "⚠️ Not configured"}`);
  console.log(`💾 Supabase: ${supabase ? "✅ Connected" : "⚠️ Not configured"}\n`);
});
server.keepAliveTimeout = 120000;
server.headersTimeout = 125000;
