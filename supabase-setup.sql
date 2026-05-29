-- ═══════════════════════════════════════════════════════════
-- Relax Fix Pro - Supabase Database Setup
-- Run this in your Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════

-- جدول الطلبات
CREATE TABLE IF NOT EXISTS orders (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name         TEXT NOT NULL,
  phone        TEXT NOT NULL,
  service      TEXT NOT NULL,
  area         TEXT,
  message      TEXT,
  status       TEXT DEFAULT 'new',
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- جدول الاشتراكات
CREATE TABLE IF NOT EXISTS subscriptions (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name         TEXT NOT NULL,
  phone        TEXT NOT NULL,
  plan         TEXT NOT NULL,
  status       TEXT DEFAULT 'active',
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- جدول الرسائل
CREATE TABLE IF NOT EXISTS messages (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name         TEXT NOT NULL,
  phone        TEXT NOT NULL,
  message      TEXT NOT NULL,
  read         BOOLEAN DEFAULT FALSE,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- تفعيل RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- سماح للـ service role بالكتابة والقراءة
CREATE POLICY "service role full access on orders" ON orders
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "service role full access on subscriptions" ON subscriptions
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "service role full access on messages" ON messages
  FOR ALL USING (auth.role() = 'service_role');

-- Indexes لسرعة الاستعلام
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_subscriptions_created_at ON subscriptions(created_at DESC);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);

-- دالة جلب الطلبات الجديدة
CREATE OR REPLACE FUNCTION get_new_orders()
RETURNS SETOF orders AS $$
  SELECT * FROM orders WHERE status = 'new' ORDER BY created_at DESC;
$$ LANGUAGE sql SECURITY DEFINER;

-- دالة إحصائيات
CREATE OR REPLACE FUNCTION get_stats()
RETURNS JSON AS $$
  SELECT json_build_object(
    'total_orders', (SELECT COUNT(*) FROM orders),
    'new_orders', (SELECT COUNT(*) FROM orders WHERE status = 'new'),
    'total_subscriptions', (SELECT COUNT(*) FROM subscriptions),
    'total_messages', (SELECT COUNT(*) FROM messages)
  );
$$ LANGUAGE sql SECURITY DEFINER;
