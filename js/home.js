document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".side-card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      cards.forEach((item) => {
        if (item !== card) item.style.opacity = "0.78";
      });
    });

    card.addEventListener("mouseleave", () => {
      cards.forEach((item) => {
        item.style.opacity = "";
      });
    });
  });
});