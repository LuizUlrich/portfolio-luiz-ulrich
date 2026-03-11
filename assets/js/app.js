document.addEventListener("DOMContentLoaded", () => {
  if (typeof window.initReveal === "function") {
    window.initReveal();
  }

  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll("#mainNav a").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.add("is-active");
    }
  });
});