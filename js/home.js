document.addEventListener("DOMContentLoaded", () => {
  const panels = document.querySelectorAll(".panel");

  panels.forEach((panel) => {
    panel.addEventListener("mouseenter", () => {
      panels.forEach((item) => item.classList.remove("is-dimmed"));
      panels.forEach((item) => {
        if (item !== panel) item.classList.add("is-dimmed");
      });
    });

    panel.addEventListener("mouseleave", () => {
      panels.forEach((item) => item.classList.remove("is-dimmed"));
    });
  });
});