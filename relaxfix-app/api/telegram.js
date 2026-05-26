import telegram from "./telegram.js"; 
import whatsapp from "./whatsapp.js"; 

export default async function orderHandler(req, res) {
    try {
        const orderData = req.body;
        await telegram(orderData);
        // await whatsapp(orderData); // فعلها إذا كان الملف جاهزاً
        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Internal Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}
