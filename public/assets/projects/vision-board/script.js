const board = document.getElementById("board"); 
const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const saveBtn = document.getElementById("save");

let goals = [];
let isLoading = false;
let errorMessage = "";

/* ================= MODAL ================= */

openModal.onclick = () => {
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
};

modal.onclick = (event) => {
  if (event.target === modal) closeModal();
};

function closeModal() {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
}

/* ================= LOAD ================= */

async function loadGoals() {
  isLoading = true;
  errorMessage = "";
  render();

  const { data, error } = await VisionBoardService.getGoals();

  isLoading = false;

  if (error) {
    errorMessage = error;
    goals = [];
  } else {
    goals = data || [];
  }

  render();
}

/* ================= CREATE ================= */

saveBtn.onclick = async () => {
  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");
  const categoryInput = document.getElementById("category");
  const imageInput = document.getElementById("image");

  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const category = categoryInput.value;
  const file = imageInput.files[0];

  if (!title) {
    alert("Digite um título para a meta.");
    return;
  }

  let imageUrl = "";

  if (file) {
    try {
      imageUrl = await toBase64(file);
    } catch (error) {
      console.error("[VisionBoard] Erro ao processar imagem:", error);
      alert("Erro ao processar imagem.");
      return;
    }
  }

  saveBtn.disabled = true;
  saveBtn.textContent = "Salvando...";

  const { success, error } = await VisionBoardService.createGoal({
    title,
    description,
    category,
    image_url: imageUrl
  });

  saveBtn.disabled = false;
  saveBtn.textContent = "Salvar";

  if (!success) {
    alert(error || "Erro ao salvar meta.");
    return;
  }

  titleInput.value = "";
  descriptionInput.value = "";
  imageInput.value = "";

  closeModal();
  await loadGoals();
};

/* ================= DELETE ================= */

async function removeGoal(id) {
  if (!confirm("Deseja excluir essa meta?")) return;

  const { success, error } = await VisionBoardService.deleteGoal(id);

  if (!success) {
    alert(error || "Erro ao excluir.");
    return;
  }

  goals = goals.filter((g) => g.id !== id);
  render();
}

/* ================= HELPERS ================= */

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function escapeHTML(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* ================= RENDER ================= */

function render() {
  if (isLoading) {
    board.innerHTML = `<div class="empty">Carregando metas...</div>`;
    return;
  }

  if (errorMessage) {
    board.innerHTML = `
      <div class="empty">
        ${escapeHTML(errorMessage)}<br>
        Tente novamente
      </div>
    `;
    return;
  }

  if (!goals.length) {
    board.innerHTML = `
      <div class="empty">
        Nenhuma meta ainda.<br>Crie sua primeira ✨
      </div>
    `;
    return;
  }

  board.innerHTML = goals
    .map((goal) => {
      const image = goal.image_url
        ? `<img src="${goal.image_url}" alt="Meta ${escapeHTML(goal.title)}">`
        : "";

      return `
        <div class="card">
          ${image}
          <div class="card-content">
            <span class="badge">${escapeHTML(goal.category || "Pessoal")}</span>
            <h3>${escapeHTML(goal.title)}</h3>
            <p>${escapeHTML(goal.description || "")}</p>
            <button class="delete-btn" onclick="removeGoal('${goal.id}')">
              Excluir
            </button>
          </div>
        </div>
      `;
    })
    .join("");
}

/* ================= INIT ================= */

window.removeGoal = removeGoal;

document.addEventListener("DOMContentLoaded", loadGoals);
