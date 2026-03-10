const screens = Array.from(document.querySelectorAll(".screen"));
const progressBars = document.getElementById("progressBars");
const particles = document.getElementById("particles");
const bgMusic = document.getElementById("bgMusic");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

let currentIndex = 0;
let started = false;
let paused = false;
let musicStarted = false;

let rafId = null;
let timeoutId = null;
let fadeFrameId = null;
let segmentFills = [];

let startTime = 0;
let currentDuration = 20000;
let elapsedBeforePause = 0;

function buildProgress() {
  progressBars.innerHTML = "";
  segmentFills = [];

  screens.forEach((screen) => {
    screen.dataset.duration = "20000";

    const segment = document.createElement("div");
    segment.className = "progress-segment";

    const fill = document.createElement("div");
    fill.className = "progress-fill";

    segment.appendChild(fill);
    progressBars.appendChild(segment);
    segmentFills.push(fill);
  });
}

function setProgressForCurrentScreen(progress) {
  segmentFills.forEach((fill, index) => {
    if (index < currentIndex) {
      fill.style.width = "100%";
    } else if (index > currentIndex) {
      fill.style.width = "0%";
    } else {
        const safe = Math.max(0, Math.min(100, progress * 100));
        fill.style.width = `${safe}%`;
    }
  });
}

function pauseAllVideos() {
  document.querySelectorAll("video").forEach((video) => {
    video.pause();
  });
}

function playVideosOnCurrentScreen() {
  const current = screens[currentIndex];
  if (!current) return;

  const videos = current.querySelectorAll("video");
  videos.forEach((video) => {
    try {
      video.currentTime = 0;
    } catch (e) {}

    video.play().catch(() => {});
  });
}

function stopMusicFade() {
  if (fadeFrameId) {
    cancelAnimationFrame(fadeFrameId);
    fadeFrameId = null;
  }
}

function fadeAudioTo(targetVolume = 0.45, duration = 4000) {
  if (!bgMusic) return;

  stopMusicFade();

  const startVolume = bgMusic.volume;
  const startTimeFade = performance.now();

  function step(now) {
    const progress = Math.min((now - startTimeFade) / duration, 1);
    bgMusic.volume = startVolume + (targetVolume - startVolume) * progress;

    if (progress < 1) {
      fadeFrameId = requestAnimationFrame(step);
    } else {
      fadeFrameId = null;
    }
  }

  fadeFrameId = requestAnimationFrame(step);
}

async function startMusicWithFade(targetVolume = 0.45, duration = 5000) {
  if (!bgMusic) return;

  try {
    bgMusic.volume = 0;
    await bgMusic.play();
    fadeAudioTo(targetVolume, duration);
    musicStarted = true;
    console.log("Música iniciada com fade in.");
  } catch (error) {
    console.error("Não foi possível tocar a música:", error);
  }
}

function tryStartMusic() {
  if (!bgMusic || musicStarted) return;
  startMusicWithFade(0.45, 5000);
}

function fadeOutMusic(targetVolume = 0.08, duration = 5000) {
  if (!bgMusic) return;
  fadeAudioTo(targetVolume, duration);
}

function resetTimers() {
  clearTimeout(timeoutId);
  cancelAnimationFrame(rafId);
}

function showScreen(index) {
  pauseAllVideos();

  screens.forEach((screen, i) => {
    screen.classList.toggle("active", i === index);
  });

  currentIndex = index;
  currentDuration = Number(screens[currentIndex].dataset.duration || 20000);
  elapsedBeforePause = 0;
  paused = false;
  startTime = performance.now();

  if (index === screens.length - 1) {
    fadeOutMusic(0.08, 5000);
  }

  setProgressForCurrentScreen(0);
  playVideosOnCurrentScreen();

  resetTimers();

  rafId = requestAnimationFrame(animateProgress);
  timeoutId = setTimeout(() => {
    nextScreen();
  }, currentDuration);
}

