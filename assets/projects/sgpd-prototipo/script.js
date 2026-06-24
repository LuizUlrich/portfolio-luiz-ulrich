import {
  getProcesses,
  createProcess,
  updateProcess,
  deleteProcess
} from "../../js/supabase/sgpdService.js";

const processList = document.getElementById("processList");
const feedback = document.getElementById("feedback");
const modal = document.getElementById("processModal");
const processForm = document.getElementById("processForm");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const saveButton = document.getElementById("saveProcessBtn");

let processes = [];

function setFeedback(type, message) {
  feedback.className = `feedback ${type || ""}`.trim();
  feedback.textContent = message || "";
}

function escapeHTML(text = "") {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function render() {
  if (!processes.length) {
    processList.innerHTML = '<article class="card"><p>Nenhum processo cadastrado.</p></article>';
    return;
  }

  processList.innerHTML = processes.map((process) => `
    <article class="card">
      <h3>${escapeHTML(process.title || "Sem título")}</h3>
      <p>${escapeHTML(process.description || "Sem descrição")}</p>
      <div class="meta">Status: <strong>${escapeHTML(process.status || "novo")}</strong></div>
      <div class="card-actions">
        <button class="btn btn-primary" data-action="status" data-id="${process.id}" type="button">Alterar status</button>
        <button class="btn" data-action="delete" data-id="${process.id}" type="button">Excluir</button>
      </div>
    </article>
  `).join("");
}

async function load() {
  setFeedback("loading", "Carregando processos...");
  try {
    processes = await getProcesses();
    render();
    setFeedback("success", "Processos carregados com sucesso.");
  } catch (error) {
    processes = [];
    render();
    setFeedback("error", error.message || "Erro ao carregar processos.");
  }
}

function openModal() {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  titleInput.focus();
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

async function onCreate(event) {
  event.preventDefault();

  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();

  if (!title || !description) {
    setFeedback("error", "Preencha título e descrição.");
    return;
  }

  saveButton.disabled = true;
  setFeedback("loading", "Salvando processo...");

  try {
    await createProcess({ title, description, status: "novo" });
    processForm.reset();
    closeModal();
    setFeedback("success", "Processo criado com sucesso.");
    await load();
  } catch (error) {
    setFeedback("error", error.message || "Erro ao criar processo.");
  } finally {
    saveButton.disabled = false;
  }
}

async function onStatusChange(id) {
  const currentStatus = processes.find((process) => process.id === id)?.status || "novo";

  const selectedStatus = prompt(
    "Escolha o novo status:\n\n1 - novo\n2 - em andamento\n3 - concluído",
    currentStatus
  );

  if (!selectedStatus) return;

  const normalizedInput = selectedStatus.trim().toLowerCase();

  const statusMap = {
    "1": "novo",
    "2": "em andamento",
    "3": "concluído",
    "novo": "novo",
    "em andamento": "em andamento",
    "concluído": "concluído"
  };

  const normalizedStatus = statusMap[normalizedInput];

  if (!normalizedStatus) {
    setFeedback("error", "Status inválido. Escolha 1, 2 ou 3.");
    return;
  }

  try {
    setFeedback("loading", "Atualizando status...");
    await updateProcess(id, { status: normalizedStatus });
    setFeedback("success", "Status atualizado com sucesso.");
    await load();
  } catch (error) {
    setFeedback("error", error.message || "Erro ao atualizar status.");
  }
}

async function onDelete(id) {
  if (!confirm("Deseja realmente excluir este processo?")) return;

  try {
    setFeedback("loading", "Excluindo processo...");
    await deleteProcess(id);
    setFeedback("success", "Processo excluído com sucesso.");
    await load();
  } catch (error) {
    setFeedback("error", error.message || "Erro ao excluir processo.");
  }
}

document.getElementById("openModalBtn").addEventListener("click", openModal);
document.getElementById("cancelModalBtn").addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});
processForm.addEventListener("submit", onCreate);
processList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const { action, id } = button.dataset;
  if (action === "status") onStatusChange(id);
  if (action === "delete") onDelete(id);
});

document.addEventListener("DOMContentLoaded", load);
