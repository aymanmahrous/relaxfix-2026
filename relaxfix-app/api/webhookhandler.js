import { createClient } from "@supabase/supabase-js";
import axios from "axios";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

export default async function (req, res) {
    const event = req.body;

    try {
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            const userId = session.client_reference_id;

            // 1. إضافة فاتورة جديدة
            await supabase.from('invoices').insert([{
                user_id: userId,
                amount: session.amount_total / 100,
                status: 'paid'
            }]);

            // 2. تحديث الرصيد (Credits)
            await supabase.rpc('increment_balance', { user_id_input: userId, amount: 100 });

            // 3. إشعار تليجرام تلقائي
            await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
                chat_id: process.env.TELEGRAM_CHAT_ID,
                text: "✅ تم استلام دفعة جديدة بنجاح وتحديث الرصيد!"
            });
        }
        res.status(200).send("Webhook Handled");
    } catch (err) {
        res.status(400).send(`Error: ${err.message}`);
    }
}
