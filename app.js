// 🌗 Dark Mode Toggle
const toggleBtn = document.getElementById("darkToggle");
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
}

// 📊 Landing Chart (commChart)
const commChartEl = document.getElementById("commChart");
if (commChartEl) {
  new Chart(commChartEl, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Commissions (USD)",
          data: [200, 450, 380, 520, 610, 700],
          borderColor: "#666",
          backgroundColor: "rgba(100,100,100,0.3)",
          fill: true,
          tension: 0.3
        }
      ]
    },
    options: { responsive: true }
  });
}

// 📈 QA Chart
const qaChartEl = document.getElementById("qaChart");
if (qaChartEl) {
  new Chart(qaChartEl, {
    type: "bar",
    data: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        { label: "QA Score", data: [85, 90, 92, 88], backgroundColor: "#777" }
      ]
    },
    options: { responsive: true }
  });
}

// 🧾 Sales Tracker Logic
const addBtn = document.getElementById("addSaleBtn");
if (addBtn) {
  addBtn.addEventListener("click", () => {
    const brand = document.getElementById("brandSelect").value;
    const comm = document.getElementById("commissionInput").value;
    const tbody = document.getElementById("salesTable");

    if (brand && comm) {
      const tr = document.createElement("tr");
      const date = new Date().toLocaleDateString();
      tr.innerHTML = `<td>${date}</td><td>${brand}</td><td>$${comm}</td>`;
      tbody.prepend(tr);
      document.getElementById("commissionInput").value = "";
    }
  });
}
