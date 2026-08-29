(function _run() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _run, { once: true });
    return;
  }
  const trackButtons = document.querySelectorAll(".play-track-btn");

  if (trackButtons.length === 0) {
    return;
  }

  const TRACKS = [
    {
      title: "El Fortin Talent 2026",
      artist: "Ulrich",
      src: "/assets/audio/El Fortin Talent 2026 @ Ulrich [18.01.2026].mp3"
    },
    {
      title: "After Rebobina @ At home [03.08.2025]",
      artist: "Ulrich",
      src: "/assets/audio/After Rebobina @ At home [03.08.2025].mp3"
    }
  ];

  const STORAGE_KEY = "luiz-ulrich-player-state";
  const createIconDataUri = (svg) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  const ICONS = {
    play: "/assets/icons/play.svg",
    pause: "/assets/icons/pause.svg",
    next: "/assets/icons/next.svg",
    prev: "/assets/icons/prev.svg",
    volume: createIconDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
        <path d="M11 6.5 7.8 9H5.5C4.67 9 4 9.67 4 10.5v3c0 .83.67 1.5 1.5 1.5h2.3l3.2 2.5c.49.38 1.2.03 1.2-.59V7.09c0-.62-.71-.97-1.2-.59Z" fill="white"/>
        <path d="M15.2 9.2a.9.9 0 0 1 1.27 0 4.9 4.9 0 0 1 0 6.93.9.9 0 1 1-1.27-1.27 3.1 3.1 0 0 0 0-4.39.9.9 0 0 1 0-1.27Z" fill="white"/>
        <path d="M17.72 6.78a.9.9 0 0 1 1.27 0 8.3 8.3 0 0 1 0 11.74.9.9 0 0 1-1.27-1.27 6.5 6.5 0 0 0 0-9.2.9.9 0 0 1 0-1.27Z" fill="white"/>
      </svg>
    `),
    mute: createIconDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
        <path d="M11 6.5 7.8 9H5.5C4.67 9 4 9.67 4 10.5v3c0 .83.67 1.5 1.5 1.5h2.3l3.2 2.5c.49.38 1.2.03 1.2-.59V7.09c0-.62-.71-.97-1.2-.59Z" fill="white"/>
        <path d="m16.2 10.47 3.33 3.33M19.53 10.47 16.2 13.8" stroke="white" stroke-width="1.8" stroke-linecap="round"/>
      </svg>
    `)
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
    hasInteracted: false,
    hidden: false
  };

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return { ...defaultState };
      const parsed = { ...defaultState, ...JSON.parse(saved) };
      parsed.index = Number.isInteger(parsed.index)
        ? Math.max(0, Math.min(TRACKS.length - 1, parsed.index))
        : defaultState.index;
      parsed.volume = Number.isFinite(parsed.volume)
        ? Math.max(0, Math.min(1, parsed.volume))
        : defaultState.volume;
      parsed.time = Number.isFinite(parsed.time) && parsed.time >= 0 ? parsed.time : 0;
      return parsed;
    } catch {
      return { ...defaultState };
    }
  }

  const state = loadState();
  let ui = null;
  let isSeeking = false;
  let lastSavedSecond = -1;
  let lastVolumeBeforeMute = state.volume > 0 ? state.volume : defaultState.volume;

  audio.volume = state.volume;
  audio.src = TRACKS[state.index]?.src || TRACKS[0].src;

  function saveState() {
    const payload = {
      index: state.index,
      time: Number.isFinite(audio.currentTime) ? audio.currentTime : 0,
      volume: audio.volume,
      playing: !audio.paused,
      hasInteracted: state.hasInteracted,
      hidden: state.hidden
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignore storage failures to keep playback functional.
    }
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
    wrapper.setAttribute("aria-label", "Player global de audio");
    wrapper.innerHTML = `
      <button class="player-edge-toggle player-edge-toggle--inside" type="button" data-action="hide" aria-label="Ocultar player">
        <img src="${ICONS.play}" alt="" />
      </button>

      <div class="global-player__inner">
        <div class="global-player__main">
          <div class="global-player__badge" aria-hidden="true">UL</div>

          <div class="global-player__meta">
            <div class="global-player__title">Nenhum set carregado</div>
            <div class="global-player__artist">Ulrich</div>
          </div>

          <div class="global-player__controls">
            <div class="player-volume">
              <button class="player-icon-btn" type="button" data-action="volume" aria-label="Silenciar">
                <img src="${ICONS.volume}" alt="" />
              </button>

              <input
                class="player-volume__range"
                data-role="volume"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value="${state.volume}"
                aria-label="Volume"
              />
            </div>

            <button class="player-icon-btn" type="button" data-action="prev" aria-label="Set anterior">
              <img src="${ICONS.prev}" alt="" />
            </button>

            <button class="player-icon-btn player-icon-btn--primary" type="button" data-action="toggle" aria-label="Tocar ou pausar">
              <img src="${ICONS.play}" alt="" />
            </button>

            <button class="player-icon-btn" type="button" data-action="next" aria-label="Proximo set">
              <img src="${ICONS.next}" alt="" />
            </button>
          </div>
        </div>

        <div class="global-player__timeline">
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
    `;

    document.body.appendChild(wrapper);
    ui = {
      wrapper,
      title: wrapper.querySelector(".global-player__title"),
      artist: wrapper.querySelector(".global-player__artist"),
      playButton: wrapper.querySelector('[data-action="toggle"]'),
      playButtonIcon: wrapper.querySelector('[data-action="toggle"] img'),
      volumeButton: wrapper.querySelector('[data-action="volume"]'),
      volumeButtonIcon: wrapper.querySelector('[data-action="volume"] img'),
      volumeRange: wrapper.querySelector('[data-role="volume"]'),
      hideButton: wrapper.querySelector('[data-action="hide"]'),
      prevButton: wrapper.querySelector('[data-action="prev"]'),
      nextButton: wrapper.querySelector('[data-action="next"]'),
      seek: wrapper.querySelector('[data-role="seek"]'),
      current: wrapper.querySelector('[data-role="current"]'),
      duration: wrapper.querySelector('[data-role="duration"]')
    };

    const shortcut = document.createElement("button");
    shortcut.className = "player-edge-toggle player-edge-toggle--floating";
    shortcut.type = "button";
    shortcut.setAttribute("aria-label", "Mostrar player");
    shortcut.innerHTML = `<img src="${ICONS.play}" alt="" />`;
    document.body.appendChild(shortcut);

    ui.shortcutButton = shortcut;

    ui.prevButton.addEventListener("click", () => changeTrack(-1, true));
    ui.nextButton.addEventListener("click", () => changeTrack(1, true));
    ui.playButton.addEventListener("click", togglePlayback);
    ui.volumeButton.addEventListener("click", toggleMute);
    ui.hideButton.addEventListener("click", hidePlayer);
    ui.shortcutButton.addEventListener("click", showPlayer);
    ui.volumeRange.addEventListener("input", () => {
      setVolume(Number(ui.volumeRange.value));
    });

    ui.seek.addEventListener("input", () => {
      isSeeking = true;
      ui.current.textContent = formatTime(Number(ui.seek.value));
    });

    ui.seek.addEventListener("change", () => {
      audio.currentTime = Number(ui.seek.value);
      isSeeking = false;
      saveState();
    });

    return ui;
  }

  function applyVisibilityState() {
    if (!ui) return;

    const canDisplay = state.hasInteracted;
    const isPlayerVisible = canDisplay && !state.hidden;
    const isShortcutVisible = canDisplay && state.hidden;

    document.body.classList.toggle("has-player", canDisplay);
    ui.wrapper.classList.toggle("is-visible", isPlayerVisible);
    ui.shortcutButton.classList.toggle("is-visible", isShortcutVisible);
    ui.wrapper.setAttribute("aria-hidden", String(!isPlayerVisible));
    ui.shortcutButton.setAttribute("aria-hidden", String(!isShortcutVisible));
  }

  function updatePlayerUI() {
    if (!ui) return;

    const track = TRACKS[state.index] || TRACKS[0];
    ui.title.textContent = track.title;
    ui.artist.textContent = track.artist;

    const isPlaying = !audio.paused;
    const isMuted = audio.volume <= 0.01;
    ui.playButton.setAttribute("aria-label", isPlaying ? "Pausar" : "Tocar");
    ui.playButton.setAttribute("aria-pressed", String(isPlaying));
    ui.playButtonIcon.src = isPlaying ? ICONS.pause : ICONS.play;
    ui.volumeButton.setAttribute("aria-label", isMuted ? "Ativar som" : "Silenciar");
    ui.volumeButton.setAttribute("aria-pressed", String(isMuted));
    ui.volumeButtonIcon.src = isMuted ? ICONS.mute : ICONS.volume;
    ui.volumeRange.value = String(audio.volume);

    ui.current.textContent = formatTime(audio.currentTime);
    ui.duration.textContent = formatTime(audio.duration);

    ui.seek.max = Number.isFinite(audio.duration) ? audio.duration : 100;

    if (!isSeeking) {
      ui.seek.value = Number.isFinite(audio.currentTime) ? audio.currentTime : 0;
    }
  }

  function showPlayer() {
    ensurePlayerUI();
    state.hidden = false;
    applyVisibilityState();
    saveState();
  }

  function hidePlayer() {
    ensurePlayerUI();
    state.hidden = true;
    applyVisibilityState();
    saveState();
  }

  function setVolume(value) {
    const normalizedVolume = Math.max(0, Math.min(1, value));

    audio.volume = normalizedVolume;

    if (normalizedVolume > 0.01) {
      lastVolumeBeforeMute = normalizedVolume;
    }

    state.volume = normalizedVolume;
    updatePlayerUI();
    saveState();
  }

  function toggleMute() {
    if (audio.volume <= 0.01) {
      setVolume(lastVolumeBeforeMute || defaultState.volume);
      return;
    }

    setVolume(0);
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

  async function playCurrent({ warnOnError = false } = {}) {
    try {
      await audio.play();
      state.hasInteracted = true;
      showPlayer();
      updatePlayerUI();
      saveState();
    } catch (error) {
      if (warnOnError) {
        console.warn("Nao foi possivel iniciar o audio:", error);
      }
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
      playCurrent({ warnOnError: true });
      return;
    }

    pauseCurrent();
  }

  function changeTrack(direction, autoplay = false) {
    state.time = 0;
    setTrack(state.index + direction, false);

    if (autoplay) {
      playCurrent({ warnOnError: true });
    }
  }

  trackButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const requestedIndex = Number(button.dataset.track || 0);
      state.time = 0;
      setTrack(requestedIndex, false);
      playCurrent({ warnOnError: true });
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
    saveState();
  });

  audio.addEventListener("ended", () => {
    changeTrack(1, true);
  });

  ensurePlayerUI();
  applyVisibilityState();
  setTrack(state.index, state.time > 0);

  if (state.hasInteracted && !state.hidden) {
    showPlayer();
  } else {
    applyVisibilityState();
  }

  if (state.hasInteracted && state.playing) {
    playCurrent();
  } else {
    updatePlayerUI();
  }
})();
