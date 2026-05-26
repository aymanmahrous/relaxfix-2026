async function loadOrders() {
    const res = await fetch("/api/orders");
    const data = await res.json();

    const table = document.querySelector("#ordersTable tbody");
    table.innerHTML = "";

    data.forEach(order => {
        const row = `
            <tr>
                <td>${order.name}</td>
                <td>${order.phone}</td>
                <td>${order.service}</td>
                <td>${order.details}</td>
                <td>${order.status}</td>
                <td>
                    <button onclick="updateStatus(${order.id}, 'done')">تم</button>
                </td>
            </tr>
        `;
        table.innerHTML += row;
    });
}

async function updateStatus(id, status) {
    await fetch("/api/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status })
    });

    loadOrders();
}

loadOrders();
