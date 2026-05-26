import { supabase } from "../supabase.js";

export default async function update(req, res) {
  try {
    const { id, status } = req.body;

    if (!id || !status) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const { data, error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error("Supabase Error:", error);
      return res.status(500).json({ error: "Database error" });
    }

    res.json({ success: true, message: "Order updated successfully" });
  } catch (err) {
    console.error("Update API Error:", err);
    res.status(500).json({ error: "Server error" });
  }
}
