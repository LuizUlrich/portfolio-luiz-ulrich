const audio = document.getElementById("mainAudio");
const playPauseBtn = document.getElementById("playPauseBtn");
const progressBar = document.getElementById("progressBar");
const volumeBar = document.getElementById("volumeBar");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

if (audio) {
  audio.volume = 0.7;
}

if (volumeBar && audio) {
  volumeBar.addEventListener("input", () => {
    audio.volume = volumeBar.value;
  });
}

if (playPauseBtn && audio) {
  playPauseBtn.addEventListener("click", async () => {
    if (audio.paused) {
      try {
        await audio.play();
        playPauseBtn.textContent = "❚❚";
      } catch (error) {
        console.error("Erro ao reproduzir o áudio:", error);
      }
    } else {
      audio.pause();
      playPauseBtn.textContent = "▶";
    }
  });
}

if (audio) {
  audio.addEventListener("loadedmetadata", () => {
    durationEl.textContent = formatTime(audio.duration);
  });

  audio.addEventListener("timeupdate", () => {
    const progress = (audio.currentTime / audio.duration) * 100 || 0;
    progressBar.value = progress;
    currentTimeEl.textContent = formatTime(audio.currentTime);
  });

  audio.addEventListener("ended", () => {
    playPauseBtn.textContent = "▶";
    progressBar.value = 0;
    currentTimeEl.textContent = "0:00";
  });
}

if (progressBar && audio) {
  progressBar.addEventListener("input", () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
  });
}