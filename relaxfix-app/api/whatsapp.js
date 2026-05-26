import axios from "axios";

const WHATSAPP_NUMBER = "00971588259848";

export default async function sendWhatsApp(message) {
  try {
    console.log("WhatsApp Message Sent To:", WHATSAPP_NUMBER);
    console.log("Message:", message);
  } catch (err) {
    console.error("WhatsApp Error:", err.message);
  }
}
