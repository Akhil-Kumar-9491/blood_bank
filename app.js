const sections = document.querySelectorAll(".section");
let editingDonorId = null;
console.log("🔥 app.js loaded");

const form = document.getElementById("donorForm");
const totalDonors = document.getElementById("totalDonors");
const search = document.getElementById("search");
const successModal = document.getElementById("successModal");
const helpModal = document.getElementById("helpModal");

/* =========================
   FORM SUBMIT (ADD + UPDATE)
   ========================= */
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const genderInput = document.querySelector('input[name="gender"]:checked');
  if (!genderInput) {
    alert("Please select gender");
    return;
  }

  const data = {
    name: document.getElementById("name").value,
    donorId: document.getElementById("donorId").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    bloodGroup: document.getElementById("bloodGroup").value,
    department: document.getElementById("department").value,
    year: document.getElementById("year").value,
    age: document.getElementById("age").value,
    gender: genderInput.value,
  };

  const url = editingDonorId
    ? `http://localhost:5000/api/donor/${editingDonorId}`
    : "http://localhost:5000/api/donor/register";

  const method = editingDonorId ? "PUT" : "POST";

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  console.log("SAVE RESULT:", result);

  editingDonorId = null;

  successModal.classList.remove("hidden");
  setTimeout(() => {
    successModal.classList.add("hidden");
    showSection("dashboard");
  }, 1500);

  form.reset();
});

/* =========================
   SECTION SWITCH
   ========================= */
function showSection(id) {
  sections.forEach((s) => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");

  if (id === "dashboard") {
    loadDashboard();
  }
}

/* =========================
   LOAD DASHBOARD (DB DATA)
   ========================= */
async function loadDashboard() {
  const res = await fetch("http://localhost:5000/api/donor/all");
  const donors = await res.json();

  const body = document.getElementById("tableBody");
  body.innerHTML = "";
  totalDonors.innerText = donors.length;

  donors.forEach((d) => {
    body.innerHTML += `
      <tr class="border-b">
        <td class="p-2">${d.name}</td>
        <td>${d.donor_id}</td>
        <td>${d.phone}</td>
        <td>${d.email}</td>
        <td>${d.blood_group}</td>
        <td>${d.department}</td>
        <td>${d.year}</td>
        <td>${d.gender}</td>
        <td class="space-x-2">
          <button onclick="editDonor(${d.id})" class="text-blue-600">Edit</button>
          <button onclick="deleteDonor(${d.id})" class="text-red-600">Delete</button>
        </td>
      </tr>
    `;
  });
}

/* =========================
   DELETE DONOR
   ========================= */
async function deleteDonor(id) {
  if (!confirm("Are you sure you want to delete this donor?")) return;

  await fetch(`http://localhost:5000/api/donor/${id}`, {
    method: "DELETE",
  });

  alert("Donor deleted successfully");
  loadDashboard();
}

/* =========================
   EDIT DONOR
   ========================= */
function editDonor(id) {
  editingDonorId = id;

  // ✅ SAFE row selection
  const row = document.querySelector(`#tableBody tr[data-id="${id}"]`);
  if (!row) {
    alert("Row not found");
    return;
  }

  const cells = row.children;
  
  document.getElementById("name").value = cells[0].innerText.trim();
  document.getElementById("donorId").value = cells[1].innerText.trim();
  document.getElementById("phone").value = cells[2].innerText.trim();
  document.getElementById("email").value = cells[3].innerText.trim();
  document.getElementById("bloodGroup").value = cells[4].innerText.trim();
  document.getElementById("department").value = cells[5].innerText.trim();
  document.getElementById("year").value = cells[6].innerText.trim();

  // gender radio
  document.querySelectorAll('input[name="gender"]').forEach((r) => {
    r.checked =
      r.value.toLowerCase() === cells[7].innerText.trim().toLowerCase();
  });

  document.getElementById("healthyCheck").checked = true;

  showSection("register");
}


/* =========================
   SEARCH
   ========================= */
search.addEventListener("input", (e) => {
  const v = e.target.value.toLowerCase();
  document.querySelectorAll("#tableBody tr").forEach((r) => {
    r.style.display = r.innerText.toLowerCase().includes(v) ? "" : "none";
  });
});

/* =========================
   HELP MODAL
   ========================= */
function openHelpModal() {
  helpModal.classList.remove("hidden");
}
function closeHelpModal() {
  helpModal.classList.add("hidden");
}

/* =========================
   MAKE FUNCTIONS GLOBAL
   ========================= */
window.showSection = showSection;
window.editDonor = editDonor;
window.deleteDonor = deleteDonor;
window.openHelpModal = openHelpModal;
window.closeHelpModal = closeHelpModal;
