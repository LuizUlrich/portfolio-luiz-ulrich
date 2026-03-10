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

  const defaultState = {
    index: 0,
    time: 0,
    volume: 0.85,
    playing: false,
    hasInteracted: false
  };

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return { ...defaultState };
      return { ...defaultState, ...JSON.parse(saved) };
    } catch {
      return { ...defaultState };
    }
  }

  const state = loadState();
  let ui = null;
  let isSeeking = false;
  let lastSavedSecond = -1;

  audio.volume = state.volume;
  audio.src = TRACKS[state.index]?.src || TRACKS[0].src;

  function saveState() {
    const payload = {
      index: state.index,
      time: Number.isFinite(audio.currentTime) ? audio.currentTime : 0,
      volume: audio.volume,
      playing: !audio.paused,
      hasInteracted: state.hasInteracted
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }

  function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${String(secs).padStart(2, "0")}`;
  }

  function ensurePlayerUI() {
    if (ui) return ui;

    const wrapper = document.createElement("section");
    wrapper.className = "global-player";
    wrapper.setAttribute("aria-label", "Player global de áudio");
    wrapper.innerHTML = `
      <div class="global-player__inner">
        <div class="global-player__meta">
          <span class="global-player__eyebrow">Tocando agora</span>
          <div class="global-player__title">Nenhum set carregado</div>
          <div class="global-player__artist">Ulrich</div>
        </div>

        <div class="global-player__center">
          <div class="global-player__controls">
            <button class="player-icon-btn" type="button" data-action="prev" aria-label="Set anterior">
              <img src="${ICONS.prev}" alt="" />
            </button>

            <button class="player-icon-btn player-icon-btn--primary" type="button" data-action="toggle" aria-label="Tocar ou pausar">
              <img src="${ICONS.play}" alt="" />
            </button>

            <button class="player-icon-btn" type="button" data-action="next" aria-label="Próximo set">
              <img src="${ICONS.next}" alt="" />
            </button>
          </div>

          <div class="global-player__progress">
            <span class="global-player__time" data-role="current">0:00</span>
            <input
              class="global-player__range"
              data-role="seek"
              type="range"
              min="0"
              max="100"
              step="0.1"
              value="0"
              aria-label="Linha do tempo"
            />
            <span class="global-player__time" data-role="duration">0:00</span>
          </div>
        </div>

        <div class="global-player__side">
          <label for="global-volume">Vol</label>
          <input
            id="global-volume"
            class="global-player__volume-input"
            data-role="volume"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value="${state.volume}"
            aria-label="Volume"
          />
        </div>
      </div>
    `;

    document.body.appendChild(wrapper);
    document.body.classList.add("has-player");

    ui = {
      wrapper,
      title: wrapper.querySelector(".global-player__title"),
      artist: wrapper.querySelector(".global-player__artist"),
      playButton: wrapper.querySelector('[data-action="toggle"]'),
      playButtonIcon: wrapper.querySelector('[data-action="toggle"] img'),
      prevButton: wrapper.querySelector('[data-action="prev"]'),
      nextButton: wrapper.querySelector('[data-action="next"]'),
      seek: wrapper.querySelector('[data-role="seek"]'),
      current: wrapper.querySelector('[data-role="current"]'),
      duration: wrapper.querySelector('[data-role="duration"]'),
      volume: wrapper.querySelector('[data-role="volume"]')
    };

    ui.prevButton.addEventListener("click", () => changeTrack(-1, true));
    ui.nextButton.addEventListener("click", () => changeTrack(1, true));
    ui.playButton.addEventListener("click", togglePlayback);

    ui.seek.addEventListener("input", () => {
      isSeeking = true;
      ui.current.textContent = formatTime(Number(ui.seek.value));
    });

    ui.seek.addEventListener("change", () => {
      audio.currentTime = Number(ui.seek.value);
      isSeeking = false;
      saveState();
    });

    ui.volume.addEventListener("input", () => {
      audio.volume = Number(ui.volume.value);
      state.volume = audio.volume;
      saveState();
    });

    return ui;
  }

  function updatePlayerUI() {
    if (!ui) return;

    const track = TRACKS[state.index] || TRACKS[0];
    ui.title.textContent = track.title;
    ui.artist.textContent = track.artist;

    const isPlaying = !audio.paused;
    ui.playButton.setAttribute("aria-label", isPlaying ? "Pausar" : "Tocar");
    ui.playButtonIcon.src = isPlaying ? ICONS.pause : ICONS.play;

    ui.current.textContent = formatTime(audio.currentTime);
    ui.duration.textContent = formatTime(audio.duration);

    ui.seek.max = Number.isFinite(audio.duration) ? audio.duration : 100;
    if (!isSeeking) {
      ui.seek.value = Number.isFinite(audio.currentTime) ? audio.currentTime : 0;
    }

    ui.volume.value = audio.volume;
  }

  function showPlayer() {
    const player = ensurePlayerUI();
    player.wrapper.classList.add("is-visible");
  }

  function hidePlayer() {
    if (!ui) return;
    ui.wrapper.classList.remove("is-visible");
  }

  function setTrack(index, preserveTime = false) {
    state.index = ((index % TRACKS.length) + TRACKS.length) % TRACKS.length;
    const track = TRACKS[state.index];
    const nextTime = preserveTime ? state.time : 0;

    audio.src = track.src;
    audio.load();

    const applyTime = () => {
      if (nextTime > 0 && Number.isFinite(audio.duration)) {
        audio.currentTime = Math.min(nextTime, Math.max(audio.duration - 1, 0));
      }
      updatePlayerUI();
    };

    audio.addEventListener("loadedmetadata", applyTime, { once: true });
    updatePlayerUI();
    saveState();
  }

  async function playCurrent() {
    try {
      await audio.play();
      state.hasInteracted = true;
      showPlayer();
      updatePlayerUI();
      saveState();
    } catch (error) {
      console.warn("Não foi possível iniciar o áudio automaticamente:", error);
      updatePlayerUI();
    }
  }

  function pauseCurrent() {
    audio.pause();
    updatePlayerUI();
    saveState();
  }

  function togglePlayback() {
    if (audio.paused) {
      playCurrent();
      return;
    }
    pauseCurrent();
  }

  function changeTrack(direction, autoplay = false) {
    state.time = 0;
    setTrack(state.index + direction, false);
    if (autoplay) {
      playCurrent();
    }
  }

  document.querySelectorAll(".play-track-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const requestedIndex = Number(button.dataset.track || 0);
      state.time = 0;
      setTrack(requestedIndex, false);
      playCurrent();
    });
  });

  audio.addEventListener("loadedmetadata", () => {
    if (state.time > 0 && !audio.currentTime) {
      audio.currentTime = state.time;
    }
    updatePlayerUI();
  });

  audio.addEventListener("timeupdate", () => {
    updatePlayerUI();

    const currentSecond = Math.floor(audio.currentTime || 0);
    if (currentSecond !== lastSavedSecond) {
      lastSavedSecond = currentSecond;
      state.time = audio.currentTime || 0;
      saveState();
    }
  });

  audio.addEventListener("play", () => {
    showPlayer();
    updatePlayerUI();
  });

  audio.addEventListener("pause", () => {
    updatePlayerUI();
  });

  audio.addEventListener("ended", () => {
    changeTrack(1, true);
  });

  ensurePlayerUI();
  setTrack(state.index, state.time > 0);

  if (state.hasInteracted) {
    showPlayer();
  } else {
    hidePlayer();
  }

  if (state.hasInteracted && state.playing) {
    playCurrent();
  } else {
    updatePlayerUI();
  }
});