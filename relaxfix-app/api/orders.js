import telegram from "./telegram.js"; 
import whatsapp from "./whatsapp.js"; 

// تأكد من إضافة النقطة والسلاش (./) قبل اسم الملف
// وتأكد من وجود الامتداد .js في النهاية

export default async function (req, res) {
    try {
        // منطق جلب الطلبات (Orders) هنا
        res.status(200).json({ success: true, data: [] });
    } catch (error) {
        console.error("Orders Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}
