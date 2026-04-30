let currentAudio = null;
let initialized = false;

export function initAudioPlayer() {
  if (initialized) return () => {};

  const tracks = [
    { name: 'Afro House @ Ulrich — 23.08.2025', file: '/assets/audio/Afro House @ Ulrich [23.08.2025].mp3' },
    { name: 'After Rebobina @ At home — 03.08.2025', file: '/assets/audio/After Rebobina @ At home [03.08.2025].mp3' },
    { name: 'El Fortin Talent 2026 @ Ulrich — 18.01.2026', file: '/assets/audio/El Fortin Talent 2026 @ Ulrich [18.01.2026].mp3' }
  ];

  let currentIndex = 0;

  const playBtn = document.getElementById('djPlay');
  const nextBtn = document.getElementById('djNext');
  const volume = document.getElementById('djVolume');
  const currentTrack = document.getElementById('djCurrentTrack');
  const status = document.getElementById('djStatus');

  if (!playBtn || !nextBtn || !volume || !currentTrack || !status) return () => {};

  initialized = true;

  const setStatus = (message, type = 'idle') => {
    status.textContent = message;
    status.dataset.state = type;
  };

  const loadTrack = (index) => {
    if (currentAudio) currentAudio.pause();
    currentAudio = new Audio(tracks[index].file);
    currentAudio.volume = Number(volume.value);
    currentTrack.textContent = tracks[index].name;
    playBtn.textContent = 'Play';
    setStatus('Pronto para tocar', 'idle');
  };

  const onPlayClick = () => {
    if (!currentAudio) return;
    if (currentAudio.paused) {
      currentAudio.play().then(() => {
        playBtn.textContent = 'Pause';
        setStatus('Tocando', 'playing');
      }).catch(() => {
        playBtn.textContent = 'Play';
        setStatus('Erro ao reproduzir áudio', 'error');
      });
    } else {
      currentAudio.pause();
      playBtn.textContent = 'Play';
      setStatus('Pausado', 'paused');
    }
  };

  const onNextClick = () => {
    currentIndex = (currentIndex + 1) % tracks.length;
    loadTrack(currentIndex);
  };

  const onVolume = () => {
    if (currentAudio) currentAudio.volume = Number(volume.value);
  };

  loadTrack(currentIndex);

  playBtn.addEventListener('click', onPlayClick);
  nextBtn.addEventListener('click', onNextClick);
  volume.addEventListener('input', onVolume);

  return () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }
    playBtn.removeEventListener('click', onPlayClick);
    nextBtn.removeEventListener('click', onNextClick);
    volume.removeEventListener('input', onVolume);
    initialized = false;
  };
}
