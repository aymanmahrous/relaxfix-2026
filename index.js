async function sendOrder() {
    const body = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        service: document.getElementById("service").value,
        details: document.getElementById("details").value
    };

    const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    const data = await res.json();
    document.getElementById("msg").innerText = data.success ? "تم إرسال الطلب" : "حدث خطأ";
}

