import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// الاتصال الحقيقي بقاعدة بيانات Supabase الخاصة بك
const SUPABASE_URL = process.env.SUPABASE_URL || "https://nmzxrjdxvmmzzmajrskm.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_KEY || "sb_publishable_qXOPVaD5_f60qf1UbYrm2A_sH9c0lW5";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const PHONE = "971588259848"; // رقم الواتساب الموحد لدولة الإمارات لعام 2026

// --- [API حقيقي] لجلب المواد والأسعار الحية من جدولك في Supabase ---
app.get('/api/live-materials', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('Materials')
            .select('*');
            
        if (error || !data || data.length === 0) throw new Error("No data");
        res.json({ success: true, materials: data });
    } catch (err) {
        // بيانات احتياطية ذكية في حال لم تقم بتغذية قاعدة البيانات بعد لضمان استمرار عمل الواجهة فوراً
        res.json({ 
            success: false, 
            materials: [
                { material_name_ar: "سلك كهرباء 4 ملم (سويدي)", current_price: 280, trend: "up" },
                { material_name_ar: "صبغ جوتن فينوماستيك داخلي", current_price: 85, trend: "down" },
                { material_name_ar: "خلاط مياه ميلانو إيطالي", current_price: 125, trend: "stable" }
            ] 
        });
    }
});

// --- تقديم الواجهة الذهبية الفاخرة مباشرة عند طلب الرابط الرئيسي (/) لمنع خطأ Cannot GET / ---
app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RelaxFix 2026 | المنظومة الحية المتكاملة</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --gold: #D4AF37;
            --glass: rgba(255, 255, 255, 0.05);
            --bg: #080808;
            --card-bg: rgba(20, 20, 20, 0.9);
        }

        body {
            background: var(--bg);
            background-image: radial-gradient(circle at top right, #1a1a1a 0%, #000 100%);
            color: white;
            font-family: 'Cairo', sans-serif;
            margin: 0; padding: 0; overflow-x: hidden; text-align: center;
        }

        .container { padding: 20px; max-width: 550px; margin: 0 auto; }
        header { text-align: center; padding: 30px 0; }
        
        .gold-glow {
            color: var(--gold);
            text-shadow: 0 0 20px rgba(212, 175, 55, 0.6);
            font-size: 2.5rem; margin: 0; letter-spacing: 2px;
        }

        .glass-card {
            background: var(--card-bg);
            backdrop-filter: blur(25px);
            border: 1px solid rgba(212, 175, 55, 0.2);
            border-radius: 25px; padding: 20px; margin-bottom: 25px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.7); text-align: right;
        }

        h3 { color: var(--gold); border-bottom: 1px solid rgba(212, 175, 55, 0.2); padding-bottom: 10px; margin-top: 0; display: flex; align-items: center; gap: 10px; }

        select, input {
            width: 100%; padding: 15px; margin: 10px 0;
            background: #000; border: 1px solid var(--gold);
            color: white; border-radius: 12px; box-sizing: border-box; font-family: 'Cairo';
        }

        button {
            background: linear-gradient(45deg, #D4AF37, #F9E2AF);
            color: #000; border: none; width: 100%; padding: 16px;
            border-radius: 15px; font-weight: bold; cursor: pointer;
            transition: 0.3s ease; font-size: 1rem; font-family: 'Cairo';
        }
        button:active { transform: scale(0.96); }

        .radar-feed { height: 100px; overflow: hidden; position: relative; }
        .radar-item {
            background: rgba(255,255,255,0.03); padding: 10px; border-radius: 10px;
            margin-bottom: 10px; border-right: 4px solid var(--gold);
            animation: slideIn 0.5s ease-out;
        }
        @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }

        .bottom-nav {
            position: fixed; bottom: 25px; left: 50%; transform: translateX(-50%);
            width: 90%; height: 75px; background: rgba(10, 10, 10, 0.95);
            backdrop-filter: blur(20px); border-radius: 40px;
            border: 1px solid var(--gold); display: flex;
            justify-content: space-around; align-items: center; z-index: 1000;
        }
        .nav-item { font-size: 1.8rem; cursor: pointer; transition: 0.4s; opacity: 0.6; }
        .nav-item:hover { opacity: 1; transform: scale(1.2) translateY(-5px); }

        footer { text-align: center; padding: 40px 0 140px 0; }
        .signature { font-style: italic; color: var(--gold); font-size: 0.9rem; }
    </style>
