const sets = [
  {
    title: 'Afro House @ Ulrich — 23.08.2025',
    src: '/assets/audio/Afro House @ Ulrich [23.08.2025].mp3',
    soundcloud: 'https://soundcloud.com/luizulrich',
  },
  {
    title: 'After Rebobina @ At home — 03.08.2025',
    src: '/assets/audio/After Rebobina @ At home [03.08.2025].mp3',
    soundcloud: 'https://soundcloud.com/luizulrich',
  },
  {
    title: 'El Fortin Talent 2026 @ Ulrich — 18.01.2026',
    src: '/assets/audio/El Fortin Talent 2026 @ Ulrich [18.01.2026].mp3',
    soundcloud: 'https://soundcloud.com/luizulrich',
  },
];

let initialized = false;

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds)) return '--:--';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

export function initSetPlayer() {
  if (initialized) return () => {};

  const el = {
    title: document.getElementById('djCurrentTrack'),
    status: document.getElementById('djStatus'),
    play: document.getElementById('djPlay'),
    next: document.getElementById('djNext'),
    seek: document.getElementById('djSeek'),
    current: document.getElementById('djCurrentTime'),
    duration: document.getElementById('djDuration'),
    volume: document.getElementById('djVolume'),
    select: document.getElementById('djSetSelect'),
    external: document.getElementById('djExternalLink'),
    progress: document.getElementById('setProgressBar'),
  };

  if (Object.values(el).some((item) => !item)) return () => {};

  let currentIndex = 0;
  let audio = null;
  let isSeeking = false;

  initialized = true;

  const setStatus = (text, state = 'idle') => {
    el.status.textContent = text;
    el.status.dataset.state = state;
  };

  const syncProgress = () => {
    if (!audio) return;
    el.current.textContent = formatTime(audio.currentTime);
    el.duration.textContent = formatTime(audio.duration);
    el.seek.max = Number.isFinite(audio.duration) ? String(audio.duration) : '0';
    if (!isSeeking) el.seek.value = String(audio.currentTime || 0);
    const ratio = Number.isFinite(audio.duration) && audio.duration > 0
      ? audio.currentTime / audio.duration
      : 0;
    el.progress.style.transform = `scaleX(${Math.max(0, Math.min(1, ratio))})`;
  };

  const setLink = (set) => {
    if (set.soundcloud) {
      el.external.href = set.soundcloud;
      el.external.removeAttribute('aria-disabled');
      el.external.classList.remove('is-disabled');
    } else {
      el.external.href = '#';
      el.external.setAttribute('aria-disabled', 'true');
      el.external.classList.add('is-disabled');
    }
  };

  const bindAudioEvents = () => {
    audio.addEventListener('timeupdate', syncProgress);
    audio.addEventListener('loadedmetadata', syncProgress);
    audio.addEventListener('ended', () => {
      el.play.setAttribute('aria-pressed', 'false');
      el.play.textContent = 'Play';
      setStatus('Set finalizado', 'paused');
    });
    audio.addEventListener('error', () => {
      el.play.setAttribute('aria-pressed', 'false');
      el.play.textContent = 'Play';
      setStatus('Áudio indisponível. Use o SoundCloud.', 'error');
    });
  };

  const loadSet = (index) => {
    currentIndex = index;
    const set = sets[currentIndex];
    if (audio) audio.pause();
    audio = new Audio();
    audio.preload = 'metadata';
    audio.volume = Number(el.volume.value);
    audio.src = set.src || '';
    bindAudioEvents();
    el.title.textContent = set.title;
    el.play.setAttribute('aria-pressed', 'false');
    el.play.textContent = 'Play';
    el.current.textContent = '00:00';
    el.duration.textContent = '--:--';
    el.seek.value = '0';
    el.progress.style.transform = 'scaleX(0)';
    setLink(set);
    setStatus('Pronto para tocar', 'idle');
    el.select.value = String(currentIndex);
  };

  el.play.addEventListener('click', async () => {
    if (!audio) return;
    if (audio.paused) {
      try {
        await audio.play();
        el.play.setAttribute('aria-pressed', 'true');
        el.play.textContent = 'Pause';
        setStatus('Tocando agora', 'playing');
      } catch {
        el.play.setAttribute('aria-pressed', 'false');
        el.play.textContent = 'Play';
        setStatus('Clique em Play para iniciar', 'paused');
      }
    } else {
      audio.pause();
      el.play.setAttribute('aria-pressed', 'false');
      el.play.textContent = 'Play';
      setStatus('Pausado', 'paused');
    }
  });

  el.next.addEventListener('click', () => loadSet((currentIndex + 1) % sets.length));
  el.volume.addEventListener('input', () => {
    if (audio) audio.volume = Number(el.volume.value);
  });
  el.seek.addEventListener('input', () => {
    isSeeking = true;
    el.current.textContent = formatTime(Number(el.seek.value));
  });
  el.seek.addEventListener('change', () => {
    if (audio) audio.currentTime = Number(el.seek.value);
    isSeeking = false;
    syncProgress();
  });
  el.select.addEventListener('change', (event) => loadSet(Number(event.target.value)));

  sets.forEach((set, index) => {
    const option = document.createElement('option');
    option.value = String(index);
    option.textContent = set.title;
    el.select.append(option);
  });

  loadSet(0);

  return () => {
    if (audio) {
      audio.pause();
      audio.src = '';
      audio = null;
    }
    initialized = false;
  };
}
