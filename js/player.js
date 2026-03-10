document.addEventListener("DOMContentLoaded", () => {
  const TRACKS = [
    {
      title: "El Fortin Talent 2026",
      artist: "Ulrich",
      src: "/assets/audio/El Fortin Talent 2026 @ Ulrich [18.01.2026].mp3"
    },
    {
      title: "Set Afro House",
      artist: "Ulrich",
      src: "/assets/audio/Afro House @ Ulrich [23.08.2025].mp3"
    }
  ];

  const STORAGE_KEY = "luiz-ulrich-player-state";
  const ICONS = {
    play: "/assets/icons/play.svg",
    pause: "/assets/icons/pause.svg",
    next: "/assets/icons/next.svg",
    prev: "/assets/icons/prev.svg"
  };

  let audio = document.getElementById("globalAudio");

  if (!audio) {
    audio = document.createElement("audio");
    audio.id = "globalAudio";
    audio.preload = "metadata";
    document.body.appendChild(audio);
  }

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (!saved) {
        return {
          index: 0,
          time: 0,
          volume: 0.85,
          playing: false,
          hasInteracted: false
        };
      }

      return {
        index: 0,
        time: 0,
        volume: 0.85,
        playing: false,
        hasInteracted: false,
        ...JSON.parse(saved)
      };
    } catch {
      return {
        index: 0,
        time: 0,
        volume: 0.85,
        playing: false,
        hasInteracted: false
      };
    }
  }

  let state = loadState();
  let lastSavedSecond = -1;

  function saveState() {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        index: state.index,
        time: audio.currentTime || 0,
        volume: audio.volume,
        playing: !audio.paused,
        hasInteracted: state.hasInteracted
      })
    );
  }

  function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${String(secs).padStart(2, "0")}`;
  }

  function ensurePlayerUI() {
    if (document.querySelector(".global-player")) return;

    const player = document.createElement("section");
    player.className = "global-player";
    player.setAttribute("aria-label", "Player global de áudio");

    player.innerHTML = `
      <div class="global-player__inner">
        <div class="global-player__meta">
          <div class="global-player__labels">
            <span class="global-player__tag">Tocando agora</span>
            <h3 id="playerTrackTitle">Nenhum set carregado</h3>
            <p id="playerTrackArtist">Ulrich</p>
          </div>
        </div>

        <div class="global-player__controls">
          <button class="player-btn" id="prevTrackBtn" type="button" aria-label="Set anterior">
            <img src="${ICONS.prev}" alt="" aria-hidden="true" />
          </button>

          <button class="player-btn player-btn--primary" id="playPauseBtn" type="button" aria-label="Tocar ou pausar">
            <img id="playPauseIcon" src="${ICONS.play}" alt="" aria-hidden="true" />
          </button>

          <button class="player-btn" id="nextTrackBtn" type="button" aria-label="Próximo set">
            <img src="${ICONS.next}" alt="" aria-hidden="true" />
          </button>
        </div>

        <div class="player-bottom">
          <span class="player-time" id="currentTime">0:00</span>

          <input
            class="player-range"
            id="progressBar"
            type="range"
            min="0"
            max="100"
            value="0"
            aria-label="Progresso da música"
          />

          <span class="player-time" id="durationTime">0:00</span>

          <div class="player-volume-wrap">
            <span class="player-volume-label">Vol</span>
            <input
              class="player-range player-volume"
              id="volumeBar"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value="0.85"
              aria-label="Volume"
            />
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(player);
  }

  ensurePlayerUI();

  const playerEl = document.querySelector(".global-player");
  const titleEl = document.getElementById("playerTrackTitle");
  const artistEl = document.getElementById("playerTrackArtist");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const playPauseIcon = document.getElementById("playPauseIcon");
  const prevTrackBtn = document.getElementById("prevTrackBtn");
  const nextTrackBtn = document.getElementById("nextTrackBtn");
  const progressBar = document.getElementById("progressBar");
  const volumeBar = document.getElementById("volumeBar");
  const currentTimeEl = document.getElementById("currentTime");
  const durationTimeEl = document.getElementById("durationTime");

  function showPlayer() {
    if (!playerEl) return;
    playerEl.classList.add("is-visible");
  }

  function hidePlayer() {
    if (!playerEl) return;
    playerEl.classList.remove("is-visible");
  }

  function updatePlayerVisibility() {
    if (!playerEl) return;

    if (!state.hasInteracted) {
      hidePlayer();
      return;
    }

    showPlayer();
  }

  function updateMeta() {
    const current = TRACKS[state.index];
    if (!current) return;

    titleEl.textContent = current.title;
    artistEl.textContent = current.artist;

    if (playPauseIcon) {
      playPauseIcon.src = audio.paused ? ICONS.play : ICONS.pause;
    }
  }

  function markInteraction() {
    if (!state.hasInteracted) {
      state.hasInteracted = true;
      saveState();
    }
  }

  function loadTrack(index, options = {}) {
    const { autoplay = false, restoreTime = 0, markAsInteracted = false } = options;

    state.index = (index + TRACKS.length) % TRACKS.length;
    const track = TRACKS[state.index];
    if (!track) return;

    if (markAsInteracted) {
      markInteraction();
    }

    const shouldReplaceSrc = audio.getAttribute("src") !== track.src;

    if (shouldReplaceSrc) {
      audio.src = track.src;
      audio.load();
    }

    updateMeta();
    updatePlayerVisibility();

    const applyTime = () => {
      if (
        Number.isFinite(restoreTime) &&
        restoreTime > 0 &&
        restoreTime < (audio.duration || Infinity)
      ) {
        audio.currentTime = restoreTime;
      }
    };

    if (shouldReplaceSrc) {
      audio.addEventListener("loadedmetadata", applyTime, { once: true });
    } else if (
      Number.isFinite(restoreTime) &&
      restoreTime > 0 &&
      restoreTime < (audio.duration || Infinity)
    ) {
      audio.currentTime = restoreTime;
    }

    if (autoplay) {
      audio
        .play()
        .then(() => {
          state.playing = true;
          updateMeta();
          updatePlayerVisibility();
          saveState();
        })
        .catch((error) => {
          console.error("Erro ao tocar o áudio:", error);
        });
    } else {
      saveState();
    }
  }

  function togglePlay() {
    markInteraction();

    if (!audio.src) {
      loadTrack(state.index, {
        autoplay: true,
        restoreTime: state.time || 0,
        markAsInteracted: true
      });
      return;
    }

    if (audio.paused) {
      audio
        .play()
        .then(() => {
          state.playing = true;
          updateMeta();
          updatePlayerVisibility();
          saveState();
        })
        .catch((error) => {
          console.error("Erro ao tocar o áudio:", error);
        });
    } else {
      audio.pause();
      state.playing = false;
      updateMeta();
      updatePlayerVisibility();
      saveState();
    }
  }

  function nextTrack() {
    markInteraction();
    loadTrack(state.index + 1, {
      autoplay: true,
      restoreTime: 0,
      markAsInteracted: true
    });
  }

  function prevTrack() {
    markInteraction();
    loadTrack(state.index - 1, {
      autoplay: true,
      restoreTime: 0,
      markAsInteracted: true
    });
  }

  playPauseBtn.addEventListener("click", togglePlay);
  nextTrackBtn.addEventListener("click", nextTrack);
  prevTrackBtn.addEventListener("click", prevTrack);

  volumeBar.value = String(state.volume ?? 0.85);
  audio.volume = Number(volumeBar.value);

  volumeBar.addEventListener("input", () => {
    audio.volume = Number(volumeBar.value);
    saveState();
  });

  progressBar.addEventListener("input", () => {
    if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;
    const percentage = Number(progressBar.value) / 100;
    audio.currentTime = percentage * audio.duration;
    saveState();
  });

  audio.addEventListener("timeupdate", () => {
    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      const value = (audio.currentTime / audio.duration) * 100;
      progressBar.value = String(value);
      durationTimeEl.textContent = formatTime(audio.duration);
    }

    currentTimeEl.textContent = formatTime(audio.currentTime);

    const currentSecond = Math.floor(audio.currentTime);
    if (currentSecond !== lastSavedSecond) {
      lastSavedSecond = currentSecond;
      saveState();
    }
  });

  audio.addEventListener("loadedmetadata", () => {
    durationTimeEl.textContent = formatTime(audio.duration);
    currentTimeEl.textContent = formatTime(audio.currentTime);
    updatePlayerVisibility();
  });

  audio.addEventListener("play", () => {
    state.playing = true;
    markInteraction();
    updateMeta();
    updatePlayerVisibility();
    saveState();
  });

  audio.addEventListener("pause", () => {
    state.playing = false;
    updateMeta();
    updatePlayerVisibility();
    saveState();
  });

  audio.addEventListener("ended", () => {
    nextTrack();
  });

  document.querySelectorAll(".play-track-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.track || 0);
      loadTrack(index, {
        autoplay: true,
        restoreTime: 0,
        markAsInteracted: true
      });
    });
  });

  if (state.hasInteracted) {
    loadTrack(state.index, {
      autoplay: false,
      restoreTime: state.time || 0,
      markAsInteracted: false
    });

    audio.currentTime = state.time || 0;
  }

  updateMeta();
  updatePlayerVisibility();

  if (state.playing && state.hasInteracted) {
    audio.play().catch((error) => {
      console.error("Erro ao restaurar reprodução:", error);
      state.playing = false;
      updatePlayerVisibility();
      saveState();
    });
  }

  window.addEventListener("beforeunload", saveState);
});