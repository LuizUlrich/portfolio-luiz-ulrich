const splitPanels = document.querySelectorAll(".split-panel");

splitPanels.forEach((panel) => {
  panel.addEventListener("mouseenter", () => {
    splitPanels.forEach((item) => item.classList.remove("is-hovered"));
    panel.classList.add("is-hovered");
  });
});