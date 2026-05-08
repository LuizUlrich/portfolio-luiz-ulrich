window.site.onReady(() => {
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
  const defaultState = {
    index: 0,
    time: 0,
    volume: 0.85,
    playing: false,
    hasInteracted: false,
    hidden: false
  };

  const storage = window.site?.storage || {
    load: (_key, fallback) => fallback,
    save: () => false
  };

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

  function sanitizeState(saved = {}) {
    const parsed = { ...defaultState, ...(saved || {}) };

    parsed.index = Number.isInteger(parsed.index)
      ? Math.max(0, Math.min(TRACKS.length - 1, parsed.index))
      : defaultState.index;
    parsed.volume = Number.isFinite(parsed.volume)
      ? Math.max(0, Math.min(1, parsed.volume))
      : defaultState.volume;
    parsed.time = Number.isFinite(parsed.time) && parsed.time >= 0 ? parsed.time : 0;

    return parsed;
  }

  const state = sanitizeState(storage.load(STORAGE_KEY, defaultState));
  const hasTrackTriggers =
    document.body?.dataset.playerPage === "true" ||
    document.querySelector(".play-track-btn") !== null;
  const trackButtons = document.querySelectorAll(".play-track-btn");
  const shouldInitializePlayer = hasTrackTriggers && trackButtons.length > 0;

  if (!shouldInitializePlayer) return;

  const player = {
    audio: null,
    ui: null,
    isSeeking: false,
    lastSavedSecond: -1,
    lastVolumeBeforeMute: state.volume > 0 ? state.volume : defaultState.volume,
    audioEventsBound: false
  };

  function saveState() {
    const audio = player.audio;

    storage.save(STORAGE_KEY, {
      index: state.index,
      time: audio && Number.isFinite(audio.currentTime) ? audio.currentTime : state.time,
      volume: audio ? audio.volume : state.volume,
      playing: audio ? !audio.paused : state.playing,
      hasInteracted: state.hasInteracted,
      hidden: state.hidden
    });
  }

  function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return "0:00";

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${String(secs).padStart(2, "0")}`;
  }

  function ensureAudio() {
    if (player.audio) return player.audio;

    let audio = document.getElementById("globalAudio");

    if (!audio) {
      audio = document.createElement("audio");
      audio.id = "globalAudio";
      audio.preload = "metadata";
      document.body.appendChild(audio);
    }

    audio.volume = state.volume;
    player.audio = audio;
    bindAudioEvents();
    return audio;
  }

  function ensurePlayerUI() {
    if (player.ui) return player.ui;

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

    const shortcut = document.createElement("button");
    shortcut.className = "player-edge-toggle player-edge-toggle--floating";
    shortcut.type = "button";
    shortcut.setAttribute("aria-label", "Mostrar player");
    shortcut.innerHTML = `<img src="${ICONS.play}" alt="" />`;
    document.body.appendChild(shortcut);

    player.ui = {
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
      duration: wrapper.querySelector('[data-role="duration"]'),
      shortcutButton: shortcut
    };

    bindUIEvents();
    return player.ui;
  }

  function applyVisibilityState() {
    if (!player.ui) return;

    const canDisplay = state.hasInteracted;
    const isPlayerVisible = canDisplay && !state.hidden;
    const isShortcutVisible = canDisplay && state.hidden;

    document.body.classList.toggle("has-player", canDisplay);
    player.ui.wrapper.classList.toggle("is-visible", isPlayerVisible);
    player.ui.shortcutButton.classList.toggle("is-visible", isShortcutVisible);
    player.ui.wrapper.setAttribute("aria-hidden", String(!isPlayerVisible));
    player.ui.shortcutButton.setAttribute("aria-hidden", String(!isShortcutVisible));
  }

  function renderPlayer() {
    if (!player.ui) return;

    const track = TRACKS[state.index] || TRACKS[0];
    const audio = player.audio;
    const isPlaying = audio ? !audio.paused : state.playing;
    const volume = audio ? audio.volume : state.volume;
    const isMuted = volume <= 0.01;
    const currentTime = audio && Number.isFinite(audio.currentTime) ? audio.currentTime : state.time;
    const duration = audio ? audio.duration : NaN;

    player.ui.title.textContent = track.title;
    player.ui.artist.textContent = track.artist;
    player.ui.playButton.setAttribute("aria-label", isPlaying ? "Pausar" : "Tocar");
    player.ui.playButton.setAttribute("aria-pressed", String(isPlaying));
    player.ui.playButtonIcon.src = isPlaying ? ICONS.pause : ICONS.play;
    player.ui.volumeButton.setAttribute("aria-label", isMuted ? "Ativar som" : "Silenciar");
    player.ui.volumeButton.setAttribute("aria-pressed", String(isMuted));
    player.ui.volumeButtonIcon.src = isMuted ? ICONS.mute : ICONS.volume;
    player.ui.volumeRange.value = String(volume);
    player.ui.current.textContent = formatTime(currentTime);
    player.ui.duration.textContent = formatTime(duration);
    player.ui.seek.max = Number.isFinite(duration) ? duration : 100;

    if (!player.isSeeking) {
      player.ui.seek.value = Number.isFinite(currentTime) ? currentTime : 0;
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
    const audio = ensureAudio();
    const normalizedVolume = Math.max(0, Math.min(1, value));

    audio.volume = normalizedVolume;

    if (normalizedVolume > 0.01) {
      player.lastVolumeBeforeMute = normalizedVolume;
    }

    state.volume = normalizedVolume;
    renderPlayer();
    saveState();
  }

  function toggleMute() {
    const audio = ensureAudio();

    if (audio.volume <= 0.01) {
      setVolume(player.lastVolumeBeforeMute || defaultState.volume);
      return;
    }

    setVolume(0);
  }

  function setTrack(index, preserveTime = false) {
    const audio = ensureAudio();

    state.index = ((index % TRACKS.length) + TRACKS.length) % TRACKS.length;
    const track = TRACKS[state.index];
    const nextTime = preserveTime ? state.time : 0;

    audio.src = track.src;
    audio.load();

    const applyTime = () => {
      if (nextTime > 0 && Number.isFinite(audio.duration)) {
        audio.currentTime = Math.min(nextTime, Math.max(audio.duration - 1, 0));
      }

      renderPlayer();
    };

    audio.addEventListener("loadedmetadata", applyTime, { once: true });
    renderPlayer();
    saveState();
  }

  async function playCurrent({ warnOnError = true } = {}) {
    const audio = ensureAudio();

    try {
      await audio.play();
      state.hasInteracted = true;
      state.playing = true;
      showPlayer();
      renderPlayer();
      saveState();
    } catch (error) {
      if (warnOnError) {
        console.warn("Nao foi possivel iniciar o audio automaticamente:", error);
      }
      renderPlayer();
    }
  }

  function pauseCurrent() {
    if (!player.audio) return;

    player.audio.pause();
    state.playing = false;
    renderPlayer();
    saveState();
  }

  function togglePlayback() {
    if (!player.audio || player.audio.paused) {
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

  function bindUIEvents() {
    const ui = player.ui;

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
      player.isSeeking = true;
      ui.current.textContent = formatTime(Number(ui.seek.value));
    });

    ui.seek.addEventListener("change", () => {
      const audio = ensureAudio();
      audio.currentTime = Number(ui.seek.value);
      player.isSeeking = false;
      saveState();
    });
  }

  function bindAudioEvents() {
    if (player.audioEventsBound || !player.audio) return;

    player.audioEventsBound = true;

    player.audio.addEventListener("loadedmetadata", () => {
      if (state.time > 0 && !player.audio.currentTime) {
        player.audio.currentTime = state.time;
      }

      renderPlayer();
    });

    player.audio.addEventListener("timeupdate", () => {
      renderPlayer();

      const currentSecond = Math.floor(player.audio.currentTime || 0);
      if (currentSecond !== player.lastSavedSecond) {
        player.lastSavedSecond = currentSecond;
        state.time = player.audio.currentTime || 0;
        saveState();
      }
    });

    player.audio.addEventListener("play", () => {
      state.playing = true;
      showPlayer();
      renderPlayer();
    });

    player.audio.addEventListener("pause", () => {
      state.playing = false;
      renderPlayer();
      saveState();
    });

    player.audio.addEventListener("ended", () => {
      changeTrack(1, true);
    });
  }

  function bindTrackTriggers() {
    trackButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const requestedIndex = Number(button.dataset.track || 0);
        state.time = 0;
        setTrack(requestedIndex, false);
        playCurrent();
      });
    });
  }

  ensurePlayerUI();
  bindTrackTriggers();
  applyVisibilityState();
  setTrack(state.index, state.time > 0);

  if (state.hasInteracted && !state.hidden) {
    showPlayer();
  } else {
    applyVisibilityState();
  }

  if (state.hasInteracted && state.playing) {
    playCurrent({ warnOnError: false });
  } else {
    renderPlayer();
  }
});
