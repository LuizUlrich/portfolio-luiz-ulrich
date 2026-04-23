const gameArea = document.getElementById("gameArea");
const wrongButtons = Array.from(document.querySelectorAll(".answer-btn.wrong"));
const correctButton = document.getElementById("correctAnswer");
const overlay = document.getElementById("successOverlay");
const heartsLayer = document.getElementById("heartsLayer");
const replayHeartsButton = document.getElementById("replayHearts");
const closeOverlayButton = document.getElementById("closeOverlay");

const occupiedSpots = [];
let areaRect = null;
let isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function distance(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}

function refreshAreaRect() {
  areaRect = gameArea.getBoundingClientRect();
}

function pickRandomPosition(button, tries = 40) {
  const buttonRect = button.getBoundingClientRect();
  const width = buttonRect.width;
  const height = buttonRect.height;

  const padding = 8;
  const minX = padding;
  const minY = padding;
  const maxX = Math.max(minX, areaRect.width - width - padding);
  const maxY = Math.max(minY, areaRect.height - height - padding);

  let bestPosition = { x: minX, y: minY, score: -Infinity };

  for (let i = 0; i < tries; i += 1) {
    const x = Math.random() * (maxX - minX) + minX;
    const y = Math.random() * (maxY - minY) + minY;

    const score = occupiedSpots.reduce((acc, spot) => {
      const d = distance(x, y, spot.x, spot.y);
      return acc + d;
    }, 0);

    if (score > bestPosition.score) {
      bestPosition = { x, y, score };
    }
  }

  return bestPosition;
}

function moveWrongButton(button) {
  refreshAreaRect();

  const newPosition = pickRandomPosition(button);
  button.style.left = `${newPosition.x}px`;
  button.style.top = `${newPosition.y}px`;

  button.classList.remove("is-moving");
  void button.offsetWidth;
  button.classList.add("is-moving");

  occupiedSpots.push({ x: newPosition.x, y: newPosition.y });
  if (occupiedSpots.length > 30) {
    occupiedSpots.shift();
  }
}

function placeButtonsInitially() {
  refreshAreaRect();
  occupiedSpots.length = 0;

  const centerX = areaRect.width / 2;
  const correctWidth = correctButton.offsetWidth;
  const correctHeight = correctButton.offsetHeight;
  const correctX = clamp(centerX - correctWidth / 2, 10, areaRect.width - correctWidth - 10);
  const correctY = areaRect.height - correctHeight - 18;

  correctButton.style.left = `${correctX}px`;
  correctButton.style.top = `${correctY}px`;

  occupiedSpots.push({ x: correctX, y: correctY });

  wrongButtons.forEach((button) => moveWrongButton(button));
}

function handleMouseProximity(event) {
  if (isCoarsePointer) return;

  const pointerX = event.clientX;
  const pointerY = event.clientY;

  wrongButtons.forEach((button) => {
    const rect = button.getBoundingClientRect();
    const nearX = pointerX > rect.left - 55 && pointerX < rect.right + 55;
    const nearY = pointerY > rect.top - 45 && pointerY < rect.bottom + 45;

    if (nearX && nearY) {
      moveWrongButton(button);
    }
  });
}

function spawnHearts(amount = 42) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const total = prefersReducedMotion ? 10 : amount;

  for (let i = 0; i < total; i += 1) {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = Math.random() > 0.35 ? "💖" : "💘";

    const size = 14 + Math.random() * 24;
    const x = Math.random() * 100;
    const travelX = -130 + Math.random() * 260;
    const travelY = -(220 + Math.random() * 320);
    const rotate = -220 + Math.random() * 440;
    const duration = 1700 + Math.random() * 2200;
    const delay = Math.random() * 420;
    const opacity = 0.6 + Math.random() * 0.4;

    heart.style.left = `${x}%`;
    heart.style.fontSize = `${size}px`;
    heart.style.setProperty("--travel-x", `${travelX}px`);
    heart.style.setProperty("--travel-y", `${travelY}px`);
    heart.style.setProperty("--rotate", `${rotate}deg`);
    heart.style.setProperty("--duration", `${duration}ms`);
    heart.style.setProperty("--opacity", `${opacity}`);
    heart.style.animationDelay = `${delay}ms`;

    heartsLayer.appendChild(heart);

    const removeAt = duration + delay + 40;
    window.setTimeout(() => {
      heart.remove();
    }, removeAt);
  }
}

function openOverlay() {
  overlay.classList.add("is-open");
  overlay.setAttribute("aria-hidden", "false");
  spawnHearts();
}

function closeOverlay() {
  overlay.classList.remove("is-open");
  overlay.setAttribute("aria-hidden", "true");
  heartsLayer.innerHTML = "";
}

wrongButtons.forEach((button) => {
  button.addEventListener("mouseenter", () => moveWrongButton(button));
  button.addEventListener("focus", () => moveWrongButton(button));
  button.addEventListener("touchstart", (event) => {
    event.preventDefault();
    moveWrongButton(button);
  });
  button.addEventListener("click", () => moveWrongButton(button));
});

correctButton.addEventListener("click", openOverlay);

replayHeartsButton.addEventListener("click", () => {
  heartsLayer.innerHTML = "";
  spawnHearts(50);
});

closeOverlayButton.addEventListener("click", closeOverlay);
overlay.addEventListener("click", (event) => {
  if (event.target === overlay || event.target.classList.contains("overlay-glow")) {
    closeOverlay();
  }
});

gameArea.addEventListener("mousemove", handleMouseProximity);
window.addEventListener("resize", placeButtonsInitially);
window.addEventListener("orientationchange", placeButtonsInitially);

window.matchMedia("(pointer: coarse)").addEventListener("change", (event) => {
  isCoarsePointer = event.matches;
});

placeButtonsInitially();
