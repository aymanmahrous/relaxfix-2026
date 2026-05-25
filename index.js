import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { createClient } from "@supabase/supabase-js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// الاتصال الحقيقي بقاعدة بيانات Supabase الخاصة بك
const SUPABASE_URL = process.env.SUPABASE_URL || "https://nmzxrjdxvmmzzmajrskm.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_KEY || "sb_publishable_qXOPVaD5_f60qf1UbYrm2A_sH9c0lW5";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const PHONE = "971588259848"; 

// --- [API حقيقي] لجلب المواد والأسعار الحية من قاعدة البيانات ---
app.get('/api/live-materials', async (req, res) => {
    try {
        // سحب البيانات الحقيقية من جدول الخامات الذي أنشأته
        const { data, error } = await supabase
            .from('materials')
            .select('*');
            
        if (error) throw error;
        res.json({ success: true, materials: data });
    } catch (err) {
        // في حال عدم وجود بيانات في السحابة بعد، نرسل بيانات احترازية لضمان عمل الموقع
        res.json({ 
            success: false, 
            materials: [
                { material_name_ar: "سلك كهرباء 4 ملم", current_price: 280, trend: "up" },
                { material_name_ar: "صبغ جوتن فينوماستيك", current_price: 85, trend: "down" },
                { material_name_ar: "خلاط مياه إيطالي", current_price: 125, trend: "stable" }
            ] 
        });
    }
});

// تقديم الصفحة الرئيسية
app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RelaxFix 2026 | المنظومة الحية</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap" rel="stylesheet">
    <style>
        :root { --gold: #D4AF37; --bg: #080808; --card-bg: rgba(20, 20, 20, 0.9); }
        body { background: var(--bg); color: white; font-family: 'Cairo', sans-serif; margin: 0; padding: 0; text-align: center; }
        .container { padding: 20px; max-width: 550px; margin: 0 auto; }
        .gold-glow { color: var(--gold); text-shadow: 0 0 20px rgba(212, 175, 55, 0.6); font-size: 2.5rem; }
        .glass-card { background: var(--card-bg); border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 25px; padding: 20px; margin-bottom: 25px; text-align: right; }
        select, input { width: 100%; padding: 15px; margin: 10px 0; background: #000; border: 1px solid var(--gold); color: white; border-radius: 12px; box-sizing: border-box; }
        button { background: linear-gradient(45deg, #D4AF37, #F9E2AF); color: #000; border: none; width: 100%; padding: 16px; border-radius: 15px; font-weight: bold; cursor: pointer; font-family: 'Cairo'; }
    </style>
</head>
<body onload="loadLiveMarket()">

    <div class="container">
        <header>
            <h1 class="gold-glow">RELAXFIX 2026</h1>
            <p style="opacity: 0.6;">المنظومة الحقيقية لخدمة أسواق الإمارات</p>
        </header>

        <section class="glass-card">
            <h3>🧮 حاسبة الخدمات الفورية</h3>
            <select id="service-type">
                <option value="150">سباكة وصرف صحي / زيارة (150 درهم)</option>
                <option value="130">كهرباء وإنارة / زيارة (130 درهم)</option>
                <option value="220">صيانة تكييف / وحدة (220 درهم)</option>
            </select>
            <input type="number" id="units" placeholder="أدخل عدد الوحدات أو الزيارات">
            <button onclick="calculateAndOrder()">احسب التكلفة واطلب الخدمة الآن 💰</button>
            <div id="calc-result" style="text-align:center; color:var(--gold); margin-top:15px; font-weight:bold;"></div>
        </section>

        <section class="glass-card">
            <h3>📊 بورصة أسعار الخامات الحية</h3>
            <div id="market-list">جاري تحميل الأسعار الحقيقية من قاعدة البيانات...</div>
        </section>
    </div>

    <script>
        // دالة جلب البيانات الحية من السيرفر وقاعدة البيانات
        async function loadLiveMarket() {
            try {
                const response = await fetch('/api/live-materials');
                const data = await response.json();
                const listEl = document.getElementById('market-list');
                listEl.innerHTML = '';
                
                data.materials.forEach(item => {
                    let trendIcon = item.trend === 'up' ? '<span style="color:#ff4d4d;">▲</span>' : item.trend === 'down' ? '<span style="color:#00ff00;">▼</span>' : '●';
                    listEl.innerHTML += \`<div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                        <span>\${item.material_name_ar}</span>
                        <span>\${trendIcon} \${item.current_price} AED</span>
                    </div>\`;
                });
            } catch (err) {
                console.error("خطأ في جلب أسعار السوق:", err);
            }
        }

        function calculateAndOrder() {
            const selectEl = document.getElementById('service-type');
            const serviceName = selectEl.options[selectEl.selectedIndex].text;
            const price = selectEl.value;
            const q = document.getElementById('units').value;
            
            if(q > 0) {
                const total = price * q;
                document.getElementById('calc-result').innerText = \`الإجمالي: \${total} درهم إماراتي\`;
                
                const msgText = encodeURIComponent(
                    "🎯 *طلب صيانة حقيقي حجز لعام 2026*\\n\\n" +
                    "🛠️ *الخدمة:* " + serviceName + "\\n" +
                    "📊 *العدد/الكمية:* " + q + "\\n" +
                    "💰 *الإجمالي المحسوب:* " + total + " AED"
                );
                window.open("https://wa.me/${PHONE}?text=" + msgText, "_blank");
            }
        }
    </script>
</body>
</html>`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ [LIVE SERVER] RelaxFix is online on port ${PORT}`);
});
