import { createClient } from "@supabase/supabase-js";
import { whatsappService } from "../../services/whatsappService.js";

const supabase = createClient(
    "https://nmzxrjdxvmmzzmajrskm.supabase.co",
    "EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // المفتاح الذي وضعته في الصورة
);

export default async function (req, res) {
    try {
        const orderData = req.body;
        const userId = orderData.userId;

        // 1. خصم عملة واحدة مقابل الطلب (إذا كان هناك نظام رصيد)
        const { data: wallet } = await supabase
            .from('user_wallets')
            .select('balance_credits')
            .eq('user_id', userId)
            .single();

        if (wallet && wallet.balance_credits > 0) {
            await supabase.rpc('decrement_credits', { user_id_input: userId, amount: 1 });
        }

        // 2. إرسال إشعار واتساب للإدارة
        await whatsappService.notifyAdminOfOrder(orderData);

        // 3. حفظ الطلب
        const { error } = await supabase.from("orders").insert([orderData]);
        if (error) throw error;

        res.status(200).json({ success: true, message: "تم استقبال الطلب وتحديث الرصيد" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}
