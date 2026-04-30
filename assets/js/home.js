import { initHotCuesNav } from './modules/hotCuesNav.js';
import { initJogWheel } from './modules/jogWheel.js';
import { initWaveform } from './modules/waveform.js';
import { initTracklistReveal } from './modules/tracklistReveal.js';
import { initSectionObserver } from './modules/sectionObserver.js';
import { state } from './core/state.js';

window.addEventListener('DOMContentLoaded', () => {
  initHotCuesNav();
  initJogWheel();
  initWaveform();
  initTracklistReveal();
  initSectionObserver();
});

window.addEventListener('scroll', () => {
  state.scrollY = window.scrollY;
  document.body.classList.toggle('scrolled', state.scrollY > 8);
}, { passive: true });
