import { createClient } from "@supabase/supabase-js";
import { whatsappService } from "../../services/whatsappService.js";
import { z } from "zod";

// تأكد من إضافة SUPABASE_URL و SUPABASE_SERVICE_ROLE_KEY إلى متغيرات البيئة (GitHub Secrets / Render)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Schema للتحقق من صحة بيانات الطلب - عدّل الحقول حسب احتياجك
const OrderSchema = z.object({
  userId: z.string().min(1),
  name: z.string().min(2),
  phone: z.string().min(6),
  service: z.string().optional(),
  area: z.string().optional(),
  date: z.string().optional(),
  time: z.string().optional(),
  notes: z.string().optional()
});

export default async function (req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ success: false, message: "Method Not Allowed" });
    }

    const parse = OrderSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ success: false, errors: parse.error.format() });
    }

    const orderData = parse.data;
    const userId = orderData.userId;

    // محاولة التنفيذ الذري عبر RPC مخصص في Postgres (مفضل)
    // يُنصح بإنشاء الدالة create_order_with_decrement في قاعدة Supabase (انظر db/create_order_with_decrement.sql)
    try {
      const { data: rpcData, error: rpcError } = await supabase.rpc(
        "create_order_with_decrement",
        {
          user_id_input: userId,
          order_json: orderData,
          decrement_amount: 1
        }
      );

      if (rpcError) {
        console.error("RPC error:", rpcError);
        // لا نكسر التجربة هنا إن فشل RPC - سنحاول المسار البديل
        throw rpcError;
      }

      // الإخطار لا ينبغي أن يوقف العملية
      try {
        await whatsappService.notifyAdminOfOrder(rpcData?.inserted_order || orderData);
      } catch (notifyErr) {
        console.warn("WhatsApp notify failed:", notifyErr);
      }

      return res.status(201).json({ success: true, message: "تم حفظ الطلب ومعالجة الرصيد بنجاح", order: rpcData });
    } catch (atomicErr) {
      console.warn("Atomic RPC failed, falling back to safe sequence:", atomicErr?.message || atomicErr);
    }

    // مسار بديل إذا لم تكن دالة RPC موجودة: تحقق وخصم ثم إدراج
    const { data: wallet, error: walletError } = await supabase
      .from("user_wallets")
      .select("balance_credits")
      .eq("user_id", userId)
      .single();

    if (walletError && walletError.code !== "PGRST116") {
      console.error("wallet error:", walletError);
      // لا نكسر العملية هنا لكن نعلم
    }

    if (wallet && wallet.balance_credits > 0) {
      const { error: decErr } = await supabase.rpc("decrement_credits", { user_id_input: userId, amount: 1 });
      if (decErr) {
        console.error("decrement_credits error:", decErr);
        return res.status(500).json({ success: false, message: "فشل خصم الرصيد" });
      }
    }

    // حفظ الطلب
    const { data: inserted, error: insertError } = await supabase
      .from("orders")
      .insert([{ ...orderData, status: "new", created_at: new Date() }])
      .select("*")
      .single();

    if (insertError) {
      console.error("insert order error:", insertError);
      return res.status(500).json({ success: false, message: "فشل حفظ الطلب" });
    }

    // إرسال إشعار واتساب (إن فشل، نكمل العملية ونسجل الخطأ)
    try {
      await whatsappService.notifyAdminOfOrder(inserted);
    } catch (notifyErr) {
      console.warn("WhatsApp notify failed:", notifyErr);
    }

    return res.status(201).json({ success: true, message: "تم استقبال الطلب", orderId: inserted.id });
  } catch (err) {
    console.error("Unhandled error in order handler:", err);
    return res.status(500).json({ success: false, message: "خطأ داخلي بالخادم" });
  }
}
