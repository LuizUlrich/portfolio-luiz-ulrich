import { initHotCuesNav } from './modules/hotCuesNav.js';
import { initJogWheel } from './modules/jogWheel.js';
import { initWaveform } from './modules/waveform.js';
import { initTracklistReveal } from './modules/tracklistReveal.js';
import { initSectionObserver } from './modules/sectionObserver.js';
import { initAudioPlayer } from './modules/audioPlayer.js';
import { state } from './core/state.js';

let initialized = false;
let destroyers = [];
let onScroll = null;

function initHome() {
  if (initialized) return;
  initialized = true;

  destroyers = [
    initHotCuesNav(),
    initJogWheel(),
    initWaveform(),
    initTracklistReveal(),
    initSectionObserver(),
    initAudioPlayer(),
  ].filter(Boolean);

  onScroll = () => {
    state.scrollY = window.scrollY;
    document.body.classList.toggle('scrolled', state.scrollY > 8);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

window.addEventListener('DOMContentLoaded', initHome, { once: true });

window.addEventListener('beforeunload', () => {
  destroyers.forEach((destroy) => destroy());
  destroyers = [];
  if (onScroll) window.removeEventListener('scroll', onScroll);
  initialized = false;
});