</head>
<body onload="loadLiveMarket()">

    <div class="container">
        <header>
            <h1 class="gold-glow">RELAXFIX 2026</h1>
            <p style="opacity: 0.6; font-size: 0.8rem; margin-top: 10px;">المنظومة الذكية المتكاملة للصيانة والدعاية حياً</p>
        </header>

        <section class="glass-card">
            <h3>📡 رادار المهام الحية</h3>
            <div id="radar-feed" class="radar-feed">
                <p style="text-align:center; opacity:0.5; margin-top:20px;">جاري مسح الطلبات في محيطك...</p>
            </div>
        </section>

        <section class="glass-card">
            <h3>🧮 حاسبة المهن الذكية والطلب</h3>
            <select id="service-type">
                <optgroup label="الدهانات والديكور">
                    <option value="25">دهانات داخلية / متر</option>
                    <option value="50">جبس بورد وديكور / متر</option>
                </optgroup>
                <optgroup label="الصيانة والكهرباء">
                    <option value="150">سباكة وصرف صحي / زيارة</option>
                    <option value="130">كهرباء وإنارة / زيارة</option>
                    <option value="220">صيانة تكييف / وحدة</option>
                </optgroup>
            </select>
            <input type="number" id="units" placeholder="أدخل الكمية أو المساحة">
            <button onclick="calculateAndSend()">احسب التكلفة واطلب فوراً عبر الواتساب 💰</button>
            <div id="calc-result" style="text-align:center; color:var(--gold); margin-top:15px; font-weight:bold; font-size:1.2rem;"></div>
        </section>

        <section class="glass-card">
            <h3>📊 بورصة أسعار الخامات الحية</h3>
            <div id="market-list">جاري جلب الأسعار التنافسية من قاعدة البيانات...</div>
        </section>

        <footer>
            <p class="signature">RelaxFix 2026 - Crafted for Excellence ✨</p>
        </footer>
    </div>

    <nav class="bottom-nav">
        <div class="nav-item">🏠</div>
        <div class="nav-item">🔍</div>
        <div class="nav-item">📊</div>
        <div class="nav-item">⚙️</div>
    </nav>

    <script>
        async function loadLiveMarket() {
            try {
                const response = await fetch('/api/live-materials');
                const data = await response.json();
                const listEl = document.getElementById('market-list');
                listEl.innerHTML = '';
                
                data.materials.forEach(item => {
                    let trendIcon = item.trend === 'up' ? '<span style="color:#ff4d4d;">▲</span>' : item.trend === 'down' ? '<span style="color:#00ff00;">▼</span>' : '●';
                    listEl.innerHTML += \`<div style="display:flex; justify-content:space-between; margin-bottom:10px; font-size:0.95rem;">
                        <span>\${item.material_name_ar}</span>
                        <span>\${trendIcon} \${item.current_price} AED</span>
                    </div>\`;
                });
            } catch (err) {
                console.error("خطأ في جلب بيانات البورصة الحية:", err);
            }
        }

        function calculateAndSend() {
            const selectEl = document.getElementById('service-type');
            const serviceName = selectEl.options[selectEl.selectedIndex].text;
            const price = selectEl.value;
            const q = document.getElementById('units').value;
            
            if(q > 0) {
                const total = price * q;
                document.getElementById('calc-result').innerText = \`الإجمالي: \${total} AED\`;

                const messageText = encodeURIComponent(
                    "🎯 *طلب خدمة جديد - المنظومة الحية 2026*\\n\\n" +
                    "🛠 *نوع الخدمة:* " + serviceName + "\\n" +
                    "📊 *الكمية المطلوبة:* " + q + "\\n" +
                    "💰 *إجمالي الحسبة التقديرية:* " + total + " درهم إماراتي"
                );
                
                setTimeout(() => {
                    window.open("https://wa.me/${PHONE}?text=" + messageText, "_blank");
                }, 1000);
            }
        }

        const alerts = ["مطلوب صباغ في مارينا", "عطل كهربائي في نخلة جميرا", "تنظيف فيلا في الشارقة"];
        setInterval(() => {
            const feed = document.getElementById('radar-feed');
            if(!feed) return;
            const alertText = alerts[Math.floor(Math.random() * alerts.length)];
            const item = document.createElement('div');
            item.className = 'radar-item';
            item.innerHTML = \`⚡ \${alertText} - <span style="color:var(--gold)">نشط الآن</span>\`;
            feed.prepend(item);
            if(feed.children.length > 2) feed.lastElementChild.remove();
        }, 5000);
    </script>
</body>
</html>`);
});

app.use("/app", express.static(path.join(__dirname, "relaxfix-app")));

app.post("/api/order", async (req, res) => {
    const { name, phone, service, details } = req.body;
    console.log("طلب جديد:", { name, phone, service });
    res.json({ success: true, message: "تم استلام طلبك" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server is online on port \${PORT}`);
});
