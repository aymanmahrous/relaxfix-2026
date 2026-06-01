require('dotenv').config();
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL || "https://nmzxrjdxvmmzzmajrskm.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const PHONE = process.env.PHONE_NUMBER || "971588259848";
const ADMIN_PASS = process.env.ADMIN_PASS || "123456";

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
`;
}

export default premiumLayout;
