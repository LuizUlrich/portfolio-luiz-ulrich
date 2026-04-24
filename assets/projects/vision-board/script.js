const board = document.getElementById("board");
const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const saveBtn = document.getElementById("save");

let goals = JSON.parse(localStorage.getItem("goals")) || [];

openModal.onclick = () => {
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
};

modal.onclick = (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
  }
};

saveBtn.onclick = async () => {
  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");
  const imageInput = document.getElementById("image");

  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const category = document.getElementById("category").value;
  const file = imageInput.files[0];

  if (!title) {
    alert("Digite um título para a meta.");
    return;
  }

  let image = "";

  if (file) {
    image = await toBase64(file);
  }

  const goal = {
    id: Date.now(),
    title,
    description,
    category,
    image
  };

  goals.unshift(goal);
  localStorage.setItem("goals", JSON.stringify(goals));

  titleInput.value = "";
  descriptionInput.value = "";
  imageInput.value = "";

  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  render();
};

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

function removeGoal(id) {
  if (!confirm("Deseja excluir essa meta?")) return;

  goals = goals.filter((g) => g.id !== id);
  localStorage.setItem("goals", JSON.stringify(goals));
  render();
}

function escapeHTML(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function render() {
  if (goals.length === 0) {
    board.innerHTML = `<div class="empty">Nenhuma meta ainda.<br>Crie sua primeira ✨</div>`;
    return;
  }

  board.innerHTML = goals
    .map(
      (g) => `
    <div class="card">
      ${g.image ? `<img src="${g.image}" alt="Imagem da meta ${escapeHTML(g.title)}">` : ""}
      <div class="card-content">
        <span class="badge">${escapeHTML(g.category)}</span>
        <h3>${escapeHTML(g.title)}</h3>
        <p>${escapeHTML(g.description)}</p>
        <button class="delete-btn" onclick="removeGoal(${g.id})">Excluir</button>
      </div>
    </div>
  `
    )
    .join("");
}

window.removeGoal = removeGoal;

render();
