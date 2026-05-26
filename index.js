import { createServer } from "http";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://nmzxrjdxvmmzzmajrskm.supabase.co",
  "sb_publishable_qXOPVaD5_f60qf1UbYrm2A_sH9c0lW5"
);

const PHONE = "971588259848";
const ADMIN_PASS = "123456";

// ============================================
// PREMIUM INTERACTIVE LAYOUT TEMPLATE
// ============================================

function premiumLayout(content, title = "Relaxfix2026 UAE") {
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="Relaxfix2026 - خدمات صيانة متخصصة في الإمارات: صيانة التكييف، تنظيف خزانات المياه، مكافحة الآفات">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;700;900&family=Sora:wght@400;600;700&display=swap" rel="stylesheet">
  
  <style>
    /* ===== CSS VARIABLES & THEME ===== */
    :root {
      --primary: #22c55e;
      --secondary: #0ea5e9;
      --accent: #facc15;
      --dark: #020814;
      --card-bg: #0f172a;
      --border-color: #1e293b;
      --text-primary: #f8fafc;
      --text-secondary: #cbd5e1;
      --radius-sm: 12px;
      --radius-md: 18px;
      --radius-lg: 28px;
      --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      
      /* Style.css Variables */
      --gold: #D4AF37;
      --glass: rgba(255, 255, 255, 0.08);
      --bg: #0a0a0a;
    }

    /* ===== GLOBAL RESET ===== */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      font-family: 'Sora', 'Tahoma', -apple-system, sans-serif;
      color: var(--text-primary);
      line-height: 1.6;
      background: #000;
      overflow-x: hidden;
      transition: font-size 0.3s ease;
    }

    /* =======================================
       1) العوالم الثلاثة التفاعلية (خلفية حية للموقع)
       ======================================= */
    .world-real {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e') center/cover no-repeat;
      filter: brightness(0.4);
      animation: realMove 40s linear infinite alternate;
      z-index: -3;
    }
    @keyframes realMove {
      0% { transform: scale(1); }
      100% { transform: scale(1.25); }
    }

    .world-neon {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: url('https://images.unsplash.com/photo-1535223289827-42f1e9919769') center/cover no-repeat;
      filter: brightness(0.35) saturate(1.8);
      animation: neonMove 20s ease-in-out infinite alternate;
      z-index: -3; display: none;
    }
    @keyframes neonMove {
      0% { transform: scale(1) rotate(0deg); }
      100% { transform: scale(1.15) rotate(1deg); }
    }

    .world-hybrid {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: url('https://images.unsplash.com/photo-1501785888041-af3ef285b470') center/cover no-repeat;
      filter: brightness(0.4) contrast(1.2);
      animation: hybridMove 30s ease-in-out infinite alternate;
      z-index: -3; display: none;
    }
    @keyframes hybridMove {
      0% { transform: scale(1); }
      100% { transform: scale(1.18); }
    }

    /* ===== HEADER ===== */
    header {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: rgba(2, 8, 20, 0.4);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(255, 215, 0, 0.15);
      animation: slideDown 0.6s ease-out;
    }

    @keyframes slideDown {
      from { transform: translateY(-100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .wrap {
      width: min(1280px, 95%);
      margin: 0 auto;
    }

    nav {
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
    }

    .logo {
      font-family: 'Geist', monospace;
      font-size: 28px;
      font-weight: 900;
      letter-spacing: -0.5px;
      background: linear-gradient(135deg, var(--gold), #fff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .nav-right {
      display: flex;
      gap: 12px;
      align-items: center;
    }

    /* ===== BUTTONS ===== */
    .btn {
      display: inline-block;
      padding: 12px 24px;
      border-radius: var(--radius-md);
      font-weight: 700;
      border: none;
      cursor: pointer;
      transition: var(--transition);
      position: relative;
      overflow: hidden;
      font-size: 15px;
      text-decoration: none;
    }

    .btn::before {
      content: ''; position: absolute; top: 50%; left: 50%; width: 0; height: 0;
      border-radius: 50%; background: rgba(255, 255, 255, 0.1);
      transform: translate(-50%, -50%); transition: width 0.6s, height 0.6s;
    }

    .btn:hover::before { width: 300px; height: 300px; }
    .btn-primary { background: linear-gradient(135deg, var(--primary), #16a34a); color: white; }
    .btn-secondary { background: linear-gradient(135deg, var(--secondary), #0284c7); color: white; }
    .btn-accent { background: var(--accent); color: #111; }
    
    .btn-gold {
      background: linear-gradient(45deg, #D4AF37, #F9E2AF);
      color: #000; font-weight: bold; width: 100%; padding: 15px; border-radius: 12px;
      margin-top: 10px; cursor: pointer;
    }

    /* ===== HERO SECTION ===== */
    .hero {
      position: relative;
      padding: 100px 0 60px;
      text-align: center;
    }

    .title {
      font-family: 'Geist', monospace;
      font-size: clamp(36px, 6vw, 64px);
      font-weight: 900;
      line-height: 1.2;
      margin-bottom: 20px;
      color: #ffd700;
      animation: glow 2s infinite alternate;
    }
    @keyframes glow {
      0% { text-shadow: 0 0 10px gold; }
      100% { text-shadow: 0 0 25px gold, 0 0 5px #fff; }
    }

    .subtitle {
      font-size: 22px;
      color: var(--text-secondary);
      animation: fadeIn 3s ease-in-out infinite alternate;
    }
    @keyframes fadeIn {
      0% { opacity: 0.4; }
      100% { opacity: 1; }
    }

    .zekr {
      text-align: center;
      margin: 30px auto;
      font-size: 24px;
      color: #00ffea;
      font-weight: bold;
      text-shadow: 0 0 8px rgba(0,255,234,0.3);
    }

    /* ===== SERVICES GRID (GLASSMORPHISM) ===== */
    .services-title {
      text-align: center;
      margin-top: 40px;
      font-size: 32px;
      color: #fff;
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 20px;
      margin: 30px auto 60px;
    }

    .service-card {
      background: var(--glass);
      backdrop-filter: blur(15px);
      -webkit-backdrop-filter: blur(15px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 30px 20px;
      border-radius: 20px;
      transition: var(--transition);
      cursor: pointer;
      text-align: center;
    }

    .service-card:hover {
      transform: scale(1.08) translateY(-5px);
      background: rgba(255, 215, 0, 0.2);
      border-color: var(--gold);
      box-shadow: 0 10px 30px rgba(212, 175, 55, 0.2);
    }

    .service-icon {
      font-size: 44px;
      margin-bottom: 15px;
      display: block;
    }

    .service-card h3 {
      font-size: 20px;
      font-weight: 700;
      color: #fff;
    }

    /* ===== BOOKING FORM CARD ===== */
    .booking-section {
      padding: 60px 0;
    }

    .form-card {
      background: rgba(15, 23, 42, 0.5);
      border: 1px solid rgba(214, 175, 55, 0.3);
      border-radius: var(--radius-lg);
      padding: 40px;
      backdrop-filter: blur(15px);
      -webkit-backdrop-filter: blur(15px);
      max-width: 650px;
      margin: 0 auto;
    }

    .form-card h2 {
      font-size: 28px;
      margin-bottom: 24px;
      text-align: center;
      color: var(--gold);
    }

    .form-group {
      margin-bottom: 18px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      font-size: 14px;
      color: var(--text-secondary);
    }

    input, textarea, select {
      width: 100%;
      padding: 14px 16px;
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: var(--radius-md);
      background: rgba(0, 0, 0, 0.5);
      color: var(--text-primary);
      font-family: inherit;
      font-size: 15px;
      transition: var(--transition);
    }

    input:focus, textarea:focus, select:focus {
      outline: none;
      border-color: var(--gold);
      box-shadow: 0 0 0 3px rgba(214, 175, 55, 0.2);
    }

    textarea { min-height: 120px; resize: vertical; }

    /* ===== GUEST REVIEWS ===== */
    .testimonials {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      margin: 40px 0;
    }

    .testimonial-card {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: var(--radius-md);
      padding: 25px;
      backdrop-filter: blur(10px);
    }

    .stars { color: var(--accent); margin-bottom: 12px; }

    /* =======================================
       2) غرفة التحكم العائمة (ثلاثية الأبعاد والمستقبلية)
       ======================================= */
    .control-panel {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: rgba(0, 0, 0, 0.85);
      border: 1px solid var(--gold);
      padding: 15px;
      border-radius: 20px;
      backdrop-filter: blur(15px);
      -webkit-backdrop-filter: blur(15px);
      width: 190px;
      z-index: 1001;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }

    .control-panel h4 {
      font-size: 13px;
      text-align: center;
      margin-bottom: 8px;
      color: var(--gold);
      border-bottom: 1px solid rgba(255,255,255,0.1);
      padding-bottom: 5px;
    }

    .control-panel button {
      width: 100%;
      margin: 4px 0;
      padding: 10px;
      background: linear-gradient(135deg, #ffd700, #D4AF37);
      border: none;
      border-radius: 10px;
      font-weight: bold;
      color: #000;
      cursor: pointer;
      transition: var(--transition);
      font-size: 13px;
    }

    .control-panel button:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(255,215,0,0.4);
    }

    /* ===== FLOATING CALL BUTTONS ===== */
    .float-buttons {
      position: fixed;
      left: 20px;
      bottom: 20px;
      z-index: 999;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .float-btn {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      font-size: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--transition);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
      text-decoration: none;
    }

    .float-call { background: var(--secondary); color: white; }
    .float-whatsapp { background: var(--primary); color: white; }
    .float-btn:hover { transform: scale(1.1) translateY(-5px); }

    /* ===== FOOTER SIG LINE ===== */
    .footer-sig { text-align: center; padding: 40px 0 120px; }
    .sig-line { width: 60px; height: 1px; background: var(--gold); margin: 10px auto; }

    footer {
      background: rgba(5, 5, 5, 0.85);
      padding: 60px 0 20px;
      border-top: 1px solid rgba(255,255,255,0.05);
      backdrop-filter: blur(10px);
    }

    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 40px;
      margin-bottom: 40px;
    }

    .footer-section h4 { color: var(--gold); margin-bottom: 20px; font-size: 18px; }
    .footer-section ul { list-style: none; }
    .footer-section ul li { margin-bottom: 10px; }
    .footer-section ul li a { color: var(--text-secondary); text-decoration: none; transition: var(--transition); }
    .footer-section ul li a:hover { color: var(--gold); padding-right: 5px; }

    @media (max-width: 768px) {
      .services-grid { grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); }
      .control-panel { bottom: auto; top: 20px; right: 10px; width: 150px; padding: 10px; }
      .control-panel button { padding: 8px; font-size: 11px; }
    }
  </style>
</head>
<body>

  <div class="world-real" id="real"></div>
  <div class="world-neon" id="neon"></div>
  <div class="world-hybrid" id="hybrid"></div>

  <header>
    <div class="wrap">
      <nav>
        <div class="logo">⚡ Relaxfix PRO</div>
        <div class="nav-right">
          <a href="tel:+${PHONE}" class="btn btn-secondary">📞 اتصل الآن</a>
          <a href="https://wa.me/${PHONE}" target="_blank" class="btn btn-primary">💬 واتساب</a>
        </div>
      </nav>
    </div>
  </header>

  ${content}

  <div class="control-panel">
    <h4>🌌 أبعاد الكون</h4>
    <button onclick="setWorld('real')">🌍 العالم الواقعي</button>
    <button onclick="setWorld('neon')">🌌 العالم المستقبلي</button>
    <button onclick="setWorld('hybrid')">🌀 العالم الهجين</button>
    <button onclick="toggleMusic()">🎵 تشغيل الموسيقى</button>
    <button onclick="biggerText()">🔠 حجم الخط</button>
  </div>

  <div class="float-buttons">
    <a href="tel:+${PHONE}" class="float-btn float-call" title="اتصل بنا">📞</a>
    <a href="https://wa.me/${PHONE}" target="_blank" class="float-btn float-whatsapp" title="تحدث عبر واتس اب">💬</a>
  </div>

  <footer>
    <div class="wrap">
      <div class="footer-content">
        <div class="footer-section">
          <h4>عن Relaxfix OS</h4>
          <p>منظومة صيانة رائدة ومستقبلية ومتكاملة تقدم خدمات فائقة الجودة في دولة الإمارات العربية المتحدة.</p>
        </div>
        <div class="footer-section">
          <h4>الخدمات الذكية</h4>
          <ul>
            <li><a href="#booking" onclick="scrollToBooking('صيانة التكييف')">صيانة التكييف</a></li>
            <li><a href="#booking" onclick="scrollToBooking('تنظيف خزانات')">تنظيف خزانات المياه</a></li>
            <li><a href="#booking" onclick="scrollToBooking('مكافحة الآفات')">مكافحة الآفات والحشرات</a></li>
            <li><a href="#booking" onclick="scrollToBooking('سباكة')">أعمال السباكة والكهرباء</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>قنوات الاتصال</h4>
          <ul>
            <li>☎️ +971 58 825 9848</li>
            <li>📧 contact@relaxfix.ae</li>
            <li>⏰ دعم فني متاح على مدار 24 ساعة</li>
          </ul>
        </div>
      </div>
      
      <div class="footer-sig">
        <div class="sig-line"></div>
        <p style="color: var(--gold); font-weight: bold; font-size:16px;">By Ayman Mahrous</p>
        <p style="font-size: 13px; color: var(--text-secondary); margin-top:5px;">&copy; 2026 Relaxfix UAE. جميع الحقوق محفوظة.</p>
      </div>
    </div>
  </footer>

  <script>
    // نظام إدارة الميديا والموسيقى المحيطية من index 2
    let music = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_7e8e9e3d7a.mp3?filename=future-technology-ambient-110397.mp3");
    let big = false;

    function setWorld(w){
      document.getElementById("real").style.display="none";
      document.getElementById("neon").style.display="none";
      document.getElementById("hybrid").style.display="none";
      document.getElementById(w).style.display="block";
    }

    function toggleMusic(){
      if(music.paused) {
        music.play().catch(err => console.log("بحاجة لتفاعل المستخدم أولاً"));
      } else {
        music.pause();
      }
    }

    function biggerText(){
      big = !big;
      document.body.style.fontSize = big ? "20px" : "16px";
    }

    function scrollToBooking(service) {
      const selectElement = document.getElementById('serviceSelect');
      if(selectElement) {
         selectElement.value = service;
      }
      document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
    }
  </script>
</body>
</html>`;
}

// ============================================
// HOME PAGE INTERACTIVE HUB
// ============================================

function homePage() {
  return premiumLayout(`
    <section class="hero">
      <div class="wrap">
        <h1 class="title">RelaxFix PRO OS — Immersive Universe</h1>
        <div class="subtitle">جيل فريد من خدمات الصيانة المستقبلية الفاخرة</div>
        <div class="zekr">﴿ اذْكُرُوا اللَّهَ ذِكْرًا كَثِيرًا ﴾</div>
      </div>
    </section>

    <section>
      <div class="wrap">
        <h2 class="services-title">خدماتنا التخصصية الذكية</h2>
        <div class="services-grid">
          <div class="service-card" onclick="scrollToBooking('دهانات')">
            <span class="service-icon">🎨</span>
            <h3>دهانات</h3>
          </div>
          <div class="service-card" onclick="scrollToBooking('سيراميك')">
            <span class="service-icon">🧱</span>
            <h3>سيراميك</h3>
          </div>
          <div class="service-card" onclick="scrollToBooking('سباكة')">
            <span class="service-icon">🚰</span>
            <h3>سباكة</h3>
          </div>
          <div class="service-card" onclick="scrollToBooking('كهرباء')">
            <span class="service-icon">⚡</span>
            <h3>كهرباء</h3>
          </div>
          <div class="service-card" onclick="scrollToBooking('صيانة التكييف')">
            <span class="service-icon">❄️</span>
            <h3>صيانة التكييف</h3>
          </div>
          <div class="service-card" onclick="scrollToBooking('نجارة')">
            <span class="service-icon">🪚</span>
            <h3>نجارة</h3>
          </div>
          <div class="service-card" onclick="scrollToBooking('جبسون بورد')">
            <span class="service-icon">📐</span>
            <h3>جبسون بورد</h3>
          </div>
          <div class="service-card" onclick="scrollToBooking('عوازل')">
            <span class="service-icon">🛡️</span>
            <h3>عوازل</h3>
          </div>
          <div class="service-card" onclick="scrollToBooking('مكافحة الآفات')">
            <span class="service-icon">🐜</span>
            <h3>مكافحة الحشرات</h3>
          </div>
          <div class="service-card" onclick="scrollToBooking('تنظيف خزانات')">
            <span class="service-icon">💧</span>
            <h3>تبريد وتنظيف خزانات</h3>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="wrap">
        <h2 style="text-align: center; color: var(--gold); margin-bottom: 20px;">آراء عملائنا في المنظومة</h2>
        <div class="testimonials">
          <div class="testimonial-card">
            <div class="stars">★★★★★</div>
            <p>"خدمة ممتازة وسريعة جداً، الفنيون محترفون جداً وأسعار عادلة"</p>
            <div style="font-weight: bold; margin-top: 10px; font-size:13px; color: var(--gold);">- محمد علي</div>
          </div>
          <div class="testimonial-card">
            <div class="stars">★★★★★</div>
            <p>"حجزت عبر الموقع والخدمة جاءت في نفس اليوم، تجربة العوالم مبهرة!"</p>
            <div style="font-weight: bold; margin-top: 10px; font-size:13px; color: var(--gold);">- فاطمة محمد</div>
          </div>
        </div>
      </div>
    </section>

    <section id="booking" class="booking-section">
      <div class="wrap">
        <div class="form-card">
          <h2>احجز خدمتك الفنية الآن</h2>
          <form method="POST" action="/submit-booking">
            <div class="form-group">
              <label>الاسم الكامل</label>
              <input type="text" name="name" required placeholder="أدخل اسمك الكريم">
            </div>
            <div class="form-group">
              <label>رقم الهاتف</label>
              <input type="tel" name="phone" required placeholder="مثال: 0588259848">
            </div>
            <div class="form-group">
              <label>الخدمة المطلوبة</label>
              <select name="service" id="serviceSelect" required>
                <option value="">اختر الخدمة المطلوبة</option>
                <option value="دهانات">دهانات</option>
                <option value="سيراميك">سيراميك</option>
                <option value="سباكة">سباكة</option>
                <option value="كهرباء">كهرباء</option>
                <option value="صيانة التكييف">صيانة التكييف</option>
                <option value="نجارة">نجارة</option>
                <option value="جبسون بورد">جبسون بورد</option>
                <option value="عوازل">عوازل</option>
                <option value="مكافحة الآفات">مكافحة الحشرات</option>
                <option value="تنظيف خزانات">تبريد وتنظيف خزانات</option>
              </select>
            </div>
            <div class="form-group">
              <label>تفاصيل الطلب والموقع الجغرافي</label>
              <textarea name="notes" required placeholder="اكتب تفاصيل العطل أو الخدمة وعنوانك هنا..."></textarea>
            </div>
            <button type="submit" class="btn-gold">🚀 تأكيد وإرسال الطلب عبر واتساب</button>
          </form>
        </div>
      </div>
    </section>
  `);
}

// ============================================
// ADMIN PANEL (DASHBOARD)
// ============================================

function adminPanel() {
  return premiumLayout(`
    <section style="padding: 60px 0;">
      <div class="wrap">
        <h1 style="color: var(--gold); margin-bottom: 20px; text-align:center;">📊 لوحة التحكم والمراقبة الذكية</h1>
        <div style="max-width: 400px; margin: 0 auto 40px; text-align: center;">
          <input id="pass" type="password" placeholder="أدخل كلمة مرور المسؤول" style="text-align: center; margin-bottom: 15px;">
          <button class="btn btn-gold" onclick="loadData()" style="width: auto; padding: 10px 30px;">فتح اللوحة</button>
        </div>
        
        <div class="panel" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 40px; text-align: center;">
          <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 15px; border: 1px solid rgba(255,255,255,0.1);">
            <strong id="total" style="font-size: 32px; color: #fff;">0</strong><br>
            <span style="color: var(--text-secondary);">إجمالي الطلبات</span>
          </div>
          <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 15px; border: 1px solid rgba(255,255,255,0.1);">
            <strong id="newCount" style="font-size: 32px; color: var(--accent);">0</strong><br>
            <span style="color: var(--text-secondary);">طلبات جديدة</span>
          </div>
          <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 15px; border: 1px solid rgba(255,255,255,0.1);">
            <strong id="doneCount" style="font-size: 32px; color: var(--primary);">0</strong><br>
            <span style="color: var(--text-secondary);">مكتملة</span>
          </div>
        </div>

        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; background: #0f172a; border-radius: 12px; overflow: hidden;">
            <thead>
              <tr style="background: rgba(214, 175, 55, 0.2); color: var(--gold);">
                <th style="padding: 16px; text-align: right;">الاسم</th>
                <th style="padding: 16px; text-align: right;">الهاتف</th>
                <th style="padding: 16px; text-align: right;">الخدمة</th>
                <th style="padding: 16px; text-align: right;">التفاصيل</th>
                <th style="padding: 16px; text-align: right;">الحالة</th>
                <th style="padding: 16px; text-align: right;">الإجراءات</th>
              </tr>
            </thead>
            <tbody id="rows">
              <tr><td colspan="6" style="padding: 20px; text-align: center; color: var(--text-secondary);">يرجى إدخال كلمة المرور وضغط فتح اللوحة</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <script>
      let allData = [];
      async function loadData() {
        const pass = document.getElementById("pass").value;
        const res = await fetch("/api/getdata?pass=" + encodeURIComponent(pass));
        if (res.status !== 200) { alert("كلمة المرور خاطئة!"); return; }
        allData = await res.json();
        
        document.getElementById("total").innerText = allData.length;
        document.getElementById("newCount").innerText = allData.filter(x => x.status !== 'done').length;
        document.getElementById("doneCount").innerText = allData.filter(x => x.status === 'done').length;
        renderRows();
      }

      function renderRows() {
        const rows = document.getElementById("rows");
        rows.innerHTML = "";
        allData.forEach(x => {
          const tr = document.createElement("tr");
          tr.style.borderBottom = "1px solid rgba(255,255,255,0.05)";
          const statusColor = x.status === "done" ? "color: #22c55e" : "color: #facc15";
          
          tr.innerHTML = 
            "<td style='padding: 14px 16px;'>" + (x.name || "") + "</td>" +
            "<td style='padding: 14px 16px;'><a href='tel:" + x.phone + "' style='color: #0ea5e9; text-decoration:none;'>" + x.phone + "</a></td>" +
            "<td style='padding: 14px 16px;'>" + (x.service || "") + "</td>" +
            "<td style='padding: 14px 16px; max-width:200px; overflow:hidden;'>" + (x.notes || "") + "</td>" +
            "<td style='padding: 14px 16px; " + statusColor + "'>" + (x.status || "new") + "</td>" +
            "<td style='padding: 14px 16px;'>" +
              "<button style='background:#22c55e; border:none; padding:5px 10px; border-radius:5px; cursor:pointer; margin-left:5px;' onclick=\\"setStatus('" + x.id + "','done')\\">✓ اكتمل</button>" +
              "<button style='background:#ef4444; border:none; padding:5px 10px; border-radius:5px; cursor:pointer;' onclick=\\"delRow('" + x.id + "')\\">✕ حذف</button>" +
            "</td>";
          rows.appendChild(tr);
        });
      }

      async function setStatus(id, status) {
        const pass = document.getElementById("pass").value;
        await fetch("/api/status?pass=" + encodeURIComponent(pass), {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({id, status})
        });
        loadData();
      }

      async function delRow(id) {
        if(!confirm("هل أنت متأكد من الحذف؟")) return;
        const pass = document.getElementById("pass").value;
        await fetch("/api/delete?pass=" + encodeURIComponent(pass), {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({id})
        });
        loadData();
      }
    </script>
  `, "لوحة المراقبة الذكية");
}

// ============================================
// SERVER APPLICATION LOGIC (NODE.JS)
// ============================================

const server = createServer(async (req, res) => {
  try {
    // 1) Submit Booking Route
    if (req.method === "POST" && req.url === "/submit-booking") {
      let body = "";
      req.on("data", chunk => body += chunk.toString());
      req.on("end", async () => {
        const params = new URLSearchParams(body);
        const order = {
          name: params.get("name"),
          phone: params.get("phone"),
          service: params.get("service"),
          notes: params.get("notes"),
          status: "new"
        };

        // Insert into Supabase database
        await supabase.from("requests").insert([order]);

        // Build WhatsApp Message Text
        const msg = encodeURIComponent(
          "🚨 *طلب صيانة جديد (RelaxFix PRO)* 🚨\n\n" +
          "👤 *الاسم:* " + order.name + "\n" +
          "📱 *الهاتف:* " + order.phone + "\n" +
          "🛠️ *الخدمة:* " + order.service + "\n" +
          "📝 *التفاصيل:* " + order.notes
        );

        const waUrl = "https://wa.me/" + PHONE + "?text=" + msg;

        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(premiumLayout(`
          <section style="padding: 100px 0; text-align: center;">
            <div class="wrap" style="max-width: 600px; margin: 0 auto; background: rgba(255,255,255,0.05); padding: 40px; border-radius:20px; border: 1px solid var(--gold);">
              <h1 style="color: var(--primary); margin-bottom: 20px; font-size: 36px;">✅ تم حفظ وتأكيد طلبك</h1>
              <p style="margin-bottom: 30px; font-size:18px;">شكرًا لاختيارك منصة RelaxFix PRO. سيتم فتح تطبيق الـ WhatsApp الآن لتسريع التواصل الفني الفوري.</p>
              <a href="${waUrl}" target="_blank" class="btn btn-primary" style="font-size: 18px; padding: 16px 32px; display:inline-block; margin-bottom:20px;">📱 فتح واتساب يدويًا</a>
              <br>
              <a href="/" style="color: var(--gold); text-decoration: none; font-weight: bold;">العودة إلى الصفحة الرئيسية</a>
              <script>setTimeout(() => { window.open("${waUrl}", "_blank"); }, 1000);</script>
            </div>
          </section>
        `, "تم إرسال الطلب بنجاح"));
      });
      return;
    }

    // 2) API Routes for Control Panel
    const parsedUrl = new URL(req.url, "http://localhost");
    
    if (req.method === "GET" && parsedUrl.pathname === "/api/getdata") {
      if (parsedUrl.searchParams.get("pass") !== ADMIN_PASS) {
        res.writeHead(401); res.end(JSON.stringify({ error: "غير مصرح" })); return;
      }
      const { data } = await supabase.from("requests").select("*").order("created_at", { ascending: false });
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data || []));
      return;
    }

    if (req.method === "POST" && parsedUrl.pathname === "/api/status") {
      if (parsedUrl.searchParams.get("pass") !== ADMIN_PASS) {
        res.writeHead(401); res.end(JSON.stringify({ error: "غير مصرح" })); return;
      }
      let body = ""; req.on("data", c => body += c.toString());
      req.on("end", async () => {
        const p = JSON.parse(body || "{}");
        await supabase.from("requests").update({ status: p.status }).eq("id", p.id);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true }));
      });
      return;
    }

    if (req.method === "POST" && parsedUrl.pathname === "/api/delete") {
      if (parsedUrl.searchParams.get("pass") !== ADMIN_PASS) {
        res.writeHead(401); res.end(JSON.stringify({ error: "غير مصرح" })); return;
      }
      let body = ""; req.on("data", c => body += c.toString());
      req.on("end", async () => {
        const p = JSON.parse(body || "{}");
        await supabase.from("requests").delete().eq("id", p.id);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true }));
      });
      return;
    }

    // 3) Admin View Route
    if (req.method === "GET" && parsedUrl.pathname === "/admin") {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(adminPanel());
      return;
    }

    // 4) Home Page View Route
    if (req.method === "GET" && (parsedUrl.pathname === "/" || parsedUrl.pathname === "/index.html")) {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(homePage());
      return;
    }

    // Page Not Found
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");

  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error: " + err.message);
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server is running flawlessly on port ${PORT}`);
});