function animateProgress(now) {
  if (paused) return;

  const elapsed = elapsedBeforePause + (now - startTime);
  const progress = elapsed / currentDuration;

  setProgressForCurrentScreen(progress);

  if (progress < 1) {
    rafId = requestAnimationFrame(animateProgress);
  }
}

function nextScreen() {
  if (!started) return;

  if (currentIndex < screens.length - 1) {
    showScreen(currentIndex + 1);
  } else {
    resetTimers();
    setProgressForCurrentScreen(1);
  }
}

function prevScreen() {
  if (!started) return;

  if (currentIndex > 0) {
    showScreen(currentIndex - 1);
  }
}

function pauseStory() {
  if (!started || paused) return;

  paused = true;
  elapsedBeforePause += performance.now() - startTime;

  resetTimers();

  const current = screens[currentIndex];
  if (current) {
    current.querySelectorAll("video").forEach((video) => {
      video.pause();
    });
  }
}

function resumeStory() {
  if (!started || !paused) return;

  paused = false;
  startTime = performance.now();

  const remaining = Math.max(0, currentDuration - elapsedBeforePause);

  const current = screens[currentIndex];
  if (current) {
    current.querySelectorAll("video").forEach((video) => {
      video.play().catch(() => {});
    });
  }

  resetTimers();

  rafId = requestAnimationFrame(animateProgress);
  timeoutId = setTimeout(() => {
    nextScreen();
  }, remaining);
}

function togglePauseStory() {
  if (!started) {
    startExperience();
    return;
  }

  if (paused) {
    resumeStory();
  } else {
    pauseStory();
  }
}

function startExperience() {
  if (started) return;

  started = true;
  paused = false;

  tryStartMusic();
  showScreen(1);
}

function restartExperience() {
  resetTimers();
  pauseAllVideos();
  stopMusicFade();

  started = false;
  paused = false;
  currentIndex = 0;
  elapsedBeforePause = 0;
  musicStarted = false;

  try {
    bgMusic.pause();
    bgMusic.currentTime = 0;
    bgMusic.volume = 0;
    tryStartMusic();
  } catch (e) {
    console.error("Erro ao reiniciar música:", e);
  }

  segmentFills.forEach((fill) => {
    fill.style.width = "0%";
  });

  screens.forEach((screen, i) => {
    screen.classList.toggle("active", i === 0);
  });
}

function spawnParticle() {
  const el = document.createElement("div");
  el.className = "particle";
  el.textContent = Math.random() > 0.35 ? "💚" : "✨";
  el.style.left = `${Math.random() * 100}vw`;
  el.style.fontSize = `${12 + Math.random() * 18}px`;
  el.style.animationDuration = `${5 + Math.random() * 3.5}s`;
  el.style.opacity = `${0.38 + Math.random() * 0.45}`;
  particles.appendChild(el);

  setTimeout(() => {
    el.remove();
  }, 9500);
}

bgMusic?.addEventListener("error", () => {
  console.error("Erro ao carregar o arquivo de áudio. Verifique se audio/musica.mp3 existe.");
});

buildProgress();
setInterval(spawnParticle, 420);

startBtn?.addEventListener("click", async () => {
  await startMusicWithFade(0.45, 5000);
  startExperience();

  const docEl = document.documentElement;
  if (docEl.requestFullscreen) {
    docEl.requestFullscreen().catch(() => {});
  }
});

restartBtn?.addEventListener("click", restartExperience);

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    togglePauseStory();
    return;
  }

  if (!started) return;

  if (e.code === "ArrowRight") {
    nextScreen();
  }

  if (e.code === "ArrowLeft") {
    prevScreen();
  }
});

document.addEventListener("click", () => {
  tryStartMusic();
}, { once: true });

document.addEventListener("keydown", () => {
  tryStartMusic();
}, { once: true });

window.addEventListener("load", () => {
  console.log("Página carregada.");
});

screens.forEach((screen, i) => {
  screen.classList.toggle("active", i === 0);
});