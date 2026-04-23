const gameArea = document.getElementById("gameArea");
const wrongButtons = Array.from(document.querySelectorAll(".answer-btn.wrong"));
const correctButton = document.getElementById("correctAnswer");
const overlay = document.getElementById("successOverlay");
const heartsLayer = document.getElementById("heartsLayer");
const replayHeartsButton = document.getElementById("replayHearts");
const closeOverlayButton = document.getElementById("closeOverlay");

const allButtons = [...wrongButtons, correctButton];
let areaRect = null;
let isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

function refreshAreaRect() {
  areaRect = gameArea.getBoundingClientRect();
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function distance(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}

function getLocalRect(button) {
  const rect = button.getBoundingClientRect();
  return {
    x: rect.left - areaRect.left,
    y: rect.top - areaRect.top,
    width: rect.width,
    height: rect.height,
    centerX: rect.left - areaRect.left + rect.width / 2,
    centerY: rect.top - areaRect.top + rect.height / 2,
  };
}

function overlaps(candidate, other, gap = 14) {
  return !(
    candidate.x + candidate.width + gap < other.x ||
    candidate.x > other.x + other.width + gap ||
    candidate.y + candidate.height + gap < other.y ||
    candidate.y > other.y + other.height + gap
  );
}

function pickPosition(button, pointer = null) {
  refreshAreaRect();

  const rect = button.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;
  const padding = 10;

  const minX = padding;
  const minY = padding;
  const maxX = Math.max(minX, areaRect.width - width - padding);
  const maxY = Math.max(minY, areaRect.height - height - padding);

  const otherRects = allButtons
    .filter((item) => item !== button)
    .map((item) => getLocalRect(item));

  const validPositions = [];
  const pointerRadius = isCoarsePointer ? 90 : 115;

  for (let i = 0; i < 90; i += 1) {
    const x = randomBetween(minX, maxX);
    const y = randomBetween(minY, maxY);
    const candidate = {
      x,
      y,
      width,
      height,
      centerX: x + width / 2,
      centerY: y + height / 2,
    };

    const intersects = otherRects.some((other) => overlaps(candidate, other));
    if (intersects) continue;

    if (pointer) {
      const pointerDistance = distance(candidate.centerX, candidate.centerY, pointer.x, pointer.y);
      if (pointerDistance < pointerRadius) continue;
    }

    validPositions.push(candidate);
  }

  if (validPositions.length > 0) {
    return validPositions[Math.floor(Math.random() * validPositions.length)];
  }

  return {
    x: randomBetween(minX, maxX),
    y: randomBetween(minY, maxY),
    width,
    height,
  };
}

function applyPosition(button, position) {
  button.style.left = `${position.x}px`;
  button.style.top = `${position.y}px`;
}

function moveWrongButton(button, pointer = null) {
  const now = Date.now();
  const nextAllowed = Number(button.dataset.nextMoveAt || 0);
  if (now < nextAllowed) return;

  const position = pickPosition(button, pointer);
  applyPosition(button, position);

  button.classList.remove("is-moving");
  void button.offsetWidth;
  button.classList.add("is-moving");

  button.dataset.nextMoveAt = String(now + 140);
}

function placeButtonsInitially() {
  refreshAreaRect();

  const randomized = [...allButtons].sort(() => Math.random() - 0.5);
  randomized.forEach((button) => {
    const position = pickPosition(button);
    applyPosition(button, position);
  });
}

function handleMouseProximity(event) {
  if (isCoarsePointer) return;

  const pointerX = event.clientX - areaRect.left;
  const pointerY = event.clientY - areaRect.top;

  wrongButtons.forEach((button) => {
    const rect = getLocalRect(button);
    const near = distance(rect.centerX, rect.centerY, pointerX, pointerY) < 95;

    if (near) {
      moveWrongButton(button, { x: pointerX, y: pointerY });
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
